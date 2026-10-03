---
title: Cheat sheet de DA
description: Condições, invariantes, recorrências e custos para rever os algoritmos da cadeira.
section: recursos
studyKind: revision
order: 1
---

No fim do percurso, esta folha responde que algoritmo usar e quanto custa, sem repetir as provas.

Nesta folha, $n=|V|$, ou seja o número de vértices, e $m=|E|$, ou seja o número de arestas, para grafos; noutras entradas, $n$ é o número de elementos. Os custos de grafos assumem listas de adjacência, salvo indicação. Segue a ligação quando precisares de derivar uma fórmula ou reconstruir uma solução.

## Escolher um algoritmo de grafos

| Problema                          | Método                                                                           | Condição                                           | Tempo                                                    |
| --------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| Menor número de arestas desde $s$ | [BFS](/cadeiras/da/grafos-percursos/#bfs-e-caminhos-sem-pesos)                   | Pesos ignorados ou iguais                          | $O(n+m)$                                                 |
| Percurso, ciclos dirigidos        | [DFS](/cadeiras/da/grafos-percursos/#dfs-tempos-e-ciclos)                        | Aresta para cinzento deteta ciclo dirigido         | $O(n+m)$                                                 |
| Ordenar dependências              | [Kahn/DFS](/cadeiras/da/grafos-percursos/#ordena%C3%A7%C3%A3o-topol%C3%B3gica)   | DAG; Kahn deve emitir todos                        | $O(n+m)$                                                 |
| Componentes fortemente conexas    | [Kosaraju/Tarjan](/cadeiras/da/grafos-percursos/#componentes-fortemente-conexas) | Grafo dirigido                                     | $O(n+m)$                                                 |
| MST                               | [Kruskal](/cadeiras/da/arvores-abrangentes/#kruskal)                             | Não dirigido; admite pesos negativos               | $O(m\log m+n)$                                           |
| MST                               | [Prim](/cadeiras/da/arvores-abrangentes/#prim)                                   | Não dirigido; reiniciar para floresta              | $O((n+m)\log n)$ com decreaseKey, ou $O(n^2)$ com matriz |
| Caminhos de uma origem            | [Dijkstra](/cadeiras/da/caminhos-minimos/#dijkstra)                              | Pesos não negativos                                | $O((n+m)\log n)$ com decreaseKey                         |
| Caminhos de uma origem            | [Bellman-Ford](/cadeiras/da/caminhos-minimos/#pesos-negativos-e-bellman-ford)    | Admite negativos; deteta ciclo negativo alcançável | $O(nm)$                                                  |
| Caminhos num DAG                  | [Ordem topológica](/cadeiras/da/caminhos-minimos/#caminhos-num-dag)              | Admite negativos, sem ciclos                       | $O(n+m)$                                                 |
| Todos os pares                    | [Floyd-Warshall](/cadeiras/da/caminhos-minimos/#floyd-warshall)                  | Diagonal negativa denuncia ciclo negativo          | $\Theta(n^3)$                                            |
| Todos os pares esparsos           | [Johnson](/cadeiras/da/caminhos-minimos/#johnson)                                | Sem ciclos negativos                               | $O(nm+n(n+m)\log n)$ com decreaseKey                     |
| Fluxo máximo                      | [Edmonds-Karp](/cadeiras/da/fluxo-maximo/#ford-fulkerson-e-edmonds-karp)         | Capacidade não negativa; BFS residual              | $O(nm^2)$                                                |
| Emparelhamento bipartido          | [Emparelhamento](/cadeiras/da/fluxo-maximo/#emparelhamento-bipartido)            | Capacidades 1; no máximo min(                      | L                                                        | ,   | R   | ) aumentos | $O(min( | L   | ,   | R   | )(n+m))$ |

A heap com entradas duplicadas em Dijkstra pode guardar $O(m)$ pares e custar $O(n+m\log(m+1))$. Não alteres uma chave dentro da heap sem a reorganizar. MST minimiza o custo total das ligações; uma árvore de caminhos mínimos minimiza distâncias desde uma raiz.

## Estados e certificados em grafos

- **BFS:** marcar ao inserir; fila por distância crescente. Pai reconstrói caminho; inalcançável não tem distância zero.
- **DFS:** branco, cinzento, preto. Num grafo não dirigido, não contar a própria aresta do pai como ciclo.
- **Kosaraju:** DFS completa em $G$, términos; DFS em $G^T$ por términos decrescentes.
- **Tarjan:** filho novo atualiza por `low[v]`; vizinho já na pilha atualiza por `index[v]`; vizinho fora da pilha não reduz `low`. Raiz quando `low[u] == index[u]`.
- **MST:** corte respeitado por $A$ não tem arestas de $A$ a atravessá-lo. A mais leve desse corte é segura se $A$ já pode ser completado para uma MST. Ser acíclica só não basta.
- **Bellman-Ford:** até $n-1$ passagens; uma passagem adicional com melhoria a partir de origem alcançável denuncia ciclo negativo.
- **Fluxo:** capacidade direta residual $c-f$, inversa $f$. Aumentar pelo menor residual do caminho. Sem caminho residual, alcançáveis de $s$ dão corte mínimo.

O valor do fluxo é saída líquida de $s$. A capacidade de um corte soma só as arestas de $S$ para $T$. Um fluxo e um corte com o mesmo valor certificam otimalidade.

## Caminhos e transformações

Relaxação: se $d[u]$ é finito e $d[u]+w(u,v)<d[v]$, atualizar distância e predecessor.

[Floyd-Warshall](/cadeiras/da/caminhos-minimos/#floyd-warshall):

$$D^{(k)}[i,j]=\min(D^{(k-1)}[i,j],D^{(k-1)}[i,k]+D^{(k-1)}[k,j]).$$

$k$ é o ciclo exterior. Guarda `next[i][j]` para reconstruir. Se um ciclo negativo é alcançável de $i$ e alcança $j$, esse par não tem mínimo finito.

[Johnson](/cadeiras/da/caminhos-minimos/#johnson): acrescentar origem com arestas zero, calcular $h$ por Bellman-Ford, usar $w'=w+h(u)-h(v)$ e recuperar $\delta(s,t)=\delta'(s,t)-h(s)+h(t)$. Somar uma constante a todas as arestas não preserva caminhos mínimos.

[Emparelhamento bipartido](/cadeiras/da/fluxo-maximo/#emparelhamento-bipartido): $s\to L\to R\to t$, capacidades 1. Fluxo inteiro corresponde a arestas escolhidas sem extremos repetidos. Máximo é maior cardinalidade; maximal só significa não poder acrescentar uma aresta diretamente.

## Técnicas e provas

| Técnica                                                                                               | O que justificar                                                 | Exemplos                                                         |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| [Força bruta](/cadeiras/da/forca-bruta/)                                                              | Todos os candidatos aparecem; validade antes de comparar         | Subconjuntos, intervalos, TSP                                    |
| [Guloso](/cadeiras/da/algoritmos-gulosos/)                                                            | Existe ótimo com a escolha local; subproblema conserva estrutura | Fim mais cedo, densidade fracionária, duração crescente, Huffman |
| [Divisão e conquista](/cadeiras/da/divisao-conquista/)                                                | Partição dos casos e combinação correta                          | Merge sort, cruzamento no subvetor máximo                        |
| [Programação dinâmica](/cadeiras/da/programacao-dinamica/)                                            | Estado suficiente, base, alternativas e dependências             | Mochila, trocos, LCS, edição                                     |
| [Retrocesso](/cadeiras/da/retrocesso-ramificacao/)                                                    | Nenhuma continuação válida no ramo podado                        | Excesso com positivos, restrições de rainhas                     |
| [Branch and bound](/cadeiras/da/retrocesso-ramificacao/#branch-and-bound-dire%C3%A7%C3%A3o-do-limite) | Limite otimista para todas as continuações                       | Relaxação fracionária ou LP                                      |

Para maximizar: incumbente é limite inferior, nó tem limite superior; podar $U\le L$ para um ótimo. Para minimizar: incumbente é limite superior, nó tem limite inferior; podar quando este não melhora o incumbente. Para listar todos os ótimos, conservar empates.

## Recorrências de custo

[Teorema mestre](/cadeiras/da/divisao-conquista/#teorema-mestre), $T(n)=aT(n/b)+f(n)$, $a\ge1$, $b>1$ constantes:

| Trabalho fora das chamadas                                    | Solução                     |
| ------------------------------------------------------------- | --------------------------- |
| $O(n^{\log_ba-\varepsilon})$, $\varepsilon>0$                 | $\Theta(n^{\log_ba})$       |
| $\Theta(n^{\log_ba})$                                         | $\Theta(n^{\log_ba}\log n)$ |
| $\Omega(n^{\log_ba+\varepsilon})$ e $af(n/b)\le cf(n)$, $c<1$ | $\Theta(f(n))$              |

Hanoi: $H(n)=2H(n-1)+1=2^n-1$, fora deste formato. Exponenciação por quadrados: uma chamada de expoente metade, $O(\log(k+1))$ multiplicações. Máscaras com somas recalculadas: $\Theta(n2^n)$; recursão binária com totais incrementais: $\Theta(2^n)$ antes de cópias. TSP dirigido com origem fixa: $(n-1)!$ ordens candidatas, custo direto $\Theta(n!)$.

## Estados de programação dinâmica

| Problema                                                                       | Estado e transição                                                       | Custo                             |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | --------------------------------- |
| Mochila 0-1                                                                    | $F[i,w]=\max(F[i-1,w],v_i+F[i-1,w-p_i])$ se cabe; caso contrário excluir | $O(nW)$                           |
| Trocos ilimitados                                                              | $C[i,t]=\min(C[i-1,t],1+C[i,t-c_i])$                                     | $O(nT)$                           |
| Trocos limitados                                                               | $\min_q(q+C[i-1,t-qc_i])$, $q\le s_i$                                    | $O(nTS)$ direto                   |
| Soma de subconjuntos                                                           | Excluir OU incluir a partir da linha anterior                            | $O(nT)$                           |
| Subvetor não vazio                                                             | $E[i]=\max(A[i],E[i-1]+A[i])$; máximo sobre $i$                          | $O(n)$                            |
| [LCS](/cadeiras/da/sequencias-dinamica/#subsequ%C3%AAncia-comum-mais-longa)    | Iguais: diagonal +1; diferentes: máximo de cima e esquerda               | $O(\lvert X\rvert\lvert Y\rvert)$ |
| [Edição](/cadeiras/da/sequencias-dinamica/#dist%C3%A2ncia-de-edi%C3%A7%C3%A3o) | Mínimo de remover, inserir, manter/substituir                            | $O(\lvert X\rvert\lvert Y\rvert)$ |
| [Matrizes](/cadeiras/da/sequencias-dinamica/#cadeia-de-matrizes)               | $M[i,j]=\min_k(M[i,k]+M[k+1,j]+p_{i-1}p_kp_j)$                           | $O(n^3)$                          |
| [CYK](/cadeiras/da/linguagens-dinamica/#cyk-e-forma-normal-de-chomsky)         | Não-terminais por segmento; todas as divisões e produções binárias       | $O(n^3\lvert P\rvert)$ direto     |

Bases: mochila zero; trocos alvo zero com zero moedas e alvo positivo sem moedas com infinito; LCS prefixo vazio zero; edição prefixo vazio custa o comprimento do outro. Reconstruir exige pais, decisões ou divisões. Reduzir memória pode eliminar essa informação.

$O(nW)$ e $O(nT)$ são pseudopolinomiais quando capacidade/alvo estão codificados em binário. Vários não-terminais numa célula CYK não provam ambiguidade; é preciso mais de uma árvore a partir do inicial.

[Kleene](/cadeiras/da/linguagens-dinamica/#constru%C3%A7%C3%A3o-de-kleene):

$$R_{ij}^{(k)}=R_{ij}^{(k-1)}\mid R_{ik}^{(k-1)}(R_{kk}^{(k-1)})^*R_{kj}^{(k-1)}.$$

Inicializar transições diretas e $\varepsilon$ na diagonal; união até aos estados finais. $O(n^3)$ combinações não limita o tamanho do texto expandido.

## Complexidade e aproximação

[Classes e reduções](/cadeiras/da/complexidade-aproximacao/#decis%C3%A3o-certificados-e-classes): P resolve em tempo polinomial; NP verifica certificado polinomial. [Autorredução](/cadeiras/da/complexidade-aproximacao/#autorredu%C3%A7%C3%A3o-do-decisor-%C3%A0-solu%C3%A7%C3%A3o): n chamadas ao decisor recuperam a solução. [Aproximações](/cadeiras/da/aproximacao-garantias/): cobertura 2, mochila 2, TSP métrico 2, conjuntos H_d. NP-completo = NP e NP-difícil. $A\le_p B$ transforma A em B, logo um solver de B resolve A. Para provar dificuldade de B, reduzir um problema difícil **para B**.

[Três cores](/cadeiras/da/complexidade-aproximacao/#de-3-sat-para-tr%C3%AAs-cores): vértices $x,\neg x$ ligados entre si e a $B$ codificam valores opostos. Dispositivo de cláusula admite coloração se e só se algum literal é verdadeiro. $\omega(G)\le\chi(G)\le\Delta(G)+1$, com $\omega$ o tamanho da maior clique e $\Delta$ o maior grau; o limite superior vale para grafos simples.

| Aproximação                                                | Garantia      | Hipótese decisiva                                                    |
| ---------------------------------------------------------- | ------------- | -------------------------------------------------------------------- |
| Cobertura: dois extremos de cada aresta escolhida          | $C\le2OPT$    | Arestas escolhidas formam emparelhamento                             |
| Mochila: melhor entre prefixo por densidade e maior objeto | $C\ge OPT/2$  | Descartar objetos que não cabem; limite fracionário                  |
| TSP: duplicar MST e atalhar                                | $C\le2OPT$    | Completo, não dirigido, pesos não negativos, desigualdade triangular |
| Cobertura de conjuntos por maior ganho                     | $C\le H_dOPT$ | Custos unitários e universo coberto pela família                     |

Um PTAS é polinomial na entrada para precisão fixa; um FPTAS também é polinomial em $1/\varepsilon$. Heurística não implica garantia.

## LP e ILP

[LP](/cadeiras/da/programacao-linear/): $\max c^Tx$, $Ax\le b$, $x\ge0$. Forma slack acrescenta folgas. Simplex escolhe entrada que melhora, saída pela menor razão válida, substitui em todas as equações. Sem limite para uma entrada que melhora: objetivo ilimitado. Base inicial com folga negativa exige fase I, não prova inviabilidade. Degenerescência pode dar ciclos; Bland evita-os.

Dual: $\min b^Ty$, $A^Ty\ge c$, $y\ge0$. Admissíveis primal e dual com objetivos iguais certificam o ótimo. Região ilimitada pode ter ótimo finito.

[ILP](/cadeiras/da/programacao-inteira/): relaxação LP dá limite superior em maximização e inferior em minimização. Ramificar variável fracionária $a$ em $x\le\lfloor a\rfloor$ e $x\ge\lceil a\rceil$. Corte deve conservar todos os inteiros. Arredondar coordenadas não garante viabilidade nem otimalidade.

Corte de Gomory, para linha puramente inteira e variáveis não negativas: $x_B+\sum a_jx_j=b$ dá $\sum\{a_j\}x_j\ge\{b\}$, com $\{r\}=r-\lfloor r\rfloor$.
