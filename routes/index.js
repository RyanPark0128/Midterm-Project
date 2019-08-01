const express = require('express');
const router = express.Router();
const {requiresLogin} = require('../lib/middleware/authentication')
const {insertAdminEmailReturnId} = require('../query/loginQueries')

router.post('/login', (req, res) => {
  //updates session cookies with admin id in here
  insertAdminEmailReturnId(req, res, () => {
    res.redirect('/createPoll');
  })
})

router.get("/login", (req, res) => {
  res.render('index');
});

/* router.get("/", requiresLogin, (req, res) => {
  res.redirect('/createPoll');
});
 */
module.exports = router;
