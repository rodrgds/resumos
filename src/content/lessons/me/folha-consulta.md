---
title: Folha de consulta de ME
description: Escolha rápida de distribuições, intervalos de confiança e testes de hipóteses em Métodos Estatísticos.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos ME SofiaViP
      url: https://drive.google.com/file/d/1NDWYsyWMJWf3b_w8yYG_Z-rh4qW7YLXw/view
  coverage: Estatística descritiva, probabilidades, variáveis aleatórias, amostragem, intervalos e testes para médias e proporções, e testes do qui-quadrado presentes nas 20 páginas dos apontamentos.
  gaps:
    - Não inclui exemplos resolvidos, diagnóstico gráfico de normalidade nem cálculo de potência.
    - A correspondência destes apontamentos a uma edição atual da unidade curricular não foi verificada.
---

Esta folha serve para escolher uma conta e conferir as suas condições. $n$ é o tamanho da amostra, $\bar x$ a média, $s^2=\sum_i(x_i-\bar x)^2/(n-1)$ a variância amostral e $\hat p=x/n$ a proporção de $x$ sucessos. Em duas amostras, os índices $1$ e $2$ identificam os grupos. Se a amostra não for aleatória ou as observações necessárias não forem independentes, as fórmulas abaixo não corrigem esse problema.

## Antes da inferência

- **Descreve os dados:** categorias pedem frequências; quantidades pedem média e desvio padrão, ou mediana e amplitude interquartil quando há extremos. Num par quantitativo, $r$ mede associação linear entre $-1$ e $1$; correlação não estabelece causalidade. [Medidas e gráficos](/cadeiras/me/estatistica-descritiva/#medidas-de-localização).
- **Probabilidades:** $P(A\mid B)=P(A\cap B)/P(B)$ se $P(B)>0$. Independência significa $P(A\cap B)=P(A)P(B)$; incompatibilidade significa $A\cap B=\varnothing$ e não implica independência, salvo probabilidade nula. Para uma partição $(B_i)$, $P(A)=\sum_iP(A\mid B_i)P(B_i)$ e $P(B_j\mid A)=P(A\mid B_j)P(B_j)/P(A)$. [Condicional e Bayes](/cadeiras/me/probabilidades/#probabilidade-condicional-e-independência).
- **Variável discreta ou contínua:** na discreta, $P(X=x)$ é a função massa e $E(X)=\sum_x xP(X=x)$; na contínua, $P(a<X<b)=\int_a^b f(x)\,dx$ e $E(X)=\int xf(x)\,dx$. Em ambas, $\operatorname{Var}(X)=E(X^2)-E(X)^2$ e $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$. [Definições](/cadeiras/me/variaveis-aleatorias/#discretas-função-massa-e-distribuição).
- **Modelos:** $X\sim\mathrm{Bin}(n,p)$ conta sucessos em $n$ ensaios de Bernoulli independentes com o mesmo $p$: $P(X=k)=\binom nk p^k(1-p)^{n-k}$, $E(X)=np$, $\operatorname{Var}(X)=np(1-p)$. Para $X\sim N(\mu,\sigma^2)$, usa $Z=(X-\mu)/\sigma\sim N(0,1)$. A normal pode aproximar a binomial se $np$ e $n(1-p)$ forem suficientemente grandes; ao aproximar $P(X\le k)$, usa a correção $k+0{,}5$. [Distribuições](/cadeiras/me/distribuicoes/#binomial-contar-sucessos).
- **Média amostral:** se $X_i$ forem independentes e tiverem a mesma média $\mu$ e variância finita $\sigma^2$, então $E(\bar X)=\mu$ e $\operatorname{Var}(\bar X)=\sigma^2/n$. Se a população for normal, $\bar X$ é exatamente normal; sem normalidade, o [Teorema do Limite Central](/cadeiras/me/amostragem-limite-central/#teorema-do-limite-central) dá uma aproximação para $n$ grande. $n=30$ é uma regra prática, não uma garantia.

## Convenções que decidem a tabela

Escreve $q_{1-\alpha/2}$ para o quantil superior de probabilidade acumulada $1-\alpha/2$ da distribuição indicada, por exemplo $z_{0{,}975}=1{,}96$ ou $t_{\nu,0{,}975}$. Para um **intervalo bilateral** de confiança $1-\alpha$, usa estimativa $\pm q_{1-\alpha/2}\,SE$. Um limite **unilateral** usa $q_{1-\alpha}$: limite inferior, estimativa $-q_{1-\alpha}SE$; superior, estimativa $+q_{1-\alpha}SE$. Os índices do quantil indicam probabilidade acumulada, não área de cauda.

Num teste, fixa $H_0:\theta=\theta_0$, a alternativa e $\alpha$ antes de olhar para a estatística $T$. Para distribuição simétrica centrada em zero, rejeita $H_0$ assim:

| Alternativa             | Região crítica                  | Valor p                          |
| ----------------------- | ------------------------------- | -------------------------------- |
| $H_1:\theta\ne\theta_0$ | $\lvert T\rvert>q_{1-\alpha/2}$ | $2P(T_0\ge\lvert t_{obs}\rvert)$ |
| $H_1:\theta>\theta_0$   | $T>q_{1-\alpha}$                | $P(T_0\ge t_{obs})$              |
| $H_1:\theta<\theta_0$   | $T<-q_{1-\alpha}$               | $P(T_0\le t_{obs})$              |

$T_0$ tem a distribuição de referência **sob $H_0$**. Se $p\le\alpha$, rejeita $H_0$; caso contrário, **não rejeita**. O valor p não é $P(H_0\mid\text{dados})$. Um teste bilateral e um intervalo bilateral construídos com o mesmo método concordam: rejeita-se $\theta_0$ quando fica fora do intervalo. [Decisão e erros](/cadeiras/me/testes-hipoteses/#as-peças-do-teste).

## Médias: escolhe pela amostragem

**Uma amostra, $\sigma$ populacional conhecido.** Se a população for normal, o método $z$ é exato; com amostra grande, é aproximado. $SE=\sigma/\sqrt n$; para $H_0:\mu=\mu_0$, $Z=(\bar X-\mu_0)/SE$ segue $N(0,1)$ sob $H_0$ no caso exato. O intervalo bilateral é $\bar x\pm z_{1-\alpha/2}SE$. Não há graus de liberdade a escolher.

**Uma amostra, $\sigma$ desconhecido.** Usa $SE=s/\sqrt n$ e $T=(\bar X-\mu_0)/SE$. Se a população for normal, $T\sim t_{n-1}$ **exatamente** sob $H_0$, e o intervalo é $\bar x\pm t_{n-1,1-\alpha/2}SE$. Sem normalidade, esta inferência é aproximada quando a amostra é suficientemente grande e não é dominada por extremos. [Escolha entre $z$ e $t$](/cadeiras/me/intervalos-confianca/#a-estrutura-de-todos-os-intervalos).

**Duas amostras independentes, desvios conhecidos.** Para $\Delta=\mu_1-\mu_2$, põe $d=\bar x_1-\bar x_2$ e $SE=\sqrt{\sigma_1^2/n_1+\sigma_2^2/n_2}$. Usa $Z=(d-\Delta_0)/SE$ e $d\pm z_{1-\alpha/2}SE$. São exatos com populações normais independentes e aproximados com amostras grandes.

**Duas amostras independentes, desvios desconhecidos.** Verifica se há razão para admitir variâncias populacionais iguais; esta hipótese altera os graus de liberdade.

- **Variâncias iguais:** $s_p^2=((n_1-1)s_1^2+(n_2-1)s_2^2)/(n_1+n_2-2)$; $SE=s_p\sqrt{1/n_1+1/n_2}$; $T=(d-\Delta_0)/SE$; $\nu=n_1+n_2-2$. Usa $t_{\nu}$ na região crítica e $d\pm t_{\nu,1-\alpha/2}SE$ no intervalo. A lei $t$ é exata com populações normais, independentes e de variância igual.
- **Variâncias não assumidas iguais:** $SE=\sqrt{s_1^2/n_1+s_2^2/n_2}$; usa $T=(d-\Delta_0)/SE$ e o intervalo $d\pm t_{\nu,1-\alpha/2}SE$. Os graus de liberdade de Welch–Satterthwaite são aproximados, tal como esta referência $t$, mesmo sob normalidade.

$$
\nu\approx\frac{(s_1^2/n_1+s_2^2/n_2)^2}{(s_1^2/n_1)^2/(n_1-1)+(s_2^2/n_2)^2/(n_2-1)}.
$$

**Dados emparelhados.** Calcula primeiro $D_i=X_i-Y_i$ para cada par, sempre na mesma ordem. Depois usa a **única amostra** de diferenças: $\bar d$, $s_D$, $SE=s_D/\sqrt n$, $T=(\bar d-\Delta_0)/SE$, $\nu=n-1$, intervalo $\bar d\pm t_{n-1,1-\alpha/2}SE$. A lei $t$ é exata se as diferenças independentes forem normais; é aproximada para amostra grande. Não trates os dois membros de cada par como amostras independentes. [Amostras emparelhadas e independentes](/cadeiras/me/testes-hipoteses/#dois-grupos-e-proporções).

Em todos estes casos, $H_1$ determina se a região crítica é bilateral ou unilateral conforme a tabela acima. Um intervalo para $\mu_1-\mu_2$ acima de zero sugere uma primeira média maior; isto descreve **diferença**, não uma causa.

## Proporções e tamanho da amostra

**Uma proporção.** $\hat p=x/n$ estima $p$. Para testar $H_0:p=p_0$, usa $Z=(\hat p-p_0)/\sqrt{p_0(1-p_0)/n}$: o erro padrão do **teste** usa $p_0$. A referência normal é aproximada e requer suficientes sucessos e insucessos esperados sob $H_0$. Para intervalo bilateral, o método de Wald usa $\hat p\pm z_{1-\alpha/2}\sqrt{\hat p(1-\hat p)/n}$; evita-o com poucos sucessos ou insucessos, sobretudo perto de $0$ ou $1$. [Proporção e intervalo](/cadeiras/me/intervalos-confianca/#exemplo-intervalo-para-uma-proporção).

**Agresti–Coull para amostra pequena.** No intervalo bilateral aproximado, usa $\tilde n=n+z_{1-\alpha/2}^2$, $\tilde p=(x+z_{1-\alpha/2}^2/2)/\tilde n$ e $\tilde p\pm z_{1-\alpha/2}\sqrt{\tilde p(1-\tilde p)/\tilde n}$. A 95%, a regra prática é $\tilde p\approx(x+2)/(n+4)$. Não uses a regra $+2,+4$ como se fosse exata para qualquer confiança.

**Duas proporções independentes.** Para $p_1-p_2$, o intervalo Wald usa $d=\hat p_1-\hat p_2$ e $SE=\sqrt{\hat p_1(1-\hat p_1)/n_1+\hat p_2(1-\hat p_2)/n_2}$, logo $d\pm z_{1-\alpha/2}SE$. A versão Agresti–Coull substitui cada $\hat p_i,n_i$ por $\tilde p_i,\tilde n_i$ na diferença **e** no erro padrão. Ambos são aproximados; perto dos extremos, prefere o ajustado. [Proporções](/cadeiras/me/testes-hipoteses/#dois-grupos-e-proporções).

Para planear uma margem bilateral $E$ na média com $\sigma$ conhecido, usa $n\ge(z_{1-\alpha/2}\sigma/E)^2$. Para uma proporção sem estimativa prévia de $p$, usa $n\ge z_{1-\alpha/2}^2/(4E^2)$, pois $p(1-p)\le1/4$. Arredonda **para cima**. São fórmulas de planeamento aproximadas, não garantias contra viés ou dados dependentes. [Dimensionar a amostra](/cadeiras/me/intervalos-confianca/#dimensionar-a-amostra).

## Contagens por categorias: qui-quadrado

Em todos os casos, $Q=\sum (O-E)^2/E$ compara frequências observadas $O$ e esperadas $E$. Sob $H_0$, a referência $\chi^2_\nu$ é **aproximada**; rejeita só à direita, $Q>\chi^2_{\nu,1-\alpha}$. Frequências esperadas pequenas tornam a aproximação fraca; a regra prática é pelo menos 5 por célula, juntando categorias compatíveis quando fizer sentido. [Os três testes](/cadeiras/me/qui-quadrado/#três-testes-uma-fórmula).

| Pergunta e amostragem                                                                               | Esperadas sob $H_0$              | Graus de liberdade                                                      |
| --------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| **Ajustamento:** uma amostra segue probabilidades categóricas $p_i$?                                | $E_i=np_i$                       | $k-1-m$, com $k$ categorias e $m$ parâmetros estimados dos mesmos dados |
| **Independência:** uma amostra, duas variáveis categóricas relacionadas?                            | $E_{ij}=n_{i\cdot}n_{\cdot j}/n$ | $(r-1)(c-1)$                                                            |
| **Homogeneidade:** amostras independentes de várias populações têm a mesma distribuição categórica? | $E_{ij}=n_{i\cdot}n_{\cdot j}/n$ | $(r-1)(c-1)$                                                            |

Uma rejeição no ajustamento indica falta de concordância com o modelo proposto. Na independência, indica associação; na homogeneidade, indica distribuições diferentes entre populações. Nenhuma das três demonstra causalidade. Se não rejeitares, escreve apenas que os dados não deram evidência suficiente contra $H_0$.

Um intervalo a 95% significa que o **procedimento**, repetido em amostras nas condições assumidas, cobre o parâmetro em cerca de 95% dos casos. Não atribui 95% de probabilidade a um parâmetro fixo dentro deste intervalo concreto. [Interpretação](/cadeiras/me/intervalos-confianca/#o-que-95-por-cento-de-confiança-significa).
