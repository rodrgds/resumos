---
title: Cheat sheet de Métodos Estatísticos
description: Fórmulas, condições e escolhas rápidas, com ligações às explicações.
section: recursos
studyKind: revision
order: 0
editorial:
  basedOn: 2025/26
  review:
    edition: 2026/27
    reviewer: Codex
    date: '2026-10-03'
---

## Dados e probabilidade

[Descritiva](/cadeiras/me/estatistica-descritiva/): $\bar x=\sum x_i/n$, $s^2=(\sum x_i^2-n\bar x^2)/(n-1)$, $n\ge2$. Em $Y=aX+b$, $\bar y=a\bar x+b$, $s_Y=|a|s_X$.

Quantis tipo 2, $0<p<1$: se np é inteiro, $q_p=(x_{(np)}+x_{(np+1)})/2$; senão, $q_p=x_{(\lfloor np\rfloor+1)}$. $AIQ=Q_3-Q_1$; barreiras $Q_1-1,5AIQ$ e $Q_3+1,5AIQ$. Bigodes nas observações dentro das barreiras.

[Bivariados](/cadeiras/me/dados-bivariados/): $s_{xy}=\sum(x_i-\bar x)(y_i-\bar y)/(n-1)$, $r=s_{xy}/(s_Xs_Y)$. Correlação mede associação linear; conserva os pares.

[Probabilidade](/cadeiras/me/probabilidades/): $P(A\cup B)=P(A)+P(B)-P(A\cap B)$; $P(A\mid B)=P(A\cap B)/P(B)$. Independência: $P(A\cap B)=P(A)P(B)$.

Partição com $P(B_i)>0$: $P(A)=\sum_iP(B_i)P(A\mid B_i)$; Bayes com $P(A)>0$: $P(B_j\mid A)=P(B_j)P(A\mid B_j)/P(A)$.

[Variáveis](/cadeiras/me/variaveis-aleatorias/): $F(x)=P(X\le x)$; $P(a<X\le b)=F(b)-F(a)$. Discreta: somar probabilidades. Com densidade: integrar, $P(X=x)=0$. $V(X)=E(X^2)-E(X)^2$.

[Conjuntas](/cadeiras/me/distribuicoes-conjuntas/): marginais por soma ou integral; $\operatorname{Cov}(X,Y)=E(XY)-E(X)E(Y)$; $V(aX+bY)=a^2V(X)+b^2V(Y)+2ab\operatorname{Cov}(X,Y)$.

## Modelos e amostragem

[Binomial](/cadeiras/me/distribuicoes/#bernoulli-e-binomial): n fixo, ensaios independentes, p constante; $P(X=k)=\binom nkp^k(1-p)^{n-k}$, média np, variância $np(1-p)$. $P(X\ge k)=1-F(k-1)$.

Normal $N(\mu,\sigma^2)$: $Z=(X-\mu)/\sigma$; $\Phi(-z)=1-\Phi(z)$. Quantis críticos de cauda direita: $z_{0,05}=1,6449$, $z_{0,025}=1,9600$, $z_{0,005}=2,5758$. t e $\chi^2$ também usam cauda direita e graus de liberdade.

[Amostragem](/cadeiras/me/amostragem-limite-central/): $E(\bar X)=\mu$, $V(\bar X)=\sigma^2/n$, $SE=\sigma/\sqrt n$. Média normal exata se população normal; aproximadamente normal por TLC com i.i.d., momentos finitos e n adequado.

Binomial → normal: $n>25$, $\min(np,n(1-p))>5$. Correção: $X\le k\to k+0,5$; $X\ge k\to k-0,5$; $X=k\to[k-0,5;k+0,5]$.

## Intervalos de confiança

[Uma média](/cadeiras/me/intervalos-confianca/): estimativa ± quantil × erro padrão.

| Condições                           | Quantil e erro padrão                         |
| ----------------------------------- | --------------------------------------------- |
| Normal, $\sigma$ conhecido          | $z_{\alpha/2}$, $\sigma/\sqrt n$              |
| Normal, $\sigma$ desconhecido       | $t_{\alpha/2,n-1}$, $s/\sqrt n$               |
| Não normal, amostra grande adequada | z aproximado, $s/\sqrt n$ ou $\sigma/\sqrt n$ |

Margem $\varepsilon$: $n\ge(z_{\alpha/2}\sigma/\varepsilon)^2$, arredondar para cima. Não confundir margem com erro padrão. Limite unilateral usa $\alpha$, não $\alpha/2$.

[Duas médias](/cadeiras/me/comparacao-medias/): independentes, $SE=\sqrt{s_1^2/n_1+s_2^2/n_2}$, t de Welch com [graus calculados](/cadeiras/me/comparacao-medias/#desvios-desconhecidos-welch). Variância comum justificada: $s_p^2=((n_1-1)s_1^2+(n_2-1)s_2^2)/(n_1+n_2-2)$, $SE_p=s_p\sqrt{1/n_1+1/n_2}$, graus $n_1+n_2-2$.

Emparelhadas: $D_i=X_i-Y_i$, $\bar d\pm t_{\alpha/2,n-1}s_D/\sqrt n$; normalidade das diferenças e independência entre pares.

[Proporção](/cadeiras/me/proporcoes/), AC 95%: $\tilde p=(x+2)/(n+4)$, $\tilde p\pm1,96\sqrt{\tilde p(1-\tilde p)/(n+4)}$. Wald: $\hat p\pm z_{\alpha/2}\sqrt{\hat p(1-\hat p)/n}$, com contagens adequadas, frágil perto dos extremos.

AC 95% sem estimativa prévia: $n\ge1,96^2/(4\varepsilon^2)-4$. Diferença de proporções AC 95%: $\tilde p_i=(x_i+1)/(n_i+2)$, erro padrão igual à raiz quadrada da soma de $\tilde p_i(1-\tilde p_i)/(n_i+2)$.

[Proporção unilateral](/cadeiras/me/proporcoes/#limites-unilaterais), Wald: $L,U=\hat p\mp z_\alpha\sqrt{\hat p(1-\hat p)/n}$; intervalo $[L;1]$ ou $[0;U]$, cortado a $[0,1]$, contagens adequadas.

## Testes e decisão

[Testes](/cadeiras/me/testes-hipoteses/): estatística = (estimativa − valor nulo)/SE. Valor-p bilateral normal/t: duas caudas além de $|t|$; direita: $1-G(t)$; esquerda: $G(t)$. Rejeitar se valor-p $\le\alpha$. Não rejeitar não prova igualdade.

Uma proporção: $z=(\hat p-p_0)/\sqrt{p_0(1-p_0)/n}$, verificar $np_0,n(1-p_0)\ge10$. Duas proporções iguais: $\bar p=(x_1+x_2)/(n_1+n_2)$, $SE_0=\sqrt{\bar p(1-\bar p)(1/n_1+1/n_2)}$.

[Erros](/cadeiras/me/erros-potencia/): tipo I, rejeitar nula verdadeira; tipo II, não rejeitar numa alternativa concreta. Potência $1-\beta$. Calcular $\beta$ na região de não rejeição, usando a distribuição na alternativa.

[Aleatorização](/cadeiras/me/aleatorizacao/): respeitar desenho e permutabilidade; contar resultados pelo menos tão extremos, incluindo empates e atribuição observada.

[Qui-quadrado](/cadeiras/me/qui-quadrado/): $Q=\sum(O-E)^2/E$, cauda direita, unidades independentes e esperadas pelo menos 5. Ajustamento: $E_i=np_i$, graus $k-1$ para modelo fixo. Independência/homogeneidade: $E_{ij}=O_{i\cdot}O_{\cdot j}/n$, graus $(r-1)(c-1)$. Usar contagens, não percentagens.
