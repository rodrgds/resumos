## Dirichlet em três lados

Em $0<x<a$, $0<y<b$, considera $u_{xx}+u_{yy}=0$, com $u=0$ em $x=0$, $x=a$ e $y=0$, e $u(x,b)=f(x)$.

A separação $u=XY$ dá $X''+\lambda X=0$ e $Y''-\lambda Y=0$. Define $\omega_n=n\pi/a$:

$$
u(x,y)=\sum_{n\ge1}B_n
\frac{\sinh(\omega_ny)}{\sinh(\omega_nb)}\sin(\omega_nx),\qquad
B_n=\frac2a\int_0^af(x)\sin(\omega_nx)\,dx.
$$

- O seno anula os lados verticais; o seno hiperbólico anula a base.
- O denominador normaliza o fator vertical para valer 1 no topo.
- Para $a=b=1$, $f=1$, $B_n=4/(n\pi)$ nos ímpares e zero nos pares. Os cantos superiores têm dados incompatíveis, 0 e 1; a solução não se prolonga continuamente a esses cantos. Os dados aplicam-se aos lados abertos.

## Neumann e modo constante

Se os lados verticais continuam a zero mas a base passa a $u_y(x,0)=0$, troca o fator vertical por

$$
\frac{\cosh(\omega_ny)}{\cosh(\omega_nb)}.
$$

A derivada é zero na base; os coeficientes de senos do mesmo dado superior não mudam.

Se os lados verticais forem isolados, $u_x(0,y)=u_x(a,y)=0$, usa cossenos e inclui $n=0$. Para $u(x,0)=x$, $u(x,b)=0$:

$$
u=\frac a2\left(1-\frac yb\right)+
\sum_{n\ge1}a_n\frac{\sinh(\omega_n(b-y))}{\sinh(\omega_nb)}\cos(\omega_nx),
$$

$$
a_n=\frac{2a((-1)^n-1)}{n^2\pi^2}.
$$

O modo constante satisfaz $Y''=0$ e interpola a média $a/2$ da base até zero no topo. Omiti-lo perde a média.

## Robin e normal exterior

No quadrado unitário com lados verticais a zero, base $u_y=u$ e topo $u(x,1)=f(x)$, escreve $Y=C\cosh(\omega y)+D\sinh(\omega y)$, com $\omega=n\pi$. A base impõe $\omega D=C$:

$$
u=\sum_{n\ge1}B_n
\frac{\cosh(n\pi y)+\sinh(n\pi y)/(n\pi)}
{\cosh(n\pi)+\sinh(n\pi)/(n\pi)}\sin(n\pi x),
$$

onde $B_n=2\int_0^1f(x)\sin(n\pi x)\,dx$.

Na base, a normal exterior aponta para baixo: $\partial_nu=-u_y$. Assim, $\partial_nu+u=0$ equivale a $u_y=u$. Confirma o sinal antes de escolher a combinação hiperbólica e verifica todos os lados depois.

[Robin com derivada exterior](/cadeiras/am2/laplace-retangulo/#robin-e-o-sinal-da-derivada)
