const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the db');
  } catch (error) {
    console.log("Couldn't connect to db", error);
    return process.exit(1);
  }
  return null;
};

module.exports = { sequelize, connectToDatabase };
