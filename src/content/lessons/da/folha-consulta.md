---
title: Cheat sheet de DA
description: Condições, invariantes, recorrências e custos para rever os algoritmos da cadeira.
section: recursos
studyKind: revision
order: 1
---

Em grafos, $n=|V|$ conta vértices e $m=|E|$ conta arestas. Noutras entradas, $n$ conta elementos. Custos de grafos assumem listas de adjacência. Cada secção liga à explicação completa para derivar fórmulas e reconstruir soluções.

## Qual algoritmo de grafos

| Objetivo                    | Usa                                                                                 | Só se                                                             | Custo                                             |
| --------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------- |
| Menos arestas desde $s$     | [BFS](/cadeiras/da/grafos-percursos/#bfs-e-caminhos-sem-pesos)                      | Pesos iguais ou ignorados                                         | $O(n+m)$                                          |
| Explorar e ciclos dirigidos | [DFS](/cadeiras/da/grafos-percursos/#dfs-tempos-e-ciclos)                           | Cinzento indica ciclo                                             | $O(n+m)$                                          |
| Ordenar dependências        | [Kahn ou DFS](/cadeiras/da/grafos-percursos/#ordena%C3%A7%C3%A3o-topol%C3%B3gica)   | DAG; Kahn emite $n$                                               | $O(n+m)$                                          |
| Regiões mútuas              | [Kosaraju ou Tarjan](/cadeiras/da/grafos-percursos/#componentes-fortemente-conexas) | Dirigido                                                          | $O(n+m)$                                          |
| Ligar tudo pelo mínimo      | [Kruskal](/cadeiras/da/arvores-abrangentes/#kruskal)                                | Não dirigido; negativos permitidos                                | $O(m\log m+n)$                                    |
| Ligar tudo pelo mínimo      | [Prim](/cadeiras/da/arvores-abrangentes/#prim)                                      | Não dirigido; reinicia por componente                             | $O((n+m)\log n)$, denso $O(n^2)$                  |
| Uma origem, sem negativos   | [Dijkstra](/cadeiras/da/caminhos-minimos/#dijkstra)                                 | Pesos não negativos                                               | $O((n+m)\log n)$                                  |
| Uma origem, com negativos   | [Bellman-Ford](/cadeiras/da/caminhos-minimos/#pesos-negativos-e-bellman-ford)       | Deteta ciclo negativo alcançável                                  | $O(nm)$                                           |
| Uma origem em DAG           | [Ordem topológica](/cadeiras/da/caminhos-minimos/#caminhos-num-dag)                 | Sem ciclos; admite negativos                                      | $O(n+m)$                                          |
| Todos os pares, denso       | [Floyd-Warshall](/cadeiras/da/caminhos-minimos/#floyd-warshall)                     | Diagonal negativa denuncia ciclo                                  | $\Theta(n^3)$                                     |
| Todos os pares, esparso     | [Johnson](/cadeiras/da/caminhos-minimos/#johnson)                                   | Sem ciclos negativos                                              | $O(nm+n(n+m)\log n)$                              |
| Fluxo máximo                | [Edmonds-Karp](/cadeiras/da/fluxo-maximo/#ford-fulkerson-e-edmonds-karp)            | Capacidades não negativas; BFS residual                           | $O(nm^2)$                                         |
| Emparelhar bipartido        | [Emparelhamento](/cadeiras/da/fluxo-maximo/#emparelhamento-bipartido)               | Capacidades 1; até $\min(\lvert L\rvert,\lvert R\rvert)$ aumentos | $O((\min(\lvert L\rvert,\lvert R\rvert)+1)(n+m))$ |

Heap com duplicados em Dijkstra guarda $O(m)$ pares e custa $O(n+m\log(m+1))$. Nunca alteres chave na heap sem reorganizar. MST minimiza soma total; árvore de Dijkstra minimiza distâncias à raiz.

## Invariantes que decidem

- **BFS:** marca cada vértice quando o insere na fila, e a fila sai por ordem de distância. O vetor de pais reconstrói o caminho; um vértice inalcançável mantém distância desconhecida, nunca zero.
- **DFS:** cada vértice está branco (por descobrir), cinzento (chamada ativa) ou preto (chamada terminada). Num grafo não dirigido, a aresta de regresso ao pai não conta como ciclo.
- **Kosaraju:** primeira DFS completa guarda términos; segunda em $G^T$ por término decrescente.
- **Tarjan:** ao seguir a aresta $u\to v$, se $v$ ainda não foi visitado, explora e propaga `low[v]`; se $v$ está na pilha, atualiza com `index[v]`; se $v$ já saiu da pilha, ignora porque pertence a uma componente fechada. Quando `low[u]==index[u]`, desempilha até $u$ e fecha uma componente.
- **Corte MST:** $A$ respeita corte sem o atravessar; mais leve é segura. Acíclico só não chega.
- **Bellman-Ford:** após $n-1$ passagens, todos os caminhos com até $n-1$ arestas já foram contemplados; se uma passagem extra ainda melhora um vértice alcançável desde a origem, há um ciclo negativo alcançável.
- **Fluxo:** residual direta $c-f$, inversa $f$; aumenta pelo gargalo. Sem caminho, alcançáveis de $s$ dão corte mínimo.
- **Valor e corte:** fluxo é saída líquida de $s$; corte soma só $S\to T$. Igualdade certifica ótimo, sem provar unicidade.

## Relaxação e transformações

Relaxa $u\to v$ quando $d[u]$ finito e $d[u]+w<d[v]$; atualiza distância e predecessor.

[Floyd-Warshall](/cadeiras/da/caminhos-minimos/#floyd-warshall): $k$ exterior.

$$D^{(k)}[i,j]=\min(D^{(k-1)}[i,j],D^{(k-1)}[i,k]+D^{(k-1)}[k,j]).$$

Guarda `next[i][j]` com primeiro passo. Par com $i\leadsto k\leadsto j$ em ciclo negativo sem mínimo finito.

[Johnson](/cadeiras/da/caminhos-minimos/#johnson): origem $q$ com zeros, $h$ por Bellman-Ford, $w'=w+h(u)-h(v)$, recupera $\delta(s,t)=\delta'(s,t)-h(s)+h(t)$. Somar constante a todas as arestas não preserva mínimos.

[Emparelhamento](/cadeiras/da/fluxo-maximo/#emparelhamento-bipartido): $s\to L\to R\to t$ com capacidade 1. Fluxo inteiro equivale a arestas sem extremos repetidos. O emparelhamento máximo tem a maior cardinalidade possível no grafo; um emparelhamento maximal só resiste a acrescentar mais uma aresta, mas pode não ser máximo. Com dois vértices de cada lado e uma só aresta, o máximo é 1, enquanto $\min(\lvert L\rvert,\lvert R\rvert)=2$ é apenas um limite superior.

## Técnica e justificação

| Técnica                                                                                               | Prova que                                         | Exemplos                          |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------- |
| [Força bruta](/cadeiras/da/forca-bruta/)                                                              | Enumera tudo; valida antes de comparar            | Subconjuntos, intervalos, TSP     |
| [Guloso](/cadeiras/da/algoritmos-gulosos/)                                                            | Ótimo com escolha local; resto conserva estrutura | Fim mais cedo, densidade, Huffman |
| [Divisão](/cadeiras/da/divisao-conquista/)                                                            | Partição cobre casos; combinação reconstrói       | Merge, cruzamento, Hanoi          |
| [DP](/cadeiras/da/programacao-dinamica/)                                                              | Estado suficiente; base e dependências            | Mochila, trocos, LCS, edição      |
| [Retrocesso](/cadeiras/da/retrocesso-ramificacao/)                                                    | Ramo podado sem válida possível                   | Excesso com positivos, rainhas    |
| [Branch and bound](/cadeiras/da/retrocesso-ramificacao/#branch-and-bound-dire%C3%A7%C3%A3o-do-limite) | Limite otimista para continuações                 | Fracionária ou LP                 |

Maximizar: incumbente é piso, nó tem teto; poda $U\le L$. Minimizar: incumbente é teto, nó tem piso; poda sem melhoria. Para listar ótimos, conserva empates.

## Recorrências

[Teorema mestre](/cadeiras/da/divisao-conquista/#teorema-mestre), $T(n)=aT(n/b)+f(n)$ com $a\ge1$, $b>1$ e $\varepsilon>0$. No caso 3, a regularidade $af(n/b)\le cf(n)$ vale para alguma constante $c<1$ e $n$ suficientemente grande:

| Fora das chamadas                                        | Solução                     |
| -------------------------------------------------------- | --------------------------- |
| $O(n^{\log_ba-\varepsilon})$                             | $\Theta(n^{\log_ba})$       |
| $\Theta(n^{\log_ba})$                                    | $\Theta(n^{\log_ba}\log n)$ |
| $\Omega(n^{\log_ba+\varepsilon})$ com $af(n/b)\le cf(n)$ | $\Theta(f(n))$              |

Hanoi $H(n)=2H(n-1)+1=2^n-1$ fora do formato. Quadrados: $O(\log(k+1))$ multiplicações. Máscaras com somas por máscara $\Theta(n2^n)$; com acumulados $\Theta(2^n)$. TSP com origem fixa $(n-1)!$ ordens, $\Theta(n!)$. Coloração com $k$ rótulos $k^n$, não $k!$. Clique $k$ exige $k$ cores; coloração $k$ mostra que chegam.

## Estados de DP

| Problema                                                                       | Transição                                                               | Custo                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | --------------------------------- |
| Mochila 0-1 ($p_i$ peso, $v_i$ valor, $W$ capacidade)                          | $F[i,w]=F[i-1,w]$ se $p_i>w$; senão $\max(F[i-1,w],v_i+F[i-1,w-p_i])$   | $O(nW)$                           |
| Trocos ilimitados ($c_i$ facial, $T$ alvo)                                     | $C[i,t]=\min(C[i-1,t],1+C[i,t-c_i])$; ignora a segunda se $t<c_i$       | $O(nT)$                           |
| Trocos com stock ($s_i$ stock, $S$ máximo)                                     | $\min_q(q+C[i-1,t-qc_i])$ com $0\le q\le\min(s_i,\lfloor t/c_i\rfloor)$ | $O(nT(S+1))$                      |
| Soma ($B[i,t]$ existência)                                                     | $B[i,t]=B[i-1,t]\lor(t\ge a_i\land B[i-1,t-a_i])$                       | $O(nT)$                           |
| Subvetor ($E[i]$ melhor terminado em $i$)                                      | $E[i]=\max(A[i],E[i-1]+A[i])$, $E[0]=A[0]$; resposta é o máximo global  | $O(n)$                            |
| [LCS](/cadeiras/da/sequencias-dinamica/#subsequ%C3%AAncia-comum-mais-longa)    | Iguais diagonal $+1$; senão máximo                                      | $O(\lvert X\rvert\lvert Y\rvert)$ |
| [Edição](/cadeiras/da/sequencias-dinamica/#dist%C3%A2ncia-de-edi%C3%A7%C3%A3o) | Mínimo de remover, inserir, manter e trocar                             | $O(\lvert X\rvert\lvert Y\rvert)$ |
| [Matrizes](/cadeiras/da/sequencias-dinamica/#cadeia-de-matrizes)               | $M[i,j]=\min_k(M[i,k]+M[k+1,j]+p_{i-1}p_kp_j)$                          | $O(n^3)$                          |
| [CYK](/cadeiras/da/linguagens-dinamica/#cyk-e-forma-normal-de-chomsky)         | Não-terminais por segmento e divisão                                    | $O(n^3\lvert P\rvert)$            |

Bases: mochila zero; trocos com zero e infinito; LCS zero; edição com comprimentos. Sem pais não há reconstrução. $O(nW)$ e $O(nT)$ pseudopolinomiais em binário. Vários símbolos em CYK não provam ambiguidade.

[Kleene](/cadeiras/da/linguagens-dinamica/#constru%C3%A7%C3%A3o-de-kleene): $R_{ij}^{(k)}=R_{ij}^{(k-1)}\mid R_{ik}^{(k-1)}(R_{kk}^{(k-1)})^*R_{kj}^{(k-1)}$. Inicia diretas e $\varepsilon$ na diagonal; une até finais.

## Complexidade e garantias

P resolve em polinomial; NP verifica certificado polinomial. [Autorredução](/cadeiras/da/complexidade-aproximacao/#autorredu%C3%A7%C3%A3o-do-decisor-%C3%A0-solu%C3%A7%C3%A3o) usa até $n$ chamadas ao decisor. $A\le_pB$ transforma $A$ em $B$; para provar $B$ difícil, reduz difícil **para $B$**. NP-completo é NP e NP-difícil.

[Três cores](/cadeiras/da/complexidade-aproximacao/#de-3-sat-para-tr%C3%AAs-cores): $x,\neg x$ com $B$ codificam opostos; dispositivo admite se algum literal verdadeiro. $\omega(G)\le\chi(G)\le\Delta(G)+1$ em simples.

| Aproximação                 | Garantia      | Condição                                                                              |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------- |
| Cobertura por dois extremos | $C\le2OPT$    | Repetir até não haver aresta descoberta; escolhidas formam emparelhamento maximal     |
| Mochila por prefixo e maior | $C\ge OPT/2$  | Descarta objeto que não cabe; compara prefixo por densidade com melhor objeto isolado |
| TSP por MST duplicada       | $C\le2OPT$    | Completo, simétrico, não negativos, triangular                                        |
| Conjuntos por ganho         | $C\le H_dOPT$ | $d$ é o tamanho do maior conjunto; $H_d=1+1/2+\dots+1/d$                              |

PTAS polinomial na entrada para precisão fixa; FPTAS também em $1/\varepsilon$. Heurística sem prova não é garantia. Somar $M$ por aresta conserva ótimos de TSP mas muda razões.

## LP e ILP

[LP](/cadeiras/da/programacao-linear/): $\max c^Tx$, $Ax\le b$, $x\ge0$. Slack para igualdades. No simplex, entra a variável com custo reduzido que melhora o objetivo e sai a restrição que primeiro limita essa entrada pela menor razão válida; depois substitui em todas as equações. Se a variável que melhora não tem limite em nenhuma restrição, o objetivo é ilimitado. Folga negativa inicial exige fase I. Bland evita ciclos.

Dual $\min b^Ty$, $A^Ty\ge c$, $y\ge0$. Admissíveis com mesmo valor certificam ótimo. Região ilimitada pode ter ótimo finito.

[ILP](/cadeiras/da/programacao-inteira/): relaxação dá teto em max e piso em min. Ramifica $a$ em $x\le\lfloor a\rfloor$ e $x\ge\lceil a\rceil$. Cada corte conserva todos os pontos inteiros e exclui a solução fracionária atual. Arredondar a solução fracionária pode sair do poliedro ou piorar o objetivo.

Gomory para uma linha do tableau cuja variável básica $x_B$ é inteira e todas as variáveis da linha são inteiras e não negativas: $x_B+\sum a_jx_j=b$ dá $\sum\{a_j\}x_j\ge\{b\}$, com $\{r\}=r-\lfloor r\rfloor$. Se algum $a_j$ for fracionário por natureza contínua, não há corte fracionário garantido.
