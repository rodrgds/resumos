---
title: Árvores de pesquisa equilibradas
description: A propriedade de ordem das ABP, inserção e remoção, e rotações que mantêm a altura logarítmica.
section: conteudo
order: 5
---

A travessia em ordem de uma árvore binária sai ordenada. E se a árvore **mantiver** essa ordem a cada inserção, pesquisar passa a descer um caminho em vez de percorrer tudo. Essa é a árvore binária de pesquisa. O resto da página é a luta contra o seu inimigo: a degeneração.

## A propriedade de ordem

Uma **árvore binária de pesquisa** (ABP) exige que, em cada nó, todos os valores da subárvore esquerda sejam menores e todos os da direita sejam maiores. Pesquisar desce comparando: igual, encontrou; menor, vai à esquerda; maior, vai à direita. Inserir desce até uma folha vazia e pendura lá o novo nó. Cada passo desce um nível, por isso tudo custa $O(h)$, sendo $h$ a altura.

Insere a sequência 10, 20, 30 numa ABP vazia: o 10 é a raiz, o 20 é maior e vai para a direita do 10, o 30 é maior que 10 e que 20 e vai para a direita do 20. Resultado: uma cadeia 10, 20, 30 pendurada para a direita, com altura 2 em vez de 1. Inserir por ordem transforma a árvore numa lista e o $O(h)$ em $O(n)$. A ordem de inserção decide a forma; a forma decide o custo.

## Remoção

Remover uma folha ou um nó com um só filho é direto (desliga, ou liga o neto ao avô). O caso com **dois filhos** precisa de um substituto que preserve a ordem: o **mínimo da subárvore direita** (o sucessor), que é o menor valor maior que o removido. Copia-se o sucessor para o lugar do removido e apaga-se o sucessor na sua posição original, onde tem no máximo um filho direito. A remoção continua $O(h)$, mas só enquanto a árvore não degenerar.

## Equilibrar com rotações

Uma árvore **equilibrada** mantém $h = O(\log n)$ e com isso pesquisa, inserção e remoção logarítmicas. A ferramenta é a **rotação**, que muda a forma sem partir a ordem. A cadeia 10, 20, 30 equilibra-se com uma **rotação à esquerda** no 10: o 20 sobe a raiz, o 10 desce a filho esquerdo do 20 e o 30 continua filho direito. Confirma a ordem: tudo à esquerda do 20 (só o 10) é menor, tudo à direita (só o 30) é maior. A árvore passa de altura 2 a altura 1.

A rotação à direita é o espelho. As árvores AVL fazem uma ou duas rotações a cada inserção ou remoção para manter as alturas das duas subárvores de cada nó a diferir no máximo uma unidade. Não precisas de decorar os quatro casos de cor para esta página; precisas de saber executar uma rotação simples e de justificar por que ela preserva a propriedade de ordem.

Volta à pesquisa do valor 25. Na cadeia degenerada comparas 10, 20 e 30 antes de concluir que não existe: 3 comparações. Na árvore rodada comparas 20, desces à direita para 30, desces à esquerda para o vazio: 2 comparações. Com $n$ nós, a diferença é entre $n$ e $\log n$ passos, a mesma diferença da linear para a binária na primeira página, agora comprada com rotações em vez de ordenação prévia.

:::warning[Equilibrada não é cheia]
Equilibrada significa altura logarítmica, não forma perfeita. Uma AVL pode ter um lado uma unidade mais alto que o outro em cada nó. Não tentes "completar" a árvore nos exercícios; verifica a condição de equilíbrio nó a nó e roda só onde ela falha.
:::
