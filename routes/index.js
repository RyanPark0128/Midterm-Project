
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.redirect('/createPoll');
})

router.get("/", (req, res) => {
    //check if user is logged in
    //if user is logged in render to create polls page
    //if they have any polls else render to polls
    //if user isn't logged in render to login page...
    res.render("index");
});

module.exports = router;