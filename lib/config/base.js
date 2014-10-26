/**
 * Copyright 2014 Microbox
 *
 * Created by ling on 5/23/14.
 */


'use strict';

module.exports = function (settings) {

    return {

        host: settings.HOST || process.env.HOST || '0.0.0.0',
        port: settings.PORT || process.env.PORT || 3000,

        security: {
            authenticate: true
        },

        options: {
            payload: {
                maxBytes: 20971520, //20MB
                uploads: require('os').tmpDir()
            },
            validation: {
                allowUnknown: true
            },
            load: {
                sampleInterval: 10000 /* capture server load every 10 secs */
            }
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
            fromaddress: settings.email,
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
