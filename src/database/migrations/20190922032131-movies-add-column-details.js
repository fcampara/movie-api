'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'movies',
      'details',
      {
        type: Sequelize.JSONB,
        allowNull: false
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('movies', 'details')
  }
}
