## Fórmulas e conetivas

Uma proposição tem valor $T$ ou $F$. As fórmulas constroem-se a partir de variáveis proposicionais, negação e conetivas binárias. A conetiva principal é a última aplicada na árvore sintática.

A precedência é $\neg$, $\land$, $\lor$, $\to$. A implicação associa à direita: $p\to q\to r=p\to(q\to r)$.

| Conetiva             | Condição de verdade                          |
| -------------------- | -------------------------------------------- |
| $\neg p$             | $p$ é falsa                                  |
| $p\land q$           | Ambas são verdadeiras                        |
| $p\lor q$            | Pelo menos uma é verdadeira, incluindo ambas |
| $p\to q$             | Só é falsa com $p=T,q=F$                     |
| $p\leftrightarrow q$ | Os valores coincidem                         |

- "$p$ só se $q$" é $p\to q$, com $q$ necessária para $p$.
- "$p$ se $q$" é $q\to p$, com $q$ suficiente para $p$.
- "Exatamente uma" é $(p\lor q)\land\neg(p\land q)$.

## Atribuições e consequência

Uma atribuição escolhe um valor para cada variável. Para $n$ variáveis distintas há $2^n$ atribuições, mesmo que ocorram repetidas.

| Classificação | Atribuições em que é verdadeira |
| ------------- | ------------------------------- |
| Tautologia    | Todas                           |
| Satisfazível  | Pelo menos uma                  |
| Contradição   | Nenhuma                         |
| Contingente   | Algumas, mas não todas          |

$\Gamma\models\varphi$ exige que **toda atribuição que satisfaz todas as premissas** satisfaça a conclusão. Um contraexemplo torna todas as premissas verdadeiras e a conclusão falsa. Para $p\to q,q\models p$, serve $p=F,q=T$.

Premissas insatisfazíveis implicam semanticamente qualquer conclusão. Para $\Gamma$ finito, testa a insatisfazibilidade de $(\bigwedge_{\psi\in\Gamma}\psi)\land\neg\varphi$.

## Equivalências

$\varphi\Leftrightarrow\psi$ significa igual valor em todas as atribuições. O bicondicional $\varphi\leftrightarrow\psi$ é uma fórmula, tautológica nesse caso.

$$
p\to q\Leftrightarrow\neg p\lor q
\Leftrightarrow\neg q\to\neg p.
$$

$$
\neg(p\land q)\Leftrightarrow\neg p\lor\neg q,\qquad
\neg(p\lor q)\Leftrightarrow\neg p\land\neg q.
$$

Conjunção e disjunção são comutativas, associativas e idempotentes; cada uma distribui-se sobre a outra. A absorção dá $p\land(p\lor q)\Leftrightarrow p$ e $p\lor(p\land q)\Leftrightarrow p$. A implicação não é comutativa.

## Formas normais

Um **literal** é uma variável ou a sua negação. Na forma normal negativa só usamos $\land,\lor,\neg$, com negações apenas em literais.

| Forma | Estrutura                           | Construção pela tabela                                        |
| ----- | ----------------------------------- | ------------------------------------------------------------- |
| FND   | Disjunção de conjunções de literais | Usa linhas verdadeiras. Cada termo é verdadeiro na sua linha. |
| FNC   | Conjunção de disjunções de literais | Usa linhas falsas. Cada cláusula é falsa na sua linha.        |

Na FND, usa a variável quando a linha tem $T$ e a negação quando tem $F$. Na FNC, inverte esses sinais. Um literal sozinho também pode ser um termo ou cláusula.

Exemplo:

$$
\neg(p\to(q\land r))\Leftrightarrow
p\land(\neg q\lor\neg r)\Leftrightarrow
(p\land\neg q)\lor(p\land\neg r).
$$

A expressão intermédia é FNC; a última é FND.

- Uma FND é satisfazível se algum termo não contém literais opostos.
- Uma FNC é tautológica se cada cláusula contém um literal e a sua negação.
- Cláusulas satisfazíveis separadamente não garantem uma FNC satisfazível: $p\land\neg p$ falha.

## Completude de conetivas

Um conjunto é completo se representa qualquer função de verdade. Há $2^{2^n}$ funções de $n$ variáveis.

$\{\neg,\land,\lor\}$ é completo pela FND. $\{\neg,\to\}$ também: $p\lor q\Leftrightarrow\neg p\to q$ e $p\land q\Leftrightarrow\neg(p\to\neg q)$. Só $\{\land,\lor\}$ não chega, pois todas as suas fórmulas dão $T$ com todas as variáveis em $T$.

[Tabelas, árvores sintáticas e formas normais](/cadeiras/md/logica-proposicional/).
