const express = require('express');
const db = require('./db/index');
const bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/MergedTrypAdvisorClient/dist'));

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
  db.getQuestions(req.params.attractionId, function(data) {
    // console.log('getQuestions', data);
    let resArray = [];
    Object.keys(data).forEach(function(key) {
      let result = {};
      var row = data[key];
      result.id = row.ID;
      result.question = row.question;
      result.questionDate = row.questionDate;
      result.user = {};
      result.user.username = row.questionUser;
      result.user.userPhotoUrl = row.questionUserProfilePicture;
      result.user.userMemberSince = row.questionUserMemberSince;
      result.answer = [];
      let answerObj = {};
      answerObj.answer = row.answer;
      answerObj.answerDate = row.answerDate;
      answerObj.user = {};
      answerObj.user.username = row.answerUser;
      answerObj.user.userPhotoUrl = row.answerUserProfilePicture;
      answerObj.user.userMemberSince = row.answerUserMemberSince;
      result.answer.push(answerObj);
      result.attractionName = row.name;
      resArray.push(result);
    });
    // console.log('😇', resArray);
    res.json(resArray);
  })
});

app.post('/api/question/:attractionId/:userId', (req, res) => {
  const attractionId = req.params.attractionId,
        userId = req.params.userId,
        question = req.body.question;
        // console.log('post attractionId', req.params);
  db.postQuestion(userId, attractionId, question, function(data) {
    let result = {};
    db.getQuestions(req.params.attractionId, function(data) {
      let resArray = [];
      Object.keys(data).forEach(function(key) {
        let result = {};
        var row = data[key];
        result.id = row.ID;
        result.question = row.question;
        result.questionDate = row.questionDate;
        result.user = {};
        result.user.username = row.questionUser;
        result.user.userPhotoUrl = row.questionUserProfilePicture;
        result.user.userMemberSince = row.questionUserMemberSince;
        result.answer = [];
        let answerObj = {};
        answerObj.answer = row.answer;
        answerObj.answerDate = row.answerDate;
        answerObj.user = {};
        answerObj.user.username = row.answerUser;
        answerObj.user.userPhotoUrl = row.answerUserProfilePicture;
        answerObj.user.userMemberSince = row.answerUserMemberSince;
        result.answer.push(answerObj);
        result.attractionName = row.name;
        resArray.push(result);
      });
      // console.log('😇', resArray);
      res.json(resArray);
    });
  });
})

app.post('/api/answer/:questionId/:userId', (req, res) => {
  const userId = req.params.userId,
        questionId = req.params.questionId,
        answer = req.body.answer
        console.log('userId: ' + userId + ' questionId: ' + questionId + ' answer: ' + answer);

  db.postAnswer(userId, questionId, answer, function(data) {
    res.end('');
  });
})

app.listen(port, () => console.log(`Listening on port ${port}`));

// db.attraction();
// db.userAccount();
// db.question();
// db.answer();
