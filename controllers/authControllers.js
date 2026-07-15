// controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper function to generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'omni_secret_key', {
    expiresIn: '30d',
  });
};

/**
 * @desc    Universal Test Login (Any Email + Password '1234')
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  const { email, password, requestedRole } = req.body;

  // 1. Enforce default password '1234' for initial testing workability
  if (password !== '1234') {
    return res.status(401).json({ message: 'Invalid credentials. Please use default password 1234.' });
  }

  try {
    // 2. Check if user already exists in the database
    let user = await User.findOne({ email });

    // 3. If user doesn't exist, dynamically create them for frictionless testing
    if (!user) {
      user = await User.create({
        name: `${requestedRole.toUpperCase()} (${email.split('@')[0]})`,
        email,
        password: '1234',
        role: requestedRole || 'student', // Default to student if no role chosen
      });
    } else if (requestedRole && user.role !== requestedRole) {
      // Allow role switching during testing phase
      user.role = requestedRole;
      await user.save();
    }

    // 4. Return user profile and token to frontend
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during authentication', error: error.message });
  }
};