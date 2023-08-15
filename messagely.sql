\echo 'Delete and recreate messagely db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE messagely;
CREATE DATABASE messagely;
\connect messagely

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  join_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_login_at TIMESTAMP WITH TIME ZONE);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  from_username TEXT NOT NULL REFERENCES users,
  to_username TEXT NOT NULL REFERENCES users,
  body TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE);

-- INSERT INTO users
-- VALUES ('user_one', 'password1', 'firstName1', 'lastName1', '0000000000', CURRENT_TIMESTAMP),
--        ('user_two', 'password1', 'firstName2', 'lastName2', '0000000000', CURRENT_TIMESTAMP),
--        ('user_three', 'password1', 'firstName3', 'lastName3', '0000000000', CURRENT_TIMESTAMP);

-- INSERT INTO messages (from_username, to_username, body, sent_at)
-- VALUES ('user_one', 'user_two', 'BODY_TEXT', CURRENT_TIMESTAMP),
--        ('user_one', 'user_three', 'BODY_TEXT', CURRENT_TIMESTAMP),
--        ('user_two', 'user_one', 'BODY_TEXT', CURRENT_TIMESTAMP),
--        ('user_two', 'user_three', 'BODY_TEXT', CURRENT_TIMESTAMP);


\echo 'Delete and recreate messagely_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE messagely_test;
CREATE DATABASE messagely_test;
\connect messagely_test

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  join_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_login_at TIMESTAMP WITH TIME ZONE);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  from_username TEXT NOT NULL REFERENCES users,
  to_username TEXT NOT NULL REFERENCES users,
  body TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE);


-- INSERT INTO users
-- VALUES ('user_one', 'password1', 'firstName1', 'lastName1', '0000000000', CURRENT_TIMESTAMP),
--        ('user_two', 'password1', 'firstName2', 'lastName2', '0000000000', CURRENT_TIMESTAMP),
--        ('user_three', 'password1', 'firstName3', 'lastName3', '0000000000', CURRENT_TIMESTAMP);

-- INSERT INTO messages (from_username, to_username, body, sent_at)
-- VALUES ('user_one', 'user_two', 'BODY_TEXT', CURRENT_TIMESTAMP),
--        ('user_one', 'user_three', 'BODY_TEXT', CURRENT_TIMESTAMP),
--        ('user_two', 'user_one', 'BODY_TEXT', CURRENT_TIMESTAMP),
--        ('user_two', 'user_three', 'BODY_TEXT', CURRENT_TIMESTAMP);



