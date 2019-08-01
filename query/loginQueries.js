const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

function insertAdminEmailReturnId(req, res, next){
  const email = req.body['text'];
  const updateAdminToDbReturnId =
  `INSERT INTO admins (email)
   VALUES ('${email}')
   RETURNING "id"` ;

  //Parameterized query needs to be added
  db.query(updateAdminToDbReturnId)
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

module.exports = {insertAdminEmailReturnId};
