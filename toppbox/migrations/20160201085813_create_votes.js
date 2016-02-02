

exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', function(table){
    table.increments('id');
    table.integer('user_id');
    table.date('date');
    table.integer('movie_id_1');
    table.integer('movie_id_2');
    table.integer('movie_id_3');
    table.integer('movie_id_4');
    table.integer('movie_id_5');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('votes');
};
