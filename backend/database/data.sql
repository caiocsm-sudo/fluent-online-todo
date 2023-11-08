CREATE TABLE todo (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  title VARCHAR(30),
  description VARCHAR(200),
  progress VARCHAR(255),
  completed BOOLEAN,
  user_email VARCHAR(255),
  date VARCHAR(255)
);

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
