---
title: Programação funcional
description: Paradigmas, funções puras, map, filter e reduce, lambda e funções de ordem superior.
section: conteudo
order: 8
---

Há várias formas de organizar um programa, chamadas **paradigmas**. Os programas **procedimentais** são listas de instruções que dizem ao computador o que fazer, passo a passo (C e Pascal são exemplos). As linguagens **declarativas** descrevem o problema e deixam a linguagem descobrir como calcular (SQL é o exemplo típico). As linguagens **orientadas por objetos** organizam o programa em objetos com estado interno e métodos (Java e Smalltalk). Python suporta vários paradigmas sem obrigar a nenhum, o que permite escolher o mais legível para cada problema.

O paradigma **funcional** decompõe problemas em funções que recebem entradas e produzem saídas, idealmente como funções matemáticas: o mesmo input dá sempre o mesmo output, sem **efeitos secundários** (sem alterar variáveis globais, sem ler nem escrever a meio da computação). Uma função assim chama-se **pura** e é mais fácil de testar e de depurar, porque o seu comportamento depende apenas dos argumentos.

## map, filter e reduce

Três funções capturam os padrões mais comuns de percorrer sequências. A `map` aplica a mesma função a todos os elementos. A `filter` guarda os elementos que satisfazem um predicado (uma função que devolve um lógico). A `reduce`, do módulo `functools`, combina todos os elementos num único valor usando uma função de dois argumentos.

```python
from functools import reduce

numeros = [1, 2, 3, 4]
print(list(map(lambda x: x * 2, numeros)))
print(list(filter(lambda x: x % 2 == 0, numeros)))
print(reduce(lambda a, b: a + b, numeros))
```

Isto escreve `[2, 4, 6, 8]`, `[2, 4]` e `10`. A palavra `lambda` cria uma função pequena sem nome: `lambda x: x * 2` é a função que dobra o seu argumento. Repara no `list(...)` à volta de `map` e `filter`: estas funções são **preguiçosas** (lazy), devolvem um iterador que só calcula os valores quando pedidos, e cada valor só pode ser consumido uma vez. Para veres o resultado como lista, converte com `list`.

Casos particulares do `reduce` tão comuns que têm nomes próprios: `sum` soma, `any` pergunta se algum elemento é verdadeiro e `all` pergunta se todos são. Usa-os em vez de escreveres o `reduce` equivalente.

## Funções de ordem superior

Uma função de **ordem superior** trata outras funções como valores: recebe funções como argumentos ou devolve funções como resultado. `map`, `filter` e `reduce` são exemplos do primeiro caso. Python trata funções como objetos de **primeira classe**: podes guardá-las em variáveis, passá-las e devolvê-las como qualquer outro valor.

```python
def aplicar_duas_vezes(f, x):
    return f(f(x))

def sucessor(n):
    return n + 1

print(aplicar_duas_vezes(sucessor, 5))
```

Isto escreve `7`: `sucessor` aplicado a `5` dá `6`, e aplicado outra vez dá `7`. A função `aplicar_duas_vezes` não sabe nada sobre sucessores; funciona com qualquer função de um argumento. Esta generalidade é o ponto das funções de ordem superior.

Duas ferramentas do módulo `operator` são úteis nestes contextos. A `itemgetter(n)` devolve uma função que extrai a posição `n`, e a `concat` concatena strings ou listas. Elas evitam escreveres `lambda` triviais quando só precisas de ir buscar um elemento.

## Ordenar com chave

A função `sorted` aceita um argumento `key`: uma função aplicada a cada elemento para decidir a ordem, sem alterar os elementos devolvidos.

```python
palavras = ['programação', 'em', 'python']
print(sorted(palavras))
print(sorted(palavras, key=len))
print(sorted(palavras, key=lambda s: s[-1]))
```

Isto escreve `['em', 'programação', 'python']`, `['em', 'python', 'programação']` e `['em', 'python', 'programação']`. A primeira ordena por ordem lexicográfica. A segunda ordena pelos comprimentos $2, 6, 11$. A terceira ordena pelo último caráter (`m`, `n`, `o`). Repara que `key=len` passa a função `len` sem a chamar: é o `sorted` que a chama para cada elemento.

## Exemplo completo: pipeline funcional

Dada uma lista de notas, queremos a média das notas de aprovação (maiores ou iguais a `10`), calculada como soma a dividir pela contagem. Em estilo funcional, cada passo é uma transformação da sequência: filtrar, depois agregar.

```python
from functools import reduce

def media_aprovados(notas):
    aprovadas = list(filter(lambda n: n >= 10, notas))
    if not aprovadas:
        return 0
    total = reduce(lambda a, b: a + b, aprovadas)
    return total / len(aprovadas)

print(media_aprovados([8, 12, 15, 7, 10]))
print(media_aprovados([5, 7]))
```

Isto escreve `12.333333333333334` e `0`. Segue o primeiro caso: `filter` guarda `[12, 15, 10]`; o `reduce` soma para `37`; `37 / 3` dá a média. O teste `if not aprovadas` protege a divisão por zero quando ninguém passa: sem ele, `len(aprovadas)` seria `0` e o programa morreria com erro de execução. Este teste de entrada vazia é o pormenor que distingue uma solução completa de uma incompleta.

:::tip[Quando usar este estilo]
Usa `map` e `filter` quando a operação se exprime numa linha e a função aplicada já existe ou é um `lambda` simples. Se o `lambda` crescer para lá de uma expressão curta, ou se precisares de acumuladores com lógica condicional, um ciclo explícito ou uma compreensão (próxima página) fica mais legível. Legibilidade decide, não brevidade.
:::
