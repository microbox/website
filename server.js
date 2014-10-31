'use strict';

// Set workdir as current dir
process.chdir(__dirname);


/**
 * Module dependencies.
 */
var init = require('./lib/init')();
var config = require('./lib/config');


/**
 * Main application entry file..
 * Please note that the order of loading is important.
 */


// Init the express application
var app = require('./lib/express')();

// Load Mime information
require('./lib/mime')();

// Start the app by listening on <port>
app.listen(config.port);

// Logging initialization
config.info('\x1b[34m' + 'OneBase Enterprise Web Portal Server ' + config.version + ' started on port ' + config.port + '\x1b[0m');

// Expose app
module.exports = app;

