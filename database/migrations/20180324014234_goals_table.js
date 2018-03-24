
exports.up = function(knex, Promise) {
  return knex.schema.createTable('goals', table=>{
    table.increments()
    table.integer('user_id')
    table.string('type')
    table.float('amount')
    table.boolean('accomplished').defaultTo(false)

    table.foreign('user_id').references('users.id')
  })
}

exports.down = function(knex, Promise) {
  knex.schema.dropTable('goals')
}
