const { series, src, dest } = require('gulp');
const path = require('path');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rootDir = path.resolve(__dirname, '..');

function compile() {
  return src(path.join(rootDir, 'src/assets/index.scss'))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(dest(path.join(rootDir, 'lib')));
}

function copyfont() {
  // 字体按二进制原样复制，避免 CSS 压缩器改写字体内容
  return src(path.join(rootDir, 'src/assets/fonts/**'))
    .pipe(dest(path.join(rootDir, 'lib/fonts')));
}

exports.build = series(compile, copyfont);
