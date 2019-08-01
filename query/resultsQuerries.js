const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();


function getSurveyWithAdminCode (){
  `SELECT title, total_rank, admin_code, choice, description
   FROM options
   JOIN surveys
   ON options.survey_id = surveys.id
   WHERE surveys.id = 1;`

}
