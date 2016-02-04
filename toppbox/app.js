var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var localStorage = require('localStorage');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require ('./src/db.js');
require('dotenv').load();



// var dragula = require('dragula');



var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var User = require('./public/javascripts/user');
var profileUser = require('./routes/profileUser');
var buildDB = require('./routes/buildDB');

var routes = require('./routes/index');
var users = require('./routes/users');
var facebook = require('./routes/facebook');
var profileUser = require('./routes/profileUser');
var buildDB = require('./routes/buildDB');

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
app.use('/profileUser', profileUser);
app.use('/buildDB', buildDB);


passport.use(new FacebookStrategy({
    clientID: "1643675802563018",
    clientSecret: "73c625d213a3ef1ae03eb404c7cd1609",
    callbackURL: process.env.FACEBOOK_URL || "localhost:3000/auth/facebook",
    // callbackURL: "https://toppbox-dev.herokuapp.com/auth/facebook",
    enableProof: true,
    profileFields: ['name', 'id','picture.type(large)', 'emails']
  },
  function(token, refreshToken, profile, done) {
    console.log("Auth done");
    done(null, profile);
  }));

passport.serializeUser(function(user, done) {
    localStorage.setItem('email', JSON.stringify(user["_json"]['email']));
    localStorage.setItem('name', JSON.stringify(user["name"]["givenName"] + " " + user["name"]["familyName"]));
    localStorage.setItem('photo', JSON.stringify(user["_json"]["picture"]["data"]["url"]));

    // var email = localStorage.getItem('email').replace(/['"]+/g, '');

      var email = user["_json"]['email'];
      var first_name = JSON.stringify(user["_json"]["first_name"])
      var last_name = JSON.stringify(user['_json']['last_name'])
      var photo_link = JSON.stringify(user["_json"]["picture"]["data"]["url"])
        db.insertUser({'email': email,
                      'first_name': first_name,
                      'last_name': last_name,
                       'photo_link': photo_link,
                       'total_score': 0
                    }).then (function(results, error) {
                      console.log('results', results, 'error', error);
                    })
      // }
    // )


    var retrievedObject = localStorage;
    console.log(user["_json"]["picture"]["data"]["url"]);
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
