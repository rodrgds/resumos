---
title: Grafos e pesquisa
description: Representação por listas e matrizes, pesquisa em largura e em profundidade, ciclos e ordem topológica.
section: conteudo
order: 8
---

Listas, árvores e heaps organizam os dados numa forma. Um **grafo** modela relações arbitrárias: páginas e ligações, estradas e cruzamentos, tarefas e dependências. É a estrutura mais geral da cadeira e também a mais recompensadora, porque dois algoritmos simples, BFS e DFS, respondem a uma lista surpreendente de perguntas.

## Representar

Um grafo tem **vértices** e **arestas** (dirigidas, com sentido, ou não dirigidas). Duas representações:

- **Lista de adjacência**: cada vértice guarda a lista dos seus vizinhos. Espaço $O(V + E)$, e percorrer os vizinhos de um vértice custa o seu grau. É a escolha por defeito para grafos esparsos, que são quase todos.
- **Matriz de adjacência**: tabela $V \times V$ com 1 onde há aresta. Testar se dois vértices são vizinhos é $O(1)$, mas o espaço é $O(V^2)$ mesmo sem arestas. Só compensa em grafos densos.

Num grafo dirigido distingue-se o **grau de saída** do de entrada; num caminho dirigido as setas têm de alinhar. Um **ciclo** é um caminho que volta ao início; um grafo dirigido sem ciclos é um **DAG**.

## BFS e DFS num grafo de 6 vértices

Toma o grafo dirigido com vértices 1 a 6 e arestas $1 \to 2$, $1 \to 3$, $2 \to 4$, $3 \to 4$, $3 \to 5$, $4 \to 6$, $5 \to 6$. A **BFS** (pesquisa em largura) usa uma [fila](listas-pilhas-filas/) e visita por camadas de distância; a **DFS** (pesquisa em profundidade) usa uma pilha (ou recursão) e esgota cada ramo até ao fim. Ambas marcam cada vértice uma vez: tempo $O(V + E)$ com listas de adjacência.

BFS a partir do 1, com vizinhos por ordem crescente: visita 1 e enfileira 2, 3; visita 2 e enfileira 4; visita 3 e enfileira 5 (o 4 já está marcado); visita 4 e enfileira 6; visita 5 (o 6 já está marcado); visita 6. Ordem: 1, 2, 3, 4, 5, 6. Como a BFS expande por distância crescente, esta ordem dá as distâncias mínimas do 1 em arestas: o 6 está a 3 passos ($1 \to 2 \to 4 \to 6$), e nenhum caminho mais curto existe.

DFS a partir do 1, recursiva, mesma ordem de vizinhos: 1 desce a 2, que desce a 4, que desce a 6, que não tem saída nova; volta a 4, sem saída nova; volta a 2, sem saída nova; volta a 1, desce a 3, que desce a 5 (o 4 e o 6 já marcados). Ordem de primeira visita: 1, 2, 4, 6, 3, 5. Repara como difere da BFS: a DFS atravessa o grafo em vez de o varrer.

## Ciclos, topologia e conetividade

A DFS classifica as arestas pelo que encontra: uma aresta para um vértice ainda **em processamento** (na pilha de recursão) fecha um ciclo. Aqui nenhuma aresta aponta para um antecessor em processamento (do 3, o 4 já terminou; do 5, o 6 já terminou), por isso o grafo **não tem ciclo**: é um DAG. Num DAG, a ordem inversa de término da DFS é uma **ordem topológica**, onde cada aresta vai de antes para depois: os términos saem por 6, 4, 2, 5, 3, 1, logo 1, 3, 5, 2, 4, 6 é topológica. Confirma: $1 \to 2$, $1 \to 3$, $2 \to 4$, $3 \to 4$, $3 \to 5$, $4 \to 6$, $5 \to 6$, todas da esquerda para a direita.

Para **conetividade** em grafos não dirigidos, uma BFS ou DFS a partir de qualquer vértice que visite todos prova que o grafo é conexo; os vértices não visitados pedem nova pesquisa, e cada arranque conta uma **componente conexa**. A mesma ideia, no grafo dirigido, separa o alcance (quem chego a partir daqui) da conexidade mútua.

:::tip[Como escolher entre BFS e DFS]
BFS quando a pergunta envolve distância mínima ou camadas (menor número de arestas, redes sociais, labirintos). DFS quando envolve estrutura (ciclos, ordem topológica, componentes, resolver com voltar atrás). O código é quase igual; a fila contra a pilha muda o significado do percurso.
:::
