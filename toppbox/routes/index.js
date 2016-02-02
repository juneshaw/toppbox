var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')
var format = require('../public/javascripts/helpers')



router.get('/', function(req, res, next) {
      res.render('index')
  })



router.get('/vote', function(req, res, next) {
  var movies= []
  getupcoming.then(function(data){
    data['results'].forEach(function(movie){
      movies.push( {image:'https://image.tmdb.org/t/p/w185'+movie.poster_path, title: movie.title})
    });

    res.render('vote', {movies: movies})
  })
});

router.get('/show', function(req, res, next) {
  res.render('show', { title: 'Show Page' });
});


router.get('/approved', function(req, res, next) {
  res.render('profile');
});

router.get('/approved', function(req, res, next) {
  res.render('profile');
});

router.post('/vote', function(req, res, next){
  var errors = []
  var picks = format.formatPicks(req.body);
  res.redirect('/')
})

module.exports = router;
