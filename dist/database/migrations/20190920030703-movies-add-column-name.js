"use strict";'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'movies',
      'movie_name',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('movies', 'movie_name')
  }
}
