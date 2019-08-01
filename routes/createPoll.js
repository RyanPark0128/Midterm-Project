const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')
const {getAdminIdWithCookie} = require('../query/createPollQuery.js/index.js')

//requiresLogin check if user is logged in
router.get("/createPoll", requiresLogin, (req, response) => {
  console.log("req.session.userId):",req.session.userId, "cookie session set, directed to render createpoll")
  response.render("createPoll")
});

router.post("/createPoll", requiresLogin, (req, response) => {
  getAdminIdWithCookie(req)
  response.redirect('/vote_result');
});

module.exports = router;







