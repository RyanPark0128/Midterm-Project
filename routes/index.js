const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

router.post('/login', (req, res) => {
    //Parameterized query needs to be added

  db.query(`INSERT INTO admins (email) VALUES ('${req.body['text']}')`)
  .then(() => {
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });
  req.session.userId = req.body['text'];
    //Parameterized query needs to be added

/*   db.query(`SELECT * FROM admins;`)
  .then(data => {
    const admins = data.rows;
    res.json({ admins });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  }); */
  console.log("setting cookie to:", req.session.userId, "using routing /login post");
  res.redirect('/createPoll');
})

router.get("/login", (req, res) => {
  console.log("cookie is:", req.session.userId, "using routing / get to login");
  res.render('index');
});

router.get("/", requiresLogin, (req, res) => {
  console.log("cookie is:", req.session.userId, "using routing / get to createpoll");
  res.redirect('/createPoll');
});

module.exports = router;
