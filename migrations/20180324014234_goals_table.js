
exports.up = function(knex, Promise) {
  return knex.schema.createTable('goals', table=>{
    table.increments()
    table.integer('user_id')
    table.string('type')
    table.float('amount')
    table.boolean('accomplished')

  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('goals')
};
