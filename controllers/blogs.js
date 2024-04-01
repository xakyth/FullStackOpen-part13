const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/ ', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

const findById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.delete('/:id', findById, async (req, res) => {
  if (!req.blog) {
    res.status(404).end();
    return;
  }
  await req.blog.destroy();
  res.status(204).end();
});

router.put('/:id', findById, async (req, res) => {
  if (req.blog) {
    if (!isNaN(Number(req.body.likes))) req.blog.likes = req.body.likes;
    req.blog = await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
