-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS admins CASCADE;
CREATE TABLE admins (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL
);
