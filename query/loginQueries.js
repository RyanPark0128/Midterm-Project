const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

function insertAdminEmailReturnId(req, res, next){
  const email = req.body['text'];
  const updateAdminReturnId =
  `INSERT INTO admins (email)
   VALUES ('${email}')
   RETURNING "id"` ;

  //Parameterized query needs to be added
  db.query(updateAdminReturnId)
    .then((id) => {
      //update session with admin id
      req.session.userId = id.rows[0]['id']
      console.log(req.session.userId)
      next()
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message});
    });
    }

module.exports = {insertAdminEmailReturnId};
