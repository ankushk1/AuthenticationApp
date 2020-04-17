const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//register
module.exports = {
    register:  (req, res) => {
        const {
            name,
            email,
            password,
            confirm_password
        } = req.body;
        let errors = [];

        if (!name || !email || !password || !confirm_password) {
            errors.push({
                msg: 'Please enter all fields'
            });
        }

        if (password !== confirm_password) {
            errors.push({
                msg: 'Passwords do not match'
            });
        }

        if (errors.length > 0) {
            res.render('register', {
                errors,
                name,
                email,
                password,
                confirm_password
            });
        } else {
             User.findOne({
                email: email
            }).then(user => {
                if (user) {
                    errors.push({
                        msg: 'Email already exists'
                    });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        confirm_password
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered'
                                    );
                                    res.redirect('/users/login');
                                })
                               
                        });
                    });
                }
            });
        }
    },


    //login
    login: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    },


    //logout
    logout: (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
    }

}