
const express = require('express');
const router = express.Router();


router.get("/userPoll", (req, res) => { 
    res.render("userPoll");
    
});

router.post("/userPoll", (req, res) => {
    res.redirect("/vote_result")
  });

module.exports = router;