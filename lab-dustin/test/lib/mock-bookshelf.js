'use-strict';

const faker = require('faker');
const Bookshelf = require('../../model/bookshelf.js');

const mockBookshelf = module.exports = {};

mockBookshelf.createOne = () => {
  return new Bookshelf({
    location: faker.internet.url(1),
    owner: faker.name.firstName(1),
  })
  .save();
};

mockBookshelf.createMany = (n) => {
  let mockBookShelfArray = new Array(n)
    .fill(0).map(() => mockBookshelf.createOne());
  return Promise.all(mockBookShelfArray);
};
