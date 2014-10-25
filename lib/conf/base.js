/**
 * Copyright 2014 Microbox
 *
 * Created by ling on 5/23/14.
 */


'use strict';

module.exports = function (settings) {
    return {
        host: settings.host || process.env.HOST || '0.0.0.0',
        port: settings.port || process.env.PORT || 3000,

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
            cookie_signature: settings.security_cookie_secret,
            session_collection: settings.security_session_key,
            session_keys: settings.security_session_secrets
        },


        mail: {
            enable: true,
            transport: 'SMTP',
            fromaddress: settings.email,
            options: {
                service: settings.mailer_service,
                auth: {
                    user: settings.mailer_user,
                    pass: settings.mailer_pass
                }
            }
        }
    };
};
