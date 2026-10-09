## Propagação e polarização

No vazio sem cargas nem correntes:

$$
\nabla^2\vec E=\frac1{c^2}\partial_t^2\vec E,
\qquad \nabla^2\vec B=\frac1{c^2}\partial_t^2\vec B,
\qquad c=\frac1{\sqrt{\mu_0\varepsilon_0}}.
$$

Satisfazer a equação de onda não dispensa verificar Maxwell.

Para onda plana harmónica $\vec E=E_m\cos(kz-\omega t+\phi)\hat e_x$:

- $k=2\pi/\lambda$, em $\mathrm{rad/m}$; $\omega=2\pi f$, em $\mathrm{rad/s}$; $c=\lambda f$.
- Fase constante dá $dz/dt=\omega/k$: propagação para $+z$. Com $kz+\omega t$, propaga-se para $-z$.
- Os campos são transversais e em fase, com $\vec B=\hat k\times\vec E/c$ e $B_m=E_m/c$. Para $\hat k=\hat e_z$ e $E$ em $+x$, $B$ aponta para $+y$.
- A polarização é definida pelo campo elétrico, aqui linear segundo $x$.

## Energia e intensidade

$$
w=\frac12\varepsilon_0E^2+\frac{B^2}{2\mu_0},\qquad
\vec S=\frac{\vec E\times\vec B}{\mu_0}.
$$

$w$ mede energia por volume, em $\mathrm{J/m^3}$; $\vec S$ mede fluxo de potência, em $\mathrm{W/m^2}$, no sentido da propagação. Numa onda plana, as duas parcelas de energia são iguais.

Para amplitude **de pico**:

$$
\mathcal I=\langle S\rangle=\frac12\varepsilon_0cE_m^2
=\frac{E_m^2}{2Z_0},\qquad Z_0\simeq377\,\Omega.
$$

Com valor eficaz, $\mathcal I=\varepsilon_0cE_{\rm ef}^2$. Uma onda de $100\,\mathrm{MHz}$ com $E_m=10\,\mathrm{V/m}$ tem $\lambda\simeq3\,\mathrm m$, $B_m\simeq3{,}34\times10^{-8}\,\mathrm T$ e $\mathcal I\simeq0{,}133\,\mathrm{W/m^2}$. A potência numa área perpendicular $A$ é $\mathcal IA$, não necessariamente a potência absorvida.

O balanço local é $\partial_tw=-\vec J\cdot\vec E-\nabla\cdot\vec S$. A energia diminui quando o campo fornece potência à matéria ou sai fluxo líquido.

## Sobreposição e radiação

- Num meio linear, soma campos. Ondas próximas produzem batimentos com frequência dos máximos de amplitude $|f_1-f_2|$.
- Uma carga acelerada não relativista radia $P=q^2a^2/(6\pi\varepsilon_0c^3)$. Para aceleração variável, a média usa $\langle a^2\rangle$.
- Longe de uma fonte localizada, a amplitude de radiação cai como $1/r$ e a intensidade como $1/r^2$. Uma onda plana constante é aproximação local.

[Ver energia e Poynting](/cadeiras/f2/ondas-eletromagneticas/#energia-e-vetor-de-poynting).
