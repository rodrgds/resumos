## Funções e imagem

Uma função $f:A\to B$ associa **exatamente um** valor de $B$ a cada elemento de $A$.

- Totalidade exige pelo menos um destino por origem; funcionalidade exige no máximo um. Só funcionalidade dá uma função parcial.
- A imagem é $f(A)=\{f(a):a\in A\}$, que pode ser menor do que o contradomínio $B$.
- Existe uma única função $\emptyset\to B$. Não existe função $A\to\emptyset$ quando $A\ne\emptyset$.

| Propriedade | Condição e teste de prova                                                                           |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Injetiva    | $f(a_1)=f(a_2)\Rightarrow a_1=a_2$. Parte de imagens iguais.                                        |
| Sobrejetiva | $\forall b\in B\exists a\in A,\ f(a)=b$. Encontra uma origem admissível para um destino arbitrário. |
| Bijetiva    | Injetiva e sobrejetiva. Cada destino tem uma única origem.                                          |

Para refutar injetividade, encontra origens distintas com a mesma imagem. Para refutar sobrejetividade, encontra um destino nunca atingido.

O domínio e o contradomínio fazem parte da pergunta. Para $f(x)=x^2$, $\mathbb Z\to\mathbb Z$ não é injetiva nem sobrejetiva; $\mathbb N\to\mathbb N$ é injetiva, mas não atinge 2; $[0,\infty)\to[0,\infty)$ é bijetiva, com inversa $\sqrt y$.

## Inversa e composição

A **relação inversa** $f^{-1}$ troca os pares e existe sempre. É uma função total $B\to A$ exatamente quando $f$ é bijetiva. Injetividade garante funcionalidade da inversa; sobrejetividade garante totalidade.

Para uma função total, usando composição de relações:

$$
f^{-1}\circ f=\operatorname{id}_A\Longleftrightarrow f\text{ injetiva},\qquad
f\circ f^{-1}=\operatorname{id}_B\Longleftrightarrow f\text{ sobrejetiva}.
$$

Para $f:A\to B,g:B\to C$, $(g\circ f)(a)=g(f(a))$. Aplica primeiro $f$.

- Duas injeções compõem-se numa injeção; duas sobrejeções, numa sobrejeção.
- Se $g\circ f$ é injetiva, $f$ é injetiva. Isso não garante que $g$ o seja fora de $f(A)$.
- Se $g\circ f$ é sobrejetiva, $g$ é sobrejetiva. Isso não obriga $f(A)=B$.
- Para bijeções, $(g\circ f)^{-1}=f^{-1}\circ g^{-1}$.

## Cardinalidade

Dois conjuntos têm a mesma cardinalidade se existe uma bijeção entre eles.

Para $A,B$ **finitos**, uma injeção $A\to B$ exige $|A|\le|B|$; uma sobrejeção exige $|A|\ge|B|$. Com tamanhos iguais, uma função é injetiva se e só se é sobrejetiva.

Num conjunto infinito, um subconjunto próprio pode ter igual cardinalidade: $n\mapsto2n$ é bijeção de $\mathbb N$ para os pares naturais. Não apliques a equivalência entre injetividade e sobrejetividade do caso finito.

Um conjunto é **numerável** se é finito ou admite uma bijeção com $\mathbb N$. $\mathbb N,\mathbb Z,\mathbb Q$ são numeráveis; $\mathbb R$ não é. Uma enumeração de $\mathbb Z$ é $0,-1,1,-2,2,\ldots$.

[Provas de injetividade, sobrejetividade e cardinalidade](/cadeiras/md/funcoes-cardinalidade/).
