---
title: Folha de consulta de AM I
description: Identidades, derivadas, primitivas, integrais impróprios e métodos de EDOs dos apontamentos SofiaViP.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos AM SofiaViP
      url: https://drive.google.com/file/d/15hBdUfPVPdZ8exFLuA_LYStff61YH2td/view
  coverage: Identidades trigonométricas, derivadas, primitivas, integrais impróprios e equações diferenciais de primeira e segunda ordem das quatro páginas do PDF.
  gaps:
    - Os apontamentos não cobrem Taylor, séries, integral de Riemann, aplicações geométricas, Laplace nem Fourier.
    - A edição da unidade curricular correspondente a estes apontamentos não foi verificada.
---

Esta folha resume **apenas** os quatro temas do [PDF de SofiaViP](https://drive.google.com/file/d/15hBdUfPVPdZ8exFLuA_LYStff61YH2td/view). Identifica primeiro o padrão, verifica o domínio e, no fim, deriva a primitiva ou substitui a solução na equação. Nas fórmulas, $u=u(x)$, $u'=du/dx$ e $C$ é uma constante.

## Trigonometria e derivação

As identidades que simplificam as contas são $\sin^2u+\cos^2u=1$, $1+\tan^2u=\sec^2u$, $1+\cot^2u=\csc^2u$, $\sin(2u)=2\sin u\cos u$ e $\cos(2u)=1-2\sin^2u=2\cos^2u-1$. Usa $\sec u=1/\cos u$ e $\csc u=1/\sin u$ só onde os denominadores não se anulam. O PDF chama **cotan** e **cosec** às funções que aqui aparecem como $\cot$ e $\csc$, tal como nas páginas da cadeira.

| Função                                | Derivada, com regra da cadeia                       |
| ------------------------------------- | --------------------------------------------------- |
| $u^a$, $a^u$, $\log_a u$              | $a u^{a-1}u'$, $a^u\ln(a)u'$, $u'/(u\ln a)$         |
| $\tan u$, $\sec u$                    | $u'\sec^2u$, $u'\sec u\tan u$                       |
| $\arcsin u$, $\arccos u$, $\arctan u$ | $u'/\sqrt{1-u^2}$, $-u'/\sqrt{1-u^2}$, $u'/(1+u^2)$ |

Aqui $a>0$ e $a\ne1$ para logaritmos e exponenciais de base $a$; $\log_a u$ exige $u>0$, e as derivadas de $\arcsin u$ e $\arccos u$ exigem $|u|<1$. Para $u^v$ com expoente variável e $u>0$, a **derivação logarítmica** dá $(u^v)'=u^v(v'\ln u+vu'/u)$. [Regras e cadeia](/cadeiras/am1/derivadas/#regra-da-cadeia).

## Escolher a primitiva

- **Derivada interior presente:** substitui $t=u(x)$. Por exemplo, $\int u'u^a\,dx=u^{a+1}/(a+1)+C$ para $a\ne-1$; se $a=-1$, obténs $\ln|u|+C$. Também $\int u'a^u\,dx=a^u/\ln a+C$.
- **Padrões inversos:** $\int u'/(1+u^2)\,dx=\arctan u+C$ e $\int u'/\sqrt{1-u^2}\,dx=\arcsin u+C$ para $|u|<1$. Com **sinal mais** sob a raiz, $\int u'/\sqrt{1+u^2}\,dx=\operatorname{arsinh}u+C$, não $\arcsin u$.
- **Produto que simplifica ao derivar um fator:** escolhe esse fator como $v$ e usa $\int v\,dw=vw-\int w\,dv$. Costuma resultar com polinómio vezes exponencial ou trigonométrica. [Substituição](/cadeiras/am1/primitivas/#primitivação-por-substituição) e [partes](/cadeiras/am1/primitivas/#primitivação-por-partes).

As primitivas imediatas $\int u'\sec^2u\,dx=\tan u+C$ e $\int u'\csc^2u\,dx=-\cot u+C$ permitem reconhecer rapidamente duas funções racionais trigonométricas. Mantém $+C$ no integral indefinido.

## Integral impróprio: onde pôr o limite

Se o intervalo não tem extremo finito, define $\int_a^\infty f(x)\,dx=\lim_{R\to\infty}\int_a^R f(x)\,dx$. Se $f$ é ilimitada em $a$, define $\int_a^b f(x)\,dx=\lim_{\varepsilon\to0^+}\int_{a+\varepsilon}^b f(x)\,dx$. Se há singularidade **dentro** de $[a,b]$, separa o integral nesse ponto e exige limites finitos **dos dois lados**. Um integral que combina causas exige todos os limites necessários em separado.

Para decidir sem achar a primitiva, usa a comparação com funções não negativas perto do ponto problemático. Se $f/g\to c$ com $0<c<\infty$, os respetivos integrais têm a mesma natureza. As referências rápidas são $\int_1^\infty x^{-p}\,dx$, convergente se e só se $p>1$, e $\int_0^1 x^{-p}\,dx$, convergente se e só se $p<1$. Escrever uma primitiva e substituir logo $\infty$ ou um ponto singular não é uma justificação. [Integrais impróprios](/cadeiras/am1/hiperbolicas-improprios/#integrais-impróprios).

## EDOs: classifica antes de integrar

Chama-se **linear** de ordem $m$ a equação $a_m(x)y^{(m)}+\cdots+a_1(x)y'+a_0(x)y=f(x)$, com coeficientes independentes de $y$ e $a_m\ne0$ no intervalo de trabalho. É **linear homogénea** se $f=0$. Uma EDO de primeira ordem dita **homogénea**, $y'=F(y/x)$, usa outra noção de homogeneidade. [Classificação e métodos](/cadeiras/am1/equacoes-diferenciais/#variáveis-separáveis).

| Forma reconhecida  | Redução a fazer                                                        | Condição a não perder                                               |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------- |
| $y'=f(x)g(y)$      | $\int dy/g(y)=\int f(x)\,dx$                                           | Antes de dividir, testa os zeros de $g$ como soluções constantes.   |
| $y'=F(y/x)$        | $v=y/x$, logo $y'=v+xv'$; resolve a separável resultante.              | Trabalha num intervalo com $x\ne0$.                                 |
| $y'+P(x)y=Q(x)$    | $\mu=e^{\int P\,dx}$; $(\mu y)'=\mu Q$; $y=\mu^{-1}(\int\mu Q\,dx+C)$. | $P$ e $Q$ definidos no intervalo.                                   |
| $y'+P(x)y=Q(x)y^n$ | Para $n\ne0,1$, $v=y^{1-n}$ dá $v'+(1-n)Pv=(1-n)Q$.                    | A substituição divide por potências de $y$; verifica $y=0$ à parte. |

Em segunda ordem com coeficientes constantes, $ay''+by'+cy=f(x)$ com $a\ne0$, resolve primeiro $ar^2+br+c=0$ para obter $y_h$. Depois soma uma particular: $y=y_h+y_p$.

| Raízes características          | Solução homogénea real                        |
| ------------------------------- | --------------------------------------------- |
| $r_1\ne r_2$ reais              | $C_1e^{r_1x}+C_2e^{r_2x}$                     |
| $r$ dupla                       | $(C_1+C_2x)e^{rx}$                            |
| $\alpha\pm i\beta$, $\beta\ne0$ | $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$ |

Para o termo $f$, **variação dos parâmetros** funciona quando conheces duas soluções independentes $y_1,y_2$ da homogénea: com $W=y_1y_2'-y_1'y_2\ne0$, uma particular é

$$
y_p=-y_1\int\frac{y_2f}{aW}\,dx+y_2\int\frac{y_1f}{aW}\,dx.
$$

Usa esta fórmula em intervalos onde $a$, $f$ e $W$ permitam as operações. As constantes dessas duas integrações já estão em $y_h$. Se $f$ for uma combinação simples de polinómios, exponenciais e senos/cossenos, os [coeficientes indeterminados](/cadeiras/am1/equacoes-diferenciais/#segunda-ordem-linear-com-coeficientes-constantes) podem dar uma particular mais depressa.
