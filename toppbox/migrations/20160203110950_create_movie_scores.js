
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movie_scores', function(table){
    table.increments('id');
    table.date('date');
    table.integer('rank');
    table.integer('movie_id');
    table.integer('total_earnings');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movie_scores');
};
