'use strict';
 // npm modules
const jsonParser = require('body-parser').json();
const bookshelfRouter = module.exports = new require('express').Router();
// app modules
const Bookshelf = require('../model/bookshelf.js');

// module logic
bookshelfRouter.post('api/bookshelves', jsonParser, (req, res, next) =>{
  console.log('hit POST /api/bookshelves');
  new Bookshelf(req.body)
  .save()
  .then(bookshelf => res.json(bookshelf))
  .catch(next);
});

bookshelfRouter.get('') 
