---
title: Geração de código e registos
description: Seleção de instruções, alocação de registos por coloração e Jasmin para uma expressão com a pilha de operandos.
section: conteudo
order: 7
---

A geração de código traduz o código intermédio para as instruções da máquina alvo. São três decisões encadeadas: **seleção** (que instruções cobrem cada operação), **escalonamento** (por que ordem, respeitando dependências) e **alocação de registos** (que valores vivem em registos e quais ficam em memória).

## Alocação por coloração

Os registos são poucos e os temporários são muitos. O compilador constrói o **grafo de interferência**: um nó por valor vivo, uma aresta entre dois valores vivos ao mesmo tempo. Colorir o grafo com $k$ cores (os $k$ registos) é atribuir registos sem conflitos: vizinhos ficam em registos diferentes.

Quando $k$ cores não chegam, algum valor é **derramado** (_spill_): em vez de registo, vive em memória, com um carregamento antes de cada uso e uma gravação depois de cada definição. O derrame resolve o conflito à custa de acessos extra, por isso o compilador escolhe a vítima pelo custo: derrama o valor usado menos vezes dentro de ciclos.

## Exemplo: Jasmin para `(a + b) * c`

No projeto, o alvo é a JVM através do Jasmin, que usa uma **pilha de operandos**: as instruções tiram operandos da pilha e empurram o resultado. Com `a`, `b`, `c` nas variáveis locais 1, 2 e 3, e o resultado na 4:

```jasmin
iload_1
iload_2
iadd
iload_3
imul
istore 4
```

Segue a pilha: empurra `a`, empurra `b`, `iadd` consome os dois e empurra a soma; empurra `c`, `imul` consome soma e `c` e empurra o produto; `istore 4` guarda-o. A altura máxima é 2, e o verificador da JVM confirma-a estaticamente: cada instrução declara o seu efeito na pilha, por isso um desequilíbrio é erro de compilação, não surpresa em execução.

Onde entra o derrame aqui? As variáveis locais do Jasmin funcionam como a memória de derrame: quando a expressão precisa de mais valores vivos do que os registos (ou as posições de pilha) disponíveis, o gerador guarda temporários em locais extra com `istore` e recarrega-os com `iload`, exatamente o par gravação-carregamento do derrame. Numa expressão maior, verias `istore` a meio do cálculo a guardar um parcial e `iload` a trazê-lo de volta quando preciso.

## Para levar para a próxima página

O código corre e está correto. Mas antes de o entregar, há transformações que o tornam mais rápido sem lhe mudar o significado: a [análise e otimização](otimizacao-codigo/).
