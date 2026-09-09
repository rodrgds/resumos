---
title: Assembly RISC-V
description: Registos, instruções base, acessos à memória, saltos e a convenção de chamada com a pilha.
section: conteudo
order: 1
---

Em FSC programaste em LEGv8, um conjunto de instruções inventado para ensinar. Em AC programas em RISC-V, um conjunto real e aberto que equipa desde microcontroladores até supercomputadores. A boa notícia: as ideias são as mesmas, registos, memória endereçável ao byte, saltos e pilha, e só os nomes e os detalhes mudam. Esta página faz essa ponte.

## Os registos que interessam

O RISC-V tem 32 registos inteiros, `x0` a `x31`. Cada um tem um nome de função que deves usar no código:

| Nome      | Registos  | Para que serve                                    |
| --------- | --------- | ------------------------------------------------- |
| `zero`    | `x0`      | Vale sempre 0; escritas são ignoradas             |
| `ra`      | `x1`      | Endereço de regresso das chamadas                 |
| `sp`      | `x2`      | Apontador da pilha                                |
| `a0`–`a7` | `x10`–`x17` | Argumentos das funções e valor de retorno (`a0`) |
| `t0`–`t6` | `x5`–`x7`, `x28`–`x31` | Temporários (o chamado pode estragá-los) |
| `s0`–`s11` | `x8`, `x9`, `x18`–`x27` | Guardados (o chamado tem de os preservar) |

Há duas diferenças grandes em relação ao LEGv8. A primeira: não há um registo de zero inventado, há o `zero` (`x0`), que vale sempre 0 e serve para inicializar registos e sintetizar instruções. A segunda: em vez de `X30` como registo de ligação, há o `ra`, e em vez de pares dedicados há uma convenção explícita sobre que registos cada função pode estragar.

Os temporários `t0`–`t6` e os argumentos `a0`–`a7` são do chamador: se precisares do valor depois de uma chamada, guarda-o antes. Os guardados `s0`–`s11` são do chamado: uma função que os use tem de gravar o valor antigo na pilha e repô-lo antes de regressar. O `s0` também faz de `fp` (_frame pointer_) quando a função precisa de uma referência estável à sua zona da pilha.

## Contas, imediatos e memória

As operações entre registos têm o formato familiar de três operandos:

```riscv
add  t0, t1, t2    # t0 = t1 + t2
sub  t0, t1, t2    # t0 = t1 - t2
and  t0, t1, t2    # e bit a bit
or   t0, t1, t2    # ou bit a bit
xor  t0, t1, t2    # ou exclusivo
slt  t0, t1, t2    # t0 = 1 se t1 < t2 (com sinal), senão 0
```

Com constantes usa-se a versão imediata, com um `i` no fim do nome:

```riscv
addi t0, t1, 20    # t0 = t1 + 20
andi t0, t1, 0xFF  # t0 = t1 & 0xFF (só o byte baixo)
slli t0, t1, 2     # t0 = t1 << 2 (multiplica por 4)
```

Repara que não há um `subi`: para subtrair uma constante, somas o seu simétrico com `addi`. E ao contrário do LEGv8, os deslocamentos (`slli`, `srli`, `srai`) são instruções próprias, não um campo das instruções de soma.

Os acessos à memória usam `lw` e `sw` para palavras de 32 bits e `ld` e `sd` para _doublewords_ de 64 bits:

```riscv
lw   t0, 8(t1)     # t0 = memória[t1 + 8], palavra de 32 bits
sw   t0, 8(t1)     # memória[t1 + 8] = t0
ld   t0, 0(sp)     # t0 = memória[sp], 64 bits
```

Tal como no LEGv8, só as instruções de acesso tocam na memória; todo o resto trabalha entre registos. É a filosofia _load-store_ dos RISC.

## Saltos e decisões

Os saltos condicionais comparam dois registos e saltam se a condição se verificar:

```riscv
beq  t0, zero, fim  # salta se t0 == 0
bne  t0, t1, ciclo  # salta se t0 != t1
blt  t0, t1, menor  # salta se t0 < t1 (com sinal)
bge  t0, t1, maior  # salta se t0 >= t1
```

Não há instrução de comparação separada nem flags: a comparação vive dentro do salto. Para condições compostas, combina com `slt`: calcula o resultado para um temporário e testa-o com `beq` ou `bne` contra `zero`.

Os saltos para procedimentos usam `jal` (_jump and link_) e `jalr`:

```riscv
jal  ra, soma       # ra = PC + 4; PC = endereço de soma
jalr zero, 0(ra)    # PC = ra; regresso (equivale a ret)
```

`jal ra, soma` guarda em `ra` o endereço da instrução seguinte e salta. No fim da função, `jalr zero, 0(ra)` salta para esse endereço guardado. O `ret` que vês nos exemplos é só um nome simpático para esta segunda instrução.

## Um exemplo completo: somar um vetor

Soma os 100 inteiros de 32 bits guardados a partir do endereço em `a0` e devolve o total em `a0`:

```riscv
soma_vetor:
    li    t0, 0        # t0 = soma acumulada
    li    t1, 0        # t1 = índice i
ciclo:
    bge   t1, a1, fim  # se i >= n (em a1), termina
    slli  t2, t1, 2    # t2 = i * 4 (cada inteiro ocupa 4 bytes)
    add   t2, a0, t2   # t2 = endereço de vetor[i]
    lw    t3, 0(t2)    # t3 = vetor[i]
    add   t0, t0, t3   # soma += vetor[i]
    addi  t1, t1, 1    # i++
    jal   zero, ciclo  # repete
fim:
    mv    a0, t0       # devolve a soma em a0
    jalr  zero, 0(ra)
```

Segue com valores pequenos para verificar: vetor `[5, 7]` em algum endereço base `B`, com `n = 2`. Na primeira volta, `t2 = 0`, lê-se `memória[B] = 5`, a soma fica 5. Na segunda, `t2 = 4`, lê-se `memória[B+4] = 7`, a soma fica 12. Na terceira, `t1 = 2`, o `bge` confirma e sai do ciclo com `a0 = 12`.

Duas instruções novas merecem atenção. `li` (_load immediate_) carrega uma constante qualquer num registo, o assembler trata de a decompor se ela não couber no imediato. `mv a0, t0` copia um registo para outro e é na verdade `addi a0, t0, 0`. Vais ver muitas destas pseudo-instruções nos exemplos: são abreviaturas que o assembler traduz para instruções reais.

:::tip[Como ler um salto]
Quando vires `bge t1, a1, fim`, lê em voz alta: "se t1 for maior ou igual a a1, vai para fim". Confirma sempre qual é o caso de saída e qual é o caso de continuar, porque trocar os dois é o erro mais comum nestes ciclos.
:::

## Chamadas e a pilha

Uma função que chama outra função tem um problema: a chamada interior escreve o seu próprio endereço de regresso em `ra` e apaga o da função atual. A solução é a pilha, que cresce para endereços mais baixos e se gere com `sp`:

```riscv
maximo_3:
    addi  sp, sp, -16  # reserva 16 bytes (a pilha mantém-se alinhada a 16)
    sd    ra, 8(sp)    # guarda o endereço de regresso
    sd    s0, 0(sp)    # guarda s0, que vamos usar
    # ... corpo: chama maximo_2, usa s0 à vontade ...
    ld    s0, 0(sp)    # repõe s0
    ld    ra, 8(sp)    # repõe o regresso
    addi  sp, sp, 16   # liberta a zona
    jalr  zero, 0(ra)
```

A disciplina é rígida: reserva no início, guarda `ra` e todos os `s` que usares, repõe pela ordem inversa no fim. Uma função que não chama ninguém (_leaf_) e só usa temporários pode saltar a pilha toda. E lembra-te de que os argumentos vão em `a0`–`a7` e o resultado volta em `a0`: é assim que o chamador e o chamado combinam sem partilhar mais nada.

Corre este padrão no WebRISC-V ou no qtrvsim com uma função que chama outra e observa `ra` e `sp` a cada passo. Ver o endereço de regresso a ser guardado e reposto tira a magia toda ao mecanismo.

## Para levar para a próxima página

Com o assembly assente, a pergunta passa a ser quanto tempo cada programa demora. A página sobre [desempenho](desempenho/) define o tempo de execução, o CPI e a lei de Amdahl, as três ferramentas com que vais comparar todas as técnicas desta cadeira.
