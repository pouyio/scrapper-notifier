
const init = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');

        try {
            const swReg = await navigator.serviceWorker.register('sw.js')
            console.log('Service Worker is registered', swReg);
            swRegistration = swReg;
            subscribe()
        } catch (error) {
            console.error('Service Worker Error', error);
        }
    } else {
        console.warn('Push messaging is not supported');
        pushButton.textContent = 'Push Not Supported';
    }
}

const subscribe = async () => {
    const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array('BF9xrOpcLPlZsPTLP9F1KYuPOiN5Wn9lZxRiSzwbxtKw0_P2zcY9KyiD537EsrdPxmFjvkE8X7JBCwiB0FRAlNM')
    });

    updateSubscriptionOnServer(subscription);
}

const updateSubscriptionOnServer = (subscription) => {
    console.log('id para el servidor')
    console.log(subscription)
}

const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


init();