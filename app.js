require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { scrap } = require('./scrap');
const { notifications } = require('./notification');
const CronJob = require('cron').CronJob;
const { job } = require('./job');

// new CronJob('*/2 * * * * *', job, null, true);
new CronJob('0 0 11-22 * * *', job, null, true);

app.set('views', './');
app.set('view engine', 'pug')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index', { key: process.env.VAPID_PUBLIC_KEY}));

app.post('/subscribe', async (req, res) => {

  notifications.subscribe(req.body.subscription);
  res.sendStatus(200);
  
});

app.delete('/subscribe', async (req, res) => {
  
  notifications.unsubscribe(req.body.subscription);
  res.sendStatus(200);

});

app.post('/all-albums', async (req, res) => {

  notifications.notificate((await scrap())[0]);
  res.sendStatus(200);
  
});


app.get('/*', (r, s) => s.sendStatus(404));


app.listen(8080, () => console.log('Node app is running on port 8080'));