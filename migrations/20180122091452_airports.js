exports.up = function(knex, Promise) {
  return knex.schema.createTable('airports', function(table) {
    table.integer('id');
    table.string('ident');
    table.string('type');
    table.string('name');
    table.float('latitude_deg', 14, 10);
    table.float('longitude_deg', 14, 10);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('airports');
};
