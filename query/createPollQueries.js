const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const generateRandomString = require('../helper');
const adminCode = generateRandomString();
const respondentCode = generateRandomString();



function getAdminIdWithCookie (req){
  const updateSurveyToDb =
`INSERT INTO surveys (admin_id, admin_code, respondent_code, title)
 VALUES (${req.session.userId}, '${adminCode}', '${respondentCode}', '${req.body['title']}')
 RETURNING "id"`;


  db.query(updateSurveyToDb)
    .then(res => {
      const surveyId = res.rows[0]['id'];
      console.log(surveyId, "survey id got set???? createpolqueries")
      const  updateOptionsToDb =
      `INSERT INTO options (survey_id, choice, description, total_rank)
       VALUES (${surveyId}, '${req.body['option'][i]}', '${req.body['description'][i]}', 0)`
      for (let i = 0; i < req.body['option'].length; i++) {
        db.query(updateOptionsToDb)
        .then(() => {
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
