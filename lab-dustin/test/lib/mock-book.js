'use-strict';
const faker = require('faker');
const Book = require('../../model/book.js');
const mockBookshelf = require('./mock-bookshelf.js');
const mockBook = module.exports = {};

mockBook.createOne = () => {
  let result = {};

  return mockBookshelf.createOne()
  .then(bookshelf => {
    result.bookshelf = bookshelf;
    return new Book({
      name: faker.random.words(3),
      author: faker.random.name(2),
      bookshelf: bookshelf._id.toString(),
    })
    .save();
  })
  .then(book => {
    result.book = book;
    return result;
  });
};

mockBook.createMany = (n) => {
  let result = {};

  return mockBookshelf.createOne()
  .then(bookshelf => {
    result.bookshelf = bookshelf;
    let taskSavePromise = new Array(n).fill(0)
    .map(() => new Book({
      name: faker.random.words(3),
      author: faker.random.name(2),
      bookshelf: bookshelf._id.toString(),
    })
    .save());
    return Promise.all(taskSavePromise);
  })
  .then(books => {
    result.books = books;
    return result;
  });
};
