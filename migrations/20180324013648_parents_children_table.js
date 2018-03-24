
exports.up = function(knex, Promise) {
  return knex.schema.createTable('parents_children', table=>{
    table.integer('parent_id')
    table.integer('child_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('parents_children')
};
