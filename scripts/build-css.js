const fs = require('fs');
const path = require('path');

const landing = fs.readFileSync(path.join(__dirname, '..', 'public', 'landing.html'), 'utf8');

// Extract the @font-face blocks from landing.html
const startFont = landing.indexOf('@font-face');
const endFont = landing.indexOf(':root {', startFont);
const fontCss = (startFont >= 0 && endFont > startFont) ? landing.slice(startFont, endFont).trim() : '';

const appCss = `/**
 * Vexora · Core Application Stylesheet
 */
${fontCss}

:root {
  color-scheme: dark;
  --bg: #0e0e10;
  --panel: #151518;
  --panel-2: #1b1b1f;
  --sunken: #121215;
  --line: #26262b;
  --line-2: #34343b;
  --text: #f2f2f4;
  --muted: #9d9da7;
  --muted-2: #73737d;
  --fg: #0e0e10;
  --accent: #2f6bff;
  --accent-hover: #457eff;
  --danger: #ef4444;
  --danger-hover: #dc2626;
  --success: #10b981;
  --wait: #d9a50f;
  --sans: Montserrat, system-ui, -apple-system, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  width: 100%;
  height: 100%;
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

[hidden] {
  display: none !important;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Disabled feedback / rating elements */
#fbWrap, #fbCard, .fb-faces, #accessOverlay, #unlockOverlay {
  display: none !important;
}

/* Base Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 13.5px;
  line-height: 1.3;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  background: var(--text);
  color: var(--fg);
  transition: all .15s ease;
  user-select: none;
}

.btn:active {
  transform: scale(.97);
}

.btn.primary {
  background: var(--accent);
  color: #fff;
}

.btn.primary:hover {
  background: var(--accent-hover);
}

.btn.danger {
  background: var(--danger);
  color: #fff;
}

.btn.danger:hover {
  background: var(--danger-hover);
}

.btn.ghost {
  background: transparent;
  color: var(--text);
  border-color: var(--line-2);
}

.btn.ghost:hover {
  background: var(--panel-2);
}

.btn.sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn.lg {
  padding: 13px 24px;
  font-size: 15px;
}

/* App Header */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  background: var(--bg);
}

header.top {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(14, 14, 16, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  height: 54px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: .05em;
}

.brand .logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.brand .ver {
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;
  background: var(--panel-2);
  color: var(--muted);
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
  background: var(--panel);
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
}

.status-chip .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #64748b;
}

.status-chip .dot.online {
  background: var(--success);
  box-shadow: 0 0 8px var(--success);
}

/* Navigation Tabs */
nav.tabs {
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid var(--line);
  background: var(--panel);
  scrollbar-width: none;
}

nav.tabs::-webkit-scrollbar {
  display: none;
}

nav.tabs button {
  flex: 1;
  min-width: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 6px;
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 600;
  transition: all .15s ease;
  border-bottom: 2px solid transparent;
}

nav.tabs button svg.tab-ic {
  width: 18px;
  height: 18px;
}

nav.tabs button:hover {
  color: var(--text);
}

nav.tabs button.active {
  color: var(--text);
  border-bottom-color: var(--accent);
}

/* Views Container */
main.main {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.view {
  display: none;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.view.active {
  display: flex;
}

/* Gate & Model Selector */
.center#gate {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 20px 0;
}

.gate-shot {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.ring#modelRing {
  width: 100%;
  max-width: 320px;
  height: 180px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring-stage {
  width: 100%;
  height: 100%;
  position: relative;
}

.ring-tile {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity .3s ease, transform .3s ease;
}

.ring-tile img {
  max-width: 160px;
  max-height: 130px;
  object-fit: contain;
}

.ring-tile figcaption {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--muted);
}

/* Pick Strip (Vertical / SHU Style) */
.pick-strip {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  padding: 4px 0;
}

.pick-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  cursor: pointer;
  scroll-snap-align: start;
  transition: all .15s ease;
}

.pick-card:hover {
  background: var(--panel-2);
  border-color: var(--line-2);
}

.pick-card.is-on {
  border-color: var(--accent);
  background: rgba(47, 107, 255, 0.08);
}

.pick-which {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.pick-which .btn.pick-on {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

/* Stats Cards (SHU style: stat with column-reverse) */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
  width: 100%;
}

.stats .stat {
  display: flex;
  flex-direction: column-reverse;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  gap: 4px;
}

.stats .stat b,
.stats .stat .val {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
}

.stats .stat small,
.stats .stat .lbl {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .05em;
}

/* Cards & Panels */
.card, .panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Form inputs & controls */
input[type="text"],
input[type="password"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--sunken);
  border: 1px solid var(--line-2);
  color: var(--text);
  font-family: var(--sans);
  font-size: 13.5px;
  outline: none;
  transition: border-color .15s ease;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--accent);
}

/* Community CTA buttons */
.rid-feed-cta {
  background: #fff;
  color: #111;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
}

.rid-auth-cta {
  background: #2f6bff;
  color: #fff;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
}

/* Rider Modal */
.rid-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.rid-modal[hidden] {
  display: none !important;
}

/* Log output */
pre.log, .log-box {
  background: var(--sunken);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px;
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.4;
  color: #a5b4fc;
  max-height: 250px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

/* Modals & Overlays */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(5, 5, 7, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.overlay[hidden] {
  display: none !important;
}

.dialog {
  background: var(--panel);
  border: 1px solid var(--line-2);
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'app.css'), appCss);
console.log('Successfully written public/assets/app.css, size:', appCss.length, 'bytes');
