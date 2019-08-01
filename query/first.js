const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const generateRandomString = require('../helper');

function getAdminIdWithCookie (req){
  let adminId;
  let surveyId;
  const adminCode = generateRandomString();
  const respondentCode = generateRandomString();
                                    //Parameterized query needs to be added
                                    //chang cookie to userid
    db.query(`SELECT id FROM admins WHERE email = '${req.session.userId}';`)
    .then(res => {
      let hold = res.rows;
      console.log(hold[0]['id'],'1---3');
      adminId = hold[0]['id'];
      return db.query(`INSERT INTO surveys (admin_id, admin_code, respondent_code, title) VALUES (${adminId}, '${adminCode}', '${respondentCode}', '${req.body['title']}') RETURNING "id"`)
    })
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

module.exports = {getAdminIdWithCookie};
