WITH Totais AS (
  SELECT f.idMunicipio, v.lista, SUM(v.votos) AS votos
  FROM Freguesia AS f JOIN Voto AS v ON v.idFreguesia = f.id
  GROUP BY f.idMunicipio, v.lista
  HAVING COUNT(v.votos) = COUNT(*)
)
SELECT d.id, d.nome FROM Distrito AS d
WHERE NOT EXISTS (
  SELECT 1 FROM Municipio AS m
  WHERE m.idDistrito = d.id AND NOT EXISTS (
    SELECT 1 FROM Totais AS a JOIN Totais AS b
      ON b.idMunicipio = a.idMunicipio
    WHERE a.idMunicipio = m.id AND a.lista = 'A' AND b.lista = 'B'
      AND a.votos > b.votos
  )
)
ORDER BY d.id;
