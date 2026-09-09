---
title: Pipeline
description: As cinco fases, débito ideal, hazards de dados com forwarding e bolhas, e hazards estruturais.
section: conteudo
order: 4
---

No datapath monociclo de FSC, cada instrução atravessa tudo antes de a seguinte começar, e o relógio espera pela mais lenta. O pipeline parte esse caminho em **fases** separadas por registos e põe uma instrução diferente em cada fase ao mesmo tempo, como uma linha de montagem. O relógio passa a esperar só pela fase mais lenta, e o processador completa idealmente uma instrução por ciclo.

## As cinco fases

O pipeline clássico do RISC-V tem cinco fases:

1. **IF** (_fetch_): lê a instrução da memória a partir do PC e avança o PC.
2. **ID** (_decode_): descodifica e lê os dois registos fonte.
3. **EX** (_execute_): a ALU opera; calcula também o endereço e a decisão dos saltos.
4. **MEM**: lê ou escreve a memória de dados (só nas instruções de acesso).
5. **WB** (_write-back_): escreve o resultado no registo destino.

Num instante qualquer há cinco instruções em voo, cada uma na sua fase. Se cada fase demorar um ciclo, sai uma instrução por ciclo em regime permanente: o **débito** (_throughput_) ideal é 1 instrução por ciclo (CPI = 1), e a **latência** de cada instrução continua a ser 5 ciclos. Confundir débito com latência é o erro clássico: o pipeline não acelera nenhuma instrução individual, faz mais delas ao mesmo tempo.

O ganho máximo aproxima-se do número de fases, mas só se o trabalho se dividir por igual: a fase mais lenta dita o período do relógio, e qualquer desequilíbrio desperdiça-se nas outras fases.

## Hazards de dados

O problema: uma instrução precisa de um valor que a anterior ainda não escreveu. Toma este par:

```riscv
add  t0, t1, t2
sub  t3, t0, t4
```

O `sub` lê `t0` na fase ID quando o `add` ainda só vai na fase EX: o valor novo ainda não existe. Há três sabores de dependência, pelos acessos envolvidos: **RAW** (_read after write_, o caso acima, o único que limita de verdade a ordem), **WAR** e **WAW** (só importam com emissão fora de ordem, como vais ver em [superescalares](superescalar/)).

A primeira cura é o **forwarding** (ou _bypass_): atalhos que levam o resultado da saída da ALU (ou da memória) diretamente para a entrada da ALU, sem esperar pela escrita no registo. Com forwarding, o `sub` recebe `t0` acabado de calcular e só perde ciclos no caso em que o valor ainda nem foi calculado.

Esse caso é o par carga-uso (_load-use_):

```riscv
lw   t0, 0(t1)
add  t3, t0, t4
```

O `lw` só tem o dado no fim da fase MEM, mas o `add` precisava dele no início da fase EX do ciclo anterior. Nenhum atalho fabrica o valor antes de ele existir: o hardware deteta o caso, **congela** o pipeline um ciclo e injeta uma **bolha** (_bubble_, uma operação vazia que avança sem fazer nada). Custa 1 ciclo por cada par destes. O compilador ajuda evitando pôr uma instrução que use o valor logo a seguir ao load, preenchendo o intervalo com trabalho independente.

## Hazards estruturais e de controlo

O **hazard estrutural** acontece quando duas fases precisam do mesmo recurso ao mesmo tempo. O exemplo clássico: com uma só memória para instruções e dados, a fase IF de uma instrução e a fase MEM de outra colidem. A solução é mesmo estrutural: memórias separadas para instruções e dados (organização de Harvard ao nível da cache), por isso é que há caches L1 de instruções e de dados distintas.

O **hazard de controlo** nasce dos saltos: quando um salto chega à fase EX e se confirma, as instruções que entraram entretanto no pipeline vão pelo caminho errado e têm de ser descartadas (_flush_). A penalidade é o número de fases entre a leitura e a decisão. A cura mais simples é decidir mais cedo (comparar e calcular o destino logo na ID) e assumir sempre o mesmo resultado, por exemplo salto não tomado, pagando a penalidade só quando a aposta falha. A cura a sério é prever cada salto individualmente, e isso é a página seguinte.

## Quanto custa cada hazard

Em regime permanente, o CPI real é o ideal mais os stalls por instrução:

$$
\text{CPI} = 1 + \text{stalls de dados} + \text{stalls de controlo} + \text{stalls estruturais}
$$

Um exemplo. Programa com 20% de loads, dos quais um quarto é seguido de uso imediato (bolha de 1 ciclo), e 15% de saltos com penalidade média de 1 ciclo por salto:

$$
\text{CPI} = 1 + 0{,}20 \times 0{,}25 \times 1 + 0{,}15 \times 1 = 1 + 0{,}05 + 0{,}15 = 1{,}20
$$

Vê a estrutura da conta: frequência do evento vezes custo do evento, somada ao ideal. É a mesma ponderação do CPI médio da página de [desempenho](desempenho/), com os stalls no papel dos custos.

:::details[Ver a linha do tempo do par carga-uso]
Escreve os ciclos em coluna e marca cada fase. O `lw` ocupa IF–ID–EX–MEM–WB nos ciclos 1–5. O `add` entraria em IF no ciclo 2, mas o hardware congela-o: repete IF/ID no ciclo 3 (a bolha passa por EX nesse ciclo) e só avança para EX no ciclo 4, quando o dado já saiu da MEM do `lw` e o forwarding o entrega. Desenha esta tabela uma vez na vida e o mecanismo deixa de ser abstrato.
:::

## Para levar para a próxima página

O pipeline lida bem com tudo menos com a pergunta "para onde salta?". Cada salto mal apostado deita fora o trabalho das fases seguintes, e os programas estão cheios de saltos. A [predição de saltos](predicao-saltos/) mostra como adivinhar cada desvio com base no passado.
