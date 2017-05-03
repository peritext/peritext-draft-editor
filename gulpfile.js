var gulp = require('gulp');
var strip = require('gulp-strip-comments');
var babel = require('gulp-babel');

gulp.task('build', function(){
  gulp.src([
      'src/*.js',
      'src/**/*.js'
    ])
    .pipe(babel({
    "plugins": [
      "add-module-exports",
      "transform-class-properties",
      "transform-decorators-legacy",
      "transform-object-rest-spread"
    ],
    "presets": [
      "es2015",
      "react"
    ]
  }))
    .pipe(gulp.dest('build'));

  gulp.src([
      'src/**/*.json'
    ])
    .pipe(strip())
    .pipe(gulp.dest('build'));

  gulp.src([
      'src/**/*.scss'
    ])
    .pipe(gulp.dest('build'));
});