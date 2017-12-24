const vapidPublicKey = document.getElementsByTagName('body')[0].dataset.key;
let swRegistration;

const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const updateSubscriptionOnServer = async (subscription, remove = false) => {
    const options = {
        headers: new Headers({ 'Content-Type': 'application/json' }),
        method: remove ? 'DELETE' : 'POST',
        body: JSON.stringify({ subscription })
    }
    await fetch('/subscribe', options);
}

const subscribe = async () => {
    const options = {
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(vapidPublicKey)
    };
    const subscription = await swRegistration.pushManager.subscribe(options);

    updateSubscriptionOnServer(subscription);
}


const unsubscribe = async () => {
    const subscription = await swRegistration.pushManager.getSubscription();
    updateSubscriptionOnServer(subscription, true);
    swRegistration = null;
}

const init = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
            swRegistration = await navigator.serviceWorker.register('sw.js');
            subscribe();
        } catch (error) {
            console.log('SW registration failed')
        }
    } else {
        alert('no SW support')
    }
}

document.getElementById('all-albums').addEventListener('click', async () => {
    await fetch('/all-albums', { method: 'POST' });
})
document.getElementById('unsubscribe').addEventListener('click', unsubscribe);


init();