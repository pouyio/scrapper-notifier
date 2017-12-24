const { scrap } = require('./scrap');
const { notifications } = require('./notification');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const job = async () => {
    const lastAlbumSavedText = db.get('last_entry').value();
    const albums = (await scrap()) ||  [];
    const lastAlbumFound = albums[0] || '';
    db.set('last_entry', lastAlbumFound.text).write();

    let indexFound = albums.findIndex(a => a.text === lastAlbumSavedText);

    if (indexFound === -1) indexFound = albums.length;

    albums.splice(0, indexFound).forEach(notifications.notificate);
}

module.exports.job = job;