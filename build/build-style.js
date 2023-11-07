const { series, src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');

function compile() {
  return src(['../src/assets/index.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('../lib'));
}

function copyfont() {
  return src('../src/assets/fonts/**')
    .pipe(cssmin())
    .pipe(dest('../lib/fonts'));
}

exports.build = series(compile, copyfont);
