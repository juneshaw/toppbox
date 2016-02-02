
// var db = require('pg');
// var knex = require ('knex')({
//   client:'pg',
//   connection: 'postgres://localhost/toppbox'
// });
var knex = require ('knex')({
  client:'pg',
  connection: 'postgres://localhost/toppbox'
});

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

function insertUser(user) {
  return(Users().insert(user));
}

function user(id) {
  return(Users().where('id', id))
}

function updateUser(id, user) {
  return(Users().where('id', id).update(user));
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

function loginUserId(user_name) {
  return(Logins().select('id').where('user_name', user_name).first());
}

function loginUserName(user_name) {
  return(Logins().where('user_name', user_name).first());
}

function loginPasswordHash(user_name) {
  return(Logins().select('passwordHash').where('user_name', user_name).first());
}

function userByEmail(email) {
  return(Users().where('email', email));
}

function votesByUserDate(user_id, date) {
  return (Votes().where('user_id', user_id).where('date', date).first());
}

function voteMovies(vote_id) {
  return (Movies().join('movie_votes', 'movies.id', 'movie_votes.movie_id').where('movie_votes.vote_id', vote_id));
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
deleteRanking: deleteRanking,insertRanking: insertMovieVote,
ranking: ranking,
updateMovieVote: updateMovieVote,
deleteMovieVote: deleteMovieVote,
loginUserId: loginUserId,
loginUserName: loginUserName,
loginPasswordHash: loginPasswordHash,
votesByUserDate: votesByUserDate,
voteMovies: voteMovies,

}
