var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')
var format = require('../public/javascripts/helpers')
var db = require('../src/db')
var localStorage = require('localStorage');

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
      movies.push( {image:'https://image.tmdb.org/t/p/w185'+movie.poster_path, title: movie.title})
    });

    res.render('vote', {movies: movies, photoUrl: url, userName: usersName, toppboxemail:email})
  })
});

//need to add id to render the right page
router.get('/show/:id', function(req, res, next) {
  // var movies= []
  // getupcoming.then(function(data){
  //   data['results'].forEach(function(movie){
  //     movies.push( {image:'https://image.tmdb.org/t/p/w185'+movie.poster_path, title: movie.title})
  //   });
  // res.render('show', {movies:movie});
})

router.get('/approved', function(req, res, next) {
  res.render('profile');
});

router.post('/vote', function(req, res, next){
  var errors = []
  var picks = format.formatPicks(req.body);
  console.log(picks);
  res.redirect('/')
})


router.get('/show', function(req, res, next) {
  res.render('show', { title: 'Show Page' });
});


module.exports = router;
