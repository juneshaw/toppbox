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
    console.log(movies);
    res.render('vote', {movies: movies})
  })
});

router.post('/vote', function(req, res, next){
  console.log(format.formatPicks(req.body));
})

module.exports = router;
