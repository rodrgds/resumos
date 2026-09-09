---
title: Polinómio e série de Taylor
description: Aproximação polinomial de funções, fórmula de Taylor com resto de Lagrange e passagem à série de Taylor.
section: conteudo
order: 3
---

Muitas funções (exponencial, logaritmo, seno) são difíceis de calcular diretamente, mas polinómios são fáceis: só precisam de somas e produtos. A fórmula de Taylor constrói, a partir das derivadas num ponto, o polinómio que melhor imita a função perto desse ponto, e o resto quantifica o erro.

## Polinómio de Taylor

Se $f$ tem derivadas até à ordem $n$ em $a$, o **polinómio de Taylor** de grau $n$ em torno de $a$ é

$$
P_n(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \dots + \frac{f^{(n)}(a)}{n!}(x-a)^n.
$$

Cada termo novo corrige a aproximação usando uma derivada de ordem superior. Quando $a = 0$, chama-se por vezes polinómio de Maclaurin.

Vamos construir o polinómio de $f(x) = e^x$ em $a = 0$ até ao grau $3$. Como todas as derivadas da exponencial são $e^x$ e $e^0 = 1$:

$$
P_3(x) = 1 + x + \frac{x^2}{2} + \frac{x^3}{6}.
$$

Para $x = 0{,}1$, isto dá $1 + 0{,}1 + 0{,}005 + 0{,}0001\overline{6} \approx 1{,}10517$, enquanto $e^{0{,}1} \approx 1{,}10517$. Com três termos já acertamos em cinco casas decimais, porque $0{,}1$ está perto do centro.

Outro exemplo útil: $f(x) = \ln(1+x)$ em $a = 0$. As derivadas são $f'(x) = 1/(1+x)$, $f''(x) = -1/(1+x)^2$, $f'''(x) = 2/(1+x)^3$, logo $f(0) = 0$, $f'(0) = 1$, $f''(0) = -1$, $f'''(0) = 2$ e

$$
P_3(x) = x - \frac{x^2}{2} + \frac{x^3}{3}.
$$

Repara o padrão alternado de sinais, que vem das derivações sucessivas de $1/(1+x)$.

## Resto de Lagrange

A **fórmula de Taylor com resto de Lagrange** escreve a função como polinómio mais erro:

$$
f(x) = P_n(x) + R_n(x), \qquad R_n(x) = \frac{f^{(n+1)}(z)}{(n+1)!}(x-a)^{n+1},
$$

para algum $z$ entre $a$ e $x$. Não sabemos $z$, mas se conseguirmos majorar $|f^{(n+1)}|$ no intervalo, obtemos uma garantia de erro.

Para a exponencial em $a = 0$ com $x > 0$, tem-se $f^{(n+1)}(z) = e^z \le e^x$, logo

$$
|R_n(x)| \le \frac{e^x}{(n+1)!} x^{n+1}.
$$

Isto mostra duas coisas: o erro encolhe quando $x$ está perto de $a$ (fator $x^{n+1}$) e quando $n$ cresce (fatorial no denominador). É por isso que somar mais termos melhora a aproximação.

## Da fórmula à série de Taylor

Se $f$ tem derivadas de todas as ordens e o resto tende para zero quando $n \to \infty$, a função iguala a sua **série de Taylor**:

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n.
$$

Para $e^x$ em $a = 0$, obtemos a série $\sum_{n=0}^{\infty} x^n/n!$, válida para todo o $x$ real. Para $\ln(1+x)$, a série $\sum_{n=1}^{\infty} (-1)^{n+1} x^n/n$ converge para $|x| < 1$ (e ainda em $x = 1$), mas diverge fora daí: a série só representa a função onde o resto vai para zero.

:::details[Exercício orientado: $f(x) = x \ln x$ em $x = 1$]
Este é o tipo de pedido que surge nos testes. Começa por calcular $f(1) = 0$, $f'(x) = \ln x + 1$ logo $f'(1) = 1$, e $f''(x) = 1/x$ logo $f''(1) = 1$. O polinómio de grau $2$ é então $P_2(x) = (x-1) + (x-1)^2/2$. Para o termo geral, deriva mais vezes e procura o padrão de $f^{(n)}(1)$: as derivadas de ordem $n \ge 2$ valem $(-1)^n (n-2)!$. Escreve a fórmula com o resto de Lagrange antes de passares ao limite da série.
:::

## Erros frequentes

Três falhas aparecem sempre. Primeira: esquecer o fatorial no denominador de cada termo. Segunda: centrar a série no ponto errado (usar potências de $x$ quando o enunciado pede em torno de $a \ne 0$). Terceira: assumir que a série converge para a função em todo o lado sem estudar o resto ou o raio de convergência.

## Para onde ir

As séries de Taylor são séries de funções. Antes delas, a cadeira estuda séries de números, com os seus critérios de convergência: [séries numéricas](series-numericas/).
