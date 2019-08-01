const express = require('express');
const router = express.Router();;
const {getSurveyWithAdminCode} = require('../query/resultsQuerries')

router.get("/vote_result/:code", (req, res) => {
  const adminCode =req.params.code
  getSurveyWithAdminCode(adminCode).then(() => {
    //check if admin is logged in
    res.render('vote_results', templateVars)
  })
});

  module.exports = router;
