const fs = require('fs');

// 1. Update public/index.html manifest link
let indexHtml = fs.readFileSync('public/index.html', 'utf8');
indexHtml = indexHtml.replace('href="/manifest.webmanifest"', 'href="manifest.webmanifest"');
fs.writeFileSync('public/index.html', indexHtml);
console.log('Updated public/index.html');

// 2. Update public/assets/app.js
let appJs = fs.readFileSync('public/assets/app.js', 'utf8');
appJs = appJs.replace('navigator.serviceWorker.register("/sw.js")', 'navigator.serviceWorker.register("./sw.js")');
fs.writeFileSync('public/assets/app.js', appJs);
console.log('Updated public/assets/app.js');

// 3. Update public/assets/chat.js
let chatJs = fs.readFileSync('public/assets/chat.js', 'utf8');
chatJs = chatJs.replace('navigator.serviceWorker.register("/sw.js")', 'navigator.serviceWorker.register("./sw.js")');
fs.writeFileSync('public/assets/chat.js', chatJs);
console.log('Updated public/assets/chat.js');

// 4. Update public/support.html
let supHtml = fs.readFileSync('public/support.html', 'utf8');
supHtml = supHtml.replace('navigator.serviceWorker.register("/sw.js")', 'navigator.serviceWorker.register("./sw.js")');
fs.writeFileSync('public/support.html', supHtml);
console.log('Updated public/support.html');

// 5. Update public/sw.js
let swJs = fs.readFileSync('public/sw.js', 'utf8');
swJs = swJs.replace('/assets/icon-192.png', 'assets/icon-192.png')
           .replace('/assets/icon-192.png', 'assets/icon-192.png');
// Make sure routing in sw.js correctly caches root or subpath index navigation
swJs = swJs.replace(
  'if (url.pathname === "/" || url.pathname === "/landing.html" || url.pathname.indexOf("/api/") === 0 || url.pathname.indexOf("/admin") === 0) return;',
  'if (url.pathname.endsWith("/landing.html") || url.pathname.indexOf("/api/") !== -1 || url.pathname.indexOf("/admin") !== -1) return;'
);
fs.writeFileSync('public/sw.js', swJs);
console.log('Updated public/sw.js');
