const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true, 
        trim: true, // Removes extra spaces

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format validation

    },
    googleId: {
        type: String, // Only for Google OAuth users
        unique: true,
        sparse: true,
    },
    avatar: String, // Optional, used for Google OAuth users
    accessToken: String, // For Google OAuth
    refreshToken: String, // For Google OAuth
    scopes: [String], // For Google OAuth
    password: {
        type: String, 
        minlenght: 8,
    }, 
    goals: [String], 
    values: [String], 
    mission: {
        type: String, 
        default : ''
    }, 
    vision: {
        type: String, 
        default: ''
    }, 
    // profileSettings: {
    //     theme: {
    //       type: String,
    //       enum: ['light', 'dark'], // Allow only "light" or "dark" themes
    //       default: 'light',
    //     },

    // notifications: {
    //     type: Boolean,
    //     default: true, // Notifications are enabled by default
    //   },
    },
  { timestamps: true })

module.exports = mongoose.model('User', UserSchema);