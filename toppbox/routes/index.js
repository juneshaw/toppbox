var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')
var format = require('../public/javascripts/helpers')
var knex = require('../db/knex');
var db = require('../src/db')


function Movies(){
  return knex('movies');
  console.log(knex('movies'));
}


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
  res.render('show');
});

// router.get('/:title', function(req, res, next) {
//   getupcoming.then(function(data){
//     data['results'].forEach(function(movie){
//       var movieName = movie.title.replace(/ /g,'').toLowerCase();
//       movieName = movieName.replace(/,/g, '');
//       movieName = movieName.replace(/-/g, '');
//       console.log(movieName);
//       if(req.params.title === movieName){
//         res.render('show', {title: movieName, movie[0]});
//       }
//     })
//   })
// })

router.get('/:title', function(req, res, next) {
  console.log(req.params);
  db.movieByTitle(req.params.title).then(function(results){
    console.log("calling!")
    res.render('show', {data: results});
  })
})



module.exports = router;
