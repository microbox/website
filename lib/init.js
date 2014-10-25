'use strict';

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
     * Add our server node extensions
     */
    require.extensions['.server.controller.js'] = require.extensions['.js'];
    require.extensions['.server.model.js'] = require.extensions['.js'];
    require.extensions['.server.routes.js'] = require.extensions['.js'];

    // Add require support to: yaml xml
    require('better-require')('yaml xml csv ini');


};
