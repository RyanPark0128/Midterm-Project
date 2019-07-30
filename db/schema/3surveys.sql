DROP TABLE IF EXISTS surveys CASCADE;

CREATE TABLE surveys (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  /* needs to be a radnomly generated string */
  admin_code VARCHAR(255) NOT NULL,
  /* needs to be a radnomly generated string */
  respondent_code VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL/* , */
  /* end_date DATE NOT NULL, //stretch  */
  /* start_date DATE NOT NULL,  //stretch */
);
