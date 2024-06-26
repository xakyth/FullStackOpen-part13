const router = require('express').Router();
const { Blog, User } = require('../models');
const { Op } = require('sequelize');
const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  const search = req.query.search;

  let where = {};
  if (search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${search}%` } },
        { author: { [Op.iLike]: `%${search}%` } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    include: [
      {
        model: User,
      },
    ],
    where,
    order: [['likes', 'DESC']],
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
