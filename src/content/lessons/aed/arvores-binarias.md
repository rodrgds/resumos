---
title: Árvores binárias
description: Nós, altura, travessias em pré-ordem, em ordem e pós-ordem, e reconstrução a partir de duas travessias.
section: conteudo
order: 4
---

Uma lista é uma fila de nós; uma árvore é uma hierarquia. Cada nó tem até dois filhos, e dessa regra simples nascem as travessias, a pesquisa logarítmica da próxima página e os heaps da seguinte. O trabalho desta página é mecânico e tem de ficar automático: percorrer qualquer árvore nas três ordens sem hesitar.

## Vocabulário

Uma **árvore binária** é vazia ou um **nó raiz** com uma subárvore esquerda e uma direita, ambas binárias. Quem tem filhos é **interno**; quem não tem é **folha**. A **altura** é o número de arestas do caminho mais longo da raiz a uma folha (uma árvore só com a raiz tem altura 0). Uma árvore **cheia** tem todos os níveis completos; uma **completa** tem todos os níveis completos exceto talvez o último, preenchido da esquerda para a direita. Uma árvore completa com $n$ nós tem altura $\lfloor \log_2 n \rfloor$: cada nível duplica a capacidade, por isso a altura cresce devagar.

A implementação é um nó com valor e dois apontadores, como nas listas mas a dobrar:

```cpp
struct No {
    int valor;
    No* esq;
    No* dir;
};
```

Os mesmos avisos das listas aplicam-se: cada `new` precisa do seu `delete`, e o destrutor percorre a árvore a libertar.

## As três travessias

Cada travessia visita todos os nós uma vez; diferem na posição da raiz entre as subárvores. Toma esta árvore de 7 nós: raiz 4, filho esquerdo 2 (filhos 1 e 3), filho direito 6 (filhos 5 e 7).

- **Pré-ordem** (raiz, esquerda, direita): 4, 2, 1, 3, 6, 5, 7. A raiz sai sempre primeiro: serve para copiar ou serializar a árvore, porque a reconstrução sabe onde começa cada subárvore.
- **Em ordem** (esquerda, raiz, direita): 1, 2, 3, 4, 5, 6, 7. Numa árvore de pesquisa, sai ordenado: é a travessia que vais usar para listar.
- **Pós-ordem** (esquerda, direita, raiz): 1, 3, 2, 5, 7, 6, 4. Os filhos saem antes do pai: serve para libertar memória (apagar o pai antes dos filhos perdia-lhes o endereço) e para avaliar expressões.

Todas custam $O(n)$ porque visitam cada nó uma vez, e usam $O(h)$ de pilha, sendo $h$ a altura. Numa árvore degenerada (uma lista disfarçada), $h = n$.

:::tip[Como não trocar as ordens]
Lê o nome como a posição da raiz: **pré** é antes dos filhos, **pós** é depois, **em** é no meio. Fixa uma árvore pequena como a de cima e recita as três sequências até saírem sem pensar.
:::

## Reconstruir a partir de duas travessias

Dadas a pré-ordem $[4, 2, 1, 3, 6, 5, 7]$ e a em ordem $[1, 2, 3, 4, 5, 6, 7]$, reconstrói: o primeiro da pré-ordem é a raiz, $4$. Na em ordem, tudo à esquerda do $4$ ($[1, 2, 3]$) é a subárvore esquerda e tudo à direita ($[5, 6, 7]$) é a direita. Na pré-ordem, a seguir ao $4$ vêm os nós da esquerda ($[2, 1, 3]$) e depois os da direita ($[6, 5, 7]$). Repete: raiz da esquerda é $2$, com $[1]$ à esquerda e $[3]$ à direita na em ordem; raiz da direita é $6$, com $[5]$ e $[7]$. A árvore está reconstruída.

Uma travessia sozinha não chega (várias árvores partilham a mesma em ordem), e pré mais pós também não bastam sem mais informação. Mas em ordem mais pré, ou em ordem mais pós, determinam a árvore: a em ordem separa esquerda de direita, a outra diz quem é a raiz de cada parte. Este é um exercício clássico de teste; resolve-o sempre por este algoritmo, nunca por tentativa.
