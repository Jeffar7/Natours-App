const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//  1) MIDDLEWARES

// third party middleware = MORGAN
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 2) ROUTES HANDLERS
const home = (req, res) => {
  res.status(200).json({
    status: 'OK'
  });
};

// 3) ROUTES
app.get('/', home);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// HANDLE UNREGISTERED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
