
exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', table=>{
    table.increments()
    table.integer('parent_id')
    table.integer('child_id')
    table.float('amount')
    table.string('memo')
    table.boolean('fulfilled').defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests')
};
