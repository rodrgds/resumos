CREATE TABLE AlteracaoStock(
idProduto INTEGER, anterior INTEGER, novo INTEGER
);
CREATE TRIGGER AuditarStock
AFTER UPDATE OF stock ON Produto
FOR EACH ROW WHEN OLD.stock <> NEW.stock
BEGIN
INSERT INTO AlteracaoStock VALUES (NEW.id, OLD.stock, NEW.stock);
END;
UPDATE Produto SET stock = stock - 2 WHERE id = 10;
UPDATE Produto SET stock = stock WHERE id = 10;
SELECT * FROM AlteracaoStock;
