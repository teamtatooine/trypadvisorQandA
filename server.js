const express = require('express');
const db = require('./db/index');
const bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/TrypAdvisorClient/dist'));

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

app.get('/api/question/:id', (req, res) => {
  db.getQuestion(req.params.id, function(data) {
    res.json(data);
  });
});

app.get('/api/answer/:questionId', (req, res) => {
  let result = {};

  db.getAnswer(req.params.questionId, function(data) {
    result.id = data[0].ID;
    result.questionID = data[0].questionID;
    result.userID = data[0].userID;
    result.answer = data[0].answer;
    result.answerDate = data[0].answerDate;
  });
});

app.get('/api/questions/:attractionId', (req, res) => {
  let result = {};
  db.getQuestions(req.params.attractionId, function(data) {
    // console.log('getQuestions', data[0])
    result.id = data[0].ID;
    result.question = data[0].question;
    result.questionDate = data[0].questionDate;
    result.user = {};
    result.user.username = data[0].questionUser;
    result.user.userPhotoUrl = data[0].questionUserProfilePicture;
    result.user.userMemberSince = data[0].questionUserMemberSince;
    result.answer = {};
    result.answer.answer = data[0].answer;
    result.answer.answerDate = data[0].answerDate;
    result.answer.user = {};
    result.answer.user.username = data[0].answerUser;
    result.answer.user.userPhotoUrl = data[0].answerUserProfilePicture;
    result.answer.user.userMemberSince = data[0].answerUserMemberSince;
    result.attractionName = data[0].name;
    res.json(result);
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// db.attraction();
// db.userAccount();
// db.question();
// db.answer();
