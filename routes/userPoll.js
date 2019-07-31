const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

router.get("/userPoll/:id", (req, response) => {
  
  db.query(`
    SELECT * FROM surveys WHERE respondent_code = $1
    `,[req.params.id])
    .then(res => {
      const title = res.rows[0].title
      response.render("userPoll", {title});
    }
  )
  })

router.post("/userPoll/:id", (req, res) => {
    res.redirect("/vote_result")
  });

//Kira@google.com
//   1 |        1 | 12345      | 55555           | dinner
//   2 |        2 | 23456      | 44444           | saturday
//   3 |        3 | 45678      | 88888           | party

module.exports = router;