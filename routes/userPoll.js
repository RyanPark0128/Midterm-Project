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

router.post("/userPoll/:id", (req, res) => {
  console.log(req.body)
  res.redirect("/vote_result")
  });

//Kira@google.com
//   1 |        1 | 12345      | 55555           | dinner
//   2 |        2 | 23456      | 44444           | saturday
//   3 |        3 | 45678      | 88888           | party

module.exports = router;