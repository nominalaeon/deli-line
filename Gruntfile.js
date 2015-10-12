/*global module:false*/

module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    var helperPartial = require('handlebars-helper-partial');

    var rootConfig = {
        app: 'app',
        build: 'htdocs',
        templates: 'app/templates'
    };

    // Project configuration.
    grunt.initConfig({
        root: rootConfig,

        // Metadata
        pkg: grunt.file.readJSON('package.json'),

        // Tasks
        assemble: {
            options: {
                expand: true,
                helpers: ['handlebars-helper-partial'],
                layout: ['<%= root.templates %>/page-layout.hbs'],
                partials: [
                    '<%= root.templates %>/components/*.hbs',
                    '<%= root.templates %>/partials/*.hbs'
                ],
                data: ['<%= root.app %>/data/*.yaml', '<%= root.app %>/data/*.json']
            },
            pages: {
                options: {
                    flatten: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= root.app %>/templates/pages',
                    src: ['**/*.hbs'],
                    dest: '<%= root.app %>'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 10']
            },
            main: {
                src: '<%= root.build %>/assets/css/styles.css',
                dest: '<%= root.app %>/assets/css/styles.css'
            }
        },

        clean: [
            '<%= root.app %>/*.html',
            '<%= root.build %>'
        ],

        compass: {
            dist: {
                options: {
                    outputStyle: 'expanded',
                    sassDir: '<%= root.app %>/sass',
                    cssDir: '<%= root.app %>/assets/css'
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            utils: {
                src: [
                    '<%= root.app %>/scripts/utils/initializr.js',
                    '<%= root.app %>/scripts/init.js',
                    '<%= root.app %>/scripts/utils/french-dip.js',
                    '<%= root.app %>/scripts/utils/sizer.js'
                ],
                dest: '<%= root.app %>/assets/js/utils.js'
            },
            components: {
                src: [
                    '<%= root.app %>/scripts/components/**/*.js'
                ],
                dest: '<%= root.app %>/assets/js/components.js'
            }
        },
        connect: {
            server: {
                options: {
                    host: '*',
                    port: 8000,
                    base: '<%= root.app %>'
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= root.app %>',
                    src: [
                        'favicon*',
                        '*.xml',
                        'assets/images/**/*',
                        'assets/css/**/*',
                        'assets/fonts/**/*',
                        'assets/documents/*.pdf',
                        'vendor/**/*',
                        '**/*.html'
                    ],
                    dest: '<%= root.build %>'
                }]
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: '<%= root.app %>/assets/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= root.build %>/assets/'
                }]
            }
        },
        cssmin: {
            '<%= root.build %>/assets/css/styles.css': '<%= root.app %>/assets/css/styles.css'
        },
        spell: {
            files: ['src/app/data/*.yaml']
        },
        uglify: {
            static_mappings: {
                files: [{
                    src: '<%= root.app %>/assets/js/utils.js',
                    dest: '<%= root.build %>/assets/js/utils.js'
                }, {
                    src: '<%= root.app %>/assets/js/components.js',
                    dest: '<%= root.build %>/assets/js/components.js'
                }]
            }
        },
        watch: {
            dev: {
                files: [
                    '<%= root.app %>/templates/**/*.hbs',
                    '<%= root.app %>/sass/**/*.scss',
                    '<%= root.app %>/vendor/bootstrap-sass-official/assets/stylesheets/bootstrap/bootstrap-overrides.scss',
                    '<%= root.app %>/scripts/**/*.js'
                ],
                tasks: ['assemble', 'compass', 'concat'],
                options: {
                    livereload: true
                }
            }
        },
        wiredep: {
            task: {
                src: [
                    '<%= root.templates %>/page-layout.hbs'
                ],
                ignorePath: /\.\.\//
            }
        }
    });

    grunt.registerTask('default', [
        'assemble',
        'compass',
        'concat',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('serve', [
        'assemble',
        'compass',
        'concat',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'assemble',
        'compass',
        'concat',
        'uglify',
        'cssmin',
        'copy:build',
        'imagemin'
    ]);
};