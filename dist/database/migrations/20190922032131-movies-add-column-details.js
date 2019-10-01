"use strict";'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'movies',
      'details',
      {
        type: Sequelize.JSONB,
        allowNull: true
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('movies', 'details')
  }
}
