---
title: Incerteza e Bayes
description: Probabilidade, regra de Bayes, Naive Bayes e redes Bayesianas com um filtro de spam calculado.
section: conteudo
order: 7
---

A lógica da página anterior decide entre verdadeiro e falso. O mundo real raramente colabora: sensores com ruído, sintomas partilhados por várias doenças, palavras que aparecem em spam e em mensagens normais. A **probabilidade** quantifica a crença quando a informação não chega para a certeza, e a **regra de Bayes** atualiza essa crença perante evidência nova. O exemplo é um filtro de spam com 20 mensagens e todas as contas à mostra.

## O exemplo das 20 mensagens

Caixa com 20 mensagens: 8 spam e 12 normais (ham). A palavra "grátis" aparece em 6 das 8 spam e em 2 das 12 normais. Define $S$ como "é spam" e $G$ como "contém grátis":

- $P(S) = 8/20 = 0{,}4$ e $P(\lnot S) = 0{,}6$.
- $P(G \mid S) = 6/8 = 0{,}75$ e $P(G \mid \lnot S) = 2/12 \approx 0{,}167$.
- $P(G) = 8/20 = 0{,}4$, porque 8 das 20 mensagens contêm a palavra.

A pergunta que interessa é a inversa: chegada uma mensagem com "grátis", qual a probabilidade de ser spam? A regra de Bayes responde:

$$
P(S \mid G) = \frac{P(G \mid S)\,P(S)}{P(G)} = \frac{0{,}75 \times 0{,}4}{0{,}4} = 0{,}75.
$$

Lê o resultado com cuidado: 75 por cento das mensagens com "grátis" são spam, que é exatamente 6 em 8. Bayes não inventou nada; inverteu a condicional de forma sistemática. O erro clássico é confundir $P(G \mid S)$ com $P(S \mid G)$: saber que 75 por cento do spam tem "grátis" não diz que 75 por cento do que tem "grátis" é spam. Aqui coincidem por acaso aritmético ($P(S) = P(G)$); em geral não coincidem.

## Naive Bayes com duas palavras

Junta a palavra "prémio": aparece em 4 das 8 spam e em 1 das 12 normais. Para classificar uma mensagem com as duas palavras, o **Naive Bayes** assume que as palavras são **condicionalmente independentes** dada a classe, isto é, $P(G, P \mid S) = P(G \mid S)\,P(P \mid S)$. Com $P(P \mid S) = 4/8 = 0{,}5$ e $P(P \mid \lnot S) = 1/12$:

- Proporcional a spam: $0{,}4 \times 0{,}75 \times 0{,}5 = 0{,}15$.
- Proporcional a ham: $0{,}6 \times (2/12) \times (1/12) = 0{,}6/72 \approx 0{,}0083$.

Normaliza: $0{,}15 / (0{,}15 + 0{,}0083) \approx 0{,}947$. A mensagem é classificada spam com 94,7 por cento de confiança. A hipótese de independência é ingénua, as palavras "grátis" e "prémio" provavelmente correlacionam, mas o classificador funciona bem na prática porque para decidir basta a ordem das classes estar certa, não as probabilidades exatas.

:::tip[Como cai em teste]
Dão-te a tabela de contagens e pedem $P(classe \mid evidência)$. Passos: conta os totais, escreve as condicionais a partir das contagens, aplica Bayes, e normaliza dividindo pela soma das hipóteses. Verifica no fim que as probabilidades das classes somam 1.
:::

## Redes Bayesianas

Quando há muitas variáveis, a tabela conjunta é impossível: $n$ variáveis binárias pedem $2^n$ entradas. Uma **rede Bayesiana** é um grafo dirigido acíclico onde cada nó tem uma tabela só com os seus pais, e a conjunta fatoriza-se pelo produto. A estrutura codifica **independências**: cada variável é independente das não descendentes dados os pais.

No spam, a rede ingénua é classe no topo com uma seta para cada palavra: $P(S, G, P) = P(S)\,P(G \mid S)\,P(P \mid S)$, que é exatamente a conta da secção anterior. Se "prémio" dependesse também de "grátis", acrescentava-se uma seta entre elas e a tabela crescia. A rede é o meio termo entre a tabela completa, que não escala, e a ingenuidade total, que ignora dependências reais. Inferência nela (perguntar uma variável dadas outras) é o tema que fecha a incerteza e abre a porta à aprendizagem com dados incompletos.
