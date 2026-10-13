PRAGMA foreign_keys = ON;
CREATE TABLE Distrito(id INTEGER PRIMARY KEY, nome TEXT NOT NULL);
CREATE TABLE Municipio(id INTEGER PRIMARY KEY, idDistrito INTEGER NOT NULL REFERENCES Distrito(id));
CREATE TABLE Freguesia(id INTEGER PRIMARY KEY, idMunicipio INTEGER NOT NULL REFERENCES Municipio(id));
CREATE TABLE Voto(idFreguesia INTEGER NOT NULL REFERENCES Freguesia(id),
  lista TEXT NOT NULL, votos INTEGER CHECK (votos >= 0),
  PRIMARY KEY(idFreguesia, lista));
INSERT INTO Distrito VALUES (1, 'Norte'), (2, 'Sul'), (3, 'Este');
INSERT INTO Municipio VALUES (10,1), (11,1), (20,2), (30,3);
INSERT INTO Freguesia VALUES (100,10), (101,10), (110,11), (200,20), (300,30);
INSERT INTO Voto VALUES
  (100,'A',6), (100,'B',4), (101,'A',3), (101,'B',4),
  (110,'A',1), (110,'B',0), (200,'A',4), (200,'B',4),
  (300,'A',NULL), (300,'B',2);
