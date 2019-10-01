"use strict";'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn(
        'movies',
        'created_at',
        {
          type: Sequelize.DATE,
          allowNull: true
        }
      ),
      await queryInterface.addColumn(
        'movies',
        'updated_at',
        {
          type: Sequelize.DATE,
          allowNull: true
        }
      )
    ]
  },

  down: async (queryInterface) => {
    return [
      await queryInterface.removeColumn('movies', 'created_at'),
      await queryInterface.removeColumn('movies', 'updated_at')
    ]
  }
}
