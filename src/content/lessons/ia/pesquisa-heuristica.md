---
title: Pesquisa heurística
description: Heurísticas admissíveis e consistentes, pesquisa gulosa e o algoritmo A* com um exemplo completo.
section: conteudo
order: 3
---

A pesquisa cega expande por ordem geométrica e só encontra o objetivo por exaustão. Uma **heurística** $h(n)$ estima o custo que falta de cada nó $n$ até ao objetivo e permite expandir primeiro o que parece promissor. Quando a estimativa é honesta, a pesquisa encontra o ótimo muito mais depressa. Quando mente por excesso, pode devolver caminhos piores. Esta página mostra a diferença com uma grelha calculada até ao fim.

## O exemplo da grelha

Grelha 4 por 4, início em (0, 0), objetivo em (3, 3), movimentos nas quatro direções com custo 1. Casas bloqueadas: (1, 1), (1, 2) e (2, 1). As casas livres e a heurística de Manhattan $h(r, c) = (3 - r) + (3 - c)$ são:

| Casa  | h   | Casa  | h   | Casa  | h   |
| ----- | --- | ----- | --- | ----- | --- |
| (0,0) | 6   | (0,1) | 5   | (0,2) | 4   |
| (0,3) | 3   | (1,0) | 5   | (1,3) | 2   |
| (2,0) | 4   | (2,2) | 2   | (2,3) | 1   |
| (3,0) | 3   | (3,1) | 2   | (3,2) | 1   |
| (3,3) | 0   |       |     |       |     |

Há dois caminhos ótimos com 6 passos: por cima, (0,0), (0,1), (0,2), (0,3), (1,3), (2,3), (3,3); e por baixo, (0,0), (1,0), (2,0), (3,0), (3,1), (3,2), (3,3). Confirma que nenhum caminho tem 5 passos: são precisas pelo menos 3 descidas e 3 direitas, e os bloqueios não permitem atalhos na diagonal.

## Gulosa: rápida e sem garantias

A pesquisa **gulosa** expande sempre o nó com menor $h$, ignorando o custo já pago. Do início, empata entre (0,1) e (1,0), ambos com $h = 5$. Supõe que escolhe (0,1), depois (0,2), (0,3), (1,3), (2,3) e o objetivo, sempre a descer o $h$. Aqui acerta no ótimo por sorte do desempate.

Não confies na sorte. A gulosa segue o $h$ como um gradiente e fica presa em becos: se a casa (0,3) estivesse bloqueada, ela descia até (0,2), via o $h$ subir para trás e hesitava, podendo explorar muito antes de recuar. Pior, a gulosa não é ótima em geral: nada a impede de devolver um caminho comprido quando um curto existe, porque nunca compara o custo acumulado. É útil quando precisas de uma solução rápida e o ótimo não importa.

## A*: o melhor dos dois

O **A\*** ordena os nós por $f(n) = g(n) + h(n)$, onde $g(n)$ é o custo real já pago do início até $n$. Junta o cuidado do custo uniforme com a direção da heurística. Segue os primeiros passos na grelha, com a fronteira entre parênteses:

1. Fronteira {(0,0): g 0, h 6, f 6}. Expande (0,0): gera (0,1) com f 6 e (1,0) com f 6.
2. Expande (0,1) com f 6: gera (0,2) com g 2, h 4, f 6.
3. Expande (1,0) com f 6: gera (2,0) com g 2, h 4, f 6.
4. Expande (0,2) com f 6: gera (0,3) com g 3, h 3, f 6.
5. Expande (2,0) com f 6: gera (3,0) com g 3, h 3, f 6.
6. Expande (0,3) com f 6: gera (1,3) com g 4, h 2, f 6.

Repara no padrão: todos os nós expandidos têm f 6, que é o custo ótimo. O A* continua a expandir a fronteira com f 6, (3,0), (1,3), (3,1), (2,3), até gerar o objetivo (3,3) com g 6, h 0, f 6. Quando o objetivo sai da fronteira com o menor f, nenhum outro caminho pode ser melhor, porque todos os restantes têm f maior ou igual. É este o argumento de otimalidade, e ele depende da honestidade da heurística.

## Admissível e consistente

A heurística é **admissível** quando nunca sobrestima: $h(n) \le h^*(n)$ para todo o nó, onde $h^*$ é o custo real mínimo. A Manhattan é admissível em grelhas com 4 direções porque cada passo muda a distância de Manhattan no máximo 1, por isso 6 passos no mínimo exigem $h \le 6$ no início, e de facto $h = 6$.

A heurística é **consistente** (ou monótona) quando $h(n) \le custo(n, n') + h(n')$ para cada aresta, isto é, a estimativa nunca cai mais depressa que o custo real. Verifica na aresta (0,1) para (0,2): $5 \le 1 + 4$. Consistência implica admissibilidade e ainda garante que o A* nunca precisa de reabrir nós já expandidos. Na prática dos testes, mostra a desigualdade numa aresta e conclui; para provar admissibilidade de Manhattan, usa o argumento do parágrafo anterior.

:::tip[Como cai em teste]
O enunciado dá-te a grelha, a heurística e pede a ordem de expansão do A* até ao objetivo, ou pergunta se a heurística é admissível. Faz uma tabela com colunas de nó, g, h e f, e expande sempre o menor f, desempatando como o enunciado disser. Para a admissibilidade, compara h com o custo real mínimo em cada nó suspeito, normalmente o inicial.
:::

## Porque é que isto importa

Sem heurística, a largura expande tudo até à profundidade do objetivo. Com uma boa heurística, o A* expande sobretudo nós com $f$ próximo do ótimo e ignora o resto. É por isso que problemas intratáveis na prática, como os da página de [complexidade](/cadeiras/tc/complexidade/), se resolvem todos os dias com heurísticas: abdicas da garantia barata da exaustão e compras velocidade com uma estimativa honesta.
