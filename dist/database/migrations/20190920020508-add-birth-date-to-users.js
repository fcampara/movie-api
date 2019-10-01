"use strict";'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'birth_day',
      {
        type: Sequelize.DATE,
        allowNull: true
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'birth_day')
  }
}
