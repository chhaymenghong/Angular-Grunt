// 'use strict';
// module.exports = function(grunt) {
//     grunt.initConfig({
//         pkg: grunt.file.readJSON('package.json'),
//
//         // Validating Javascript with JSHint
//
//         // Compressing Javascript with Uglify
//
//
//         // Transpiling TypeScript
//         typescript: {
//             options: {
//                 modules: 'commonjs'
//             },
//             all: {
//                 src: ['./src/js/*/*.ts'], // transpile ts files from this src to dest individually
//                 dest: ['./dest/js/_output']
//             }
//             // TODO: we can also bundle files from a directory together by doing:
//             // common: {src:[], dest: 'use string name here instead of array'}
//         },
//
//         // Run Javascript validation
//         jshint: {
//             // put any additional options here such as what rules to ignore ....
//             options: {
//                 // force: true // use this to pass the task even though there are errors (not recommended)
//                 // '-W069' : false // this are particular error code that JSHint provide. Use this to ignore a specific error
//                 // ignores: [fileName] // we can also ignore certain files
//                 // reporterOutput: 'file name to save this content' // log output to a file
//             },
//             files: ['./dest/js/_output/*.js'] // use jshint on here
//         },
//
//         uglify: {
//             options: {
//                 // Use this for dev for readability
//                 // mangle: false // True by default ( if true, replace variable and method name to sth not readable
//
//                 // Specify additional options for compression here
//                 // compress: {
//                 //     drop_console: true // will drop all console state
//                 //     drop_sthElse: true // will drop "sthElse"
//                 // }
//
//                 // Use to beautiful compression ( maintain code format )
//                 // Don't forget to set mangle to false and turn off compression when doing this
//                 // beautify: true
//             },
//             // For development
//             development: {
//                 files: [{
//                     expand: true, // TODO:HONG what is this for?
//                     cwd: './dest/js/_output/', // is use by src as base path
//                     src: '**/*.js',
//                     dest: './dest/js/_output/'
//
//                 }]
//             }
//
//         },
//
//         // configure a task built inside grunt-contrib-clean
//         // we need to configure it so that it knows what to do
//         // this is also known as the entry point for this task
//         clean: {
//             options: {
//
//             },
//             files: ['./dest/_output/*'], // delete everything from here
//             folders: ['path/foo'] // delete this folder ( don't add / at the end of it so that "clean" knows it is a folder
//             // To only run a subtask, do grunt clean:files or grunt clean:folders
//
//         }
//
//         // we can also do this
//         // clean: {
//         //     output: ['ToBeCleaned/*']
//         // }
//     });
//
//
//
//     // load this plugin so that we can run a task that it defines
//     grunt.loadNpmTasks('grunt-contrib-clean');
//
//     // load this plugin to transpile typescript to javascript
//     grunt.loadNpmTasks('grunt-typescript');
//
//     // load this plugin to validate javascript codes
//     grunt.loadNpmTasks('grunt-contrib-jshint');
//
//     // load this plugin to uglify files
//     grunt.loadNpmTasks('grunt-contrib-uglify');
//
//     // create a task with 'default' as name and an array of deps tasks
//     // this is also our entry point for GruntFile.js
//     grunt.registerTask('default', ['clean', 'typescript', 'jshint', 'uglify']);
// };

'use strict';

//1. add usemin (js/css) for vendor
//2. add concat and uglify for both internal vendor and custom codes
module.exports = function(grunt) {
    // TODO:HONG add a file structure here for (externalVendor, internalVendor, customCodes, html, and other ressources)
    // TODO:HONG so that the next time we want to add anything it will be there.



    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['.tmp', 'dist'],
        wiredep: {
            target: {
                src: ["app/index.html"],
                options: {
                    cwd: 'app'
                }
            }
        },
        "bower-install-simple": {
            options: {
                color: true,
                cwd: 'app',
                directory: 'bower_components'
            },
            prod: {
                options: {
                    production: true
                }
            }
        },
        // useminPrepare look at .html for special comment block, and prepare configuration to optimize them
        useminPrepare: {
            html: 'app/index.html' // read from this file
            // options: {
            //     dest: 'js' // specify subdirectory
            // }
        },
        // usemin: replace the block with the new version
        usemin: {
            html: ['app/index.html']
        },

        concat: {
            custom: {
                src: ['app/customFiles/*'],
                dest: 'dist/custom.js'
            },
            vendorInternal: {
                src: ['app/libs/*'],
                dest: 'dist/vendorInternal.js'
            }

        },
        uglify: {
            custom: {
                files: {
                    'dist/custom.min.js': ['dist/custom.js']
                }
            },
            vendorInternal: {
                files: {
                    'dist/vendorInternal.min.js': ['dist/vendorInternal.js']
                }
            }
        },
        copy: {
            main: {
                src: 'app/index.html',
                dest: 'dist/index.html'
            }
        },
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'path/to/dev/server.js'
                }
            }
        }



        // server: {
        //     web: {
        //         port: 8001
        //     },
        //     base: 'dist'
        // },
        // watch: {
        //     dev: {
        //         files: ['app/**/*.js', "!app/bower_components"],
        //         tasks: ['default']
        //     }
        // }

    });


    grunt.registerTask('external', [
       "useminPrepare",
       "concat:generated",
       "cssmin:generated",
       "uglify:generated",
       "usemin"
    ]);


    // TODO:HONG use a plugin to include these
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    // load custom tasks
    // grunt.loadTasks('tasks');



    // create a task with 'default' as name and an array of deps tasks
    // this is also our entry point for GruntFile.js
    grunt.registerTask('internal', ['concat', 'uglify']);
    grunt.registerTask('default', ["clean", "bower-install-simple", "internal", "wiredep", "external", "copy" ]);
};