self.oninstall = function(event) {
    self.skipWaiting();

    event.waitUntil(
        caches.open('serviceworkerbook5').then(function(cache) {
            cache.addAll([
                '/',
                'index.html',
                'style.css',
                'carmen.jpg'
            ])
            .then(function() {
                // .add() doesn't return a response
                console.log('added file');
            })
            .catch(function(err) {
                console.log(err);
            });
        })
        .catch(function(err) {
            console.log('err ', err);
        })
    )
}

self.onactivate = function() {
    caches.keys()
    .then(function(cacheNames) {
        cacheNames.forEach(function(cache) {
            if(cache != 'serviceworkerbook5') {
                caches.delete(cache);
            }
        })
    })
}

self.onfetch = function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(cachedFiles) {
            if(cachedFiles) {
                return cachedFiles;
            } else {
                return fetch(event.request);
            }
        })
    );
}