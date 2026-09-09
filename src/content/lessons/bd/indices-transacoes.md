---
title: Índices e transações
description: Quando indexar, ACID, concorrência e rollback explicado.
section: conteudo
order: 8
---

Duas perguntas fecham a gestão da base de dados: como responder depressa quando as tabelas crescem, e como garantir que operações a meio não deixam a loja num estado impossível. A resposta à primeira é o **índice** (_index_); à segunda, a **transação** (_transaction_).

## Índices: quando e qual

Sem índice, procurar as encomendas da Ana percorre a tabela `Encomenda` toda. Um índice na estrangeira cria uma estrutura de pesquisa por esse valor:

```sql
CREATE INDEX idx_encomenda_cliente ON Encomenda(idCliente);
```

Agora "encomendas do cliente 1" salta direto às linhas 100 e 101. A regra de escolha: indexa colunas que aparecem em condições de igualdade e junções frequentes, tipicamente chaves estrangeiras, e evita indexar tudo, porque cada índice atrasa escritas e ocupa espaço. A chave primária já traz índice próprio, por isso `CREATE INDEX` em `id` seria redundante. Perante "que índice crias para esta consulta?", procura a coluna do `WHERE` ou do `ON` com mais repetições de pesquisa e menos escritas.

## Transações e ACID

Uma venda é várias escritas que só fazem sentido juntas: inserir a encomenda, inserir as linhas e baixar o stock. Se o programa avariar a meio, a loja fica com encomenda sem stock abatido. A **transação** embrulha as escritas num bloco atómico com quatro propriedades, **ACID**: atomicidade (tudo ou nada), consistência (de estado válido em estado válido), isolamento (transações concorrentes não se veem a meio) e durabilidade (o confirmado sobrevive a falhas).

```sql
BEGIN;
INSERT INTO Encomenda VALUES (103, '2026-01-08', 2);
INSERT INTO Item VALUES (103, 12, 1);
UPDATE Produto SET stock = stock - 1 WHERE id = 12;
ROLLBACK;
```

O `ROLLBACK` anula tudo: a encomenda 103 desaparece e o stock do Monitor volta a 5, como se nada tivesse corrido. Troca por `COMMIT` e as três escritas tornam-se permanentes de uma vez. A concorrência entra aqui: dois caixas a vender o último Monitor ao mesmo tempo são duas transações sobre o mesmo `stock`, e o isolamento mais as restrições garante que uma delas falha em vez de venderem o mesmo exemplar duas vezes.

:::tip[Como pensar em teste]
Perante um cenário de falha a meio ("o que fica guardado?"), conta as escritas dentro da transação: sem `COMMIT`, nada fica; com `COMMIT` antes da falha, fica tudo até aí. E perante "falta atomicidade", procura operações compostas sem `BEGIN`/`COMMIT`, que deixam estados intermédios visíveis.
:::
