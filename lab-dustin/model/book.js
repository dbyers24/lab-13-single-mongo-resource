'use-strict';

const mongoose = require('mongoose');
const Bookshelf = require('./bookshelf.js');

const bookSchema = mongoose.Schema({
  name: {type: String, required: true},
  author: {type: String},
  bookshelf: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'bookshelf'},
});

// hooks

bookSchema.pre('save', function(next) {
  console.log('prre save doc ', this);
  Bookshelf.findById(this.bookshelf)
  .then(bookshelf => {
    let bookIDSet = new Set(bookshelf.books);
    bookIDSet.add(this._id);
    bookshelf.books = Array.from(bookIDSet);
    return bookshelf.save();
  })
  .then(() => next())
  .catch(() =>
    next(new Error('Validation failed: no shelf for book')));
});

bookSchema.post('remove', function(doc, next) {
  console.log('post remove doc', doc);
  Bookshelf.findById(doc.bookshelf)
  .then(bookshelf => {
    bookshelf.books = bookshelf.books.filter(book => book._id !== doc._id);
    return bookshelf.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('book', bookSchema);
