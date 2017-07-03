'use strict';

const jsonParser = require('body-parser').json();

const bookRouter = module.exports = new require('express').Router();
//app modules

const Book = require('../model/book.js');

// module logic

bookRouter.post('/api/books', jsonParser, (req, res, next) => {
  console.log('hit POST /api/books');

  new Book(req.body)
  .save()
  .then(book => res.json(book))
  .catch(next);
});

bookRouter.get('/api/books/:id', (req, res, next) => {
  console.log('hit GET /api/books:id');

  Book.findById(req.params.id)
  .then(book => res.json(book))
  .catch(next);
});

bookRouter.put('/api/books/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/books');
  let options = {runValidators: true, new: true};

  Book.findByIdAndUpdate(req.params.id, req.body, options)
    .then(book => res.json(book))
    .catch(next);
});

bookRouter.delete('/api/books/:id', (req, res, next) => {
  console.log('hit DELETE /api/books:id');

  Book.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
