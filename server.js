const express = require('express');
const db = require('./db/index');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/user/:id', (req, res) => {
  let result = {};

  db.getUser(req.params.id, function(data) {
    result.id = data[0].ID;
    result.username = data[0].username;
    result.profilePicture = data[0].profilePicture;
    result.memberSince = data[0].memberSince;
    res.json(result);
  });
});

app.get('/api/attraction/:id', (req, res) => {

});

app.get('/api/question', (req, res) => {
  let result = {};


});

app.get('/api/answer/:questionId', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// db.attraction();
// db.userAccount();
// db.answer();
// db.question();
