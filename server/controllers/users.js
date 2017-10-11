const mongoose = require('mongoose');
const User = mongoose.model('User');
const session = require('express-session');
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {

    login_registration: function (req, res) {
        context = {};
        if (req.session.login_errors) {
            context.login_errors = req.session.login_errors;
            req.session.login_errors = false;
        }
        if (req.session.registration_errors) {
            context.registration_errors = req.session.registration_errors;
            req.session.registration_errors = false;
        }
        context.session = req.session;
        res.render('index', context);
    },

    logout: function (req, res) {
        req.session.user = undefined;
        res.redirect('/');
    },

    process_login: function (req, res) {
        User.findOne({ email: req.body['email'] }, function (err, user) {
            if (err || !user) {
                req.session.login_errors = true;
                res.redirect('/');
            } else {
                bcrypt.compare(req.body['password'], user.password, function(err, isMatch){
                    if (err || !isMatch) {
                        req.session.login_errors = true;
                        res.redirect('/');
                    } else {
                        req.session.userid = user._id;
                        res.redirect('/user');
                    }
                });
            }
        });
    },

    process_registration: function (req, res) {
        req.session.registration_errors = [];
        var newUser = new User();
        newUser.email = req.body['email'];
        newUser.name.first = req.body['first_name'];
        newUser.name.last = req.body['last_name'];
        newUser.birthday = req.body['birthday'];
        if(req.body['password'] != req.body['confirm_password']) {
            req.session.registration_errors.push("Passwords do not match");
        }
        newUser.password = req.body['password'];
        newUser.save(function(err){
            if(err || req.session.registration_errors.length > 0) {
                for(var x in newUser.errors) {
                    req.session.registration_errors.push(newUser.errors[x].message);
                }
                res.redirect('/');
            } else {
                req.session.userid = newUser._id;
                res.redirect('/user');
            }
        });
    },

    user_page: function (req, res) {
        User.findOne({ _id: req.session.userid }, function (err, user) {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            context = {};
            context['user'] = user;
            res.render('user', context);
        });
    }
}
