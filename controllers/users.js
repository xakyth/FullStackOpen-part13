const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
      },
    ],
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: ['name', 'username'],
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: { attributes: [] },
      },
    ],
  });
  if (!user) return res.status(404).end();

  res.json(user);
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
