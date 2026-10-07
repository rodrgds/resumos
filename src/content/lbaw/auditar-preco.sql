BEGIN;
CREATE FUNCTION auditar_preco() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.preco IS DISTINCT FROM OLD.preco THEN
    INSERT INTO historico_preco(sessao_id,preco_anterior,preco_novo)
    VALUES (NEW.id,OLD.preco,NEW.preco);
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER preco_alterado
AFTER UPDATE OF preco ON sessoes
FOR EACH ROW EXECUTE FUNCTION auditar_preco();

UPDATE sessoes SET preco = 15.00 WHERE id = 1;
SELECT sessao_id, preco_anterior, preco_novo FROM historico_preco;
COMMIT;
BEGIN;
UPDATE sessoes SET preco = 18.00 WHERE id = 1;
ROLLBACK;
SELECT preco FROM sessoes WHERE id = 1;
SELECT COUNT(*) AS alteracoes FROM historico_preco;
