---
title: Lógica proposicional
description: Frases atómicas, conetivas booleanas, tabelas de verdade, modelos e equivalências.
section: conteudo
order: 1
---

Quando um programa testa `temperatura > 30 && humidade < 40`, está a combinar duas afirmações com uma conetiva lógica. A lógica proposicional estuda exatamente isto: como construir frases complexas a partir de frases simples e como decidir se são verdadeiras. Precisas dela porque todo o resto da cadeira, e grande parte da verificação de programas, se escreve nesta linguagem.

## Frases atómicas

Uma **frase atómica** é uma afirmação simples que já não se decompõe, como "a Ana está na sala". Na lógica de primeira ordem escrevemos estas frases com predicados e nomes, por exemplo $NaSala(ana)$. Aqui interessa só o ponto de partida: cada frase atómica é verdadeira ou falsa, sem meio termo. Representamos frases atómicas por letras como $P$, $Q$ ou $R$.

Um nome designa exatamente um objeto. "A Ana" refere uma pessoa concreta, e cada ocorrência do nome refere a mesma pessoa dentro do mesmo raciocínio. Isto parece evidente, mas é a convenção que permite substituir nomes por objetos sem ambiguidade mais tarde, nas provas com quantificadores.

## As cinco conetivas

A partir de frases atómicas construímos fórmulas com cinco conetivas. Cada conetiva é **funcional da verdade**: o valor de verdade do resultado depende só do valor de verdade das partes.

| Nome          | Símbolo           | Lê-se       | Exemplo                                                                 |
| ------------- | ----------------- | ----------- | ----------------------------------------------------------------------- |
| Negação       | $\lnot$           | não         | $\lnot P$: "a Ana não está na sala"                                     |
| Conjunção     | $\land$           | e           | $P \land Q$: "a Ana está na sala e o Rui está feliz"                    |
| Disjunção     | $\lor$            | ou          | $P \lor Q$: "a Ana está na sala ou o Rui está feliz"                    |
| Condicional   | $\to$             | se... então | $P \to Q$: "se a Ana está na sala então o Rui está feliz"               |
| Bicondicional | $\leftrightarrow$ | se e só se  | $P \leftrightarrow Q$: "a Ana está na sala se e só se o Rui está feliz" |

Atenção ao "ou": em lógica, $P \lor Q$ é **inclusivo**. É verdadeiro quando pelo menos uma das partes é verdadeira, incluindo o caso em que ambas são. Quando o enunciado quer dizer "ou um ou outro, mas não ambos", isso escreve-se $(P \lor Q) \land \lnot(P \land Q)$.

## Tabelas de verdade

A **tabela de verdade** de uma conetiva mostra o resultado para todas as combinações das entradas. Para $\lnot$, $\land$ e $\lor$:

| $P$ | $Q$ | $\lnot P$ | $P \land Q$ | $P \lor Q$ |
| --- | --- | --------- | ----------- | ---------- |
| V   | V   | F         | V           | V          |
| V   | F   | F         | F           | V          |
| F   | V   | V         | F           | V          |
| F   | F   | V         | F           | F          |

O condicional $P \to Q$ é a conetiva que mais confunde. É falso num único caso: antecedente verdadeiro e consequente falso. Em todos os outros casos é verdadeiro, incluindo quando o antecedente é falso. A tabela é:

| $P$ | $Q$ | $P \to Q$ |
| --- | --- | --------- |
| V   | V   | V         |
| V   | F   | F         |
| F   | V   | V         |
| F   | F   | V         |

Isto chama-se **condicional material**: ele mede valores de verdade, não causas. "Se $2 + 2 = 5$ então eu sou o rei de França" é uma frase verdadeira em lógica, porque o antecedente é falso. Parece estranho, mas é o que permite tratar "se... então" com tabelas. Na página sobre [provas com condicionais](/cadeiras/md/provas-proposicionais/) vais ver como traduzir expressões como "só se", "se", "a menos que" e "sempre que", que é onde quase toda a gente erra.

O bicondicional $P \leftrightarrow Q$ é verdadeiro quando $P$ e $Q$ têm o mesmo valor:

| $P$ | $Q$ | $P \leftrightarrow Q$ |
| --- | --- | --------------------- |
| V   | V   | V                     |
| V   | F   | F                     |
| F   | V   | F                     |
| F   | F   | V                     |

## Avaliar uma fórmula passo a passo

Para saber se uma fórmula é verdadeira, preenche a tabela por dentro para fora. Toma $(P \lor Q) \land \lnot P$ e a linha $P = V$, $Q = F$:

1. $P \lor Q$ com V e F dá V.
2. $\lnot P$ com $P = V$ dá F.
3. $V \land F$ dá F.

Logo, nessa atribuição a fórmula é falsa. Repete para as quatro linhas e obténs a tabela completa:

| $P$ | $Q$ | $P \lor Q$ | $\lnot P$ | $(P \lor Q) \land \lnot P$ |
| --- | --- | ---------- | --------- | -------------------------- |
| V   | V   | V          | F         | F                          |
| V   | F   | V          | F         | F                          |
| F   | V   | V          | V         | V                          |
| F   | F   | F          | V         | F                          |

Repara que o resultado final é V só na linha $P = F$, $Q = V$. Ou seja, a fórmula equivale a $\lnot P \land Q$. Este processo mecânico serve para verificar equivalências quando tens poucas variáveis. Com muitas variáveis a tabela duplica a cada variável nova ($2^n$ linhas para $n$ variáveis), e aí passam a interessar as regras de prova da próxima página.

## Tautologias, contradições e contingências

Conforme o comportamento em todas as linhas, uma fórmula é:

- **tautologia** (ou verdade lógica): verdadeira em todas as linhas, como $P \lor \lnot P$;
- **contradição**: falsa em todas as linhas, como $P \land \lnot P$;
- **contingência**: verdadeira em algumas linhas e falsa noutras, como o exemplo da secção anterior.

Testa $P \to P$. As linhas são $V \to V$ (V) e $F \to F$ (V). É uma tautologia, como esperavas: "se $P$ então $P$" nunca falha.

## Modelos e o mundo de Tarski

Uma **atribuição** que torna a fórmula verdadeira chama-se um **modelo** da fórmula. Na cadeira, os modelos aparecem muitas vezes como mundos de Tarski: um tabuleiro com formas geométricas (cubos, tetraedros, dodecaedros) de vários tamanhos, e predicados como $Cubo(x)$, $Pequeno(x)$ ou $Maior(x, y)$.

Por exemplo, considera o mundo com dois objetos: $a$ é um cubo pequeno e $b$ é um tetraedro grande. A frase $Cubo(a) \land \lnot Cubo(b)$ é verdadeira neste mundo, porque $Cubo(a)$ é V e $Cubo(b)$ é F. Mas $\forall x\, Cubo(x)$ seria falsa, porque $b$ não é cubo. Este jogo de "a frase é verdadeira neste mundo?" é o treino para a noção de consequência lógica: $Q$ é **consequência lógica** de $P$ quando todos os modelos de $P$ são modelos de $Q$, isto é, quando é impossível $P$ ser verdadeiro e $Q$ falso.

:::tip[O erro mais comum nesta fase]
Confundir o condicional com causalidade. $P \to Q$ não diz que $P$ causa $Q$, diz só que não acontece $P$ verdadeiro com $Q$ falso. Sempre que uma tradução "soa mal" por causa disto, volta à tabela: há alguma linha com antecedente V e consequente F? Se não houver, o condicional é verdadeiro.
:::

## Equivalências que deves saber de cor

Duas fórmulas são **logicamente equivalentes** quando têm a mesma tabela de verdade. Estas leis permitem simplificar fórmulas e são a base das provas por equivalências:

- Dupla negação: $\lnot\lnot P \equiv P$.
- Leis de De Morgan: $\lnot(P \land Q) \equiv \lnot P \lor \lnot Q$ e $\lnot(P \lor Q) \equiv \lnot P \land \lnot Q$.
- Condicional como disjunção: $P \to Q \equiv \lnot P \lor Q$.
- Contrapositiva: $P \to Q \equiv \lnot Q \to \lnot P$.
- Comutatividade, associatividade e distributividade de $\land$ e $\lor$, como na aritmética.

Confirma De Morgan com a tabela para $\lnot(P \land Q)$ e $\lnot P \lor \lnot Q$:

| $P$ | $Q$ | $P \land Q$ | $\lnot(P \land Q)$ | $\lnot P$ | $\lnot Q$ | $\lnot P \lor \lnot Q$ |
| --- | --- | ----------- | ------------------ | --------- | --------- | ---------------------- |
| V   | V   | V           | F                  | F         | F         | F                      |
| V   | F   | F           | V                  | F         | V         | V                      |
| F   | V   | F           | V                  | V         | F         | V                      |
| F   | F   | F           | V                  | V         | V         | V                      |

As colunas a negrito coincidem, por isso a equivalência vale.

## Exemplo resolvido: simplificar até ao fim

Simplifica $\lnot(P \to Q) \lor Q$ e classifica o resultado.

1. Converte o condicional: $P \to Q \equiv \lnot P \lor Q$, por isso $\lnot(P \to Q) \equiv \lnot(\lnot P \lor Q)$.
2. Aplica De Morgan: $\lnot(\lnot P \lor Q) \equiv \lnot\lnot P \land \lnot Q \equiv P \land \lnot Q$.
3. A fórmula fica $(P \land \lnot Q) \lor Q$. Distribui: $(P \lor Q) \land (\lnot Q \lor Q)$.
4. $\lnot Q \lor Q$ é uma tautologia, e $X \land V \equiv X$ para qualquer $X$. O resultado é $P \lor Q$.

Como $P \lor Q$ é verdadeiro em três linhas e falso numa, é uma contingência. Repara no passo 4: reconhecer $\lnot Q \lor Q$ como o terceiro excluído poupou uma tabela inteira.

## Para levar para a próxima página

Tabelas de verdade decidem tudo na lógica proposicional, mas não escalam e não explicam _porquê_. As [provas com regras de inferência](/cadeiras/md/provas-proposicionais/) fazem o mesmo trabalho passo a passo, e são elas que os testes pedem com as ferramentas Fitch e Boole.
