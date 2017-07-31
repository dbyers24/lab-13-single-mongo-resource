'use strict';
// load env
require('dotenv').config({path: `${__dirname}/../.test.env`});

//npm modules
const expect = require('expect');
const superagent = require('superagent');

// app modules
const Bookshelf = require('../model/bookshelf.js');
const clearDb = require('./lib/clear-db');
const server = require('../lib/server.js');
const mockBookshelf = require('./lib/mock-bookshelf.js');
const mockBook = require('./lib/mock-book.js');

// module logic
const API_URL = process.env.API_URL;
// const Book = require('../model/book.js');

describe('testing /api/books', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDb);

  describe('testing POST /api/books', () => {

    it('should add a book', () => {
      let tempBook, tempBookshelf;
      return mockBookshelf.createOne()
      .then(bookshelf => {
        tempBookshelf = bookshelf;
        return superagent.post(`${API_URL}/api/books`)
        .send({ name: 'hibbity',
        author: 'dang son',
        bookshelf: bookshelf._id.toString(),
      });
    })
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body._id).toExist();
      expect(res.body.name).toEqual('hibbity');
      expect(res.body.author).toEqual('dang son');
      expect(res.body.bookshelf).toEqual(tempBookshelf._id.toString());
      tempBook = res.body;
      return Bookshelf.findById(tempBookshelf._id);
    })
    .then(bookshelf => {
      expect(bookshelf.books.length).toEqual(1);
      expect(bookshelf.books[0].toString()).toEqual(tempBook._id.toString());
    });
  });

  it('should respond with a 400', () => {
    return superagent.post(`${API_URL}/api/books`)
    .send({ name: 'hibbity',
    author: 'dang son',
    bookshelf: 'asdf',
  })
  .then(res => {throw res})
  .catch(res => {
    expect(res.status).toEqual(400);
  });
});
//////////////////// TODO: Below
it('should respond with a 409', () => {
  return superagent.post(`${API_URL}/api/books`)
  .send({ name: 'hibbity',
  author: 'dang son',
  bookshelf: 'asdf',
})
.send({ name: 'hibbity',
author: 'dang son',
bookshelf: 'asdf',
})
.then(res => {throw res})
.catch(res => {
  expect(res.status).toEqual(409);
});
});
});
////////////////////////////////////////////
describe('testing PUT /api/books/:id', () => {
  let tempBook, tempBookshelf;

  it('should respond with the updated book', () => {
    mockBook.createOne()
    .then(({bookshelf, book}) => {
      tempBook = book;
      tempBookshelf = bookshelf;

      return superagent.put(`${API_URL}/api/books/${tempBook._id.toString()}`)
      .send({name : 'buffalo'});
    })
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.name).toEqual('buffalo');
      expect(res.body._id).toEqual(tempBook._id);
      expect(res.body.book).toEqual(tempBookshelf._id);
    });
  });
////////////// TODO:
  it('should respond with a 400, invalid body', () => {
    mockBook.createOne()
    .then(({bookshelf, book}) => {
      tempBook = book;
      tempBookshelf = bookshelf;

      return superagent.put(`${API_URL}/api/books/${tempBook._id.toString()}`)
      .send({name : 'buffalo'});
    })
    .then(res => {
      expect(res.status).toEqual(400);
      // expect(res.body.name).toEqual('buffalo');
      // expect(res.body._id).toEqual(tempBook._id);
      // expect(res.body.book).toEqual(tempBookshelf._id);
    });
  });
  ////////////////////////////////////////
});
});
