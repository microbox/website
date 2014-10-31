/**
 * Copyright 2014 Microbox
 *
 * Created by ling on 5/23/14.
 */

'use strict';

module.exports = function (settings) {

    return {

        host: settings.HOST,
        port: settings.PORT,

        security: {
            authenticate: true
        },

        variables: settings,

        express: {
            template_engine: 'swig'
        },

        mail: {
            enable: true,
            transport: 'SMTP',
            fromaddress: settings.EMAIL,
            options: {
                service: settings.MAILER_SERVICE,
                auth: {
                    user: settings.MAILER_USER,
                    pass: settings.MAILER_PASS
                }
            }
        }
    };

};
