const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Blog, User } = require('../models');
const { JWT_SECRET } = require('../util/config');
const { Op } = require('sequelize');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

router.get('/', async (req, res) => {
  const search = req.query.search;
  console.log('search', search);

  const where = {};
  if (search) {
    where.title = {
      [Op.iLike]: search,
    };
  }

  const blogs = await Blog.findAll({
    include: [
      {
        model: User,
      },
    ],
    where,
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.decodedToken.id });
  res.json(blog);
});

const findById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.delete('/:id', tokenExtractor, findById, async (req, res) => {
  if (!req.blog) {
    return res.status(404).end();
  }

  if (req.blog.userId !== req.decodedToken.id) {
    return res.status(400).json({ error: 'only creator can delete the blog' });
  }

  await req.blog.destroy();
  res.status(204).end();
});

router.put('/:id', findById, async (req, res) => {
  req.blog.likes = req.body.likes;
  req.blog = await req.blog.save();
  res.json(req.blog);
});

module.exports = router;
