## Condições e ciclos

- Escolhe comparação com ou sem sinal. Para `if (x<y)`: `bge` salta ao else; `j` no fim do primeiro ramo evita cair no segundo.
- `while` testa antes (zero ou mais vezes); `do...while` testa depois (pelo menos uma). Conta o teste final de saída.

## Vetores e texto

- Apontador de words avança **4 bytes**. Mantém apontador, quantidade restante e acumulador; testa zero antes de ler. `[7,-3,10,0]` dá 14; vazio dá 0.
- Máximo: começa no **primeiro elemento**; vazio precisa de contrato. Zero inicial falha em vetores só negativos.
- Inversão: lê ambas antes de escrever; termina ao cruzar. 0 ou 1 elementos voltam antes de calcular a última posição.
- Texto `.asciz` com `lbu`, 1 byte por passo; terminador não conta. Dígitos `'0'…'9'`, valor c−48. Letras em `A…Z` e `a…z` separados (`A…z` inclui pontuação).
- Decimal para inteiro: $v^+=10v+d$. Rejeita **antes** de operar: v>429496729, ou v igual com d>5. `4294967295` cabe; `4294967296` não.

## Bits e palavras

| Bit k  | Expressão                   |
| ------ | --------------------------- |
| Testar | $x\mathbin{\&}(1\ll k)$     |
| Pôr 1  | $x\mathbin{\lor}(1\ll k)$   |
| Limpar | $x\mathbin{\&}\sim(1\ll k)$ |
| Trocar | $x\mathbin{\oplus}(1\ll k)$ |

- Conta com `srli` até zero; `srai` pode nunca zerar negativos. Rotação combina deslocamentos por k e 32−k; trata k=0 à parte.
- 64 bits: $L=(A_L+B_L)\bmod2^{32}$, $c=[L<A_L]$ estrito sem sinal, $H=(A_H+B_H+c)\bmod2^{32}$.
- Expoente `0xFF` com fração zero: infinito; com fração: NaN. `bits & 0x7FFFFFFF` igual a zero apanha ±0.

[Traço do vetor](/cadeiras/fsc/programacao-riscv/#somar-um-vetor).
