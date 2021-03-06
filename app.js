var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

//CAMBIO
//----------------------------------------------
function getApp(db){
//----------------------------------------------
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true
    }))
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(require('less-middleware')(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));


    //CAMBIO
    //---------------------------------------------------------------

    app.get('/',function(req,res){                           //<--
        res.render("index",{});                              //<--
    });
    //app.use('/', routes);
    //app.use('/users', users);                                                    //<--
    var apiRoute = require("./routes/api")(db);              //<--
    app.use('/api', apiRoute);

    //---------------------------------------------------------------
    console.log("Conected To DB" + db.databaseName);
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

    //CAMBIO
    //------------------------------------
    return app;
    //------------------------------------

}

//module.exports = app;

//CAMBIO
//-----------------------------------------
module.exports = getApp;
//-----------------------------------------
