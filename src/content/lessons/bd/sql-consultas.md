---
title: Consultas SQL
description: SELECT, junções, agregação e subconsultas sobre a loja.
section: conteudo
order: 6
---

A DML de leitura é o `SELECT`, e a sua estrutura segue a álgebra relacional: filtra linhas (`WHERE`), combina tabelas (`JOIN`), agrupa (`GROUP BY`), filtra grupos (`HAVING`) e projeta colunas (`SELECT`). A ordem de escrita é fixa, `SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY`, mesmo quando só usas metade das cláusulas.

## Filtrar e ordenar

"Produtos com preço acima de 30, do mais caro ao mais barato":

```sql
SELECT nome, preco FROM Produto
WHERE preco > 30
ORDER BY preco DESC;
```

Resultado: Monitor 180.0, Teclado 45.0. O `WHERE` é a seleção $\sigma$, a lista do `SELECT` é a projeção $\pi$. Repara que o Rato ficou de fora pelo filtro e a ordem é decrescente pelo `DESC`.

## Juntar e agregar

"Total gasto por cada cliente, incluindo quem nunca comprou":

```sql
SELECT Cliente.nome, COALESCE(SUM(Item.qtd * Produto.preco), 0) AS total
FROM Cliente
LEFT JOIN Encomenda ON Encomenda.idCliente = Cliente.id
LEFT JOIN Item ON Item.idEncomenda = Encomenda.id
LEFT JOIN Produto ON Produto.id = Item.idProduto
GROUP BY Cliente.nome
ORDER BY total DESC;
```

O `LEFT JOIN` mantém os clientes sem encomendas, onde a soma seria nula e o `COALESCE` a converte em 0. Contas: Ana, 2 Teclados (90) mais 1 Rato (25) mais 1 Monitor (180), total 295; Rui, 3 Ratos, total 75; Mia, sem linhas, total 0. Resultado: Ana 295.0, Rui 75.0, Mia 0.0.

Duas armadilhas habituais: agregar sem `GROUP BY` quando há colunas soltas, e filtrar grupos com `WHERE` em vez de `HAVING`. `WHERE` filtra linhas antes de agrupar; `HAVING` filtra grupos depois. "Clientes com total acima de 100" acrescenta `HAVING total > 100` e devolve só a Ana.

## Subconsultas

"Clientes que compraram o Monitor", com uma subconsulta que primeiro descobre quem:

```sql
SELECT nome FROM Cliente
WHERE id IN (
  SELECT Encomenda.idCliente FROM Encomenda
  JOIN Item ON Item.idEncomenda = Encomenda.id
  JOIN Produto ON Produto.id = Item.idProduto
  WHERE Produto.nome = 'Monitor'
);
```

A consulta interior devolve o cliente 1 (a encomenda 101 leva o produto 12) e a exterior traduz para `Ana`. Sempre que a pergunta tem um "os X que ..." com condição noutra tabela, uma subconsulta com `IN` é a formulação direta.

:::warning[O erro mais comum]
Juntar sem condição de junção e obter o produto cartesiano: cada cliente repetido por cada encomenda de todos. Se o resultado tem linhas a mais e valores absurdos, falta o `ON` ou ele compara as colunas erradas. Confere sempre que cada `JOIN` tem o seu `ON` com PK de um lado e FK do outro.
:::
