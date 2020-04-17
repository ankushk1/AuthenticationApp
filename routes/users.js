// const express = require('express');
// const router = express.Router();
// // const bcrypt = require('bcryptjs');
// const passport = require('passport');
// // // Load User model
// // const User = require('../models/User');

//
// const {
//   forwardAuthenticated
// } = require('../config/auth');

// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// // Register
// router.post('/register', userController.register);

// // Login
// router.post('/login', userController.login);

// // Logout
// router.get('/logout', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: res.redirect('/dashboard'),
//     failureRedirect: '/users/signin',
//     failureFlash: true
//   });
// });
// module.exports = router;
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