---
title: Primitivação por substituição e por partes
description: As duas técnicas base de primitivação, com exemplos completos e critérios para escolher cada uma.
section: conteudo
order: 6
---

Primitivar é inverter a derivação: encontrar $P$ tal que $P' = f$, escrevendo-se $\int f(x)\,dx = P(x) + C$. A constante $C$ é obrigatória na primitiva indefinida, porque qualquer função que difira por constante tem a mesma derivada. As duas técnicas desta página resolvem uma grande parte dos exercícios; a próxima cobre os casos que resistem.

## Primitivação por substituição

A substituição inverte a regra da cadeia. Se o integrando contém uma função composta cuja derivada interior também aparece (a menos de constante), a mudança $u = g(x)$ simplifica tudo:

$$
\int f(g(x)) g'(x)\,dx = \int f(u)\,du.
$$

Exemplo direto: $\int 2x e^{x^2}\,dx$. Com $u = x^2$, tem-se $du = 2x\,dx$, e o integral é imediato:

$$
\int e^u\,du = e^u + C = e^{x^2} + C.
$$

Deriva o resultado para confirmar: $(e^{x^2})' = 2x e^{x^2}$. Esta verificação de dez segundos apanha a maioria dos erros.

Quando a derivada interior não aparece exatamente, tenta-se ainda isolar a substituição. Para $\int x \sqrt{x+1}\,dx$, põe $u = x + 1$, logo $x = u - 1$ e $dx = du$:

$$
\int (u-1)\sqrt{u}\,du = \int \big(u^{3/2} - u^{1/2}\big)\,du = \frac{2}{5}u^{5/2} - \frac{2}{3}u^{3/2} + C.
$$

Voltando a $x$: $\frac{2}{5}(x+1)^{5/2} - \frac{2}{3}(x+1)^{3/2} + C$. Repara que escrevemos tudo em $u$ antes de integrar e só no fim voltamos a $x$.

## Primitivação por partes

A integração por partes inverte a regra do produto. Para $u$ e $v$ diferenciáveis:

$$
\int u\,dv = uv - \int v\,du.
$$

A arte está em escolher $u$ (a parte que derivamos) e $dv$ (a parte que primitivos). Um guia prático: põe em $u$ o fator que simplifica ao derivar, tipicamente logaritmos e polinómios; põe em $dv$ o fator fácil de primitivar, tipicamente exponenciais e trigonométricas.

Exemplo completo: $\int x e^{3x}\,dx$. Escolhe $u = x$ e $dv = e^{3x}\,dx$, donde $du = dx$ e $v = e^{3x}/3$:

$$
\int x e^{3x}\,dx = \frac{x e^{3x}}{3} - \int \frac{e^{3x}}{3}\,dx = \frac{x e^{3x}}{3} - \frac{e^{3x}}{9} + C = e^{3x}\frac{3x - 1}{9} + C.
$$

Confirma derivando: a derivada de $e^{3x}(3x-1)/9$ é $3e^{3x}(3x-1)/9 + 3e^{3x}/9 = x e^{3x}$. Certo.

Outro caso clássico, com logaritmo em $u$: $\int x^2 \ln x\,dx$. Com $u = \ln x$ e $dv = x^2\,dx$, vem $du = dx/x$ e $v = x^3/3$:

$$
\int x^2 \ln x\,dx = \frac{x^3 \ln x}{3} - \int \frac{x^2}{3}\,dx = \frac{x^3 \ln x}{3} - \frac{x^3}{9} + C.
$$

Por vezes é preciso aplicar por partes duas vezes (por exemplo em $\int x^2 e^x\,dx$), ou resolver uma equação para o integral pedido: em $\int e^x \sin x\,dx$, duas aplicações devolvem o integral original com sinal trocado, e isola-se o seu valor. Se chegares a uma equação do tipo $I = \dots - I$, não é erro: resolve para $I$.

:::tip[Como escolher a técnica]
Vês uma composta com a derivada interior por perto? Substituição. Vês um produto de famílias diferentes (polinómio com exponencial, logaritmo com potência)? Partes, derivando o polinómio ou o logaritmo. Vês uma fração racional ou potências trigonométricas complicadas? São os métodos da [página seguinte](primitivas-avancadas/).
:::

## Erros frequentes

Três erros dominam: esquecer a constante $C$ na primitiva indefinida; esquecer de voltar à variável original depois da substituição; e, nas partes, escolher $u$ e $dv$ ao contrário, de modo que o novo integral fica pior que o original. Se o novo integral piorou, troca a escolha.

## Para onde ir

Quando substituição e partes não chegam, entram os métodos sistemáticos para frações racionais, potências trigonométricas e raízes: [primitivação avançada](primitivas-avancadas/).
