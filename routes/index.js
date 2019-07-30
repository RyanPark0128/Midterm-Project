const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

router.post('/login', (req, res) => {
  db.query(`INSERT INTO admins (email) VALUES ('${req.body['email']}')`)
  .then(() => {
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });

router.get("/", (req, res) => {

    res.render("index");
});

module.exports = router;
