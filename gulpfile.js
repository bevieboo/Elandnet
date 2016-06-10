var gulp = require('gulp');
var runSync = require('run-sequence');
var plugin = {};

plugin.server = require('browser-sync').create();
plugin.sass = require('gulp-sass');
plugin.autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', sass);
gulp.task('serve', serve);
gulp.task('refresh', refresh);
gulp.task('watch', watch);
gulp.task('default', ['serve', 'watch']);

function refresh() {
  plugin.server.stream();
}

function watch() {
  gulp.watch('./sass/**/*.scss', function() {
    runSync('sass', 'refresh');
  });
  gulp.watch('./views/**/*.ejs').on('change', plugin.server.reload);
}

function serve() {
  plugin.server.init({
    server: './'
  });
}

function sass() {
  gulp.src('sass/**/*.scss')
  .pipe( plugin.sass() )
  .pipe( plugin.autoprefixer() )
  .pipe( gulp.dest('./public/stylesheets') )
  .pipe( plugin.server.stream() );
}
