// routes/adminRoutes.js

const express = require('express');
const router  = express.Router();
const { getAllUsers, deleteUser, updateUserRole } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All admin routes require authentication + admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/users',              getAllUsers);
router.delete('/users/:id',       deleteUser);
router.put('/users/:id/role',     updateUserRole);

module.exports = router;
