---
title: C avançado para sistemas
description: Compilador, programas contra processos, bibliotecas e APIs, e gestão de memória em C com um erro corrigido.
section: conteudo
order: 2
---

Todo o resto da cadeira é C a falar com o núcleo, por isso esta página afina a ferramenta: o que o compilador faz ao teu código, a diferença entre programa e processo, como as bibliotecas encaixam e como a memória se gere sem rede de segurança. É revisão orientada a sistemas, não um curso de C. Se os [apontadores](/cadeiras/p/apontadores-memoria/) ainda tremem, revê-os antes de continuar.

## Do fonte ao executável

O `gcc` não compila de uma vez: **pré-processa** (expande `#include` e macros), **compila** (traduz C para assembly), **monta** (gera código objeto) e **liga** (junta o teu código objeto com as bibliotecas num executável). Podes ver as fases com `gcc -save-temps`. O erro que o compilador te dá pertence sempre a uma fase: um `#include` errado falha no pré-processamento, um `;` em falta falha na compilação, uma função declarada mas nunca definida falha na ligação com `undefined reference`.

Um **programa** é o ficheiro executável parado no disco. Um **processo** é o programa em execução, com o seu espaço de memória, descritores e estado de execução. O mesmo programa lançado duas vezes dá dois processos independentes, cada um com a sua memória.

## Bibliotecas e APIs

Quase nenhum programa fala só com o núcleo. As **bibliotecas** oferecem funções prontas que o teu código chama como funções normais: a biblioteca padrão do C dá-te `printf` e `malloc`, e outras bibliotecas dão-te o resto. A **API** é o contrato, o conjunto de funções, tipos e convenções que a biblioteca promete. Ligar estaticamente copia a biblioteca para dentro do executável; ligar dinamicamente deixa-a num ficheiro partilhado (`.so`) que o sistema carrega quando o programa arranca.

A distinção que interessa: chamar `printf` é chamar uma função de biblioteca, que por dentro fará uma chamada de sistema `write`. Chamar `write` diretamente é falar com o núcleo sem intermediários. Na programação de sistema vais usar os dois níveis e convém saber sempre em qual estás.

## Gestão de memória em C

Cada processo vê três zonas principais: o **código** e os dados fixos, a **pilha** (_stack_), que cresce e encolhe com as chamadas de função, e a **área livre** (_heap_), onde o `malloc` reserva blocos do tamanho que pedires e o `free` os devolve. A pilha limpa-se sozinha quando a função retorna; a área livre só se limpa se tu a libertares.

O erro clássico é escrever fora do bloco reservado. Este programa pede espaço para 3 inteiros e escreve 4:

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *v = malloc(3 * sizeof(int));
    for (int i = 0; i <= 3; i++) {
        v[i] = (i + 1) * 10;
    }
    for (int i = 0; i < 3; i++) {
        printf("%d ", v[i]);
    }
    printf("\n");
    free(v);
    return 0;
}
```

O `i <= 3` escreve uma posição a mais, em memória que não é tua. O programa pode imprimir os valores certos e parecer funcionar, ou avariar noutra execução: **comportamento indefinido** significa exatamente isso, que nada está garantido. A correção é `i < 3`. E a segunda parte da disciplina: se o tamanho só se conhece a correr, pede-se de novo com `realloc` e liberta-se sempre com `free`, porque cada bloco não libertado é uma **fuga de memória** que cresce enquanto o processo viver.

:::warning[O compilador não te salva aqui]
O C não verifica limites de arrays nem inicializações. Compila com `gcc -Wall -Wextra` para apanhar o que dá para apanhar, e considera `valgrind` para caçar fugas e escritas fora dos limites. Nenhuma das duas ferramentas substitui contar os índices à mão.
:::

## Para levar para a próxima página

Já tens o mapa: fonte vira executável, executável a correr é processo, bibliotecas e chamadas de sistema são os dois níveis de API, e a memória ou a geres tu ou ninguém gere. Com isto podes criar processos de verdade: [fork, exec, wait e exit](processos/).
