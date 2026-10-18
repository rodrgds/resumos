## Palavras

- Alfabeto $\Sigma$: conjunto finito e não vazio. Palavra: sequência finita. $\varepsilon$ tem comprimento 0 e não é símbolo de entrada.
- $|xy|=|x|+|y|$, $(xy)z=x(yz)$, $x\varepsilon=\varepsilon x=x$. Potência: $x^0=\varepsilon$. Reverso: $(xy)^R=y^Rx^R$.
- $v$ subpalavra de $w$ se $w=xvy$; prefixo com $x=\varepsilon$, sufixo com $y=\varepsilon$.
- $\Sigma^k$: palavras de comprimento $k$. $\Sigma^*$: todas. $\Sigma^+=\Sigma^*\setminus\{\varepsilon\}$. Com $|\Sigma|=m$, há $m^k$ palavras de comprimento $k$.

## Linguagens

- Linguagem: conjunto $L\subseteq\Sigma^*$. $\emptyset$ tem zero palavras; $\{\varepsilon\}$ tem uma.
- $AB=\{xy\mid x\in A,\ y\in B\}$. Resultados repetidos contam uma vez: $\{a,ab\}\{\varepsilon,b\}=\{a,ab,abb\}$.
- $A^0=\{\varepsilon\}$, $A^*=\bigcup_{n\ge0}A^n$, $\emptyset^*=\{\varepsilon\}$. Complemento relativo ao alfabeto: $\overline L=\Sigma^*\setminus L$.
- $A\emptyset=\emptyset$; $A\{\varepsilon\}=A$. Concatenação não é comutativa.
- Distribui sobre união: $L(M\cup N)=LM\cup LN$. Sobre interseção pode falhar: a mesma palavra admite decomposições diferentes.

## Expressões regulares

As bases são $\emptyset$, $\varepsilon$ e cada símbolo. As operações são $E+F$ para a união, $EF$ para a concatenação e $E^*$ para a estrela. A precedência é: estrela, depois concatenação, depois união. A abreviatura $E^+$ significa $EE^*$.

| Condição sobre $\{a,b\}$    | Expressão                 |
| --------------------------- | ------------------------- |
| Exatamente dois $b$         | $a^*ba^*ba^*$             |
| Contém $ab$                 | $(a+b)^*ab(a+b)^*$        |
| Termina em $ab$             | $(a+b)^*ab$               |
| Sem $bb$, com $\varepsilon$ | $(a+ba)^*(\varepsilon+b)$ |

A equivalência $E\equiv F$ significa que ambas denotam a mesma linguagem. Valem, por exemplo, $E+E\equiv E$, $E\emptyset\equiv\emptyset$ e $(E^*)^*\equiv E^*$. Mas $(a+b)^*$ contém $ab$, enquanto $a^*+b^*$ não contém essa palavra.

## Provas

- Para provar uma igualdade de linguagens, mostra as duas inclusões com uma palavra arbitrária. Uma palavra concreta refuta uma igualdade, mas nenhuma palavra isolada prova uma igualdade.
- Na indução no comprimento, trata a base $\varepsilon$ e reduz a uma palavra mais curta. Na indução estrutural, trata as bases e cada construção.
- Testes com palavras finitas não provam afirmações para todas as palavras.

[Provas e exemplos completos](/cadeiras/tc/linguagens-expressoes/#provar-ou-refutar-uma-igualdade).
