#!/bin/bash

# build scss components
grunt --gruntfile ./config/scss/alert.grunt.js build
grunt --gruntfile ./config/scss/loading-spinner.grunt.js build

# build vue directives
grunt --gruntfile ./config/vue-directives/tap/tap.grunt.js build