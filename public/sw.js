self.addEventListener('push', (event) => {

    const payload = event.data ? JSON.parse(event.data.text()) : {};
    const options = {
        data: {
            band: payload.band,
            url: payload.url
        },
        title: payload.text,
        body: payload.info,
        badge: '/favicon.png',
        icon: payload.cover,
        tag: 'scrapper',
        silent: 'true',
        image: payload.cover,
        actions: [{
            action: 'to-pocket',
            title: 'Pocket',
            icon: '/pocket.png'
        }, {
            action: 'to-wikipedia',
            band: payload.band,
            title: 'Wikipedia',
            icon: '/wikipedia.png'
        }
        ]
    };

    event.waitUntil(self.registration.showNotification(payload.text, options));
});

self.addEventListener('notificationclick', (event) => {
    const data = event.notification.data;
    let url = data.url;

    switch (event.action) {
        case 'to-pocket':
            url = data.url;
            break;
        case 'to-wikipedia':
            url = `https://www.google.es/search?q=${encodeURI(data.band)}`;
            break;
    }
    event.notification.close();
    event.waitUntil(clients.openWindow(url));

});
