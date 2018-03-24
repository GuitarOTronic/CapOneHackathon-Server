
exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', table=>{
    table.increments()
    table.integer('parent_id')
    table.integer('child_id')
    table.float('amount')
    table.string('memo')
    table.string('status').defaultTo('pending')

    table.foreign('parent_id').references('users.id')
    table.foreign('child_id').references('users.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests')
}
