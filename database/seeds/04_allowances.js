
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('allowances').del()
    .then(function () {
      // Inserts seed entries
      return knex('allowances').insert([
        { id: 1, parent_id: 1, child_id: 2, amount: 5.00, weekday: 1 }
      ])
    })
}
