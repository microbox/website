'use strict';

var globber = require('./globber');

/**
 * Module init function.
 */
module.exports = function (env) {

    // Override NODE_ENV in grunt build
    if (env) {
        process.env.NODE_ENV = env || 'production';
    } else {
        process.env.NODE_ENV = process.env.NODE_ENV || 'production';
    }

    /**
     * Before we begin, lets set the environment variable
     * We'll Look for a valid NODE_ENV variable and if one cannot be found load the development NODE_ENV
     */
    var customSettingFiles = globber('./conf/' + process.env.NODE_ENV + '.yaml');


    console.log();
    if (!customSettingFiles.length) {
        if (process.env.NODE_ENV) {
            console.error('\x1b[31m', 'No configuration file found for "' + process.env.NODE_ENV + '", using environment variables instead', '\x1b[0m');
        } else {
            console.error('\x1b[31m', 'NODE_ENV is not defined! Using default development environment', '\x1b[0m');
        }
        process.env.NODE_ENV = 'development';
    } else {
        console.log('\x1b[7m', 'Application loaded using the "' + process.env.NODE_ENV + '" environment configuration', '\x1b[0m');
    }
    console.log();


    /**
     * Add our server node extensions
     */
    require.extensions['.server.controller.js'] = require.extensions['.js'];
    require.extensions['.server.model.js'] = require.extensions['.js'];
    require.extensions['.server.routes.js'] = require.extensions['.js'];

    // Add require support to: yaml xml
    require('better-require')('yaml xml csv ini');


};
