const express = require('express');
const db = require('./db/index');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});



app.listen(port, () => console.log(`Listening on port ${port}`));

// db.attraction();
// db.userAccount();
// db.answer();
// db.question();
