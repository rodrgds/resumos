## Dirichlet num só lado

Em $0<x<a$, $0<y<b$, com $u_{xx}+u_{yy}=0$, $u=0$ em $x=0$, $x=a$ e $y=0$, e $u(x,b)=f(x)$. Define $\omega_n=n\pi/a$:

$$
u(x,y)=\sum_{n\ge1}B_n
\frac{\sinh(\omega_ny)}{\sinh(\omega_nb)}\sin(\omega_nx),\qquad
B_n=\frac2a\int_0^af(x)\sin(\omega_nx)\,dx.
$$

- O seno anula os lados verticais; o seno hiperbólico anula a base. O denominador normaliza o fator para valer 1 no topo.
- Para $a=b=1$, $f=1$: $B_n=4/(n\pi)$ nos ímpares, zero nos pares. Os cantos superiores têm dados incompatíveis; a solução não se prolonga continuamente a esses cantos.

## Dados em dois lados

Com base $g$ e topo $f$, conserva os lados verticais a zero e soma os dois problemas de um só lado. $F_n$ é o coeficiente de senos de $f$ calculado acima; $G_n$ calcula-se pela mesma fórmula, substituindo $f$ por $g$:

$$
Y_n(y)=G_n\frac{\sinh(\omega_n(b-y))}{\sinh(\omega_nb)}
+F_n\frac{\sinh(\omega_ny)}{\sinh(\omega_nb)}.
$$

O primeiro fator vale 1 na base e 0 no topo; o segundo faz o contrário.

## Neumann, modo constante e Robin

| Base    | Fator vertical normalizado no topo    |
| ------- | ------------------------------------- |
| $u=0$   | $\sinh(\omega_n y)/\sinh(\omega_n b)$ |
| $u_y=0$ | $\cosh(\omega_n y)/\cosh(\omega_n b)$ |

Os coeficientes de senos do mesmo dado superior não mudam.

Se os lados verticais forem isolados, usa cossenos e inclui $n=0$: o modo constante interpola a média entre a base e o topo. Omiti-lo perde a média.

Em Robin, confirma o sinal com a normal exterior. Na base, $\partial_nu=-u_y$, por isso $\partial_nu+u=0$ equivale a $u_y=u$.

[Robin com derivada exterior](/cadeiras/am2/laplace-retangulo/#robin-e-o-sinal-da-derivada)
