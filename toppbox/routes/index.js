var express = require('express');
var router = express.Router();

var $ = require('jquery');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/vote', function(req, res, next) {
  res.render('vote', { title: 'Voting Page' });
});

router.post('/', function(req, res, next){
  console.log(req.body);
})

module.exports = router;
