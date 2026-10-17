---
title: Cheat sheet de AM II
description: Fórmulas, condições e decisões para rever todo o percurso de AM II.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos AM II SofiaViP, apoio à organização da folha anterior
      url: https://drive.google.com/file/d/1Iif82mUI9EfH6StwtnImpK0W793EoUYY/view
---

Desenha o domínio. Confere regularidade, orientação e jacobiano antes de calcular.

## Curvas

Para $\mathbf r(t)$ de classe $C^2$ e regular, com $\mathbf r'\ne0$: $v=\|\mathbf r'\|$, $\mathbf T=\mathbf r'/v$, $L=\int_a^bv(t)\,dt$, $s(t)=\int_a^tv(u)\,du$.

| Grandeza          | Fórmula e condição                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Normal e binormal | Se $\mathbf T'\ne0$: $\mathbf N=\mathbf T'/\|\mathbf T'\|$, $\mathbf B=\mathbf T\times\mathbf N$ |
| Curvatura         | $\kappa=\|\mathbf T'\|/v=\|\mathbf r'\times\mathbf r''\|/v^3$                                    |
| Curva plana       | $\kappa=\lvert x'y''-y'x''\rvert/v^3$                                                            |
| Gráfico $y=f(x)$  | $\kappa=\lvert f''\rvert/(1+f'^2)^{3/2}$                                                         |
| Centro            | Se $\kappa>0$: $\rho=1/\kappa$, $C=P+\rho\mathbf N$                                              |
| Aceleração        | $\mathbf a=v'\mathbf T+v^2\kappa\mathbf N$, com $v'=\mathbf r'\cdot\mathbf r''/v$                |
| $v$ variável      | Retira $v'\mathbf T$ de $\mathbf r''$ antes de normalizar para $\mathbf N$                       |

Planos por $P$ com normal $\mathbf n$: $\mathbf n\cdot((x,y,z)-P)=0$. Normal usa $\mathbf T$, osculador usa $\mathbf B$, retificador usa $\mathbf N$. [Curvatura e planos](/cadeiras/am2/curvas-parametricas/#curvatura).

## Limites e diferenciabilidade

- Dois caminhos com limites diferentes refutam o limite. Concordância em retas ou iterados não prova.
- Para provar: estimativa $|f-L|\le C\|x-a\|^\alpha$, $\alpha>0$, válida em todas as direções. Em polares, controla o ângulo uniformemente.
- Continuidade em ponto de acumulação: limite igual ao valor definido.

Se $f$ é diferenciável: $f(a+h)=f(a)+\nabla f\cdot h+o(\|h\|)$. Parciais contínuas perto do ponto chegam; parciais só no ponto não chegam.

- Direcional com $\|u\|=1$: $D_uf=\nabla f\cdot u$. Maior aumento $\|\nabla f\|$ na direção do gradiente não nulo.
- Campo $F:\mathbb R^n\to\mathbb R^m$: $J_F$ tem $m\times n$ entradas, $D_uF=J_Fu$.
- Plano tangente a $z=f(x,y)$: $z=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$. Nível regular $F=c$: normal $\nabla F\ne0$. [Limites](/cadeiras/am2/limites-continuidade/#provar-um-limite-com-uma-estimativa) · [Gradiente](/cadeiras/am2/derivadas-gradiente/#o-gradiente).

## Cadeia e implícitas

$$
\frac d{dt}f(x(t),y(t))=f_xx'+f_yy',\qquad
J_{F\circ g}(a)=J_F(g(a))J_g(a).
$$

- $F(x,y)=0$ com $F\in C^1$ e $F_y\ne0$: $y'=-F_x/F_y$.
- $F(x,y,z(x,y))=0$ com $F_z\ne0$: $z_x=-F_x/F_z$, $z_y=-F_y/F_z$.
- Sistemas: deriva todas as equações e resolve nas derivadas das variáveis dependentes. Determinante não nulo garante a representação local.
- Nunca dividas por uma expressão sem tratar o caso zero. [Cadeia](/cadeiras/am2/regra-cadeia-implicitas/#regra-da-cadeia-em-funções-escalares).

## Taylor e extremos

Com $h=x-a$, $k=y-b$, derivadas no centro:

$$
P_2=f+f_xh+f_yk+\tfrac12(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2).
$$

Para $f\in C^2$, o resto é $o(h^2+k^2)$. Num candidato interior diferenciável, $\nabla f=0$.

| Condição          | Resultado local |
| ----------------- | --------------- |
| $D>0$, $f_{xx}>0$ | Mínimo estrito  |
| $D>0$, $f_{xx}<0$ | Máximo estrito  |
| $D<0$             | Sela            |
| $D=0$             | Inconclusivo    |

com $D=f_{xx}f_{yy}-f_{xy}^2$.

- Absolutos: junta interior, fronteira e pontos não diferenciáveis; compara valores. Contínua em compacto atinge extremos.
- Lagrange sobre $g=0$ regular, $f,g\in C^1$: $\nabla f=\lambda\nabla g$ mais a restrição. Verifica pontos com $\nabla g=0$ e o comportamento no infinito em conjuntos ilimitados. [Extremos](/cadeiras/am2/taylor-extremos/#extremos-absolutos-e-fronteira).

## Integrais múltiplos

- Faixa vertical: $\int_a^b\int_{g_1(x)}^{g_2(x)}f\,dy\,dx$. Trocar a ordem exige redescrever a região; parte-a onde a fronteira muda.
- Em três variáveis: projeta o sólido e limita a terceira coordenada entre superfícies.

| Coordenadas                              | Elemento                                                                          |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| Polares                                  | $dA=r\,dr\,d\theta$, $r\ge0$                                                      |
| Cilíndricas                              | $dV=r\,dr\,d\theta\,dz$                                                           |
| Esféricas ($\varphi$ desde $z$ positivo) | $dV=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$, $\rho\ge0$, $0\le\varphi\le\pi$ |

Mudança $C^1$ injetiva no interior com jacobiano não nulo: usa $|\det J_T|$ e transforma também a região. [Duplos](/cadeiras/am2/integrais-duplos/#trocar-a-ordem-quando-a-primitiva-bloqueia) · [Esféricas](/cadeiras/am2/integrais-triplos/#coordenadas-esféricas).

- Massa: integral da densidade; centro de massa divide por $M>0$. Simetria exige domínio e integrando completo simétricos.
- Inércia: $I_x=\iint y^2\sigma\,dA$, $I_y=\iint x^2\sigma\,dA$; momento polar usa $x^2+y^2$.

## Linha e Green

$$
\int_C f\,ds=\int_a^bf(r(t))\|r'(t)\|\,dt,\qquad
\int_C F\cdot dr=\int_a^bF(r(t))\cdot r'(t)\,dt.
$$

Inverter o sentido conserva o escalar e troca o sinal do vetorial.

- Conservativo $F=\nabla\phi$: trabalho $\phi(B)-\phi(A)$. Com $C^1$ em aberto simplesmente conexo, $P_y=Q_x$ (plano) ou rotacional nulo (espaço) chegam. Um buraco no domínio pode impedir a conclusão.
- Green, fronteira positiva (região à esquerda), campo $C^1$ numa vizinhança da região:

$$
\oint_{\partial D}P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,dA.
$$

- Área: $\tfrac12\oint(x\,dy-y\,dx)=\oint x\,dy=-\oint y\,dx$, sempre em orientação positiva.
- Fluxo plano exterior: $\oint P\,dy-Q\,dx=\iint(P_x+Q_y)\,dA$. Fronteira interior de buraco em sentido horário. [Green](/cadeiras/am2/integrais-linha/#teorema-de-green).

## Superfície, divergência e Stokes

- Parametrização regular: $N=r_u\times r_v$, $dS=\|N\|\,du\,dv$. Escalar usa a norma; fluxo usa $F(r)\cdot N$ para o lado pedido.
- Gráfico $z=f(x,y)$ para cima: normal $(-f_x,-f_y,1)$.

$$
\operatorname{div}F=P_x+Q_y+R_z,\qquad
\operatorname{rot}F=(R_y-Q_z,P_z-R_x,Q_x-P_y).
$$

| Pedido                       | Método                              | Condição a conferir                           |
| ---------------------------- | ----------------------------------- | --------------------------------------------- |
| Fluxo por superfície fechada | Divergência                         | Normal exterior, sem singularidades no sólido |
| Fluxo por superfície aberta  | Direto, ou fechar e subtrair tampas | Orientação de cada parte                      |
| Circulação espacial          | Stokes                              | Bordo e normal compatíveis (mão direita)      |
| Circulação plana             | Green                               | Campo definido em toda a região               |

Stokes em superfície fechada: fluxo do rotacional é zero. [Fluxo e teoremas](/cadeiras/am2/superficies-fluxo/#escolher-o-método).

## EDP básicas

- Linear: $u$ e derivadas à primeira potência, sem produtos; coeficientes nas variáveis independentes. Integrar $u_x=f(x,y)$ introduz função arbitrária de $y$.
- Transporte $u_t+cu_x=0$, $u(x,0)=g$: $u(x,t)=g(x-ct)$.
- Classificação $Au_{xx}+Bu_{xy}+Cu_{yy}$: $\Delta=B^2-4AC$; $\Delta>0$ hiperbólica, $=0$ parabólica, $<0$ elíptica. $B$ é o coeficiente completo de $u_{xy}$.

Calor em $(0,L)$:

| Fronteira       | Modos                       | Comportamento                                |
| --------------- | --------------------------- | -------------------------------------------- |
| Dirichlet $u=0$ | Senos                       | Todos os modos decaem à taxa $k(n\pi/L)^2$   |
| Neumann $u_x=0$ | Cossenos com modo constante | Constante conserva a média; restantes decaem |

Onda com fronteiras nulas: $u=\sum\sin(n\pi x/L)(A_n\cos\omega_nt+B_n\sin\omega_nt)$, com $\omega_n=n\pi c/L$. Usa os dois dados: $A_n$ do deslocamento, $B_n$ da velocidade dividida por $\omega_n$.

Laplace no retângulo: um lado com dados usa $\sinh$ normalizado; dois lados somam as duas contribuições; Neumann na base troca $\sinh$ por $\cosh$; lados verticais isolados admitem cossenos e modo constante; Robin exige conferir o sinal da normal exterior. Verifica equação, dados e domínio separadamente. [EDP](/cadeiras/am2/equacoes-diferenciais-parciais/#verificar-uma-solução) · [Fronteira](/cadeiras/am2/laplace-retangulo/#robin-e-o-sinal-da-derivada).
