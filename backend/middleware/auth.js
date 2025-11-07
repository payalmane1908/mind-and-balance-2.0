const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Get token from header (supports both x-auth-token and Authorization: Bearer)
    let token = req.header('x-auth-token');
    if (!token) {
      const authHeader = req.header('authorization') || req.header('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring('Bearer '.length);
      }
    }

    // Check if no token
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'balancemind_secret');
    
    // Add user from payload
    req.user = await User.findById(decoded.userId).select('-password');
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};