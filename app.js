
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const morgan = require('morgan');
const winston = require('./config/winston');

const addRoutes = require('./routes');

const app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('combined', {stream: winston.stream}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

addRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // add this line to include winston logging
  winston.error(`
    ${err.status || 500} - ${err.message} - 
    ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
  return res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
