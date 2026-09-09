---
title: Ambientes de execução
description: Pilha, registos de ativação, organização de memória e passagem por valor contra passagem por referência.
section: conteudo
order: 5
---

Quando o programa corre, cada chamada de função precisa de espaço próprio para parâmetros, variáveis locais e o endereço de retorno. Esse espaço é o **registo de ativação** (_frame_), e os registos empilham-se na **pilha de execução**: cada chamada empilha um registo, cada retorno desempilha-o. É a mesma pilha que viste na [convenção de chamada](/cadeiras/ac/riscv-assembly/), agora vista do lado de quem gera o código.

## Organização de memória

Um programa em execução divide a memória em zonas com tempos de vida diferentes:

- **Código**: as instruções, só de leitura.
- **Dados estáticos/globais**: variáveis globais, com endereço fixo durante toda a execução.
- **Pilha** (_stack_): registos de ativação, com ciclo de vida encaixado (o último a entrar é o primeiro a sair).
- **Monte** (_heap_): objetos e vetores criados dinamicamente, com ciclo de vida livre e geridos pelo programador ou pelo coletor de lixo.

Variáveis locais vivem no registo de ativação da chamada atual, por isso duas chamadas da mesma função têm cópias independentes. É isto que torna a recursão possível: cada chamada tem o seu espaço, mesmo sendo o mesmo código.

## Exemplo: recursão com dois registos

```java
int fat(int n) {
  if (n <= 1) return 1;
  return n * fat(n - 1);
}
```

Chamada `fat(2)`: empilha o registo 1 com `n = 2` e o endereço de retorno. A condição é falsa, por isso chama `fat(1)`: empilha o registo 2 com `n = 1`. Agora a condição é verdadeira e devolve 1; desempilha o registo 2. O registo 1 calcula `2 * 1 = 2`, devolve e desempilha. Em cada instante, o `n` usado é o do registo do topo: nunca há confusão entre os dois `n`, porque vivem em endereços diferentes da pilha.

## Passagem de parâmetros

- **Por valor**: a função recebe uma cópia do argumento. Alterar o parâmetro dentro da função não afeta o chamador. É o comportamento dos tipos primitivos em Java e, com as regras próprias de cada linguagem, o caso comum que deves assumir por omissão. Em [Programação](/cadeiras/p/) viste os mesmos efeitos ao passar objetos contra primitivos.
- **Por referência**: a função recebe acesso direto à variável do chamador (na prática, o endereço). Alterar o parâmetro altera o original. Útil para devolver vários resultados ou evitar copiar estruturas grandes, perigoso porque cria efeitos à distância.

A escolha aparece no código gerado: por valor copia o conteúdo para o registo do chamado; por referência copia só o endereço e cada acesso atravessa-o. Quando uma linguagem oferece os dois modos, a declaração do parâmetro decide qual o mecanismo, e a análise semântica já verificou a compatibilidade de tipos nessa altura.

## Para levar para a próxima página

Sabemos onde cada valor vive em execução. O passo seguinte é representar o programa a meio caminho entre a árvore e a máquina: o [código intermédio](codigo-intermedio/).
