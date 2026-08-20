const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

const localRefs = [...index.matchAll(/(?:src|href)="([^"#]+)"/g)]
  .map(match => match[1])
  .filter(ref => !/^(https?:|data:|#)/.test(ref));

for (const ref of localRefs) {
  const clean = ref.split('?')[0].replace(/^\.\//, '');
  assert(fs.existsSync(path.join(root, clean)), `index.html references missing asset: ${ref}`);
}

const coursePos = index.indexOf('course-data.js');
const appPos = index.indexOf('app.js');
assert(coursePos !== -1 && appPos !== -1 && coursePos < appPos, 'course-data.js must load before app.js');
assert(!/stage2|stage3|trial\.css/.test(index), 'index.html still references obsolete staged assets');
assert(index.includes("navigator.serviceWorker.register('./sw.js')"), 'service worker is not registered');

const versions = [...index.matchAll(/[?&]v=(\d+)/g)].map(match => match[1]);
assert(versions.length >= 4, 'Expected versioned core assets in index.html');
assert(new Set(versions).size === 1, `Core asset versions disagree: ${versions.join(', ')}`);
const version = versions[0];
assert(sw.includes(`const CACHE_NAME = 'formommy-v${version}'`), `Service-worker cache version must match index v${version}`);

const coreBlock = sw.match(/const CORE = \[([\s\S]*?)\];/);
assert(coreBlock, 'Could not find service-worker CORE list');
if (coreBlock) {
  const cachedRefs = [...coreBlock[1].matchAll(/'([^']+)'/g)].map(match => match[1]);
  for (const ref of cachedRefs) {
    if (ref === './') continue;
    const clean = ref.split('?')[0].replace(/^\.\//, '');
    assert(fs.existsSync(path.join(root, clean)), `sw.js caches missing asset: ${ref}`);
    if (/\.(?:css|js|webmanifest)\?v=/.test(ref)) {
      assert(ref.includes(`?v=${version}`), `sw.js cache version mismatch: ${ref}`);
    }
  }
}

if (failures.length) {
  console.error(`Shell validation failed (${failures.length}):`);
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
console.log(`OK: shell assets exist, load order is correct, and PWA cache is aligned at v${version}.`);
