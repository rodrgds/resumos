---
title: Predição de saltos
description: Preditores estáticos e dinâmicos, contadores de dois bits, BHT e o custo dos erros no CPI.
section: conteudo
order: 5
---

Os saltos condicionais são frequentes, cerca de uma em cada seis instruções nos programas típicos, e cada salto mal apostado no [pipeline](pipeline/) deita fora o trabalho das fases seguintes. A predição de saltos é o mecanismo que adivinha o resultado de cada salto antes de ele ser decidido, para o pipeline nunca parar. Os bons preditores modernos acertam mais de 95% das vezes.

## O preço de falhar

Enquanto o salto não chega à fase de decisão, o processador aposta num caminho e continua a buscar instruções por ele. Se acertar, custo zero: o pipeline nunca parou. Se falhar, descarta as instruções erradas (_flush_) e recomeça no endereço certo, pagando uma **penalidade** igual ao número de fases entre a busca e a decisão.

A penalidade média por salto entra no CPI como mais uma parcela ponderada:

$$
\text{stalls de controlo} = \text{frequência de saltos} \times \text{taxa de erro} \times \text{penalidade}
$$

Um exemplo: 15% de saltos, preditor com 10% de erros, penalidade de 3 ciclos. Os stalls de controlo valem $0{,}15 \times 0{,}10 \times 3 = 0{,}045$ ciclos por instrução. Baixar a taxa de erro de 10% para 5% poupa quase tanto como eliminar uma bolha de carga-uso inteira. É por isso que este mecanismo, invisível ao programador, recebe tanto hardware dedicado.

## Preditores estáticos

O **preditor estático** decide sempre da mesma forma, sem aprender com o passado. As opções clássicas:

- **Sempre não tomado**: continua em sequência. Custa zero hardware e acerta nos saltos que raramente se confirmam, como os testes de erro.
- **Sempre tomado**: salta sempre. Paga o cálculo do endereço destino, mas acerta nos ciclos.
- **Para trás tomado, para a frente não** (_BTFN_): saltos para trás (endereço menor, tipicamente fins de ciclo) apostam em tomado; saltos para a frente (ifs, saídas) apostam em não tomado. Com uma linha de código a mais acerta a grande maioria dos ciclos e dos ifs ocasionais.

O BTFN é o exemplo perfeito de heurística barata: explora o facto de os ciclos repetirem muitas vezes e os ifs de saída acontecerem uma vez. Mas os saltos com comportamento irregular, como um `if` que alterna, continuam a falhar sempre.

## Aprender com o passado: um bit

O **preditor dinâmico** guarda o comportamento recente de cada salto e adapta a aposta. A versão mais simples usa um bit por salto: 1 significa "da última vez tomou", 0 significa "da última vez não tomou", e a aposta repete a última vez.

Segue um salto de fim de ciclo que se confirma 9 vezes e sai à 10.ª, com o bit a começar em 1 (tomado):

| Iteração         | Realidade  | Aposta     | Resultado |
| ---------------- | ---------- | ---------- | --------- |
| 1–9              | tomado     | tomado     | acerto    |
| 10               | não tomado | tomado     | erro      |
| 11 (próx. ciclo) | tomado     | não tomado | erro      |

Dois erros por cada saída de ciclo: um na saída e outro na primeira iteração do ciclo seguinte, porque uma única exceção vira o bit. Para um ciclo de 10 iterações são 2 erros em 11 previsões, quase 20% de taxa de erro num caso facílimo. O bit único é demasiado nervoso: reage a outliers como se fossem o novo normal.

## Contador de dois bits

A cura é exigir duas evidências antes de mudar de opinião. O **contador saturante de dois bits** tem quatro estados:

- 00: não tomado com força (aposta não tomado)
- 01: não tomado fraco (aposta não tomado)
- 10: tomado fraco (aposta tomado)
- 11: tomado com força (aposta tomado)

Cada salto tomado sobe um degrau (até 11), cada não tomado desce um (até 00). Repete o ciclo de 10 iterações a começar em 11: as 9 confirmações mantêm o contador em 11, a saída desce para 10 (a aposta continua tomado, acerta tudo até aqui) e só uma segunda saída seguida mudaria a aposta. Erros: só o da saída, 1 em 10 em vez de 2 em 11. O estado fraco absorve a exceção isolada sem virar a aposta.

Este é o mecanismo que deves saber desenhar de cor: quatro estados, aposta dos dois de cima contra os dois de baixo, saturação nos extremos.

## Onde vive o preditor: BHT e BTB

O preditor precisa de uma entrada por salto. A **tabela de histórico** (_BHT, branch history table_) indexa contadores de dois bits pelos bits baixos do PC do salto: cada salto tem (quase sempre) o seu contador. Dois saltos que partilham a entrada interferem um com o outro (_aliasing_), mas na prática o ruído é pequeno.

Saber **se** salta não chega: é preciso saber **para onde**. O **buffer de destino** (_BTB_) guarda, por salto recente, o endereço destino previsto. Na busca, o PC consulta o BTB: se lá estiver e o preditor apostar tomado, o pipeline continua logo no destino previsto sem esperar pela descodificação. Sem BTB, mesmo os saltos bem previstos pagariam um ciclo para calcular o destino.

:::tip[Como cai isto em teste]
O enunciado típico dá-te uma sequência de resultados (por exemplo T, T, T, N, T) e um estado inicial, e pede a taxa de acerto do preditor de 1 bit e do de 2 bits. Simula passo a passo numa tabela como a de cima: estado, aposta, resultado, estado seguinte. Não tentes fazer de cabeça, a tabela é o método.
:::

## Para levar para a próxima página

A predição esconde a latência dos saltos, mas o paralelismo até aqui continua a ser de uma instrução por ciclo. A página sobre [SIMD](simd/) mostra a outra direção: em vez de adivinhar o futuro, executar a mesma operação sobre vários dados ao mesmo tempo.
