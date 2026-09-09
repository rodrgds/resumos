---
title: Strings
description: Índices, fatias, travessia, comparação lexicográfica e os métodos mais usados de texto.
section: conteudo
order: 4
---

Texto em Python é do tipo `str` e comporta-se como uma sequência de caracteres. Grande parte dos exercícios da cadeira resume-se a percorrer texto, cortar bocados e transformar o resultado. Esta página dá-te as ferramentas para essas três operações e mostra onde os principiantes costumam tropeçar.

## Índices e o erro mais caro da página

Cada posição de uma string tem um número, o **índice**, a começar em `0`. Os índices negativos contam a partir do fim: `-1` é o último caráter.

```python
palavra = 'banco'
print(palavra[0])
print(palavra[4])
print(palavra[-1])
```

Isto escreve `b`, `o` e `o`. A string `'banco'` tem 5 carateres, com índices de `0` a `4`. Pedir `palavra[5]` dá erro de execução, porque já não há posição `5`. Regra que evita metade dos erros: numa string de comprimento $n$, os índices válidos vão de $0$ a $n - 1$.

As strings são **imutáveis**: não podes alterar um caráter no sítio. Tentar `palavra[0] = 'm'` dá erro. Para obter `'manco'`, constróis uma string nova, por exemplo por concatenação: `'m' + palavra[1:]`. (A notação `palavra[1:]` é explicada já a seguir.) A distinção é importante: uma operação sobre strings nunca modifica a original, devolve sempre uma string nova.

## Fatias

Uma **fatia** (slice) extrai um intervalo com a notação `s[inicio:fim]`: inclui a posição `inicio` e exclui a posição `fim`. Omitir um dos lados significa ir até ao extremo.

```python
s = 'programar'
print(s[0:4])
print(s[4:])
print(s[:4])
print(s[-3:])
```

Isto escreve `prog`, `ramar`, `prog` e `mar`. O intervalo `[0:4]` cobre as posições $0, 1, 2, 3$, ou seja, quatro carateres. Um truque para nunca te enganares: o comprimento da fatia `s[a:b]` é exatamente `b - a`.

## Travessia e o padrão do acumulador

Percorrer cada caráter chama-se **travessia** e faz-se com um `for` diretamente sobre a string. Quando precisares também das posições, a função `enumerate` dá-te pares de índice e caráter.

```python
texto = 'banana'
for i, c in enumerate(texto):
    print(i, c)
```

Isto escreve `0 b`, `1 a`, `2 n`, `3 a`, `4 n`, `5 a`. Sem `enumerate`, o ciclo `for c in texto` dá-te apenas os carateres.

O padrão do acumulador, que já viste com números, aplica-se a texto: começa com a string vazia e vai juntando.

```python
texto = 'banana'
invertido = ''
for c in texto:
    invertido = c + invertido
print(invertido)
```

Isto escreve `ananab`. Em cada volta, o caráter atual passa para a frente do resultado parcial. Repara que isto constrói uma string nova em cada volta; para textos curtos não há problema, mas é bom saberes que existe este custo.

## Comparar e procurar

As strings comparam-se por **ordem lexicográfica**, parecida com a do dicionário: compara-se o primeiro caráter diferente e esse decide. Atenção a que as maiúsculas vêm antes das minúsculas na tabela de carateres, por isso `'Zebra' < 'abacaxi'` é verdadeiro, o que surpreende quem esperava ordem alfabética.

O operador `in` testa se uma string ocorre dentro de outra, e devolve sempre um lógico:

```python
print('ama' in 'programar')
print('xyz' in 'programar')
```

Isto escreve `True` e `False`. Qualquer string ocorre nela própria, e a string vazia `''` ocorre em todas.

Três métodos resolvem a maior parte das procuras. O `split` parte uma string numa lista de palavras, cortando nos espaços por omissão. O `find` devolve a posição da primeira ocorrência, ou `-1` se não existir. O `index` faz o mesmo mas levanta erro quando não encontra. A diferença entre devolver `-1` e levantar erro é decisiva: usa `find` quando a ausência é normal e `index` quando a ausência indica um problema.

```python
frase = 'o rato roeu a rolha'
palavras = frase.split()
print(palavras)
print(frase.find('roeu'))
print(frase.find('queijo'))
```

Isto escreve `['o', 'rato', 'roeu', 'a', 'rolha']`, `7` e `-1`. Confere a posição: `o(0) espaço(1) r(2)a(3)t(4)o(5) espaço(6) r(7)`, por isso `'roeu'` começa na posição `7`.

## Exemplo completo: palíndromo

Uma palavra é um **palíndromo** quando se lê igual do início para o fim, como `radar` ou `osso`. Há duas formas naturais de testar. A curta usa uma fatia com passo negativo, `s[::-1]`, que percorre a string de trás para a frente. A explícita compara pares de posições simétricas e pára mal encontra uma diferença; esta segunda evita construir a string invertida e mostra o padrão de **saída antecipada** que já usaste nos primos.

```python
def e_palindromo_curta(s):
    return s == s[::-1]

def e_palindromo(s):
    for i in range(len(s) // 2):
        if s[i] != s[-1 - i]:
            return False
    return True

print(e_palindromo('radar'))
print(e_palindromo('python'))
print(e_palindromo('osso'))
```

Isto escreve `True`, `False` e `True`. Segue a versão explícita com `'radar'`: o comprimento é `5`, por isso `i` toma `0` e `1`. Compara `s[0]` com `s[-1]` (`r` com `r`) e `s[1]` com `s[-2]` (`a` com `a`); o caráter do meio nunca precisa de comparação. Com `'python'`, a primeira comparação (`p` com `n`) já falha e a função devolve `False` sem percorrer o resto. Só é preciso testar metade das posições, porque cada comparação cobre um par simétrico.

:::warning[Os erros mais comuns com strings]
Esquecer que os índices começam em `0`; tentar modificar um caráter no sítio em vez de construir uma string nova; confundir `find` (devolve `-1`) com `index` (levanta erro); e comparar texto com maiúsculas e minúsculas misturadas sem normalizar primeiro com `lower()`. Se uma comparação lexicográfica te surpreender, verifica as maiúsculas.
:::
