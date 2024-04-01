require('dotenv').config();
const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');
const app = express();

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

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    res.status(404).end();
    return;
  }
  await blog.destroy();
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
