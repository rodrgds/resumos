---
title: Testes de hipóteses
description: Hipóteses nula e alternativa, erros tipo I e II, valor p e testes t para médias com exemplo completo.
section: conteudo
order: 7
---

O intervalo estima; o **teste de hipóteses** decide. Perante "a latência média difere de 50 ms?", formulas duas hipóteses rivais, medes quão longe os dados estão da hipótese de referência e decides com uma regra fixada antes de ver os dados. Esta página monta esse procedimento e liga-o aos intervalos da página anterior.

## As peças do teste

- **Hipótese nula** $H_0$: a afirmação de referência, sempre com igualdade ("$\mu = 50$"). É a que se presume até prova em contrário.
- **Hipótese alternativa** $H_1$: o que queres estabelecer ("$\mu \ne 50$" bilateral, "$\mu > 50$" ou "$\mu < 50$" unilaterais). O tipo sai do enunciado: "difere" é bilateral, "aumentou" é unilateral à direita.
- **Estatística de teste**: mede o afastamento dos dados em relação a $H_0$, numa escala tabelada. Para a média com desvio desconhecido: $t = (\bar{x} - \mu_0)/(s/\sqrt{n})$, com $n - 1$ graus de liberdade sob $H_0$.
- **Nível de significância** $\alpha$: a probabilidade de erro tipo I que aceitas, tipicamente 0,05. Fixa-se antes, nunca depois de ver os dados.

Há dois erros possíveis. O **erro tipo I** rejeita $H_0$ quando ela é verdadeira (falso alarme), com probabilidade $\alpha$. O **erro tipo II** não rejeita $H_0$ quando ela é falsa (deteção falhada), com probabilidade $\beta$. A **potência** $1 - \beta$ é a capacidade de detetar um efeito real. Baixar $\alpha$ sem aumentar $n$ sobe $\beta$: com a mesma amostra, és mais exigente num erro e mais permissivo no outro.

## Região crítica e valor p

Duas formas equivalentes de decidir. Pela **região crítica**: rejeita $H_0$ se a estatística cair na zona extrema da tabela (para o $t$ bilateral a 5 por cento com 15 graus de liberdade, $|t| > 2{,}131$). Pelo **valor p**: a probabilidade, sob $H_0$, de observar dados tão ou mais extremos que os obtidos; rejeita se $p < \alpha$. O valor p não é a probabilidade de $H_0$ ser verdadeira: é uma medida de compatibilidade dos dados com $H_0$.

:::warning["Aceitar H0" não existe]
Quando a estatística não chega à região crítica, a conclusão é "não se rejeita $H_0$", nunca "aceita-se $H_0$" nem "prova-se $H_0$". Não rejeitar pode significar que $H_0$ é verdadeira ou que a amostra é pequena demais para detetar a diferença (potência baixa). Escreve sempre a conclusão nesta forma negativa: os corretores descontam o "aceita-se".
:::

## Exemplo: a latência difere de 50 ms?

Dezasseis medições dão $\bar{x} = 47{,}1$ ms e $s = 5{,}2$ ms. Testa $H_0: \mu = 50$ contra $H_1: \mu \ne 50$ ($\alpha = 0{,}05$).

A estatística: $t = (47{,}1 - 50)/(5{,}2/\sqrt{16}) = -2{,}9/1{,}3 \approx -2{,}23$, com 15 graus de liberdade. O valor crítico bilateral é $\pm 2{,}131$; como $|-2{,}23| > 2{,}131$, **rejeita-se $H_0$** a 5 por cento: os dados dão evidência de que a média difere de 50 ms. O valor p é $2 \times P(T_{15} > 2{,}23) \approx 0{,}041$, consistente com a rejeição a $\alpha = 0{,}05$.

## A ligação com intervalos

Um teste bilateral a nível $\alpha$ rejeita $H_0: \mu = \mu_0$ exatamente quando $\mu_0$ fica **fora** do intervalo de confiança a $1 - \alpha$. Confere com o exemplo: o intervalo a 95 por cento é $47{,}1 \pm 2{,}131 \times 1{,}3 = 47{,}1 \pm 2{,}77 = (44{,}33;\; 49{,}87)$, que não contém o 50, logo rejeita. Esta dualidade é um teste de sanidade gratuito: se o teu teste e o teu intervalo discordarem, um dos dois tem erro de contas. É também a resposta pronta quando o enunciado pergunta pelo teste "a partir do intervalo".
