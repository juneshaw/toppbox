var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')
var db = require('../src/db.js')
var localStorage = require('localStorage');
var format = require('../public/javascripts/helpers')

router.get('/:email', function(req, res, next) {
  // var userName = localStorage.getItem('name').replace(/['"]+/g, '');
  // var originalUrl = localStorage.getItem('photo');
  // var email = localStorage.getItem('email').replace(/['"]+/g, '');
  // var url = originalUrl.replace(/['"]+/g, '');
  var movieArray = [];
  var movieVotes = [];
  db.userByEmail(req.params.email).first().then(function(user) {
    console.log('user = ', user);
    var date = new Date();
    db.votesByUserDate(user.id, date).then(function(vote) {
      console.log('vote = ', vote);
      if (vote) {
        db.voteMovies(vote.id).then(function(movieVotes) {
          console.log('vote movieVotes = ', movieVotes);
          movieVotes.forEach(function(movieVote) {
            console.log('movieVote', movieVote);
            db.movie(movieVote.movie_id).then(function(movie) {
              movieArray.push(movie);
            })
          })
        })
      }
    })
  })
  res.render('profileUser/index',
    {'user': user,
    'movieVotes': movieVotes,
    'movieArray': movieArray});
})


module.exports = router;
