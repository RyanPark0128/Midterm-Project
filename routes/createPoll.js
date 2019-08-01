const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication')
const {getAdminIdWithCookie} = require('../query/createPollQueries')

                        //requiresLogin check if user is logged in
router.get("/createPoll", requiresLogin, (req, response) => {
  response.render("createPoll")
});
                         //requiresLogin check if user is logged in
router.post("/createPoll", requiresLogin, (req, response) => {
  getAdminIdWithCookie(req)
  response.redirect('/vote_result');
});

module.exports = router;







