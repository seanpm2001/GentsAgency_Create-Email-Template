const gulp = require('gulp');
const Registry = require('@gentsagency/gulp-registry-emails');
const config = require('./gulp/config');

const tasks = new Registry(config);

gulp.registry(tasks);
