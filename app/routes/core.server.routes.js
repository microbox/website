'use strict';

/**
 * Module dependencies.
 */

module.exports = function (app) {

    // Root routing
    var core = require('../controllers/core.server.controller');
    app.route('/').get(core.index);

};
