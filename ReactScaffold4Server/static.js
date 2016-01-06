const dev = process.env.NODE_ENV || 'development';
console.log(dev);
var scripts = [];
var stylesheets = [];

if (dev === 'development') {
  scripts.push('http://127.0.0.1:8888/public/bundle.js');
} else {

}

module.exports = function content(html) {
  html = html || {};
  return Object.assign({}, {
    scripts: scripts,
    stylesheets: stylesheets
  }, html);
};