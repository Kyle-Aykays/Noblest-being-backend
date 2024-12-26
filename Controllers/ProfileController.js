const User = require('../Models/User');
const path = require('path');
const fs = require('fs'); // Import the fs module for file operations

const getUserProfile = async (req,res)=>{
    try{
        const { _id } = req.body; // Expecting _id in the request body
        if (!_id) {
            return res.status(400).json({
                message: 'User ID is required',
                success: false,
            });
        }
        const user = await User.findById(_id).select('-password')
        if(!user){
            return res.status(404).json({
                message: 'User not found', 
                success: false,
            })
            
        }
        res.status(200).json({
            message: "User profile retrieved successfully",
            success: true, 
            data: user,
        });
    }catch(err){
        console.error('Error fetching user profile ',err )
        res.status(500).json({
            message: "Internal Server Error", 
            success: false,
        })
    }
}; 



const updateUserProfile = async (req, res) => {
    try {
        const { _id, updates } = req.body; // Expecting _id in the request body

        if (!_id || !updates) {
            return res.status(400).json({
                message: 'User ID and updates are required',
                success: false,
            });
        }

        const allowedUpdates = ['name', 'goals', 'values', 'mission', 'vision', 'weight','BMI', 'calories','gender','height'];
        const isValidUpdate = Object.keys(updates).every((key) => allowedUpdates.includes(key));
        if (!isValidUpdate) {
            return res.status(400).json({
                message: 'Invalid updates',
                success: false,
            });
        }

        const user = await User.findByIdAndUpdate(
            _id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }

        res.status(200).json({
            message: "User profile updated successfully",
            success: true,
            data: user,
        });
    } catch (err) {
        console.error('Error updating user profile', err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


const uploadProfilePicture = async (req, res) => {
    try {
        const { _id } = req.body; // Assuming userId is passed in the body
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if the user already has a profile picture
        if (user.avatar) {
            const oldFilePath = path.join(__dirname, '..', user.avatar);
            fs.unlink(oldFilePath, (err) => {
                if (err) {
                    console.error(`Failed to delete old profile picture: ${err.message}`);
                } else {
                    console.log(`Old profile picture deleted: ${oldFilePath}`);
                }
            });
        }

        // Save file path in the user's avatar field
        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile picture uploaded successfully',
            avatar: user.avatar,
        });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};



module.exports = {
    getUserProfile,
    updateUserProfile,
    uploadProfilePicture
};