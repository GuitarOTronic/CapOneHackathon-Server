// 'users' table

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table=>{
    table.increments()
    table.string('name')
    table.string('username')
    table.string('password')
    table.string('user_type')
    table.string('bank_account')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
