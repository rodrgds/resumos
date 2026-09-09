---
title: Circuitos combinatórios
description: Módulos, multiplexadores, descodificadores, desmultiplexadores e o somador ripple-carry.
section: conteudo
order: 5
---

Portas isoladas não chegam longe. O passo seguinte é encapsular grupos de portas em **módulos** com uma função clara e combinar módulos e portas para construir circuitos maiores. Um módulo pode repetir-se: um **circuito iterativo** é constituído por repetições de um mesmo módulo, e os barramentos (feixes de fios desenhados como um só traço) simplificam os diagramas.

## Multiplexador

O **multiplexador** (MUX) seleciona uma de várias entradas de dados e copia-a para a saída. Um MUX $2{:}1$ tem duas entradas de dados $I_0$ e $I_1$, uma entrada de seleção $S_0$ e uma saída $Y$:

$$
Y = \bar{S}_0 I_0 + S_0 I_1
$$

Quando $S_0 = 0$, sai $I_0$; quando $S_0 = 1$, sai $I_1$. Um MUX $2^N{:}1$ tem $N$ entradas de controlo $S_{N-1}, \ldots, S_1, S_0$ e existem multiplexadores $4{:}1$, $8{:}1$ e por aí fora. Há um resultado que deves reter: todas as expressões lógicas se podem implementar com multiplexadores $2{:}1$, bastando ligar as entradas de dados a constantes ou a variáveis e usar as variáveis como seleção.

## Descodificador binário

O **descodificador binário** faz o trabalho inverso: transforma um código com poucos bits em sinais individuais. Um descodificador $N{:}2^N$ tem $N$ entradas e $2^N$ saídas, e ativa exatamente a saída cujo índice corresponde ao código de entrada. Um descodificador $2{:}4$ com entrada `10` ativa a saída $Y_2$ e desativa as restantes.

O descodificador tem ainda uma entrada de habilitação (**enable**, EN): com EN desativada, nenhuma saída ativa. Um facto útil: um descodificador binário $N{:}2^N$ seguido de uma porta OR permite realizar todas as funções de $N$ variáveis, porque cada saída é um mintermo e a OR soma os mintermos pretendidos.

## Desmultiplexador

O **desmultiplexador** (DEMUX) $1{:}2^N$ tem uma entrada de dados, $N$ entradas de controlo e $2^N$ saídas. A entrada é copiada para a saída selecionada; as restantes ficam a zero. Podes vê-lo como um descodificador binário com uma entrada adicional de dados: em vez de ativar a saída selecionada com valor fixo, copia para ela o valor da entrada.

## O somador ripple-carry

O **full adder** (FA) soma três bits, dois operandos e um transporte de entrada, e produz a soma e o transporte de saída. Encadeando um FA por cada posição, com o transporte a passar de um módulo para o seguinte, obtém-se o **somador ripple-carry**, que soma duas palavras de $n$ bits. É o exemplo canónico de circuito iterativo.

Soma $1011$ ($11$) com $0111$ ($7$) com um somador de 4 bits, seguindo o transporte da direita para a esquerda:

```
  Posição:     3 2 1 0
  A:           1 0 1 1
  B:           0 1 1 1
  Transporte:  1 1 1 0 1 (entra 0 na posição 0)
  Soma:        0 0 1 0
```

Posição 0: $1 + 1 + 0 = 10$, escreve 0 e transporta 1. Posição 1: $1 + 1 + 1 = 11$, escreve 1 e transporta 1. Posição 2: $0 + 1 + 1 = 10$, escreve 0 e transporta 1. Posição 3: $1 + 0 + 1 = 10$, escreve 0 e transporta 1. O resultado é `0010` com transporte final 1, ou seja, $10010_2 = 18$. Confirma: $11 + 7 = 18$.

O nome conta a fraqueza: o transporte propaga-se (_ripple_) posição a posição, por isso somar palavras largas demora. Somadores rápidos calculam os transportes em paralelo, mas pagam com mais portas.

> Experimenta: soma `1100` ($12$) com `1010` ($10$) pelo mesmo método e confirma que obténs `10110_2 = 22$.
