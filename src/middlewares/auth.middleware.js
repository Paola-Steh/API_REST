const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateToken = (requiredRoles = []) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).json({ message: 'Token error' });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Malformed token' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('+password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

module.exports = authenticateToken;