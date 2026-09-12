---
title: Cheat sheet de F2
description: Relações e condições de uso para campos, potencial, circuitos DC e indução.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos Física II SofiaViP
      url: https://drive.google.com/file/d/1PWIkL4070fFxKtw_SCSJwuGIIshLs9HD/view
  coverage: Síntese das quatro páginas do resumo, sobre carga e campo, potencial e capacidade, leis de nós e malhas, fluxos, magnetismo e indução.
  gaps:
    - O resumo não desenvolve Thévenin, transitórios RC/RLC, fasores, resposta em frequência, amostragem, sistemas LTI ou ondas eletromagnéticas.
    - A correspondência destes apontamentos a uma edição atual da unidade curricular não foi verificada.
---

Antes de escolher uma fórmula, identifica **geometria**, **simetria**, **meio** e **sentido** de percurso. Distingue campo, potencial, fluxo e corrente: têm unidades e regras de soma diferentes.

## Carga, campo e potencial

| Pergunta                             | Relação e condição                                                                                                                                                   |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Força entre cargas pontuais          | $\lVert\vec F\rVert=k\lvert q_1q_2\rvert/r^2$, com $k=1/(4\pi\varepsilon)$ no meio escolhido. O sentido é o da reta entre as cargas: iguais repelem, opostas atraem. |
| Campo de várias cargas               | $\vec E=\vec F/q_{\mathrm{teste}}$; soma **vetorialmente** os campos de cada fonte. Uma carga de prova positiva fixa o sentido convencional de $\vec E$.             |
| Potencial e trabalho                 | $V_B-V_A=-\int_A^B\vec E\cdot d\vec\ell$ no regime eletrostático; $\Delta U=q\,\Delta V$. O potencial é escalar e soma-se algebricamente.                            |
| Condutor em equilíbrio eletrostático | $\vec E=0$ no interior do material, a superfície é equipotencial e o campo exterior imediato é perpendicular a ela. A carga livre pode redistribuir-se.              |
| Capacidade                           | $C=Q/\Delta V$; para uma geometria e um meio fixos, $C$ não depende da carga armazenada. Confere o dielétrico e a tensão máxima antes de aumentar $Q$.               |

Uma superfície equipotencial tem $\Delta V=0$ ao longo dela, embora o campo possa ser não nulo na direção normal. O potencial de uma carga pontual, com $V(\infty)=0$, é $V=kq/r$; não confundas sinal de $V$ com módulo de $\vec E$. Vê [lei de Coulomb e sobreposição](/cadeiras/f2/carga-campo/#sobreposição) e [fluxo e lei de Gauss](/cadeiras/f2/equacoes-maxwell/#lei-de-gauss).

## Fluxos: quando a simetria ajuda

O fluxo elétrico por uma superfície fechada é $\displaystyle\Phi_E=\oint_S\vec E\cdot d\vec A=Q_{\mathrm{int}}/\varepsilon_0$ **no vazio**. Só a carga **dentro** da superfície determina o fluxo total; cargas exteriores podem alterar $\vec E$ localmente. A lei de Gauss vale sempre, mas só permite tirar $E$ da integral diretamente quando a simetria torna conhecido o seu módulo e direção na superfície escolhida. Para um condutor esférico isolado de raio $R$, $E=0$ para $r<R$ e $E=kQ/r^2$ para $r>R$; $V=kQ/R$ no interior e $V=kQ/r$ no exterior, fixando $V(\infty)=0$.

O fluxo magnético fechado obedece a $\oint_S\vec B\cdot d\vec A=0$: não há monopólos magnéticos no modelo clássico. Não concluas daí que $\vec B=0$ em cada ponto da superfície. Para Ampère, $\oint_C\vec B\cdot d\vec\ell=\mu_0 I_{\mathrm{int}}$ em magnetostática no vazio; a escolha de $C$ só simplifica a integral quando há simetria suficiente. Vê [as quatro equações de Maxwell](/cadeiras/f2/equacoes-maxwell/#as-quatro-leis-lado-a-lado).

## Corrente e circuitos DC

$I=dQ/dt$ atravessa uma secção orientada; o sentido convencional é o da deslocação de carga positiva, oposto ao movimento dos eletrões num metal. Para um resistor óhmico, $V=RI$ e $P=VI=I^2R=V^2/R$, com sinais coerentes com a convenção passiva. Numa rede concentrada, a soma algébrica das **correntes num nó** é zero e a soma algébrica das **tensões numa malha** é zero. Define sentidos de referência antes de escrever as equações; resultado negativo só inverte o sentido assumido.

O resumo desenha um transitório, mas não fixa nele a equação ou as condições iniciais. Para cálculo de RC e RLC, consulta [condensador, bobina e transitório RC](/cadeiras/f2/circuitos-reativos/#transitório-rc). Para redes resistivas, vê [Kirchhoff](/cadeiras/f2/circuitos-resistivos/#leis-de-kirchhoff).

## Campo magnético e indução

A força sobre uma carga em movimento é $\vec F=q\,\vec v\times\vec B$, logo é perpendicular à velocidade e não muda, por si só, a energia cinética. Num fio, $d\vec F=I\,d\vec\ell\times\vec B$. Para um fio retilíneo longo no vazio, $B=\mu_0 I/(2\pi r)$; a regra da mão direita fixa o sentido. Materiais podem responder de forma dia-, para- ou ferromagnética; o efeito não substitui a escolha correta de $\mu$ no modelo usado.

Se o fluxo magnético por uma espira varia, $\mathcal E=-d\Phi_B/dt$; para $N$ espiras iguais, $\mathcal E=-N\,d\Phi_B/dt$. O sinal de Lenz indica que a corrente induzida **se opõe à variação do fluxo**, não necessariamente ao próprio campo. Para uma bobina linear, a ligação de fluxo é $N\Phi_B=LI$ e $\mathcal E_L=-L\,dI/dt$ na convenção de força eletromotriz induzida. Vê [Faraday na página de Maxwell](/cadeiras/f2/equacoes-maxwell/#as-outras-três-leis) e [bobina](/cadeiras/f2/circuitos-reativos/#condensador-e-bobina).
