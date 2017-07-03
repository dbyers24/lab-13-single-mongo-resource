'use strict';
 // load env
require('dotenv').config({path: `${__dirname}/../.test.env`});

 //npm modules
const expect = require('expect');
const superagent = require('superagent');

// app modules
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
    let tempBook, tempBookshelf;

    it('should add a book', () => {
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
        expect(res.body.bookshelf).toEqual(tempBookshelf._id.toString());
      });
    });
  });
});
  // describe('testing POST /api/books', () => {
  //   after(() => Book.remove({}));
  //
  //   let data = {name: 'Pickle chips', author: 'A Jar'};
  //
  //   it('should respond with a new book and 200 status', () => {
  //     return superagent.post(`${API_URL}/api/books`)
  //     .send(data)
  //     .then(res => {
  //       expect(res.status).toEqual(200);
  //     });
  //   });
  //
  //   it('should respond with a new book and 200 status', () => {
  //     return superagent.post(`${API_URL}/api/books`)
  //     .send(data)
  //     .then(res => {
  //       expect(res.status).toEqual(200);
  //     });
  //     });
  //   });

// });
