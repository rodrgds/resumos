---
title: 'LEGv8: registos e memória'
description: Os 32 registos, endereçamento ao byte, alinhamento, endianness e a pilha.
section: conteudo
order: 8
---

O **LEGv8** é o conjunto de instruções usado na cadeira para mostrar como um processador real recebe ordens. É um subconjunto didático do ARMv8, com instruções de 32 bits e registos de 64 bits. Esta página apresenta onde os dados vivem: os registos e a memória.

## Os registos

O LEGv8 tem 32 registos de 64 bits, numerados de X0 a X30 mais um registo especial. Três têm papéis fixos que deves saber de cor:

| Registo | Nome                 | Papel                                                |
| ------- | -------------------- | ---------------------------------------------------- |
| X28     | SP (_stack pointer_) | Apontador da pilha, o endereço mais recente da pilha |
| X29     | FP (_frame pointer_) | Apontador da moldura do procedimento atual           |
| X30     | LR (_link register_) | Guarda o endereço de regresso nas chamadas           |
| XZR     | _zero register_      | Registo 31: ler dele devolve sempre 0                |

Os restantes, X0 a X27, são de uso geral: guardam operandos, resultados intermédios e argumentos de procedimentos. Aceder a um registo é muito mais rápido do que aceder à memória, por isso uma boa utilização dos registos evita instruções de LOAD. Constantes escritas diretamente na instrução chamam-se **operandos imediatos** e também evitam idas à memória.

## Memória endereçada ao byte

A memória é **endereçada ao byte**: cada endereço identifica um byte de 8 bits. Uma instrução de acesso a uma palavra dupla (_doubleword_, 64 bits) como `LDUR X0, [X1, #0]` refere-se às posições de memória 5000 a 5007 se `X1` valer 5000.

Isto cria uma obrigação: para ler 8 bytes de uma vez, o endereço tem de ser múltiplo de 8. O hardware soma o deslocamento ao registo base e depois aplica um deslocamento lógico à esquerda (**LSL**) para alinhar o acesso. Na prática, quando escreveres um deslocamento para uma _doubleword_, pensa em múltiplos de 8.

## Endianness

Quando um valor de vários bytes vive em endereços consecutivos, há duas convenções possíveis para a ordem dos bytes:

- **Big-endian**: o byte mais significativo fica no menor endereço de memória.
- **Little-endian**: o byte menos significativo fica no menor endereço de memória.

O valor `0x12345678` guardado no endereço 1000 em big-endian põe `0x12` em 1000, `0x34` em 1001, `0x56` em 1002 e `0x78` em 1003. Em little-endian, a ordem inverte-se: `0x78` fica em 1000 e `0x12` em 1003. A convenção tem de ser igual nos dois lados de qualquer troca de dados, ou os valores saem trocados.

## A pilha

A **pilha** (_stack_) é uma zona de memória com disciplina LIFO: o último a entrar é o primeiro a sair (_last in, first out_). O registo SP aponta sempre para o endereço mais recente da pilha.

Colocar dados na pilha (**push**) significa subtrair ao SP, porque a pilha cresce para endereços mais baixos. Tirar dados (**pop**) significa adicionar ao SP. A pilha é necessária nos procedimentos **non-leaf**, os que invocam outros procedimentos: antes de chamar, o procedimento guarda os seus registos na pilha, e ao regressar repõe-nos.

A memória organiza-se por uso: as variáveis automáticas (locais) vivem na zona da pilha e são descartadas; as variáveis estáticas e globais são preservadas e crescem no sentido contrário à pilha; os vetores, as listas ligadas e outras estruturas dinâmicas vivem na **heap**.

:::tip[Três papéis, três registos]
Se trocares SP, FP e LR, resolve este teste rápido: qual deles lê sempre zero? É o XZR. Qual guarda para onde regressar? É o LR (X30). Qual aponta para o topo da pilha? É o SP (X28).
:::
