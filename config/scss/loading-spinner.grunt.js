var isWindows = (process.platform === "win32");
var bashCmd = (isWindows) ? 'bash ' : '';
const path = require('path');
const sass = require('node-sass');
const postcssUrl = require('postcss-url');
const rootDir = path.join(__dirname, '..', '..');
const scssComponentName = 'loading-spinner';
const sassFile = path.join(rootDir, 'scss', scssComponentName, 'index.scss');
const cssFile = path.join(rootDir, 'css', scssComponentName, 'index.css');


module.exports = function(grunt) {
  grunt.loadTasks(path.join(rootDir, 'node_modules', 'grunt-sass', 'tasks'));
  grunt.loadTasks(path.join(rootDir, 'node_modules', 'grunt-postcss', 'tasks'));
  grunt.loadTasks(path.join(rootDir, 'node_modules', 'grunt-contrib-watch', 'tasks'));
  grunt.loadTasks(path.join(rootDir, 'node_modules', 'grunt-exec', 'tasks'));
  grunt.loadTasks(path.join(rootDir, 'node_modules', 'grunt-contrib-connect', 'tasks'));

  var init = {};

  init.sass = {
    options: {
      implementation: sass,
      sourceMap: false
    },
    dist: {
      files: {}
    }
  };
  init.sass.dist.files[cssFile] = sassFile;

  init.postcss = {
    options: {
      processors: [
        postcssUrl({
          basePath: [
            path.join(rootDir, 'scss', scssComponentName, 'icomoon')
          ],
          url: 'inline'
        })
      ]
    },
    dist: {
      src: path.join(rootDir, 'css', scssComponentName, 'index.css'),
      dest: path.join(rootDir, 'css', scssComponentName, 'index.css')
    }
  };

  init.connect = {
    server: {
      options: {
        base: [rootDir],
        port: 7002,
        hostname: '0.0.0.0',
        livereload: 35731,
        open: {
          target: 'http://localhost:7002/dev/css/loading-spinner.html'
        }
      }
    }
  };

  // watch tasks
  init.watch = {
    dev: {
      files : [
        path.join(rootDir, 'scss', '**', '*.scss'),
        path.join(rootDir, 'dev', '**', '*.html')
      ],
      tasks : ["build"],
      options: {
        livereload: 35731,
        spawn: false
      }
    }
  };

  grunt.initConfig(init);

  grunt.registerTask("build", ['sass', 'postcss']);
  grunt.registerTask("dev", ["build", "connect:server", "watch:dev"]);
};