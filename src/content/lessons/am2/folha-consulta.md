---
title: Folha de consulta de AM II
description: Fórmulas e condições para curvas, derivadas, extremos, integrais múltiplos e integrais de linha.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos AM II SofiaViP
      url: https://drive.google.com/file/d/1Iif82mUI9EfH6StwtnImpK0W793EoUYY/view
    - title: Máxima Cheat Sheet SofiaViP
      url: https://drive.google.com/file/d/1JWC2WYXp37BixuG1HbfbnNGFJgvj7Pnm/view
  coverage: O PDF tem capa e dez páginas de curvas paramétricas, derivadas e extremos de funções de várias variáveis, integrais duplos e triplos, integrais de linha e teorema de Green. A imagem complementar reúne comandos básicos do Máxima.
  gaps:
    - O PDF não desenvolve Taylor, multiplicadores de Lagrange, integrais de superfície, fluxo, teorema da divergência ou teorema de Stokes.
    - A edição do programa e as regras de avaliação a que estes apontamentos correspondem não foram confirmadas.
---

Esta folha condensa os [apontamentos de AM II de SofiaViP](https://drive.google.com/file/d/1Iif82mUI9EfH6StwtnImpK0W793EoUYY/view). Os links internos dão a explicação e exemplos. **Desenha primeiro o domínio ou a curva; só depois escolhe os limites e a fórmula.**

## Curvas paramétricas

Para $\mathbf r(t)=(x(t),y(t),z(t))$, $a\le t\le b$, derivação e integração fazem-se componente a componente. Uma curva é regular onde $\mathbf r'(t)\ne0$; aí, a velocidade é $\|\mathbf r'(t)\|$ e o versor tangente é $\mathbf T=\mathbf r'/\|\mathbf r'\|$. O comprimento é $L=\int_a^b\|\mathbf r'(t)\|\,dt$. Em particular, $\bigl\|\int_a^b\mathbf r'(t)\,dt\bigr\|\le L$: a distância entre extremos não excede o percurso. Revê [a tangente](/cadeiras/am2/curvas-parametricas/#velocidade-e-vetor-tangente-unitário) e [o comprimento](/cadeiras/am2/curvas-parametricas/#comprimento-de-arco).

Se $\mathbf T'(t)\ne0$, o normal principal é $\mathbf N=\mathbf T'/\|\mathbf T'\|$ e, em $\mathbb R^3$, o binormal é $\mathbf B=\mathbf T\times\mathbf N$. A curvatura é

$$
\kappa=\frac{\|\mathbf T'\|}{\|\mathbf r'\|}
=\frac{\|\mathbf r'\times\mathbf r''\|}{\|\mathbf r'\|^3},
\qquad \rho=\frac1\kappa\quad(\kappa>0).
$$

No plano, se $\mathbf r=(x,y)$, usa $\kappa=|x'y''-y'x''|/(x'^2+y'^2)^{3/2}$. Para o gráfico $y=f(x)$, fica $\kappa=|f''|/(1+f'^2)^{3/2}$. Todas estas expressões exigem $\mathbf r'\ne0$. Se $\kappa=0$, o raio de curvatura $1/\kappa$ não é finito. Vê [o triedro](/cadeiras/am2/curvas-parametricas/#normal-principal-e-binormal) e [a curvatura](/cadeiras/am2/curvas-parametricas/#curvatura).

Num ponto regular $P=\mathbf r(t_0)$, o plano normal tem equação $(X-P)\cdot\mathbf T(t_0)=0$. Quando $\mathbf N$ existe, o plano osculador tem normal $\mathbf B$, e o retificador tem normal $\mathbf N$. O ângulo entre duas curvas que se cruzam calcula-se com as respetivas tangentes não nulas no ponto: $\cos\theta=|u\cdot v|/(\|u\|\|v\|)$ para o menor ângulo entre as retas tangentes.

## Derivadas de várias variáveis

Num limite $\lim_{(x,y)\to(a,b)}f(x,y)$, dois caminhos com resultados diferentes provam que o limite **não existe**. Resultados iguais em alguns caminhos não provam que existe; para isso, usa uma estimativa válida em todas as direções, continuidade ou, quando servir, coordenadas polares. Vê [limites e continuidade](/cadeiras/am2/limites-continuidade/#limites-chegar-ao-ponto-por-todo-o-lado).

Para $f:\mathbb R^n\to\mathbb R$ diferenciável em $p$, $\nabla f(p)=(f_{x_1}(p),\ldots,f_{x_n}(p))$. Na direção de um **versor** $u$, $D_u f(p)=\nabla f(p)\cdot u$. Se $\nabla f(p)\ne0$, o maior aumento por unidade de comprimento é $\|\nabla f(p)\|$ na direção do gradiente. Numa superfície de nível $f=c$, $\nabla f(p)$ é normal quando não se anula. Vê [gradiente](/cadeiras/am2/derivadas-gradiente/#o-gradiente) e [derivada direcional](/cadeiras/am2/derivadas-gradiente/#derivada-direcional).

Se $u(s,t)=f(x(s,t),y(s,t))$, aplica a cadeia a **cada caminho** da composição:

$$
u_s=f_x\,x_s+f_y\,y_s,\qquad u_t=f_x\,x_t+f_y\,y_t.
$$

Se $F(x,y(x))=0$ e $F_y\ne0$ no ponto, então $y'=-F_x/F_y$. A igualdade $f_{xy}=f_{yx}$ exige hipóteses, por exemplo, continuidade das derivadas mistas numa vizinhança. Revê [a cadeia](/cadeiras/am2/regra-cadeia-implicitas/#a-cadeia-geral) e [a derivação implícita](/cadeiras/am2/regra-cadeia-implicitas/#derivar-sem-isolar-uma-equação).

## Extremos livres em duas variáveis

Num ponto **interior e diferenciável** de extremo local, $\nabla f=0$. Procura também pontos onde a derivada falha e a fronteira do domínio: um extremo pode estar aí. Num ponto estacionário com segundas derivadas contínuas, calcula $D=f_{xx}f_{yy}-f_{xy}^2$:

| Condição          | Conclusão local    |
| ----------------- | ------------------ |
| $D>0$, $f_{xx}>0$ | Mínimo             |
| $D>0$, $f_{xx}<0$ | Máximo             |
| $D<0$             | Sela               |
| $D=0$             | Teste inconclusivo |

O teste não classifica pontos de fronteira nem pontos onde a hessiana não existe. Para um extremo **absoluto**, compara valores de todos os candidatos admissíveis e confirma que o máximo ou mínimo existe no domínio considerado. Vê [extremos e hessiana](/cadeiras/am2/taylor-extremos/#extremos-livres-e-a-hessiana).

## Integrais duplos e triplos

Para uma região $D$ descrita por $a\le x\le b$ e $g_1(x)\le y\le g_2(x)$, integra primeiro em $y$:

$$
\iint_D f\,dA=\int_a^b\int_{g_1(x)}^{g_2(x)}f(x,y)\,dy\,dx.
$$

Ao trocar a ordem, **redesenha a região e reescreve os limites**. Em polares, $x=r\cos\theta$, $y=r\sin\theta$ e $dA=r\,dr\,d\theta$. Uma função ímpar numa variável integra a zero apenas se a região for simétrica nessa variável; para uma função par, podes duplicar a metade correspondente. O volume sob $z=f(x,y)$ acima de $D$ é $\iint_D f\,dA$ quando $f\ge0$. Revê [Fubini](/cadeiras/am2/integrais-duplos/#integrais-iterados-e-fubini) e [polares](/cadeiras/am2/integrais-duplos/#coordenadas-polares).

Num integral triplo, projeta o sólido no plano que deixa **uma coordenada entre duas superfícies**. Cilíndricas usam $(x,y,z)=(r\cos\theta,r\sin\theta,z)$ e $dV=r\,dr\,d\theta\,dz$. Esféricas usam

$$
(x,y,z)=(\rho\sin\varphi\cos\theta,\rho\sin\varphi\sin\theta,\rho\cos\varphi),
\qquad dV=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta.
$$

Aqui $\varphi$ mede o ângulo desde o eixo $z$ positivo, com $0\le\varphi\le\pi$. Em qualquer mudança de variáveis, transforma também o **domínio** e inclui o módulo do jacobiano. Vê [cilíndricas](/cadeiras/am2/integrais-triplos/#coordenadas-cilíndricas) e [esféricas](/cadeiras/am2/integrais-triplos/#coordenadas-esféricas).

## Integrais de linha e Green

Para $C$ parametrizada por $\mathbf r:[a,b]\to\mathbb R^n$, distingue o elemento de **comprimento** do de **deslocamento**:

$$
\int_C f\,ds=\int_a^b f(\mathbf r(t))\|\mathbf r'(t)\|\,dt,
\qquad
\int_C\mathbf F\cdot d\mathbf r=\int_a^b\mathbf F(\mathbf r(t))\cdot\mathbf r'(t)\,dt.
$$

Inverter o percurso conserva o primeiro integral e troca o sinal do segundo. Se $\mathbf F=\nabla\phi$ num domínio apropriado, $\int_C\mathbf F\cdot d\mathbf r=\phi(B)-\phi(A)$; numa curva fechada dá zero. Em duas variáveis, $P_y=Q_x$ é um teste **necessário** para $\mathbf F=(P,Q)$ conservativo e torna-se suficiente, por exemplo, num domínio aberto simplesmente conexo com derivadas contínuas. Vê [trabalho e potencial](/cadeiras/am2/integrais-linha/#campos-gradiente-e-independência-do-caminho).

Para $C=\partial D$ simples, fechada, suave por troços e orientada positivamente (região à esquerda), com $P,Q$ de classe $C^1$ numa vizinhança de $D$:

$$
\oint_C P\,dx+Q\,dy
=\iint_D(Q_x-P_y)\,dA,
\qquad
\text{área}(D)=\frac12\oint_C(-y\,dx+x\,dy).
$$

Se a orientação for horária, muda o sinal. Vê [o teorema de Green](/cadeiras/am2/integrais-linha/#teorema-de-green).

Na [folha auxiliar de Máxima](https://drive.google.com/file/d/1JWC2WYXp37BixuG1HbfbnNGFJgvj7Pnm/view), `diff(f(x), x)` e `integrate(f(x), x)` servem para conferir contas numa variável. O resultado da ferramenta não escolhe o domínio, os limites ou a orientação.

Estes apontamentos não cobrem [Taylor e Lagrange](/cadeiras/am2/taylor-extremos/) nem [fluxo, divergência e Stokes](/cadeiras/am2/superficies-fluxo/); essas páginas completam a consulta da cadeira.
