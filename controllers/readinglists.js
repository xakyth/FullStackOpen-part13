const router = require('express').Router();
const { ReadingList, Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');

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

router.put('/:id', tokenExtractor, async (req, res) => {
  const { id } = req.params;
  let readingEntry = await ReadingList.findByPk(id);
  if (!readingEntry) return res.status(404).end();

  if (req.decodedToken.id !== readingEntry.userId)
    return res.status(400).json({ error: 'no permission' });

  const { read } = req.body;
  if (!read)
    return res.status(400).json({ error: 'read param should be specified' });

  readingEntry.read = read;
  readingEntry = await readingEntry.save();

  res.json(readingEntry);
});

module.exports = router;
