const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')
const generateRandomString = require('../helper');


//requiresLogin check if user is logged in
router.get("/createPoll", requiresLogin, (req, res) => {
  console.log("req.session.userId):",req.session.userId, "cookie session set, directed to render createpoll")
  res.render("createPoll")
});


router.post("/createPoll", requiresLogin, (req, res) => {
  const userCode = generateRandomString();
  const adminCode = generateRandomString();
  /*
  need to randomly generate code for admins link, respondents link
  */
 /*  for (let i = 0; i < req.body['option'].length; i++) {
    db.query(`INSERT INTO options (survey_id, choice, description) VALUES ('${survey_id}, ${req.body['option'][i]}, ${req.body['description'][i]}')`)
  .then(() => {
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });

};


db.query(`INSERT INTO surveys (survey_id, choice, description) VALUES ('${elt}')`)
  .then(() => {
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });
});
*/

res.redirect("/vote_result")



});




module.exports = router;
//tracks tweets and updates them
