const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
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
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: 'blog' }
);

module.exports = Blog;
