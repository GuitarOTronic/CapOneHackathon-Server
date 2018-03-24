
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { id: 1, name: 'Frederick', username: 'Jimmy', password: 'password', user_type: 'parent', bank_account: 'YHGRB+zRxznmdsOV7QpZE5Ba25ut5nliF486mFhNgk=' },
        { id: 2, name: 'Nemo', username: 'Fish', password: 'password', user_type: 'child', bank_account: 'XFhWXJQOVdudjhONmdsOV7QpZE5Ba25ut5pa0N75jjoLJh=' }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
    })
}
