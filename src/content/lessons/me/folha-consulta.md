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
    reviewer: T3 revamp
    date: '2026-10-17'
---

## Desenho: o que cada operação autoriza

| Operação               | Autoriza                                            | Não autoriza                              |
| ---------------------- | --------------------------------------------------- | ----------------------------------------- |
| Seleção aleatória      | Generalizar para a população                        | Comparação causal                         |
| Atribuição aleatória   | Comparação causal entre condições                   | Generalização automática                  |
| Estratificar (recolha) | Estimar com pesos populacionais: $\sum w_h\bar x_h$ | Dispensar a ponderação                    |
| Bloquear (experiência) | Reduzir variação de fatores conhecidos              | Tratar blocos como réplicas independentes |
| Emparelhar             | Analisar diferenças $D_i=X_i-Y_i$                   | Tratar $2n$ medições como independentes   |

[Detalhe do desenho](/cadeiras/me/estudo-e-amostragem/): amostra maior não corrige seleção voluntária. Independência exigida entre pares, não dentro do par.

## Descritiva: resumos e condições

| Tarefa                  | Relação                                                                     | Condição e erro                                                         |
| ----------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Centro                  | $\bar x=\sum x_i/n$; mediana divide ao meio; moda é máximo de frequência    | Média sensível a extremos; centros de classes dão aproximação           |
| Quantil tipo 2, $0<p<1$ | $np$ inteiro: $(x_{(np)}+x_{(np+1)})/2$; senão: $x_{(\lfloor np\rfloor+1)}$ | Confirmar a convenção do programa                                       |
| Dispersão               | $s^2=(\sum x_i^2-n\bar x^2)/(n-1)$, $n\ge2$; $AIQ=Q_3-Q_1$                  | $s$ tem a unidade dos dados; $s^2$ tem a unidade ao quadrado            |
| Transformação $Y=aX+b$  | $\bar y=a\bar x+b$; $s_Y=\|a\|s_X$                                          | Desvio nunca negativo; $b$ não entra na dispersão                       |
| Histograma              | Altura $=f_j/h_j$; **área** $=$ frequência                                  | Larguras diferentes: comparar áreas, não alturas                        |
| Caixa modificada        | Barreiras $Q_1-1,5AIQ$, $Q_3+1,5AIQ$                                        | Bigodes nas observações dentro das barreiras; assinalar fora sem apagar |

[Explicações](/cadeiras/me/estatistica-descritiva/) · [Bivariados](/cadeiras/me/dados-bivariados/): $s_{xy}=\sum(x_i-\bar x)(y_i-\bar y)/(n-1)$, $r=s_{xy}/(s_Xs_Y)$. Correlação mede associação **linear**; conserva os pares. $r=0$ não exclui relação curva.

## Probabilidade e variáveis

| Tarefa           | Relação                                                                 | Condição e erro                                               |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| União            | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$                                       | Subtrair a interseção contada duas vezes                      |
| Condicionada     | $P(A\mid B)=P(A\cap B)/P(B)$                                            | Exige $P(B)>0$; $P(A\mid B)\ne P(B\mid A)$ em geral           |
| Independência    | $P(A\cap B)=P(A)P(B)$                                                   | Incompatibilidade com $P>0$ não é independência               |
| Partição e Bayes | $P(A)=\sum_iP(B_i)P(A\mid B_i)$; $P(B_j\mid A)=P(B_j)P(A\mid B_j)/P(A)$ | Partição disjunta, exaustiva, $P(B_i)>0$; $P(A)>0$            |
| Acumulada        | $F(x)=P(X\le x)$; $P(a<X\le b)=F(b)-F(a)$                               | Salto em $x$ vale $P(X=x)$; discreta: fronteiras importam     |
| Densidade        | $\int f_X=1$; probabilidades são áreas; $P(X=x)=0$                      | Altura pode exceder 1; área total é 1                         |
| Momentos         | $V(X)=E(X^2)-E(X)^2$; $E(aX+b)=aE(X)+b$; $V(aX+b)=a^2V(X)$              | Em geral $E(g(X))\ne g(E(X))$                                 |
| Conjunta         | Marginais por soma ou integral                                          | Condicional é razão de densidades, não divisão por $P(X=x)=0$ |
| Covariância      | $\operatorname{Cov}(X,Y)=E(XY)-E(X)E(Y)$                                | Independência implica covariância nula; o inverso falha       |
| Combinações      | $V(aX+bY)=a^2V(X)+b^2V(Y)+2ab\operatorname{Cov}$                        | Variâncias somam-se na soma **e** na diferença                |

[Probabilidades](/cadeiras/me/probabilidades/) · [Variáveis](/cadeiras/me/variaveis-aleatorias/) · [Conjuntas](/cadeiras/me/distribuicoes-conjuntas/)

## Modelos: reconhecer pelas hipóteses

| Modelo                     | Hipóteses                                              | Momentos e leitura                                                                               |
| -------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Binomial $B(n,p)$          | n fixo, dois resultados, independência, p constante    | $P(X=k)=\binom nkp^k(1-p)^{n-k}$; média $np$, variância $np(1-p)$; $P(X\ge k)=1-F(k-1)$          |
| Normal $N(\mu,\sigma^2)$   | $\sigma>0$ é desvio; segundo parâmetro é **variância** | $Z=(X-\mu)/\sigma$; $\Phi(-z)=1-\Phi(z)$; $\mu\pm k\sigma$ descreve a população, não IC          |
| $t_\nu$, $\chi^2_\nu$, $F$ | Construções com normais padrão independentes           | Quantis críticos de **cauda direita**; $z_{0,05}=1,6449$, $z_{0,025}=1,9600$, $z_{0,005}=2,5758$ |
| Hipergeométrica            | n escolhas sem reposição de N com K sucessos           | $P(X=k)=\binom Kk\binom{N-K}{\,n-k\,}/\binom Nn$                                                 |
| Poisson / Exponencial      | Taxa $\lambda>0$ constante, ocorrências independentes  | Poisson: média e variância $\lambda$; espera: $P(X>t)=e^{-\lambda t}$, média $1/\lambda$         |

[Distribuições e tabelas](/cadeiras/me/distribuicoes/): trocar sucessos por insucessos lê colunas $p$ indisponíveis ($n-X\sim B(n,1-p)$).

## Amostragem: distribuição da estatística

| Estatística       | Distribuição                                                 | Condição e erro                                                                                                       |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| $\bar X$          | $E(\bar X)=\mu$, $V(\bar X)=\sigma^2/n$, $SE=\sigma/\sqrt n$ | População normal: exato para qualquer n; senão: TLC com i.i.d., momentos finitos, n adequado                          |
| $\widehat P=X/n$  | Média $p$, variância $p(1-p)/n$                              | Ajustada $\widetilde P=(X+2)/(n+4)$: centro e variância próprios; não misturar                                        |
| Binomial → normal | $Y\sim N(np,np(1-p))$                                        | Critério $n>25$, $\min(np,n(1-p))>5$; correção: $X\le k\to Y<k+0,5$; $X\ge k\to Y>k-0,5$; $X=k\to$ faixa de largura 1 |

[Amostragem e limite central](/cadeiras/me/amostragem-limite-central/): $s/\sqrt n$ estima dispersão de médias; $s$ mede dispersão de dados.

## Intervalos: estimativa ± quantil × erro padrão

A confiança cobre o parâmetro nessa proporção de repetições, sob o modelo. Parâmetro fixo, limites aleatórios. Não é percentagem de observações.

| Alvo                                     | Intervalo                                           | Quantil e erro padrão                                                           |
| ---------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| Uma média, normal, $\sigma$ conhecido    | $\bar x\pm c\cdot SE$                               | $z_{\alpha/2}$, $\sigma/\sqrt n$; exato                                         |
| Uma média, normal, $\sigma$ desconhecido | $\bar x\pm c\cdot SE$                               | $t_{\alpha/2,n-1}$, $s/\sqrt n$; exato, incluindo n grande                      |
| Uma média, não normal, n grande          | $\bar x\pm c\cdot SE$                               | z aproximado, $s/\sqrt n$ (ou $\sigma/\sqrt n$)                                 |
| Diferença, grupos independentes          | $(\bar x_1-\bar x_2)\pm c\cdot SE$                  | Welch: $SE=\sqrt{s_1^2/n_1+s_2^2/n_2}$, graus calculados                        |
| Diferença, variância comum justificada   | $(\bar x_1-\bar x_2)\pm c\cdot SE_p$                | $s_p^2=((n_1-1)s_1^2+(n_2-1)s_2^2)/(n_1+n_2-2)$; graus $n_1+n_2-2$              |
| Diferença emparelhada                    | $\bar d\pm c\cdot s_D/\sqrt n$                      | $t_{\alpha/2,n-1}$; normalidade das **diferenças**, independência entre pares   |
| Proporção, mais quatro a 95%             | $\tilde p\pm1,96\sqrt{\tilde p(1-\tilde p)/(n+4)}$  | $\tilde p=(x+2)/(n+4)$; não misturar centro de um método com erro de outro      |
| Proporção, Wald                          | $\hat p\pm z_{\alpha/2}\sqrt{\hat p(1-\hat p)/n}$   | Contagens adequadas; frágil perto de 0 ou 1; zero sucessos dá largura zero      |
| Diferença de proporções a 95%            | $(\tilde p_1-\tilde p_2)\pm1,96\cdot SE$            | Mais dois por grupo: $\tilde p_i=(x_i+1)/(n_i+2)$                               |
| Unilateral                               | $[L;1]$ ou $[0;U]$ com $z_\alpha$ (ou $t_{\alpha}$) | Uma só cauda usa $\alpha$; cortar a $[0,1]$; escolher o sentido antes dos dados |

[Uma média](/cadeiras/me/intervalos-confianca/) · [Duas médias](/cadeiras/me/comparacao-medias/) · [Proporções](/cadeiras/me/proporcoes/)

Margem $\varepsilon$ para média: $n\ge(z_{\alpha/2}\sigma/\varepsilon)^2$, arredondar para cima. Margem não é erro padrão. Com t no planeamento, iterar porque o quantil depende de n. Mais quatro a 95%: $n\ge1,96^2p_*(1-p_*)/\varepsilon^2-4$; sem estimativa, $p_*=0,5$.

## Testes: estatística, valor-p e decisão

| Alternativa | Valor-p (referência contínua simétrica G) | Região crítica t                     |
| ----------- | ----------------------------------------- | ------------------------------------ |
| Bilateral   | $2[1-G(\lvert t\rvert)]$                  | $\lvert t\rvert\ge t_{\alpha/2,\nu}$ |
| À direita   | $1-G(t)$                                  | $t\ge t_{\alpha,\nu}$                |
| À esquerda  | $G(t)$                                    | $t\le-t_{\alpha,\nu}$                |

Estatística $=$ (estimativa − valor nulo)$/$SE. Rejeitar se valor-p $\le\alpha$, com $\alpha$ fixado antes. Não rejeitar não prova igualdade; valor-p não é $P(H_0\mid\text{dados})$.

| Teste                           | Estatística sob a nula                                                      | Condição e erro                                                     |
| ------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Uma proporção                   | $z=(\hat p-p_0)/\sqrt{p_0(1-p_0)/n}$                                        | $np_0,n(1-p_0)\ge10$; denominador usa **$p_0$**                     |
| Igualdade de proporções         | $z=(\hat p_1-\hat p_2)/\sqrt{\bar p(1-\bar p)(1/n_1+1/n_2)}$                | $\bar p=(x_1+x_2)/(n_1+n_2)$; só testa $\delta_0=0$                 |
| Teste t de uma média            | $t=(\bar x-\mu_0)/(s/\sqrt n)$                                              | População normal (ou n grande); teste compatível com o IC bilateral |
| Welch / variância comum / pares | $(\bar x_1-\bar x_2-\delta_0)/SE$; pares: $(\bar d-\delta_0)/(s_D/\sqrt n)$ | Escolher o modelo antes da cauda                                    |

[Testes](/cadeiras/me/testes-hipoteses/) · [Erros e potência](/cadeiras/me/erros-potencia/): tipo I rejeita nula verdadeira ($\alpha$); tipo II não rejeita numa alternativa concreta ($\beta$); potência $1-\beta$. Calcular $\beta$ na região de não rejeição com a distribuição da alternativa. Sem alternativa concreta não há potência única.

[Aleatorização](/cadeiras/me/aleatorizacao/): respeitar desenho e permutabilidade (distribuições iguais, não só médias iguais). Contar atribuições pelo menos tão extremas, incluindo empates e a observada. Pares: trocar só dentro de cada par. Simulação: $(b+1)/(B+1)$; zero extremos simulados não é $p=0$.

## Qui-quadrado: contagens contra esperadas

| Pergunta                                       | $H_0$ e esperadas                      | Graus                                         |
| ---------------------------------------------- | -------------------------------------- | --------------------------------------------- |
| Ajustamento                                    | Probabilidades fixas $p_i$; $E_i=np_i$ | $k-1$ (menos $r$ se $r$ parâmetros estimados) |
| Independência (uma amostra, duas variáveis)    | $E_{ij}=O_{i\cdot}O_{\cdot j}/n$       | $(r-1)(c-1)$                                  |
| Homogeneidade (grupos distintos, uma variável) | $E_{ij}=O_{i\cdot}O_{\cdot j}/n$       | $(r-1)(c-1)$                                  |

$Q=\sum(O-E)^2/E$, cauda **direita**. Unidades independentes, contadas uma vez, categorias exclusivas e exaustivas. Critério: $E\ge5$ em todas as células (não $O\ge5$). Usar contagens, não percentagens. Sem correção, $Q=z^2$ do teste bilateral correspondente; com direção, usar o teste z. Rejeição global não identifica pares; reportar a dimensão observada.

[Qui-quadrado](/cadeiras/me/qui-quadrado/) · [Medianas de Mood](/cadeiras/me/qui-quadrado/#comparar-medianas-por-uma-tabela-de-contagens): mesma mediana global como limiar, regra de empates explícita; testa medianas, não médias, sem estimar a distância.
