
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('parents_children').del()
    .then(function () {
      return knex('parents_children').insert([
        { parent_id: 1, child_id: 2 }
      ])
    })
}
