var isWindows = (process.platform === "win32");
const path = require('path');
const rootDir = path.join(__dirname, '..', '..', '..');


module.exports = function(grunt) {
  grunt.loadTasks(path.join(rootDir, 'node_modules', 'grunt-contrib-watch', 'tasks'));
  grunt.loadTasks(path.join(rootDir, 'node_modules', 'grunt-exec', 'tasks'));
  grunt.loadTasks(path.join(rootDir, 'node_modules', 'grunt-contrib-connect', 'tasks'));

  var init = {};

  init.exec = {
    build: {
      cmd: 'rollup -c ./config/vue-directives/tap/tap.rollup.js',
      cwd: rootDir
    }
  };

  init.connect = {
    server: {
      options: {
        base: [rootDir],
        port: 7100,
        hostname: '0.0.0.0',
        livereload: 35732,
        open: {
          target: 'http://localhost:7100/dev/vue/directives/tap.html'
        }
      }
    }
  };

  // watch tasks
  init.watch = {
    dev: {
      files : [
        path.join(rootDir, 'vue', 'directives', 'tap', '**', '*.ts')
      ],
      tasks : ["build"],
      options: {
        livereload: 35732,
        spawn: false
      }
    }
  };

  grunt.initConfig(init);

  grunt.registerTask("build", ['exec:build']);
  grunt.registerTask("dev", ["build", "connect:server", "watch:dev"]);
};