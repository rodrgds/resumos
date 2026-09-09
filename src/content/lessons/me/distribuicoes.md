---
title: Distribuições binomial, normal e t
description: Quando usar cada distribuição, parâmetros, aproximação normal e leitura da tabela da normal padrão.
section: conteudo
order: 4
---

Três distribuições cobrem quase todos os exercícios da cadeira: a binomial conta sucessos em tentativas repetidas, a normal modela somas de muitos efeitos pequenos e a $t$ corrige a normal quando a amostra é pequena e o desvio é estimado. Esta página diz quando chamar cada uma e como ler os valores nas tabelas.

## Binomial: contar sucessos

Repete $n$ vezes uma experiência com probabilidade de sucesso $p$, sempre nas mesmas condições e de forma independente. O número de sucessos $X$ segue a **binomial** $Bin(n, p)$:

$$
P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}, \quad E[X] = np, \quad Var(X) = np(1-p).
$$

O teste de reconhecimento é a frase "em $n$ tentativas independentes, quantas dão certo". Se as tentativas influenciam umas às outras (tirar sem reposição de uma urna pequena) ou $p$ muda, a binomial não se aplica.

## Normal: a curva simétrica

A **normal** $N(\mu, \sigma^2)$ tem densidade em forma de sino centrada em $\mu$ com largura dada por $\sigma$:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}.
$$

Nunca precisas de integrar isto à mão: padronizas $Z = (X - \mu)/\sigma$, que segue a normal padrão $N(0, 1)$, e lês probabilidades na tabela de $\Phi(z) = P(Z \le z)$. Decora três marcos: $P(|Z| < 1) \approx 0{,}68$, $P(|Z| < 2) \approx 0{,}95$ e $P(|Z| < 3) \approx 0{,}997$. E lembra a simetria $\Phi(-z) = 1 - \Phi(z)$, porque a tabela só traz $z$ positivos.

## Aproximação da binomial pela normal

Quando $n$ é grande, a binomial fica com forma de sino e a normal aproxima-a bem. Condição prática: $np \ge 5$ e $n(1-p) \ge 5$. Usa-se $\mu = np$, $\sigma^2 = np(1-p)$ e a **correção de continuidade** de 0,5, porque aproximas uma escada discreta por uma curva contínua: $P(X \ge k)$ vira $P(X_{normal} > k - 0{,}5)$.

Exemplo: 200 pedidos a um servidor, cada um com probabilidade 0,05 de erro, independentes. $X \sim Bin(200; 0{,}05)$, e queremos $P(X \ge 15)$. Primeiro as condições: $np = 10 \ge 5$ e $n(1-p) = 190 \ge 5$, por isso a aproximação vale. Com $\mu = 10$ e $\sigma = \sqrt{9{,}5} \approx 3{,}08$:

$$
P(X \ge 15) \approx P\left(Z > \frac{14{,}5 - 10}{3{,}08}\right) = P(Z > 1{,}46) = 1 - \Phi(1{,}46) \approx 1 - 0{,}9279 = 0{,}072.
$$

Cerca de 7,2 por cento. Sem a correção de continuidade teríamos padronizado o 15 em vez do 14,5 e o resultado sairia enviesado para baixo. A expressão binomial exata, $\sum_{k=15}^{200} \binom{200}{k} 0{,}05^k 0{,}95^{200-k}$, existe mas ninguém a calcula à mão: é exatamente para isto que serve a aproximação.

## A t de Student: normal com desvio estimado

A normal exige $\sigma$ conhecido. Na prática estimas o desvio pela amostra, e essa estimativa acrescenta incerteza, sobretudo com poucos dados. A distribuição **$t$ de Student** com $\nu = n - 1$ graus de liberdade é a normal com caudas mais pesadas para compensar. Com $n$ grande (regra prática: $n \ge 30$), $t$ e $z$ quase coincidem e podes usar a normal.

:::warning[Escolher entre z e t]
A decisão tem duas perguntas, por esta ordem. O desvio populacional $\sigma$ é conhecido? Se sim, usa $z$ sempre. Se não, usa $t$ com $n - 1$ graus de liberdade (e só aproxima por $z$ se $n \ge 30$). Trocar $t$ por $z$ com amostras pequenas e desvio estimado é o erro mais comum dos intervalos de confiança, e subestima sempre a margem de erro.
:::
