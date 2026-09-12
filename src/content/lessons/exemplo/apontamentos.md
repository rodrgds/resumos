---
title: Texto e fórmulas
description: Um exemplo simples, escrito em Markdown.
section: conteudo
order: 1
practices:
  - exemplo/praticar-somas
---

## Uma ideia de cada vez

Um apontamento pode ter **definições**, exemplos e pequenos exercícios. Usa as tuas palavras e liga às fontes que consultaste.

Neste exemplo, vamos somar os primeiros $n$ números naturais. O resultado é:

$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$

Para $n = 4$, temos $1 + 2 + 3 + 4 = 10$.

## Um pequeno programa

```python
def soma_naturais(n):
    return n * (n + 1) // 2

print(soma_naturais(4))  # 10
```

## Uma tabela

| n   | Soma |
| --- | ---- |
| 1   | 1    |
| 2   | 3    |
| 3   | 6    |
| 4   | 10   |

## Limites de um ciclo

Em Python, `range(1, n + 1)` percorre os inteiros de 1 até n. O limite superior fica excluído. Começa com `total = 0` e, para cada `k`, soma `k` ao total. Antes dessa atualização, `total` contém a soma de 1 até `k - 1`; depois, contém a soma de 1 até `k`.

Se n for zero, `range(1, 1)` está vazio. O total continua a zero, que é o valor da soma vazia.

## Contar as operações

O ciclo faz n atualizações. A fórmula faz um número fixo de operações aritméticas. Se cada operação tiver custo constante, os custos são Θ(n) e Θ(1), respetivamente. Com inteiros de precisão arbitrária, como os de Python, o custo também depende do número de bits dos valores.

## Uma imagem

![Quatro filas de pontos com um, dois, três e quatro pontos, num total de dez.](/examples/pontos.svg)

A imagem representa a mesma soma. É um SVG local e inclui uma descrição para quem usa um leitor de ecrã.

> Experimenta: quantos pontos teria a figura com cinco filas?

## Links e próximos passos

A [documentação do Markdown no Astro](https://docs.astro.build/en/guides/markdown-content/) explica como escrever páginas. As fórmulas usam [KaTeX](https://katex.org/docs/supported.html).

Na página seguinte, juntamos [gráficos, diagramas e vídeo](/exemplo/diagramas/) num ficheiro MDX.

## Notas de rodapé

As notas de rodapé servem para uma fonte ou uma explicação que pode ficar para depois.[^fonte]

[^fonte]: Este é um exemplo de nota de rodapé. A seta no fim volta ao ponto do texto onde estavas. Podes incluir [ligações](https://www.markdownguide.org/extended-syntax/#footnotes) e **formatação**.

```md
Uma afirmação com uma fonte.[^fonte]

[^fonte]: Autor, título e ligação à fonte.
```

## Avisos em Markdown

:::tip[Uma ideia por parágrafo]
Começa pela ideia principal. Junta um exemplo e só depois acrescenta os detalhes.
:::

:::details[Ver uma solução]
Para somar os primeiros quatro naturais, podemos juntar os extremos: $1 + 4 = 5$ e $2 + 3 = 5$. A soma é $10$.
:::
