var db = require('../../src/db.js')

module.exports = function score (user_id, date) {
    var scoreTotal = 0;
    db.scoresByDate(date).then(function(scores) {
      db.votesByUserDate(user_id, date).first().then(function(votes) {
        db.voteMovies(votes.id).then (function(movieVotes) {
          console.log('length of scores: ', scores.length)
          console.log('length of movieVotes: ', movieVotes.length)
          movieVotes.forEach(function(vote) {
            scores.forEach(function(score) {
              if (vote.movie_id === score.movie_id && vote.rank === score.rank) {
                scoreTotal++;
              }

            })
          })
          db.updateUserScore(user_id, scoreTotal).then(function(results) {
            console.log('score total', scoreTotal);
          })
        })
      })
    })
  }
