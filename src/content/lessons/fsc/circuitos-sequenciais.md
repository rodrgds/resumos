---
title: Circuitos sequenciais
description: Flip-flops D e T, registos, banco de registos, máquinas de estados finitas e o tempo mínimo de relógio.
section: conteudo
order: 6
---

Há circuitos que um combinatório não consegue realizar: um contador precisa de se lembrar do valor anterior. Num **circuito sequencial**, a saída depende dos valores atuais das entradas **e** de todos os valores anteriores. A memória do passado vive em **variáveis de estado** binárias, guardadas em elementos de memória. Um circuito com $N$ variáveis de estado pode ter até $2^N$ estados.

Duas notas antes dos componentes. O estado atual nem sempre depende do estado anterior (há circuitos que ignoram parte da história). E, como o comportamento depende da sequência, precisamos de conhecer sempre o estado inicial para prever o que o circuito faz.

## Flip-flops

O **flip-flop do tipo D** é o elemento de memória básico. Tem uma entrada de dados $D$, uma entrada de relógio e duas saídas complementares, $Q$ e $\bar{Q}$. Após a transição ativa do relógio (em geral a subida, de 0 para 1), a saída $Q$ passa a valer o que estava em $D$. Entre transições, $Q$ mantém o valor guardado. Pode ter ainda uma entrada de habilitação (EN): com EN desativada, o flip-flop ignora o relógio e conserva o estado.

O **flip-flop do tipo T** troca de estado a cada ciclo de relógio: se está em 0 passa a 1, e vice-versa. É o bloco natural para contadores, onde cada bit muda quando o anterior completa uma volta.

O relógio não pode ser arbitrariamente rápido. Entre duas transições ativas, os sinais têm de atravessar a lógica combinatória e estabilizar antes da exigência de **setup** do flip-flop. O período mínimo é:

$$
T \geq t_{\text{setup}} + t_{\text{pmt}} + t_{\text{pc}}
$$

onde $t_{\text{pmt}}$ é o atraso máximo de propagação na lógica e $t_{\text{pc}}$ o atraso do próprio elemento de memória. Encurtar o período abaixo disto significa amostrar valores ainda instáveis.

## Registos

Um **registo** é um grupo de $n$ elementos de memória acedidos como uma entidade única: guarda uma palavra de $n$ bits e lê-se ou escreve-se de uma vez. Um **banco de registos** é um conjunto de registos com a mesma capacidade, em que cada registo individual se seleciona pelo seu número de ordem. É esta a estrutura que o processador usa para os operandos rápidos, como vais ver no capítulo do LEGv8.

## Máquinas de estados finitas

Uma **máquina de estados finitas** (FSM, do inglês _finite state machine_) descreve um circuito sequencial como um conjunto de estados e transições entre eles. Para estar completamente especificada, é necessário que, para cada estado, se verifiquem duas condições:

1. A soma lógica (OR) das expressões de transição seja 1, ou seja, há sempre uma transição definida para qualquer combinação de entradas.
2. O produto lógico (AND) de cada par de expressões seja 0, ou seja, as transições são mutuamente exclusivas e nunca há ambiguidade sobre o próximo estado.

Um exemplo mínimo: um detetor que assinala quando vê dois uns seguidos. Tem dois estados, `A` (ainda não vi um 1) e `B` (vi um 1). Em `A`, a entrada 0 mantém o circuito em `A` e a entrada 1 leva a `B`. Em `B`, a entrada 1 assinala a deteção e mantém `B`, e a entrada 0 regressa a `A`. Verifica as condições: em `A`, as expressões são $\bar{x}$ e $x$, cuja soma é 1 e cujo produto é 0. Em `B` passa-se o mesmo. As máquinas de estados permitem guardar pequenas quantidades de dados, como a fase de um protocolo, sem recorrer a uma memória de acesso direto.

:::warning[Não confundas os dois mundos]
Um circuito combinatório com realimentação acidental pode oscilar ou reter valores de forma imprevisível, mas isso não faz dele um sequencial bem projetado. A memória intencional vive nos flip-flops, com o relógio a marcar quando o estado pode mudar.
:::
