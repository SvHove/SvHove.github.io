console.log('Service worker reached...');

let cacheName = 'pwa5';

caches.open(cacheName).then(cache => {});

console.log('Cache opened' + cacheName);

self.addEventListener('install', event => {
    console.log('Installing');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Started');
                return cache.addAll(['./', './index.html', './manifest.webmanifest', './scripts/swInclude.js', './scripts/main.js', './styles/main.css',
                    './res/backButton.svg', './res/homeButton.svg', './res/menuButton.svg', './res/searchButton.svg', './images/logo_kliniken_192.png',
                    './images/logo_kliniken_512.png', './html/ab_index.html', './html/Allgemeines.html', './html/Chi1.html', './html/Chi2.html', './html/Chi3.html',
                    './html/Chi4.html', './html/Gastro.html', './html/Gyn.html', './html/HNO.html', './html/Neuro1.html', './html/Neuro2.html', './html/Neuro3.html',
                    './html/Neuro4.html', './html/PeriOP.html', './html/Pn1.html', './html/Pn2.html', './html/Pn3.html', './html/Pn4.html', './html/Präambel.html',
                    './html/Sepsis.html', './html/Uro.html']);
            }).then(() => {
            console.log('Installed, skipping waiting');
            self.skipWaiting().then(() => {
                console.log('Installation finished');
            });
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request))
            .then(response => response || fetch(event.request))
    );
})

self.addEventListener('activate', (e) => {

    e.waitUntil(

        CacheStorage.keys().then(keys => {
            for(let i=0;i<keys.length;i++) {
                if(keys[i] !== cacheName) {
                    CacheStorage.delete(keys[i]);
                }
            }
        }));
})


/*
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(pwa2).then((cache) => {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        }));
});
*/
