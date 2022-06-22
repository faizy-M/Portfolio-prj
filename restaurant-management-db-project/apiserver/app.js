var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var login = require('./routes/loginRouter');
var usersRouter = require('./routes/users');
var dishesRouter = require('./routes/dishesRouter');
var customerRouter = require('./routes/customerRouter');
var staffRouter = require('./routes/staffRouter');
var reservationRouter = require('./routes/reservationRouter');
var orderRouter = require('./routes/orderRouter');
var complainRouter = require('./routes/complainRouter');
var reviewRouter = require('./routes/reviewRouter');
var cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/users', usersRouter);
app.use('/dishes', dishesRouter);
app.use('/customers', customerRouter); 
app.use('/staff', staffRouter);
app.use('/reservations', reservationRouter);
app.use('/orders', orderRouter);
app.use('/complains', complainRouter);
app.use('/reviews', reviewRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
