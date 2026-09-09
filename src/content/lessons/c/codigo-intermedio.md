---
title: Código intermédio e blocos básicos
description: Código de três endereços, tradução de um while com condição composta e partição em blocos com o grafo de fluxo.
section: conteudo
order: 6
---

Entre a árvore sintática e as instruções da máquina há um nível intermédio: uma representação simples, explícita e independente da máquina alvo, onde as otimizações e a geração de código trabalham com conforto. A forma clássica é o **código de três endereços**: cada instrução tem no máximo um operador e dois operandos de leitura, com o resultado num temporário.

## Traduzir expressões e controlo

A tradução desfaz as expressões aninhadas em passos elementares com temporários frescos (`t1`, `t2`, ...). O controlo traduz-se com **rótulos** e **saltos**: cada construção gera o teste, os saltos para os ramos e os rótulos de junção, com os nomes gerados de forma única.

## Exemplo: `while` com condição composta

```java
while (a < b && c != 0) {
  a = a + 1;
}
```

Tradução para três endereços (condição composta partida em testes encadeados, com curto-circuito: se `a < b` for falso, salta logo para fora sem avaliar o resto):

```
L_topo:
  t1 = a < b
  if_false t1 goto L_fora
  t2 = c != 0
  if_false t2 goto L_fora
  t3 = a + 1
  a = t3
  goto L_topo
L_fora:
```

Lê o fluxo: testa a primeira condição e sai se falhar; testa a segunda e sai se falhar; executa o corpo; volta ao topo. Os temporários `t1` e `t2` guardam resultados booleanos intermédios que na árvore estavam escondidos dentro da condição.

## Blocos básicos e grafo de fluxo

Um **bloco básico** é uma sequência de instruções que se executa sempre do início ao fim: entra-se só pela primeira instrução e sai-se só pela última. Para partir o código em blocos, marcam-se os **líderes**: a primeira instrução, cada destino de salto e cada instrução logo a seguir a um salto. Cada bloco vai de um líder até antes do líder seguinte.

No exemplo, os líderes são `L_topo` (primeira e destino do `goto`), as duas instruções `if_false` seguintes? Não: aplica a regra com rigor. Instruções numeradas: 1 `t1 = a < b`, 2 `if_false t1 goto L_fora`, 3 `t2 = c != 0`, 4 `if_false t2 goto L_fora`, 5 `t3 = a + 1`, 6 `a = t3`, 7 `goto L_topo`, 8 `L_fora:`. Líderes: 1 (primeira), 3 (segue-se a um salto condicional), 5 (segue-se a um salto condicional), 8 (destino de salto). Blocos: B1 = {1, 2}, B2 = {3, 4}, B3 = {5, 6, 7}, B4 = {8}. O **grafo de fluxo** liga-os pelas arestas possíveis: B1 para B2 (condição verdadeira) e para B4 (saída), B2 para B3 e para B4, B3 de volta para B1.

:::tip[Como partir sem errar]
Sublinha primeiro todos os rótulos destino e todos os saltos. Cada líder é mecânico: primeira linha, destino, depois de salto. Só depois agrupa. O erro típico é pôr um destino de salto a meio de um bloco.
:::

## Para levar para a próxima página

O programa está em blocos simples e explícitos. A [geração de código](geracao-codigo/) escolhe instruções reais para cada bloco e decide que valores vivem em registos.
