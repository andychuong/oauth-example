exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
          {
            id: 1,
            username: 'rafischer1', 
            githubId: 39342327
          }
        ])
        .then(function() {
          return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
        })
    })
}
