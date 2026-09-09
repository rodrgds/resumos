---
title: SQL e índices em PostgreSQL
description: Interrogações de leitura e escrita sobre o esquema da Loja de Bilhetes e índices para as pesquisas frequentes.
section: conteudo
order: 4
---

Com o [esquema criado](esquema-relacional/), a aplicação precisa de ler e escrever dados. Esta página escreve as três interrogações centrais da Loja de Bilhetes e mostra como um índice transforma a pesquisa mais frequente.

## Três interrogações sobre a loja

Sessões futuras de um evento, com lugares ainda por vender. A lotação menos os bilhetes não cancelados dá os lugares livres:

```sql
SELECT s.id, s.data_hora, s.preco,
       s.lotacao - COUNT(b.id) AS livres
FROM sessoes AS s
LEFT JOIN bilhetes AS b
  ON b.sessao_id = s.id AND b.estado <> 'cancelado'
WHERE s.evento_id = 3 AND s.data_hora > NOW()
GROUP BY s.id;
```

O `LEFT JOIN` com a condição do estado dentro do `ON` é o ponto delicado: bilhetes cancelados não ocupam lugar, mas a sessão continua a aparecer mesmo sem nenhum bilhete vendido. Se pusesses `b.estado <> 'cancelado'` no `WHERE`, as sessões sem bilhetes desapareciam da lista, porque `NULL <> 'cancelado'` não é verdadeiro.

Registar a compra de um bilhete:

```sql
INSERT INTO bilhetes (utilizador_id, sessao_id, codigo, estado)
VALUES (7, 12, 'B-1042', 'reservado')
RETURNING id;
```

O `RETURNING id` devolve o identificador criado sem uma segunda interrogação. Guarda esse valor: é ele que a página de confirmação mostra e que o pagamento usa a seguir.

Histórico de compras de um utilizador, do mais recente para o mais antigo:

```sql
SELECT e.titulo, s.data_hora, b.codigo, b.estado
FROM bilhetes AS b
JOIN sessoes AS s ON s.id = b.sessao_id
JOIN eventos AS e ON e.id = s.evento_id
WHERE b.utilizador_id = 7
ORDER BY s.data_hora DESC;
```

Três tabelas ligadas pelas chaves estrangeiras do esquema. Cada `JOIN` segue uma associação do modelo, o que confirma que a conversão foi bem feita: se precisasses de uma coluna calculada à mão para ligar duas tabelas, faltava uma chave estrangeira.

## Ler o plano com EXPLAIN

Antes de otimizar, vê como o PostgreSQL executa a pesquisa de eventos por data:

```sql
EXPLAIN SELECT id, titulo FROM eventos
WHERE categoria = 'musica';
```

Sem índice, o plano mostra um varrimento sequencial: o motor lê todas as linhas da tabela e filtra. Com mil eventos isto é instantâneo, mas é o padrão que progride mal. A pesquisa por data das sessões é a interrogação mais frequente da loja, por isso merece um índice:

```sql
CREATE INDEX idx_sessoes_data ON sessoes (data_hora);
```

Repete o `EXPLAIN` numa pesquisa por intervalo de datas e o plano passa a pesquisa por índice: o motor salta diretamente para as linhas do intervalo em vez de varrer a tabela. O ganho aparece quando a tabela cresce e a condição seleciona poucas linhas.

:::warning[Índices não são gratuitos]
Cada índice acelera leituras e atrasa escritas, porque cada `INSERT` e `UPDATE` tem de atualizar todos os índices da tabela. Indexa as colunas das pesquisas frequentes, como datas e chaves estrangeiras usadas em junções, e não as colunas que quase nunca filtras. Um índice por coluna "para o caso de ser preciso" deixa a escrita mais lenta sem leituras que o paguem.
:::
