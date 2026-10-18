## Operações

`add rd,rs1,rs2`: $rd$ recebe a soma das fontes antigas. 32 bits inferiores, sem exceção de overflow.

- Imediatos de **12 bits com sinal** (−2048…2047): `addi`, `andi`, `ori`, `xori`. `xori t0,t0,-1` inverte tudo.
- Deslocamentos: `sll` zeros à esquerda; `srl` zeros à direita; `sra` repete o sinal. Quantidade: 5 bits inferiores por registo, 0…31 imediata.
- `slt` com sinal, `sltu` sem. Extensão M: `mul` metade baixa; `mulh/mulhu/mulhsu` metade alta; `div` trunca para zero. Divisão por zero: quociente todo a 1, resto o dividendo.

## Memória e saltos

- `lw rd,d(rs1)` lê; `sw rs2,d(rs1)` escreve. Deslocamento em **bytes**, 12 bits com sinal. `lb/lh` estendem sinal; `lbu/lhu` zeros.
- Falso segue PC+4; verdadeiro segue **PC da instrução+d**. B: −4096…4094, bit 0 implícito.
- `jal` guarda PC+4 e salta PC+d. `jalr` guarda PC+4 e salta para $(rs1+d)$ com bit 0 limpo, usando rs1 antigo.

## Formatos

Sem instruções comprimidas, alinhadas a 4 bytes. op 7 bits, registos 5, f3 3, f7 7.

| Formato | Campos do bit 31 ao 0                                   |
| ------- | ------------------------------------------------------- |
| R       | f7, rs2, rs1, f3, rd, op                                |
| I       | imm[11:0], rs1, f3, rd, op                              |
| S       | imm[11:5], rs2, rs1, f3, imm[4:0], op                   |
| B       | imm[12], imm[10:5], rs2, rs1, f3, imm[4:1], imm[11], op |
| U       | imm[31:12], rd, op                                      |
| J       | imm[20], imm[10:1], imm[11], imm[19:12], rd, op         |

Os índices são bits do **deslocamento reconstruído**. B junta `imm[12],imm[11],imm[10:5],imm[4:1],0` e estende; já sai em bytes. `lui`+`addi` com metade baixa negativa: `0x12345ABC` usa `lui t0,0x12346` e `addi t0,t0,-1348`.

## Pseudo-instruções

`mv` é addi com 0; `j` é jal para zero; `ret` é `jalr zero,0(ra)`. `li`, `la`, `call` podem emitir várias instruções: conta instruções **máquina**.

[Codificação passo a passo](/cadeiras/fsc/legv8-instrucoes/#codificar-passo-a-passo).
