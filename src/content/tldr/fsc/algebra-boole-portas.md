## Operações

AND escreve-se $AB$, OR $A+B$, NOT $\overline A$. Precedência: NOT, AND, OR. XOR vale 1 com entradas diferentes.

| Regra        | AND              | OR                |
| ------------ | ---------------- | ----------------- |
| Neutro       | $A1=A$           | $A+0=A$           |
| Absorvente   | $A0=0$           | $A+1=1$           |
| Idempotência | $AA=A$           | $A+A=A$           |
| Complemento  | $A\overline A=0$ | $A+\overline A=1$ |
| Absorção     | $A(A+B)=A$       | $A+AB=A$          |

- Distributividade nas duas direções, incluindo $A+BC=(A+B)(A+C)$.
- **De Morgan:** troca AND/OR do nível e nega operandos. $\overline{A+BC}=\overline A(\overline B+\overline C)$.

## Formas canónicas

Com $n$ entradas: $2^n$ linhas, índice em binário pela ordem declarada.

- **Mintermo:** todas as variáveis; vale 1 numa só linha. $m_5=A\overline BC$.
- **Maxtermo:** todas as variáveis; vale 0 numa só linha. $M_5=\overline A+B+\overline C$.
- SOP canónica: OR dos mintermos das linhas 1. POS canónica: AND dos maxtermos das linhas 0.
- Termo que omite variáveis está simplificado, não canónico.

## Portas universais e Shannon

- NAND e NOR constroem qualquer função. $H=AB+CD$ com três NAND: $u=\overline{AB}$, $v=\overline{CD}$, $H=\overline{uv}$.
- Shannon separa por A: $F=\overline A F(0)+AF(1)$. Esta forma escolhe entre os dois cofatores conforme A; um MUX selecionado por A implementa esta seleção. Para $F=\Sigma m(1,3,5,6)$: $I_0=C$, $I_1=B\oplus C$.
- Confirma a equivalência em **todas as linhas**.

[Formas canónicas na lição](/cadeiras/fsc/algebra-boole-portas/#formas-canónicas).
