const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();



router.get("/userPoll/:id", (req, response) => {
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
  })



router.post("/userPoll", (req, res) => {
  console.log(req.body)
  // 1) we will first have to get total_rank data from the database specific to the survey
  // 2) and get the current value of rank_total
  // 3) and loop through that value (res.rows i think) and add the rank
  // 4) then we can insert newly updated rank_total into the database using ALTER
  // 5) Also when we post with AJAX, the redirect doesnt work on the routes (Andy told me) 
  // so we will have to figure out way to redirect to vote_result page within the AJAX requset

  res.redirect("/vote_result")
  });

//Kira@google.com    http://localhost:8080/userpoll/55555
//   1 |        1 | 12345      | 55555           | dinner
//   2 |        2 | 23456      | 44444           | saturday
//   3 |        3 | 45678      | 88888           | party

module.exports = router;
