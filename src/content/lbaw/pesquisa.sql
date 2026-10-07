CREATE TABLE artigos (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo text NOT NULL,
  texto text NOT NULL,
  pesquisa tsvector GENERATED ALWAYS AS
    (to_tsvector('portuguese', titulo || ' ' || texto)) STORED
);
CREATE INDEX artigos_pesquisa ON artigos USING GIN(pesquisa);

INSERT INTO artigos (titulo, texto) VALUES
  ('Redes seguras', 'Proteger as redes com autenticação.'),
  ('Segurança em redes', 'Configurar redes seguras.'),
  ('Bases de dados', 'Modelar tabelas e escrever consultas.');

SELECT id, titulo,
       ts_rank(pesquisa, plainto_tsquery('portuguese','redes seguras')) AS relevancia
FROM artigos
WHERE pesquisa @@ plainto_tsquery('portuguese','redes seguras')
ORDER BY relevancia DESC, id;
