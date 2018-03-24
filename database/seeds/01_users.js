
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Frederick', username: 'Jimmy', password: 'password', user_type: 'parent', bank_account: 'YHGRB+zRxznmdsOV7QpZE5Ba25ut5nliF486mFhNgk=' }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
    })
}
