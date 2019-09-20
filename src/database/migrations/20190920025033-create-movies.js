'use strict'

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
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
