"use strict";'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      profile_id: {
        type: Sequelize.INTEGER,
        references: { model: 'profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      watched: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      want_watch: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('movies')
  }
}
