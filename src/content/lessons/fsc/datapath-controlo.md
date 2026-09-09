---
title: Datapath e controlo
description: Sinais de controlo do monociclo, ALU, decisão do próximo PC e o custo de um ciclo por instrução.
section: conteudo
order: 10
---

O **datapath** é o conjunto de componentes por onde os dados passam: registos, ALU, memória e os multiplexadores que escolhem as entradas de cada um. A **unidade de controlo** lê o opcode da instrução e gera os **sinais de controlo** que configuram o datapath para essa instrução. Esta página mostra o datapath **monociclo**, onde cada instrução se executa inteiramente num só ciclo de relógio.

## Os sinais de controlo

Cada instrução precisa de uma combinação de sinais. A tabela seguinte resume o que a unidade de controlo gera para as quatro famílias:

| Instrução | Reg2Loc | ALUSrc | MemtoReg | RegWrite | MemRead | MemWrite | Branch | ALUOp |
| --------- | ------- | ------ | -------- | -------- | ------- | -------- | ------ | ----- |
| Tipo R    | 0       | 0      | 0        | 1        | 0       | 0        | 0      | 10    |
| LDUR      | X       | 1      | 1        | 1        | 1       | 0        | 0      | 00    |
| STUR      | 1       | 1      | X        | 0        | 0       | 1        | 0      | 00    |
| CBZ       | 1       | X      | X        | 0        | 0       | 0        | 1      | 01    |

Lê cada coluna como uma pergunta sobre o datapath. **Reg2Loc** escolhe qual o segundo registo lido do banco de registos. **ALUSrc** escolhe entre registo (0) e imediato com extensão de sinal (1) como segundo operando da ALU. **MemtoReg** escolhe entre a saída da ALU (0) e o dado vindo da memória (1) para escrever no registo destino. **RegWrite** autoriza a escrita no banco de registos. **MemRead** e **MemWrite** autorizam ler e escrever na memória de dados. **Branch** marca as instruções de salto condicional. **ALUOp** diz à ALU que operação fazer: `10` significa usar o campo de função (tipo R), `00` significa somar (cálculo de endereço) e `01` significa subtrair para testar o zero (CBZ). O `X` significa tanto faz: esse sinal não influencia esta instrução.

Segue a `LDUR` pela tabela: o segundo operando da ALU é o imediato (`ALUSrc = 1`), a ALU soma (`ALUOp = 00`), lê-se a memória (`MemRead = 1`), o valor lido volta para o registo (`MemtoReg = 1`, `RegWrite = 1`) e nada se escreve (`MemWrite = 0`). Na `STUR`, nada se escreve em registos (`RegWrite = 0`) mas escreve-se na memória (`MemWrite = 1`).

## O próximo PC

A seguir a cada instrução, o PC avança 4 bytes, exceto quando um salto condicional se confirma. A seleção faz-se com um multiplexador comandado por **PCSrc**:

$$
\text{PCSrc} = \text{Branch} \cdot \text{Zero}
$$

`Branch` vem da unidade de controlo e `Zero` vem da ALU, que o ativa quando o seu resultado é zero. Só quando ambos são 1, isto é, é uma instrução de salto **e** a condição verificou-se, é que o PC recebe o endereço de salto em vez de `PC + 4`.

## O preço do monociclo

No datapath monociclo, cada instrução ocupa exatamente um ciclo, por isso o CPI (_cycles per instruction_) é 1. Mas o período de relógio tem de acomodar a instrução mais lenta, que é a `LDUR`: atravessa a memória de instruções, o banco de registos, a ALU, a memória de dados e ainda o caminho de escrita no registo.

O resultado é um relógio com um período longo, ditado pelo pior caso. Esta abordagem não é viável para CPUs com instruções de complexidade muito diferente, porque as instruções simples ficam a pagar o tempo das lentas. A resposta da arquitetura a este problema é o **pipeline**, que vais conhecer em Arquitetura de Computadores: em vez de uma instrução de cada vez, várias instruções atravessam o datapath em simultâneo, em fases diferentes.

:::tip[Como ler a tabela numa prova]
Tapa uma linha e reconstrói-a a pensar no percurso dos dados: de onde vêm os operandos da ALU, o resultado vai para onde, há leitura ou escrita de memória. Se o percurso estiver certo, os sinais saem sozinhos.
:::
