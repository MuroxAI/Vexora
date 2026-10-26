const fs = require('fs');
const path = require('path');

// 1. In public/index.html
let indexHtml = fs.readFileSync('public/index.html', 'utf8');

// Hide or remove fbCard in about view
indexHtml = indexHtml.replace(
  /<div class="card fold is-open" id="fbCard">[\s\S]*?<\/div>\s*<\/div>/,
  '<!-- feedback card removed -->'
);
// In case the above regex structure differs, also ensure #fbCard has hidden attribute
indexHtml = indexHtml.replace('id="fbCard"', 'id="fbCard" hidden style="display:none!important;"');

// Remove or ensure #fbWrap is permanently hidden
indexHtml = indexHtml.replace('id="fbWrap"', 'id="fbWrap" style="display:none!important;" hidden');

fs.writeFileSync('public/index.html', indexHtml);
console.log('Updated public/index.html');

// 2. In public/assets/app.js
let appJs = fs.readFileSync('public/assets/app.js', 'utf8');

// Disable auto-opening fbWrap
appJs = appJs.replace(
  /if\s*\(\s*lsGet\("vexora\.fbdone"\)\s*!==\s*"1"\s*\)\s*setTimeout\(\(\)\s*=>\s*\{\s*openFb\(true\);\s*\}\s*,\s*600\);/g,
  '/* fb popup disabled */'
);

// Disable openFb function completely
appJs = appJs.replace(
  'function openFb(isForced) {',
  'function openFb(isForced) { return;'
);

fs.writeFileSync('public/assets/app.js', appJs);
console.log('Updated public/assets/app.js');

// 3. Update public/assets/app.css
let appCss = fs.readFileSync('public/assets/app.css', 'utf8');
if (!appCss.includes('#fbWrap')) {
  appCss += '\n\n/* Disabled feedback / rating elements */\n#fbWrap, #fbCard, .fb-faces { display: none !important; }\n';
  fs.writeFileSync('public/assets/app.css', appCss);
  console.log('Updated public/assets/app.css');
}
