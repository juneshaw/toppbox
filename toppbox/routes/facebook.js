    var express = require('express');
    var router = express.Router();
    var passport = require('passport');
    var localStorage = require('localStorage');
    var db = require ('../src/db.js');
    var getupcoming = require('../public/javascripts/getupcoming')

    router.get('/auth/facebook', passport.authenticate('facebook', {successRedirect: '/auth/home', scope : 'email'}));

    router.get('/auth/home/', function(req, res){
      var movies= []
      //req.query.option would equal 'my-cool-option'
      var usersName = localStorage.getItem('name').replace(/['"]+/g, '');
      var originalUrl = localStorage.getItem('photo');
      var email = localStorage.getItem('email').replace(/['"]+/g, '');
      var url = originalUrl.replace(/['"]+/g, '');

      getupcoming.then(function(data){
        data['results'].forEach(function(movie){
          if(movie.poster_path !== null && movie.poster_path !== "" && movie.poster_path !== "null"){
            movies.push( {image:'https://image.tmdb.org/t/p/w185'+movie.poster_path, title: movie.title})
          }
        });
        res.render("logged-in/index", {movies:movies, photoUrl: url, userName: usersName, toppboxemail:email});
    })
  })

  router.get('/home/home', function(req, res){
    var movies= []
    //req.query.option would equal 'my-cool-option'
    var usersName = localStorage.getItem('name').replace(/['"]+/g, '');
    var originalUrl = localStorage.getItem('photo');
    var email = localStorage.getItem('email').replace(/['"]+/g, '');
    var url = originalUrl.replace(/['"]+/g, '');

    getupcoming.then(function(data){
      console.log(data);
      data['results'].forEach(function(movie){
        if(movie.poster_path !== null && movie.poster_path !== "" && movie.poster_path !== "null"){
          movies.push( {image:'https://image.tmdb.org/t/p/w185'+movie.poster_path, title: movie.title})
        }
      });
    res.render("logged-in/index", {movies:movies, photoUrl: url, userName: usersName, toppboxemail:email});
    })
  })


    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    // route for logging out
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
