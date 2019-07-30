const express = require('express');
const router = express.Router();

router.get("/createPoll", (req, res) => { 
    res.render("createPoll")
    //check if user is logged in
    //if user is logged in render to create polls page
    //if they have any polls else render to polls
  
    /*
      if (((userLoginCheck(req.session.userID)))) {
      templateVars.error = 'User already Logged in';
      res.render('index', templateVars);
    } else {
      //res.render('login', templateVars);//not necessary?
    }
    */
});

router.post("/createPoll", (req, res) => {
    res.redirect("/vote_result")
});

module.exports = router;