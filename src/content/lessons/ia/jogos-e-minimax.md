---
title: Jogos e Minimax
description: Minimax, cortes alfa-beta numerados e pesquisa em árvore Monte Carlo.
section: conteudo
order: 4
---

Quando há um adversário, o labirinto mexe-se contra ti: cada jogada tua é seguida da pior resposta possível do outro lado. O **Minimax** calcula a jogada ótima assumindo adversário perfeito, os **cortes alfa-beta** evitam calcular ramos que não mudam a decisão, e a **pesquisa em árvore Monte Carlo** (MCTS) troca a perfeição por amostragem quando a árvore é demasiado grande. Os três partem da mesma árvore de jogo.

## Minimax numa árvore pequena

Árvore com raiz MAX, dois filhos MIN (A e B) e duas folhas em cada: A tem folhas 3 e 5, B tem folhas 2 e 9. Os valores são a utilidade para o jogador MAX.

Propaga de baixo para cima. O nó A é MIN e escolhe o mínimo dos filhos: $\min(3, 5) = 3$. O nó B é MIN: $\min(2, 9) = 2$. A raiz é MAX e escolhe o máximo: $\max(3, 2) = 3$. A jogada ótima é ir para A, com valor garantido 3: mesmo com o adversário a responder o pior, garantes 3. Repara que o 9 em B é irrelevante para a decisão, porque o adversário nunca deixaria o jogo chegar lá, escolhe 2. É esta observação que os cortes exploram.

## Cortes alfa-beta

O **alfa** ($\alpha$) é o melhor valor já garantido para o MAX no caminho até à raiz; o **beta** ($\beta$) é o melhor valor já garantido para o MIN. Quando $\alpha \ge \beta$ num nó, o resto dos seus filhos não influencia a decisão e é cortado. Percorre a mesma árvore da esquerda para a direita:

1. Raiz MAX com $\alpha = -\infty$, $\beta = +\infty$. Desce a A.
2. Nó A (MIN) com $\alpha = -\infty$, $\beta = +\infty$. Primeira folha 3: o mínimo fica 3, por isso $\beta = 3$. Segunda folha 5: como $5 \ge \beta$, o MIN nunca a escolheria. **Corte 1**: a folha 5 não é avaliada. A devolve 3.
3. Raiz recebe 3 e atualiza $\alpha = 3$. Desce a B com $\alpha = 3$, $\beta = +\infty$.
4. Nó B (MIN): primeira folha 2. Como $2 \le \alpha$, o MAX já tem 3 garantido noutro ramo e nunca deixaria o jogo vir para aqui. **Corte 2**: a folha 9 não é avaliada. B devolve 2.
5. Raiz: $\max(3, 2) = 3$.

Dois cortes numerados, duas folhas poupadas em quatro, mesmo resultado do Minimax completo. Em árvores grandes e bem ordenadas (melhores jogadas primeiro), o alfa-beta corta tanto que duplica a profundidade alcançável no mesmo tempo. A ordem dos filhos decide tudo: se as folhas de B viessem como 9 e depois 2, o corte 2 não acontecia, porque o 9 é avaliado antes de se saber que o ramo é mau.

:::warning[O erro mais comum]
Cortar no sítio errado por trocar alfa com beta. Regra curta: o MAX atualiza o alfa e corta quando o valor atinge o beta; o MIN atualiza o beta e corta quando o valor desce ao alfa. Escreve os dois valores em cada nó visitado e só corta quando $\alpha \ge \beta$ com números concretos.
:::

## Monte Carlo quando a árvore é gigante

No Go ou no xadrez com limite de tempo, a árvore completa não cabe em lado nenhum. O MCTS constrói estatísticas por amostragem em quatro fases repetidas: **seleção** (desce pela árvore guardada escolhendo filhos com bom equilíbrio entre vitórias e poucas visitas), **expansão** (acrescenta um filho novo), **simulação** (joga aleatoriamente até ao fim a partir daí) e **retropropagação** (atualiza visitas e vitórias em todos os nós do caminho).

Um exemplo mínimo: a raiz tem 10 visitas; o filho A foi visitado 6 vezes com 4 vitórias, o filho B 4 vezes com 1 vitória. A próxima seleção tende para A (melhor taxa), mas B conserva poucas visitas, por isso continua a ser explorado de vez em quando. Ao fim de milhares de iterações, o filho com mais visitas é a jogada escolhida. Não há garantia de otimalidade como no Minimax, há uma aproximação cada vez melhor com mais tempo, que é exatamente o compromisso que os jogos reais exigem.
