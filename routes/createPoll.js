const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication')
const {getAdminIdWithCookie} = require('../query/createPollQueries')
const nodemailer = require('nodemailer');

                        //requiresLogin check if user is logged in
router.get("/createPoll", requiresLogin, (req, response) => {
  response.render("createPoll")
});
                         //requiresLogin check if user is logged in
router.post("/createPoll", requiresLogin, (req, response) => {
  getAdminIdWithCookie(req)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iwantservicer@gmail.com',
      pass: 'Aa1Bb2Cc3'
    }
  });

  const mailOptions = {
    from: 'iwantservicer@gmail.com',
    to: 'vazywon@hotmail.com',
    subject: 'Here is the link for the poll!',
    text: 'admin link: `www.google.ca'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    response.redirect('/vote_result');
});

module.exports = router;







