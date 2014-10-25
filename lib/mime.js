/**
 * Copyright 2014 Microbox
 *
 * Created by ling on 9/11/14.
 */

'use strict';

var mime = require('mime');

module.exports = function () {

    mime.define({
        'text/jade': ['jade'],
        'text/stylus': ['stylus', 'styl'],
        'text/less': ['less'],
        'text/x-sass': ['sass'],
        'text/x-scss': ['scss'],
        'text/coffeescript': ['coffee'],
        'text/x-handlebars-template': ['hbs'],
        'text/jsx': ['jsx'],
        'application/x-ms-application': ['application']
    });

};
