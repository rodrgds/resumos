---
title: Cheat sheet de DA
description: Condições, recorrências e custos para rever as técnicas de Desenho de Algoritmos.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: CheatSheetDA, SofiaViP
      url: https://drive.google.com/file/d/1h1qIIanoFTq4eqf0IF37Lm2yIUWLiDSW/view
    - title: Resumos DA, SofiaViP
      url: https://drive.google.com/file/d/16ud8ahTmnaIdU1P_pU7FZSXrvGkf46nk/view
  coverage: Consulta breve das técnicas e dos algoritmos presentes nos dois documentos de SofiaViP, com condições de aplicação e custos usuais.
  gaps:
    - Os documentos não identificam uma edição atual da cadeira; confirma o programa e a avaliação da tua ocorrência.
    - Esta folha omite demonstrações, implementações completas e exemplos extensos; segue os links para as explicações.
---

Usa esta folha para **escolher uma técnica e verificar as suas hipóteses**. Em cada custo, $n$ é o tamanho da entrada; nos grafos, $V$ e $E$ são os conjuntos de vértices e arestas. Os custos indicados dependem das estruturas de dados referidas.

## Custos, estruturas e percursos

- $f(n)=O(g(n))$ dá um limite superior; $f(n)=\Omega(g(n))$, inferior; $f(n)=\Theta(g(n))$, ambos, para $n$ suficientemente grande e constantes positivas. Soma de fases: domina a mais cara. Ciclos aninhados: multiplica os respetivos números de iterações. [Rever a análise](/cadeiras/da/complexidade-estruturas/#a-régua-o-grande).
- Numa **heap binária**, a altura é $\Theta(\log n)$; subir após inserção e descer após remoção custam $O(\log n)$. Os índices da folha original começam em 1: pai $\lfloor i/2\rfloor$, filhos $2i$ e $2i+1$. Com índices desde 0, estas fórmulas mudam.
- **DFS** e **BFS** custam $O(V+E)$ com listas de adjacência. A ordenação topológica só existe num grafo dirigido acíclico; o algoritmo de Kahn remove vértices de grau de entrada zero e deteta ciclos se não remover todos. As componentes fortemente conexas de um grafo dirigido também se obtêm em $O(V+E)$ com duas DFS, a segunda no grafo transposto e pela ordem inversa de conclusão da primeira.

## Divisão e conquista

Escreve a recorrência como $T(n)=aT(n/b)+f(n)$: $a$ subproblemas de tamanho $n/b$, mais o trabalho de dividir e combinar. Em merge sort, $T(n)=2T(n/2)+\Theta(n)=\Theta(n\log n)$. Nas Torres de Hanói, $T(n)=2T(n-1)+\Theta(1)=\Theta(2^n)$; **não** se aplica o Teorema Mestre a $n-1$. [Ver a combinação e o teorema](/cadeiras/da/divisao-conquista/#a-caixa-do-teorema-mestre).

Para $f(n)=\Theta(n^c)$, compara $c$ com $\log_b a$:

| Condição     | Custo                                                                      |
| ------------ | -------------------------------------------------------------------------- |
| $c<\log_b a$ | $\Theta(n^{\log_b a})$                                                     |
| $c=\log_b a$ | $\Theta(n^c\log n)$                                                        |
| $c>\log_b a$ | $\Theta(n^c)$, se o termo não recursivo cumprir a condição de regularidade |

## Escolhas gulosas e árvores geradoras

Uma escolha local só dá um ótimo global quando consegues justificar a **propriedade da escolha gulosa** e a **subestrutura ótima**. Na mochila **fracionária**, ordena por $v_i/w_i$, enche por essa ordem e fraciona apenas o último objeto; custa $O(n\log n)$ com ordenação. A mesma regra não resolve, em geral, a mochila 0-1. [Ver o critério e o contraexemplo](/cadeiras/da/algoritmos-gulosos/#exemplo-com-critério-mochila-fracionária).

Numa árvore geradora mínima (MST), o grafo é **não dirigido e conexo**. A aresta mais leve que atravessa um corte é segura para **alguma** MST; a mais pesada de um ciclo pode ser excluída de **alguma** MST. Com empates, não afirmes que uma aresta pertence a todas as MST ou a nenhuma. Kruskal ordena arestas e junta componentes diferentes com union-find, $O(E\log E)$. Prim expande a árvore pela aresta mais leve que sai dela, $O(E\log V)$ com heap binária. Num grafo desconexo, ambos podem produzir uma floresta mínima, não uma única MST.

## Caminhos mínimos

**Relaxar** $(u,v)$ é substituir $d[v]$ por $d[u]+w(u,v)$ quando esse valor é menor; guarda também o predecessor. Os custos abaixo são para uma origem, salvo indicação contrária.

| Método         | Quando usar                                                                   | Custo                                 |
| -------------- | ----------------------------------------------------------------------------- | ------------------------------------- |
| Dijkstra       | Pesos não negativos; heap binária                                             | $O((V+E)\log V)$                      |
| Bellman-Ford   | Admite pesos negativos; deteta ciclo negativo alcançável após $V-1$ passagens | $O(VE)$                               |
| Floyd-Warshall | Todos os pares; sem ciclos negativos                                          | $O(V^3)$                              |
| Johnson        | Todos os pares em grafo esparso com pesos negativos, mas sem ciclos negativos | $O(VE+V(V+E)\log V)$ com heap binária |

Em Floyd-Warshall, $d_{ij}^{(k)}=\min(d_{ij}^{(k-1)},d_{ik}^{(k-1)}+d_{kj}^{(k-1)})$. Johnson acrescenta uma origem artificial, calcula potenciais $h$ com Bellman-Ford e usa $w'(u,v)=w(u,v)+h(u)-h(v)\ge0$ antes de correr Dijkstra a partir de cada vértice. **Pesos negativos isolados não causam ciclos infinitos em Dijkstra**; invalidam a sua garantia de correção.

## Fluxo e emparelhamento

Numa rede, o fluxo respeita capacidades e conservação nos vértices internos. Numa **rede residual**, procura um caminho de $s$ a $t$, aumenta o fluxo pelo menor valor residual do caminho e atualiza também as arestas inversas. Ford-Fulkerson termina com capacidades inteiras em $O(E|f^*|)$, onde $|f^*|$ é o valor do fluxo máximo; com capacidades irracionais, a escolha arbitrária de caminhos pode não terminar. Edmonds-Karp usa BFS na rede residual e custa $O(VE^2)$. Um corte dá um limite superior ao fluxo, e fluxo máximo e capacidade mínima de corte coincidem.

Para **emparelhamento bipartido máximo**, liga uma fonte à partição esquerda e a partição direita a um sorvedouro; põe capacidade 1 em todas as arestas. As arestas entre partições com fluxo 1 formam o emparelhamento. A formulação por fluxo não implica por si só o custo $O(VE)$: depende do algoritmo escolhido.

## Programação dinâmica

Define primeiro o **estado**, a **recorrência**, os **casos base** e a ordem de preenchimento. A subestrutura ótima permite decompor a solução; subproblemas repetidos justificam guardar resultados. [Ver mochila e LCS](/cadeiras/da/programacao-dinamica/#exemplo-completo-mochila-0-1-com-tabela).

- **Mochila 0-1.** Para os primeiros $i$ objetos e capacidade $w$, $D(i,w)=D(i-1,w)$ se $w_i>w$; caso contrário, $D(i,w)=\max(D(i-1,w),v_i+D(i-1,w-w_i))$. Base $D(0,w)=0$. Custo $O(nW)$ em tempo, **pseudopolinomial** porque $W$ é numérico.
- **Subsequência comum mais longa.** $L(i,0)=L(0,j)=0$; se $x_i=y_j$, $L(i,j)=L(i-1,j-1)+1$; senão, $L(i,j)=\max(L(i-1,j),L(i,j-1))$. Custo $O(nm)$. Uma subsequência preserva a ordem, mas pode saltar posições.
- **Troco mínimo.** Com moedas de valores positivos $c_i$, $C(0)=0$ e $C(w)=1+\min_{c_i\le w}C(w-c_i)$; estados impossíveis valem $+\infty$. Custo $O(kW)$ para $k$ denominações e alvo $W$. Confirma se as moedas são reutilizáveis; a variante 0-1 exige outro estado.

## Procura, dificuldade e aproximação

**Retrocesso** percorre a árvore de decisões e corta estados que já violam restrições. **Branch and bound** corta também um ramo quando o seu limite otimista não consegue superar a melhor solução conhecida. Um limite só serve para poda se for válido para **todos** os descendentes do ramo. O pior caso continua exponencial. [Ver a poda](/cadeiras/da/retrocesso-ramificacao/#ramificação-com-poda-cortar-por-limite).

Um problema de **decisão** responde sim/não; em **otimização**, procura-se o melhor valor. Para provar que $B$ é NP-completo, mostra $B\in\mathrm{NP}$ e reduz em tempo polinomial um problema NP-completo conhecido $A$ **a $B$**. A direção $A\le_p B$ é decisiva: uma solução eficiente para $B$ resolveria $A$. NP-hard não implica pertencer a NP. [Ver reduções](/cadeiras/da/complexidade-aproximacao/#reduzir-para-reconhecer).

Para uma solução viável de custo $C$ e ótimo $C^*>0$, uma garantia de aproximação $\rho\ge1$ exige $C/C^*\le\rho$ em minimização, ou $C^*/C\le\rho$ em maximização. A garantia vale para todas as entradas abrangidas pelas hipóteses, não apenas para exemplos. [Ver as garantias](/cadeiras/da/complexidade-aproximacao/#aproximar-com-garantia).

## Programação linear

Escreve **variáveis**, **função objetivo** e **restrições lineares**. A região viável é convexa; pode ser vazia ou ilimitada. Se um ótimo finito existir num poliedro com vértices, existe um ótimo num vértice, mas pode haver vários ótimos. Trocar maximização por minimização muda o sinal da função objetivo; $a^Tx\ge b$ equivale a $-a^Tx\le-b$. Uma igualdade pode ser escrita como duas desigualdades. [Ver a modelação](/cadeiras/da/programacao-linear/#modelar-em-três-passos).

Na forma padrão, acrescenta uma **variável de folga** a uma restrição $a^Tx\le b$ para obter $a^Tx+s=b$, $s\ge0$. O simplex trabalha com variáveis básicas e não básicas; uma solução básica inicial só é utilizável se for viável. Na **programação inteira**, exigir variáveis inteiras muda o problema: o ótimo da relaxação linear pode ser fracionário e dá apenas um limite para a formulação inteira. [Ver a passagem a inteiros](/cadeiras/da/programacao-linear/#o-salto-para-inteiros).
