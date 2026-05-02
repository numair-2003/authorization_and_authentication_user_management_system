// controllers/authController.js 
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const signup = async (req, res) => {
  try {
    console.log('\n========================================');
    console.log('SIGNUP REQUEST RECEIVED');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('========================================\n');

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      console.log('Missing fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password',
      });
    }

    console.log('Checking existing user...');
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists',
      });
    }

    console.log('Creating user...');
    const allowedRole = role === 'admin' ? 'user' : (role || 'user');
    
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: allowedRole 
    });
    
    console.log('User created:', user._id.toString());

    console.log('Generating token...');
    const token = generateToken(user._id);
    console.log('Token generated');

    console.log('Sending response...\n');

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('\nSIGNUP ERROR');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('\n');
    
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

module.exports = { signup, login, getMe };