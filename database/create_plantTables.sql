CREATE TABLE PLANT
(
  plantID INT NOT NULL AUTO_INCREMENT,
  plantName VARCHAR(100) NOT NULL,
  requiredCompletions INT NOT NULL,
  imageFolder VARCHAR(100) NOT NULL,
  PRIMARY KEY (plantID)
);

CREATE TABLE CURRENTPLANT
(
  plantID INT NOT NULL,
  userID INT NOT NULL,
  progress INT NOT NULL,
  PRIMARY KEY (userID),
  FOREIGN KEY (plantID) REFERENCES PLANT(plantID),
  FOREIGN KEY (userID) REFERENCES USERS(userID)
);

CREATE TABLE GARDEN
(
  plantID INT NOT NULL,
  userID INT NOT NULL,
  amount INT NOT NULL,
  PRIMARY KEY (plantID, userID),
  FOREIGN KEY (plantID) REFERENCES PLANT(plantID),
  FOREIGN KEY (userID) REFERENCES USERS(userID)
);

INSERT INTO PLANT (plantName, requiredCompletions, imageFolder)
VALUES
('Auringonkukka', 5, 'sunflower'),
('Kaktus', 10, 'cactus'),
('Tulppaani', 15, 'tulip');