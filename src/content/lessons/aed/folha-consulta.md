---
title: Cheat sheet de AED
description: Operações, custos e condições para rever estruturas de dados, pesquisa, ordenação e grafos.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos AED, SofiaViP
      url: https://drive.google.com/file/d/1oFfndRpq_F8MQeffoU4_rRBn-04pZiCY/view
  coverage: Consulta breve dos tópicos presentes nas páginas 2 a 9 dos Resumos AED de SofiaViP, com custos e condições de aplicação.
  gaps:
    - O documento não identifica uma edição atual da cadeira; confirma o programa e a avaliação da tua ocorrência.
    - Esta folha omite demonstrações, código completo e exemplos longos; segue os links para as explicações.
---

Em cada custo, $n$ é o número de elementos; nos grafos, $V$ e $E$ são os conjuntos de vértices e arestas. Confirma a representação e o caso analisado antes de usar uma fórmula.

## Correção e custo

- Um **invariante de ciclo** é verdadeiro antes da primeira iteração, continua verdadeiro depois de cada iteração e, com a condição de paragem, implica o resultado. Mostra também que o ciclo termina, por exemplo com uma quantidade não negativa que diminui. [Ver a prova](/cadeiras/aed/complexidade-invariantes/#invariantes-provar-o-ciclo).
- $O(g(n))$ limita o crescimento por cima; $\Omega(g(n))$, por baixo; $\Theta(g(n))$, dos dois lados, para entradas suficientemente grandes. Distingue **tempo** de **memória extra**, e pior caso de caso médio. Por exemplo, $3n^2+8n+1=\Theta(n^2)$.
- Para comparar tempos, usa a mesma tarefa e modelo de custo. A ordem de crescimento não diz que um algoritmo vence em todas as entradas: constantes, dados e memória também contam. [Ver o que medir](/cadeiras/aed/complexidade-invariantes/#o-que-conta-como-custo).

## Pesquisa e ordenação

| Método              | Condição e custo                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Pesquisa sequencial | Não exige ordem; $O(n)$ no pior caso, $O(1)$ espaço extra.                                       |
| Pesquisa binária    | Exige acesso por índice e dados ordenados; compara no meio e descarta metade, $O(\log n)$ tempo. |
| Merge sort          | Divide, ordena as metades e funde; $\Theta(n\log n)$ tempo e $O(n)$ espaço extra em vetores.     |
| Quick sort          | Particiona por pivô; $O(n\log n)$ esperado, $O(n^2)$ no pior caso.                               |
| Heap sort           | Extrai repetidamente o extremo de uma heap; $O(n\log n)$ tempo e $O(1)$ espaço extra num vetor.  |

Insertion, selection e bubble sort custam $O(n^2)$ no pior caso; insertion sort é $O(n)$ se os dados já estiverem ordenados. O custo de Shell sort depende da sequência de saltos. Ordenações por **comparação** precisam de $\Omega(n\log n)$ comparações no pior caso. Counting sort e radix sort evitam esse limite porque usam chaves com estrutura adicional: counting sort custa $O(n+k)$ para chaves inteiras num intervalo de $k$ valores; radix sort custa $O(d(n+k))$ com $d$ dígitos e counting sort **estável** em cada passagem. Uma ordenação estável conserva a ordem original entre chaves iguais. [Ver pesquisa](/cadeiras/aed/pesquisa-ordenacao/#pesquisar-sequencial-e-binária), [comparação](/cadeiras/aed/pesquisa-ordenacao/#ordenação-por-comparação) e [ordenação linear](/cadeiras/aed/pesquisa-ordenacao/#ordenação-linear).

## ADT, listas, pilhas e filas

Um **tipo de dados abstrato** (ADT) especifica operações e comportamento; a representação fica escondida. Um vetor permite acesso por índice em $O(1)$ e inserção no meio em $O(n)$. Numa lista ligada, inserir ou remover junto de um nó já conhecido pode custar $O(1)$; encontrar esse nó continua a custar $O(n)$. Um iterador é uma forma de percorrer uma coleção, não um requisito de todas as interfaces de ADT. [Ver listas](/cadeiras/aed/listas-pilhas-filas/#listas-ligadas).

Uma **pilha** retira primeiro o último elemento inserido (LIFO); uma **fila**, o primeiro (FIFO). Uma deque permite operações nas duas extremidades. Escolhe a implementação pela operação que precisas de repetir, não apenas pelo nome da coleção. Templates em C++ permitem reutilizar uma estrutura com tipos diferentes, mas não mudam o custo das suas operações. [Ver pilha e fila](/cadeiras/aed/listas-pilhas-filas/#pilha-e-fila).

## Árvores e ordem

- Numa árvore binária, a **profundidade** de um nó é a distância da raiz até ele; a **altura** é a maior distância desse nó a uma folha. Com altura $h$ medida em arestas, há entre $h+1$ e $2^{h+1}-1$ nós. Não confundas altura da árvore com número de níveis.
- **Pré-ordem:** nó, esquerda, direita. **Em ordem:** esquerda, nó, direita. **Pós-ordem:** esquerda, direita, nó. Numa árvore binária de pesquisa (BST), a travessia em ordem devolve as chaves por ordem. [Ver as travessias](/cadeiras/aed/arvores-binarias/#as-três-travessias).
- Numa BST, as chaves da esquerda são menores e as da direita maiores, segundo o comparador definido. Procura, inserção e remoção custam $O(h)$, sendo $h$ a altura. Para remover um nó com dois filhos, substitui a chave pelo predecessor ou sucessor em ordem e remove esse nó. Se a árvore degenerar, $h=\Theta(n)$.
- Rotações conservam a ordem da BST. Árvores AVL e vermelho-pretas mantêm altura $O(\log n)$ por regras de equilíbrio diferentes; operações de procura e atualização ficam em $O(\log n)$. Numa vermelho-preta, a raiz é preta, nós vermelhos não têm filhos vermelhos e todos os caminhos de um nó às folhas nulas têm o mesmo número de nós pretos. [Ver rotações](/cadeiras/aed/arvores-pesquisa-equilibradas/#equilibrar-com-rotações).

## Prioridades e dispersão

Numa **heap binária máxima**, cada pai tem prioridade pelo menos tão alta como os filhos. O maior está na raiz; não há ordem total entre irmãos. Inserir sobe a chave, remover a raiz faz descer a substituta: $O(\log n)$ cada. Consultar a raiz custa $O(1)$; construir a heap de um vetor por _heapify_ custa $O(n)$. A `priority_queue` de C++ usa uma heap máxima por defeito. [Ver a heap](/cadeiras/aed/filas-prioridade-heaps/#o-heap-binário).

Uma **tabela de dispersão** calcula uma posição a partir da chave. Com boa função de dispersão e fator de carga controlado, pesquisa, inserção e remoção custam $O(1)$ em média, mas podem custar $O(n)$ no pior caso. **Encadeamento** guarda colisões numa lista por posição. **Endereçamento aberto** procura outra posição na própria tabela; a sondagem linear percorre posições seguidas, a quadrática usa saltos quadráticos e nem sempre visita toda a tabela. Remover exige preservar a sequência de procura, por exemplo com uma marca de apagado. [Ver as colisões](/cadeiras/aed/tabelas-dispersao/#endereçamento-aberto).

## Grafos e percursos

Um grafo pode ser dirigido, ponderado, simples ou multigrafo. Num grafo dirigido, distingue grau de entrada e de saída. Um **DAG** é dirigido e não tem ciclos. Uma matriz de adjacência usa $O(V^2)$ espaço e testa uma aresta em $O(1)$; listas de adjacência usam $O(V+E)$ espaço e percorrem os vizinhos sem examinar todas as posições da matriz. [Ver representações](/cadeiras/aed/grafos-pesquisa/#representar).

- **DFS** avança por um ramo antes de voltar; serve para detetar ciclos, componentes e tempos de conclusão. **BFS** visita por camadas e dá caminhos com menos arestas em grafos sem pesos. Com listas de adjacência, ambas custam $O(V+E)$ tempo e $O(V)$ memória auxiliar; com matriz, o percurso custa $O(V^2)$. Marca os vértices quando entram na procura para evitar visitas repetidas. [Ver os percursos](/cadeiras/aed/grafos-pesquisa/#bfs-e-dfs-num-grafo-de-6-vértices).
- Uma **ordem topológica** existe só num DAG e põe $u$ antes de $v$ para cada aresta $u\to v$. Uma **componente fortemente conexa** é um conjunto máximo de vértices que se alcançam mutuamente num grafo dirigido. Num grafo não dirigido, um **ponto de articulação** ou uma **ponte** aumenta o número de componentes ao remover, respetivamente, o vértice ou a aresta. [Ver conetividade](/cadeiras/aed/grafos-pesquisa/#ciclos-topologia-e-conetividade).
