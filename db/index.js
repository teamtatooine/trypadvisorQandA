const data = require('../data');
const faker = require('faker');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'tatooine'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });


let attraction = function () {
  for ( let i = 1; i < 101; i++) {
    const name = faker.company.companyName();
    const description = faker.lorem.sentences();
    const phone = faker.phone.phoneNumber();
    const email = faker.internet.email();
    const website = faker.internet.url();
    const suggestedDuration = faker.random.number();
    const featuredIn = faker.hacker.noun();
    const address1 = faker.address.streetAddress();
    const address2 = faker.address.secondaryAddress();
    const city = faker.address.city();
    const state = faker.address.state();
    const country = faker.address.country();
    const latitude = faker.address.latitude();
    const longitude = faker.address.longitude();
    const category = faker.commerce.department();
    const bio = faker.lorem.sentences();
    const image = faker.image.avatar();

    var sql = "INSERT INTO attraction (name, description, phone, email, website, suggestedDuration, featuredIn, address1, address2, city, state, country, latitude, longitude, category, bio, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [name, description, phone, email, website, suggestedDuration, featuredIn, address1, address2, city, state, country, latitude, longitude, category, bio, image], function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        console.log('success!');
      }
    })
  }
}

let userAccount = function () {
  for ( let i = 1; i < 101; i++) {
    const username = faker.name.findName();
    const profilePicture = faker.image.imageUrl();
    const memberSince = faker.date.past();


    var sql = "INSERT INTO userAccount (username, profilePicture, memberSince) VALUES (?, ?, ?)";
    connection.query(sql, [username, profilePicture, memberSince], function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        console.log('success!');
      }
    })
  }
}

let question = function () {
  for ( let i = 1; i < 101; i++) {
    const userID = i;
    const attractionID = i;
    const question = faker.lorem.sentence();
    const questionDate = faker.date.past();

    console.log('question', question);

    var sql = "INSERT INTO question (question, questionDate, userID, attractionID) VALUES (?, ?, ?, ?)";
    connection.query(sql, [question, questionDate, userID, attractionID], function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        console.log('success!');
      }
    })
  }
}

let answer = function () {
  for ( let i = 1; i < 101; i++) {
    const questionID = i;
    const userID = i;
    const answer = faker.lorem.sentences();
    const answerDate = faker.date.past();

    var sql = "INSERT INTO answer (questionID, answer, answerDate, userID) VALUES (?, ?, ?, ?)";
    connection.query(sql, [questionID, answer, answerDate, userID], function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        console.log('success!');
      }
    })
  }
}

let getUser = function (userID, cb) {
  var sql = "SELECT * FROM userAccount where ID = ?";

  connection.query(sql, [userID] , function (err, results, fields) {
    if (err) {
      throw err;
    } else {
      cb(results);
    }
  });
}

let getAttraction = function (attractionID, cb) {
  var sql = "SELECT * FROM attraction where ID = ?";

  connection.query(sql, [attractionID], function(err, results, fields) {
    if (err) {
      throw err;
    } else {
      cb(results);
    }
  })
}

let getQuestions = function (attractionId, cb) {
  var sql = "SELECT * FROM question where attractionId = ?";

  connection.query(sql, [attractionId], function(err, results, fields) {
    if (err) {
      throw err;
    } else {
      cb(results);
    }
  })
}

let getAnswer = function (questionId, cb) {
  var sql = "select * from answer where questionId = ?";

  connection.query(sql, [questionId], function(err, results, fields) {
    if (err) {
      throw err;
    } else {
      cb(results);
    }
  })
}


// connection.end();


module.exports.attraction = attraction;
module.exports.question = question;
module.exports.answer = answer;
module.exports.userAccount = userAccount;
module.exports.getUser = getUser;
module.exports.getAttraction = getAttraction;
module.exports.getQuestions = getQuestions;
module.exports.getAnswer = getAnswer;