import jwt from 'jsonwebtoken';
import { Storage } from '../services/storageService.js';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'forgefit_super_secret_jwt_key_982347109238470129384';
    const decoded = jwt.verify(token, secret);

    // Look up user in storage
    let user = Storage.findById('users', decoded.id);
    if (!user) {
      // Try Mongoose
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (e) {
        // Ignored
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The token belongs to a user that no longer exists.',
      });
    }

    // Attach user (without password)
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
      error: error.message,
    });
  }
};
