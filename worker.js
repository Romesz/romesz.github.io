/* global self, console, Response, importScripts, caches, fetch, Promise */

importScripts('https://raw.githubusercontent.com/coonsta/cache-polyfill/master/index.js');

self.addEventListener('install', function(e) {
  console.log('ServiceWorker installed');
  e.waitUntil(
    caches.open('demo-cache-v1').then(function(cache) {
      return cache.addAll([
        './index.html',
        './resources/style.css',
        './dest/index.js',
        './dest/index.js.map',
        './img/pic.jpg'
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('ServiceWorker activated');

  // delete not needed caches
  var cacheWhitelist = ['demo-cache-v1'];
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if(cacheWhitelist.indexOf(cacheName) === -1) {
            console.log(cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('ServiceWorker fetched!');
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log(e.request);
      return response || fetch(e.request);
    })
  );
  //e.respondWith(new Response('Hello world!'));  //It would rewrite the DOM to the sepecific string
});