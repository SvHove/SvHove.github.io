let versionNumber = '0.2';

let cacheName = 'pwa1';

try {
    self.addEventListener('install', event => {
        event.waitUntil(
            caches.open(cacheName)
                .then(cache => {
                    return cache.addAll(['./', './index.html', './manifest.webmanifest', './scripts/swInclude.js', './scripts/main.js', './styles/main.css',
                        './res/backButton.svg', './res/homeButton.svg', './res/menuButton.svg', './res/searchButton.svg', './images/logo_kliniken_192.png',
                        './images/logo_kliniken_512.png', './html/ab_index.html', './html/Allgemeines.html', './html/Chi1.html', './html/Chi2.html', './html/Chi3.html',
                        './html/Chi4.html', './html/Gastro.html', './html/Gyn.html', './html/HNO.html', './html/Neuro1.html', './html/Neuro2.html', './html/Neuro3.html',
                        './html/Neuro4.html', './html/PeriOP.html', './html/Pn1.html', './html/Pn2.html', './html/Pn3.html', './html/Pn4.html', './html/prae.html',
                        './html/Sepsis.html', './html/Uro.html']);
                }).then(() => {
                self.skipWaiting().then(() => {
                });
            })
        );
    });
} catch(error) {
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
