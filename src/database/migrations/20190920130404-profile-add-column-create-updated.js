'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn(
        'profiles',
        'created_at',
        {
          type: Sequelize.DATE,
          allowNull: true
        }
      ),
      await queryInterface.addColumn(
        'profiles',
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
      await queryInterface.removeColumn('profiles', 'created_at'),
      await queryInterface.removeColumn('profiles', 'updated_at')
    ]
  }
}
