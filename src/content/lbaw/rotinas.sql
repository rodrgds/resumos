CREATE FUNCTION preco_com_taxa(p numeric) RETURNS numeric
LANGUAGE SQL IMMUTABLE AS $$ SELECT p * 1.23 $$;
SELECT preco_com_taxa(10);

CREATE TABLE mensagens_exemplo (texto text);
CREATE PROCEDURE registar_mensagem(p_texto text)
LANGUAGE SQL AS $$ INSERT INTO mensagens_exemplo VALUES (p_texto) $$;
CALL registar_mensagem('confirmado');
SELECT texto FROM mensagens_exemplo;
