import Typst from '../../../components/Typst.astro';
import karnaughAbc from '../../md/karnaugh-abc.typ?raw';

## Fórmulas

- Uma proposição vale $T$ ou $F$. Uma fórmula usa variáveis, $\neg$ e conetivas binárias. A conetiva principal é a última da árvore sintática.
- Precedência: $\neg$, depois $\land$, depois $\lor$, depois $\to$. A implicação associa à direita: $p\to q\to r$ é $p\to(q\to r)$.

| Conetiva             | Vale $T$ quando      |
| -------------------- | -------------------- |
| $\neg p$             | $p$ é $F$            |
| $p\land q$           | ambas são $T$        |
| $p\lor q$            | pelo menos uma é $T$ |
| $p\to q$             | não tens $p=T,q=F$   |
| $p\leftrightarrow q$ | os valores coincidem |

A disjunção é inclusiva. A expressão "exatamente uma" precisa de $(p\lor q)\land\neg(p\land q)$.

## Implicações derivadas

Para $p\to q$, com $q$ necessária para $p$:

| Nome           | Forma             | Relação com a original |
| -------------- | ----------------- | ---------------------- |
| Recíproca      | $q\to p$          | não equivale           |
| Inversa        | $\neg p\to\neg q$ | equivale à recíproca   |
| Contrapositiva | $\neg q\to\neg p$ | equivale à original    |

"Se" marca a condição suficiente; "só se" marca a condição necessária. Afirmar o consequente troca a original pela recíproca. Com $p$ para "há autorização" e $r$ para "a porta abre", ver a porta aberta não prova a autorização: outra abertura também satisfaz $p=F$, $r=T$.

## Atribuições

- Uma atribuição escolhe $T$ ou $F$ para cada variável. Com $n$ variáveis distintas há $2^n$ linhas.
- Uma tautologia é $T$ em todas. Satisfazível é $T$ em alguma. Uma contradição é $F$ em todas. Contingente tem $T$ e $F$.
- $\Gamma\models\varphi$ exige que toda a linha com todas as premissas $T$ dê conclusão $T$. Um contraexemplo tem as premissas $T$ e a conclusão $F$, por exemplo $p=F,q=T$ contra $p\to q,q\models p$.
- Para $\Gamma$ finito, testa se $(\bigwedge_{\psi\in\Gamma}\psi)\land\neg\varphi$ é insatisfazível.
- Juntar premissas preserva a consequência. Retirar premissas ou intersectar dois conjuntos que implicam $\theta$ pode perder $\theta$.

## Equivalências úteis

$\varphi\Leftrightarrow\psi$ compara valores em todas as linhas. $\varphi\leftrightarrow\psi$ é fórmula, tautológica nesse caso.

- $p\to q\Leftrightarrow\neg p\lor q\Leftrightarrow\neg q\to\neg p$.
- $\neg(p\land q)\Leftrightarrow\neg p\lor\neg q$.
- $\neg(p\lor q)\Leftrightarrow\neg p\land\neg q$.
- Conjunção e disjunção são comutativas, associativas e idempotentes; distribuem-se uma sobre a outra.
- Absorção: $p\land(p\lor q)\Leftrightarrow p$ e $p\lor(p\land q)\Leftrightarrow p$.

## Formas normais

Um literal é uma variável ou a sua negação.

| Forma | Estrutura               | Como obter da tabela        |
| ----- | ----------------------- | --------------------------- |
| FND   | disjunção de conjunções | uma conjunção por linha $T$ |
| FNC   | conjunção de disjunções | uma cláusula por linha $F$  |

1. Na FND, cada termo usa a variável se a linha tem $T$ e a negação se tem $F$.
2. Na FNC, inverte os sinais para a cláusula ser $F$ nessa linha.
3. Um literal isolado também serve como termo ou cláusula.

Exemplo para $\neg(p\to(q\land r))$:

$$
p\land(\neg q\lor\neg r)\Leftrightarrow(p\land\neg q)\lor(p\land\neg r).
$$

A primeira é FNC; a segunda é FND. Uma FND com um termo sem literais opostos já é satisfazível. Uma FNC só é tautologia se cada cláusula tem $p$ e $\neg p$.

## Karnaugh

1. Ordena colunas em Gray, por exemplo $BC=00,01,11,10$. Células vizinhas diferem numa variável; bordas opostas contam como vizinhas.
2. Marca $1$ nas linhas verdadeiras.
3. Agrupa uns em retângulos de $1,2,4$ ou $8$ células.
4. Cada grupo elimina as variáveis que mudam dentro dele.

<Typst
  source={karnaughAbc}
  format="svg"
  alt="Mapa de Karnaugh com linhas A 0 e 1 e colunas BC 00, 01, 11 e 10. Valores 1, 1, 0, 0 em cima e 1, 1, 0, 1 em baixo. Um bloco marca B igual a 0; um par marca A igual a 1 com C igual a 0, com vizinhança pela borda."
/>

Aqui, $B=0$ dá um bloco de quatro células; $A=1,C=0$ dá o par $100,110$, vizinho pela borda, com sobreposição em $100$. O resultado é $\neg B\lor(A\land\neg C)$, com 2 NOT, 1 AND e 1 OR binários.

Um termo incompleto cobre várias linhas. O termo $\neg B\land\neg C$ cobre $000$ e $100$; só um mintermo com as três variáveis cobre uma linha.

## Portas NAND

$P\uparrow Q=\neg(P\land Q)$. Só $\uparrow$ chega para todas as funções:

1. $\neg P\Leftrightarrow P\uparrow P$.
2. $P\land Q\Leftrightarrow(P\uparrow Q)\uparrow(P\uparrow Q)$.
3. $P\lor Q\Leftrightarrow(P\uparrow P)\uparrow(Q\uparrow Q)$.

Para o exemplo acima, a forma explícita com três NAND binários é $B\uparrow(A\uparrow(C\uparrow C))$. A porta NOR com $P\downarrow Q=\neg(P\lor Q)$ também é completa sozinha.

[Formas normais e mapas de Karnaugh](/cadeiras/md/logica-proposicional/#circuitos-mapas-de-karnaugh-e-portas-nand).
