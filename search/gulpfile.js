
var gulp = require('gulp'),
    yarn = require('gulp-yarn'),
    rimraf = require('rimraf'),
    serve = require('gulp-serve'),

    
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    uuidv4 = require('uuid/v4'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create();
var uuid = uuidv4().replace(/-/g, '');
gulp.task('install', ['clean'], function() {
  gulp.run(['app_js','app_less','app_page','replace_uuid']);
  return gulp.src(['./package.json'])
  .pipe(yarn());
});

gulp.task('cplib', ['install'], function() {
  return gulp.src(['bower_components/**/*'])
  .pipe(gulp.dest('www/lib/'));
});

gulp.task('clean', function(cb) {
  return rimraf('./bower_components', function() {
    rimraf('./www/lib', function() {
      rimraf('./www/js', function() {
        rimraf('./www/css', function() {
          rimraf('./www/pages', cb);
        });
      });
    });
  });
});

gulp.task('app_js', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(concat(uuid+'.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./www/js/'))
    // .pipe(browserSync.stream())
    ;
});
gulp.task('app_less', function() {
  return gulp.src('./app/less/main.less')
  .pipe(less())
  .pipe(concat(uuid+'.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('./www/css/'))
  // .pipe(browserSync.stream())
  ;
});
gulp.task('app_page', function() {
  return gulp.src('./app/html/pages/**/*.html')
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
      }))
      .pipe(gulp.dest('./www/pages'))
  // .pipe(browserSync.stream())
  ;
});
gulp.task('replace_uuid', function() {
  return gulp.src('./app/html/index.html')
      .pipe(replace('style.css', uuid+'.css'))
      .pipe(replace('script.js', uuid+'.js'))
      .pipe(gulp.dest('./www/'));
  });


gulp.task('watch', ['cplib'], function() {
  gulp.watch('www/**', function() {
    browserSync.reload();
  });
  gulp.watch('app/js/**', ['app_js']);
  gulp.watch('app/html/index.html', ['replace_uuid']);
  gulp.watch('app/html/pages/**', ['app_page']);
  gulp.watch('app/less/**', ['app_less']);
  
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: __dirname + '/www/',
      directory: false
    },
    ghostMode: false,
    notify: false,
    debounce: 200,
    index: 'index.html'
  });
});
