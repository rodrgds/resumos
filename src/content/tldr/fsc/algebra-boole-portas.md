## Operações e identidades

AND escreve-se $AB$, OR $A+B$ e NOT $\overline A$. $+$ aqui é OR. XOR vale 1 quando as entradas diferem; XNOR, quando são iguais. A precedência é NOT, AND, OR.

| Regra        | AND              | OR                |
| ------------ | ---------------- | ----------------- |
| Neutro       | $A1=A$           | $A+0=A$           |
| Absorvente   | $A0=0$           | $A+1=1$           |
| Idempotência | $AA=A$           | $A+A=A$           |
| Complemento  | $A\overline A=0$ | $A+\overline A=1$ |
| Absorção     | $A(A+B)=A$       | $A+AB=A$          |

A distributividade vale nas duas formas: $A(B+C)=AB+AC$ e $A+BC=(A+B)(A+C)$.

**De Morgan** troca AND/OR e nega os operandos do nível abrangido:

$$\overline{AB}=\overline A+\overline B,\qquad \overline{A+B}=\overline A\overline B.$$

Por exemplo, $\overline{A+BC}=\overline A(\overline B+\overline C)$.

## Formas canónicas

Com $n$ entradas há $2^n$ linhas. O índice usa a ordem declarada das variáveis.

- **Mintermo:** produto de todas as variáveis, direto para bit 1 e negado para bit 0. Vale 1 numa só linha. Em ABC, $m_5=A\overline BC$.
- **Maxtermo:** soma de todas as variáveis, direto para bit 0 e negado para bit 1. Vale 0 numa só linha. $M_5=\overline A+B+\overline C$.

A SOP canónica soma os mintermos das linhas a 1; a POS canónica multiplica os maxtermos das linhas a 0. Um termo que omite variáveis pode ser simplificado, mas não é canónico.

## Portas universais e Shannon

NAND e NOR permitem construir qualquer função booleana. Para $H=AB+CD$, usa $u=\overline{AB}$, $v=\overline{CD}$ e uma NAND final $H=\overline{uv}$. NOT é $\operatorname{NAND}(A,A)$.

A expansão de Shannon corresponde a um MUX selecionado por A:

$$F=\overline A F(0,B,C)+AF(1,B,C).$$

Para $F=\Sigma m(1,3,5,6)$, liga $I_0=C$ e $I_1=B\oplus C$. Verifica equivalência em **todas as linhas**, não apenas num exemplo.

[Formas canónicas e implementação](/cadeiras/fsc/algebra-boole-portas/#formas-canónicas).
