console.log('Service worker 1.07 reached...');

console.log('Second message');

let cacheName = 'pwa8';

console.log('Variable created: ' + cacheName);

try {
    caches.delete(cacheName);
} catch(error) {
    console.log(error);
}

console.log('caches deleted?');

try {
    console.log('Creating Cache');
    caches.open(cacheName).then(cache => {
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
            caches.open(cacheName)
                .then(cache => {
                    console.log('Starting to add to cache.');
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
    self.addEventListener('fetch', function(event) {
        console.log('Fetching...');
        event.respondWith(
            caches.match(event.request)
        );
    });


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
