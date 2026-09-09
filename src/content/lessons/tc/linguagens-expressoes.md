---
title: Linguagens e expressões regulares
description: Alfabetos, palavras, operações sobre linguagens e a sintaxe das expressões regulares.
section: conteudo
order: 1
---

Antes de falar de máquinas, é preciso falar de dados. Um autómato lê palavras sobre um alfabeto, e uma linguagem é um conjunto de palavras. Esta página fixa esse vocabulário e apresenta as expressões regulares, a notação compacta para descrever linguagens simples. Se "conjunto", "união" e "função" soam a novidade, revê [conjuntos e relações](/cadeiras/md/conjuntos-relacoes/) primeiro.

## Alfabetos e palavras

Um **alfabeto** $\Sigma$ é um conjunto finito e não vazio de símbolos. Exemplos: $\Sigma = \{0, 1\}$ (o alfabeto binário), $\Sigma = \{a, b, c\}$ ou o alfabeto ASCII dos teclados.

Uma **palavra** (ou cadeia) sobre $\Sigma$ é uma sequência finita de símbolos de $\Sigma$. Exemplos sobre $\{0, 1\}$: $0110$, $1$, $0$. A **palavra vazia**, escrita $\varepsilon$, é a sequência com zero símbolos. Não confundas $\varepsilon$ com um símbolo do alfabeto: é a ausência de símbolos.

O **comprimento** $|w|$ de uma palavra $w$ é o número de símbolos que ela contém. Assim $|0110| = 4$ e $|\varepsilon| = 0$.

A **concatenação** cola duas palavras: se $x = 01$ e $y = 10$, então $xy = 0110$. Vale $|xy| = |x| + |y|$, e $\varepsilon$ é o elemento neutro: $w\varepsilon = \varepsilon w = w$ para toda a palavra $w$. A potência $w^n$ abrevia $w$ concatenado consigo próprio $n$ vezes, com $w^0 = \varepsilon$.

$\Sigma^*$ designa o **conjunto de todas as palavras** sobre $\Sigma$, incluindo $\varepsilon$. É infinito mesmo quando $\Sigma$ é finito. Por exemplo, $\{0,1\}^* = \{\varepsilon, 0, 1, 00, 01, 10, 11, 000, \dots\}$.

## Linguagens e operações

Uma **linguagem** sobre $\Sigma$ é um subconjunto qualquer de $\Sigma^*$. Exemplos sobre $\{0, 1\}$:

- $L_1 = \{w \mid w \text{ termina em } 1\}$ (infinita);
- $L_2 = \{01, 0011\}$ (finita);
- $L_3 = \emptyset$ (a linguagem vazia, sem palavras);
- $L_4 = \{\varepsilon\}$ (a linguagem só com a palavra vazia).

Cuidado com a distinção entre $L_3$ e $L_4$: $\emptyset$ não contém nada, nem $\varepsilon$; $\{\varepsilon\}$ contém uma palavra, a vazia. É o erro mais barato desta cadeira e aparece em testes.

Sobre linguagens definem-se três operações, além das operações de conjuntos (união, interseção, complemento):

- **Concatenação:** $AB = \{xy \mid x \in A \text{ e } y \in B\}$. Cola cada palavra de $A$ com cada palavra de $B$.
- **Potência:** $A^0 = \{\varepsilon\}$, $A^{n+1} = A^n A$.
- **Estrela de Kleene:** $A^* = A^0 \cup A^1 \cup A^2 \cup \dots$ (zero ou mais cópias coladas).

Exemplo: se $A = \{0, 11\}$, então $A^2 = \{00, 011, 110, 1111\}$ e $A^*$ contém $\varepsilon$, $0$, $11$, $000$, $011$, e por aí fora.

:::warning[Concatenação de linguagens não é concatenação de palavras]
$AB$ é um conjunto de palavras, não uma palavra. E $A^*$ contém $\varepsilon$ sempre, mesmo que $A$ não contenha: $A^0 = \{\varepsilon\}$ por definição. Quando um exercício pergunta se $\varepsilon \in A^*$, a resposta é sempre sim.
:::

## Expressões regulares

Uma **expressão regular** sobre $\Sigma$ é uma fórmula que descreve uma linguagem, construída com estas regras:

- $\emptyset$ descreve a linguagem vazia; $\varepsilon$ descreve $\{\varepsilon\}$; cada $a \in \Sigma$ descreve $\{a\}$.
- Se $R_1$ descreve $L_1$ e $R_2$ descreve $L_2$, então $(R_1 \cup R_2)$ descreve $L_1 \cup L_2$, $(R_1 \circ R_2)$ descreve $L_1 L_2$ e $(R_1^*)$ descreve $L_1^*$. Na prática escreve-se $+$ ou $|$ em vez de $\cup$, e omite-se o $\circ$.

A **precedência** poupa parênteses: estrela primeiro, depois concatenação, depois união. Assim $ab^* \cup c$ lê-se $(a \circ (b^*)) \cup c$, ou seja, "um $a$ seguido de zero ou mais $b$, ou um $c$".

Exemplos sobre $\Sigma = \{0, 1\}$:

| Expressão         | Linguagem descrita                              |
| ----------------- | ----------------------------------------------- |
| $0^*1^*$          | zeros seguidos de uns (inclui $\varepsilon$)    |
| $(0 \cup 1)^*$    | todas as palavras, ou seja $\Sigma^*$           |
| $1(0 \cup 1)^*$   | palavras que começam em $1$                     |
| $((0 \cup 1)0)^*$ | palavras de comprimento par que terminam em $0$ |

:::tip[Traduzir descrições para expressões]
Lê a descrição à procura de três padrões: "começa em" (fixa o prefixo), "termina em" (fixa o sufixo) e "contém" (põe $\Sigma^*$ à volta). "Palavras que contêm $01$" é $(0 \cup 1)^*01(0 \cup 1)^*$. "Palavras com um número par de $1$" pede paridade, que se trata na próxima página com dois estados.
:::

## Exemplo resolvido: do enunciado à expressão

Enunciado: sobre $\Sigma = \{a, b\}$, escreve uma expressão regular para a linguagem das palavras que têm pelo menos dois $a$ consecutivos.

Raciocínio: "pelo menos dois $a$ consecutivos" significa que algures na palavra aparece o bloco $aa$. Antes desse bloco pode estar qualquer palavra ($\Sigma^* = (a \cup b)^*$), e depois dele também. Logo a expressão é:

$$(a \cup b)^* aa (a \cup b)^*.$$

Confirma com casos: $aa$ pertence (escolhe $\varepsilon$ dos dois lados). $baaab$ pertence (prefixo $b$, sufixo $ab$). $aba$ não pertence, porque qualquer decomposição $x \cdot aa \cdot y$ exigiria dois $a$ seguidos algures, e $aba$ não os tem. Repara que a verificação "não pertence" usa sempre o mesmo argumento: supõe uma decomposição e mostra que é impossível. Este estilo volta na página sobre [limites das linguagens regulares](limites-regulares/).

## Para levar para a próxima página

Linguagens são conjuntos de palavras, e expressões regulares descrevem uma família delas: as **linguagens regulares**. A próxima pergunta é mecânica: que máquinas reconhecem exatamente estas linguagens? São os [autómatos finitos](automatos-finitos/).
