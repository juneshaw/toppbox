
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movie_votes', function(table){
    table.increments('id');
    table.integer('vote_id');
    table.integer('movie_id');
    table.integer('rank');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movie_votes');
};
