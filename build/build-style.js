const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

function compile() {
  return src(['../src/styles/index.scss'])
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('../lib/styles'));
}

function copyfont() {
  return src('../src/styles/fonts/**')
    .pipe(cssmin())
    .pipe(dest('../lib/styles/fonts'));
}

function copyImg() {
  return src('../src/styles/img/**')
    .pipe(dest('../lib/styles/img'));
}

exports.build = series(compile, copyfont, copyImg);
