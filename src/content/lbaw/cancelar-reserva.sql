WITH cancelado AS (
 UPDATE bilhetes SET estado='cancelado'
 WHERE id=1043 AND utilizador_id=7 AND estado='reservado'
 RETURNING sessao_id
)
UPDATE sessoes s SET livres=s.livres+1
FROM cancelado c WHERE s.id=c.sessao_id
RETURNING s.id,s.livres;
SELECT id,estado FROM bilhetes ORDER BY id;
