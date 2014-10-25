'use strict';


/**
 * Module dependencies.
 */

exports.index = function (req, res) {
    res.render('index', {
        user: req.user || null
    });
};


exports.signin = function (req, res) {
    res.render('signin', {
        user: req.user || null
    });
};


exports.signup = function (req, res) {
    res.render('signup', {
        user: req.user || null
    });
};


exports.support = function (req, res) {
    res.render('support', {
        user: req.user || null
    });
};
