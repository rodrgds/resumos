---
title: Inteiros em complemento para dois
description: Inteiros sem sinal, negação em complemento para dois, extensão de sinal e overflow.
section: conteudo
order: 2
---

A página anterior tratou de números positivos. Falta o sinal. Se reservarmos simplesmente um bit para o sinal e os restantes para o valor, obtemos duas representações para o zero e a soma passa a exigir um circuito especial. A solução usada nos processadores é o **complemento para dois**, que representa os negativos de forma que a adição funcione igual para todos os números.

## Inteiros sem sinal

Com $n$ bits sem sinal, há $2^n$ combinações, que representam os inteiros de $0$ até $2^n - 1$. Com 8 bits, o intervalo é de 0 a 255. Não há surpresas aqui; é a contagem binária direta que já conheces.

## Inteiros com sinal

Em complemento para dois com $n$ bits, o intervalo é assimétrico: vai de $-2^{n-1}$ até $2^{n-1} - 1$. Com 8 bits, vai de $-128$ até $127$. O bit mais à esquerda continua a ser o MSB, mas agora funciona como **bit de sinal**: `0` indica um número não negativo e `1` indica um negativo.

Para obter a representação de $-x$ a partir de $x$ positivo com $n$ bits, há duas formas equivalentes. A definição diz que $-x$ se representa por $2^n - x$. Na prática, usa-se a regra **inverter e somar 1**: invertem-se todos os bits e soma-se 1 ao resultado.

Representa $-112$ com 8 bits. Primeiro escreve $112$:

$$
112 = 64 + 32 + 16 = 01110000_2
$$

Inverte os bits: $10001111$. Soma 1:

```
  10001111
+        1
= 10010000
```

Por isso $-112_{10} = 10010000_2$ em 8 bits. Confirma pela definição: $2^8 - 112 = 256 - 112 = 144$, e $144$ em binário é $10010000$. As duas vias dão o mesmo resultado, como têm de dar.

Para voltares atrás, aplica a mesma regra ao contrário: para saberes que valor representa `10010000`, inverte ($01101111$) e soma 1 ($01110000 = 112$), logo o valor é $-112$. A operação é simétrica, exceto num caso limite que vais ver já a seguir.

## Extensão de sinal

Quando copias um número de $n$ bits para $m$ bits, com $m > n$, não chega acrescentar zeros à esquerda: isso transformaria um negativo num positivo grande. A **extensão de sinal** acrescenta $m - n$ cópias do bit de sinal.

O valor $-112$, que em 8 bits é `10010000`, em 16 bits escreve-se `11111111 10010000`. Oito cópias do bit `1` à esquerda preservam o valor. Para um positivo como $112$ (`01110000`), a extensão acrescenta zeros: `00000000 01110000`, que é exatamente o que já farias.

## Overflow

O **overflow** acontece quando uma operação aritmética produz um resultado que precisa de mais bits do que a representação disponível. Em complemento para dois, deteta-se pelo sinal: somar dois positivos e obter um negativo, ou somar dois negativos e obter um positivo, indica overflow.

O exemplo clássico usa 8 bits. Soma $127 + 1$:

```
  01111111   (127)
+ 00000001   (1)
= 10000000   (-128!)
```

Dois positivos deram um negativo, por isso houve overflow: o resultado correto, $128$, não cabe no intervalo de $-128$ a $127$. Repara que o hardware faz a conta certa nos bits; o problema é que o resultado não é representável. Noutro exemplo, $-112 - 1$ dá `10001111`, que é $-113$ e está dentro do intervalo, por isso não há overflow.

:::warning[O caso especial do mínimo]
O valor $-128$ (`10000000`) não tem simétrico positivo em 8 bits, porque $+128$ já não cabe no intervalo. Se aplicares a regra de inverter e somar 1 a `10000000`, obténs `10000000` outra vez. É o único valor com esta propriedade, e é uma armadilha clássica em exercícios.
:::

> Experimenta: representa $-19$ em 8 bits e confirma que obténs `11101101`. (Verifica: $19 = 00010011$, invertido $11101100$, mais 1 dá $11101101$. Pela definição: $256 - 19 = 237 = 128 + 64 + 32 + 8 + 4 + 1$.)
