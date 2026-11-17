// منصات الرياحين — يحفظ آخر نسخة من الصفحة لتُفتح بلا إنترنت. الشبكة أولًا.
const CACHE = 'rh-platforms-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put('./', c)); }
    return r;
  }).catch(() => caches.match('./')));
});
