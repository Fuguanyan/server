var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置响应头
app.use((req,res,next) => {
  // 跨域设置
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","content-type,token");

  // 把Token设置在响应头里
  res.setHeader("Access-Control-Expose-Headers","token");
  // console.log(req.headers)
  if(req.headers.token) {
    const decodeToken = jwt.decode(req.headers.token,"key")
    // 比对token过期时间
    if(moment().isAfter(decodeToken.ext)) {
     return  res.json({ expire : true })
    }
    // console.log(decodeToken)
  }
  // console.log(req.originalUrl)
next()

})
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
