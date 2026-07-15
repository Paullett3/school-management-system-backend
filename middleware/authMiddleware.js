// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. Verify Authentication Token
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header as a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Decode JWT token to extract user ID and Role
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'omni_secret_key');

      // Attach user object to the request (excluding password)
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// 2. Role-Based Access Control (RBAC) Guard
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if the authenticated user's role is in the allowed list
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not authorized to access this resource`,
      });
    }
    next();
  };
};

// 3. Locked Record Guard (Only Admin/Registrar can bypass or edit locked items)
export const checkRecordLock = async (req, res, next) => {
  const { isLocked } = req.body; // Or fetch target record from DB by req.params.id
  const staffRoles = ['admin', 'registrar'];

  // If record is locked, deny modification unless user is Admin or Registrar
  if (isLocked && !staffRoles.includes(req.user.role)) {
    return res.status(403).json({
      message: 'Access Denied: This academic record is locked. Only authorized staff can modify it.',
    });
  }
  next();
};