---
title: Amostragem e Teorema do Limite Central
description: Amostragem aleatória, distribuição da média amostral e a aproximação normal para amostras grandes.
section: conteudo
order: 5
---

Até aqui modelámos populações inteiras. Na prática observas uma **amostra** e queres concluir sobre a **população**. Esta página faz a ponte: o que se pode esperar da média de uma amostra e o teorema que justifica tratar essa média como normal mesmo quando os dados originais não são.

## Amostragem aleatória

Uma **amostra aleatória** $X_1, \dots, X_n$ são $n$ observações independentes da mesma distribuição, a da população com média $\mu$ e variância $\sigma^2$. "Aleatória" aqui tem sentido técnico: cada elemento da população tem a mesma hipótese de entrar, e entrar um não influencia entrar outro. Sem isto, tudo o que se segue colapsa: uma amostra enviesada (só medir o servidor de madrugada) estima a população errada com precisão crescente.

A **média amostral** $\bar{X} = \frac{1}{n}\sum X_i$ é ela própria uma variável aleatória: cada amostra dá um valor diferente. Tem média $E[\bar{X}] = \mu$ (não tem viés) e variância $Var(\bar{X}) = \sigma^2/n$. O desvio padrão da média, $\sigma/\sqrt{n}$, chama-se **erro padrão** e mede quanto a média de uma amostra salta de amostra para amostra. Duplicar a precisão exige quadruplicar a amostra, porque o erro cai com $\sqrt{n}$.

## Teorema do Limite Central

O resultado central da cadeira: para $n$ grande, a média amostral é aproximadamente normal, **qualquer que seja** a distribuição da população:

$$
\bar{X} \;\dot{\sim}\; N\left(\mu, \frac{\sigma^2}{n}\right).
$$

Regra prática: $n \ge 30$ chega na maioria dos casos; se a população for muito assimétrica, pede-se mais. Repara no que o teorema não diz: não diz que os dados ficam normais (o histograma da amostra continua com a forma original), diz que a **média** fica normal. É uma afirmação sobre a distribuição amostral da estatística, não sobre os dados.

Intuição rápida: cada observação é um "empurrão" aleatório em torno de $\mu$; somar muitos empurrões independentes dilui as assimetrias e o total comporta-se como uma soma de muitos efeitos pequenos, que é exatamente o regime da [normal](distribuicoes/). Se a população já for normal, a média é exatamente normal para qualquer $n$, sem aproximação.

## Exemplo: média de 100 medições de latência

A latência de um serviço tem média populacional $\mu = 48$ ms e desvio $\sigma = 12$ ms, com distribuição desconhecida e assimétrica. Recolhem-se $n = 100$ medições. Qual a probabilidade de a média amostral sair mais de 2 ms longe de 48?

Com $n = 100 \ge 30$, o Teorema do Limite Central aplica-se: $\bar{X} \dot{\sim} N(48; 12^2/100)$, ou seja, desvio $\sigma/\sqrt{n} = 12/10 = 1{,}2$ ms. Padronizando a margem:

$$
P(|\bar{X} - 48| > 2) \approx P\left(|Z| > \frac{2}{1{,}2}\right) = P(|Z| > 1{,}67) = 2(1 - \Phi(1{,}67)) \approx 2 \times 0{,}0475 = 0{,}095.
$$

Cerca de 9,5 por cento. Mesmo sem saber a forma da distribuição original, a média de 100 observações comporta-se de forma previsível. E nota a ligação com os [integrais de probabilidades contínuas](/cadeiras/am1/integral-definido/): a área nas caudas é a resposta, e a padronização é o que permite lê-la na tabela.
