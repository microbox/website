'use strict';

var winston = require('winston');

module.exports = function (settings) {
    return {
        env: 'development',

        logger: {
            transports: [
                new winston.transports.Console({
                    colorize: true
                })
            ]
        },

        errorLogger: {
            transports: [
                new winston.transports.Console({
                    colorize: true
                })
            ]
        }

    };
};
