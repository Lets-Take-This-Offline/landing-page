self.oninstall = function() {
    self.skipWaiting();

    event.waitUntil(
        caches.open('serviceworkerbook2').then(function(cache) {
            cache.addAll([
                '/',
                'index.html',
                'style.css'
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