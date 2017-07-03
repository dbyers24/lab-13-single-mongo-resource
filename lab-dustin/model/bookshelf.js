'use strict';

const mongoose = require('mongoose');

const bookshelfSchema = mongoose.Schema({
  location: {type: String, required: true, unique: true},
  owner: {type: String, required: true, unique: true},
  books: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}],
});

module.exports = mongoose.model('bookshelf', bookshelfSchema);
