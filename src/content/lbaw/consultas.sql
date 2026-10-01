CREATE TABLE sessoes(id INTEGER PRIMARY KEY);
CREATE TABLE bilhetes(id INTEGER PRIMARY KEY,sessao_id INTEGER,estado TEXT);
INSERT INTO sessoes VALUES(1),(2),(3);
INSERT INTO bilhetes VALUES(10,1,'pago'),(11,1,'cancelado'),(12,3,'cancelado');
SELECT s.id,COUNT(b.id) AS pagos
FROM sessoes s LEFT JOIN bilhetes b
ON b.sessao_id=s.id AND b.estado='pago'
GROUP BY s.id ORDER BY s.id;
SELECT (SELECT COUNT(*) FROM (SELECT 2 WHERE 2 NOT IN (1,NULL))) AS not_in,
       (SELECT COUNT(*) FROM (SELECT 2 WHERE NOT EXISTS
         (SELECT 1 FROM bilhetes WHERE sessao_id=2))) AS not_exists;
