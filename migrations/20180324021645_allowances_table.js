
exports.up = function(knex, Promise) {
  return knex.schema.createTable('allowances', table=>{
    table.increments()
    table.integer('parent_id')
    table.integer('child_id')
    table.float('amount')
    table.integer('weekday')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('allowances')
};
