"use strict"

if('serviceWorker' in navigator) {
    console.log('Installation started - main')
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log(reg))
        .catch(err => console.log(err));
}

