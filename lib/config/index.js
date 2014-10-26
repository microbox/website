'use strict';


/**
 * Module dependencies.
 */
var _ = require('lodash');


/**
 * Load app settings
 */
var settings = require('./loader')();


/**
 * Apply settings to application config
 */
module.exports = _.extend(require('./base')(settings), require('./env/' + process.env.NODE_ENV)(settings) || {});
