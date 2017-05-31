var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var project = require('./routes/project');
var projUtilization = require('./routes/projUtilization');
var projDashboard = require('./routes/projDashboard');
var employee = require('./routes/employee');
var empUtilization = require('./routes/empUtilization');
var empDashboard = require('./routes/empDashboard');

var db;
var app = express();
// load mongoose package
var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/RMTool')
  .then(function() {console.log('connected to DB');
  })
  .catch(function(err) {console.error(err);
  });
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/project', project);
app.use('/projUtilization', projUtilization);
app.use('/projDashboard', projDashboard);
app.use('/employee', employee);
app.use('/empUtilization', empUtilization);
app.use('/empDashboard', empDashboard);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  mongoose.connection.close();
  process.exit( );
});

module.exports = app;
