const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')

//requiresLogin check if user is logged in
router.get("/createPoll", requiresLogin, (req, res) => {
  console.log("req.session.userId):",req.session.userId, "cookie session set, directed to render createpoll")
  res.render("createPoll")
});

router.post("/createPoll", requiresLogin, (req, res) => {

  res.redirect("/vote_result")
});

module.exports = router;
//tracks tweets and updates them
