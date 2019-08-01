const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

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

module.exports = {insertAdminEmailReturnId};
