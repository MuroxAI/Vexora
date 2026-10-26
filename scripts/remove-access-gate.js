const fs = require('fs');
const path = require('path');

// 1. Update public/assets/app.js
let appJs = fs.readFileSync('public/assets/app.js', 'utf8');

// Bypass accessGate
appJs = appJs.replace(
  /\(function accessGate\(\)\s*\{/,
  '(function accessGate() { return; '
);

// Bypass VexoraUnlock ensure and ok
appJs = appJs.replace(
  /function ok\(\)\s*\{[\s\S]*?return !!\(t && t\.exp && t\.exp > Date\.now\(\)\);\s*\}/,
  'function ok() { return true; }'
);

appJs = appJs.replace(
  /async function ensure\(\)\s*\{[\s\S]*?return pend;\s*\}/,
  'async function ensure() { return true; }'
);

fs.writeFileSync('public/assets/app.js', appJs);
console.log('Bypassed accessGate and VexoraUnlock in app.js');

// 2. Update public/index.html
let indexHtml = fs.readFileSync('public/index.html', 'utf8');

indexHtml = indexHtml.replace('id="accessOverlay"', 'id="accessOverlay" style="display:none!important;" hidden');
indexHtml = indexHtml.replace('id="unlockOverlay"', 'id="unlockOverlay" style="display:none!important;" hidden');

fs.writeFileSync('public/index.html', indexHtml);
console.log('Hidden accessOverlay and unlockOverlay in index.html');

// 3. Update scripts/build-css.js to include #accessOverlay and #unlockOverlay in hidden elements
let buildCss = fs.readFileSync('scripts/build-css.js', 'utf8');
buildCss = buildCss.replace(
  '#fbWrap, #fbCard, .fb-faces {',
  '#fbWrap, #fbCard, .fb-faces, #accessOverlay, #unlockOverlay {'
);
fs.writeFileSync('scripts/build-css.js', buildCss);
console.log('Updated scripts/build-css.js');

// 4. Update public/sw.js cache version
let sw = fs.readFileSync('public/sw.js', 'utf8');
sw = sw.replace(/const CACHE = "vexora-\d+";/, 'const CACHE = "vexora-1710";');
fs.writeFileSync('public/sw.js', sw);
console.log('Bumped SW cache to vexora-1710');
