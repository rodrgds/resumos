---
title: 'LEGv8: instruções'
description: Formatos R, D, CB e B, acessos à memória, saltos condicionais e procedimentos.
section: conteudo
order: 9
---

Cada instrução LEGv8 ocupa 4 bytes, ou seja, 32 bits. O formato, a posição dos campos dentro desses 32 bits, depende da família da instrução. Há quatro famílias nesta cadeira: R, D, CB e B.

## Instruções do tipo R

As instruções do tipo R fazem contas entre registos: `ADD`, `SUB`, `AND` e `ORR` são os exemplos. O formato divide-se assim, do bit 31 ao bit 0:

```
31        21 20    16 15    10 9     5 4      0
| OPCODE    | Rm      | SHAMT   | Rn     | Rd    |
```

`Rn` é o primeiro operando, `Rm` o segundo, `Rd` o destino e `SHAMT` a quantidade de deslocamento (quase sempre `000000`, isto é, sem deslocar). O campo `ALUOp` da unidade de controlo vale `10` para este tipo, a dizer à ALU que a operação vem do campo de função da instrução.

Um exemplo: `ADD X2, X3, X4` soma `X3` com `X4` e guarda em `X2`. Todos os operandos são registos; não há memória envolvida.

## Instruções do tipo D

As instruções do tipo D acedem à memória: `LDUR` (ler) e `STUR` (escrever). O formato é:

```
31        21 20         12 11 10 9  8 9     5 4      0
| OPCODE    | OFFSET      | 00    | Rn     | Rt    |
```

O endereço acedido calcula-se como `Rn + OFFSET`, com o OFFSET em complemento para dois. A ALU, nestas instruções, efetua sempre uma adição (`ALUOp = 00`). `LDUR X0, [X1, #8]` lê a _doubleword_ que está 8 bytes acima do endereço em `X1` e guarda-a em `X0`. `STUR X0, [X1, #8]` faz o inverso.

## Saltos condicionais e incondicionais

As instruções de salto condicional (tipo CB), como `CBZ` (_compare and branch if zero_), testam um registo e saltam se ele for zero:

```
23        5 4      0
| ADDRESS   | Rt    |
```

O novo valor do PC é `PC + ADDRESS × 4`, porque cada instrução ocupa 4 bytes e o campo guarda o deslocamento em unidades de instruções. O `ALUOp` vale `01` e o registo `Rt` é o registo comparado.

O salto incondicional `B` tem só o campo de endereço e faz sempre `PC + ADDRESS × 4`. A instrução `BL` (salto com ligação) faz o mesmo e ainda guarda em X30 (LR) o endereço da instrução seguinte, para o procedimento saber para onde regressar. É por isso que o LR existe.

## Procedimentos

Um procedimento **leaf** não chama mais ninguém e pode viver só nos registos. Um procedimento **non-leaf** invoca outros procedimentos e precisa da pilha: antes de cada chamada, guarda na pilha os registos que o chamado pode estragar (incluindo o LR) e o seu FP; no regresso, repõe tudo pela ordem inversa.

Segue uma chamada com atenção aos endereços. Se `BL func` está no endereço 1000, o LR fica com 1004 e o PC salta para `func`. Dentro de `func`, antes de chamar outra função, o LR atual (1004) vai para a pilha, porque a nova chamada vai escrever o seu próprio endereço de regresso no LR. Sem esta disciplina, o primeiro endereço de regresso perdia-se e o programa não voltava ao ponto certo.

:::warning[Três erros comuns]
Esquecer que o deslocamento do salto se multiplica por 4; usar um OFFSET que não é múltiplo de 8 num acesso de 64 bits; e guardar registos na pilha sem os repor pela ordem inversa. Qualquer um deles desvia o programa para um endereço errado.
:::
