const CACHE_NAME = 'offline-site-v1';

// ✅ List of all pages & assets to save for offline use
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/editor.html',
    '/games.html',
    '/lessons.html',
    '/assests/css/style.css'
];

// ✅ Install Service Worker & Cache All Files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('✅ Caching all files for offline use');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting(); // Activate immediately
});

// ✅ Fetch Files from Cache (Offline Mode)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// ✅ Activate New Service Worker & Delete Old Cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
