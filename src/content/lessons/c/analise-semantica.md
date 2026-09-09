---
title: Análise semântica
description: Tabela de símbolos, âmbitos com shadowing e verificação de tipos, com um bloco exemplo resolvido.
section: conteudo
order: 4
---

A análise semântica percorre a árvore sintática e pergunta o que a gramática não consegue responder: este nome foi declarado? Neste ponto do programa, o que significa? Os tipos desta operação são compatíveis? O instrumento central é a **tabela de símbolos**, que regista cada declaração com o seu nome, tipo, âmbito e posição.

## Tabela de símbolos e âmbitos

Cada bloco abre um **âmbito** novo que vê os nomes dos âmbitos exteriores. Quando o mesmo nome é declarado dentro e fora, a declaração interior **esconde** (_shadowing_) a exterior dentro desse bloco, e a exterior volta a valer quando o bloco fecha. Na prática, a tabela é uma pilha de mapas: procurar um nome começa no âmbito atual e sobe até encontrar ou esgotar.

Funções e parâmetros vivem no âmbito da função: os parâmetros comportam-se como variáveis locais inicializadas pela chamada, e o tipo de retorno regista-se na entrada da função para verificar cada `return`.

## Exemplo: bloco com shadowing e erro de tipo

```java
int x = 3;
{
  int x = x + 1;
  print(x);
}
```

Construção da tabela, por ordem:

1. Âmbito global: `x -> int`, valor 3.
2. Abre o bloco: âmbito novo vazio.
3. Declaração `int x = ...`: o inicializador avalia-se **antes** de a nova entrada existir, por isso o `x` de `x + 1` resolve-se no global e vale 3. Depois regista-se `x -> int` no âmbito do bloco (shadowing ativo daqui em diante).
4. `print(x)`: resolve-se no âmbito do bloco, o `x` interior, que vale 4. Escreve 4.

Agora a chamada com argumentos trocados. Com `int soma(int a, int b)` declarada, a chamada `soma(true, 2)` percorre a árvore da chamada e compara cada argumento com o parâmetro correspondente: o primeiro é booleano onde se esperava inteiro. Erro semântico com a posição da chamada, antes de gerar uma única instrução. Repara na divisão de trabalho: a sintaxe aceitou a chamada (a forma está certa), a semântica rejeita-a (o significado está errado).

## Verificação de tipos

As regras de tipo sobem pela árvore: o tipo de `a + b` exige operandos numéricos do mesmo tipo e devolve esse tipo; uma condição de `if` ou `while` exige booleano; uma atribuição exige compatibilidade entre o lado direito e a variável. Cada regra violada é um erro com posição. O projeto avalia exatamente isto: declarações em falta, tipos incompatíveis e usos fora do âmbito, cada um reportado onde o programador consegue corrigir.

:::tip[Como cai isto em teste]
O enunciado típico dá-te um programa curto e pede a tabela de símbolos no fim de cada bloco e os erros detetados. Desenha uma coluna por âmbito, regista cada declaração quando ela entra em vigor (o inicializador usa o âmbito anterior) e verifica cada uso e cada operação contra a tabela.
:::

## Para levar para a próxima página

Com os nomes resolvidos e os tipos verificados, o programa faz sentido. Falta executá-lo: os [ambientes de execução](ambientes-execucao/) explicam onde vivem as variáveis quando o programa corre.
