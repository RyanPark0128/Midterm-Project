const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

router.post('/login', (req, res) => {
    //Parameterized query needs to be added

  db.query(`INSERT INTO admins (email) VALUES ('${req.body['text']}') RETURNING "id"` )
  .then((id) => {
    req.session.userId = id.rows[0]['id']
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });
  //update session with admin id
  req.session.userId = req.body['text'];
  res.redirect('/createPoll');
})

router.get("/login", (req, res) => {
  res.render('index');
});

router.get("/", requiresLogin, (req, res) => {
  res.redirect('/createPoll');
});

module.exports = router;
