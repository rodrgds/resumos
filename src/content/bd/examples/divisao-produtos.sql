CREATE TABLE Exigido(idProduto INTEGER PRIMARY KEY REFERENCES Produto(id));
INSERT INTO Exigido VALUES (10), (11);
SELECT c.id, c.nome
FROM Cliente AS c
WHERE NOT EXISTS (
SELECT 1 FROM Exigido AS x
WHERE NOT EXISTS (
  SELECT 1 FROM Encomenda AS e
  JOIN Item AS i ON i.idEncomenda = e.id
  WHERE e.idCliente = c.id AND i.idProduto = x.idProduto
)
)
ORDER BY c.id;
