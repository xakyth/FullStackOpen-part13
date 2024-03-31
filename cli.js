require('dotenv').config();
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

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
  },
  { sequelize, underscored: true, timestamps: false, modelName: 'blog' }
);

const main = async () => {
  try {
    const blogs = await Blog.findAll();
    blogs.forEach((b) =>
      console.log(
        `${b.dataValues.author}: '${b.dataValues.title}', ${b.dataValues.likes} likes`
      )
    );
    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
