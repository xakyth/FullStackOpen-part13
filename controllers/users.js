const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put('/:username', async (req, res) => {
  let user = await User.findOne({
    where: { username: req.params.username },
  });
  user.setDataValue('username', req.body.username);
  user = await user.save();
  res.json(user);
});

module.exports = router;
