const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:e24fa315-6c03-4b1c-a107-7e510721e3b3',
  key: 'dd14b522-5f75-4f5d-ae36-acd65db4c26e:NZoUHCeeCHXVfjGKWrNzZt5DvUReUEygIuLTHVNwczA='
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
});

app.post('/createRoom', (req, res) => {
  const { username } = req.body
  chatkit.createRoom({
    creatorId: username,
    name: 'my room'
  })
    .then(() => {
      console.log('Chat Room created.');
    }).catch((err) => {
      console.log(err);
    });
});

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id})
  res.status(authData.status).send(authData.body)
});

const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
});
