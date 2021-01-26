console.log('Service worker 1.13 reached...');

console.log('Second message');

let cacheName = 'pwa1';

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
                    console.log('Installation of SW 1.11 finished');
                });
            })
        );
    });
} catch(error) {
    console.log('Install listener failed.');
    console.log(error);
}



self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('pwa1').then(function(cache) {
            return cache.match(event.request, {ignoreSearch: true}).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

/*
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
*/

/*
try {
    self.addEventListener('fetch', function(event) {
        console.log('Fetching...');
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true}).then(function(res) {
                if(res) {
                    return res;
                }
                console.log('Failed..');
            })
        );
    });


} catch(error) {
    console.log('Fetching listener failed.');
    console.log(error);
}
*/

