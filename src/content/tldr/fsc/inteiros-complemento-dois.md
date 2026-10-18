## Bases

Na base $b$: $x=\sum d_ib^i$, $0\le d_i<b$. A unidade tem índice 0; a fração, negativos. $10110{,}101_2=22{,}625$.

- Inteiro: divide por $b$, lê restos de baixo para cima. Fração: multiplica por $b$, lê partes inteiras por ordem direta.
- Hexadecimal: 4 bits por algarismo; octal: 3. Agrupa a partir da vírgula, zeros só nas extremidades.
- Fração finita em binário só com denominador potência de 2. $3/8$ termina; $1/10$ não.
- $n$ bits: $2^n$ códigos. $M$ situações: $\lceil\log_2M\rceil$ bits. 0…300 são 301 valores, 9 bits.

## Sinal

| Representação     | Intervalo $n$ bits           | Zeros |
| ----------------- | ---------------------------- | ----- |
| Sem sinal         | $0$ a $2^n-1$                | Um    |
| Sinal e magnitude | $-(2^{n-1}-1)$ a $2^{n-1}-1$ | Dois  |
| C2                | $-2^{n-1}$ a $2^{n-1}-1$     | Um    |

- C2: MSB com peso negativo, $x=-b_{n-1}2^{n-1}+\sum b_i2^i$. `1011` é 11 sem sinal, −5 em C2.
- Negar em C2: inverte e soma 1. $-2^{n-1}$ não tem simétrico.
- Alargar: zeros sem sinal; repete o sinal em C2; desloca o sinal em sinal e magnitude.

## Soma e overflow

Palavra com $n$ bits inferiores; $A-B=A+\overline B+1$.

- Sem sinal: carry final 1 é overflow; na subtração, carry 1 é ausência de empréstimo.
- C2: overflow quando fontes do mesmo sinal dão resultado de sinal diferente; na subtração, sinais diferentes com resultado de sinal diferente de A. Também $V=C_{n-1}\oplus C_n$.
- O somador é o mesmo; lê **carry** sem sinal e **V** em C2. `0111+0001` tem V sem carry; `1111+0001` tem carry sem V.
- Produto exato pode exigir $2n$ bits. Compara e estende na representação do problema; verifica **ambos os extremos**.

[Adição e subtração](/cadeiras/fsc/inteiros-complemento-dois/#adição-e-subtração).
