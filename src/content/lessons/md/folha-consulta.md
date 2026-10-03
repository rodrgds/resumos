---
title: Cheat sheet de MD
description: Fórmulas, condições e escolhas de método para os dois blocos de Matemática Discreta.
section: recursos
studyKind: revision
---

Usa esta página para rever antes de resolver exercícios. Cada linha resume um conceito já ensinado nas lições e aponta para a secção onde está o exemplo completo.

## Lógica e dedução

- $p\to q\Leftrightarrow\neg p\lor q\Leftrightarrow\neg q\to\neg p$. Só é falsa com $p=T,q=F$.
- De Morgan: $\neg(p\land q)\Leftrightarrow\neg p\lor\neg q$; $\neg(p\lor q)\Leftrightarrow\neg p\land\neg q$.
- Refutar $\Gamma\models\varphi$: uma atribuição ou estrutura torna **todas** as premissas verdadeiras e a conclusão falsa.
- FND: uma conjunção por linha verdadeira. FNC: uma disjunção por linha falsa. Literais têm sinais que fazem a conjunção verdadeira ou a cláusula falsa nessa linha.
- Fitch: para $\varphi\to\psi$, assume $\varphi$ e obtém $\psi$; para $\neg\varphi$, assume $\varphi$ e obtém F. Em $\lor E$, os dois casos terminam na mesma conclusão. Uma caixa fechada deixa de estar acessível.

[Formas normais](/cadeiras/md/logica-proposicional/#formas-normais) e [regras de dedução](/cadeiras/md/provas-proposicionais/#regras-básicas).

## Primeira ordem

- Todos os $P$ são $Q$: $\forall x(P(x)\to Q(x))$. Algum $P$ é $Q$: $\exists x(P(x)\land Q(x))$.
- $\neg\forall x\varphi\Leftrightarrow\exists x\neg\varphi$; $\neg\exists x\varphi\Leftrightarrow\forall x\neg\varphi$.
- $\forall x\exists y$ permite uma testemunha por $x$; $\exists y\forall x$ exige uma testemunha comum.
- Uma estrutura tem domínio não vazio e interpreta todos os símbolos. As variáveis livres recebem valores pela atribuição.
- Substituição: troca só ocorrências livres e impede a captura das variáveis do termo. Prenexa: elimina implicações, transporta negações, renomeia variáveis ligadas e só depois transporta quantificadores.
- $\forall I$: objeto arbitrário, sem depender de hipóteses especiais. $\exists E$: testemunha nova, dentro de uma caixa, sem sair livre na conclusão nem nas hipóteses exteriores abertas.

[Substituição](/cadeiras/md/quantificadores/#substituição-sem-captura), [prenexa](/cadeiras/md/semantica-primeira-ordem/#forma-normal-prenexa) e [dedução](/cadeiras/md/provas-primeira-ordem/#rever-uma-dedução).

## Inteiros

- Divisão: $a=bq+r$, $b>0$, $0\le r<b$, mesmo para $a<0$.
- Euclides: $\gcd(a,b)=\gcd(b,r)$. Bézout: $d=ua+vb$, com $u,v\in\mathbb Z$.
- $a\equiv_n b\Longleftrightarrow n\mid(a-b)$, $n>0$. Somar e multiplicar preserva congruência.
- Cancelar $c$: se $d=\gcd(c,n)$, de $ca\equiv_n cb$ obtemos $a\equiv_{n/d}b$. Mantém-se o módulo original se $d=1$.
- $ax\equiv_n b$ tem solução se e só se $d=\gcd(a,n)$ divide $b$. Resolve módulo $n/d$ e levanta para as $d$ classes módulo $n$.
- Fermat: $a^{p-1}\equiv_p1$ exige $p$ primo e $p\nmid a$.

[Euclides e Bézout](/cadeiras/md/inteiros-congruencias/#identidade-de-bézout) e [congruências](/cadeiras/md/inteiros-congruencias/#resolver-congruências-lineares).

## Conjuntos, relações, ordens e funções

- $A=B$: duas inclusões ou equivalência de pertença. $|\mathcal P(A)|=2^{|A|}$ para $A$ finito. $\emptyset\in A$ e $\emptyset\subseteq A$ são perguntas diferentes.
- $a(S\circ R)c\Longleftrightarrow\exists b(aRb\land bSc)$: primeiro $R$. $R^+$ usa passeios de comprimento positivo (sequências de ligações onde vértices e arestas podem repetir-se); $R^*=R^+\cup\operatorname{id}$.
- Equivalência: reflexiva, simétrica e transitiva. Ordem parcial: reflexiva, antissimétrica e transitiva. Simétrica e antissimétrica podem coexistir.
- Minimal: nenhum distinto abaixo. Mínimo: abaixo de todos. Ínfimo: maior minorante no conjunto ambiente. Definições duais para maximal, máximo e supremo.
- Função: total e funcional. Injetiva: imagens iguais implicam origens iguais. Sobrejetiva: todo o contradomínio é atingido. A inversa $B\to A$ é função se e só se $f:A\to B$ é bijetiva.

[Conjuntos](/cadeiras/md/conjuntos-relacoes/#provar-uma-identidade), [relações](/cadeiras/md/operacoes-relacoes/#fechos), [Hasse](/cadeiras/md/ordens-funcoes/#diagramas-de-hasse-e-elementos-especiais) e [funções](/cadeiras/md/funcoes-cardinalidade/#injetiva-sobrejetiva-e-bijetiva).

## Grafos

- Simples não dirigido: $\sum_v\deg(v)=2m$. Floresta com $n$ vértices e $c$ componentes: $m=n-c$.
- Euler, ignorando vértices isolados: a parte com arestas é conexa e há zero graus ímpares para circuito, ou dois para trilho aberto.
- Hamilton visita vértices uma vez. Um vértice de articulação impede ciclo de Hamilton. Graus pares não são um critério de Hamilton.
- Bipartido: não tem ciclos ímpares. Num ciclo alternam as partes, com quantidades iguais de vértices.
- Planar: $n-m+f=1+c$. Simples, $n\ge3$: $m\le3n-6$; se bipartido, $m\le2n-4$. Os limites são necessários, não suficientes.
- $\omega(G)\le\chi(G)\le\Delta(G)+1$. Para provar $\chi=k$, exclui $k-1$ cores e exibe uma coloração com $k$.

[Grafos](/cadeiras/md/grafos/#isomorfismos) e [critérios de percursos e planaridade](/cadeiras/md/euler-hamilton-coloracao/#trilhos-e-circuitos-de-euler).

## Indução e recorrências

- Indução simples: base, hipótese $P(n)$ e prova de $P(n+1)$. Forte: podes usar todos os casos menores já abrangidos. Se recuas $d$ unidades, confere as $d$ bases iniciais necessárias.
- Indução estrutural: um caso por construtor. Listas finitas: [] e $x:xs$, com hipótese sobre $xs$.
- $a_n=ra_{n-1}+b$: $a_n=r^na_0+b\sum_{j=0}^{n-1}r^j$. Para $r=1$, $a_n=a_0+nb$.
- $a_n=ua_{n-1}+va_{n-2}$: polinómio $t^2-ut-v$. Raízes distintas não nulas: $Ar_1^n+Br_2^n$; raiz dupla não nula $r$: $(A+Bn)r^n$. Condições iniciais determinam constantes.
- Correção de sort exige ordenação **e** conservação das multiplicidades.

[Indução](/cadeiras/md/inducao-recorrencia/#indução-forte), [recorrências](/cadeiras/md/inducao-recorrencia/#equação-característica) e [provas de listas](/cadeiras/md/inducao-estrutural/#indução-sobre-listas-finitas).
