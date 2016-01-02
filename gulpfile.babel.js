'use strict';
const gulp = require('gulp');
const electron = require('electron-connect').server.create({path:'src/browser/src/main.js'});

gulp.task('serve', () => {
  electron.start();
  gulp.watch(['src/browser/src/*.js'], electron.restart);
  gulp.watch([
  'src/renderer/stylesheets/main.css',
  'src/renderer/index.html',
  'src/renderer/dist/*.js'], electron.reload);
});

gulp.task('stop', () => electron.stop());
