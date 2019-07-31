const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

router.get("/userPoll/:id", (req, res) => {
  console.log(req.params.id)
  getUserWithLink(req.params.id)
  res.render("userPoll");
});

router.post("/userPoll", (req, res) => {
    res.redirect("/vote_result")
  });

const getUserWithLink = function(link) {
  return db.query(`
    SELECT * FROM admins WHERE email = $1
    `,[link])
    .then(res => console.log(res.rows[0].email))
}


//Kira@google.com

module.exports = router;