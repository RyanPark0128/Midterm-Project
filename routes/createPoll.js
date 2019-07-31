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

router.post("/createPoll", requiresLogin, (req, response) => {
  const adminCode = generateRandomString();
  const respondentCode = generateRandomString();
  // need to sequence promises
  console.log(req.session.userId, "1---2")
  let adminId;
  let surveyId;
                                    //Parameterized query needs to be added
    db.query(`SELECT id FROM admins WHERE email = '${req.session.userId}';`)
    .then(res => {
      let hold = res.rows;
      console.log(hold[0]['id'],'1---3');
      adminId = hold[0]['id'];
      return db.query(`INSERT INTO surveys (admin_id, admin_code, respondent_code, title) VALUES (${adminId}, '${adminCode}', '${respondentCode}', '${req.body['title']}') RETURNING "id"`)
    })
    .then(res => {
      console.log(res, "2--1")
      surveyId = res.rows[0]['id'];
      for (let i = 0; i < req.body['option'].length; i++) {
        console.log('1---4');
                                                      //Parameterized query needs to be added
        db.query(`INSERT INTO options (survey_id, choice, description, total_rank) VALUES (${surveyId}, '${req.body['option'][i]}', '${req.body['description'][i]}', 0)`)
        .then(() => {
          console.log('1---5');
          return
        })
      }
    })
    .catch(err => {
      response
      .status(500)
      .json({ error: err.message});

    })
  response.redirect('/vote_result');

});

module.exports = router;

res.redirect("/vote_result")







