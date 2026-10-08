---
title: Cheat sheet de AM I
description: Fórmulas e condições de diferenciação, séries, integração, EDOs, Laplace e Fourier.
section: recursos
studyKind: revision
editorial:
  basedOn: 2026/27
  sources:
    - title: Resumos AM SofiaViP
      url: https://drive.google.com/file/d/15hBdUfPVPdZ8exFLuA_LYStff61YH2td/view
    - title: Programa de AM I, SIGARRA 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587960
  coverage: Fórmulas e condições dos blocos desenvolvidos nas lições, incluindo Taylor, Laplace e Fourier.
---

Confirma o domínio antes da técnica. $C$ é uma constante; $u,v$ são funções deriváveis quando aparecem em regras de cálculo.

## Diferenciação

$$
\begin{gathered}
(uv)'=u'v+uv'\\
(u/v)'=\frac{u'v-uv'}{v^2}\ (v\ne0)\\
(f\circ u)'=f'(u)u'.
\end{gathered}
$$

$(\ln|u|)'=u'/u$ para $u\ne0$; $(\arctan u)'=u'/(1+u^2)$; $(\arcsin u)'=u'/\sqrt{1-u^2}$ para $|u|<1$. Para $u>0$, $(u^v)'=u^v(v'\ln u+vu'/u)$. [Regras](/cadeiras/am1/derivadas/#regras-básicas).

Rolle exige $a<b$, continuidade em $[a,b]$, derivabilidade interior e $f(a)=f(b)$; garante algum $c\in]a,b[$ com $f'(c)=0$. Lagrange exige as duas condições de regularidade e garante $f'(c)=[f(b)-f(a)]/(b-a)$. L'Hôpital exige $0/0$ ou $\infty/\infty$, derivabilidade perto do ponto, $g'\ne0$ e existência do limite de $f'/g'$. [Hipóteses](/cadeiras/am1/teoremas-valor-medio/#teorema-de-cauchy-e-regra-de-lhôpital).

Extremos interiores deriváveis exigem $f'=0$, mas o recíproco falha. Classifica pelo sinal de $f'$ com continuidade no candidato. Inflexão exige mudança de concavidade num ponto do gráfico. Para extremos absolutos em $[a,b]$, compara candidatos e extremos. [Estudo](/cadeiras/am1/estudo-funcoes/#monotonia-e-extremos).

## Taylor e séries

$$
\begin{gathered}
P_{n,a}=\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k\\
|R_{n,a}|\le\frac{M|x-a|^{n+1}}{(n+1)!},
\end{gathered}
$$

com $|f^{(n+1)}|\le M$ no segmento. A série representa $f$ só onde $R_{n,a}\to0$. [Erro](/cadeiras/am1/taylor/#resto-de-lagrange).

| Padrão                                                                          | Resultado ou condição                                           |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| $\sum_{n=m}^{\infty}cr^n$                                                       | $cr^m/(1-r)$ se $\lvert r\rvert<1$                              |
| $\sum1/n^p$                                                                     | Converge se e só se $p>1$                                       |
| Razão $\lvert a_{n+1}/a_n\rvert\to L$ ou raiz $\sqrt[n]{\lvert a_n\rvert}\to L$ | $L<1$: absoluta; $L>1$: diverge; $L=1$: não decide              |
| Alternada $(-1)^nb_n$                                                           | Leibniz: $b_n\ge0$, decrescente e $b_n\to0$; erro $\le b_{N+1}$ |

$a_n\to0$ é necessário, mas insuficiente. Comparação direta ou por limite exige termos não negativos. Uma série de potências converge dentro do raio; estuda cada extremo à parte. [Critérios](/cadeiras/am1/series-numericas/#critérios-de-convergência).

## Integração

$$
\begin{gathered}
\int u' u^p dx=\frac{u^{p+1}}{p+1}+C\\
(p\ne-1)\\
\int\frac{u'}u dx=\ln|u|+C,
\end{gathered}
$$

$$
\begin{gathered}
\int u\,dv=uv-\int v\,du\\
\frac d{dx}\int_{u(x)}^{v(x)}f(t)dt=f(v)v'-f(u)u',
\end{gathered}
$$

na última fórmula com $f$ contínua. Muda os limites numa substituição definida ou volta à variável original antes de avaliar. [Técnicas](/cadeiras/am1/primitivas/#primitivação-por-substituição).

Fração racional: divide se necessário e inclui todas as potências dos fatores repetidos. Seno/cosseno com potência ímpar: guarda um fator para substituir; ambos pares: lineariza. $t=\tan(x/2)$ racionaliza funções racionais de seno e cosseno. [Escolha](/cadeiras/am1/primitivas-avancadas/#frações-racionais).

Área: $\int|f-g|$. Volume: $\int A$; arandelas $\pi\int(R^2-r^2)$; cascas $2\pi\int\rho H$ sem sobreposição. Polar: $\frac12\int r^2d\theta$, com percurso único. Raios são distâncias ao eixo. [Geometria](/cadeiras/am1/volumes-polares/#secções-transversais-discos-e-arandelas).

## Impróprios e hiperbólicas

$$
\begin{gathered}
\int_1^{\infty}x^{-p}dx\text{ converge}\iff p>1\\
\int_0^1x^{-p}dx\text{ converge}\iff p<1.
\end{gathered}
$$

Separa singularidades interiores e as duas caudas. Todos os limites têm de ser finitos, sem cancelamento simétrico. [Convergência](/cadeiras/am1/hiperbolicas-improprios/#integrais-impróprios).

$\cosh^2x-\sinh^2x=1$; $(\sinh)'=\cosh$, $(\cosh)'=\sinh$; $\int dx/\sqrt{1+x^2}=\operatorname{arsinh}x+C$. O sinal menos dá arco-seno. [Hiperbólicas](/cadeiras/am1/hiperbolicas-improprios/#funções-hiperbólicas).

## Equações diferenciais

| Forma         | Método e condição                                   |
| ------------- | --------------------------------------------------- |
| $y'=f(x)g(y)$ | Separa; testa zeros de $g$ antes de dividir         |
| $y'=F(y/x)$   | $v=y/x$, $y'=v+xv'$; $x\ne0$                        |
| $y'+Py=Q$     | $\mu=e^{\int P}$; $(\mu y)'=\mu Q$                  |
| $y'+Py=Qy^n$  | $v=y^{1-n}$; $n\ne0,1$; verifica soluções excluídas |

Para $ay''+by'+cy=f$, $a\ne0$, resolve $ar^2+br+c=0$ e soma uma particular. Raízes distintas dão exponenciais; dupla dá $(C_1+C_2x)e^{rx}$; complexas dão $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$. Em ressonância, multiplica o candidato por $x^m$, com $m$ igual à multiplicidade. Se conheces uma solução $y_1$, a redução $y=y_1u$ baixa a ordem. Variação dos parâmetros exige a forma normalizada com $g=f/a$. [Segunda ordem](/cadeiras/am1/equacoes-segunda-ordem/#característica-e-problemas-de-valor-inicial).

## Laplace e Fourier

$$
\begin{gathered}
\mathcal L\{t^n\}=\frac{n!}{s^{n+1}}\\
\mathcal L\{f'\}=sF-f(0)\\
\mathcal L\{f''\}=s^2F-sf(0)-f'(0).
\end{gathered}
$$

$\mathcal L\{e^{at}f\}=F(s-a)$; $\mathcal L\{u(t-a)f(t-a)\}=e^{-as}F(s)$; $\mathcal L\{f*g\}=FG$. Não confundas convolução com produto. [Tabela e inversão](/cadeiras/am1/laplace/#tabela-de-consulta).

Para período $2L$,

$$
\begin{gathered}
a_n=\frac1L\int_{-L}^Lf(x)\cos\frac{n\pi x}Ldx\\
b_n=\frac1L\int_{-L}^Lf(x)\sin\frac{n\pi x}Ldx.
\end{gathered}
$$

A série usa $a_0/2$, não $a_0$. Par anula senos; ímpar anula cossenos e constante. Com regularidade por partes, soma $[f(x^-)+f(x^+)]/2$, usando limites periódicos nos extremos. Meio intervalo exige escolher extensão. [Fourier](/cadeiras/am1/fourier/#período-geral).
