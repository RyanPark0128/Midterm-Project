const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

function insertRespondentHandleReturnId (req){
  const handle = req.body.respondent['handle'];
  const insertRespondentHandleReturnId =
  `INSERT INTO respondents (handle)
   VALUES ('${handle}')
   RETURNING "id"` ;

  db.query(insertRespondentHandleReturnId)
  .then((id) => {
    //update session with admin id
    templateVars = id.rows[0]['id']
    return templateVars
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message});
  });
  }

  //should be passed data, res
  // data will have req.body,
  //respondent id
  //survey_id
