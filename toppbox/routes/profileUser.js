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
  var userName = localStorage.getItem('name').replace(/['"]+/g, '');
  var email = localStorage.getItem('email').replace(/['"]+/g, '');
  var url = originalUrl.replace(/['"]+/g, '');

  db.userByEmail(req.params.email).first().then(function(user) {
    var date = new Date();
    db.votesByUserDate(user.id, date).then(function(vote) {
      if (!vote) {
        res.render('profileUser/index',
                  {'userName': usersName,
                  'user': user,
                  'date': date,
                  'movieVotes': [],
                  'photoUrl': url,
                  'toppboxemail':email})
      } else {
        db.voteMovies(vote.id).then(function(movieVotes) {
          res.render('profileUser/index',
          {'userName': usersName,
          'user': user,
          'date': date,
          'movieVotes': movieVotes,
          'photoUrl': url,
          'toppboxemail':email})

        })
      }
    })
  })
})


module.exports = router;
