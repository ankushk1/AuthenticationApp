const express = require('express');
const router = express.Router();
const {
  forwardAuthenticated
} = require('../config/auth');
const userController = require('../controllers/users_controller');


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));



// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Logout
router.get('/logout', userController.logout);

module.exports = router;
