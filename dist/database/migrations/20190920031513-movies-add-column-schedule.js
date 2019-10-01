"use strict";'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'movies',
      'schedule_to',
      {
        type: Sequelize.DATE,
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('movies', 'schedule_to')
  }
}
