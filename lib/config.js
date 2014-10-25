'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Load app configurations
 */
var settings = require('../conf/settings.yaml');

/**
 * Apply settings to application config
 */
module.exports = _.extend(require('./conf/base')(settings), require('./conf/env/' + process.env.NODE_ENV)(settings) || {});
