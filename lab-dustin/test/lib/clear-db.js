'use strict';

const List = require('../../model/book.js');

module.exports = () => {
  return Promise.all([
    List.remove({}),
  ]);
};
