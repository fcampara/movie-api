'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('movies', 'genres', {
      type: Sequelize.ARRAY(Sequelize.STRING)
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('movies', 'genres', {
      type: Sequelize.ARRAY(Sequelize.JSONB)
    })
  }
}
