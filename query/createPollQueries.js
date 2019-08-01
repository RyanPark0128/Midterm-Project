const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const generateRandomString = require('../helper');
const adminCode = generateRandomString();
const respondentCode = generateRandomString();



function getAdminIdWithCookie (req){
  const updateSurveyToDbQuery =
`INSERT INTO surveys
(admin_id, admin_code, respondent_code, title)
VALUES (${req.session.userId}, '${adminCode}', '${respondentCode}', '${req.body['title']}')
RETURNING "id"`;

                                    //Parameterized query needs to be added
                                    //chang cookie to userid
  db.query(updateSurveyToDbQuery)
    .then(res => {
      console.log(res, "2--1")
      const surveyId = res.rows[0]['id'];
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

module.exports = {getAdminIdWithCookie};
