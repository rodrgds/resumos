---
title: Representação de dados
description: Bits, bytes, MSB e LSB, sistemas posicionais e conversões entre decimal, binário, octal e hexadecimal.
section: conteudo
order: 1
---

Nos computadores digitais, dados e instruções vivem na memória como sequências de dois símbolos, `0` e `1`. Cada dígito binário chama-se **bit**, do inglês _binary digit_. Um bit corresponde, no hardware, a dois níveis de tensão: tipicamente `0` é a tensão baixa e `1` é a tensão alta.

Oito bits formam um **byte**. O byte é a unidade que vais usar para medir memória e para agrupar dígitos quando lês valores longos. Dentro de um grupo de bits, o bit mais à esquerda é o mais significativo e chama-se **MSB**, do inglês _most significant bit_; o bit mais à direita é o menos significativo e chama-se **LSB**, do inglês _least significant bit_. Em `11001`, o MSB vale $2^4$ e o LSB vale $2^0$.

## Sistemas posicionais

O sistema decimal é **posicional**: o valor de cada dígito depende da posição que ocupa. Em $325$, o `3` vale trezentos porque está na casa das centenas. O número de símbolos distintos chama-se **base**. O decimal tem base 10 e usa os símbolos `0` a `9`.

O sistema romano é o contraexemplo clássico: é **não posicional** no essencial, porque os símbolos têm valor próprio e a notação não serve para fazer contas diretamente. Os sistemas usados nos computadores são todos posicionais, e a tabela seguinte resume-os:

| Sistema     | Base | Símbolos usados      |
| ----------- | ---- | -------------------- |
| Binário     | 2    | `0`, `1`             |
| Octal       | 8    | `0` a `7`            |
| Decimal     | 10   | `0` a `9`            |
| Hexadecimal | 16   | `0` a `9`, `A` a `F` |

No hexadecimal, as letras `A` a `F` valem 10 a 15. Para deixar claro que um número está em hexadecimal, escreve-se `0x` à frente, como em `0x3F`.

## De decimal para binário

Para converter a parte inteira, divide-se sucessivamente por 2 e lêem-se os restos de baixo para cima. Converte $25$:

```
25 ÷ 2 = 12, resto 1    (LSB)
12 ÷ 2 = 6,  resto 0
6 ÷ 2  = 3,  resto 0
3 ÷ 2  = 1,  resto 1
1 ÷ 2  = 0,  resto 1    (MSB)
```

Lendo os restos de baixo para cima: $25_{10} = 11001_2$. Confirma com as potências de 2: $16 + 8 + 1 = 25$.

Para a parte fracionária, multiplica-se sucessivamente por 2 e lê-se a parte inteira de cada produto, de cima para baixo. Converte $0{,}75$:

```
0,75 × 2 = 1,5    → 1   (MSB da fração)
0,5 × 2  = 1,0    → 1
```

Por isso $0{,}75_{10} = 0{,}11_2$. Nem todas as frações decimais têm representação binária finita. A fração $0{,}692$, por exemplo, gera bits sem fim ($0{,}692 \times 2 = 1{,}384$, depois $0{,}384 \times 2 = 0{,}768$, depois $0{,}768 \times 2 = 1{,}536$, e assim por diante). Juntando as duas metades com um exemplo exato: $25{,}75_{10} = 11001{,}11_2$.

Podes confirmar estas conversões com um programa curto:

```python
print(bin(25))        # 0b11001
print(int('11001', 2))  # 25
print((0.75).as_integer_ratio())  # (3, 4): 0,75 = 3/4
```

A primeira linha escreve `0b11001`, onde o prefixo `0b` marca a base 2. A segunda faz o caminho inverso.

## De binário para decimal

Cada posição vale uma potência de 2, com expoentes que crescem da direita para a esquerda a partir de 0. Converte $11011010_2$:

$$
1{\times}2^7 + 1{\times}2^6 + 0{\times}2^5 + 1{\times}2^4 + 1{\times}2^3 + 0{\times}2^2 + 1{\times}2^1 + 0{\times}2^0
$$

Isto dá $128 + 64 + 16 + 8 + 2 = 218$. Repara que os zeros anulam as suas parcelas; só somas as potências onde há `1`.

:::tip[Memoriza as potências até $2^{10}$]
$1$, $2$, $4$, $8$, $16$, $32$, $64$, $128$, $256$, $512$, $1024$. Com esta lista, a conversão de números com 8 bits passa a ser uma soma rápida, e $2^{10} = 1024$ é a base das unidades de memória que vais ver no capítulo de memórias.
:::

## Binário, octal e hexadecimal

Como $8 = 2^3$, cada dígito octal corresponde exatamente a um grupo de 3 bits. Agrupa os bits da direita para a esquerda e converte cada grupo:

$$
101101_2 \to 101 \mid 101 \to 5 \mid 5 = 55_8
$$

Como $16 = 2^4$, cada dígito hexadecimal corresponde a um grupo de 4 bits:

$$
101101_2 \to 0010 \mid 1101 \to 2 \mid D = \text{0x2D}
$$

Confirma: $2 \times 16 + 13 = 45$, e $32 + 8 + 4 + 1 = 45$. Se o número de bits não for múltiplo de 3 ou 4, acrescenta zeros à esquerda, que não alteram o valor. A tabela de grupos que deves saber de cor é esta:

| 3 bits | Octal | 4 bits | Hex |
| ------ | ----- | ------ | --- |
| `000`  | 0     | `0000` | 0   |
| `001`  | 1     | `0001` | 1   |
| `010`  | 2     | `0010` | 2   |
| `011`  | 3     | `0011` | 3   |
| `100`  | 4     | `0100` | 4   |
| `101`  | 5     | `0101` | 5   |
| `110`  | 6     | `0110` | 6   |
| `111`  | 7     | `0111` | 7   |
|        |       | `1000` | 8   |
|        |       | `1001` | 9   |
|        |       | `1010` | A   |
|        |       | `1011` | B   |
|        |       | `1100` | C   |
|        |       | `1101` | D   |
|        |       | `1110` | E   |
|        |       | `1111` | F   |

> Experimenta: converte `0xBE` para binário e depois para decimal. (Resposta: `10111110_2 = 190`. Verifica: $128 + 32 + 16 + 8 + 4 + 2 = 190$.)
