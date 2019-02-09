var APP_SHELL_CACHE_NAME = 'my-site-cache-v1';
//app shell
var urlsToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/styles/styles.css',
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(APP_SHELL_CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    console.log('intercepting a fetch that is already in storage');
                    return response;
                }

                return fetch(event.request).then(
                    function (response) {

                        console.log('response NOT found in cache: ', response.status);
                        // Check if we received a valid response
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        console.log('fetch responseToCache: ', responseToCache);

                        caches.open(APP_SHELL_CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});