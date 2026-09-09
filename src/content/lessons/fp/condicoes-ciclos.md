---
title: Condições e ciclos
description: Valores lógicos, if e elif, ciclos for e while, break e continue, com dois exemplos completos.
section: conteudo
order: 2
---

Quase nenhum programa interessante executa sempre as mesmas instruções pela mesma ordem. Ou o programa **escolhe** o que fazer conforme os dados (execução condicional), ou **repete** uma ação muitas vezes (iteração). Esta página trata das duas construções, que juntas chegam para resolver uma grande parte das fichas.

## Valores lógicos e comparações

O tipo `bool` só tem dois valores, `True` e `False`. Eles nascem de **comparações**: `==` (igual), `!=` (diferente), `<`, `<=`, `>` e `>=`. O resultado de comparar é sempre um lógico:

```python
nota = 14
print(nota >= 10)
print(nota == 20)
```

Isto escreve `True` e `False`. O erro clássico é escrever `=` onde querias `==`: o primeiro atribui, o segundo pergunta.

As comparações combinam-se com os operadores lógicos `and`, `or` e `not`. Uma condição como `nota >= 10 and nota <= 20` só é verdadeira quando as duas partes são verdadeiras. Com `or` basta uma delas. O `not` inverte o valor. Quando misturares estes operadores, usa parênteses para deixar clara a ordem.

## Execução condicional: if, elif e else

O `if` executa um bloco de instruções apenas quando a condição é verdadeira. A condição termina com dois pontos e o bloco distingue-se pela **indentação**, normalmente quatro espaços:

```python
nota = 14
if nota >= 10:
    print('Aprovado')
else:
    print('Reprovado')
```

Isto escreve `Aprovado`. Se a nota fosse `8`, escreveria `Reprovado`. O `else` é opcional e cobre todos os casos que o `if` não cobriu.

Quando há mais de duas escolhas, o `elif` (abreviatura de "else if") testa condições por ordem, e só o primeiro bloco cuja condição seja verdadeira executa:

```python
nota = 16
if nota >= 18:
    print('Excelente')
elif nota >= 14:
    print('Bom')
elif nota >= 10:
    print('Suficiente')
else:
    print('Reprovado')
```

Isto escreve `Bom`. Repara que a ordem importa: se o teste `nota >= 10` viesse primeiro, valeria para o `16` e escreveria `Suficiente`, e os ramos seguintes nunca seriam alcançados. Regra prática: do caso mais específico para o mais geral.

## Ciclos for e a função range

O ciclo `for` repete um bloco para cada elemento de uma sequência. A forma mais comum usa `range`, que gera uma sequência de inteiros:

```python
for i in range(5):
    print(i)
```

Isto escreve `0`, `1`, `2`, `3` e `4`, cada um na sua linha. `range(5)` começa em `0` e pára **antes** do `5`. A forma geral `range(inicio, fim, passo)` começa em `inicio`, avança de `passo` em `passo` e pára antes de chegar a `fim`. Assim, `range(1, 10, 2)` produz `1, 3, 5, 7, 9`. O nome `i` é a **variável do ciclo**: em cada volta recebe o valor seguinte.

Um padrão fundamental é o **acumulador**: uma variável que junta o resultado ao longo das voltas.

```python
soma = 0
for i in range(1, 101):
    soma += i
print(soma)
```

Isto escreve `5050`, a soma de $1$ a $100$ (confere com a fórmula $100 \times 101 / 2 = 5050$). Repara que `soma` é inicializada **antes** do ciclo a `0`, o elemento neutro da adição. Esquecer a inicialização é um dos erros mais comuns.

## Ciclos while, break e continue

O ciclo `while` repete enquanto uma condição for verdadeira, e usa-se quando não sabes à partida quantas voltas vais dar:

```python
n = 27
tentativas = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    tentativas += 1
print(tentativas)
```

Isto escreve `111`: partindo de `27`, a sequência de Collatz demora 111 passos a chegar a `1`. Cada volta transforma `n` segundo a regra par ou ímpar, e o ciclo pára quando `n` vale `1`. O perigo do `while` é a condição nunca se tornar falsa: nesse caso o programa repete para sempre e tens de o interromper. Antes de correres um `while`, convence-te de que alguma coisa muda em cada volta na direção da condição de paragem.

Duas instruções alteram o fluxo dentro de um ciclo. O `break` sai imediatamente do ciclo; o `continue` salta para a volta seguinte. Ambas se usam com um `if`:

```python
for i in range(10):
    if i == 3:
        continue
    if i == 6:
        break
    print(i)
```

Isto escreve `0`, `1`, `2`, `4` e `5`. O `3` é saltado pelo `continue` e o ciclo termina ao chegar ao `6` por causa do `break`.

## Exemplo 1: fizz buzz

Escreve os números de `1` a `n`, mas substitui os múltiplos de `3` por `Fizz` e os múltiplos de `5` por `Buzz`. Um múltiplo das duas coisas escreve `FizzBuzz`. Para `n = 15`, o resultado é `1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz`.

A ordem dos testes é a parte que exige atenção: o caso dos múltiplos comuns tem de vir primeiro, porque um múltiplo de `15` também é múltiplo de `3` e de `5`.

```python
n = 15
resultado = ''
for i in range(1, n + 1):
    if i % 15 == 0:
        resultado += 'FizzBuzz '
    elif i % 3 == 0:
        resultado += 'Fizz '
    elif i % 5 == 0:
        resultado += 'Buzz '
    else:
        resultado += str(i) + ' '
print(resultado)
```

Segue as primeiras voltas: `i = 1` não é múltiplo de nada e acrescenta `'1 '`; `i = 3` acrescenta `'Fizz '`; `i = 5` acrescenta `'Buzz '`; `i = 15` é múltiplo de `15` e acrescenta `'FizzBuzz '`. Se trocasses a ordem e testasses `i % 3 == 0` primeiro, o `15` seria apanhado por esse ramo e nunca chegaria ao teste correto. A função `str(i)` converte o número em texto para se poder juntar à string.

## Exemplo 2: testar se um número é primo

Um número `n` maior que `1` é primo quando nenhum inteiro entre `2` e `n - 1` o divide. Traduzido para código: percorre os possíveis divisores e devolve `False` mal encontres um; se o ciclo terminar sem encontrar nenhum, devolve `True`.

```python
def e_primo(n):
    if n < 2:
        return False
    for d in range(2, n):
        if n % d == 0:
            return False
    return True

print(e_primo(7))
print(e_primo(15))
```

Isto escreve `True` e `False`. Para `n = 7`, nenhum de `2, 3, 4, 5, 6` divide `7`, por isso o ciclo termina e chega-se ao `return True`. Para `n = 15`, o divisor `d = 3` dá resto `0` e a função sai logo com `False`, sem testar os restantes. (A palavra `def` e o `return` são explicados na página sobre funções; por agora, lê `return` como "a resposta da função".) Nota ainda que `e_primo(2)` devolve `True`: `range(2, 2)` é vazio, o ciclo dá zero voltas e cai diretamente no `return True`, que é o correto, pois `2` é primo.

:::warning[Os erros mais comuns nesta fase]
Esquecer os dois pontos no fim do `if`, do `for` ou do `while`; indentar mal o bloco (o corpo do ciclo tem de estar indentado, e o que vem depois do ciclo volta à margem); usar `=` em vez de `==` nas condições; e escrever um `while` cuja condição nunca muda. Quando o programa não pára, o mais provável é a variável da condição não estar a ser atualizada dentro do ciclo.
:::
