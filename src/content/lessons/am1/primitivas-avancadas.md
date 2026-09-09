---
title: Primitivação avançada
description: Frações racionais por decomposição, potências e produtos trigonométricos, substituição universal e expressões irracionais.
section: conteudo
order: 7
---

Esta página trata os integrandos que resistem aos métodos básicos: quocientes de polinómios, potências trigonométricas e raízes. Cada família tem um procedimento sistemático; a competência é reconhecer a família e aplicar o procedimento sem saltar passos.

## Frações racionais

Para $\int P(x)/Q(x)\,dx$ com polinómios $P$ e $Q$, o primeiro passo é garantir que o grau de $P$ é menor que o de $Q$; se não for, faz a divisão e primitiva o quociente (polinómio) mais o resto sobre $Q$. Depois fatoriza $Q$ em fatores lineares e quadráticos e decompõe em **frações simples**.

Exemplo completo: $\int \frac{dx}{x(x-1)^2}$. Escreve

$$
\frac{1}{x(x-1)^2} = \frac{A}{x} + \frac{B}{x-1} + \frac{C}{(x-1)^2}.
$$

Multiplicando por $x(x-1)^2$: $1 = A(x-1)^2 + Bx(x-1) + Cx$. Substituindo $x = 0$ dá $1 = A$. Substituindo $x = 1$ dá $1 = C$. Comparando coeficientes de $x^2$: $0 = A + B$, logo $B = -1$. Assim

$$
\int \frac{dx}{x(x-1)^2} = \int \left(\frac{1}{x} - \frac{1}{x-1} + \frac{1}{(x-1)^2}\right)dx = \ln|x| - \ln|x-1| - \frac{1}{x-1} + C.
$$

Deriva para confirmar: $1/x - 1/(x-1) + 1/(x-1)^2$, que recompõe a fração original. Certo.

Os casos que pedem atenção: raízes múltiplas (cada potência $(x-a)^k$ gera $k$ frações) e fatores quadráticos irredutíveis $x^2 + bx + c$, que geram termos $(Mx+N)/(x^2+bx+c)$ e conduzem a logaritmos e arco tangentes. Por exemplo, $\int \frac{dx}{x^2+1} = \arctan x + C$.

## Potências e produtos trigonométricos

Para potências ímpares de seno ou cosseno, guarda um fator para o $du$ e converte o resto com $\sin^2 x + \cos^2 x = 1$. Exemplo: $\int \sin^3 x \cos^2 x\,dx$. Escreve $\sin^3 x = (1 - \cos^2 x)\sin x$ e substitui $u = \cos x$, $du = -\sin x\,dx$:

$$
\int (1-u^2)u^2(-du) = \int (u^4 - u^2)\,du = \frac{u^5}{5} - \frac{u^3}{3} + C = \frac{\cos^5 x}{5} - \frac{\cos^3 x}{3} + C.
$$

Derivando confirmas: $-\sin x \cos^4 x + \sin x \cos^2 x = \sin x \cos^2 x (1 - \cos^2 x) = \sin^3 x \cos^2 x$.

Para potências pares, usam-se as fórmulas de linearização, $\cos^2 x = (1 + \cos 2x)/2$ e $\sin^2 x = (1 - \cos 2x)/2$, que baixam o grau à custa do ângulo duplo. Produtos como $\sin(mx)\cos(nx)$ convertem-se em somas com as fórmulas de produto em soma.

## Substituição universal

Qualquer função racional de seno e cosseno, $R(\sin x, \cos x)$, reduz-se a uma fração racional com a **substituição universal** $t = \tan(x/2)$:

$$
\sin x = \frac{2t}{1+t^2}, \qquad \cos x = \frac{1-t^2}{1+t^2}, \qquad dx = \frac{2\,dt}{1+t^2}.
$$

É um método garantido, mas produz frações por vezes pesadas; por isso, para potências simples prefere as técnicas da secção anterior e guarda a substituição universal para quocientes trigonométricos sem simetria aproveitável.

## Expressões irracionais

Quando o integrando envolve raízes de uma função linear, a substituição pela raiz elimina-as. Exemplo: $\int \frac{dx}{1+\sqrt{x}}$. Com $t = \sqrt{x}$, isto é $x = t^2$ e $dx = 2t\,dt$:

$$
\int \frac{2t}{1+t}\,dt = 2\int\left(1 - \frac{1}{1+t}\right)dt = 2t - 2\ln|1+t| + C = 2\sqrt{x} - 2\ln(1+\sqrt{x}) + C.
$$

Derivando obténs $1/\sqrt{x} - 1/((1+\sqrt{x})\sqrt{x}) = 1/(1+\sqrt{x})$. Certo. Para raízes de expressões quadráticas surgem as **substituições trigonométricas**: $\sqrt{a^2-x^2}$ pede $x = a\sin t$, $\sqrt{a^2+x^2}$ pede $x = a\tan t$ e $\sqrt{x^2-a^2}$ pede $x = a\sec t$.

:::warning[Escolhe o método pela forma]
Substituição e partes primeiro; fração de polinómios, decomposição; potências trigonométricas com expoente ímpar, guardar um fator; potências pares, linearizar; quociente trigonométrico genérico, substituição universal; raízes, substituição pela raiz ou trigonométrica. Classificar antes de calcular poupa a maioria das contas falhadas.
:::

## Para onde ir

Com a primitivação dominada, o integral definido volta como ferramenta geométrica: [volumes de revolução e coordenadas polares](volumes-polares/).
