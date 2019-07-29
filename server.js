// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
// const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
const admins = {}
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'Key2'],
// }));
app.set("view engine", "ejs");
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  //check if user is logged in
  //if user is logged in render to create polls page
  //if they have any polls else render to polls
  //if user isn't logged in render to login page...
  res.render("index");
});

app.get("/createPoll", (req, res) => { 
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

app.post("/createPoll", (req, res) => { 
  res.render("createPoll")
});
app.get("/userPoll", (req, res) => { 
  res.render("userPoll");
  
});
app.get("/vote_result", (req, res) => { 
  res.render('vote_result')
  
});

app.post('/', (req, res) => {
    admins.email = req.body['email']
    console.log(admins.email)
    res.redirect('/createPoll');
})




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
