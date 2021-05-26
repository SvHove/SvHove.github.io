"use strict"

console.log("Searching for Service Worker...");

if('serviceWorker' in navigator) {
    console.log('Installation started - main')
    navigator.serviceWorker.register('./sw.js')
        .then(reg => {
            console.log(reg);
            console.log('Service Worker registered!')
        })
        .catch(err => {
            console.log(err);
            console.log('Service Worker registration encountered an error.');
        });
}

