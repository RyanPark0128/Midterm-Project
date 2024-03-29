const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

//generates random strings to be used for short url
//to be distibuted to users or admins of surveys
const generateRandomString = require('../helper');
const adminCode = generateRandomString();
const respondentCode = generateRandomString();

function getAdminIdWithCookie (req){

  const adminId = req.session.userId;
    const title = req.body['title'];
    const updateSurveyToDb =
          `INSERT INTO surveys (admin_id, admin_code, respondent_code, title)
           VALUES (${adminId}, '${adminCode}', '${respondentCode}', '${title}')
           RETURNING "id"`;
    //nested query to be executed
    //adminId is provided so that
    //survey can be associated w/
    db.query(updateSurveyToDb)
      .then((id) => {
        const surveyId = id.rows[0]['id'];
        const choice = req.body['option'];
        const description = req.body['description'];
        const totalRank = 0
        //looping through each option passed
        //in when n options is, n > 0.
        for (let i = 0; i < req.body['option'].length; i++) {
  
          db.query(`INSERT INTO options (survey_id, choice, description, total_rank)
          VALUES (${surveyId}, '${choice[i]}', '${description[i]}', ${totalRank})`)
            .then(() => {
              return
            })
          }
      })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message});
    })
    return
  }

module.exports = {getAdminIdWithCookie};
