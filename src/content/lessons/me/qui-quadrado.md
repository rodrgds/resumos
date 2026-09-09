---
title: Qui-quadrado e testes não paramétricos
description: Testes de ajustamento, homogeneidade e independência pelo qui-quadrado, com uma tabela de contingência resolvida.
section: conteudo
order: 8
---

Os testes $t$ comparam médias de dados numéricos. Mas e perguntas como "o dispositivo influencia a conversão?" ou "estes dados seguem uma binomial?". Quando os dados são **qualitativos** (contagens em categorias), a estatística de trabalho é o **qui-quadrado**, que compara frequências observadas com frequências esperadas sob a hipótese.

## A estatística qui-quadrado

Para categorias $i = 1, \dots, k$ com contagens observadas $O_i$ e contadas esperadas $E_i$ sob $H_0$:

$$
\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}.
$$

Cada parcela é o desvio ao quadrado relativizado pelo tamanho esperado: um desvio de 12 pesa mais quando esperavas 38 do que quando esperavas 57. Sob $H_0$ esta estatística segue aproximadamente uma distribuição $\chi^2$ com os graus de liberdade próprios de cada teste. A região crítica é sempre unilateral à direita (valores grandes significam mau ajuste), e a aproximação exige frequências esperadas de pelo menos 5 em (quase) todas as células.

## Três testes, uma fórmula

- **Ajustamento** (_goodness of fit_): os dados seguem uma distribuição proposta? $H_0$ fixa as probabilidades de cada categoria ($E_i = n\,p_i$), com $k - 1$ graus de liberdade (menos os parâmetros que tiveres de estimar).
- **Independência**: duas variáveis qualitativas são independentes? Numa tabela $r \times c$, $H_0$ dá $E_{ij} = (\text{total da linha } i \times \text{total da coluna } j)/n$, com $(r-1)(c-1)$ graus de liberdade.
- **Homogeneidade**: várias populações têm a mesma distribuição da variável? Mesma conta da independência, mas o desenho amostral difere (amostras separadas por população em vez de uma amostra classificada em duas variáveis).

:::tip[Independência contra homogeneidade no enunciado]
A conta é igual, a pergunta muda. Se sortearam 200 utilizadores e classificaram cada um por dispositivo e conversão, é **independência** (uma amostra, duas variáveis). Se sortearam 120 utilizadores de telemóvel e 80 de computador e mediram a conversão em cada grupo, é **homogeneidade** (duas amostras, uma variável). Identifica o desenho antes de escrever $H_0$.
:::

## Exemplo: o dispositivo influencia a conversão?

Duzentos utilizadores classificados por dispositivo e conversão:

| | Converteu | Não converteu | Total |
| --- | ---: | ---: | ---: |
| Telemóvel | 45 | 75 | 120 |
| Computador | 50 | 30 | 80 |
| Total | 95 | 105 | 200 |

$H_0$: dispositivo e conversão são independentes. As esperadas sob $H_0$: telemóvel e converteu, $120 \times 95/200 = 57$; telemóvel e não, $120 \times 105/200 = 63$; computador e converteu, $80 \times 95/200 = 38$; computador e não, $80 \times 105/200 = 42$. Todas acima de 5, por isso a aproximação vale.

$$
\chi^2 = \frac{(45-57)^2}{57} + \frac{(75-63)^2}{63} + \frac{(50-38)^2}{38} + \frac{(30-42)^2}{42} \approx 2{,}53 + 2{,}29 + 3{,}79 + 3{,}43 = 12{,}03.
$$

Com $(2-1)(2-1) = 1$ grau de liberdade, o valor crítico a 5 por cento é 3,84. Como $12{,}03 > 3{,}84$, **rejeita-se a independência**: os dados dão evidência de que a taxa de conversão depende do dispositivo (no computador, 50 em 80; no telemóvel, 45 em 120). Repara que o teste diz que há associação, não porquê: explicar a causa já é trabalho de produto, não de estatística.

## A ideia dos testes não paramétricos

Os testes $t$ assumem populações normais (ou amostras grandes pelo Teorema do Limite Central). Quando a amostra é pequena e a normalidade é indefensável, os **testes não paramétricos** dispensam a distribuição: trabalham com ordens (_ranks_) ou sinais em vez dos valores. O teste dos sinais, por exemplo, decide sobre a mediana contando quantas observações ficam acima do valor de referência e comparando com uma binomial de $p = 0{,}5$. Pagam a robustez com menos potência: se a normalidade valer, o $t$ deteta mais. A regra de bolso fecha a cadeira: dados numéricos e condições verificadas, testes paramétricos; o resto, qui-quadrado para categorias e não paramétricos para o resto.
