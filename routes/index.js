const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('home'));

// profile
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);

module.exports = router;