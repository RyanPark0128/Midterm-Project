DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS surveys;
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS options;

CREATE TABLE admins (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL/* , */
  /* handle VARCHAR(255) NOT NULL  //stretch */
);

CREATE TABLE surveys (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,
  /* needs to be a radnomly generated string */
  admin_code VARCHAR(255) NOT NULL, 
  /* needs to be a radnomly generated string */
  user_code VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL/* , */
  /* end_date DATE NOT NULL, //stretch  */
  /* start_date DATE NOT NULL,  //stretch */
)
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE
)

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
  submission_id INTEGER REFERENCES submissions(id) ON DELETE CASCADE,
  rank SMALLINT NOT NULL /* DEFAULT 0??? */
)

CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
  choice TEXT,
  description text,
  total_rank SMALLINT NOT NULL 
)
