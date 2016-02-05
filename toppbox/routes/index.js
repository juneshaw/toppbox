var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive');
var unirest = require('unirest');
var getupcoming = require('../public/javascripts/getupcoming');
var format = require('../public/javascripts/helpers');
var knex = require('../db/knex');
var db = require('../src/db');
var localStorage = require('localStorage');
var passport = require('passport');

var score = require('../public/javascripts/score')

router.get('/', function(req, res, next) {
      res.render('index')
  })

router.get('/vote', function(req, res, next) {
  var movies= []
  var usersName = localStorage.getItem('name').replace(/['"]+/g, '');
  var originalUrl = localStorage.getItem('photo');
  var email = localStorage.getItem('email').replace(/['"]+/g, '');
  var url = originalUrl.replace(/['"]+/g, '');
  getupcoming.then(function(data){
    data['results'].forEach(function(movie){
      if(movie.original_language === "en"){
        if(movie.poster_path !== null && movie.poster_path !== "" && movie.poster_path !== "null"){
          movies.push( {image:'https://image.tmdb.org/t/p/w185'+movie.poster_path, title: movie.title})
        }
      };
    })
    res.render('vote', {movies: movies, photoUrl: url, userName: usersName, toppboxemail:email})
  });
});

//need to add id to render the right page
router.get('/show/:id', function(req, res, next) {
  var movies= []
  var usersName = localStorage.getItem('name').replace(/['"]+/g, '');
  console.log(usersName + "***************************");
  var originalUrl = localStorage.getItem('photo');
  var email = localStorage.getItem('email').replace(/['"]+/g, '');
  var url = originalUrl.replace(/['"]+/g, '');
  getupcoming.then(function(data){
    data['results'].forEach(function(movie){
      movies.push( {image:'https://image.tmdb.org/t/p/w185'+movie.poster_path, title: movie.title})
    });
  })
  res.render('show', {movies:movies, photoUrl: url, userName: usersName, toppboxemail:email});
})

router.get('/approved', function(req, res, next) {
  res.render('profile');
});

router.post('/vote', function(req, res, next){
  var date = new Date();
  var email = localStorage.getItem('email').replace(/['"]+/g, '');
  var picks = format.formatPicks(req.body);
  db.userByEmail(email).then(function(result) {
    console.log('***** userByEmail results', result);
    var userId = result[0].id;
    db.insertVote({'user_id': userId,
                  'date': date}).then (function(results) {
      db.votesByUserDate(userId, date).then(function(results) {
        format.addMovieVotes(picks, results.id);
        score(userId, date);
      })
    })
  })
  res.redirect('/profileUser/'+email)
})

router.get('/:title', function(req, res, next) {
  console.log('**** in show page', req.params.title);
  var movies= []
  var usersName = localStorage.getItem('name').replace(/['"]+/g, '');
  var originalUrl = localStorage.getItem('photo');
  var email = localStorage.getItem('email').replace(/['"]+/g, '');
  var url = originalUrl.replace(/['"]+/g, '');
  db.movieByTitle(req.params.title).then(function(results){
    res.render('show', {data: results,  photoUrl: url, userName: usersName, toppboxemail:email});
    router.get('/show', function(req, res, next) {
      res.render('show');
    });
  })
})




module.exports = router;
