var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')
var db = require('../src/db.js')
var format = require('../public/javascripts/helpers')
var topfive = require('../public/javascripts/topfive')


router.get('/', function(req, res, next) {
  getupcoming.then(function(results) {

    results.results.forEach(function(movie, index) {

      var insertMovie = {'name': movie.title,
                  'photo_link': movie.poster_path,
                  'overview': movie.overview,
                  'popularity': movie.popularity}
      db.insertMovie(insertMovie).then(function(results) {
      })
    })
    topfive.then(function(results) {
      results.titles.forEach(function(titles, index){
        db.movieByTitle(titles).then(function(result){
          rank = {
            'date':new Date(),
            'rank': index+1,
            'total_earnings': 0,
            'movie_id': result.id};
            db.insertScore(rank).then(function(result){
          })
        })
      })
      res.redirect('/')
    })
  })
})
module.exports = router;
