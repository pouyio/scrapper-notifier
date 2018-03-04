const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const webpush = require('web-push');

db.defaults({ subscriptions: [], last_entries: [] }).write();

webpush.setVapidDetails(
    'mailto:pouyio@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);


const notificate = (notification) => {

    (db.get('subscriptions').value() || []).forEach(async sub => {
        try {
            await webpush.sendNotification(sub, JSON.stringify(notification));
        } catch (error) {
            console.log(error);
        }
    });
}

const subscribe = (subscription) => {
    const alreadySaved = (db.get('subscriptions').value() ||  []).find(s => s.endpoint === subscription.endpoint);
    if (!alreadySaved) {
        db.get('subscriptions').push(subscription).write();
    }
}

const unsubscribe = (subscription) => db.get('subscriptions').remove(subscription).write();

module.exports.notifications = {
    notificate,
    subscribe,
    unsubscribe
}