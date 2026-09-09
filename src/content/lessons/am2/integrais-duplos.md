---
title: Integrais duplos
description: Integrais iterados, troca da ordem de integração e coordenadas polares.
section: conteudo
order: 7
---

O integral duplo soma valores de $f(x, y)$ sobre uma região plana $R$: volume sob o gráfico, massa de uma chapa com densidade variável, área (quando $f = 1$). O cálculo faz-se por **integração iterada**: integra numa variável tratando a outra como constante, e depois integra o resultado. A arte está em descrever $R$ e em escolher a ordem e as coordenadas certas.

## Integrais iterados e Fubini

Sobre um retângulo $R = [a, b] \times [c, d]$, o teorema de Fubini permite iterar por qualquer ordem:

$$
\iint_R f \, dA = \int_a^b \int_c^d f(x, y) \, dy \, dx = \int_c^d \int_a^b f(x, y) \, dx \, dy.
$$

Por exemplo, $\iint_R xy \, dA$ com $R = [0,1] \times [0,2]$: primeiro $\int_0^2 xy \, dy = x \cdot 2 = 2x$ (aqui $x$ comporta-se como constante), depois $\int_0^1 2x \, dx = 1$. Em retângulos podes escolher a ordem que der primitivas mais fáceis.

Sobre regiões gerais, a ordem impõe os limites. Se $R$ está entre as curvas $y = g_1(x)$ e $y = g_2(x)$ para $x \in [a, b]$ (região do tipo I):

$$
\iint_R f \, dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x, y) \, dy \, dx.
$$

Descreve sempre $R$ primeiro com um esboço: os limites de dentro dependem da variável de fora, nunca o contrário.

## Trocar a ordem quando a primitiva bloqueia

A região entre $y = x$ e $y = 1$ com $x \in [0, 1]$ escreve-se como $\int_0^1 \int_x^1 e^{y^2} \, dy \, dx$, mas $e^{y^2}$ não tem primitiva elementar em $y$: o integral está bloqueado. A região é a mesma descrita ao contrário: para cada $y \in [0, 1]$, $x$ vai de $0$ a $y$. Trocando a ordem:

$$
\int_0^1 \int_0^y e^{y^2} \, dx \, dy = \int_0^1 y e^{y^2} \, dy = \left[\frac{e^{y^2}}{2}\right]_0^1 = \frac{e - 1}{2}.
$$

O integral interior passou a ser trivial (integrar constante em $x$ dá o fator $y$), e o exterior resolve-se por substituição. Sempre que o integral interior não tem primitiva, redesenha a região e tenta a outra ordem antes de desistir.

:::tip[Como redescrever a região]
Iguala as fronteiras para achar os vértices, escolhe a nova variável exterior e lê os limites no esboço: para cada valor fixo da variável exterior, onde entra e onde sai o segmento paralelo ao eixo da variável interior.
:::

## Coordenadas polares

Quando $R$ envolve círculos ou a função depende de $x^2 + y^2$, muda para polares $x = r\cos\theta$, $y = r\sin\theta$. O elemento de área transforma-se com o jacobiano $r$:

$$
\iint_R f(x, y) \, dA = \iint_{R'} f(r\cos\theta, r\sin\theta) \, r \, dr \, d\theta.
$$

Calcula o volume da semiesfera de raio $a$ (gráfico de $z = \sqrt{a^2 - x^2 - y^2}$ sobre o disco $x^2 + y^2 \leq a^2$):

$$
V = \int_0^{2\pi} \int_0^a \sqrt{a^2 - r^2} \cdot r \, dr \, d\theta.
$$

O integral interior, com $u = a^2 - r^2$, é $\left[-\frac{(a^2-r^2)^{3/2}}{3}\right]_0^a = \frac{a^3}{3}$. Multiplicando por $2\pi$: $V = \frac{2\pi a^3}{3}$, que é metade do volume $\frac{4\pi a^3}{3}$ da bola. A confirmação por uma fórmula conhecida é um hábito que vale pontos: se o resultado não fosse metade da bola, algo estaria errado.

:::warning[O $r$ do jacobiano é obrigatório]
Esquecer o fator $r$ em $r \, dr \, d\theta$ é o erro mais penalizado deste capítulo. Pensa assim: longe da origem, o mesmo intervalo $d\theta$ varre um arco maior, por isso cada pedacinho de área cresce com $r$.
:::

## Falhas frequentes

Além do $r$ em falta, os erros típicos são limites de $\theta$ errados para discos descentrados ou setores (escreve a equação da fronteira em polares para confirmar) e integrar na ordem errada em regiões que precisam de ser partidas (se a fronteira superior muda de expressão a meio, parte $R$ em duas regiões). Para áreas, usa $f = 1$; para o valor médio de $f$ em $R$, divide o integral pela área de $R$.
