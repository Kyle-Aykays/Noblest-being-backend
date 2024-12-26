const express = require('express');
// const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const upload = require('../Middlewares/uploadMiddleware');
const { getUserProfile, updateUserProfile,uploadProfilePicture } = require('../Controllers/ProfileController');

// Route to get user profile
router.post('/getprofile', getUserProfile);

// Route to update user profile
router.put('/updateProfile', updateUserProfile);
router.post('/uploadProfilePicture', upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;
