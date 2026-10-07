CREATE TABLE sessoes (
    id INTEGER PRIMARY KEY,
    evento_id INTEGER NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    preco NUMERIC(8,2) NOT NULL
);
INSERT INTO sessoes
SELECT n, n % 100,
       TIMESTAMP '2026-11-01' + (n % 90) * INTERVAL '1 day',
       12.50
FROM generate_series(1, 10000) AS n;
ANALYZE sessoes;
