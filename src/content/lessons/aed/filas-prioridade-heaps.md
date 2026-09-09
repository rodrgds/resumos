---
title: Filas de prioridade e heaps
description: Heap binário com inserção e remoção logarítmicas, e o heapsort por remoções sucessivas.
section: conteudo
order: 7
---

Uma fila comum atende por chegada; uma **fila de prioridade** atende por importância: cada elemento tem uma prioridade e o próximo a sair é sempre o mais prioritário. É a estrutura por trás do agendamento de tarefas, da simulação de eventos e, como vais ver em Desenho de Algoritmos, dos caminhos mais curtos. O heap binário implementa-a em $O(\log n)$ por operação.

## O heap binário

Um **heap binário** é uma árvore binária completa (todos os níveis cheios exceto o último, preenchido da esquerda) com a **propriedade de heap**: num heap mínimo, cada pai é menor ou igual aos filhos. Consequência imediata: o mínimo está sempre na raiz, acessível em $O(1)$. E por ser completa, guarda-se num vetor sem apontadores: o filho esquerdo do índice $i$ está em $2i+1$, o direito em $2i+2$, o pai em $\lfloor (i-1)/2 \rfloor$.

**Inserir** põe o valor na primeira posição livre (mantém a forma completa) e sobe-o (**sift-up**) enquanto for menor que o pai. **Remover o mínimo** tira a raiz, move o último elemento para a raiz e desce-o (**sift-down**), trocando sempre com o menor dos filhos. Subir ou descer percorre no máximo a altura, e a altura de uma árvore completa com $n$ nós é $\lfloor \log_2 n \rfloor$: tudo $O(\log n)$.

## Construir um heap de 6 valores

Insere por ordem 7, 3, 9, 1, 5, 4 num heap mínimo, mostrando o vetor:

- 7: $[7]$.
- 3: $[7, 3]$, sobe (pai 7 maior): $[3, 7]$.
- 9: $[3, 7, 9]$, pai 3 menor, fica.
- 1: $[3, 7, 9, 1]$, pai 7 maior, troca: $[3, 1, 9, 7]$; pai 3 maior, troca: $[1, 3, 9, 7]$.
- 5: $[1, 3, 9, 7, 5]$, pai 3 menor, fica.
- 4: $[1, 3, 9, 7, 5, 4]$, pai 9 maior, troca: $[1, 3, 4, 7, 5, 9]$; pai 1 menor, fica.

Confirma a propriedade: 1 é menor que 3 e 4; 3 é menor que 7 e 5; 4 é menor que 9. Repara que o vetor $[1, 3, 4, 7, 5, 9]$ **não** está ordenado: o heap só garante o mínimo no topo e pais antes dos filhos. Confundir heap com vetor ordenado é o erro mais comum desta página.

## Heapsort

Se o mínimo está sempre na raiz, ordenar é remover o mínimo $n$ vezes. A primeira remoção no heap acima: tira o 1, move o último (9) para a raiz, $[9, 3, 4, 7, 5]$, e desce o 9 trocando com o menor filho: filhos 3 e 4, troca com 3, $[3, 9, 4, 7, 5]$; filhos 9 e 7, troca com 7, $[3, 7, 4, 9, 5]$. Saiu o 1 e o heap está refeito. As remoções seguintes devolvem 3, 4, 5, 7 e 9, por esta ordem: a saída é $[1, 3, 4, 5, 7, 9]$.

O **heapsort** faz exatamente isto no próprio vetor, $n$ remoções de $O(\log n)$ cada: tempo $O(n \log n)$ garantido (sem o pior caso quadrático do quicksort) e espaço $O(1)$. Paga dois preços: não é estável e tem má localidade (os sift-down saltam pelo vetor), por isso perde para o quicksort e o mergesort na maioria dos dados reais. Usa o heap quando precisas da fila de prioridade viva, não quando precisas de ordenar uma vez.

:::details[Construção em tempo linear]
Inserir $n$ valores um a um custa $O(n \log n)$, mas construir o heap despejando os valores no vetor e aplicando sift-down de baixo para cima custa $O(n)$. A intuição: a maioria dos nós está nos níveis de baixo, onde descer é barato. É um daqueles resultados que parecem errados até somares a série.
:::
