module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymans', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('deliverymans', 'user_id');
  },
};
