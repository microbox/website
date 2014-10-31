'use strict';


/**
 * Module dependencies.
 */
var _ = require('lodash');
var winston = require('winston');

/**
 * Load app settings
 */
var settings = require('./loader')();


/**
 * Apply settings to application config
 */
module.exports = _.extend(require('./base')(settings), require('./env/' + process.env.NODE_ENV)(settings) || {});

/**
 * Export a nicer version
 */
module.exports.version = module.exports.variables.VERSION;

/**
 * Create logger
 */
var logger = new(winston.Logger)(module.exports.logger);

module.exports.log = function () {
    logger.log.apply(logger.log, arguments);
};

module.exports.info = function () {
    logger.info.apply(logger.log, arguments);
};

module.exports.error = function () {
    logger.error.apply(logger.log, arguments);
};
