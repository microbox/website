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

        express: {
            template_engine: 'swig',
            cookie_signature: settings.SECURITY_COOKIE_SECRET,
            session_collection: settings.SECURITY_SESSION_KEY,
            session_secret: settings.SECURITY_SESSION_SECRET
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
