---
title: Vistas, gatilhos e controlo de acessos
description: CREATE VIEW, CREATE TRIGGER e GRANT e REVOKE com testes.
section: conteudo
order: 7
---

Tabelas guardam factos; o resto da gestão faz-se com objetos que vivem por cima delas. Uma **vista** (_view_) é uma pergunta guardada com nome, um **gatilho** (_trigger_) é código que dispara sozinho em cada escrita, e o **controlo de acessos** decide que utilizadores podem fazer o quê.

## Vistas: perguntas com nome

"Total gasto por cada cliente" da página de consultas merece nome próprio se for pedida todos os dias:

```sql
CREATE VIEW TotalPorCliente AS
SELECT Cliente.nome AS nome, COALESCE(SUM(Item.qtd * Produto.preco), 0) AS total
FROM Cliente
LEFT JOIN Encomenda ON Encomenda.idCliente = Cliente.id
LEFT JOIN Item ON Item.idEncomenda = Encomenda.id
LEFT JOIN Produto ON Produto.id = Item.idProduto
GROUP BY Cliente.nome;
```

Depois usa-se como tabela: `SELECT * FROM TotalPorCliente WHERE total > 100;` devolve só a Ana com 295. A vista não duplica dados, recalcula em cada uso, por isso reflete sempre as vendas atuais. Serve para simplificar (`SELECT` curto em vez da junção de quatro tabelas) e para segurança (mostrar totais sem expor linhas individuais).

## Gatilhos: regras que se cumprem sozinhas

O `CHECK (stock >= 0)` impede stock negativo em escritas diretas, mas uma venda deve _decrementar_ o stock e falhar se não houver. Um gatilho corre antes de cada atualização e aborta a operação proibida:

```sql
CREATE TRIGGER impede_stock_negativo
BEFORE UPDATE OF stock ON Produto
FOR EACH ROW
WHEN NEW.stock < 0
BEGIN
  SELECT RAISE(ABORT, 'Stock nao pode ser negativo');
END;
```

Teste: `UPDATE Produto SET stock = stock - 1 WHERE id = 12;` passa (5 para 4). Mas `UPDATE Produto SET stock = stock - 10 WHERE id = 12;` aborta com a mensagem do gatilho e o stock continua 4, porque a transação da instrução é desfeita. Repara na diferença para o `CHECK`: o gatilho reage ao _evento_ (a tentativa de atualização) e pode olhar para os valores antigos (`OLD`) e novos (`NEW`).

## Controlo de acessos

Em SQL padrão, o dono dá e tira permissões por utilizador e por objeto:

```sql
GRANT SELECT ON TotalPorCliente TO funcionario;
REVOKE INSERT ON Produto FROM funcionario;
```

O funcionário consulta os totais mas não altera produtos. Atenção a um detalhe prático: o SQLite, o software da cadeira, não tem utilizadores nem implementa `GRANT` e `REVOKE`; aqui o controlo de acessos estuda-se como linguagem padrão, a usar num SGBD com contas, como o PostgreSQL. No teste, responde o SQL padrão; no projeto em SQLite, a proteção equivalente faz-se com vistas e gatilhos.
