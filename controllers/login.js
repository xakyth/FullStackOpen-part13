const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../util/config');
const { User } = require('../models');

router.post('/', async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!(user && req.body.password === 'secret')) {
    return res.status(400).json({ error: 'invalid username or password' });
  }

  const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET);

  res.status(200).json({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = router;
