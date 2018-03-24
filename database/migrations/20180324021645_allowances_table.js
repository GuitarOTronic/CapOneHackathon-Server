
exports.up = function(knex, Promise) {
  return knex.schema.createTable('allowances', table=>{
    table.increments()
    table.integer('parent_id')
    table.integer('child_id')
    table.float('amount')
    table.integer('weekday')

    table.foreign('parent_id').references('users.id')
    table.foreign('child_id').references('users.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('allowances')
}
