console.log('Service worker reached...');

console.log('Second message');

let cacheName = 'pwa6';

console.log('Variable created: ' + cacheName);

try {
    caches.delete('pwa1');
    caches.delete('pwa2');
    caches.delete('pwa3');
    caches.delete('pwa4');
    caches.delete('pwa5');
} catch(error) {
    console.log(error);
}

console.log('caches deleted?');

try {
    console.log('Creating Cache');
    caches.open('pwa6').then(cache => {
    });
} catch(error) {
    console.log('Cache could not be opened');
}

console.log('Cache opened: ' + cacheName);

try {
    console.log('Adding install event listener.')
    self.addEventListener('install', event => {
        console.log('Installing');
        event.waitUntil(
            caches.open('pwa6')
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
} catch(error) {
    console.log('Install listener failed.');
    console.log(error);
}


try {
    console.log('Adding fetch listener');
    self.addEventListener('fetch', event => {
        console.log('Fetching now..');
        event.respondWith(
            caches.open('pwa6')
                .then(cache => cache.match(event.request))
                .then(response => response || fetch(event.request))
        );
        console.log('Fetch reached end');
    });
    console.log('Fetch listener added.');
} catch(error) {
    console.log('Fetching listener failed.');
    console.log(error);
}



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
