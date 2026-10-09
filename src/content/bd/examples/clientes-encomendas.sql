SELECT c.id, c.nome, COUNT(e.id) AS encomendas
FROM Cliente AS c
LEFT JOIN Encomenda AS e ON e.idCliente = c.id
GROUP BY c.id, c.nome
ORDER BY c.id;
