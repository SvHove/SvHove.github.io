// the cache version gets updated every time there is a new deployment
const CACHE_VERSION = 1;
const CURRENT_CACHE = `main-${CACHE_VERSION}`;

// these are the routes we are going to cache for offline support
const cacheFiles = ['./', './index.html', './indexSnippet.html', './settings.html', './changelog.html', './manifest.webmanifest', './scripts/swInclude.js',
    './scripts/main.js', './styles/main.css', './images/logo_emden_192.png', './images/logo_emden_512.png',
    './apple-touch-icon-120x120.png', './apple-touch-icon-152x152.png', './apple-touch-icon-180x180.png', './AB_Guideline/ab_index.html',
    './AB_Guideline/Allgemeines.html', 'AB_Guideline/seq.html', './AB_Guideline/Chi1.html', './AB_Guideline/Chi2.html', './AB_Guideline/Chi3.html',
    './AB_Guideline/Chi4.html', 'AB_Guideline/sab.html', './AB_Guideline/Gastro.html', './AB_Guideline/Gyn.html', './AB_Guideline/HNO.html',
    './AB_Guideline/Neuro1.html', './AB_Guideline/Neuro2.html', './AB_Guideline/Neuro3.html', './AB_Guideline/aspergillose.html', './AB_Guideline/candida.html',
    './AB_Guideline/Neuro4.html', './AB_Guideline/PeriOP.html', './AB_Guideline/Pn1.html', './AB_Guideline/Pn2.html', './AB_Guideline/Pn3.html',
    './AB_Guideline/Pn4.html', './AB_Guideline/Pn5.html', './AB_Guideline/Pn6.html', './AB_Guideline/prae.html', 'AB_Guideline/endo1.html', 'AB_Guideline/endo2.html',
    './AB_Guideline/Sepsis.html', './AB_Guideline/Uro.html', './SOP/sop_index.html', './SOP/AE_Pneumonie.html', './SOP/COPD.html', './SOP/LAE.html',
    './res/antibiotics.json', './res/searchIndex.json', './res/Vancomycin_Dosierung.pdf', './res/Antiinfektiva_Nierenersatzverfahren-1.pdf',
    './reaApp.html', './styles/reaApp.css', './scripts/reaApp.js'];

// on activation we clean up the previously registered service workers
self.addEventListener('activate', evt =>
    evt.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CURRENT_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    )
);

// on install we download the routes we want to cache for offline
self.addEventListener('install', evt =>
    evt.waitUntil(
        caches.open(CURRENT_CACHE).then(cache => {
            return cache.addAll(cacheFiles);
        })
    )
);

// fetch the resource from the network
const fromNetwork = (request, timeout) =>
    new Promise((fulfill, reject) => {
        const timeoutId = setTimeout(reject, timeout);
        fetch(request).then(response => {
            clearTimeout(timeoutId);
            fulfill(response);
            update(request);
        }, reject);
    });

// fetch the resource from the browser cache
const fromCache = request =>
    caches
        .open(CURRENT_CACHE)
        .then(cache =>
            cache
                .match(request)
                .then(matching => matching || cache.match('/offline/'))
        );

// cache the current page to make it available for offline
const update = request =>
    caches
        .open(CURRENT_CACHE)
        .then(cache =>
            fetch(request).then(response => cache.put(request, response))
        );

// general strategy when making a request (eg if online try to fetch it
// from the network with a timeout, if something fails serve from cache)
self.addEventListener('fetch', evt => {
    evt.respondWith(
        fromNetwork(evt.request, 10000).catch(() => fromCache(evt.request))
    );
    evt.waitUntil(update(evt.request));
});


/*

OLD CODE

let versionNumber = '0.752';

let cacheName = 'pwa5';

try {
    self.addEventListener('install', event => {
        console.log("Service Worker Registering");
        event.waitUntil(
            caches.open(cacheName)
                .then(cache => {
                    return cache.addAll(['./', './index.html', './indexSnippet.html', './settings.html', './changelog.html', './manifest.webmanifest', './scripts/swInclude.js',
                        './scripts/main.js', './styles/main.css', './images/logo_emden_192.png', './images/logo_emden_512.png',
                        './apple-touch-icon-120x120.png', './apple-touch-icon-152x152.png', './apple-touch-icon-180x180.png', './AB_Guideline/ab_index.html',
                        './AB_Guideline/Allgemeines.html', 'AB_Guideline/seq.html', './AB_Guideline/Chi1.html', './AB_Guideline/Chi2.html', './AB_Guideline/Chi3.html',
                        './AB_Guideline/Chi4.html', 'AB_Guideline/sab.html', './AB_Guideline/Gastro.html', './AB_Guideline/Gyn.html', './AB_Guideline/HNO.html',
                        './AB_Guideline/Neuro1.html', './AB_Guideline/Neuro2.html', './AB_Guideline/Neuro3.html', './AB_Guideline/aspergillose.html', './AB_Guideline/candida.html',
                        './AB_Guideline/Neuro4.html', './AB_Guideline/PeriOP.html', './AB_Guideline/Pn1.html', './AB_Guideline/Pn2.html', './AB_Guideline/Pn3.html',
                        './AB_Guideline/Pn4.html', './AB_Guideline/Pn5.html', './AB_Guideline/Pn6.html', './AB_Guideline/prae.html', 'AB_Guideline/endo1.html', 'AB_Guideline/endo2.html',
                        './AB_Guideline/Sepsis.html', './AB_Guideline/Uro.html', './SOP/sop_index.html', './SOP/AE_Pneumonie.html', './SOP/COPD.html', './SOP/LAE.html',
                        './res/antibiotics.json', './res/searchIndex.json', './res/Vancomycin_Dosierung.pdf', './res/Antiinfektiva_Nierenersatzverfahren-1.pdf',
                        './reaApp.html', './styles/reaApp.css', './scripts/reaApp.js']);
                }).then()
        );
    });
} catch (error) {
    console.log(error);
}


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(cacheName).then(function (cache) {
            return cache.match(event.request, {ignoreSearch: true}).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
*/