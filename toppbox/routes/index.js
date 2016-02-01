var express = require('express');
var router = express.Router();
var topfive = require('../public/javascripts/topfive')
var unirest = require('unirest')
/* GET home page. */
router.get('/', function(req, res, next) {
  unirest.post('http://www.boxofficemojo.com/schedule/').end(function(result){
    res.send(result.body)
  })



  // res.render('index', { title: 'Express' });
});

router.get('/vote', function(req, res, next) {
  res.render('vote', { title: 'Voting Page' });
});

router.post('/', function(req, res, next){
  console.log(req.body);
})

module.exports = router;
