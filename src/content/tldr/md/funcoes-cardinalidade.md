## Função

Uma função $f:A\to B$ associa exatamente um valor de $B$ a cada elemento de $A$.

- A totalidade exige pelo menos um destino por origem. A funcionalidade exige no máximo um. Só a funcionalidade dá uma função parcial.
- A imagem $f(A)=\{f(a):a\in A\}$ pode ser menor que o contradomínio $B$.
- Existe uma única função $\emptyset\to B$. Não existe função $A\to\emptyset$ com $A\ne\emptyset$.

| Propriedade | Condição                                   |
| ----------- | ------------------------------------------ |
| Injetiva    | $f(a_1)=f(a_2)\Rightarrow a_1=a_2$         |
| Sobrejetiva | $\forall b\in B\exists a\in A,\ f(a)=b$    |
| Bijetiva    | as duas; cada destino tem uma única origem |

Para refutar a injetividade, apresenta origens distintas com a mesma imagem. Para refutar a sobrejetividade, apresenta um destino nunca atingido.

O domínio e o contradomínio fazem parte da pergunta. Para $f(x)=x^2$: $\mathbb Z\to\mathbb Z$ não é injetiva nem sobrejetiva; $\mathbb N\to\mathbb N$ é injetiva sem atingir 2; $[0,\infty)\to[0,\infty)$ é bijetiva, com inversa $\sqrt y$.

## Inversa e composição

A relação inversa $f^{-1}$ troca os pares e existe sempre como relação. É uma função total $B\to A$ se e só se $f$ é bijetiva.

- $f^{-1}\circ f=\operatorname{id}_A$ equivale a $f$ injetiva.
- $f\circ f^{-1}=\operatorname{id}_B$ equivale a $f$ sobrejetiva.
- $(g\circ f)(a)=g(f(a))$; aplica primeiro $f$.

A composição preserva injeção e sobrejeção. Se $g\circ f$ é injetiva, então $f$ é injetiva, sem garantir $g$ fora de $f(A)$. Se $g\circ f$ é sobrejetiva, então $g$ é sobrejetiva, sem obrigar $f(A)=B$. Para bijeções, $(g\circ f)^{-1}=f^{-1}\circ g^{-1}$.

## Fibras

Para $f$ total, a relação $R=f^{-1}\circ f$ é uma equivalência:

$$
aRb\Longleftrightarrow f(a)=f(b),\qquad[a]_R=\{x:f(x)=f(a)\}.
$$

As classes são as fibras não vazias; $[a]_R\mapsto f(a)$ é uma bijeção de $A/R$ para $f(A)$. No caso finito, $|A/R|=|f(A)|$.

## Cardinalidade

Dois conjuntos têm a mesma cardinalidade quando existe uma bijeção entre eles.

- Para $A,B$ finitos, uma injeção $A\to B$ exige $|A|\le|B|$; uma sobrejeção exige $|A|\ge|B|$. Com tamanhos iguais, uma função é injetiva se e só se é sobrejetiva.
- No caso infinito, uma parte própria pode ter igual cardinalidade: $n\mapsto2n$ é uma bijeção de $\mathbb N$ para os pares.
- Um conjunto é numerável quando é finito ou admite uma bijeção com $\mathbb N$. $\mathbb N,\mathbb Z,\mathbb Q$ são numeráveis; $\mathbb R$ não é.

[Provas de injetividade, sobrejetividade e cardinalidade](/cadeiras/md/funcoes-cardinalidade/).
