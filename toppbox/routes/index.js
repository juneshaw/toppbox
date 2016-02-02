var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')




router.get('/', function(req, res, next) {
      res.render('index')
  })



router.get('/vote', function(req, res, next) {
  var image = []
  getupcoming.then(function(data){
    data['results'].forEach(function(movie){
      image.push('https://image.tmdb.org/t/p/w185'+movie.poster_path);
    });
    res.render('vote', {images: image})
  })
});

router.post('/', function(req, res, next){
  console.log(req.body);
})

module.exports = router;
