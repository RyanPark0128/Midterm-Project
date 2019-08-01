const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();


router.get("/userPoll/:id", (req, res) => {
 /*  db.query(`SELECT title FROM surveys WHERE respondent_code = '${req.params.id}'`)
    .then(res => {
      litle = res.rows[0] */

    res.render("userPoll"/* , title['title'] */);
    })

router.post("/userPoll", (req, res) => {
    res.redirect("/vote_result")
  });

//Kira@google.com    http://localhost:8080/userpoll/55555
//   1 |        1 | 12345      | 55555           | dinner
//   2 |        2 | 23456      | 44444           | saturday
//   3 |        3 | 45678      | 88888           | party

module.exports = router;
