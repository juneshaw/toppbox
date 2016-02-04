exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('passwordHash')
    table.string('photo_link');
    table.string('bio')
    table.integer('total_score');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
