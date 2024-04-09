const router = require('express').Router();
const { ReadingList, Blog, User } = require('../models');

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body;

  if (!blogId) return res.status(400).json({ error: 'blog id missing' });
  if (!userId) return res.status(400).json({ error: 'user id missing' });

  const blog = await Blog.findByPk(blogId);
  if (!blog) return res.status(400).json({ error: 'blog not found' });
  const user = await User.findByPk(userId);
  if (!user) return res.status(400).json({ error: 'user not found' });

  const createdEntry = await ReadingList.create({ userId, blogId });
  res.json(createdEntry);
});

module.exports = router;
