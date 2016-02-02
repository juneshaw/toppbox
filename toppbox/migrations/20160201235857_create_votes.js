exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', function(table){
    table.increments('id');
    table.integer('user_id');
    table.date('date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('votes');
};
