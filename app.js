const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// custom middleware
// app.use((req, res, next) => {
//   console.log('Hello from middleware!');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

//Mounting the router (Mountinng the new router on a route) , besides it's a middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handle the uncontained request (all works for all http methods such as GET, POST... etc)
// * start indicates all URL that coming from request
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // When we pass an argument into next func. express automatically receive an error so that will stops all other middleware and send the error that passed into next func as an argument.
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler Middleware, Express understands this is an error handler middleware due to middleware has 4 arguments.
app.use(globalErrorHandler);

module.exports = app;
