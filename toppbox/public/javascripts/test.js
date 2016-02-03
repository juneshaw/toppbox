db = require('../../src/db.js');


var date = new Date();
db.movieVotesByUserDate(date).then (function(results) {
  console.log('score results = ', results);
})
