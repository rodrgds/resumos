## Operações RV32

`add rd,rs1,rs2` escreve a soma das fontes antigas em rd. `sub`, `and`, `or`, `xor` seguem a mesma ordem. As operações inteiras conservam 32 bits inferiores, sem exceção por overflow.

`addi`, `andi`, `ori`, `xori` usam imediato de **12 bits com sinal**, −2048…2047. `xori t0,t0,-1` inverte todos os bits.

- `srl` desloca à direita e introduz zeros à esquerda; `sra` repete o sinal; `sll` desloca à esquerda. Quantidade por registo usa os 5 bits inferiores; imediata, 0…31.
- `slt` compara com sinal; `sltu`, sem sinal.
- Na extensão M, `mul` dá a metade baixa; `mulh`, `mulhu`, `mulhsu` dão a alta com sinal/sinal, sem sinal/sem sinal e sinal/sem sinal.
- `div` trunca para zero; `rem` dá o resto. `srai` de −3 por 1 dá −2, mas −3/2 dá −1. Divisão por zero dá quociente todo a 1 e resto igual ao dividendo; o mínimo com sinal dividido por −1 conserva o mínimo e dá resto 0.

## Memória e saltos

`lw rd,d(rs1)` lê em rs1+d; `sw rs2,d(rs1)` escreve rs2 nesse endereço. d conta **bytes**, com 12 bits com sinal. `lb/lh` estendem sinal; `lbu/lhu`, zeros; `sb/sh` escrevem só os bits baixos.

Branches `beq/bne` testam igualdade; `blt/bge`, ordem com sinal; `bltu/bgeu`, sem sinal. Falso segue PC+4; verdadeiro segue **PC da instrução+d**.

`jal rd,alvo` guarda PC+4 e salta PC+d. `jalr rd,d(rs1)` guarda PC+4 e salta para $(rs1+d)\mathbin{\&}\sim1$, usando rs1 antigo e limpando bit 0.

## Formatos de 32 bits

Sem extensão comprimida, instruções estão alinhadas a 4 bytes. op tem 7 bits; registos, 5; f3, 3; f7, 7.

| Formato | Campos do bit 31 ao 0                                   |
| ------- | ------------------------------------------------------- |
| R       | f7, rs2, rs1, f3, rd, op                                |
| I       | imm[11:0], rs1, f3, rd, op                              |
| S       | imm[11:5], rs2, rs1, f3, imm[4:0], op                   |
| B       | imm[12], imm[10:5], rs2, rs1, f3, imm[4:1], imm[11], op |
| U       | imm[31:12], rd, op                                      |
| J       | imm[20], imm[10:1], imm[11], imm[19:12], rd, op         |

B reconstrói `imm[12],imm[11],imm[10:5],imm[4:1],0` e estende sinal. O resultado já conta bytes. Intervalo B: −4096…4094, em passos de 2; J: $-2^{20}$…$2^{20}-2$. Um destino só alinhado a 2 pode ser inválido sem instruções comprimidas.

## Constantes e pseudo-instruções

`lui` coloca 20 bits altos e zeros nos 12 baixos; `auipc` soma essa quantidade ao PC. Para `0x12345ABC`, usa `lui t0,0x12346` seguido de `addi t0,t0,-1348`, compensando a metade baixa negativa.

`mv` é addi com 0; `j` é jal para zero; `ret` é `jalr zero,0(ra)`. `li`, `la`, `call` podem emitir várias instruções. Conta instruções **máquina**, não linhas de assembly.

[Codificar e reconstruir imediatos](/cadeiras/fsc/legv8-instrucoes/#codificar-passo-a-passo).
