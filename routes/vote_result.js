const express = require('express');
const router = express.Router();;
const {getSurveyWithAdminCode} = require('../query/resultsQuerries')

router.get("/vote_result/:code", (req, res) => {
    res.render("vote_result")
});

  module.exports = router;
