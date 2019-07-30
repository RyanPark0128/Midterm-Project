const express = require('express');
const router = express.Router();;


router.get("/vote_result", (req, res) => { 
    res.render('vote_result')
  });

  module.exports = router;