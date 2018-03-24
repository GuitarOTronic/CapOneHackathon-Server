
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        { id: 1, parent_id: 1, child_id: 2, amount: 250.00, memo: 'I need a Snickers', status: 'pending' }
      ])
    })
}
