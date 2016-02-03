var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')
var db = require('../src/db.js')
var format = require('../public/javascripts/helpers')


router.get('/', function(req, res, next) {
  console.log('in the route for the buildDB');
  getupcoming.then(function(results) {
    console.log('results of getupcoming = ', results);

    results.results.forEach(function(movie, index) {
      console.log('in the loop ', index);
      var insertMovie = {'name': movie.title,
                  'photo_link': movie.poster_path,
                  'overview': movie.overview,
                  'popularity': movie.popularity}
      db.insertMovie(insertMovie).then(function(results) {
        console.log('results of insert: ', results);
      })
    })
    res.redirect('/')
  })
})

module.exports = router;
