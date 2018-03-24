
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goals').del()
    .then(function () {
      // Inserts seed entries
      return knex('goals').insert([
        { id: 1, user_id: 2, type: 'money', amount: 2500.00, accomplished: false }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('goals_id_seq', (SELECT MAX(id) FROM goals));`)
    })
}
