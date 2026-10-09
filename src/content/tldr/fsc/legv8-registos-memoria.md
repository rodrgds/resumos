## RV32 e programa

O **PC** guarda o endereço da instrução. Fetch lê-a, decode identifica operação e operandos, execute aplica-a. A ISA define efeitos observáveis; a ABI define acordos como argumentos e preservação de registos.

Compilador traduz alto nível; assembler produz código máquina; linker resolve símbolos entre módulos; loader prepara a execução. Uma etiqueta nomeia uma posição, não um registo.

RV32 tem 32 registos inteiros de 32 bits, x0…x31, mais o PC separado. x0 lê sempre 0 e descarta escritas. Aliases não acrescentam registos:

| Nome   | Uso                 |
| ------ | ------------------- |
| ra=x1  | Retorno             |
| sp=x2  | Pilha               |
| t0…t6  | Temporários         |
| a0…a7  | Argumentos          |
| s0…s11 | Valores preservados |

A organização **load/store** faz aritmética nos registos e transferências para memória por loads/stores.

## Endereços e bytes

A memória é endereçada ao byte. Word=4 bytes; halfword=2. 32 bits de endereço permitem 4 GiB de espaço, sem exigir toda essa RAM instalada.

No **RARS**, little endian põe o byte menos significativo no menor endereço:

| Endereço | Byte de `0x12345678` |
| -------- | -------------------- |
| B        | 78                   |
| B+1      | 56                   |
| B+2      | 34                   |
| B+3      | 12                   |

A ordem dos bits no registo não se inverte. A ordem de bytes depende do ambiente RISC-V, não é universal. Usa alinhamento múltiplo de 4 para words e de 2 para halfwords; acessos desalinhados dependem do ambiente.

Num vetor de words, $v[i]$ fica em **B+4i**. `lw t2,8(t1)` lê o índice 2, com t1=B. `la` obtém endereço; `lw` lê conteúdo; `sb` altera só um byte.

## Diretivas RARS

`.text` contém instruções; `.data`, dados estáticos. `.word`, `.half`, `.byte` emitem 32,16,8 bits; `.asciz` acrescenta zero final; `.space n` reserva n bytes; `.align n` alinha a $2^n$ bytes. Diretivas não são instruções executadas.

Os serviços `ecall` do RARS usam a7=1 para imprimir o inteiro de a0, 11 para carácter e 10 para terminar. Não são serviços portáveis para qualquer sistema.

[Registos e organização da memória](/cadeiras/fsc/legv8-registos-memoria/#endereços-e-little-endian).
