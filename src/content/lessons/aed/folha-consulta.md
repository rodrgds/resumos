---
title: Cheat sheet de AED
description: Invariantes, condições e custos para rever sem substituir as demonstrações.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos AED, SofiaViP, suplemento histórico
      url: https://drive.google.com/file/d/1oFfndRpq_F8MQeffoU4_rRBn-04pZiCY/view
    - title: Aulas públicas de AED, 2025/26
      url: https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2526/
---

No fim do percurso, esta página responde o que rever antes do exame quando já sabes onde estão as provas e os exemplos.

`n` é o número de elementos, `h` a altura em arestas, `k` a amplitude das chaves de counting sort e `V,E` os números de vértices e arestas. Os custos de comparação e hashing são constantes apenas quando a dimensão das chaves o permite. Usa esta página para rever condições e custos; as provas ficam nos capítulos.

## Provar e contar

**Contrato:** pré-condição e pós-condição. **Ciclo:** inicialização, manutenção, conclusão e uma quantidade que diminui para provar terminação. **Recursão:** caso base e hipótese indutiva para subproblemas menores.

$O$ limita por cima, $\Omega$ por baixo e $\Theta$ pelos dois lados. Identifica o caso analisado. Média exige uma distribuição; amortização limita uma sequência sem assumir entradas aleatórias.

| Trabalho                                        | Custo                                          |
| ----------------------------------------------- | ---------------------------------------------- |
| percurso único                                  | $\Theta(n)$                                    |
| $1+2+\cdots+n$                                  | $\Theta(n^2)$                                  |
| $1+2+4+\cdots+2^{\lfloor\log_2 n\rfloor}$       | $\Theta(n)$                                    |
| reduzir o intervalo a metade                    | $\Theta(\log n)$                               |
| duas metades com junção linear                  | $\Theta(n\log n)$                              |
| prefixos e `q` consultas de soma                | $\Theta(n+q)$; consulta $p[r]-p[l]$            |
| janela deslizante de tamanho `k` e `N` posições | $\Theta(N)$; retira `a[i-1]`, junta `a[i+k-1]` |

[Provas, recorrências e espaço](/cadeiras/aed/complexidade-invariantes/).

## Pesquisa e ordenação

Pesquisa linear: pior $\Theta(n)$, sem exigir ordem. Binária em vetor: $O(\log(n+1))$, exige a partição compatível com o teste. Em `[l,r)`, `m=l+(r-l)/2`; descarta com `l=m+1` ou conserva o candidato com `r=m`.

**Lower bound:** primeiro `>=x`; **upper bound:** primeiro `>x`; ambos podem devolver `n`. Contagem de `x` = superior menos inferior. Pesquisa de resposta exige predicado monótono; inclui o custo de o avaliar. [Limites e resposta](/cadeiras/aed/pesquisa-ordenacao/).

| Ordenação        | Melhor            | Pior              | Auxiliar         | Estabilidade habitual              |
| ---------------- | ----------------- | ----------------- | ---------------- | ---------------------------------- |
| seleção          | $\Theta(n^2)$     | $\Theta(n^2)$     | $O(1)$           | não                                |
| inserção         | $\Theta(n)$       | $\Theta(n^2)$     | $O(1)$           | sim, deslocar só maiores           |
| merge em vetor   | $\Theta(n\log n)$ | $\Theta(n\log n)$ | $O(n)$           | sim, escolher esquerda nos empates |
| quicksort        | $\Theta(n\log n)$ | $\Theta(n^2)$     | pilha até $O(n)$ | não                                |
| heapsort         | $O(n\log n)$      | $O(n\log n)$      | $O(1)$ iterativo | não                                |
| counting estável | $\Theta(n+k)$     | $\Theta(n+k)$     | $O(n+k)$         | sim                                |

Comparação pura tem limite inferior $\Omega(n\log n)$ no pior caso. Radix LSD exige cada passagem estável. `sort` exige ordem fraca estrita, garante $O(n\log n)$ comparações e não estabilidade. [Provas e traços](/cadeiras/aed/ordenacao/).

## Estruturas lineares e geometria

TAD define comportamento; representação define campos e custos. Vetor: acesso $O(1)$, alteração interior $O(n)$, acrescentar $O(1)$ amortizado. Lista: acesso por índice $O(n)$; alteração por ligação conhecida $O(1)$. Lista simples retira o último em $O(n)$; lista dupla retira um nó conhecido em $O(1)$.

**Pilha:** LIFO. **Fila:** FIFO. **Deque:** ambas as extremidades. Fila com duas pilhas transfere só quando a saída está vazia: retirada isolada $O(n)$, custo amortizado $O(1)$. Pilha monótona: cada índice entra e sai no máximo uma vez. [TADs](/cadeiras/aed/tipos-abstratos/), [ligações e amortização](/cadeiras/aed/listas-pilhas-filas/).

Orientação: $(q_x-p_x)(r_y-p_y)-(q_y-p_y)(r_x-p_x)$; positivo = esquerda. Graham ordena em $O(n\log n)$ e constrói com pilha em $O(n)$. Duplicados, colinearidade e limites aritméticos exigem política explícita. Ponto em polígono convexo com `c` vértices: $O(\log c)$, com vértices extremos únicos em ordem anti-horária; nos raios extremos, testa o segmento. [Envolvente](/cadeiras/aed/envolvente-convexa/).

## Árvores

Altura do vazio `-1`, folha `0`; $h=1+\max(h_e,h_d)$. Pré: raiz-esq-dir; em: esq-raiz-dir; pós: esq-dir-raiz. Percurso $\Theta(n)$, pilha $O(h+1)$. Completa enche o último nível da esquerda; perfeita enche todos. [Árvores binárias](/cadeiras/aed/arvores-binarias/).

BST: **toda** a esquerda menor e **toda** a direita maior, com política de duplicados. Pesquisa, inserção e remoção $O(h+1)$; pior $O(n)$. Dois filhos: substitui pelo mínimo da direita ou máximo da esquerda, retirando a ocorrência antiga. Em-ordem dá ordem crescente. [BST](/cadeiras/aed/arvores-pesquisa/).

AVL: $b=h_e-h_d\in\{-1,0,1\}$. LL: direita; RR: esquerda; LR: esquerda no filho, direita na raiz; RL: simétrico. Remoção pode reparar vários antepassados. $N(h)=1+N(h-1)+N(h-2)$ implica $h=O(\log n)$.

Vermelho-preta: raiz e NIL pretos, sem dois vermelhos consecutivos, igual altura preta por caminho. Altura no máximo $2\log_2(n+1)$. Inserção: tio vermelho recolore; tio preto usa rotações e cores. [Equilíbrio](/cadeiras/aed/arvores-pesquisa-equilibradas/).

## Hash e prioridades

Hash: igualdade implica mesmo hash; colisão não implica igualdade. Encadeamento: esperado $O(1+\alpha)$, $\alpha=n/m$; pior linear. Endereçamento aberto precisa de distinguir livre, ocupado e apagado. Tombstone não termina pesquisa. Inserir memoriza tombstone mas continua para excluir duplicado. Hash duplo precisa de passo coprimo com `m`. Rehash recalcula posições. [Dispersão](/cadeiras/aed/tabelas-dispersao/).

Heap: forma completa + pai prioritário. Zero-based: filhos `2i+1,2i+2`; pai `(i-1)/2`, para `i>0`. Extremo $O(1)$; inserir/retirar $O(\log(n+1))$; construir de baixo para cima $\Theta(n)$. Desce pelo filho mais prioritário. Não oferece pesquisa arbitrária logarítmica. Top-k maiores usa min-heap de capacidade `k`. [Heaps](/cadeiras/aed/filas-prioridade-heaps/).

## Grafos

Listas: memória e percurso $O(V+E)$. Matriz: memória e percurso completo $O(V^2)$, teste de aresta $O(1)$. DFS usa pilha; BFS usa fila e encontra distâncias mínimas em número de arestas. Marca na descoberta. Recomeça para componentes desconexas. [Representações e caminhos](/cadeiras/aed/grafos-pesquisa/).

- Ciclo dirigido: aresta para cinzento. Não dirigido: exclui só a aresta de entrada; usa IDs para paralelas.
- Topológica: `u` antes de `v` para toda `u->v`; existe só em DAG. DFS inverte pós-ordem; Kahn retira grau zero e exige `V` retirados.
- SCC: alcançabilidade nos dois sentidos. Tarjan usa pilha de ainda não atribuídos, que é diferente da pilha de chamadas. Fecha quando `low[u]=disc[u]`.
- Ponte `u-v`: `low[v]>disc[u]`. Articulação não raiz: algum filho com `low[v]>=disc[u]`. Raiz: pelo menos dois filhos DFS.

Estas aplicações custam $O(V+E)$ com listas e espaço auxiliar $O(V)$. [Ciclos e conetividade](/cadeiras/aed/grafos-aplicacoes/).
