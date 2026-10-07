EXPLAIN SELECT id, data_hora, preco
FROM sessoes
WHERE evento_id = 3
  AND data_hora >= TIMESTAMP '2026-12-01'
  AND data_hora < TIMESTAMP '2027-01-01'
ORDER BY data_hora;

CREATE INDEX sessoes_evento_data ON sessoes(evento_id, data_hora);
ANALYZE sessoes;

EXPLAIN SELECT id, data_hora, preco
FROM sessoes
WHERE evento_id = 3
  AND data_hora >= TIMESTAMP '2026-12-01'
  AND data_hora < TIMESTAMP '2027-01-01'
ORDER BY data_hora;
