## Termos e fórmulas

Um **termo** nomeia um objeto: variável, constante ou função aplicada a termos. Uma fórmula atómica afirma um predicado sobre termos ou compara termos pela igualdade. Conetivas e quantificadores constroem novas fórmulas.

A aridade é o número de argumentos. Uma constante tem aridade zero. Se $f$ é binária e $P$ unário, $P(f(x,a))$ é fórmula, $f(x,a)$ é termo e $f(a)$ tem aridade errada. Um predicado não produz um termo.

## Tradução e ordem

$\forall x$ percorre **todos os objetos do domínio**; $\exists x$ exige pelo menos uma testemunha. Com domínio de pessoas, $E(x)$ para estudante e $L(x)$ para leitor:

| Frase                        | Fórmula                         |
| ---------------------------- | ------------------------------- |
| Todos os estudantes leem     | $\forall x(E(x)\to L(x))$       |
| Algum estudante lê           | $\exists x(E(x)\land L(x))$     |
| Nenhum estudante lê          | $\forall x(E(x)\to\neg L(x))$   |
| Nem todos os estudantes leem | $\exists x(E(x)\land\neg L(x))$ |

O universal restringe por implicação; o existencial exige as propriedades por conjunção. $\exists x(E(x)\to L(x))$ pode ser verdadeira só por existir um não estudante.

- $\forall x\exists y\,R(x,y)$ permite que $y$ dependa de $x$.
- $\exists y\forall x\,R(x,y)$ exige um único $y$ comum. Implica a primeira, mas a recíproca falha.
- Podes trocar universais entre si e existenciais entre si. Quantificadores diferentes não se trocam em geral.

Em $\mathbb N$, $\forall x\exists y(x<y)$ vale com $y=x+1$. Nenhum $y$ serve para $\forall x(x<y)$, pois $x=y$ refuta-o.

## Negação e contagem

$$
\neg\forall x\varphi\Leftrightarrow\exists x\neg\varphi,\qquad
\neg\exists x\varphi\Leftrightarrow\forall x\neg\varphi.
$$

Assim, $\neg\forall x\exists yR(x,y)\Leftrightarrow\exists x\forall y\neg R(x,y)$: há um $x$ sem nenhum destino.

Existência única exige existência e unicidade:

$$
\exists!xP(x)\equiv\exists x(P(x)\land\forall y(P(y)\to y=x)).
$$

Só $\forall x\forall y((P(x)\land P(y))\to x=y)$ diz no máximo um, permitindo zero. Exatamente dois exige testemunhas distintas e excluir terceiros:

$$
\exists x\exists y\bigl(P(x)\land P(y)\land x\ne y
\land\forall z(P(z)\to(z=x\lor z=y))\bigr).
$$

## Variáveis e substituição

Uma ocorrência está ligada se está no âmbito de um quantificador da sua variável. As restantes são livres. Em $(\forall xR(x,y))\land P(x)$, as variáveis livres são $x,y$.

- Um termo fechado não contém variáveis.
- Uma fórmula fechada não contém **ocorrências livres**, mas pode ter variáveis ligadas.
- $\forall xP(x)\lor Q(x)$ quantifica só $P(x)$; usa parênteses para alargar o âmbito.

$\varphi[x\mapsto t]$ substitui só ocorrências livres. O termo deve estar **livre para $x$**: nenhuma dessas ocorrências pode estar sob um quantificador de uma variável de $t$.

Em $\forall yR(x,y)$, inserir $f(y)$ para $x$ capturaria $y$. Renomeia primeiro para $\forall zR(x,z)$, com $z$ novo; o resultado é $\forall zR(f(y),z)$.

Na substituição simultânea $R(x,y)[x\mapsto y,y\mapsto a]$, obténs $R(y,a)$. Os termos inseridos não recebem a outra substituição.

[Tradução e substituição sem captura](/cadeiras/md/quantificadores/).
