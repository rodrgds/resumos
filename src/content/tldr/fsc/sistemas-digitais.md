## Bits e transístores

Um **bit** representa 0 ou 1 por intervalos de tensão. A zona entre os níveis válidos não é um terceiro valor lógico. As margens toleram algum ruído; os sinais físicos continuam a ter atrasos.

Um conversor analógico-digital amostra e quantifica. Com $n$ bits há $2^n$ códigos; tensões distintas podem receber o mesmo código e perder a sua distinção.

No FET, a tensão entre gate e source controla o canal. NMOS conduz para $V_{GS}>V_t$; PMOS para $V_{SG}>|V_t|$. No modelo lógico ideal, NMOS conduz com controlo 1 e PMOS com controlo 0.

## Portas CMOS

A rede **pull-up** liga a saída à alimentação; a **pull-down**, à massa.

| Porta    | NMOS        | PMOS        | Saída            |
| -------- | ----------- | ----------- | ---------------- |
| Inversor | Um          | Um          | $\overline A$    |
| NAND     | Em série    | Em paralelo | $\overline{AB}$  |
| NOR      | Em paralelo | Em série    | $\overline{A+B}$ |

Na NAND, só $A=B=1$ fecha todo o caminho para a massa. Com $A=1,B=0$, o NMOS de B interrompe a série e o PMOS de B liga a alimentação, dando 1.

Em CMOS ideal estável não há caminho direto alimentação-massa. O consumo de transição e os atrasos exigem um modelo elétrico mais completo.

## Composição

Portas compõem somadores; somadores e lógica compõem a ALU. A CPU executa instruções guardadas em memória, alterando registos ou memória.

- Um bloco **combinatório** calcula a partir das entradas atuais, após propagação.
- Um bloco **sequencial** guarda estado e atualiza-o no instante permitido. Um somador pode mudar entre flancos enquanto o registo de saída conserva o resultado anterior.

[Construção das portas CMOS](/cadeiras/fsc/sistemas-digitais/#construir-nand-e-nor).
