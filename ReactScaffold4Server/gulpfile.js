var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');

var streamify = require('gulp-streamify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-cssmin');
var less = require('gulp-less');

var source = require('vinyl-source-stream');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'lodash'
];

/**
 * [删除输出目录]
 */
gulp.task('clean', function () {
  return gulp.src('./public', {read: false})
    .pipe(clean());
});

/**
 * [编译第三方js库]
 */
gulp.task('vendor', function () {
  return gulp.src([
    'vendor/jquery/dist/jquery.js'
  ]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({
      mangle: false
    })))
    .pipe(gulp.dest('./public/js/'));
});

/**
 * [编译项目所需的第三方js依赖, 使得在浏览器环境中也存在对象]
 */
gulp.task('browserify-vendor', function () {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(production, streamify(uglify({
      mangle: false
    }))))
    .pipe(gulp.dest('./public/js/'));
});

/**
 * [使用webpack编译业务代码依赖]
 */
gulp.task('webpack', ['browserify-vendor'], function () {
  return gulp.src('./app/main.jsx')
    .pipe(gulpWebpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./public/js/'));
});

/**
 * [编译less]
 */
gulp.task('styles', function () {
  return gulp.src('./app/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename('bundle.css'))
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('./public/css/'));
});

/**
 * [检测文件变化]
 */
gulp.task('watch', function () {
  gulp.watch('./app/stylesheets/**/*.less', ['styles']);
  gulp.watch('./app/**/*.*', ['webpack']);
});

gulp.task('default', ['styles', 'vendor', 'browserify-vendor', 'webpack', 'watch']);
gulp.task('build', ['styles', 'vendor', 'browserify-vendor', 'webpack']);