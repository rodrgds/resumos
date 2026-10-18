---
title: Cheat sheet de AED
description: Condições, fórmulas e decisões para consulta rápida, com ligações às provas.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Aulas públicas de AED, 2026/27 (slides 0–3) e 2025/26 (slides 4–14)
      url: https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2627/
    - title: Ficha LEIC de AED, 2026/27, ocorrência 586989
      url: https://sigarra.up.pt/feup/pt/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=586989
    - title: Resumos AED, SofiaViP, suplemento histórico de estudante
      url: https://drive.google.com/file/d/1oFfndRpq_F8MQeffoU4_rRBn-04pZiCY/view
---

`n` conta elementos, `h` mede altura em arestas, `V,E` contam vértices e arestas. Custos de comparação e hash são constantes só com chaves de dimensão limitada. Consulta aqui a condição; a demonstração está no capítulo ligado.

## Prova e contagem

| Precisas de | Usa                                                         |
| ----------- | ----------------------------------------------------------- |
| Contrato    | Pré do chamador e pós do algoritmo, com empates e vazio     |
| Ciclo       | Início, manutenção, implicação à saída e medida que diminui |
| Recursão    | Caso base e hipótese nos menores                            |

$O$ limita por cima, $\Omega$ por baixo, $\Theta$ pede os dois. Média exige distribuição. Amortizado limita sequências sem sorteio.

| Padrão                                   | Custo                                              |
| ---------------------------------------- | -------------------------------------------------- |
| Um percurso                              | $\Theta(n)$                                        |
| `n` interiores por cada exterior         | $\Theta(n^2)$                                      |
| `1+…+n`                                  | $\Theta(n^2)$                                      |
| Duplicar de `1` enquanto `<n`, `n>=1`    | $\lceil\log_2 n\rceil$ iterações                   |
| Duplicar com interior proporcional a `i` | $\Theta(n)$                                        |
| Metade com junção linear                 | $\Theta(n\log n)$                                  |
| Prefixos e `q` somas                     | $\Theta(n+q)$ com $p[r]-p[l]$                      |
| Janela `k` em `N`                        | $\Theta(N)$ com retira `a[i-1]` e junta `a[i+k-1]` |

[Provas e recorrências](/cadeiras/aed/complexidade-invariantes/).

## Pesquisa e ordenação

Binária em vetor ordenado: $O(\log(n+1))$. Em `[l,r)`, `m=l+(r-l)/2`. Linear sem ordem: $\Theta(n)$.

| Limite | Primeiro | Descarta esquerda com |
| ------ | -------- | --------------------- |
| Lower  | `>=x`    | `v[m]<x`              |
| Upper  | `>x`     | `v[m]<=x`             |

Contagem de `x`: upper menos lower. Podem devolver `n`. Resposta monótona inclui o custo do teste.

| Ordenação | Pior              | Extra            | Empates                |
| --------- | ----------------- | ---------------- | ---------------------- |
| Seleção   | $\Theta(n^2)$     | $O(1)$           | Não                    |
| Inserção  | $\Theta(n^2)$     | $O(1)$           | Sim                    |
| Merge     | $\Theta(n\log n)$ | $O(n)$           | Sim, esquerda primeiro |
| Quicksort | $\Theta(n^2)$     | Pilha até $O(n)$ | Não                    |
| Heapsort  | $O(n\log n)$      | $O(1)$           | Não                    |
| Counting  | $\Theta(n+k)$     | $O(n+k)$         | Sim, da direita        |

Comparar tem limite $\Omega(n\log n)$. `sort` pede ordem fraca estrita e não é estável. Radix exige passagem estável. [Limites](/cadeiras/aed/pesquisa-ordenacao/) e [traços](/cadeiras/aed/ordenacao/).

## Estruturas e geometria

| Operação                       | Vetor                 | Lista simples                    |
| ------------------------------ | --------------------- | -------------------------------- |
| Consultar índice `i`           | $O(1)$                | $O(n)$                           |
| Inserir na frente              | $O(n)$ por deslocação | $O(1)$                           |
| Consultar o fim                | $O(1)$                | $O(1)$ com cauda, $O(n)$ sem ela |
| Inserir no fim                 | $O(1)$ amortizado     | $O(1)$ com cauda                 |
| Remover no fim                 | $O(1)$                | $O(n)$ sem anterior na simples   |
| Inserir depois de nó conhecido | Desloca os seguintes  | $O(1)$                           |
| Remover nó conhecido           | Desloca os seguintes  | $O(n)$ sem anterior na simples   |

Pilha é LIFO, fila é FIFO, deque aceita ambas as pontas. Duas pilhas fazem fila se transferirem só com saída vazia. [TADs](/cadeiras/aed/tipos-abstratos/) e [ligações](/cadeiras/aed/listas-pilhas-filas/).

Orientação: $(q_x-p_x)(r_y-p_y)-(q_y-p_y)(r_x-p_x)$. Positivo vira à esquerda. Graham ordena em $O(n\log n)$ e varre em $O(n)$. Ponto em convexo com `c` vértices: $O(\log c)$. [Envolvente](/cadeiras/aed/envolvente-convexa/).

## Árvores

Vazio tem altura `-1` e folha tem altura `0`. Para um nó com alturas `h_e` e `h_d` nas subárvores, $h=1+\max(h_e,h_d)$. Pré visita raiz, esquerda e direita; em visita esquerda, raiz e direita; pós visita esquerda, direita e raiz. Cada percurso custa $\Theta(n)$. [Binárias](/cadeiras/aed/arvores-binarias/).

BST exige ordem global, não só pai-filho. Operações $O(h+1)$, pior $O(n)$. Dois filhos troca com sucessor. [BST](/cadeiras/aed/arvores-pesquisa/).

| AVL | Repara com                       |
| --- | -------------------------------- |
| LL  | Direita                          |
| RR  | Esquerda                         |
| LR  | Esquerda no filho, direita no nó |
| RL  | Direita no filho, esquerda no nó |

Vermelha-preta: raiz e NIL pretos, sem vermelhos seguidos, mesma altura preta. Altura até $2\log_2(n+1)$. [Equilíbrio](/cadeiras/aed/arvores-pesquisa-equilibradas/).

## Hash, heaps e grafos

| Procuras em hash      | Condição                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------- |
| Provar desigualdade   | Hash diferente prova; hash igual não prova igualdade                                      |
| Custo do encadeamento | $O(1+\alpha)$ em média, $\alpha=n/m$, sob dispersão uniforme e custos constantes          |
| Remover em aberto     | Marca apagada: a pesquisa atravessa, a inserção memoriza e continua até excluir duplicado |
| Passo duplo válido    | Coprimo com `m`; com `m` primo, qualquer $1\le passo<m$                                   |

[Dispersão](/cadeiras/aed/tabelas-dispersao/).

Com `n>0` elementos em vetor zero-based, os filhos de `i` são `2i+1,2i+2` e o pai de `i>0` é $\lfloor(i-1)/2\rfloor$ com divisão inteira. Topo $O(1)$ com heap não vazio, alteração $O(\log n)$, construção $\Theta(n)$. [Heaps](/cadeiras/aed/filas-prioridade-heaps/).

Listas $O(V+E)$, matriz $O(V^2)$. BFS usa fila e dá o menor número de arestas, só em grafos sem pesos. DFS usa pilha.

| Procuras                                                   | Condição                                    | Ação                                       |
| ---------------------------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| Ciclo dirigido                                             | Aresta para vértice cinzento                | Segue os pais até ao antepassado           |
| Ordem válida                                               | DAG confirmado: Kahn retira os `V` vértices | Usa a ordem de saída; incompleta não serve |
| Componente fechada                                         | `low[u]==disc[u]` em Tarjan                 | Retira da pilha até `u`                    |
| Ponte numa aresta `u->v` da árvore DFS, grafo não dirigido | `low[v]>disc[u]`                            | Marca `u-v`; paralelas anulam              |

[Grafos](/cadeiras/aed/grafos-pesquisa/) e [aplicações](/cadeiras/aed/grafos-aplicacoes/).
