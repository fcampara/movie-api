'use strict'

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addConstraint('profiles', ['name'], {
      type: 'unique'
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeConstraint('profiles', 'name', 'unique')
  }
}
