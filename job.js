const { scrap } = require('./scrap');
const { notifications } = require('./notification');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const job = async () => {

    const albumsSaved = db.get('last_entries').value();
    const newAlbums = (await scrap()) || [];

    newAlbums.forEach(album => {
        if (!albumsSaved.some(a => a.text === album.text)) {
            db.get('last_entries').push(album).write();
            notifications.notificate(album);
        }
    });

}

module.exports.job = job;