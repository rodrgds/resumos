---
title: Intervalos de confiança
description: Intervalos para a média e para proporções, escolha entre z e t e dimensionamento do tamanho da amostra.
section: conteudo
order: 6
---

Uma estimativa pontual ("a média é 49,2") esconde a incerteza. O **intervalo de confiança** junta-lhe a margem: "a média está entre 46,2 e 52,2 com 95 por cento de confiança". Esta página constrói esses intervalos para médias e proporções e mostra como escolher o tamanho da amostra para uma margem pedida.

## A estrutura de todos os intervalos

Todos os intervalos desta cadeira têm a mesma forma:

$$
\text{estimativa} \pm \text{valor crítico} \times \text{erro padrão}.
$$

A estimativa é a estatística da amostra ($\bar{x}$ ou $\hat{p}$). O valor crítico vem da tabela ($z$ ou $t$) e cresce com a confiança pedida: 1,96 para 95 por cento com $z$. O erro padrão mede a variabilidade da estimativa. Decorar esta estrutura vale mais do que decorar cada fórmula, porque cada caso é só uma substituição.

Para a média com **desvio conhecido** $\sigma$: $\bar{x} \pm z_{1-\alpha/2}\,\sigma/\sqrt{n}$. Para a média com **desvio desconhecido** (o caso usual): $\bar{x} \pm t_{n-1;\,1-\alpha/2}\,s/\sqrt{n}$, com a [$t$ de Student](distribuicoes/) a alargar o intervalo quando $n$ é pequeno. Para uma **proporção** com $n$ grande: $\hat{p} \pm z_{1-\alpha/2}\sqrt{\hat{p}(1-\hat{p})/n}$.

## Exemplo: intervalo a 95 por cento para a média

Dezasseis medições de latência dão $\bar{x} = 49{,}2$ ms e $s = 5{,}6$ ms, com o desvio populacional desconhecido. O intervalo a 95 por cento para a média $\mu$ usa $t$ com $15$ graus de liberdade: $t_{15;\,0{,}975} = 2{,}131$. A margem é $2{,}131 \times 5{,}6/\sqrt{16} = 2{,}131 \times 1{,}4 \approx 2{,}98$, logo:

$$
IC_{95\%}(\mu) = (49{,}2 - 2{,}98;\; 49{,}2 + 2{,}98) = (46{,}22;\; 52{,}18).
$$

Com $z$ (1,96 em vez de 2,131) a margem sairia 2,74, mais estreita e injustificada: com 16 observações e desvio estimado, a incerteza extra paga-se em largura. É a regra de escolha entre [$z$ e $t$](distribuicoes/) em ação.

## O que "95 por cento de confiança" significa

Significa isto e só isto: se repetisses a amostragem muitas vezes e construisses o intervalo em cada uma, cerca de 95 por cento dos intervalos conteriam o verdadeiro $\mu$. Não significa que este intervalo específico tem 95 por cento de hipótese de conter $\mu$ (ele contém ou não contém; $\mu$ não é aleatório). E não significa que 95 por cento dos dados estão dentro do intervalo (isso seria um intervalo de predição, outra coisa). Quando o enunciado pedir interpretação, escreve a versão das repetições: é a que os corretores esperam.

## Dimensionar a amostra

Para garantir uma margem de erro $E$ com confiança $1 - \alpha$ na média com desvio conhecido (ou estimado por um valor provisório):

$$
n = \left(\frac{z_{1-\alpha/2}\,\sigma}{E}\right)^2,
$$

arredondando sempre **para cima**. Exemplo: margem de 1 ms a 95 por cento com $\sigma \approx 6$ ms dá $n = (1{,}96 \times 6/1)^2 = 11{,}76^2 \approx 138{,}3$, logo $n = 139$ observações. Repara na escala: cortar a margem para metade exige quatro vezes mais dados, porque $n$ entra com raiz quadrada na margem.
