const CACHE_NAME = 'formommy-v16';
const CORE = [
  './', './index.html', './styles.css?v=16', './module-ui.css?v=16', './advanced-ui.css?v=16', './ai-help.css?v=16', './home-family.css?v=16', './navigation-ui.css?v=16',
  './course-data.js?v=16', './course-pack-2.js?v=16', './preflight-migration.js?v=16', './app.js?v=16',
  './module-ui.js?v=16', './module-pack-2.js?v=16', './learning-intelligence.js?v=16', './quick-practice.js?v=16',
  './practice-lab.js?v=16', './milestones.js?v=16', './ai-help.js?v=16', './home-family.js?v=16', './navigation-ui.js?v=16', './manifest.webmanifest?v=16', './favicon.svg'
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