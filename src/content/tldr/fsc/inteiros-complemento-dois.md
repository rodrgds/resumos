## Bases e conversões

Na base b, $x=\sum_i d_i b^i$, com $0\le d_i<b$. A unidade tem índice 0; a fração usa índices negativos. $10110{,}101_2=22{,}625_{10}$.

- **Inteiro para outra base:** divide sucessivamente por b e lê os restos de baixo para cima.
- **Fração:** multiplica sucessivamente por b e lê as partes inteiras por ordem direta.
- **Hexadecimal/binário:** agrupa quatro bits; octal/binário, três. Parte da vírgula para fora e completa só as extremidades com zeros.

Uma fração reduzida termina em binário se o denominador for potência de 2. $3/8$ termina; $1/10$ não.

Com n bits há $2^n$ códigos. M situações exigem $\lceil\log_2M\rceil$ bits; de 0 a 300 são **301 valores**, exigindo 9 bits. Um byte tem 8 bits; KiB=$2^{10}$ bytes e kB=$10^3$ bytes.

## Sinal e largura

| Representação em n bits | Intervalo                    | Zeros |
| ----------------------- | ---------------------------- | ----- |
| Sem sinal               | $0$ a $2^n-1$                | Um    |
| Sinal e magnitude       | $-(2^{n-1}-1)$ a $2^{n-1}-1$ | Dois  |
| Complemento para dois   | $-2^{n-1}$ a $2^{n-1}-1$     | Um    |

Em **C2**, o MSB tem peso negativo:

$$x=-b_{n-1}2^{n-1}+\sum_{i=0}^{n-2}b_i2^i.$$

`1011` vale 11 sem sinal e −5 em C2 de quatro bits. Para negar em C2, inverte os bits e soma 1. O mínimo $-2^{n-1}$ não tem simétrico positivo na mesma largura.

Ao alargar, acrescenta zeros sem sinal; em C2, repete o bit de sinal. Em sinal e magnitude, desloca o sinal para o novo MSB e completa a magnitude com zeros.

## Aritmética e overflow

A palavra guardada conserva os n bits inferiores, calculando módulo $2^n$. Subtração usa $A-B=A+\overline B+1$.

| Operação com sinal | Overflow                                                       |
| ------------------ | -------------------------------------------------------------- |
| A+B                | Fontes do mesmo sinal, resultado de sinal diferente            |
| A−B                | Fontes de sinais diferentes, resultado de sinal diferente de A |

Também $V=C_{n-1}\oplus C_n$, entre carry de entrada e saída do bit de sinal. Na adição **sem sinal**, carry final 1 indica overflow; na subtração por complemento, carry 1 indica ausência de empréstimo.

Em quatro bits, `0111+0001=1000` tem overflow C2 sem carry. `1111+0001=0000` tem carry sem overflow C2.

Um produto exato de operandos de n bits pode precisar de 2n bits. Comparações e extensão dos operandos devem respeitar a representação. Escolhe a largura verificando **ambos os extremos** do intervalo pretendido.

[Carry e overflow](/cadeiras/fsc/inteiros-complemento-dois/#adição-e-subtração).
