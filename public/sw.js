self.addEventListener('push', (event) => {

    const payload = event.data ? JSON.parse(event.data.text()) : {};
    const options = {
        data: {
            band: payload.band,
            url: payload.url
        },
        title: payload.text,
        body: payload.info,
        badge: '/logo.png',
        icon: payload.cover,
        tag: Date.now(),
        silent: true,
        image: payload.cover,
        actions: [{
            action: 'to-google',
            band: payload.band,
            title: 'Google'
        }]
    };

    event.waitUntil(self.registration.showNotification(payload.text, options));
});

self.addEventListener('notificationclick', (event) => {
    const data = event.notification.data;
    let url = data.url;

    switch (event.action) {
        case 'to-google':
            url = `https://www.google.es/search?q=${encodeURI(data.band)}`;
            break;
    }
    event.notification.close();
    event.waitUntil(clients.openWindow(url));

});
