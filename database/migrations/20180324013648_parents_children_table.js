
exports.up = function(knex, Promise) {
  return knex.schema.createTable('parents_children', table=>{
    table.integer('parent_id')
    table.integer('child_id')

    table.foreign('parent_id').references('users.id')
    table.foreign('child_id').references('users.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('parents_children')
};
