let versionNumber = '0.534';

let cacheName = 'pwa3';

try {
    self.addEventListener('install', event => {
        console.log("Service Worker Registering");
        event.waitUntil(
            caches.open(cacheName)
                .then(cache => {
                    return cache.addAll(['./', './index.html', './indexSnippet.html', './changelog.html', './manifest.webmanifest', './scripts/swInclude.js',
                        './scripts/main.js', './styles/main.css', './res/searchButton.svg', './images/logo_kliniken_192.png', './images/logo_kliniken_512.png',
                        './apple-touch-icon-120x120.png', './apple-touch-icon-152x152.png', './apple-touch-icon-180x180.png', './AB_Guideline/ab_index.html',
                        './AB_Guideline/Allgemeines.html', 'AB_Guideline/seq.html', './AB_Guideline/Chi1.html', './AB_Guideline/Chi2.html', './AB_Guideline/Chi3.html',
                        './AB_Guideline/Chi4.html', './AB_Guideline/Chi5.html', './AB_Guideline/Gastro.html', './AB_Guideline/Gyn.html', './AB_Guideline/HNO.html',
                        './AB_Guideline/Neuro1.html', './AB_Guideline/Neuro2.html', './AB_Guideline/Neuro3.html', './AB_Guideline/aspergillose.html', './AB_Guideline/candida.html',
                        './AB_Guideline/Neuro4.html', './AB_Guideline/PeriOP.html', './AB_Guideline/Pn1.html', './AB_Guideline/Pn2.html', './AB_Guideline/Pn3.html',
                        './AB_Guideline/Pn4.html', './AB_Guideline/Pn5.html', './AB_Guideline/Pn6.html', './AB_Guideline/prae.html', 'AB_Guideline/endo1.html', 'AB_Guideline/endo2.html',
                        './AB_Guideline/Sepsis.html', './AB_Guideline/Uro.html', './SOP/sop_index.html', './SOP/AE_Pneumonie.html', './SOP/COPD.html', './SOP/LAE.html']);
                }).then(() => {})
        );
    });
} catch (error) {
    console.log(error);
}


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('pwa3').then(function (cache) {
            return cache.match(event.request, {ignoreSearch: true}).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
