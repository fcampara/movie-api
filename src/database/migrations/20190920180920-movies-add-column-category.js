'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('movies', 'genres', {
      type: Sequelize.ARRAY(Sequelize.JSONB),
      allowNull: false
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('movies', 'genres')
  }
}
