const { verifyToken } = require('../services/authService');
const { Session } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Check if session exists
    const session = await Session.findOne({ where: { token, userId: decoded.userId } });
    if (!session || new Date() > session.expiresAt) {
      return res.status(401).json({ error: 'Session expired' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    const { User } = require('../models');
    const user = await User.findByPk(req.user.userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = { authMiddleware, adminMiddleware };
