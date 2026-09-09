---
title: Pesquisa não informada
description: Espaço de estados e pesquisa em largura, profundidade, custo uniforme e aprofundamento iterativo.
section: conteudo
order: 2
---

Muitos problemas são labirintos disfarçados: do estado inicial ao objetivo há caminhos, e é preciso encontrar um. A **pesquisa não informada** (ou cega) explora o espaço de estados sem nenhuma pista sobre que direção é promissora. Distingue-se da pesquisa heurística, que usa pistas, mas a maquinaria é a mesma: gerar sucessores, lembrar visitados e escolher a ordem de expansão. A ordem é tudo, porque é ela que decide quanto trabalho se faz até ao objetivo.

## Espaço de estados

Um problema de pesquisa tem: estado inicial, ações possíveis em cada estado, modelo de transição (para onde cada ação leva), teste de objetivo e custo de cada ação. O conjunto de todos os estados alcançáveis forma o **espaço de estados**, e a pesquisa constrói uma **árvore de pesquisa** sobre ele, que pode repetir estados do espaço quando há vários caminhos para o mesmo sítio.

O exemplo desta página é um fragmento do 8-puzzle (tabuleiro 3 por 3 com 8 peças e uma casa vazia, onde cada ação desliza uma peça vizinha para a casa vazia). Parte do estado S, com a casa vazia no centro, e considera os quatro primeiros sucessores e dois níveis abaixo de dois deles:

- S: `1 2 3 / 4 _ 6 / 7 5 8`, vazia no centro.
- A (cima): `1 _ 3 / 4 2 6 / 7 5 8`.
- B (baixo): `1 2 3 / 4 5 6 / 7 _ 8`.
- C (esquerda): `1 2 3 / _ 4 6 / 7 5 8`.
- D (direita): `1 2 3 / 4 6 _ / 7 5 8`.
- A1 (A, esquerda): `_ 1 3 / 4 2 6 / 7 5 8`. A2 (A, direita): `1 3 _ / 4 2 6 / 7 5 8`.
- B1 (B, esquerda): `1 2 3 / 4 5 6 / _ 7 8`. B2 (B, direita): `1 2 3 / 4 5 6 / 7 8 _`, que é o objetivo.

Confirma B2: mover a casa vazia de B para a direita troca-a com o 8, e a última fila fica `7 8 _`, que é a configuração objetivo. O caminho S, B, B2 tem custo 2, uma ação por passo.

## Largura contra profundidade

A pesquisa em **largura** (BFS) expande por níveis: primeiro S, depois A, B, C, D, depois A1, A2, B1, B2. Expande 8 nós até gerar o objetivo (na expansão de B) e devolve o caminho S, B, B2. Com custo uniforme por ação, a largura encontra sempre o caminho mais curto, porque visita todos os estados a distância 1 antes de qualquer estado a distância 2. O preço é a memória: guarda todos os nós do nível atual, e o nível cresce depressa.

A pesquisa em **profundidade** (DFS) desce sempre pelo primeiro sucessor: expande S, depois A, depois A1, depois o primeiro sucessor de A1 (descer a casa vazia dá `4 1 3 / _ 2 6 / 7 5 8`), e continua a descer. No fragmento de 3 níveis, os três primeiros expandidos são S, A, A1, e o objetivo B2, que está no ramo de B, fica por explorar. A profundidade usa pouca memória (só o caminho atual), mas pode perder-se em ramos infinitos e devolve o primeiro objetivo que encontra, não o mais próximo. É exploração recursiva com caso base no objetivo ou no limite de profundidade, o mesmo padrão da [recursão](/cadeiras/fp/recursao/) em programação.

:::warning[O erro mais comum]
Dizer que a profundidade "é mais rápida". Ela expande menos nós quando o objetivo está no ramo que ela desce primeiro, e muitos mais quando está noutro ramo. Sem informação sobre onde está o objetivo, não há garantia nenhuma. Rapidez só se discute com a posição do objetivo na ordem de expansão.
:::

## Custo uniforme e aprofundamento iterativo

Quando as ações têm custos diferentes, a largura deixa de garantir o caminho mais barato. A pesquisa de **custo uniforme** expande sempre o nó com menor custo acumulado $g$ desde o início, que é a largura quando cada ação custa 1. É ótima, mas tal como a largura guarda muitos nós.

O **aprofundamento iterativo** combina o melhor dos dois: corre profundidades limitadas com limite 0, 1, 2, e por aí fora. Cada iteração revisita os níveis de cima (trabalho repetido), mas em árvores com fator de ramificação alto esse custo extra é pequeno face ao último nível, e a memória é a da profundidade. Quando cada ação custa o mesmo, encontra o caminho mais curto como a largura.

## Exemplo: contar expansões no fragmento

No fragmento acima, com o objetivo B2 a distância 2 pelo ramo B:

- Largura: ordem S, A, B, C, D, A1, A2, B1, e B2 é gerado na expansão de B. Caminho devolvido com custo 2, que é ótimo.
- Profundidade (primeiro sucessor primeiro): ordem S, A, A1, e continua a descer pelo ramo de A sem tocar em B nos 3 níveis do fragmento. Se o objetivo estivesse no ramo A, ganhava; estando no ramo B, perde.
- Custo uniforme com custo 1 por ação: coincide com a largura neste fragmento. Se a ação S para B custasse 5 e as outras 1, expandiria A, C e D (custo 1) antes de B (custo 5), e o caminho ótimo podia deixar de passar por B.

A moral do fragmento vale para o 8-puzzle inteiro: a estratégia de expansão decide que parte do espaço visitas, e sem heurística pagas sempre a visita a muitos estados irrelevantes. As heurísticas da próxima página servem para não os visitar.
