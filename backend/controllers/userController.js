// controllers/userController.js - User profile operations

const User = require('../models/User');

// ── GET /api/user/profile ─────────────────────────────────────────────────
const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      _id:       req.user._id,
      name:      req.user.name,
      email:     req.user.email,
      role:      req.user.role,
      createdAt: req.user.createdAt,
    },
  });
};

// ── PUT /api/user/profile ─────────────────────────────────────────────────
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id:   user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile',
      error: error.message,
    });
  }
};

module.exports = { getProfile, updateProfile };
