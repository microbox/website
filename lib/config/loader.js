/**
 * Copyright 2014 Bestinet Sdn.Bhd.
 *
 * Created by ling on 10/26/14.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = function () {

    /**
     * Load app configurations
     */
    var settings = require('./settings.yaml');
    var customSettingsFile = path.join(__dirname, '../../conf/' + process.env.NODE_ENV + '.yaml');

    if (fs.existsSync(customSettingsFile)) {
        var custom = require(customSettingsFile);
        for (var k in custom) {
            if (custom.hasOwnProperty(k)) {
                if (custom[k] !== null) {
                    settings[k] = custom[k];
                }
            }
        }

    } else {
        console.log('Custom setting file `' + customSettingsFile + '` is not found');
    }

    /**
     * This is the last chance to get mandatory configurations from environment variables.
     */
    var fulfilled = true;
    for (var key in settings) {
        if (settings.hasOwnProperty(key)) {
            if (settings[key] === null) {
                if (typeof process.env[key] !== 'undefined') {
                    console.log('Applying ' + key + ' from environment value `' + process.env[key] + '`');
                    settings[key] = process.env[key];
                } else {
                    fulfilled = false;
                    console.log('Missing environment variable: ' + key);
                }
            }
        }
    }

    if (!fulfilled) {
        console.log('Prerequisite environment variable is missing, stopping the server');
        process.exit(1);
    }

    return settings;

};
