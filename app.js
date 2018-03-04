require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { scrap } = require('./scrap');
const { notifications } = require('./notification');
const CronJob = require('cron').CronJob;
const { job } = require('./job');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// new CronJob('*/2 * * * * *', job, null, true);
new CronJob('0 0 11-22/3 * * *', job, null, true);

app.set('views', './');
app.set('view engine', 'pug')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', async (req, res) => res.render('index', { key: process.env.VAPID_PUBLIC_KEY, data: db.get('last_entries').value() }));

app.post('/subscribe', async (req, res) => {

  notifications.subscribe(req.body.subscription);
  res.sendStatus(200);

});

app.delete('/subscribe', async (req, res) => {

  notifications.unsubscribe(req.body.subscription);
  res.sendStatus(200);

});

app.post('/all-albums', async (req, res) => {

  const albums = (await scrap()) || [];
  albums.forEach(notifications.notificate);
  res.sendStatus(200);

});


app.get('/*', (r, s) => s.sendStatus(404));

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/aws/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/aws/fullchain.pem')
}
const httpsServer = https.createServer(options || {}, app);
httpsServer.listen(process.env.PORT, () => console.log(`Notifier app is runnin on port ${process.env.PORT}!`));
// app.listen(process.env.PORT, () => console.log('Node app is running on port ' + process.env.PORT));
