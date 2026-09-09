---
title: Máquinas de Turing e decidibilidade
description: O modelo de Turing, decidível contra reconhecível e a indedicibilidade da paragem.
section: conteudo
order: 6
---

Uma **máquina de Turing** (TM) é um autómato finito com uma fita infinita onde pode ler, escrever e andar para trás e para a frente. É o modelo geral de computação: tudo o que um computador faz, uma TM faz. E, surpreendentemente, há problemas que nem ela resolve. Esta página apresenta o modelo, distingue decidível de reconhecível e prova que o problema da paragem é indecidível.

## O modelo: fita, cabeça, estados

Uma TM tem: uma **fita** infinita para a direita (ou ambos os lados), dividida em células com símbolos de um alfabeto de fita; uma **cabeça** sobre uma célula; um **estado** de um conjunto finito; e uma **função de transição** que, dado estado e símbolo lido, devolve novo estado, símbolo a escrever e movimento ($E$ esquerda, $D$ direita). Começa no estado inicial com a entrada na fita e o resto em branco ($\sqcup$). **Para** quando atinge um estado de aceitação ou rejeição; se nunca atingir, corre para sempre.

Exemplo: TM que decide $\{0^n 1^n\}$. Estratégia: em cada ronda, risca um $0$ do início e um $1$ do fim, repetindo até não restar nada (aceita) ou encontrar desordem (rejeita). Com $X$ a marcar riscados:

```text
Ronda (começa na extremidade esquerda):
  varre à direita até ao primeiro 0 não riscado; risca-o (escreve X)
  continua à direita até ao primeiro 1 não riscado; risca-o
  volta à esquerda até ao X mais à esquerda
Aceita quando já não há 0 nem 1 por riscar; rejeita se vir um 1 antes
de riscar todos os 0 (ordem trocada) ou se sobrar um 0 sem um 1.
```

A diferença para o PDA: a cabeça volta atrás e relê, por isso conta duas vezes sem pilha. A fita é memória ilimitada com acesso arbitrário.

## Decidível contra reconhecível

- $L$ é **reconhecível** (recursivamente enumerável) se existe uma TM que aceita todas as palavras de $L$ e nunca aceita palavras fora (mas pode correr para sempre nas de fora).
- $L$ é **decidível** se existe uma TM que **para sempre**, aceitando as palavras de $L$ e rejeitando as de fora. A TM é então um **decisor**.

Toda a linguagem decidível é reconhecível, mas o contrário falha. Intuição: reconhecer é "dizer sim quando sim"; decidir é "responder sempre". Para linguagens regulares e livres de contexto, pertença é decidível (simulação e CYK). O salto da cadeira é que isto nem sempre é possível.

## O problema da paragem é indecidível

O **problema da paragem** ($HALT$): dada uma TM $M$ e uma entrada $w$, será que $M$ para em $w$? Prova por diagonalização de que nenhum decisor resolve isto.

1. **Supõe** que existe um decisor $H$: $H$ recebe $\langle M, w\rangle$ (uma codificação de $M$ e $w$), para sempre e aceita se $M$ para em $w$, rejeita se $M$ corre para sempre em $w$.
2. **Constrói a máquina contrária** $D$. $D$ recebe $\langle M\rangle$ (a descrição de uma máquina) e faz: corre $H$ em $\langle M, \langle M\rangle\rangle$, ou seja, pergunta "será que $M$ para quando recebe a sua própria descrição?". Depois faz o contrário: se $H$ aceita, $D$ entra em ciclo infinito; se $H$ rejeita, $D$ para.
3. **Aplica $D$ a si própria.** Pergunta: $D$ para em $\langle D\rangle$? Há dois casos, e ambos rebentam:
   - Se $D$ para em $\langle D\rangle$, então $H$ em $\langle D, \langle D\rangle\rangle$ aceita, logo $D$ em $\langle D\rangle$ entra em ciclo, ou seja, não para. Contradição.
   - Se $D$ não para em $\langle D\rangle$, então $H$ rejeita, logo $D$ para. Contradição.
4. **Conclui.** Os dois casos possíveis são impossíveis, por isso a suposição é falsa: o decisor $H$ não existe. $HALT$ é indecidível.

Repara que a prova não usa nada sobre como $H$ funciona por dentro, só o seu comportamento observável. É uma diagonalização: $D$ foi construída para diferir de cada máquina na diagonal "máquina aplicada a si própria". Se treinaste [provas com condicionais](/cadeiras/md/provas-proposicionais/), revê a estrutura: é uma prova por contradição com análise de casos, onde cada caso nega a sua própria hipótese.

:::details[Reconhecível mas não decidível: o próprio HALT]
$HALT$ é reconhecível: uma TM que simula $M$ em $w$ e aceita se a simulação parar aceita exatamente os pares onde $M$ para. O que falta é parar nos pares onde $M$ não para, e a prova acima mostra que nenhuma TM consegue isso sempre. Por isso $HALT$ separa as duas classes.
:::

## Para levar para a próxima página

Há uma fronteira absoluta: problemas que nenhum algoritmo resolve. Mas entre os decidíveis há outra fronteira, prática: problemas decidíveis mas intratáveis. É a [complexidade](complexidade/): P contra NP.
