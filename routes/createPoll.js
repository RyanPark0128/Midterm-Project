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
  //Parameterized query needs to be added
  // need to sequence promises
  console.log(req.session.userId, "1---2")
  let adminId;
  let surveyId;
    db.query(`SELECT id FROM admins WHERE email = '${req.session.userId}';`)
    .then(res => {
    let hold = res.rows;
    console.log(hold[0]['id'],'1---3');
    adminId = hold[0]['id'];
    return db.query(`INSERT INTO surveys (admin_id, admin_code, respondent_code, title) VALUES (${adminId}, '${adminCode}', '${respondentCode}', '${req.body['title']}') RETURNING "id"`)
  })
    //Parameterized query needs to be added, can be shorten using above with returning??!?!? i think
/*   let surveyId = db.query(`SELECT SCOPE_IDENTITY()`)
  .then(data => {
    res.json({data});
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  }); */
  .then(res => {
    console.log(res, "2--1")
    surveyId = res.rows[0]['id'];
    for (let i = 0; i < req.body['option'].length; i++) {
      console.log('1---4');
      db.query(`INSERT INTO options (survey_id, choice, description, total_rank) VALUES (${surveyId}, '${req.body['option'][i]}', '${req.body['description'][i]}', 0)`)
    .then(() => {
      console.log('1---5');
    })
    .catch(err => {
      response
        .status(500)
        .json({ error: err.message});
  })
}
  });

});
  //Parameterized query needs to be added
module.exports = router;
//tracks tweets and updates them






