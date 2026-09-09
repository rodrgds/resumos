---
title: Primeiros programas
description: Algoritmos, programas em Python, tipos, variáveis, expressões e os três tipos de erros.
section: conteudo
order: 1
---

Um programa é uma sequência de instruções que diz ao computador como fazer uma computação. Antes de escreveres código, precisas da ideia: um **algoritmo**, ou seja, uma sequência de passos que resolve um problema genérico, e não apenas um caso concreto. Somar dois números é um caso; o algoritmo da soma funciona para quaisquer dois números.

## Decompor o problema

Problemas interessantes são demasiado grandes para resolver de uma vez. A técnica é sempre a mesma e tem três movimentos. Primeiro, a **decomposição**: partir o problema em subproblemas mais pequenos. Depois, o **reconhecimento de padrões**: reparar que dois problemas com aspetos diferentes têm a mesma estrutura. Por fim, a **abstração**: ignorar os detalhes que não interessam e descrever a solução de forma precisa, sem ambiguidades.

Imagina que queres converter um número de segundos em horas, minutos e segundos. A decomposição sugere: quantas horas inteiras cabem nesse total? O que sobra, quantos minutos inteiros dá? O que sobra no fim são os segundos. Cada uma destas perguntas é fácil; juntas, resolvem o problema. Vais ver o programa completo no fim da página.

## Python e os três tipos de erros

Python é uma linguagem de alto nível: escreves instruções próximas da linguagem humana e o **interpretador** executa-as diretamente, sem produzires antes um ficheiro compilado. Isso torna o ciclo de experimentar e corrigir muito rápido, que é exatamente o que um principiante precisa.

Quando algo corre mal, o erro é de um de três tipos, e distingui-los poupa-te muito tempo. Um erro de **sintaxe** viola as regras da linguagem, como esquecer dois pontos no fim de um `if`; o programa nem chega a correr. Um erro de **execução** (runtime) aparece durante a execução, como dividir por zero. Um erro **semântico** é o mais traiçoeiro: o programa corre e produz um resultado, mas é o resultado errado, porque a lógica não faz o que pretendias. Só os testes e a leitura atenta apanham este último.

## Valores, tipos e variáveis

Um **valor** é um objeto com um tipo. Os quatro tipos básicos que vais usar já são:

| Tipo    | Nome em Python | Exemplos          |
| ------- | -------------- | ----------------- |
| Inteiro | `int`          | `3`, `-20`, `0`   |
| Decimal | `float`        | `3.5`, `-0.25`    |
| Texto   | `str`          | `'Olá'`, `"FEUP"` |
| Lógico  | `bool`         | `True`, `False`   |

A função `type` diz-te o tipo de um valor: `type(3)` responde `<class 'int'>`. Repara que `True`, `False` e `None` escrevem-se com maiúscula inicial; escritos em minúsculas dão erro de sintaxe se os usares como variáveis, porque são palavras reservadas.

Uma **variável** é um nome que fica associado a um valor. A **atribuição** usa um só sinal de igual e lê-se da direita para a esquerda: primeiro calcula-se o valor, depois guarda-se no nome.

```python
segundos = 3661
minutos = segundos / 60
print(minutos)
```

O programa escreve `61.016666666666666`. Nota dois pormenores: `=` atribui, não compara (a comparação usa `==`, que vais conhecer na próxima página), e a vírgula nunca separa casas decimais em Python, usa-se o ponto.

## Operadores e precedência

Os operadores aritméticos são `+`, `-`, `*`, `/` (divisão com decimais), `//` (divisão inteira), `%` (resto da divisão) e `**` (potência). Com texto, `+` junta (concatena) e `*` repete:

```python
print(7 // 2)
print(7 % 2)
print(2 ** 10)
print('FP' + '!' * 3)
```

Isto escreve `3`, `1`, `1024` e `FP!!!`. Repara que `7 // 2` dá `3` (trunca para baixo) e `7 % 2` dá `1`, o resto. Esta dupla, quociente e resto, é a ferramenta central do exemplo final desta página.

Quando uma expressão mistura operadores, Python segue a precedência matemática, resumida na sigla PEMDAS: primeiro **P**arênteses, depois **E**xpoentes, depois **M**ultiplicação e **D**ivisão (da esquerda para a direita), por fim **A**dição e **S**ubtração. Em caso de dúvida, põe parênteses: `2 * (3 + 4)` é muito mais claro do que confiares na memória da tabela.

:::tip[Atualizar uma variável]
É muito comum calcular um valor novo a partir do valor atual da variável, como em `contador = contador + 1`. A forma curta `contador += 1` faz exatamente o mesmo e lê-se melhor. Existem as variantes `-=`, `*=` e `/=`. Para isto funcionar, a variável tem de já existir: atualizar antes de inicializar dá erro de execução.
:::

## Entrada e saída

Um programa útil lê dados e escreve resultados. `input()` lê uma linha do teclado e devolve sempre uma string; `print()` escreve valores no ecrã, separados por espaços.

```python
nome = input()
print('Olá,', nome)
```

Se o utilizador escrever `Ana`, o programa responde `Olá, Ana`. Como `input()` devolve texto, quem precisa de um número tem de converter: `n = int(input())` para inteiros ou `float(input())` para decimais. Se o utilizador escrever algo que não é número, a conversão falha com erro de execução; por agora, assume que a entrada está bem formada.

## Exemplo completo: segundos em horas, minutos e segundos

Juntamos tudo num programa que lê um total de segundos e escreve as horas, os minutos e os segundos correspondentes. A ideia da decomposição feita no início: cada unidade sai de uma divisão inteira, e o resto passa para a unidade seguinte.

```python
total = int(input())
horas = total // 3600
resto = total % 3600
minutos = resto // 60
segundos = resto % 60
print(horas, minutos, segundos)
```

Com a entrada `3661`, segue a execução linha a linha. `total` vale `3661`. `horas` vale `3661 // 3600`, que é `1`. `resto` vale `3661 % 3600`, que é `61`. `minutos` vale `61 // 60`, que é `1`. `segundos` vale `61 % 60`, que é `1`. O programa escreve `1 1 1`: uma hora, um minuto e um segundo. Confirma: $1 \times 3600 + 1 \times 60 + 1 = 3661$.

Repara no padrão: `//` extrai quantas unidades inteiras cabem, `%` guarda o que sobra para o passo seguinte. Este padrão de quociente e resto reaparece em dezenas de exercícios, de converter moedas a extrair dígitos de um número.

:::warning[Os erros mais comuns nesta fase]
Confundir `=` com `==`; usar vírgula em vez de ponto nos decimais; esquecer que `input()` devolve texto e somar strings com números; e escrever `true` em minúsculas. Quando o interpretador reclamar, lê a última linha da mensagem de erro: ela diz o tipo do erro e a linha onde foi detetado.
:::
