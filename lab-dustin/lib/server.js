'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

//module logic
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

// create app
const app = express();
let server;

// middleware
app.use(cors());  //enable cross-site origin resource tracking
app.use(morgan('dev')); //logging utility

// load routes
app.use(require('../route/book-router'));
app.use(require('../route/bookshelf-router'));

app.all('/api/*', (req, res, next) => {
  res.sendStatus(404);
});

// error middlware
app.use(require('./error-middleware.js'));
//export server control
const serverControl = module.exports = {};

serverControl.start = () => {
  return new Promise((resolve) => {
    if(!server || !server.isOn) {
      server = app.listen(process.env.PORT, () => {
        console.log('servin tough on:', process.env.PORT);
        server.isOn = true;
        resolve();
      });
    }
  });
};

serverControl.stop = () => {
  return new Promise((resolve) => {
    if(server && server.isOn) {
      server.close(() => {
        console.log('server is DOWN');
        server.isOn = false;
        resolve();
      });
    }
  });
};
