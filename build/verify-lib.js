const assert = require('assert');
const fs = require('fs');
const path = require('path');
const packageInfo = require('../package.json');

const rootDir = path.resolve(__dirname, '..');
const fonts = ['element-icons.ttf', 'element-icons.woff'];
const requiredFiles = [packageInfo.main, 'lib/index.css', ...fonts.map(font => `lib/fonts/${font}`)];

requiredFiles.forEach(file => {
  const absolutePath = path.resolve(rootDir, file);
  const stat = fs.statSync(absolutePath);
  assert(stat.isFile() && stat.size > 0, `构建产物不存在或为空：${file}`);
});

const css = fs.readFileSync(path.join(rootDir, 'lib/index.css'), 'utf8');
fonts.forEach(font => {
  assert(css.includes(`fonts/${font}`), `样式缺少字体引用：${font}`);
  const original = fs.readFileSync(path.join(rootDir, 'src/assets/fonts', font));
  const copied = fs.readFileSync(path.join(rootDir, 'lib/fonts', font));
  assert(original.equals(copied), `字体复制后内容发生变化：${font}`);
});

console.log('构建产物检查通过，入口、样式及字体均已生成。');
