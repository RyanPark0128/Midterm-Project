const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();
const generateRandomString = require('../helper');


//requiresLogin check if user is logged in
router.get("/createPoll", requiresLogin, (req, res) => {
  console.log("req.session.userId):",req.session.userId, "cookie session set, directed to render createpoll")
  res.render("createPoll")
});

router.post("/createPoll", requiresLogin, (req, res) => {
  const adminCode = generateRandomString();
  const respondent_code = generateRandomString();

  db.query(`INSERT INTO surveys (admin_id, admin_code, respondent_code, title) VALUES (${req.session.userId}, ${adminCode}, ${respondent_code}, ${req.body['title']}`)
  .then(() => {
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });

  console.log(db.query(`SELECT id FROM admins WHERE email = ${req.session.userId};`)
  .then(data => {
    res.json({data});
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  }));

  for (let i = 0; i < req.body['option'].length; i++) {
    db.query(`INSERT INTO options (survey_id, choice, description) VALUES ('${survey_id}, ${req.body['option'][i]}, ${req.body['description'][i]}')`)
  .then(() => {
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });
};
res.redirect("/vote_result")
});
module.exports = router;
//tracks tweets and updates them
