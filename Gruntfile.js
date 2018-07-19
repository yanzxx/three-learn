// Generated on 2016-10-17 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    cdnify: 'grunt-google-cdn'
  });
  
  var serveStatic = require('serve-static');

    var inquirer = require('inquirer');

    var sftpClient = require('ssh2-sftp-client');

    var fs = require('fs');

  var dateFormat = require('dateformat');

  grunt.loadNpmTasks('grunt-text-replace');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    bower: grunt.file.readJSON('bower.json'),

    replace: {
      replace_project_version: {
        src: ['<%= yeoman.dist %>/menu/aboutMenu.html'],
          overwrite: true,                 // overwrite matched source files
          replacements: [{
              from: /<i id="project-version">(.*)<\/i>/g,
              to: '<i id="project-version"><%= bower.version %>.' + dateFormat(new Date(), 'yyyymmddHH')+ '</i>'
          }]
      }, replace_project_version2: {
            src: ['<%= yeoman.dist %>/menu/aboutMenuForMobile.html'],
            overwrite: true,                 // overwrite matched source files
            replacements: [{
                from: /<i id="versionMobile">(.*)<\/i>/g,
                to: '<i id="versionMobile"><%= bower.version %>.' + dateFormat(new Date(), 'yyyymmddHH')+ '</i>'
            }]
        },
      replace_config: {
        src: ['<%= yeoman.dist %>/scripts/Config.js'],
        overwrite: true,
        replacements: [{
          from: /const USE_MOCK_MODE = true;/g,
          to: 'const USE_MOCK_MODE = false;'
        }]
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep:dev', 'wiredep:test']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              serveStatic ('.tmp'),
              connect().use(
                '/bower_components',
                serveStatic ('./bower_components')
              ),
              connect().use(
                '/app/styles',
                serveStatic ('./app/styles')
              ),
              serveStatic (appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              serveStatic ('.tmp'),
              serveStatic ('test'),
              connect().use(
                '/bower_components',
                serveStatic ('./bower_components')
              ),
              serveStatic (appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*',
            'holoviewer-*.zip'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      dev: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//,
        fileTypes: {
          html: {
            replace: {
              js: function(filePath) {
                filePath = filePath.replace('ol.js', 'ol-debug.js');
                var filePathStrArr = filePath.split('.');
                var filePathStr = '';
                if (filePathStrArr[filePathStrArr.length - 2] == 'min') {
                  filePathStrArr.pop();
                  filePathStrArr.pop();
                  filePathStr = filePathStrArr.join('.') + '.js';
                  if(!grunt.file.exists(filePathStr)){
                    filePathStr = filePath;
                  }
                } else {
                  filePathStr = filePath;
                }
                return '<script scripts="' + filePathStr + '"></script>';
              }
            }
          }
        }
      },
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//,
        fileTypes: {
          html: {
            replace: {
              js: function(filePath) {
                filePath = filePath.replace('ol-debug', 'ol');
                var filePathStrArr = filePath.split('.');
                var filePathStr = '';
                if (filePathStrArr[filePathStrArr.length - 2] != 'min') {
                  filePathStrArr.pop();
                  filePathStr = filePathStrArr.join('.') + '.min.js';
                  if(!grunt.file.exists(filePathStr)){
                    filePathStr = filePath;
                  }
                } else {
                  filePathStr = filePath;
                }
                return '<script scripts="' + filePathStr + '"></script>';
              }
            }
          }
        }
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    }, 

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*',
          '!<%= yeoman.dist %>/images/poiicon{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '!<%= yeoman.dist %>/scripts/Octree.js',
          '!<%= yeoman.dist %>/scripts/datasetalignmenttool/PointCloudWorker.js',
          '!<%= yeoman.dist %>/scripts/Config.js'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,jpg,txt}',
            '*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*',
            'fonts/{,*/}*.*',
			'views/**',
			'data/**',
            'menu/**',
            'locales/**',
            'model/**',
            'fragments/**'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: 'bower_components/trumbowyg/dist',
          src: 'ui/icons.svg',
          dest: '<%= yeoman.dist %>/scripts'
        }, {
          expand: true,
          flatten: true,
          src: 'bower_components/font-awesome/fonts/*',
          dest: '<%= yeoman.dist %>/fonts'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: 'Config.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

      uglify: {
          options: {
              compress: {dead_code: true, drop_console: true}
          },
          propretySource: {
              options: {
                  wrap: true,
                  compress: {booleans: true, loops: true, conditionals: true}
              },
              files: [{
                  expand: true,
                  src: ['scripts.*.js'],
                  dest: 'dist/scripts',
                  cwd: 'dist/scripts'
              }]
          },
          webWorker: {
              files: {
                  '<%= yeoman.dist %>/scripts/Octree.js': ['<%= yeoman.app %>/scripts/Octree.js'],
                  '<%= yeoman.dist %>/scripts/datasetalignmenttool/PointCloudWorker.js': ['<%= yeoman.app %>/scripts/datasetalignmenttool/PointCloudWorker.js']
              }
          }
      },

      compress: {
          options: {
              archive: 'holoviewer-<%= bower.version %>.zip',
              mode: 'zip'
          },
          withData: {
              files: [
                  { expand: true, cwd: './dist/', src: '**', dest: '/'}
              ]
          },
          withoutData: {
              files: [
                  { expand: true, cwd: './dist/', src: ['**', '!data/**'], dest: '/' }
              ]
          }
      },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep:dev',
      'wiredep:test',
      'concurrent:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep:dev',
    'wiredep:test',
    'concurrent:test',
    'postcss',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep:app',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'concat',
    'copy:dist',
    'replace',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'uglify:webWorker',
    'usemin',
    'htmlmin',
    'uglify:propretySource',
    'wiredep:dev'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    'test',
    'build'
  ]);

    grunt.registerTask('deployQuestion', 'Compile then start a connect web server', function () {
        var serverConf = grunt.file.readJSON('env/server.json');
        var done = this.async();
        var questions = [
            {
                type: 'list',
                name: 'server',
                message: '请选择服务器',
                choices: serverConf.map(function (server) {
                    return server.name;
                })
            },
            {
                type: 'checkbox',
                name: 'instances',
                message: '请选择服务器实例',
                choices: function (answers) {
                    return serverConf.filter(function (server) {
                        return server.name == answers.server;
                    })[0].instances.map(function (instance) {
                        return instance.name;
                    });
                },
                validate: function (answer) {
                    if (answer.length < 1) {
                        return '至少选择一个服务器实例.';
                    }
                    return true;
                }
            },
            {
                type: 'confirm',
                name: 'shouldDeployData',
                message: '是否上传data文件夹?',
                default: false
            }
        ];

        inquirer.prompt(questions).then(function (answers) {
            console.log('\n发布选择信息 :');
            console.log(JSON.stringify(answers, null, '  '));
            grunt.config.set('deploy.answers', answers);
            done();
        });
    });

    grunt.registerTask('deploySsh', 'send files by ssh', function () {
        grunt.task.requires('deployQuestion');
        var answers = grunt.config.get('deploy.answers');
        var zipFile = 'holoviewer-' + grunt.config.get('bower.version') + '.zip';
        var paths = [];
        if (answers) {
            var serverConf = grunt.file.readJSON('env/server.json');
            var serverInfo = serverConf.filter(function (server) {
                return server.name == answers.server;
            })[0];
            var done = this.async();
            var sftp = new sftpClient();
            sftp.connect({
                host: serverInfo.host,
                port: serverInfo.port,
                username: serverInfo.username,
                password: serverInfo.password,
                readyTimeout: 30000
            }).then(function () {
                var promises = [];
                answers.instances.forEach(function (instance) {
                    var found = serverInfo.instances.filter(function(item) { return item.name === instance; });
                    if (found && found.length > 0) {
                        paths.push(found[0].path);
                        promises.push(sftp.put(zipFile, found[0].path + '/' + zipFile, true));
                    }
                });
                return Promise.all(promises);
            }).then(function () {
              var promises = [];
              paths.forEach(function (path) {
                promises.push(new Promise(function(resolve, reject){
                  var file = path + '/' + zipFile;
                  sftp.client.exec('unzip -o ' + file + ' -d ' + path, function(err, stream) {
                    if (err) throw err;
                    stream.on('close', function(code, signal) {
                      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                      resolve();
                    }).on('data', function(data) {
                      console.log('STDOUT: ' + data);
                    }).stderr.on('data', function(data) {
                      console.log('STDERR: ' + data);
                      reject(data);
                    });
                  });
                }));
              });
              return Promise.all(promises);
            }).then(function () {
              var promises = [];
              paths.forEach(function (path) {
                promises.push(sftp.delete(path + '/' + zipFile));
              });
              return Promise.all(promises);
            }).then(function () {
              console.log('deploy successful');
              sftp.end();
              done();
            }).catch(function (err) {
                console.log(err, 'catch error');
                sftp.end();
                done();
            });
        }
    });

    grunt.registerTask('archive', 'deploy build file to server', function () {
        grunt.task.requires('deployQuestion');
        grunt.task.requires('build');
        var answers = grunt.config.get('deploy.answers');
        console.log('answers.shouldDeployData : ' + answers.shouldDeployData);
        if (answers && answers.shouldDeployData) {
            grunt.task.run('compress:withData');
        } else {
            grunt.task.run('compress:withoutData');
        }
    });

    grunt.registerTask('deploy', 'deploy build file to server', function () {
        grunt.task.run('deployQuestion');
        grunt.task.run('build');
        grunt.task.run('archive');
        grunt.task.run('deploySsh');
    });
};
