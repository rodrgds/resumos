## Estruturas

- Uma estrutura tem um domínio **não vazio** $A$ e interpreta todos os símbolos não lógicos. A igualdade, quando existe, compara objetos.
- Com $A=\{a,b\}$ e $P^{\mathcal A}=\{a\}$: $\exists xP(x)$ é $T$ por causa de $a$; $\forall xP(x)$ é $F$ por causa de $b$.

| Símbolo                      | Interpretação                          |
| ---------------------------- | -------------------------------------- |
| Constante $c$                | um objeto $c^{\mathcal A}\in A$        |
| Função $f$ de aridade $n$    | função total $f^{\mathcal A}:A^n\to A$ |
| Predicado $R$ de aridade $n$ | relação $R^{\mathcal A}\subseteq A^n$  |

- A atribuição $s$ escolhe objetos para as variáveis. Os termos avaliam de dentro para fora; a igualdade compara objetos; as conetivas usam as tabelas.
- $\mathcal A\models_s\forall x\varphi$ exige $\varphi$ para todo o $d\in A$ em $s[x\mapsto d]$. Para $\exists x\varphi$ basta um $d$.
- Só as variáveis livres mudam o valor. Para uma fórmula fechada escreve $\mathcal A\models\varphi$.

O exemplo usa $A=\mathbb N$ com $R^{\mathcal A}=\{(n,m):n<m\}$:

- $\forall x\exists y\,R(x,y)$ é $T$; para cada $x$ serve $y=x+1$.
- $\exists y\forall x\,R(x,y)$ é $F$; para cada $y$, $x=y$ dá $y<y$ falso.

## Validade

- Uma fórmula é válida quando é $T$ em **todas** as estruturas e atribuições.
- É satisfazível quando é $T$ em alguma. É insatisfazível quando é $T$ em nenhuma.
- Para refutar $\Gamma\models\varphi$ dá uma estrutura completa, com atribuição se houver livres, onde as premissas são $T$ e a conclusão é $F$.

A verdade numa estrutura não é a validade. A frase $\forall x\exists y\,R(x,y)$ acima é $T$ na estrutura com $A=\mathbb N$ e $R^{\mathcal A}=\{(n,m):n<m\}$, mas falha na estrutura ${\mathcal B}$ com domínio $\{u\}$ e $R^{\mathcal B}=\emptyset$, onde nenhum par satisfaz $R$. O símbolo binário $R$ mantém-se; só muda a interpretação.

- Uma validade de primeira ordem pode não ser uma tautologia. A fórmula $(a=b\land b=c)\to a=c$ vale pela igualdade; a abstração $(p\land q)\to r$ admite $p=q=T,r=F$, que não corresponde a objetos com essas igualdades.

O contraexemplo usa $B=\{u,v\}$ com $P^{\mathcal B}=\{u\}$ e $Q^{\mathcal B}=\{v\}$:

| Fórmula                               | Valor |
| ------------------------------------- | ----- |
| $\forall x(P(x)\lor Q(x))$            | $T$   |
| $(\forall xP(x))\lor(\forall xQ(x))$  | $F$   |
| $(\exists xP(x))\land(\exists xQ(x))$ | $T$   |
| $\exists x(P(x)\land Q(x))$           | $F$   |

## Equivalências

- $\forall x(\varphi\land\psi)\Leftrightarrow(\forall x\varphi)\land(\forall x\psi)$.
- $\exists x(\varphi\lor\psi)\Leftrightarrow(\exists x\varphi)\lor(\exists x\psi)$.
- As outras distribuições falham; as testemunhas podem diferir, como acima.

Se $x$ não ocorre livre em $\psi$, com $Q\in\{\forall,\exists\}$ e $\circ\in\{\land,\lor\}$:

$$
(Qx\varphi)\circ\psi\Leftrightarrow Qx(\varphi\circ\psi).
$$

Pela implicação, a posição conta: $(\forall x\varphi)\to\psi\Leftrightarrow\exists x(\varphi\to\psi)$, ainda sem captura. As regras usam um domínio não vazio.

## Forma prenexa

Uma forma prenexa tem todos os quantificadores à frente e matriz sem quantificadores.

1. Elimina as implicações e as abreviaturas.
2. Renomeia as ligadas para evitar choques com livres.
3. Leva as negações para dentro, trocando $\forall$ e $\exists$.
4. Transporta os quantificadores para fora, conferindo a ausência de captura em cada passo.

Não ordenes por tipo. A ordem tem de vir de equivalências válidas.

[Exemplo completo de transformação prenexa](/cadeiras/md/semantica-primeira-ordem/#forma-normal-prenexa).
