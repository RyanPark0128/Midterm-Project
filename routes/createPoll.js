const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication.js')

//requiresLogin check if user is logged in
router.get("/createPoll", requiresLogin, (req, res) => {
  console.log("req.session.userId):",req.session.userId, "cookie session set, directed to render createpoll")
  res.render("createPoll")
});

router.post("/createPoll", requiresLogin, (req, res) => {
  console.log(req.body);
  for (let elt of req.body['option']){
  console.log(elt)
}
  /*
  need to randomly generate code for admins link, respondents link
  */
/*   for (elt in req.body['option']){
    db.query(`INSERT INTO options (survey_id, choice, description) VALUES ('${elt}')`)
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
  }); */

res.redirect("/vote_result")



});


module.exports = router;
//tracks tweets and updates them
