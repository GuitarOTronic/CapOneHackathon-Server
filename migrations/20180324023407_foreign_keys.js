
exports.up = function(knex, Promise) {
  knex.schema.alterTable('parents_children', table=>{
    table.integer('parent_id').references('users.ID').alter()
    table.integer('client_id').references('users.ID').alter()

  })
};

exports.down = function(knex, Promise) {

};

//
// knex.schema.alterTable('user', function(t) {
//   t.increments().primary(); // add
//   // drops previous default value from column, change type to string and add not nullable constraint
//   t.string('username', 35).notNullable().alter();
//   // drops both not null contraint and the default value
//   t.integer('age').alter();
// });
