CREATE TABLE sessoes(id integer PRIMARY KEY);
CREATE TABLE bilhetes(id integer PRIMARY KEY, sessao_id integer REFERENCES sessoes(id), preco numeric(8,2) NOT NULL, estado text NOT NULL);
CREATE TABLE etiquetas(sessao_id integer REFERENCES sessoes(id), nome text NOT NULL, PRIMARY KEY(sessao_id,nome));
INSERT INTO sessoes VALUES (12),(13),(14);
INSERT INTO bilhetes VALUES (1,12,20,'pago'),(2,12,20,'pago'),(3,14,8,'pago');
INSERT INTO etiquetas VALUES (12,'fado'),(12,'porto'),(12,'noite');
SELECT s.id, COUNT(b.id) AS pagos, SUM(b.preco) AS receita
FROM sessoes s LEFT JOIN bilhetes b ON b.sessao_id=s.id AND b.estado='pago'
LEFT JOIN etiquetas e ON e.sessao_id=s.id
GROUP BY s.id ORDER BY s.id;
WITH pagos AS (
  SELECT sessao_id, COUNT(*) AS quantidade, SUM(preco) AS receita
  FROM bilhetes WHERE estado='pago' GROUP BY sessao_id
), tags AS (
  SELECT sessao_id, COUNT(*) AS quantidade FROM etiquetas GROUP BY sessao_id
)
SELECT s.id, COALESCE(p.quantidade,0) AS pagos,
       COALESCE(p.receita,0) AS receita, COALESCE(t.quantidade,0) AS etiquetas
FROM sessoes s LEFT JOIN pagos p ON p.sessao_id=s.id
LEFT JOIN tags t ON t.sessao_id=s.id ORDER BY s.id;
