CREATE TABLE sessoes (id INTEGER PRIMARY KEY, preco NUMERIC(8,2));
CREATE TABLE historico_preco (
  sessao_id INTEGER REFERENCES sessoes(id),
  preco_anterior NUMERIC(8,2),
  preco_novo NUMERIC(8,2)
);
INSERT INTO sessoes VALUES (1, 12.50);
