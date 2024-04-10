const { ActiveSession } = require('../models');

const router = require('express').Router();

router.delete('/', async (req, res) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const token = authorization.substring(7);
    const session = await ActiveSession.findOne({ where: { token } });
    const deletedSession = await session.destroy();
    res.status(401).json(deletedSession);
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
});

module.exports = router;
