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
    var date = "02-01-16";
    db.votesByUserDate(user.id, date).then(function(votes) {
      console.log('votes = ', votes);
      res.render('profileUser/show',
      {'user': user,
       'votes': votes});
    })
  })
})

module.exports = router;
