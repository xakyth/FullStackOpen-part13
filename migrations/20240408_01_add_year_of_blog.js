const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1994,
          msg: 'date of the blog cannot be lesser than 1994',
        },
        max: {
          args: new Date().getFullYear(),
          msg: 'date of the blog cannot be higher than current year',
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year');
  },
};
