---
title: Tuplos e listas
description: Sequências imutáveis e mutáveis, métodos de listas, alias contra cópia e igualdade contra identidade.
section: conteudo
order: 5
---

Quando um exercício envolve vários valores relacionados, guardá-los em variáveis separadas não escala. Precisas de **estruturas de dados** que agrupem valores. Python oferece duas sequências fundamentais: o **tuplo**, imutável e próprio para agrupar dados heterogéneos, e a **lista**, mutável e própria para coleções que crescem e mudam.

## Tuplos: agrupar valores

Um tuplo escreve-se com parênteses e pode misturar tipos. Serve para tratar vários valores como uma coisa só, por exemplo as coordenadas de um ponto ou o nome e a nota de um aluno.

```python
ponto = (3, 4)
nome, nota = ('Ana', 17)
print(ponto[0])
print(nome, nota)
```

Isto escreve `3` e `Ana 17`. A segunda linha é **desempacotamento**: cada nome recebe o elemento correspondente. Tal como as strings, os tuplos suportam indexação, fatias e concatenação, e são **imutáveis**: depois de criado, nenhum elemento muda.

Dois casos especiais merecem atenção. O tuplo vazio escreve-se `()`. O tuplo de um só elemento exige uma vírgula: `(42,)` é um tuplo, enquanto `(42)` é apenas o número `42` entre parênteses. Este pormenor aparece em exames com frequência.

## Listas: coleções mutáveis

Uma lista escreve-se com parênteses retos e é uma sequência **ordenada e mutável**: podes acrescentar, remover e alterar elementos. Os elementos podem ser de tipos diferentes, embora na prática quase todas as listas que vais usar tenham elementos do mesmo tipo.

```python
notas = [12, 15, 10]
notas.append(18)
notas[0] = 13
print(notas)
print(len(notas))
```

Isto escreve `[13, 15, 10, 18]` e `4`. O `append` acrescenta no fim; a atribuição `notas[0] = 13` substitui o primeiro elemento. A função `len` dá o número de elementos.

Os métodos que mais vais usar são:

| Método          | O que faz                                                             |
| --------------- | --------------------------------------------------------------------- |
| `append(x)`     | Acrescenta `x` no fim                                                 |
| `extend(lista)` | Acrescenta cada elemento de `lista` no fim                            |
| `pop()`         | Remove e devolve o último elemento (`pop(i)` remove a posição `i`)    |
| `insert(i, x)`  | Insere `x` na posição `i`                                             |
| `remove(x)`     | Remove a primeira ocorrência de `x`                                   |
| `sort()`        | Ordena a lista no sítio (`sorted(l)` devolve uma lista nova ordenada) |

A diferença entre `append` e `extend` é um clássico: `append` junta um elemento, `extend` junta vários.

```python
a = [1, 4]
a.append([5, 1, 3])
print(a)
b = [1, 4]
b.extend([5, 1, 3])
print(b)
```

Isto escreve `[1, 4, [5, 1, 3]]` e `[1, 4, 5, 1, 3]`. A primeira lista ficou com três elementos, o último dos quais é outra lista; a segunda ficou com cinco números.

## Alias contra cópia, igualdade contra identidade

Aqui está a ideia mais importante da página. Uma lista é um objeto na memória e uma variável é um **nome** que aponta para esse objeto. Atribuir uma lista a outro nome **não** cria uma lista nova: cria um segundo nome para a mesma lista. A isto chama-se **alias**.

```python
notas = [12, 15]
copia = notas
copia.append(18)
print(notas)
```

Isto escreve `[12, 15, 18]`. O `append` alterou a lista partilhada, por isso `notas` também "mudou". Para criar uma lista nova com os mesmos elementos, fatia a lista toda ou usa o método `copy`:

```python
notas = [12, 15]
copia = notas[:]
copia.append(18)
print(notas)
print(copia)
```

Isto escreve `[12, 15]` e `[12, 15, 18]`. Agora são dois objetos independentes. (Esta cópia é **superficial**: se os elementos fossem outras listas, as listas interiores continuariam partilhadas.)

A mesma distinção aplica-se à comparação. O `==` testa a **igualdade** de valores; o `is` testa a **identidade**, se são o mesmo objeto.

```python
a = [1, 2]
b = [1, 2]
print(a == b)
print(a is b)
```

Isto escreve `True` e `False`: duas listas separadas com o mesmo conteúdo são iguais mas não são o mesmo objeto. Em exercícios, compara listas com `==`; o `is` serve para casos especiais como comparar com `None`.

## Percorrer e transformar listas

A travessia de listas segue os mesmos padrões das strings. A função `zip` percorre duas listas em paralelo, produzindo pares; a forma `zip(*pares)` faz o inverso, separando pares em duas sequências.

```python
nomes = ['Ana', 'Bruno', 'Carla']
notas = [17, 12, 15]
for nome, nota in zip(nomes, notas):
    print(nome, nota)
```

Isto escreve `Ana 17`, `Bruno 12` e `Carla 15`. Repara que o `zip` pára na lista mais curta; se as listas tiverem comprimentos diferentes, os elementos a mais da lista comprida são ignorados em silêncio, por isso confirma primeiro que têm o mesmo tamanho.

## Exemplo completo: mínimos locais

Um elemento de uma lista de números é um **mínimo local** quando é menor ou igual aos seus dois vizinhos. Por exemplo, em `[5, 2, 4, 4, 1, 3]`, as posições `1` (valor `2`, vizinhos `5` e `4`) e `4` (valor `1`, vizinhos `4` e `3`) são mínimos locais. A posição `3` (valor `4`, vizinhos `4` e `1`) não é, porque `4 > 1`. Os extremos ficam de fora, porque não têm dois vizinhos.

```python
def minimos_locais(valores):
    """Devolve as posições que são mínimos locais."""
    posicoes = []
    for i in range(1, len(valores) - 1):
        if valores[i] <= valores[i - 1] and valores[i] <= valores[i + 1]:
            posicoes.append(i)
    return posicoes

print(minimos_locais([5, 2, 4, 4, 1, 3]))
```

Isto escreve `[1, 4]`. O `range(1, len(valores) - 1)` exclui exatamente os extremos: começa em `1` e pára antes da última posição. Confere a posição `2` (valor `4`, vizinhos `2` e `4`): `4 <= 2` é falso, por isso não entra. O padrão é reutilizável: percorrer o interior da lista com um acumulador que guarda as posições onde uma condição se verifica.

:::warning[Os erros mais comuns com listas]
Modificar uma lista enquanto a percorres (os índices baralham-se); esquecer que `sort()` devolve `None` e escrever `nova = lista.sort()`; confundir `append` com `extend`; e assumir que atribuir uma lista a outro nome a copia. Quando uma lista "muda sozinha", procura o alias: algures há dois nomes para o mesmo objeto.
:::
