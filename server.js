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
  let result = {};

  db.getAttraction(req.params.id, function(data) {
    result.id = data[0].ID;
    result.name = data[0].name;
    result.description = data[0].description;
    result.phone = data[0].phone;
    result.email = data[0].email;
    result.website = data[0].website;
    result.suggestedDuration = data[0].suggestedDuration;
    result.featuredIn = data[0].featuredIn;
    result.address1 = data[0].address1;
    result.address2 = data[0].address2;
    result.city = data[0].city;
    result.state = data[0].state;
    result.country = data[0].country;
    result.latitude = data[0].latitude;
    result.longitude = data[0].longitude;
    result.category = data[0].category;
    result.bio = data[0].sentences;
    result.image = data[0].image;
    res.json(result);
  });
});

app.get('/api/questions', (req, res) => {
  let resultsArr = [];
  let results = {};

  db.getQuestions(function(data) {
    res.json(data);
  });
});

app.get('/api/answer/:questionId', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// db.attraction();
// db.userAccount();
// db.answer();
// db.question();
