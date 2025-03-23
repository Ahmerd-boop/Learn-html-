const CACHE_NAME = 'my-site-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/assests/css/style.css',
    '/script.js',
    '/editor.html',
    '/assests/games/game1.html',
    '/assests/games/game2.html',
    '/assests/games/game3.html',
    '/assests/games/game4.html',
    '/assests/games/game5.html',
    '/games.html',
    '/lessons.html',
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch cached assets when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});