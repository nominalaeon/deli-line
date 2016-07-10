module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var rootConfig = {
        src: 'src',
        dist: 'dist',
        templates: 'src/templates'
    };

    grunt.initConfig({

        root: rootConfig,

        assemble: {
            options: {
                expand: true,
                helpers: ['handlebars-helper-partial'],
                layout: ['<%= root.templates %>/page-layout.hbs'],
                partials: [
                    '<%= root.templates %>/components/*.hbs',
                    '<%= root.templates %>/partials/*.hbs'
                ],
                data: ['<%= root.src %>/data/*.yaml', '<%= root.src %>/data/*.json']
            },
            pages: {
                options: {
                    flatten: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= root.src %>/templates/pages',
                    src: ['**/*.hbs'],
                    dest: '<%= root.src %>'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 10']
            },
            main: {
                src: '<%= root.src %>assets/css/app.css',
                dest: '<%= root.src %>assets/css/app.css'
            }
        },

        clean: {
            dist: {
                src: [
                    '<%= root.dist %>'
                ]
            },
            src: {
                src: [
                    '<%= root.src %>/assets/css',
                    '<%= root.src %>/assets/js'
                ]
            }
        },

        compass: {
            src: {
                options: {
                    outputStyle: 'expanded',
                    sassDir: '<%= root.src %>/scss',
                    cssDir: '<%= root.src %>/assets/css'
                }
            }
        },

        concat: {
            src: {
                src: [
                    '<%= root.src %>/js/utils.js', // needs to be first
                    '<%= root.src %>/js/app.js',
                    '<%= root.src %>/js/**/*.js',
                ],
                dest: '<%= root.src %>/assets/js/app.js'
            }
        },

        copy: {
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= root.src %>/assets/css',
                    src: [
                        '*.css',
                        '**/*.css'
                    ],
                    dest: '<%= root.dist %>/assets/css'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= root.src %>',
                    src: [
                        '*.html',
                        '**/*.html'
                    ],
                    dest: '<%= root.dist %>'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= root.src %>/assets/images',
                    src: [
                        '*',
                        '**/*'
                    ],
                    dest: '<%= root.dist %>/assets/images'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= root.src %>/assets/js',
                    src: [
                        '*.js',
                        '**/*.js'
                    ],
                    dest: '<%= root.dist %>/assets/js'
                }]
            },
            vendor: {
                files: [{
                    expand: true,
                    cwd: '<%= root.src %>/vendor',
                    src: [
                        '*.js',
                        '**/*.js'
                    ],
                    dest: '<%= root.dist %>/vendor'
                }]
            }
        },

        watch: {
            js: {
                files: [
                    '<%= root.src %>/js/*.js',
                    '<%= root.src %>/js/**/*.js'
                ],
                tasks: ['concat:src']
            },
            scss: {
                files: [
                    '<%= root.src %>/scss/*.scss',
                    '<%= root.src %>/scss/**/*.scss'
                ],
                tasks: ['compass:src']
            }
        },

        wiredep: {
            target: {
                src: [
                    'src/index.html'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'clean:src',
        'wiredep',
        'compass:src',
        'autoprefixer',
        'concat:src',
        'watch'
    ]);

    grunt.registerTask('dist', [
        'clean:src',
        'clean:dist',
        'wiredep',
        'compass:src',
        'autoprefixer',
        'concat:src',
        'copy'
    ]);

};