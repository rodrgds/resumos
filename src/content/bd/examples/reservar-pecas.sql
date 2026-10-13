CREATE TRIGGER ValidarUso
BEFORE INSERT ON Uso
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'Peca incompativel')
  WHERE NOT EXISTS (
    SELECT 1 FROM Compativel
    WHERE peca = NEW.peca AND modelo = NEW.modelo
  );
  SELECT RAISE(ABORT, 'Stock insuficiente')
  WHERE NEW.qtd > (SELECT stock FROM Peca WHERE id = NEW.peca);
END;
CREATE TRIGGER DebitarUso
AFTER INSERT ON Uso
FOR EACH ROW
BEGIN
  UPDATE Peca SET stock = stock - NEW.qtd WHERE id = NEW.peca;
END;
INSERT INTO Uso VALUES (100,1,10,2);
SELECT id, stock FROM Peca ORDER BY id;
SELECT * FROM Uso ORDER BY id;
