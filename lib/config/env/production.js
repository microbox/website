'use strict';

var winston = require('winston');

module.exports = function (settings) {

    require('winston-sendmail');

    var config = {
        env: 'production',

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

    if (settings.MAILER) {
        config.errorLogger.transports.push(
            new(winston.transports.Mail)({
                level: 'info',
                from: 'Microbox.io ' + settings.VERSION + '<noreply-website-logger@microbox.io>',
                to: 'log@microbox.io',
                transport: 'SMTP',
                options: {
                    service: settings.MAILER_SERVICE,
                    auth: {
                        user: settings.MAILER_USER,
                        pass: settings.MAILER_PASS
                    }
                }
            })
        );
    }


    return config;
};
