---
title: Compreensões e geradores
description: Iteráveis e iteradores, compreensões de listas, conjuntos e dicionários, expressões geradoras e yield.
section: conteudo
order: 9
---

Um **iterável** é um objeto que representa uma sequência de dados e que pode ser percorrido, como uma lista ou uma string. Um **iterador** é o mecanismo que produz esses dados um de cada vez, andando só para a frente. Esta distinção permite escrever transformações de sequências de forma compacta (compreensões) e produzir sequências sem as guardar todas em memória (geradores).

## Compreensões de listas

Uma **compreensão de lista** combina, numa só expressão, o ciclo e a condição que de outra forma escreverias em várias linhas: `[expressão for elemento in iterável if condição]`. O `if` é opcional.

```python
quadrados = [x * x for x in range(6)]
pares = [x for x in range(10) if x % 2 == 0]
print(quadrados)
print(pares)
```

Isto escreve `[0, 1, 4, 9, 16, 25]` e `[0, 2, 4, 6, 8]`. A primeira lê-se "o quadrado de cada `x` de `0` a `5`"; a segunda, "cada `x` de `0` a `9` que seja par". A vantagem sobre `map` e `filter` é que a compreensão mostra a expressão e a condição no mesmo sítio, sem `lambda`.

A mesma sintaxe existe para **conjuntos** (`{...}`) e **dicionários** (`{chave: valor ...}`):

```python
unicos = {len(p) for p in ['o', 'rato', 'roeu', 'a', 'rolha']}
quadrados_d = {x: x * x for x in range(4)}
print(unicos)
print(quadrados_d)
```

Isto escreve `{1, 4, 5}` (os comprimentos distintos: $1, 4, 4, 1, 5$) e `{0: 0, 1: 1, 2: 4, 3: 9}`. A compreensão de conjunto elimina repetidos automaticamente; a de dicionário constrói pares chave-valor.

## Geradores e yield

Uma compreensão de lista constrói a lista inteira em memória. Para sequências grandes ou infinitas, isso é impossível. Uma **expressão geradora** tem a sintaxe da compreensão mas com parênteses, e produz os valores um de cada vez, só quando pedidos:

```python
soma = sum(x * x for x in range(1000))
print(soma)
```

Isto escreve `332833500` (a soma dos quadrados de $0$ a $999$), sem nunca guardar os mil quadrados numa lista. A expressão entre parênteses é o gerador; o `sum` consome-o valor a valor.

Uma função com `yield` define um gerador próprio: em vez de devolver um valor e terminar, **produz** um valor de cada vez que é pedida, retomando onde parou na vez seguinte.

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

def primeiros_n(gen, n):
    resultado = []
    for i, valor in enumerate(gen):
        if i >= n:
            break
        resultado.append(valor)
    return resultado

print(primeiros_n(fibonacci(), 8))
```

Isto escreve `[0, 1, 1, 2, 3, 5, 8, 13]`. A função `fibonacci` tem um `while True` que seria infinito num programa normal, mas como usa `yield`, cada chamada produz apenas o próximo número de Fibonacci: $0, 1, 1, 2, 3, 5, 8, 13$. A função auxiliar consome oito valores e pára. Gerar uma sequência infinita sem gastar memória infinita é exatamente o poder dos geradores.

## Exemplo completo: quicksort

O **quicksort** ordena uma lista escolhendo um **pivô**, dividindo os restantes em menores-ou-iguais e maiores, ordenando cada parte recursivamente e concatenando. Compreensões exprimem a divisão em duas linhas, e a recursão trata do resto. O caso base é a lista com zero ou um elementos, que já está ordenada.

```python
def quicksort(valores):
    if len(valores) <= 1:
        return valores
    pivo = valores[0]
    menores = [x for x in valores[1:] if x <= pivo]
    maiores = [x for x in valores[1:] if x > pivo]
    return quicksort(menores) + [pivo] + quicksort(maiores)

print(quicksort([3, 6, 1, 5, 2, 4]))
```

Isto escreve `[1, 2, 3, 4, 5, 6]`. Segue o primeiro nível: o pivô é `3`; `menores` é `[1, 2]`; `maiores` é `[6, 5, 4]`; o resultado é a ordenação de `[1, 2]`, seguida de `[3]`, seguida da ordenação de `[6, 5, 4]`. Cada chamada recursiva repete o processo com uma lista mais curta, por isso a recursão termina. Nota o custo: cada nível constrói listas novas, por isso esta versão elegante usa mais memória do que uma implementação que ordene no sítio.

:::warning[Os erros mais comuns aqui]
Confundir `[x for x in ...]` (lista, guarda tudo) com `(x for x in ...)` (gerador, produz sob pedido); tentar percorrer duas vezes o mesmo gerador (ele gasta-se, à segunda já está vazio); e esquecer o caso base nas funções recursivas com compreensões. Quando um gerador "vem vazio", verifica se já foi consumido antes.
:::
