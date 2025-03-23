const CACHE_NAME = 'site-cache-v1';

// List of files to cache
const CACHE_ASSETS = [
    '/', // Homepage
    '/index.html',
    '/assests\css\style.css',
    '/script.js',
    '/assests\js\continue.js',
    '/assests\js\download.js',
    '/assests\js\editor.js',
    '/assests\js\exaple-editor.js',
    '/assests\js\server.js',
    '/assests\js\welcome.js',
    '/assests\js\script.js',
    '/assests\js\payment method.js',
    '/assests\js\games.js',
    '/assests\icons\email.png',
    '/assests\icons\SeTTiNGSS_enhanced.png',
    '/assests\icons\share (1).png',
    '/editor.html',  // Add other pages
    '/assests\games\game1.html',
    '/assests\games\game2.html',
    '/assests\games\game3.html',
    '/assests\games\game4.html',
    '/assests\games\game5.html',
    '/games.html',
    '/lessons.html',
    '/quiz certificate.html',
    '/styled html.html',
    '/kofar guga katsina.jpg',
    '/assests\images\cOmuNiTyY_enhanced.png',
    '/assests\images\cOnTiNueE(1)_enhanced.png',
    '/assests\images\editor_enhanced.png',
    '/assests\images\GAmEs_enhanced.png',
    '/assests\images\gidan sarki.jpg',
    '/assests\images\StArTI_enhanced.png',
    '/assests\images\UpGrDeE_enhanced.png',
    '/developer.jpeg',
    '/file 1.png',
    '/file 2.png',
    '/file 3.png',
    '/file 4.png',
    '/file 5.png',
    '/file 6.png',
    '/file 7.png',
    '/file 8.png',
    '/file 9.png',
    '/file 10.png',
    '/html-tag.png',
    '/Girlimage.jpg',  // Add images
    '/video.mp4',
    '/video 2.mp4',
    '/audio.mp3',
    '/audio.m4a'
];

// Install Event - Cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching files...');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Fetch Event - Serve files from cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => caches.match('/index.html')) // Fallback to homepage if offline
    );
});

// Activate Event - Delete old caches when updating service worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache...');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
