---
title: Folha de consulta de MD
description: Regras de decisão para lógica, provas, inteiros, indução, conjuntos, relações e ordens.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos MD 1&2 Sofia ViP
      url: https://drive.google.com/file/d/1qTgpBxR5YblvT5utOmd-ZoL9UDI4UX4u/view
    - title: Resumos MD 3 SofiaViP
      url: https://drive.google.com/file/d/1orkgKjwlXRfwOLTkPCIYKhaiNTzKmB6b/view
    - title: Resumos MD 4 SofiaViP
      url: https://drive.google.com/file/d/1bceblRY0GjVpoCwMV7PLtDAAB4GGIBF5/view
  coverage: Síntese das 19 páginas dos três PDFs, com lógica e provas, quantificadores, aritmética dos inteiros, indução, conjuntos, relações e ordens.
  gaps:
    - Funções, cardinalidade infinita e relações de recorrência das páginas atuais não são tratadas nestes três PDFs.
    - A correspondência destes apontamentos a uma edição atual da unidade curricular não foi verificada.
---

Identifica primeiro o **tipo de objeto** e o que tens de provar: valor de verdade, consequência, existência, divisibilidade ou propriedade de uma relação. As regras abaixo condensam os três cadernos, que usam a notação de lógica de primeira ordem (LPO).

## Lógica e provas

| Objetivo                | Regra ou teste                                                                                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Refutar um argumento    | Dá uma interpretação em que **todas** as premissas são verdadeiras e a conclusão é falsa. Para mostrar validade, tens de excluir essa possibilidade. Premissas falsas tornam a implicação material verdadeira, mas não demonstram solidez. |
| Negar ou simplificar    | $\neg(P\land Q)\equiv\neg P\lor\neg Q$; $\neg(P\lor Q)\equiv\neg P\land\neg Q$; $\neg\neg P\equiv P$.                                                                                                                                      |
| Tratar um condicional   | $P\to Q\equiv\neg P\lor Q\equiv\neg Q\to\neg P$; só é falso quando $P$ é verdadeiro e $Q$ falso. Para provar $P\to Q$, assume $P$ e deriva $Q$.                                                                                            |
| Tratar um bicondicional | $P\leftrightarrow Q\equiv(P\to Q)\land(Q\to P)$; prova as duas direções.                                                                                                                                                                   |
| Prova por casos         | De $P\lor Q$, obtém a mesma conclusão separadamente a partir de $P$ e de $Q$.                                                                                                                                                              |
| Prova por contradição   | Assume a negação da tese e deriva uma contradição. Distingue a prova formal passo a passo de um argumento informal.                                                                                                                        |

Uma tautologia é verdadeira em **todas** as interpretações; equivalência lógica exige o mesmo valor em todas elas; consequência lógica exige que toda a interpretação que satisfaz as premissas satisfaça a conclusão. Uma fórmula pode ser satisfazível sem ser tautologia. Para construir DNF, junta conjunções de literais; para CNF, junta disjunções de literais. Consulta [conetivas e equivalências](/cadeiras/md/logica-proposicional/#equivalências-que-deves-saber-de-cor) e [regras de prova](/cadeiras/md/provas-proposicionais/#as-regras-básicas-de-cada-conetiva).

## Quantificadores: domínio e âmbito

| Frase                | Forma para o domínio fixado       |
| -------------------- | --------------------------------- |
| Todos os $P$ são $Q$ | $\forall x\,(P(x)\to Q(x))$       |
| Algum $P$ é $Q$      | $\exists x\,(P(x)\land Q(x))$     |
| Nenhum $P$ é $Q$     | $\forall x\,(P(x)\to\neg Q(x))$   |
| Algum $P$ não é $Q$  | $\exists x\,(P(x)\land\neg Q(x))$ |

$\neg\forall x\,P(x)\equiv\exists x\,\neg P(x)$ e $\neg\exists x\,P(x)\equiv\forall x\,\neg P(x)$. A ordem importa: $\forall x\exists y\,R(x,y)$ permite escolher um $y$ por $x$; $\exists y\forall x\,R(x,y)$ exige o **mesmo** $y$ para todos. Uma frase só recebe valor de verdade depois de fixar o domínio e ligar as variáveis livres. Domínios vazios tornam os universais vacuamente verdadeiros e os existenciais falsos. Numa prova, instancia $\forall$ com um termo admissível; para concluir $\forall$, usa um elemento arbitrário que não dependa de hipóteses especiais; para provar $\exists$, apresenta uma testemunha. Vê [tradução e negação](/cadeiras/md/quantificadores/#negar-frases-quantificadas) e [provas com quantificadores](/cadeiras/md/quantificadores/#provas-com-quantificadores).

## Inteiros e congruências

Para $a\in\mathbb Z$ e $b>0$, escreve $a=bq+r$ com $0\le r<b$. $d\mid a$ significa $a=dk$ para algum inteiro $k$. Aplica Euclides: $\gcd(a,b)=\gcd(b,r)$; retrocede nas divisões para obter Bézout, $\gcd(a,b)=sa+tb$. Para $a,b>0$, $\gcd(a,b)\operatorname{lcm}(a,b)=ab$. A fatorização em primos usa o **menor** expoente no mdc e o **maior** no mmc.

$a\equiv b\pmod n$ significa $n\mid(a-b)$, com $n>0$. Podes somar e multiplicar congruências; só podes cancelar $c$ de $ac\equiv bc\pmod n$ quando $\gcd(c,n)=1$. Para $ax\equiv b\pmod n$, calcula $d=\gcd(a,n)$: há solução **se e só se** $d\mid b$; quando há, existem $d$ classes de solução módulo $n$, obtidas dividindo por $d$ e resolvendo módulo $n/d$. Se $d=1$, o inverso de $a$ módulo $n$ vem de Bézout. Fermat dá $a^{p-1}\equiv1\pmod p$ se $p$ é primo e $p\nmid a$. O teorema chinês dos restos dá uma classe única módulo $mn$ quando os módulos $m,n$ são coprimos. Vê [Euclides](/cadeiras/md/inteiros-congruencias/#máximo-divisor-comum-e-euclides) e [congruências lineares](/cadeiras/md/inteiros-congruencias/#resolver-congruências-lineares).

## Indução e conjuntos

Para provar $P(n)$ num conjunto de naturais com início $n_0$: verifica $P(n_0)$, assume $P(k)$ e prova $P(k+1)$ para todo $k\ge n_0$. Na **indução forte**, podes usar todos os casos de $n_0$ até $k$ na passagem. Um caso base em falta ou uma passagem que depende da tese em $k+1$ invalida a prova. A boa ordenação dos naturais sustenta o método. Consulta [indução simples e forte](/cadeiras/md/inducao-recorrencia/#indução-simples-os-três-passos).

$A\subseteq B$ exige $\forall x(x\in A\to x\in B)$; para provar $A=B$, mostra as duas inclusões. $\mathcal P(A)$ contém os subconjuntos de $A$, e $|\mathcal P(A)|=2^{|A|}$ se $A$ é finito. $A\times B$ contém pares ordenados; $A\setminus B=A\cap B^c$ requer um universo para o complemento. Para identidades de conjuntos, traduz pertença em conectivas e aplica De Morgan. Vê [operações de conjuntos](/cadeiras/md/conjuntos-relacoes/#operações-e-as-suas-leis).

## Relações e ordens

Para $R\subseteq A\times A$, testa: **reflexiva** $\forall a\,aRa$; **simétrica** $aRb\Rightarrow bRa$; **antissimétrica** $aRb\land bRa\Rightarrow a=b$; **transitiva** $aRb\land bRc\Rightarrow aRc$. Uma equivalência é reflexiva, simétrica e transitiva: as classes $[a]$ formam uma partição. Uma ordem parcial é reflexiva, antissimétrica e transitiva; é **total** se todos os pares forem comparáveis. Simétrica e antissimétrica não são opostos. Vê [relações de equivalência](/cadeiras/md/conjuntos-relacoes/#relações-de-equivalência-e-partições) e [ordens parciais](/cadeiras/md/ordens-funcoes/#ordens-parciais).

Num diagrama de Hasse, omite laços e arestas transitivas. **Mínimo** está abaixo de todos; **minimal** não tem elemento estritamente abaixo. O máximo e o maximal distinguem-se de forma dual. Um conjunto pode ter vários minimais e nenhum mínimo; o mesmo vale para maximais e máximo. Infímo e supremo são, respetivamente, o maior minorante e o menor majorante, quando existem no conjunto ordenado em causa. Consulta [diagramas de Hasse](/cadeiras/md/ordens-funcoes/#diagramas-de-hasse-e-elementos-especiais).
