const CACHE_NAME = 'msb-cache-v1';
const urlsToCache = [
    './',
    '/index.html',
    '/css/reset.css',
    '/css/variables.css',
    '/css/style.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/animations.css',
    '/css/responsive.css',
    '/css/utilities.css',
    '/js/script.js',
    '/js/animations.js',
    '/js/interactions.js',
    '/js/navigation.js',
    '/js/effects.js',
    '/manifest.json',
    '/assets/images/capa-livro.png',
    '/assets/images/capa-livro-mini.png',
    '/assets/images/personagem-simone.jpg',
    '/assets/images/personagem-clara.jpg',
    '/assets/images/personagem-lara.jpg',
    '/assets/images/personagem-vanessa.jpg',
    '/assets/images/personagem-camila.jpg',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-512.png',
    // Adicione outras imagens e recursos
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
                if (response) return response;
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});