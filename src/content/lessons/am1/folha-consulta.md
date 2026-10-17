---
title: Cheat sheet de AM I
description: Fórmulas e condições de diferenciação, séries, integração, EDOs, Laplace e Fourier.
section: recursos
studyKind: revision
editorial:
  basedOn: 2024/25
  sources:
    - title: Fichas e provas de AM I, coleção SIGARRA 2024/25
      url: https://sigarra.up.pt/feup/pt/conteudos_geral.ver?pct_pag_id=249640&pct_parametros=pv_ocorrencia_id=541866
    - title: Resumos AM SofiaViP
      url: https://drive.google.com/file/d/15hBdUfPVPdZ8exFLuA_LYStff61YH2td/view
    - title: Ficha atual de AM I, SIGARRA 2026/27
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

Para $y=f(u)$ com $u$ duas vezes derivável e $f$ duas vezes derivável num intervalo que contém a imagem de $u$,

$$
y''=f''(u)(u')^2+f'(u)u''.
$$

$(\ln|u|)'=u'/u$ para $u\ne0$; $(\arctan u)'=u'/(1+u^2)$; $(\arcsin u)'=u'/\sqrt{1-u^2}$ para $|u|<1$. Para $u>0$, $(u^v)'=u^v(v'\ln u+vu'/u)$; consulta as [regras de derivação](/cadeiras/am1/derivadas/#regras-básicas).

| Teorema   | Hipóteses essenciais                                                                                                                         | Conclusão                                         |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Rolle     | $a<b$, contínua em $[a,b]$, derivável dentro, $f(a)=f(b)$                                                                                    | Algum $c\in]a,b[$ com $f'(c)=0$                   |
| Lagrange  | Mesma regularidade                                                                                                                           | $f'(c)=[f(b)-f(a)]/(b-a)$ para algum $c$ interior |
| L'Hôpital | $0/0$ ou $\infty/\infty$, $f$ e $g$ deriváveis perto do ponto (exceto talvez nele), $g'\ne0$ perto, $\lim f'/g'$ existe (finito ou infinito) | $\lim f/g=\lim f'/g'$; verifica em cada repetição |

Sem limite de $f'/g'$, a regra não decide. Deriva numerador e denominador em separado, nunca o quociente. [Hipóteses](/cadeiras/am1/teoremas-valor-medio/#teorema-de-cauchy-e-regra-de-lhôpital).

| Classificação                    | Regra com continuidade no candidato         |
| -------------------------------- | ------------------------------------------- |
| Extremo local interior derivável | Exige $f'=0$; o recíproco falha ($x^3$)     |
| Sinal de $f'$ $+\to-$ / $-\to+$  | Máximo / mínimo local                       |
| Inflexão                         | Mudança de concavidade num ponto do gráfico |
| Absoluto em $[a,b]$              | Compara candidatos e extremos               |

[Estudo](/cadeiras/am1/estudo-funcoes/#monotonia-e-extremos).

## Taylor e séries

$$
\begin{gathered}
P_{n,a}=\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k\\
|R_{n,a}|\le\frac{M|x-a|^{n+1}}{(n+1)!},
\end{gathered}
$$

com $|f^{(n+1)}|\le M$ no segmento. A série representa $f$ só onde $R_{n,a}\to0$. [Erro](/cadeiras/am1/taylor/#resto-de-lagrange).

| Padrão                                                                          | Resultado ou condição                                                                     |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| $\sum_{n=m}^{\infty}cr^n$                                                       | $cr^m/(1-r)$ se $\lvert r\rvert<1$                                                        |
| $\sum1/n^p$                                                                     | Converge se e só se $p>1$                                                                 |
| Razão $\lvert a_{n+1}/a_n\rvert\to L$ ou raiz $\sqrt[n]{\lvert a_n\rvert}\to L$ | $L<1$: absoluta; $L>1$: diverge; $L=1$: não decide. A razão exige $a_n\ne0$ eventualmente |
| Alternada $(-1)^nb_n$                                                           | Leibniz: $b_n\ge0$, decrescente e $b_n\to0$; erro $\le b_{N+1}$                           |

$a_n\to0$ é necessário, mas insuficiente. Comparação direta ou por limite exige termos não negativos. Uma série de potências converge dentro do raio; estuda cada extremo à parte.

Estratégia: termo geral primeiro; depois razão constante, cancelamento, comparação com $p$, fatorial ou potência $n$; com sinais alternados, testa convergência absoluta antes de Leibniz. [Critérios](/cadeiras/am1/series-numericas/#critérios-de-convergência).

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

Simetria: $\int_0^a f(x)dx=\int_0^a f(a-x)dx$ para $f$ contínua e $a>0$. Uma identidade $\int_c^x f=G$ exige $f=G\prime$ e $G(c)=0$.

| Geometria               | Fórmula e condição de aplicação                                               |
| ----------------------- | ----------------------------------------------------------------------------- |
| Área entre curvas       | $\int\|f-g\|$; divide onde a ordem das curvas muda                            |
| Secções de área $A(x)$  | $V=\int A(x)dx$                                                               |
| Arandelas               | $V=\pi\int(R^2-r^2)dx$, $R\ge r\ge0$, com raios medidos desde o eixo          |
| Cascas sem sobreposição | $V=2\pi\int\rho H\,dx$; $\rho$ é a distância ao eixo                          |
| Faixa que contém o eixo | Disco cheio: $r=0$, $R$ é a maior distância às extremidades; divide onde muda |
| Polar, percurso único   | $A=\frac12\int r^2d\theta$; confirma a curva exterior em cada intervalo       |

[Geometria](/cadeiras/am1/volumes-polares/#secções-transversais-discos-e-arandelas).

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

Para $ay''+by'+cy=f$, com $a,b,c$ constantes e $a\ne0$, resolve $ar^2+br+c=0$ e soma uma particular.

| Raízes reais / complexas      | Solução homogénea                             |
| ----------------------------- | --------------------------------------------- |
| Reais distintas $r_1,r_2$     | $C_1e^{r_1x}+C_2e^{r_2x}$                     |
| Real dupla $r$                | $(C_1+C_2x)e^{rx}$                            |
| $\alpha\pm i\beta$, $\beta>0$ | $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$ |

Em ressonância, multiplica o candidato por $x^m$, com $m$ igual à multiplicidade. Se conheces uma solução $y_1$, a redução $y=y_1u$ baixa a ordem. Variação dos parâmetros exige a forma normalizada com $g=f/a$. [Segunda ordem](/cadeiras/am1/equacoes-segunda-ordem/#característica-e-problemas-de-valor-inicial).

## Laplace e Fourier

$$
\begin{gathered}
\mathcal L\{t^n\}=\frac{n!}{s^{n+1}}\\
\mathcal L\{f'\}=sF-f(0)\\
\mathcal L\{f''\}=s^2F-sf(0)-f'(0).
\end{gathered}
$$

$\mathcal L\{e^{at}f\}=F(s-a)$; $\mathcal L\{u(t-a)f(t-a)\}=e^{-as}F(s)$; $\mathcal L\{f*g\}=FG$. Convolução não é produto ponto a ponto. Para inverter, decompõe em frações, completa quadrados e ajusta fatoriais ou frequências. [Tabela e inversão](/cadeiras/am1/laplace/#tabela-de-consulta).

Para período $2L$,

$$
\begin{gathered}
a_n=\frac1L\int_{-L}^Lf(x)\cos\frac{n\pi x}Ldx\\
b_n=\frac1L\int_{-L}^Lf(x)\sin\frac{n\pi x}Ldx.
\end{gathered}
$$

A série usa $a_0/2$, não $a_0$. Par anula senos; ímpar anula cossenos e constante. Com regularidade por partes, soma $[f(x^-)+f(x^+)]/2$, usando limites periódicos nos extremos. Meio intervalo exige escolher extensão. [Fourier](/cadeiras/am1/fourier/#período-geral).
