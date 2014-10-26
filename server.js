'use strict';

// Set workdir as current dir
process.chdir(__dirname);


/**
 * Module dependencies.
 */
var pkg = require('./package');
var init = require('./lib/init')();
var config = require('./lib/config');


/**
 * Main application entry file..
 * Please note that the order of loading is important.
 */


// Init the express application
var app = require('./lib/express')(config.express);

// Load Mime information
require('./lib/mime')();

// Start the app by listening on <port>
app.listen(config.port);

// Logging initialization
console.log('OneBase Enterprise Web Portal Server ' + pkg.version + ' started on port ' + config.port);

// Expose app
module.exports = app;

