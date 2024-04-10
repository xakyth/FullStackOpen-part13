const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const { ActiveSession, User } = require('../models');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const token = authorization.substring(7);
    try {
      const session = await ActiveSession.findOne({ where: { token } });
      if (!session) return res.status(401).json({ error: 'token expired' });

      const decodedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(decodedToken.id);
      if (!user || user.disabled)
        return res.status(401).json({ error: 'user deleted or disabled' });

      req.decodedToken = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

module.exports = {
  tokenExtractor,
};
