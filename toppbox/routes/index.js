var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/vote', function(req, res, next) {
  res.render('vote', { title: 'Voting Page' });
});

module.exports = router;
