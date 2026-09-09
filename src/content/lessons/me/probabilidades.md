---
title: Probabilidades e Teorema de Bayes
description: Espaços amostrais, probabilidade condicional, independência e a inversão de Bayes com o exemplo do teste de diagnóstico.
section: conteudo
order: 2
---

A descritiva resume o que aconteceu. As probabilidades quantificam o que pode acontecer: atribuem números entre 0 e 1 aos resultados possíveis de uma experiência aleatória. Esta página dá as regras desse cálculo e a ferramenta mais traiçoeira da cadeira, o Teorema de Bayes, que inverte probabilidades condicionadas.

## Espaço amostral e acontecimentos

Uma **experiência aleatória** tem resultado incerto mas conjunto de resultados possíveis conhecido. O **espaço amostral** $\Omega$ é esse conjunto; um **acontecimento** é um subconjunto de $\Omega$. Lançar um dado: $\Omega = \{1, 2, 3, 4, 5, 6\}$; "sair par" é o acontecimento $\{2, 4, 6\}$.

Como os acontecimentos são conjuntos, tudo o que aprendeste sobre [operações com conjuntos](/cadeiras/md/conjuntos-relacoes/) aplica-se diretamente: "A ou B" é $A \cup B$, "A e B" é $A \cap B$, "não A" é o complementar $\bar{A}$. A probabilidade respeita três axiomas: $P(A) \ge 0$ para todo o acontecimento, $P(\Omega) = 1$, e acontecimentos disjuntos somam, $P(A \cup B) = P(A) + P(B)$ se $A \cap B = \emptyset$.

Duas consequências que vais usar sem parar:

- Complementar: $P(\bar{A}) = 1 - P(A)$.
- União geral: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$, porque a interseção foi contada duas vezes.

## Probabilidade condicional e independência

Saber que $B$ aconteceu muda a probabilidade de $A$. A **probabilidade condicional** é:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0.
$$

Lê-se "probabilidade de $A$ dado $B$": restringes o universo a $B$ e medes $A$ lá dentro. Daqui sai a regra da multiplicação, $P(A \cap B) = P(A \mid B)\,P(B)$, que encadeia condicionadas em sequência (útil em diagramas de árvore).

Dois acontecimentos são **independentes** quando saber um não muda o outro: $P(A \mid B) = P(A)$, ou equivalentemente $P(A \cap B) = P(A)\,P(B)$. Atenção à distinção que mais chumba: **disjuntos** ($A \cap B = \emptyset$, não podem ocorrer juntos) não é o mesmo que **independentes** (a ocorrência de um não informa o outro). Dois acontecimentos disjuntos com probabilidade positiva nunca são independentes, porque saber que um ocorreu diz-te que o outro não ocorreu.

## Teorema da Probabilidade Total e Bayes

Se $B_1, \dots, B_k$ partem $\Omega$ (disjuntos e cobrindo tudo), qualquer acontecimento $A$ decompõe-se por eles:

$$
P(A) = \sum_{i=1}^{k} P(A \mid B_i)\,P(B_i).
$$

É o Teorema da Probabilidade Total: calcula $P(A)$ pesando cada cenário. Combinado com a definição de condicional, dá o **Teorema de Bayes**:

$$
P(B_j \mid A) = \frac{P(A \mid B_j)\,P(B_j)}{\sum_i P(A \mid B_i)\,P(B_i)}.
$$

Bayes inverte a seta: conheces $P(A \mid B)$ (o teste dispara quando há doença) e queres $P(B \mid A)$ (há doença quando o teste dispara). Confundir uma com a outra é a falácia da taxa base, e o exemplo seguinte mostra como ela morde.

## Exemplo: o teste de diagnóstico

Um teste deteta uma doença com **sensibilidade** $P(+ \mid D) = 0{,}99$ e **especificidade** $P(- \mid \bar{D}) = 0{,}95$, logo a taxa de falsos positivos é $P(+ \mid \bar{D}) = 0{,}05$. A doença afeta 1 por cento da população: $P(D) = 0{,}01$. Um utente testa positivo. Qual a probabilidade de estar doente, $P(D \mid +)$?

Primeiro a probabilidade total de um positivo:

$$
P(+) = 0{,}99 \times 0{,}01 + 0{,}05 \times 0{,}99 = 0{,}0099 + 0{,}0495 = 0{,}0594.
$$

Depois Bayes:

$$
P(D \mid +) = \frac{0{,}0099}{0{,}0594} = \frac{1}{6} \approx 0{,}167.
$$

Só 16,7 por cento. Apesar de o teste acertar 99 por cento dos doentes, a doença é tão rara que os falsos positivos (5 por cento de 99 por cento de saudáveis) afogam os verdadeiros. A intuição diz "99 por cento de certeza"; a conta diz "1 em 6". É por isso que rastreios positivos pedem sempre um segundo teste: a taxa base manda mais do que a precisão do teste.

:::tip[Quando suspeitar de Bayes no enunciado]
Sempre que o enunciado dá probabilidades "na direção errada" (sintoma dada a doença) e pergunta "na direção certa" (doença dado o sintoma), é Bayes. Monta primeiro a partição (doente e saudável cobrem tudo), calcula o denominador pela Probabilidade Total e só depois divide. Fazer a tabela com 10000 utentes hipotéticos dá o mesmo resultado e ajuda a conferir: 100 doentes geram 99 positivos, 9900 saudáveis geram 495, e $99/(99+495) = 1/6$.
:::
