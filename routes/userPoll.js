const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();



/* router.get("/userPoll/:id", (req, response) => {
  db.query(`
  SELECT surveys.id, title, options.choice, options.description
  FROM surveys
  JOIN options ON surveys.id = survey_id
  WHERE respondent_code = $1
  `,[req.params.id])
    .then(res => {
      const numOptions = res.rows.length
      const opt = []
      const desc = []
      for (i = 0; i < numOptions; i++) {
        opt.push(res.rows[i].choice)
        desc.push(res.rows[i].description)
      }
      const title = res.rows[0].title
      response.render("userPoll", {title, numOptions, opt, desc});
    }
  )
  }) */


  router.get("/userPoll/:id", (req, response) => {
 db.query(`
 SELECT surveys.id, surveys.title, options.choice, options.description, surveys.respondent_code
 FROM surveys
 JOIN options ON surveys.id = survey_id
 WHERE respondent_code = $1
 `,[req.params.id])
   .then(res => {
     console.log(res.rows)
     const numOptions = res.rows.length
     const survey_id = res.rows[0].id
     const opt = []
     const desc = []
     const title = res.rows[0].title
     const res_code = res.rows[0].respondent_code
     for (i = 0; i < numOptions; i++) {
       opt.push(res.rows[i].choice)
       desc.push(res.rows[i].description)
     }
     response.render("userPoll", {title, numOptions, opt, desc, res_code, survey_id});
   }
 )
 })



router.post("/userPoll", (req, res) => {
   console.log(req.body, req, "delta")
/*
  const respondentCode = req.body['res_code']
  const surveyId = req.body['survey_id']
  const updateSubmissionsReturnId =
        `INSERT INTO submissions (respondent_id, survey_id)
         VALUES (${respondentId}, ${surveyId})
         RETURNING "id"`;

  db.query(updateSubmissionsReturnId)
    .then(res => {
      const optionId;
      const submissionId;
      const rank;
      const numberOfAnswers = req.body['foobar'].length;
      const updateAnswersToDb =
            `INSERT INTO answers (option_id, submission_id, rank)
             VALUES (${optionId}, ${submissionId}, ${rank})`;

       for (let i = 0; i < numberOfAnswers; i++) {
        db.query(updateAnswersToDb)
          .then(() => {
            res.redirect("/vote_result")
          })
        }
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message});
    })
 */


  // 1) we will first have to get total_rank data from the database specific to the survey
  // 2) and get the current value of rank_total
  // 3) and loop through that value (res.rows i think) and add the rank
  // 4) then we can insert newly updated rank_total into the database using ALTER
  // 5) Also when we post with AJAX, the redirect doesnt work on the routes (Andy told me)
  // so we will have to figure out way to redirect to vote_result page within the AJAX requset
  res.redirect('/createPoll');
  });
module.exports = router;
