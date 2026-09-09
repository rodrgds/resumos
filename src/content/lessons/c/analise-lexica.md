---
title: Análise lexical
description: Expressões regulares e autómatos finitos para reconhecer símbolos, com o prefixo mais longo numa linha de código.
section: conteudo
order: 2
---

A análise lexical é a porta de entrada do compilador: transforma o texto fonte, uma sequência de caracteres, numa sequência de **símbolos** (_tokens_) com categoria e posição. Cada símbolo junta um tipo (identificador, número, operador) ao texto reconhecido e à linha e coluna onde apareceu. Tudo o resto do compilador trabalha sobre símbolos, nunca mais sobre caracteres soltos.

## Especificar com expressões regulares

Cada categoria de símbolo descreve-se com uma [expressão regular](/cadeiras/tc/linguagens-expressoes/). Para uma linguagem pequena:

- identificador: `[a-zA-Z_][a-zA-Z0-9_]*` (letra ou `_`, seguidos de letras, dígitos ou `_`)
- inteiro: `[0-9]+`
- operadores e pontuação: literais como `=`, `+`, `*`, `(`, `)`, `;`

Palavras reservadas como `if` ou `while` casam com o padrão de identificador, por isso tratam-se à parte: depois de reconhecer um identificador, consulta-se uma tabela de palavras reservadas e reclassifica-se o símbolo se for caso disso. Espaços, tabulações e comentários não produzem símbolos, mas contam linhas e colunas para os erros futuros.

## Reconhecer com autómatos

Uma expressão regular descreve, um [autómato finito](/cadeiras/tc/automatos-finitos/) executa. Ferramentas como o flex convertem cada padrão num autómato e combinam-nos num reconhecedor único que corre sobre o texto. Quando dois padrões casam o mesmo prefixo, valem duas regras de desempate, por esta ordem:

1. **Prefixo mais longo** (_maximal munch_): fica o casamento que consome mais caracteres.
2. **Primeira regra**: em empate de comprimento, ganha o padrão listado primeiro (é assim que `if` ganha a identificador).

## Exemplo: o prefixo mais longo em ação

Linha fonte: `soma12 = valor + 30;`. O reconhecedor avança caráter a caráter:

- `soma12`: letras e dígitos casam com identificador; o espaço seguinte não casa, por isso o símbolo fecha aqui: `ID(soma12)`. Repara que não parte em `soma` + `12`: o prefixo mais longo manda.
- `=`: casa com o literal de atribuição.
- `valor`: `ID(valor)` (não é palavra reservada).
- `+`, depois `30`: `NUM(30)`, porque `3` seguido de `0` estende o inteiro e o `;` não é dígito.
- `;`: pontuação.

Resultado: `ID(soma12) = ID(valor) + NUM(30) ;`, cada um com a sua posição. Um erro lexical típico seria um caráter sem padrão, como `~`: o analisador deve parar com "caráter inesperado na linha L, coluna C", e é esta mensagem que vais agradecer no projeto.

:::tip[Como cai isto em teste]
O enunciado típico dá-te os padrões e uma linha de código e pede a sequência de símbolos. Simula o autómato à mão, consumindo sempre o prefixo mais longo, e justifica cada fronteira: "para aqui porque o próximo caráter já não casa com nenhum padrão ativo".
:::

## Para levar para a próxima página

Os símbolos entram, a estrutura sai. A [análise sintática](analise-sintatica/) pega nesta sequência e organiza-a numa árvore segundo a gramática da linguagem.
