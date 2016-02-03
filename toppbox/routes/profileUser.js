var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
var getupcoming = require('../public/javascripts/getupcoming')
var db = require('../src/db.js')
var localStorage = require('localStorage');
var format = require('../public/javascripts/helpers')


router.get('/:email', function(req, res, next) {
  var usersName = localStorage.getItem('name').replace(/['"]+/g, '');
  var originalUrl = localStorage.getItem('photo');
  var email = localStorage.getItem('email').replace(/['"]+/g, '');
  var url = originalUrl.replace(/['"]+/g, '');
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
          'movieVotes': movieVotes,
          photoUrl: url,
           userName: usersName,
            toppboxemail:email});
        })
      } else {
        res.render('profileUser/show',
                  {'user': user,
                  'movieVotes': [],
                  photoUrl: url,
                  userName: usersName,
                  toppboxemail:email})
      }
    })
  })
})

module.exports = router;
