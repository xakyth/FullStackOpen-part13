const { Sequelize } = require('sequelize');
const { DATABASE_URL } = require('./config');
const { SequelizeStorage, Umzug } = require('umzug');

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connected to the db');
  } catch (error) {
    console.log("Couldn't connect to db", error);
    return process.exit(1);
  }
  return null;
};

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug({
    logger: console,
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    migrations: {
      glob: 'migrations/*.js',
    },
  });
  await migrator.down();
};

module.exports = { sequelize, connectToDatabase, rollbackMigration };
