const CACHE_NAME = 'formommy-v18';
const CORE = [
  './', './index.html', './styles.css?v=18', './module-ui.css?v=18', './advanced-ui.css?v=18', './ai-help.css?v=18', './navigation-ui.css?v=18',
  './course-data.js?v=18', './course-pack-2.js?v=18', './preflight-migration.js?v=18', './app.js?v=18',
  './module-ui.js?v=18', './module-pack-2.js?v=18', './learning-intelligence.js?v=18', './quick-practice.js?v=18',
  './practice-lab.js?v=18', './milestones.js?v=18', './ai-help.js?v=18', './navigation-ui.js?v=18', './manifest.webmanifest?v=18', './favicon.svg'
];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('formommy-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy)); return response; }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => {
    const network = fetch(event.request).then(response => { if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); } return response; }).catch(() => cached);
    return cached || network;
  }));
});