## Palavras e linguagens

- Um **alfabeto** $\Sigma$ é um conjunto finito e não vazio de símbolos. Uma palavra é uma sequência finita; $\varepsilon$ tem comprimento zero.
- $\Sigma^k$ contém as palavras de comprimento $k$, $\Sigma^*$ todos os comprimentos e $\Sigma^+=\Sigma^*\setminus\{\varepsilon\}$. Se $|\Sigma|=m$, há $m^k$ palavras de comprimento $k$.
- Uma **linguagem** é um conjunto $L\subseteq\Sigma^*$. $\emptyset$ não contém palavras; $\{\varepsilon\}$ contém uma.
- $xy$ concatena palavras, $x^0=\varepsilon$ e $x^R$ inverte a ordem. Vale $|xy|=|x|+|y|$ e $(xy)^R=y^Rx^R$.
- $v$ é subpalavra de $w$ se $w=xvy$; é prefixo se $x=\varepsilon$ e sufixo se $y=\varepsilon$.

## Operações sobre linguagens

$$
AB=\{xy\mid x\in A,\ y\in B\},\qquad A^0=\{\varepsilon\}.
$$

$A^*$ concatena zero ou mais palavras de $A$; $A^+$ exige pelo menos uma. O complemento é $\Sigma^*\setminus A$, para o alfabeto fixado.

- $A\emptyset=\emptyset A=\emptyset$, mas $A\{\varepsilon\}=A$.
- $\emptyset^*=\{\varepsilon\}$ e toda a estrela contém $\varepsilon$.
- A concatenação não é comutativa. Resultados repetidos contam uma só vez: $\{a,ab\}\{\varepsilon,b\}=\{a,ab,abb\}$.
- Distribui sobre união: $L(M\cup N)=LM\cup LN$. A igualdade correspondente para interseção pode falhar, porque a mesma palavra pode ter decomposições diferentes.

## Expressões regulares

As bases são $\emptyset$, $\varepsilon$ e cada símbolo. $E+F$ representa união, $EF$ concatenação e $E^*$ estrela. A precedência é estrela, concatenação, união; $E^+=EE^*$.

| Condição sobre $\{a,b\}$                 | Expressão                 |
| ---------------------------------------- | ------------------------- |
| Exatamente dois $b$                      | $a^*ba^*ba^*$             |
| Contém $ab$                              | $(a+b)^*ab(a+b)^*$        |
| Termina em $ab$                          | $(a+b)^*ab$               |
| Não contém $bb$, incluindo $\varepsilon$ | $(a+ba)^*(\varepsilon+b)$ |

$E\equiv F$ significa igualdade de linguagens. União é comutativa e idempotente; concatenação é associativa e distributiva sobre união. Vale $E\varepsilon\equiv E$, $E\emptyset\equiv\emptyset$ e $(E^*)^*\equiv E^*$. Porém, $(a+b)^*$ contém $ab$, enquanto $a^*+b^*$ não contém.

## Provas

- Para uma igualdade de linguagens, prova as duas inclusões com uma palavra arbitrária. Uma única palavra pode refutar a igualdade.
- Na indução pelo comprimento ou número de repetições, trata a base zero e usa a hipótese apenas no caso mais pequeno.
- Na indução estrutural, trata as bases e cada construção, como união, concatenação e estrela. Testes finitos não provam uma afirmação para todas as palavras.

[Provas e exemplos completos](/cadeiras/tc/linguagens-expressoes/#provas-por-indução).
