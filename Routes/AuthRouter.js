const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

const express = require('express');
const passport = require('passport');

// Redirect to Google login
router.get('/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

// Google callback route
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful login, redirect to profile
        res.redirect('/profile');
    }
);

// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});
router.post('/login',loginValidation, login);
router.post('/signup',signupValidation, signup);
module.exports = router;