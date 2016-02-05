
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table){
    table.increments('id');
    table.string('name');
    table.integer('total_earnings');
    table.string('photo_link');
    table.string('trailer_link');
    table.float('popularity');
    table.string('overview');
    table.string('original_language');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
