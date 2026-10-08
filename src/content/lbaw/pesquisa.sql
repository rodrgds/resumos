CREATE TABLE eventos (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo text NOT NULL,
  descricao text,
  pesquisa tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('portuguese', titulo), 'A') ||
    setweight(to_tsvector('portuguese', coalesce(descricao, '')), 'B')
  ) STORED
);
CREATE INDEX eventos_pesquisa ON eventos USING GIN(pesquisa);

INSERT INTO eventos (titulo, descricao) VALUES
  ('Noite de Fado', 'Concerto na sala principal.'),
  ('Encontro de música', 'Uma noite dedicada ao fado.'),
  ('Teatro à tarde', NULL);

SELECT id, titulo,
       ts_rank(pesquisa, plainto_tsquery('portuguese', 'fado')) AS relevancia
FROM eventos
WHERE pesquisa @@ plainto_tsquery('portuguese', 'fado')
ORDER BY relevancia DESC, id;

-- A coluna gerada acompanha a alteração, sem atualização manual do vetor.
UPDATE eventos SET descricao = 'Oficina de fado.' WHERE id = 3;
SELECT id, titulo
FROM eventos
WHERE pesquisa @@ plainto_tsquery('portuguese', 'fado')
ORDER BY id;
