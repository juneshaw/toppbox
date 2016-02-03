var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')
var db = require('../src/db.js')
var format = require('../public/javascripts/helpers')


router.get('/:email', function(req, res, next) {
  db.userByEmail(req.params.email).first().then(function(user) {
    console.log('user = ', user);
    var date = "2016-02-01";
    db.votesByUserDate(user.id, date).then(function(vote) {
      console.log('vote = ', vote);
      if (vote) {
        db.voteMovies(vote.id).then(function(movieVotes) {
          console.log('vote movieVotes = ', movieVotes);
          res.render('profileUser/show',
          {'user': user,
          'movieVotes': movieVotes});
        })
      } else {
        res.render('profileUser/show',
                  {'user': user,
                  'movieVotes': []})
      }
    })
  })
})

module.exports = router;
