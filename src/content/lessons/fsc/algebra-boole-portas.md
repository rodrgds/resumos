---
title: Álgebra de Boole e portas lógicas
description: Operações booleanas, dualidade, expansão de Boole, formas canónicas SOP e POS e as portas lógicas.
section: conteudo
order: 4
---

Um **circuito combinatório** é um circuito cuja saída depende apenas dos valores atuais das entradas. Não há memória nem história: com as mesmas entradas, a saída é sempre a mesma. A matemática que descreve estes circuitos é a **álgebra de Boole**, e os seus blocos físicos são as **portas lógicas**.

## A álgebra

Para circuitos digitais, trabalha-se com o conjunto $A = \{0, 1\}$, dotado de duas operações binárias, a soma `+` (OR) e o produto justaposto ou com ponto (AND), e de uma operação unária, a negação $\bar{x}$ (NOT). O conjunto tem de ter pelo menos os dois elementos distintos `0` e `1`.

O **princípio da dualidade** diz que a cada igualdade válida corresponde outra, obtida trocando `+` por produto e `0` por `1`. Se provares um teorema, ficas com o dual de oferta. O **teorema da expansão de Boole** (também chamado de Shannon) diz que qualquer função booleana se pode decompor numa variável:

$$
F(x_1, x_2, \ldots, x_n) = x_1 \cdot F(1, x_2, \ldots, x_n) + \bar{x}_1 \cdot F(0, x_2, \ldots, x_n)
$$

Isto é, a função vale o que vale com $x_1 = 1$ quando $x_1$ é 1, e o que vale com $x_1 = 0$ quando $x_1$ é 0. Aplicando a expansão a todas as variáveis, qualquer função se escreve com expressões de dois níveis, o que significa que qualquer função booleana tem um circuito com apenas dois níveis de portas.

## Formas canónicas

A **forma canónica disjuntiva**, ou soma de produtos (SOP, do inglês _sum of products_), escreve a função como OR de termos onde aparecem todas as variáveis. Cada termo que vale 1 numa só linha da tabela de verdade chama-se **mintermo** (_minterm_).

Toma a função $F(A, B) = A \oplus B$ como exemplo. A tabela de verdade dá 1 nas linhas $(0, 1)$ e $(1, 0)$:

| A   | B   | F   |
| --- | --- | --- |
| 0   | 0   | 0   |
| 0   | 1   | 1   |
| 1   | 0   | 1   |
| 1   | 1   | 0   |

A linha $(0, 1)$ corresponde ao produto $\bar{A}B$ e a linha $(1, 0)$ corresponde a $A\bar{B}$. A forma canónica disjuntiva é $F = \bar{A}B + A\bar{B}$.

A **forma canónica conjuntiva**, ou produto de somas (POS, do inglês _product of sums_), faz o dual: escreve a função como AND de somas, uma por cada linha onde a função vale 0. Cada soma chama-se **maxtermo** (_maxterm_). Para a mesma função, as linhas de zero são $(0, 0)$ e $(1, 1)$, e a forma conjuntiva é $F = (A + B)(\bar{A} + \bar{B})$.

Nenhuma das duas é, em geral, a expressão mais simples. Circuitos diferentes podem realizar a mesma função lógica, e quanto mais simples a expressão, mais pequeno o circuito. Para converter de POS para SOP, o caminho mais seguro é reconstruir a tabela de verdade e extrair a outra forma a partir dela.

## As portas lógicas

Cada operação tem uma porta, com um símbolo próprio. As três básicas são:

- Porta **AND**: a saída é 1 só quando todas as entradas são 1. $F = AB$.
- Porta **OR**: a saída é 1 quando pelo menos uma entrada é 1. $F = A + B$.
- Porta **NOT** (inversor): tem uma só entrada e nega-a. $F = \bar{A}$.

Duas portas derivadas aparecem em quase todos os circuitos:

- Porta **XOR** (OU exclusivo): a saída é 1 quando as entradas são diferentes. $F = \bar{A}B + A\bar{B}$, que é exatamente a SOP do exemplo acima.
- Porta **XNOR** (OU exclusivo negado, a bicondicional): a saída é 1 quando as entradas são iguais. $F = AB + \bar{A}\bar{B}$. É a negação da XOR.

Todas as portas exceto a NOT podem ter mais de duas entradas. Para confirmares que percebeste, verifica na tabela de verdade que $A \oplus B$ com $A = 1$, $B = 1$ dá 0 (entradas iguais), enquanto a XNOR dá 1.

:::tip[Escolhe a forma pelo que precisas]
Se a tabela tem poucos uns, a SOP fica curta. Se tem poucos zeros, a POS fica curta. Este truque orienta a primeira escrita; a simplificação posterior pode mudar o resultado.
:::
