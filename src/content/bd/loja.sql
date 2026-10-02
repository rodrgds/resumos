PRAGMA foreign_keys = ON;
CREATE TABLE Cliente (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE
);
CREATE TABLE Produto (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  precoCentimos INTEGER NOT NULL CHECK (precoCentimos >= 0),
  stock INTEGER NOT NULL CHECK (stock >= 0)
);
CREATE TABLE Encomenda (
  id INTEGER PRIMARY KEY,
  data TEXT NOT NULL,
  idCliente INTEGER NOT NULL REFERENCES Cliente(id)
);
CREATE TABLE Item (
  idEncomenda INTEGER NOT NULL REFERENCES Encomenda(id) ON DELETE CASCADE,
  idProduto INTEGER NOT NULL REFERENCES Produto(id),
  qtd INTEGER NOT NULL CHECK (qtd > 0),
  precoUnitario INTEGER NOT NULL CHECK (precoUnitario >= 0),
  PRIMARY KEY (idEncomenda, idProduto)
);
INSERT INTO Cliente VALUES
  (1, 'Ana', 'ana@example.test'),
  (2, 'Rui', NULL),
  (3, 'Mia', NULL);
INSERT INTO Produto VALUES
  (10, 'Teclado', 4500, 20),
  (11, 'Rato', 2500, 50),
  (12, 'Monitor', 18000, 5);
INSERT INTO Encomenda VALUES
  (100, '2026-01-05', 1),
  (101, '2026-01-06', 1),
  (102, '2026-01-06', 2);
INSERT INTO Item VALUES
  (100, 10, 2, 4500),
  (100, 11, 1, 2500),
  (101, 12, 1, 18000),
  (102, 11, 3, 2500);
