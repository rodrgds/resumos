## Estruturas e avaliação

Uma estrutura $\mathcal A$ tem domínio **não vazio** $A$ e interpreta todos os símbolos não lógicos:

| Símbolo                      | Interpretação                              |
| ---------------------------- | ------------------------------------------ |
| Constante $a$                | Um objeto $a^{\mathcal A}\in A$            |
| Função $f$ de aridade $n$    | Uma função total $f^{\mathcal A}:A^n\to A$ |
| Predicado $R$ de aridade $n$ | Uma relação $R^{\mathcal A}\subseteq A^n$  |

A atribuição $s$ escolhe objetos para as variáveis. Avalia termos de dentro para fora e depois verifica a pertença à relação atómica. A igualdade compara os próprios objetos; as conetivas usam as tabelas proposicionais.

$\mathcal A\models_s\varphi$ significa que $\varphi$ é verdadeira com essa estrutura e atribuição. Nos quantificadores, muda só a variável quantificada:

$$
\begin{aligned}
\mathcal A\models_s\forall x\varphi
&\Longleftrightarrow\forall d\in A,\ \mathcal A\models_{s[x\mapsto d]}\varphi,\\
\mathcal A\models_s\exists x\varphi
&\Longleftrightarrow\exists d\in A,\ \mathcal A\models_{s[x\mapsto d]}\varphi.
\end{aligned}
$$

Só as variáveis livres podem alterar a verdade por mudança de atribuição. Para fórmulas fechadas, basta escrever $\mathcal A\models\varphi$.

Num domínio finito completamente listado, o universal calcula uma conjunção e o existencial uma disjunção. Com $A=\{a,b\}$ e $P^{\mathcal A}=\{a\}$, $\exists xP(x)$ é verdadeira e $\forall xP(x)$ é falsa.

## Validade e contraestruturas

- Uma fórmula válida é verdadeira em **todas** as estruturas e atribuições.
- É satisfazível se alguma estrutura e atribuição a tornam verdadeira; insatisfazível se nenhuma serve.
- Um modelo de proposições satisfaz todas elas na mesma estrutura.

Para refutar $\Gamma\models\varphi$, descreve uma estrutura completa e, se necessário, uma atribuição que satisfaçam todas as premissas e falsifiquem a conclusão.

Uma verdade nos naturais não é automaticamente lógica. $\forall x\exists y(x<y)$ vale na interpretação habitual de $<$ em $\mathbb N$, mas $\forall x\exists yR(x,y)$ falha num domínio de um objeto com $R=\emptyset$.

## Equivalências quantificadas

$$
\forall x(\varphi\land\psi)\Leftrightarrow
(\forall x\varphi)\land(\forall x\psi),
$$

$$
\exists x(\varphi\lor\psi)\Leftrightarrow
(\exists x\varphi)\lor(\exists x\psi).
$$

As outras distribuições falham em geral. Com $A=\{u,v\}$, $P=\{u\}$ e $Q=\{v\}$:

| Fórmula                               | Valor |
| ------------------------------------- | ----- |
| $\forall x(P(x)\lor Q(x))$            | T     |
| $(\forall xP(x))\lor(\forall xQ(x))$  | F     |
| $(\exists xP(x))\land(\exists xQ(x))$ | T     |
| $\exists x(P(x)\land Q(x))$           | F     |

Se $x$ **não ocorre livre em $\psi$**, para $Q\in\{\forall,\exists\}$ e $\circ\in\{\land,\lor\}$:

$$
(Qx\varphi)\circ\psi\Leftrightarrow Qx(\varphi\circ\psi).
$$

Estas equivalências pressupõem domínio não vazio. Pela implicação, a posição importa: $(\forall x\varphi)\to\psi\Leftrightarrow\exists x(\varphi\to\psi)$, ainda com a condição de não captura.

## Forma prenexa

Uma forma prenexa tem todos os quantificadores no início e uma matriz sem quantificadores. Para a obter:

1. Elimina implicações e abreviaturas.
2. Renomeia variáveis ligadas para evitar repetições e conflitos com livres.
3. Leva negações para dentro, trocando universais e existenciais.
4. Transporta quantificadores para fora, conferindo a ausência de captura em cada passo.

Não ordenes os quantificadores por tipo. A ordem tem de resultar de equivalências válidas, preservando dependências e variáveis livres.

[Exemplo completo de transformação prenexa](/cadeiras/md/semantica-primeira-ordem/#forma-normal-prenexa).
