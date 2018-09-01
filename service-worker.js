/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */

'use strict';
importScripts('./build/sw-toolbox.js');
const version = "v1";
const prev_version = "v0";

var clearInactiveCaches = function() {
    caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
            if (cacheName.endsWith('$$$inactive$$$'))
                caches.delete(cacheName);
        });
    });
};

self.addEventListener('activate', event => {
    console.log(version + ' now activated');
    caches.delete('ionic-cache-' + prev_version);
    clearInactiveCaches();
    console.log('delete previous cache');
});


self.addEventListener('install', event => {
    console.log(version + ' installing');
});

self.addEventListener('message', function(e) {
    if (e.data.updateSw) {
        self.skipWaiting();
    }
});


self.toolbox.options.cache = {
    name: 'ionic-cache-' + version
};

// pre-cache our key assets
self.toolbox.precache(
    [
        './assets/icon/favicon.ico',
        './build/sw-toolbox.js',
        './build/main.js',
        './build/vendor.js',
        './build/main.css',
        './build/polyfills.js',
        'index.html',
        'manifest.json'
    ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;