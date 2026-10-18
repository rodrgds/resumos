## Programa e registos

- **PC** guarda o endereço da instrução. ISA define efeitos; ABI acorda argumentos e preservação.
- RV32: 32 registos de 32 bits, x0…x31, mais PC separado. x0 lê 0 e descarta escritas.

| Nome   | Uso         |
| ------ | ----------- |
| ra=x1  | Retorno     |
| sp=x2  | Pilha       |
| t0…t6  | Temporários |
| a0…a7  | Argumentos  |
| s0…s11 | Preservados |

Load/store: aritmética nos registos, memória só por loads/stores.

## Endereços

- Ao byte: word 4 bytes, halfword 2. 32 bits de endereço: 4 GiB de espaço.
- RARS little endian: byte menos significativo no menor endereço. Bits no registo não se invertem; a ordem depende do ambiente.
- $v[i]$ de words em **B+4i**. `lw t2,8(t1)` lê o índice 2. Alinha words a 4, halfwords a 2.
- `la` obtém endereço; `lw` lê conteúdo. Diretivas (`.word`, `.asciz`, `.align n` a $2^n$ bytes) não executam.
- `ecall`: a7=1 imprime inteiro, 11 carácter, 10 termina. Só RARS.

[Endereços e RARS](/cadeiras/fsc/legv8-registos-memoria/#endereços-e-little-endian).
