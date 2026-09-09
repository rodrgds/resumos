---
title: Força bruta
description: Enumerar todas as soluções, medir o custo exponencial e saber quando ele ainda é aceitável.
section: conteudo
order: 2
---

A força bruta é a técnica mais honesta que existe: gera todas as soluções candidatas, avalia cada uma e fica com a melhor. Não há astúcia nenhuma, e é exatamente por isso que ela é o ponto de partida. Dá-te sempre uma solução correta de referência, e o seu custo exponencial diz-te quanto precisas de ser mais esperto.

## Quando usar

Usa força bruta quando o espaço de soluções é pequeno (dezenas de casos, não milhões), quando precisas de uma solução de referência para testar um algoritmo mais esperto, ou quando o problema é tão irregular que nenhuma estrutura o simplifica. O padrão é sempre o mesmo: um contador ou uma recursão que percorre todas as combinações, um teste de validade e um registo do melhor valor visto.

O custo segue da contagem: $n$ decisões binárias (levo ou não levo, ponho ou não ponho) dão $2^n$ candidatos. Cada bit a mais na entrada duplica o tempo. Com $n = 20$ são cerca de um milhão de candidatos, ainda confortável; com $n = 50$ são $10^{15}$, impossível. Esta parede é o motivo de existirem as outras sete páginas da cadeira.

## Exemplo: mochila 0-1 com 4 objetos

Tens uma mochila com capacidade 7 e quatro objetos:

| Objeto | Peso | Valor |
| ------ | ---- | ----- |
| A      | 2    | 3     |
| B      | 3    | 4     |
| C      | 4    | 5     |
| D      | 5    | 8     |

Há $2^4 = 16$ subconjuntos. A enumeração completa, descartando os que passam da capacidade, dá estes totais (peso, valor): vazio (0, 0); A (2, 3); B (3, 4); C (4, 5); D (5, 8); AB (5, 7); AC (6, 8); AD (7, 11); BC (7, 9); os restantes excedem a capacidade. O melhor é **AD, valor 11 com peso 7**.

Repara em dois factos. Primeiro, o ótimo não é óbvio à partida: D sozinho vale 8 mas a combinação AD vale 11, e BC enche a mochila com um valor pior. Segundo, o trabalho cresce depressa: com 4 objetos avaliaste 16 candidatos, com 10 seriam 1024, com 30 seriam mil milhões. Guarda este exemplo, porque a [programação dinâmica](/cadeiras/da/programacao-dinamica/) resolve a mesma mochila sem enumerar tudo, e o [retrocesso com poda](/cadeiras/da/retrocesso-ramificacao/) corta ramos inteiros desta mesma árvore de subconjuntos.

:::tip[Como cai em teste]
"Enumera" não quer dizer "adivinha": escreve os candidatos por ordem sistemática (binário de 0000 a 1111, por exemplo) e risca os inválidos. Uma tabela como a de cima mostra o método e evita que te percas a meio.
:::
