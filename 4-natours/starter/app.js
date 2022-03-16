// Modules
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ***HOW EXPRESS IS LAYED OUT***
// 1) Top layer is consisted of requiring our modules
// 2) Next is our middleware

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware ✈');
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// More middlware adding date to req
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log('Date added');
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
