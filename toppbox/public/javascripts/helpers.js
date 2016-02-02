module.exports = {
  formatPicks: function(picks){
    var movies = picks.user_picks.split('*')
    var titles = []
    movies.shift()
    
    movies.forEach(function(movie){
      titles.push(movie.slice(movie.indexOf('#')+1, movie.indexOf('$')));
    })

    return titles;
  }

}
