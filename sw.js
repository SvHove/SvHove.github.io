console.log('Service worker reached...');

self.addEventListener('install', event => {
    console.log('Installing');
    event.waitUntil(
        caches.open('pwa1')
            .then(cache => {
                console.log('Started');
            return cache.addAll(['./', './index.html', './manifest.webmanifest', './scripts/main.js', './scripts/menu.js', './styles/main.css',
                './res/backButton.svg', './res/favicon.png', './res/homeButton.svg', './res/menuButton.svg', './res/searchButton.svg', './images/logo_kliniken_192.png',
                './images/logo_kliniken_512.png', './html/ab_index.html', './html/Allgemeines.html', './html/Chi1.html', './html/Chi2.html', './html/Chi3.html',
                './html/Chi4.html', './html/Gastro.html', './html/Gynäkologie.html', './html/HNO.html', './html/Neuro1.html', './html/Neuro2.html', './html/Neuro3.html',
                './html/Neuro4.html', './html/PeriOP.html', './html/Pn1.html', './html/Pn2.html', './html/Pn3.html', './html/Pn4.html', './html/Präambel.html',
                './html/Sepsis.html', './html/Urologie.html']);
        }).then(() => {
            console.log('Installed, skipping waiting');
            self.skipWaiting();
        })
        );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('pwa1')
            .then(cache => cache.match(event.request))
            .then(response => response || fetch(event.request))
    );
})
/*
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response; }); }); }) ); });

 */