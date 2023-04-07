const CACHE_NAME = '2048-game-pwa-cache';

const urlsToCache = [
  '/pwa-examples/2048/',
  '/pwa-examples/2048/index.html',
  '/pwa-examples/2048/index.js',
  '/pwa-examples/2048/style.css',
  '/pwa-examples/2048/icons/icon-16x16.png',
  '/pwa-examples/2048/icons/icon-256x256.png',
  '/pwa-examples/2048/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));

            return response;
          });
      })
  );
});