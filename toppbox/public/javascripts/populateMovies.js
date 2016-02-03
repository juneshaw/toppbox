var getUpcoming = require('./getupcoming')
var topfive = require('./topfive')

module.exports = {
  populateMovies: function() {
    return(getUpcoming.getUpcoming());
  }
}
