CREATE DATABASE tatooine;

USE tatooine;

CREATE TABLE userAccount
(
  ID int NOT NULL
  AUTO_INCREMENT,
    username varchar
  (255) NOT NULL,
    profilePicture varchar
  (255),
    memberSince datetime,
    PRIMARY KEY
  (ID)
);

  CREATE TABLE attraction
  (
    ID int NOT NULL
    AUTO_INCREMENT,
    name varchar
    (255) NOT NULL,
    description varchar
    (500),
    phone varchar
    (30),
    email varchar
    (255),
    website varchar
    (255),
    suggestedDuration int,
    featuredIn varchar
    (255),
    address1 varchar
    (255),
    address2 varchar
    (255),
    city varchar
    (255),
    state varchar
    (255),
    country varchar
    (255),
    latitude varchar
    (255),
    longitude varchar
    (255),
    category varchar
    (255),
    bio varchar
    (500),
    image varchar
    (255),
    PRIMARY KEY
    (ID)
);

    CREATE TABLE question
    (
      ID int NOT NULL
      AUTO_INCREMENT,
      attractionId int,
    question varchar
      (500) NOT NULL,
    questionDate datetime,
    userId int,
    PRIMARY KEY
      (ID)
);

      CREATE TABLE answer
      (
        ID int NOT NULL
        AUTO_INCREMENT,
    questionID int,
answer varchar
        (500),
    answerDate datetime,
    userId int,
    PRIMARY KEY
        (ID)
);

        ALTER TABLE answer ADD FOREIGN KEY (questionID) REFERENCES question(ID);

        ALTER TABLE question ADD FOREIGN KEY (userID) REFERENCES userAccount(ID);

        ALTER TABLE question ADD FOREIGN KEY (attractionID) REFERENCES attraction(ID);

        ALTER TABLE answer ADD FOREIGN KEY (userID) REFERENCES userAccount(ID);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
