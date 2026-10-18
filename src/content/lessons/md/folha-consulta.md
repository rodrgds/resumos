---
title: Cheat sheet de MD
description: Fórmulas, condições e escolhas de método para os dois blocos de Matemática Discreta.
section: recursos
studyKind: revision
---

Consulta rápida antes de resolver exercícios. Cada entrada indica a condição exata e o erro que a invalida; os exemplos completos estão nas secções ligadas.

## Lógica e dedução

| Tarefa                         | Método e condição                                                                                                                                                                                                                                                           | Erro que invalida                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Refutar $\Gamma\models\varphi$ | Atribuição ou estrutura com **todas** as premissas verdadeiras e conclusão falsa                                                                                                                                                                                            | Conclusão falsa com alguma premissa falsa                               |
| FND                            | Uma conjunção por linha verdadeira; sinal que a torna verdadeira                                                                                                                                                                                                            | Trocar sinais com a FNC                                                 |
| FNC                            | Uma disjunção por linha falsa; sinal que a torna falsa                                                                                                                                                                                                                      | Cláusulas satisfazíveis não garantem conjunção satisfazível             |
| Recíproca e inversa            | $q\to p$ e $\neg p\to\neg q$; não equivalem à original                                                                                                                                                                                                                      | Afirmar o consequente                                                   |
| Contrapositiva                 | $\neg q\to\neg p$; equivale à original                                                                                                                                                                                                                                      | Confundir com a recíproca                                               |
| Karnaugh                       | Colunas em Gray, bordas opostas vizinhas; agrupa uns em $1,2,4,8$; cada grupo elimina literais que mudam; termo incompleto cobre várias linhas                                                                                                                              | Tomar termo incompleto por mintermo de uma linha                        |
| Simplificada                   | No exemplo de [Karnaugh](/cadeiras/md/logica-proposicional/#circuitos-mapas-de-karnaugh-e-portas-nand), $\neg B\lor(A\land\neg C)$ usa 2 NOT, 1 AND e 1 OR binários; a expressão original usa 4 NOT, 4 AND e 2 OR; a FND desse exemplo sem partilha usa 6 NOT, 5 AND e 3 OR | Contar portas da FND como se fosse a fórmula original                   |
| NAND                           | $P\uparrow Q=\neg(P\land Q)$; resultado explícito $B\uparrow(A\uparrow(C\uparrow C))$ com 3 NAND binários; NOR análogo                                                                                                                                                      | Terminar em $\neg$ e $\land$ com receita verbal em vez da forma só NAND |
| Fitch                          | $\varphi\to\psi$: assume $\varphi$, obtém $\psi$. $\neg\varphi$: assume $\varphi$, obtém $F$. $\lor E$: ambos os casos na mesma conclusão                                                                                                                                   | Usar linha de caixa fechada ou de caixa irmã                            |

$p\to q\Leftrightarrow\neg p\lor q$; só é falsa com $p=T,q=F$. Monotonia: $\Gamma\subseteq\Sigma$ e $\Gamma\models\theta$ dão $\Sigma\models\theta$; retirar premissas pode perder a consequência.

[Formas normais](/cadeiras/md/logica-proposicional/#formas-normais) e [regras de dedução](/cadeiras/md/provas-proposicionais/#regras-básicas).

## Primeira ordem

| Tarefa               | Forma ou condição                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Todos os $P$ são $Q$ | $\forall x(P(x)\to Q(x))$                                                                                            |
| Algum $P$ é $Q$      | $\exists x(P(x)\land Q(x))$                                                                                          |
| Negar quantificador  | $\neg\forall x\varphi\Leftrightarrow\exists x\neg\varphi$; $\neg\exists x\varphi\Leftrightarrow\forall x\neg\varphi$ |
| Ordem                | $\forall x\exists y$: testemunha por $x$. $\exists y\forall x$: testemunha comum                                     |
| Estrutura            | Domínio não vazio; interpreta todos os símbolos; livres pela atribuição                                              |
| Substituição         | Só ocorrências livres; sem capturar variáveis do termo                                                               |
| Prenexa              | Elimina implicações, transporta negações, renomeia ligadas, só depois transporta quantificadores                     |
| $\forall I$          | Objeto arbitrário, sem dependência especial                                                                          |
| $\exists E$          | Testemunha nova em caixa; sem sair livre na conclusão nem nas hipóteses abertas                                      |

[Substituição](/cadeiras/md/quantificadores/#substituição-sem-captura), [prenexa](/cadeiras/md/semantica-primeira-ordem/#forma-normal-prenexa) e [dedução](/cadeiras/md/provas-primeira-ordem/#rever-uma-dedução).

## Inteiros

| Tarefa             | Condição                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| Divisão            | $a=bq+r$, $b\ne0$, $0\le r<\|b\|$, mesmo para $a<0$                                                       |
| Euclides           | $\gcd(a,b)=\gcd(b,r)$; restos estritamente decrescentes                                                   |
| Bézout             | $d=ua+vb$ com $u,v\in\mathbb Z$; coeficientes podem ser negativos                                         |
| Congruência        | $a\equiv_n b\iff n\mid(a-b)$, $n>0$; soma e produto preservam                                             |
| Cancelar $c$       | $d=\gcd(c,n)$: $ca\equiv_n cb$ dá $a\equiv_{n/d}b$; módulo original só se $d=1$                           |
| $ax\equiv_n b$     | Solução se e só se $d=\gcd(a,n)\mid b$; resolve módulo $n/d$, levanta para $d$ classes                    |
| $ax+by=c$, $a,b>0$ | Solução inteira se e só se $d=\gcd(a,b)\mid c$; $x=x_0+(b/d)t$, $y=y_0-(a/d)t$; naturais exigem $x,y\ge0$ |
| Fermat             | $a^{p-1}\equiv_p1$ exige $p$ primo e $p\nmid a$                                                           |

[Euclides e Bézout](/cadeiras/md/inteiros-congruencias/#identidade-de-bézout) e [congruências](/cadeiras/md/inteiros-congruencias/#resolver-congruências-lineares).

## Conjuntos, relações, ordens e funções

| Tarefa                 | Condição ou erro                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| $A=B$                  | Duas inclusões ou equivalência de pertença de elemento arbitrário                                              |
| Cardinalidades finitas | $\|\mathcal P(A)\|=2^{\|A\|}$; $\|A\times B\|=\|A\|\|B\|$; $\|A\cup B\|=\|A\|+\|B\|-\|A\cap B\|$               |
| $\emptyset$            | $\emptyset\subseteq A$ sempre; $\emptyset\in A$ só se for elemento                                             |
| Composição             | $a(S\circ R)c\iff\exists b(aRb\land bSc)$: primeiro $R$                                                        |
| Fechos                 | $R^+$: passeios positivos; $R^*=R^+\cup\operatorname{id}$; ciclo pode pôr laços em $R^+$                       |
| Equivalência           | Reflexiva, simétrica e transitiva                                                                              |
| Ordem parcial          | Reflexiva, antissimétrica e transitiva; simétrica e antissimétrica podem coexistir                             |
| Minimal e mínimo       | Minimal: nenhum distinto abaixo. Mínimo: abaixo de todos; único se existir                                     |
| Ínfimo e supremo       | Maior minorante e menor majorante **no conjunto ambiente**                                                     |
| Restrição de Hasse     | Conserva comparações e recalcula coberturas; apagar vértices do desenho perde-as                               |
| Partes e diferença     | $\mathcal P(A\setminus B)$ contém sempre $\emptyset$; $\mathcal P(A)\setminus\mathcal P(B)$ nunca              |
| Função                 | Total e funcional. Injetiva: imagens iguais dão origens iguais. Sobrejetiva: atinge todo o contradomínio       |
| Inversa                | $B\to A$ é função se e só se $f:A\to B$ é bijetiva                                                             |
| Fibras                 | Para $f$ total, $R=f^{-1}\circ f$ é equivalência; classes são fibras não vazias; no finito, $\|A/R\|=\|f(A)\|$ |

[Conjuntos](/cadeiras/md/conjuntos-relacoes/#provar-uma-identidade), [relações](/cadeiras/md/operacoes-relacoes/#fechos), [Hasse](/cadeiras/md/ordens-funcoes/#diagramas-de-hasse-e-elementos-especiais) e [funções](/cadeiras/md/funcoes-cardinalidade/#injetiva-sobrejetiva-e-bijetiva).

## Grafos

| Tarefa        | Condição                                                                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Soma de graus | Simples não dirigido: $\sum_v\deg(v)=2m$; graus ímpares em número par                                                                                           |
| Floresta      | $n$ vértices e $c$ componentes: $m=n-c$                                                                                                                         |
| Euler         | A parte com arestas é conexa; zero ímpares para circuito, dois para trilho aberto; ignora isolados                                                              |
| Hamilton      | Visita os vértices uma vez; sem critério de paridade; uma articulação impede o ciclo                                                                            |
| Bipartido     | Sem ciclos ímpares; um ciclo alterna as partes em igual número                                                                                                  |
| Planar        | $v$ vértices, $e$ arestas, $f$ faces, $c$ componentes: $v-e+f=1+c$; simples com $v\ge3$: $e\le3v-6$, bipartido $e\le2v-4$; limites necessários, não suficientes |
| Coloração     | $\omega(G)\le\chi(G)\le\Delta(G)+1$; para $\chi=k$, exclui $k-1$ e exibe coloração com $k$                                                                      |
| Isomorfismo   | Uma bijeção que preserva a adjacência nos dois sentidos; graus iguais não bastam                                                                                |

[Grafos](/cadeiras/md/grafos/#isomorfismos) e [critérios de percursos e planaridade](/cadeiras/md/euler-hamilton-coloracao/#trilhos-e-circuitos-de-euler).

## Indução e recorrências

1. Simples: base $P(n_0)$; assume $P(k)$ com $k\ge n_0$ arbitrário; prova $P(k+1)$. Forte: assume todos os casos até $k$. Passo que recua $d$: uma base por resto módulo $d$.
2. Estrutural: um caso por construtor. Listas: `[]` e $x:xs$ com hipótese sobre $xs$.
3. $a_n=ra_{n-1}+b$: $a_n=r^na_0+b\sum_{j=0}^{n-1}r^j$; $r=1$ dá $a_0+nb$.
4. $a_n=ua_{n-1}+va_{n-2}$: $t^2-ut-v$. Distintas não nulas: $Ar_1^n+Br_2^n$. Dupla não nula: $(A+Bn)r^n$. Constantes pelas condições iniciais.
5. Correção de ordenação: ordenação **e** conservação das multiplicidades.

[Indução](/cadeiras/md/inducao-recorrencia/#indução-forte), [recorrências](/cadeiras/md/inducao-recorrencia/#equação-característica) e [provas de listas](/cadeiras/md/inducao-estrutural/#indução-sobre-listas-finitas).
