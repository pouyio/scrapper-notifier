const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const webpush = require('web-push');

app.use(express.static('.'));
app.use(bodyParser.json());

const vapidKeys = {
  publicKey:
    'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
  privateKey: 'UUxI4O8-FbRouAevSmBQ6o18hgE4nSG3qwvJTfKc-ls'
};

webpush.setVapidDetails(
  'mailto:pouyio@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);



// const pushapp = require('./serviceworker-push.js')(app);

app.get('/t', async (req, res) => {

  const response = await webpush.sendNotification(subscription, dataToSend);

  console.log(response);

});

app.get('/*', function (r, s) {
  s.sendStatus(201);

  // pushapp.push(u.endpoint, {
  //   title: 'Hi there!', 
  //   body: "I'm a web push notification", 
  //   icon: '', 
  //   badge: '', 
  //   actions: [
  //     {action: 'like', title: '👍Like'},
  //     {action: 'reply', title: 'Reply'}
  //   ]
  // })

});


app.listen(8080, function () {
  console.log('Node app is running on port 8080');
});