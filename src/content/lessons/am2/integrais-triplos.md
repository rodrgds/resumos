---
title: Integrais triplos
description: Integrais em três variáveis e mudança para coordenadas cilíndricas e esféricas.
section: conteudo
order: 8
---

O integral triplo soma sobre um volume $V \subset \mathbb{R}^3$: massa de um sólido com densidade variável, volume (quando $f = 1$), centro de massa. O cálculo itera três vezes, e a escolha das coordenadas (cartesianas, cilíndricas ou esféricas) decide se o integral é tratável ou um pesadelo.

## Iteração em cartesianas

$$
\iiint_V f \, dV = \int \int \int f(x, y, z) \, dz \, dy \, dx,
$$

com limites lidos de dentro para fora: para cada $(x, y)$ da projeção, $z$ vai da superfície inferior à superior.

O volume do tetraedro limitado por $x + y + z = 1$ e os planos coordenados ($x, y, z \geq 0$): a projeção no plano $xy$ é o triângulo $x \geq 0$, $y \geq 0$, $x + y \leq 1$, e $z$ vai de $0$ a $1 - x - y$:

$$
V = \int_0^1 \int_0^{1-x} (1 - x - y) \, dy \, dx = \int_0^1 \frac{(1-x)^2}{2} \, dx = \frac{1}{6}.
$$

Confirma: é uma pirâmide de base triangular (área $1/2$) e altura $1$, logo $V = \frac{1}{3} \cdot \frac{1}{2} \cdot 1 = \frac{1}{6}$. Bate certo.

## Coordenadas cilíndricas

Quando o sólido tem simetria em torno do eixo $z$, usa $x = r\cos\theta$, $y = r\sin\theta$, $z = z$, com $dV = r \, dz \, dr \, d\theta$. É o polar do capítulo anterior com a altura $z$ por cima.

Volume do paraboloide $z = x^2 + y^2$ abaixo do plano $z = 4$: em cilíndricas, $z$ vai de $r^2$ a $4$, $r$ de $0$ a $2$ (onde $r^2 = 4$), $\theta$ de $0$ a $2\pi$:

$$
V = \int_0^{2\pi} \int_0^2 \int_{r^2}^{4} r \, dz \, dr \, d\theta = 2\pi \int_0^2 (4r - r^3) \, dr = 2\pi \left[2r^2 - \frac{r^4}{4}\right]_0^2 = 8\pi.
$$

Verifica a plausibilidade: o cilindro com a mesma base e altura tem volume $\pi \cdot 4 \cdot 4 = 16\pi$; o paraboloide ocupa metade ($8\pi$), tal como o integral $\int_0^2 (4r - r^3)\,dr$ sugere por simetria entre a parte de baixo e a de cima. Confianças deste tipo apanham limites trocados.

:::tip[Como ler um integral já montado]
Dado $\int_{\pi/4}^{\pi} \int_0^2 \int_1^4 r^2\sin\theta \, dz \, dr \, d\theta$, identifica primeiro o sistema (o $r$ e os limites de $\theta$ denunciam cilíndricas), depois a projeção ($0 \leq r \leq 2$, setor angular) e por fim $z$ entre $1$ e $4$. Para passar a cartesianas, a projeção vira $x^2 + y^2 \leq 4$ com $x \leq 0 \leq y$ na diagonal apropriada, e o integrando usa $r^2 = x^2 + y^2$.
:::

## Coordenadas esféricas

Para bolas, calotas e cones em torno da origem, usa

$$
x = \rho\sin\varphi\cos\theta, \quad y = \rho\sin\varphi\sin\theta, \quad z = \rho\cos\varphi,
$$

com $\rho \geq 0$, $\varphi \in [0, \pi]$ medido a partir do eixo $z$ positivo, $\theta \in [0, 2\pi]$, e $dV = \rho^2\sin\varphi \, d\rho \, d\varphi \, d\theta$.

O volume da bola de raio $a$ sai direto:

$$
V = \int_0^{2\pi} \int_0^{\pi} \int_0^a \rho^2\sin\varphi \, d\rho \, d\varphi \, d\theta = 2\pi \cdot 2 \cdot \frac{a^3}{3} = \frac{4\pi a^3}{3},
$$

porque $\int_0^{\pi} \sin\varphi \, d\varphi = 2$ e $\int_0^a \rho^2 \, d\rho = a^3/3$. Decora este cálculo: é o teste de sanidade de todo o capítulo e a via mais rápida para volumes de esferas e calotas.

:::warning[As duas convenções de ângulos]
Em matemática, $\varphi$ mede-se a partir do eixo $z$ ($z = \rho\cos\varphi$); em física (e em geografia, com a latitude), é comum o complementar. Nos testes da FEUP vale a convenção matemática. Se misturares as duas, o jacobiano $\rho^2\sin\varphi$ fica errado e todo o integral sai errado.
:::

## Escolher o sistema

A regra prática: esferas e cones com vértice na origem pedem esféricas; cilindros, paraboloides e tudo o que projeta um círculo no plano $xy$ pede cilíndricas; caixas e tetraedros ficam em cartesianas. Escreve sempre a fronteira no novo sistema para confirmar os limites (por exemplo, $x^2 + y^2 + (z-1)^2 = 9$ com $z \geq 1$ é uma calota cuja descrição mais simples continua a ser cilíndrica em torno de $z$).

## Falhas frequentes

Trocar $\sin\varphi$ por $\cos\varphi$ no jacobiano, usar $\varphi \in [0, 2\pi]$ (o ângulo polar só vai a $\pi$: de polo a polo já cobre tudo), e esquecer o $r$ nas cilíndricas. Outro clássico: projetar mal o sólido quando ele não começa em $z = 0$ (calotas, sólidos entre duas superfícies). Desenha o corte pelo plano $xz$ ou $yz$ para veres onde $z$ começa e acaba.
