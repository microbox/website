'use strict';

/**
 * Module dependencies
 */
var path = require('path');
var express = require('express');
var expressWinston = require('express-winston');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var responseTime = require('response-time');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var helmet = require('helmet');
var passport = require('passport');
var flash = require('connect-flash');
var consolidate = require('consolidate');
var _ = require('lodash');
var config = require('./config');
var globber = require('./globber');


module.exports = function () {

    // Initialize express app
    var app = express();
    var vars = config.variables;
    var express_config = config.express;

    // Set environment
    app.set('env', config.env);
    config.info('======> Applying Settings');

    // Setting application local variables
    _.forEach(vars, function (value, key) {
        config.info(key, '=', value);
        app.set(key, value);
    });

    // Set swig as the template engine
    app.engine('server.view.html', consolidate[express_config.template_engine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', path.join(__dirname, '../app/views'));

    // Setting favicon
    app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

    // Showing response time
    app.use(responseTime());

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });

    // Setting the static folder
    if ('production' === app.get('env')) {

        // Enable etag for better performance
        app.enable('etag');

        // Should be placed before express.static
        app.use(compress({
            filter: function (req, res) {
                // Compress text response
                return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
            },
            level: 1
        }));

        // Enable static file cache for 1 day
        app.use(express.static(path.join(__dirname, '../public'), {
            maxAge: 86400000 /* one day*/
        }));

        // Standard Apache combined log output.
        app.use(morgan('combined'));

        // Enable memory cache
        app.locals.cache = 'memory';

    } else {

        // Showing stack errors
        app.set('showStackError', true);

        app.use(express.static(path.join(__dirname, '../public')));

        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);

        // Due to performance reason, only live reload on desktop
        app.use(function (req, res, next) {
            if (req.hostname === 'localhost' || req.hostname === '127.0.0.1' || req.hostname === 'onestack.dev') {
                res.locals.livereload = true;
            }
            next();
        });

    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Enable jsonp
    app.enable('jsonp callback');

    // CookieParser should be above session
    app.use(cookieParser(config.SECURITY_COOKIE_SECRET));

    // Cookie session storage
    app.use(cookieSession({
        name: vars.SECURITY_SESSION_KEY,
        secret: vars.SECURITY_SESSION_SECRET
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages
    app.use(flash());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // Globbing routing files
    globber(path.join(__dirname, '../app/routes/**/*.js')).forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    // express-winston errorLogger makes sense AFTER the router.
    app.use(expressWinston.errorLogger(config.errorLogger));

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {

        // If the error object doesn't exists, treat as 404
        if (!err) {
            return next();
        }

        // If 'not found' in the error msgs, treat as 404
        if (~err.message.indexOf('not found')) {
            return next();
        }

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;
};
