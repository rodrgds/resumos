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

No fim do percurso de AM II, esta folha responde a: que fórmulas e condições rever antes de resolver?

Desenha o domínio. Confere regularidade, orientação e jacobiano antes de calcular.

## Curvas

Para uma parametrização regular $\mathbf r(t)$ de classe $C^2$, $v=\|\mathbf r'\|$, $\mathbf T=\mathbf r'/v$, $L=\int_a^bv\,dt$, $s(t)=\int_a^t v$. Se $\mathbf T'\ne0$, $\mathbf N=\mathbf T'/\|\mathbf T'\|$ e $\mathbf B=\mathbf T\times\mathbf N$. A aceleração decompõe-se em $\mathbf a=v'\mathbf T+v^2\kappa\mathbf N$.

$$
\kappa=\frac{\|\mathbf T'\|}{v}
=\frac{\|\mathbf r'\times\mathbf r''\|}{v^3},\qquad
\rho=1/\kappa,\qquad C=P+\rho\mathbf N\quad(\kappa>0).
$$

No plano, $\kappa=|x'y''-y'x''|/(x'^2+y'^2)^{3/2}$. Num gráfico, $\kappa=|f''|/(1+f'^2)^{3/2}$. Os planos normal, osculador e retificador têm normais $\mathbf T$, $\mathbf B$ e $\mathbf N$, respetivamente. [Curvatura e planos](/cadeiras/am2/curvas-parametricas/#curvatura).

## Limites e diferenciabilidade

Dois caminhos com limites diferentes refutam um limite. Concordarem em retas não prova existência. Procura uma estimativa $|f-L|\le C\|x-a\|^\alpha$, com $\alpha>0$, válida em todas as direções. Em polares, controla o ângulo uniformemente. Continuidade exige limite igual ao valor definido. [Limites](/cadeiras/am2/limites-continuidade/#provar-um-limite-com-uma-estimativa).

Se $f$ é diferenciável, $df=\nabla f\cdot h$ e $f(a+h)=f(a)+df+o(\|h\|)$. Parciais contínuas perto do ponto são uma condição suficiente; parciais existentes só no ponto não bastam.

Para $f$ diferenciável e $\|u\|=1$, $D_uf=\nabla f\cdot u$. A maior taxa de aumento é $\|\nabla f\|$, na direção do gradiente não nulo. Para $F:\mathbb R^n\to\mathbb R^m$ diferenciável, $J_F$ tem $m\times n$ entradas e $D_uF=J_Fu$. [Gradiente](/cadeiras/am2/derivadas-gradiente/#o-gradiente).

O plano tangente a $z=f(x,y)$ é $z=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$. Num nível regular $F=c$, a normal é $\nabla F\ne0$.

## Cadeia e implícitas

$$
\frac d{dt}f(x(t),y(t))=f_xx'+f_yy',\qquad
J_{F\circ g}(a)=J_F(g(a))J_g(a).
$$

Se $F(x,y)=0$ e $F_y\ne0$, $y'=-F_x/F_y$. Se $F(x,y,z(x,y))=0$ e $F_z\ne0$, $z_x=-F_x/F_z$, $z_y=-F_y/F_z$. As hipóteses locais de classe $C^1$ e derivada não nula justificam a função implícita. [Cadeia](/cadeiras/am2/regra-cadeia-implicitas/#a-cadeia-geral).

## Taylor e extremos

Com $h=x-a$ e $k=y-b$, derivadas no centro:

$$
P_2=f+f_xh+f_yk+\tfrac12(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2).
$$

Para $f\in C^2$, o resto é $o(h^2+k^2)$. Num candidato interior diferenciável, $\nabla f=0$. Num ponto estacionário de uma função $C^2$, para classificar em duas variáveis, $D=f_{xx}f_{yy}-f_{xy}^2$:

| Condição          | Resultado local |
| ----------------- | --------------- |
| $D>0$, $f_{xx}>0$ | Mínimo estrito  |
| $D>0$, $f_{xx}<0$ | Máximo estrito  |
| $D<0$             | Sela            |
| $D=0$             | Inconclusivo    |

Para extremos absolutos, inclui fronteira e pontos não diferenciáveis. Continuidade num compacto garante existência. Com $f,g\in C^1$ e sobre $g=0$ regular, resolve $\nabla f=\lambda\nabla g$ e a restrição; verifica separadamente pontos com $\nabla g=0$. Compara todos os valores. [Extremos](/cadeiras/am2/taylor-extremos/#extremos-absolutos-e-fronteira).

## Integrais múltiplos

Uma faixa vertical em $D$ dá $\int_a^b\int_{g_1(x)}^{g_2(x)}f\,dy\,dx$. Trocar a ordem exige descrever de novo a região. Em três variáveis, projeta o sólido e põe a terceira coordenada entre superfícies. [Duplos](/cadeiras/am2/integrais-duplos/#trocar-a-ordem-quando-a-primitiva-bloqueia).

| Coordenadas | Transformação                                                                     | Elemento                                         |
| ----------- | --------------------------------------------------------------------------------- | ------------------------------------------------ |
| Polares     | $x=r\cos\theta$, $y=r\sin\theta$                                                  | $dA=r\,dr\,d\theta$                              |
| Cilíndricas | As mesmas, com $z$                                                                | $dV=r\,dr\,d\theta\,dz$                          |
| Esféricas   | $x=\rho\sin\varphi\cos\theta$, $y=\rho\sin\varphi\sin\theta$, $z=\rho\cos\varphi$ | $dV=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta$ |

Aqui $r,\rho\ge0$ e $0\le\varphi\le\pi$; $\varphi$ mede o ângulo desde o eixo $z$ positivo. Na mudança $C^1$ $x=T(u)$, injetiva no interior e com jacobiano não nulo, usa $|\det J_T|$, transforma também a região e evita cobertura múltipla. [Esféricas](/cadeiras/am2/integrais-triplos/#coordenadas-esféricas).

Massa é integral da densidade; cada coordenada do centro de massa é o integral da coordenada vezes a densidade, dividido pela massa positiva. Simetria exige compatibilidade do domínio e do integrando completo. Inércia: $I_x=\iint y^2\sigma\,dA$, $I_y=\iint x^2\sigma\,dA$; o momento polar usa $x^2+y^2$. Trocar a ordem pode exigir partir o integral no ponto onde a fronteira muda.

## Linha e Green

$$
\int_C f\,ds=\int_a^bf(r(t))\|r'(t)\|\,dt,\qquad
\int_C F\cdot dr=\int_a^bF(r(t))\cdot r'(t)\,dt.
$$

Inverter sentido conserva o primeiro e troca o sinal do segundo. Para $F=\nabla\phi$, o trabalho é $\phi(B)-\phi(A)$. Rotacional nulo torna-se suficiente para potencial, por exemplo, num aberto simplesmente conexo com campo $C^1$.

Para fronteira fechada, regular por troços e positiva, região à esquerda, e campo $C^1$ numa vizinhança da região:

$$
\oint_{\partial D}P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,dA,
\qquad A=\tfrac12\oint(x\,dy-y\,dx).
$$

Fluxo plano exterior é $\oint P\,dy-Q\,dx=\iint(P_x+Q_y)\,dA$. Fronteira interior de um buraco usa sentido horário. [Green](/cadeiras/am2/integrais-linha/#teorema-de-green).

## Superfície, divergência e Stokes

Para parametrização regular, $N=r_u\times r_v$, $dS=\|N\|\,du\,dv$. Área ou integral escalar usam a norma; fluxo orientado usa $F(r)\cdot N$, com N para o lado pedido. No gráfico $z=f(x,y)$, um vetor normal para cima é $(-f_x,-f_y,1)$, sem ser unitário em geral.

$$
\operatorname{div}F=P_x+Q_y+R_z,\qquad
\operatorname{rot}F=(R_y-Q_z,P_z-R_x,Q_x-P_y).
$$

Divergência: $\iint_{\partial V}F\cdot n\,dS=\iiint_V\operatorname{div}F\,dV$, sólido limitado, fronteira fechada regular por partes, normal exterior, campo $C^1$ numa vizinhança do sólido. Superfície aberta: fecha, calcula e subtrai as tampas orientadas.

Stokes: $\oint_{\partial S}F\cdot dr=\iint_S\operatorname{rot}F\cdot n\,dS$, superfície orientável regular por partes, campo $C^1$ perto dela e bordo compatível pela mão direita. Escolhe a superfície mais simples com o mesmo bordo. [Fluxo e teoremas](/cadeiras/am2/superficies-fluxo/#escolher-o-método).

## EDP básicas

Uma EDP linear tem u e derivadas à primeira potência, sem produtos entre elas; os coeficientes dependem das variáveis independentes. Integrar $u_x=f(x,y)$ introduz uma função arbitrária de y, não apenas uma constante.

Transporte $u_t+cu_x=0$, com $u(x,0)=g(x)$, dá $u(x,t)=g(x-ct)$. Classificação $Au_{xx}+Bu_{xy}+Cu_{yy}$: $B^2-4AC$ com $B$ o coeficiente de $u_{xy}$.

Calor em $(0,L)$ com Dirichlet:

$$
u=\sum B_n e^{-k(n\pi/L)^2t}\sin(n\pi x/L),\qquad B_n=2/L\int_0^L f\sin.
$$

Com Neumann isolado:

$$
u=a_0/2+\sum a_n e^{-k(n\pi/L)^2t}\cos(n\pi x/L);
$$

o termo constante não decai. Onda com fronteiras nulas:

$$
u=\sum\sin(n\pi x/L)(A_n\cos(n\pi ct/L)+B_n\sin(n\pi ct/L));
$$

usa os dois dados. Laplace no retângulo: modos $\sin(n\pi x/a)\sinh(n\pi y/a)$. Verifica equação, dados e domínio separadamente. [EDP](/cadeiras/am2/equacoes-diferenciais-parciais/#verificar-uma-solução).
