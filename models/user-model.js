// Model
const knex = require('../knex')

//getAll works!
const getAll = (limit) => {
  return knex('users')
    .then(users => {
      console.log('model users:', users)
      return users
    })
    .catch(err => Promise.reject(err))
}

//create works!
const create = (body) => {
  return knex('users')
    .insert(body)
    .returning('*')
    .then(user => user[0])
    .catch(err => Promise.reject(err))
}

const getOneUser = (id) => {
  // console.log('ingetoneuserhdflskajflkdjasl') 
  return knex('users')
    .where('id', id)
    .then(user => {
      return user[0]
    })
    .catch(err => {
      console.log(`Model route error: ${err}`)
      Promise.reject(err)
    })
}

const checkUser = (githubId) => {
  return knex('users')
    .where('githubId', githubId)
    .then(user => {
      // console.log('user in user model:', user)
      return user[0]
    })
}

// works!
const deleteOne = (id) => {
  return knex('users')
    .where('id', id)
    .del()
    .returning('*')
    .then(user => {
      return user[0]
    })
    .catch(err => Promise.reject(err))
}

module.exports = { getAll, create, getOneUser, deleteOne, checkUser } // Model
