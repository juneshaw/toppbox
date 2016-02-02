var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var localStorage = require('localStorage');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var User = require('./public/javascripts/user');


var routes = require('./routes/index');
var users = require('./routes/users');
var facebook = require('./routes/facebook');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static( "public" ) );


app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/', facebook);


passport.use(new FacebookStrategy({
    clientID: "1643675802563018",
    clientSecret: "73c625d213a3ef1ae03eb404c7cd1609",
    callbackURL: "http://localhost:3000/auth/facebook/",
    enableProof: true,
    profileFields: ['name', 'id', 'photos', 'emails']
  },
  function(token, refreshToken, profile, done) {
    console.log("Auth done");
    done(null, profile);
  }));

passport.serializeUser(function(user, done) {

    localStorage.setItem('name', JSON.stringify(user["name"]["givenName"] + " " + user["name"]["familyName"]));
    localStorage.setItem('photo', JSON.stringify(user["_json"]["picture"]["data"]["url"]));
    var retrievedObject = localStorage;
    console.log(retrievedObject);
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

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


module.exports = app;
