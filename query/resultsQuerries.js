const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();


function getSurveyWithAdminCode (adminCode){
  const surveyCode = adminCode;
  const resultsWithAdminCode =
  `SELECT title, total_rank, admin_code, choice, description
   FROM options
   JOIN surveys
   ON options.survey_id = surveys.id
   WHERE surveys.id = ${surveyCode};`;

  db.query(resultsWithAdminCode)
   .then(res => {
    res.rows.forEach(option => {
      console.log(`${option.choice} has an description of ${option.description} and has a rank of ${option.total_rank}`);
      return res;
    })
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message});
  })
}

module.exports = {getSurveyWithAdminCode};
