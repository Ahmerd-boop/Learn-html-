const CACHE_NAME = 'site-cache-v1';

// List of files to cache
const CACHE_ASSETS = [
    '/', // Homepage
    '/index.html',   
    '/assests/css/style.css',
    '/script.js',
    '/assests/js/continue.js',
    '/assests/js/download.js',
    '/assests/js/editor.js',
    '/assests/js/example-editor.js',
    '/assests/js/server.js',
    '/assests/js/welcome.js',
    '/assests/js/script.js',
    '/assests/js/payment-method.js',
    '/assests/js/games.js',
    '/assests/icons/email.png',
    '/assests/icons/SeTTiNGSS_enhanced.png',
    '/assests/icons/share-1.png',
    '/editor.html',
    '/assests/games/game1.html',
    '/assests/games/game2.html',
    '/assests/games/game3.html',
    '/assests/games/game4.html',
    '/assests/games/game5.html',
    '/games.html',
    '/lessons.html',
    '/quiz-certificate.html',
    '/styled-html.html',
    '/kofar-guga-katsina.jpg',
    '/assests/images/community-enhanced.png',
    '/assests/images/continue-enhanced.png',
    '/assests/images/editor-enhanced.png',
    '/assests/images/games-enhanced.png',
    '/assests/images/gidan-sarki.jpg',
    '/assests/images/start-enhanced.png',
    '/assests/images/upgrade-enhanced.png',
    '/developer.jpeg',
    '/file-1.png',
    '/file-2.png',
    '/file-3.png',
    '/file-4.png',
    '/file-5.png',
    '/file-6.png',
    '/file-7.png',
    '/file-8.png',
    '/file-9.png',
    '/file-10.png',
    '/html-tag.png',
    '/girl-image.jpg',  
    '/video.mp4',
    '/video-2.mp4',
    '/audio.mp3',
    '/audio.m4a'
];

// Install event: Cache all files, then activate immediately
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[Service Worker] Caching all assets...');
            return cache.addAll(CACHE_ASSETS);
        })
    );
    self.skipWaiting(); // Activate new SW right away
});

// Fetch event: Serve cached files when offline, only if GET and in CACHE_ASSETS
self.addEventListener('fetch', event => {
    event.respondWith(
        (async () => {
            // Check if we have a match in cache
            const cachedResponse = await caches.match(event.request);
            if (cachedResponse) {
                return cachedResponse;
            }

            try {
                // If not in cache, fetch from network
                const fetchResponse = await fetch(event.request);

                // Only cache GET requests and only if they're in our list
                if (
                    event.request.method === 'GET' &&
                    CACHE_ASSETS.includes(new URL(event.request.url).pathname)
                ) {
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(event.request, fetchResponse.clone());
                }
                return fetchResponse;
            } catch (error) {
                // Fallback to /index.html if offline
                return caches.match('/index.html');
            }
        })()
    );
});

// Activate event: Delete old caches, claim clients
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cache => cache !== CACHE_NAME)
                    .map(cache => caches.delete(cache))
            );
        })
    );
    self.clients.claim(); // Take control of all open pages
});
