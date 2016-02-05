
// var db = require('pg');
// var knex = require ('knex')({
//   client:'pg',
//   connection: 'postgres://localhost/toppbox'
// });

var knex = require('../db/knex')

function Users() {
  return knex('users');
}

function Movies() {
  return knex('movies');
}

function Votes() {
  return knex('votes');
}

function Rankings() {
  return knex('rankings');
}

function MovieVotes() {
  return knex('movie_votes');
}

function Scores() {
  return knex('scores');
}

function insertUser(user) {
  return(Users().insert(user));
}

function user(id) {
  return(Users().where('id', id))
}

function updateUser(id, user) {
  return(Users().where('id', id).update(user));
}

function updateUserScore(id, score){
  console.log('score', score, 'id', id);
  return(Users().where('id', id).update({'total_score': score}))
}

function deleteUser(id) {
  return(Users().where('id', id).del())
  }

function insertMovie(movie) {
  return(Movies().insert(movie));
}

function movie(id) {
  return(Movies().where('id', id))
}

function updateMovie(id, movie) {
  return(Movies().where('id', id).update(vote));
}

function deleteMovie(id) {
  return(Movies().where('id', id).del());
}

function insertVote(vote) {
  return(Votes().insert(vote));
}

function vote(id) {
  return(Votes().where('id', id))
}

function updateVote(id, vote) {
  return(Votes().where('id', id).update(vote));
}

function deleteVote(id) {
  return(Votes().where('id', id).del());
}

function insertRanking(ranking) {
  return(Rankings().insert(ranking));
}

function ranking(id) {
  return(Rankings().where('id', id))
}

function updateRanking(id, ranking) {
  return(Rankings().where('id', id).update(ranking));
}

function deleteRanking(id) {
  return(Rankings().where('id', id).del());

}

function insertMovieVote(movie_vote) {
  return(MovieVotes().insert(movie_vote));
}

function movie_vote(id) {
  return(Movie_Votes().where('id', id))
}

function updateMovieVote(id, movie_vote) {
  return(Movie_Votes().where('id', id).update(movie_vote));
}

function deleteMovieVote(id) {
  return(Movie_Votes().where('id', id).del());
}

function insertScore(score) {
  return(Scores().insert(score));
}

function score(id) {
  return(Scores().where('id', id))
}

function updateScore(id, score) {
  return(Scores().where('id', id).update(score));
}

function deleteScore(id) {
  return(Scores().where('id', id).del())
}

function userPasswordHash(email) {
  return(Users().select('passwordHash').where('email', email).first());
}

function userByEmail(email) {
  return(Users().where('email', email));
}

function movieByTitle(title) {
  return(Movies().where('name', title).first())
}

function votesByUserDate(user_id, date) {
  return (Votes().where('user_id', user_id).where('date', date).first());
}

function movieVotesByUserDate(date) {
  return (MovieVotes().join('votes', 'movie_votes.vote_id', 'votes.id').where('votes.date', date))
}

function voteMovies(vote_id) {
  return (Movies().join('movie_votes', 'movies.id', 'movie_votes.movie_id').where('movie_votes.vote_id', vote_id).orderBy('movie_votes.rank'));
}

function movieTitles(movieIds) {
  return (Movies().whereIn('id', movieIds));
}

function movieByTitle(name) {
 return(Movies().where('name', name).first())
}

function scoresByDate(date) {
  return(Scores().where('date', date))
}
// function moviesByUserVote(email, date) {
//   return(Movies).
// }

module.exports =
{Users: Users,
Movies: Movies,
Votes: Votes,
Rankings: Rankings,
MovieVotes: MovieVotes,
insertUser: insertUser,
user: user,
updateUser: updateUser,
deleteUser: deleteUser,
userByEmail: userByEmail,
insertMovie: insertMovie,
movie: movie,
updateMovie: updateMovie,
deleteMovie: deleteMovie,
insertVote: insertVote,
vote: vote,
updateVote: updateVote,
deleteVote: deleteVote,
insertRanking: insertRanking,
ranking: ranking,
updateRanking: updateRanking,
deleteRanking: deleteRanking,
insertMovieVote: insertMovieVote,
ranking: ranking,
updateMovieVote: updateMovieVote,
deleteMovieVote: deleteMovieVote,
insertScore: insertScore,
score: score,
updateScore: updateScore,
deleteScore: deleteScore,
userPasswordHash: userPasswordHash,
userByEmail: userByEmail,
movieByTitle: movieByTitle,
votesByUserDate: votesByUserDate,
voteMovies: voteMovies,
movieTitles: movieTitles,
movieVotesByUserDate: movieVotesByUserDate,
scoresByDate:scoresByDate,
updateUserScore:updateUserScore
}
