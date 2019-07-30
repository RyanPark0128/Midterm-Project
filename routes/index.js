const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

router.post('/', (req, res) => {
    res.redirect('/createPoll');
})

router.get("/", (req, res) => {

    res.render("index");
});

module.exports = router;
