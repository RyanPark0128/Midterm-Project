DROP TABLE IF EXISTS options CASCADE;

CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
  choice TEXT,
  description TEXT,
  total_rank SMALLINT NOT NULL
);
