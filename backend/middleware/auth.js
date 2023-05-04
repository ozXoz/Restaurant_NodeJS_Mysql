// middleware/auth.js
const jwt = require('jsonwebtoken'); // Add this line
const invalidTokens = require('../store/invalidTokens');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  // Check if token is invalidated
  if (invalidTokens.includes(token)) {
    return res.status(401).send({ message: 'Token is invalidated' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    req.userId = decoded.id;
    next();
  });
};
