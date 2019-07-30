const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

router.post('/login', (req, res) => {
  db.query(`INSERT INTO admins (email) VALUES ('${req.body['email']}')`)
  .then(() => {
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });
/*   req.session.userId = req.body['email'];
  console.log("setting cookie to:", req.session.userId, "using routing /login post");

  db.query(`SELECT * FROM admins;`)
  .then(data => {
    const admins = data.rows;
    res.json({ admins });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  }); */

})

router.get("/login", (req, res) => {
  //check if user is logged in
  //if user is logged in render to create polls page
  //if they have any polls else render to polls
  //if user isn't logged in render to login page...
  console.log ("login")
  res.render('login');

});

router.get("/", requiresLogin, (req, res) => {
console.log("cookie is:", req.session.userId, "using routing / get to createpoll");
res.redirect('/createPoll');

});

module.exports = router;
