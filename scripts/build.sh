#!/bin/bash

# build scss components
grunt --gruntfile ./config/scss/alert.grunt.js build
grunt --gruntfile ./config/scss/loading-spinner.grunt.js build

# build vue directives
rollup -c ./config/vue-directives/tap.rollup.js