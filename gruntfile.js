'use strict';

module.exports = function (grunt) {

    // Banner will include in all js and css file
    var banner = '/*! \n' +
        '* <%= pkg.title || pkg.name %> v<%= pkg.version %> (<%= pkg.homepage%>)\n' +
        '* Copyright <%= grunt.template.today("yyyy") %> - <%= pkg.author %>\n' +
        '* Build at <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n';

    // Unified Watch Object
    var watchFiles = {
        serverViews: ['app/**/*.server.view.html'],
        serverJS: ['lib/**/*.js', 'app/*[!tests]*/*.js'],
        serverTests: ['lib/tests/**/*.js'],
        clientViews: ['public/modules/**/*.client.view.html', 'public/pages/**/*.client.view.html'],
        clientJS: ['public/*.js','public/**/.js'],
        clientCSS: ['public/*.css', 'public/**/*.css'],
        clientLESS: ['public/*.less', 'public/**/*.less'],
        clientTests: []
    };

    var allFiles = watchFiles.serverTests
        .concat(watchFiles.serverJS)
        .concat(watchFiles.clientJS)
        .concat(watchFiles.clientTests);

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
         * JSLint, CSSLint, LESSLint
         * ===========================================
         */
        // region JSLint, CSSLint, LESSLint, Autoreload definition
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        jsbeautifier: {
            options: {
                html: {
                    braceStyle: 'collapse',
                    indentChar: ' ',
                    indentScripts: 'keep',
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u'],
                    wrapLineLength: 0
                },
                js: {
                    braceStyle: 'collapse',
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: ' ',
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: true,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            },
            all: {
                src: allFiles
            }
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS)
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: watchFiles.clientCSS
            }
        },
        lesslint: {
            all: {
                src: watchFiles.clientLESS
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['newer:csslint:all'],
                options: {
                    livereload: true
                }
            },
            clientLESS: {
                files: watchFiles.clientLESS,
                tasks: ['newer:lesslint:all'],
                options: {
                    livereload: true
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        }
        // endregion
    });

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Default task(s).
    grunt.registerTask('default', ['lint', 'concurrent:default']);

    // Debug task.
    grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    // Lint task(s).
    grunt.registerTask('lint', ['jsbeautifier', 'jshint', 'jscs', 'csslint', 'lesslint']);
};
