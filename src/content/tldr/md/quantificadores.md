## Linguagem

- Um termo nomeia um objeto; uma fórmula atómica afirma um predicado ou uma igualdade sobre termos.
- A aridade é o número de argumentos. Uma constante tem aridade zero.

Exemplo de aridades: com $f$ binária e $P$ unário, $P(f(x,a))$ é uma fórmula, porque $f(x,a)$ é um termo e $P$ recebe um termo. A expressão $f(a)$ está mal formada por falta de um argumento; um predicado não produz um termo, por isso não serve como argumento de função.

## Tradução

$\forall x$ percorre todos os objetos do domínio; $\exists x$ exige pelo menos uma testemunha. Com um domínio de pessoas, $E(x)$ para "é estudante" e $L(x)$ para "é leitor":

| Frase                        | Fórmula                         |
| ---------------------------- | ------------------------------- |
| Todos os estudantes leem     | $\forall x(E(x)\to L(x))$       |
| Algum estudante lê           | $\exists x(E(x)\land L(x))$     |
| Nenhum estudante lê          | $\forall x(E(x)\to\neg L(x))$   |
| Nem todos os estudantes leem | $\exists x(E(x)\land\neg L(x))$ |

- O quantificador universal restringe por implicação; o existencial exige as propriedades por conjunção.
- A fórmula $\exists x(E(x)\to L(x))$ pode ser $T$ só por existir um não estudante.
- Quando o domínio já só tem estudantes, "todos leem" pode escrever-se $\forall x\,L(x)$.

## Ordem

- Em $\forall x\exists y\,R(x,y)$, o $y$ pode depender de $x$.
- Em $\exists y\forall x\,R(x,y)$, o mesmo $y$ tem de servir para todos os $x$, sem exigir unicidade. Esta forma implica a primeira; a recíproca falha em geral.
- Podes trocar universais entre si e existenciais entre si. Tipos diferentes não trocam em geral.

Em $\mathbb N$, $\forall x\exists y(x<y)$ vale com $y=x+1$. Nenhum $y$ serve para $\forall x(x<y)$, pois $x=y$ dá uma instância falsa.

## Negação e contagem

$$
\neg\forall x\varphi\Leftrightarrow\exists x\neg\varphi,\qquad
\neg\exists x\varphi\Leftrightarrow\forall x\neg\varphi.
$$

Logo $\neg\forall x\exists yR(x,y)\Leftrightarrow\exists x\forall y\neg R(x,y)$: há um $x$ sem nenhum destino por $R$.

- A existência única escreve-se $\exists!xP(x)\equiv\exists x(P(x)\land\forall y(P(y)\to y=x))$.
- "No máximo um" é só $\forall x\forall y((P(x)\land P(y))\to x=y)$; permite zero ocorrências.
- "Exatamente dois" exige duas testemunhas distintas e exclui terceiros:

$$
\exists x\exists y(P(x)\land P(y)\land x\ne y\land\forall z(P(z)\to(z=x\lor z=y))).
$$

## Variáveis

- Uma ocorrência ligada está no âmbito de um quantificador da sua variável. Uma ocorrência livre está fora. Em $(\forall xR(x,y))\land P(x)$, as ocorrências livres são o $x$ da segunda parte e o $y$.
- Um termo fechado não tem variáveis. Uma fórmula fechada não tem ocorrências livres, podendo ter ligadas.
- Em $\forall xP(x)\lor Q(x)$, o quantificador abrange só $P(x)$; usa parênteses para alargar o âmbito.

A substituição $\varphi[x\mapsto t]$ substitui só as ocorrências livres. O termo $t$ tem de estar livre para $x$: nenhuma dessas ocorrências pode ficar sob um quantificador de uma variável de $t$.

- Em $\forall yR(x,y)$, inserir $f(y)$ para $x$ capturaria o $y$. Renomeia primeiro para $\forall zR(x,z)$, com $z$ novo; o resultado dá $\forall zR(f(y),z)$.
- Na substituição simultânea, $R(x,y)[x\mapsto y,y\mapsto a]$ dá $R(y,a)$.

[Tradução e substituição sem captura](/cadeiras/md/quantificadores/).
