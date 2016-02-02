
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rankings', function(table){
    table.increments('id');
    table.date('date');
    table.integer('rank');
    table.integer('movie_id');
    table.integer('earnings');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rankings');
};
