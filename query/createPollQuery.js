const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const generateRandomString = require('../helper');

function insertAdminEmailReturnId(req, res, next){
                                              //Parameterized query needs to be added
  db.query(`INSERT INTO admins (email) VALUES ('${req.body['text']}') RETURNING "id"` )
  .then((id) => {
    //update session with admin id
    req.session.userId = id.rows[0]['id']
    next()
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message});
  });
}

function getAdminIdWithCookie (req){
  let surveyId;
  const adminCode = generateRandomString();
  const respondentCode = generateRandomString();
                                    //Parameterized query needs to be added
                                    //chang cookie to userid
  db.query(`INSERT INTO surveys (admin_id, admin_code, respondent_code, title) VALUES (${req.session.userId}, '${adminCode}', '${respondentCode}', '${req.body['title']}') RETURNING "id"`)
    .then(res => {
      console.log(res, "2--1")
      surveyId = res.rows[0]['id'];
      for (let i = 0; i < req.body['option'].length; i++) {
        console.log('1---4');
                                                      //Parameterized query needs to be added
        db.query(`INSERT INTO options (survey_id, choice, description, total_rank) VALUES (${surveyId}, '${req.body['option'][i]}', '${req.body['description'][i]}', 0)`)
        .then(() => {
          console.log('1---5');
          return
        })
      }
    })
    .catch(err => {
      response
      .status(500)
      .json({ error: err.message});
    })
    return
  }

module.exports = {getAdminIdWithCookie, insertAdminEmailReturnId};
