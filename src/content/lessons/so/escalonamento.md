---
title: Escalonamento de processos
description: Critérios de escalonamento e contas de espera e retorno em FCFS e Round Robin.
section: conteudo
order: 4
---

Há quase sempre mais processos prontos do que processadores. O **escalonador** é a parte do núcleo que escolhe, de cada vez, qual corre a seguir e por quanto tempo. As políticas diferem no compromisso entre simplicidade, justiça e tempo de resposta, e os testes pedem-te contas concretas sobre elas.

## O que se mede

Para cada processo, com instante de chegada $C$ e duração $D$, medem-se dois tempos a partir do instante em que termina, $F$:

- **retorno** (_turnaround_): $F - C$, quanto tempo o processo demorou desde que chegou até estar feito.
- **espera**: retorno menos duração, $(F - C) - D$, quanto desse tempo foi passado à espera em vez de a correr.

As médias destes dois valores sobre todos os processos comparam políticas. Uma boa política mantém os dois baixos, mas nenhuma vence em tudo: favorecer processos curtos prejudica os longos, e responder depressa custa trocas de contexto frequentes.

## FCFS: por ordem de chegada

O **FCFS** (_first come, first served_) corre cada processo até ao fim por ordem de chegada, sem interrupções. É simples e justo no sentido da fila do supermercado, mas sofre do **efeito de comboio**: um processo longo à frente prende todos os curtos atrás dele.

Toma quatro processos que chegam no instante 0 com durações P1 = 6, P2 = 3, P3 = 2, P4 = 4. Em FCFS correm P1, P2, P3, P4. Os instantes de fim são 6, 9, 11 e 15. Os retornos são 6, 9, 11 e 15 (chegaram todos em 0), e as esperas são $6 - 6 = 0$, $9 - 3 = 6$, $11 - 2 = 9$ e $15 - 4 = 11$. Espera média: $(0 + 6 + 9 + 11) / 4 = 6{,}5$. Repara como o P1, que não esperou nada, fez os outros três esperar no total 26 unidades.

## Round Robin: fatias para todos

O **Round Robin** dá a cada processo uma **fatia** (_quantum_) de cada vez, pela ordem, e quem não acabar volta ao fim da fila. Com quantum 3 nos mesmos quatro processos:

- P1 corre 0 a 3 (faltam 3), P2 corre 3 a 6 (termina), P3 corre 6 a 8 (termina), P4 corre 8 a 11 (falta 1), P1 corre 11 a 14 (termina), P4 corre 14 a 15 (termina).

Os fins são P1 = 14, P2 = 6, P3 = 8, P4 = 15. As esperas: P1 $14 - 6 = 8$, P2 $6 - 3 = 3$, P3 $8 - 2 = 6$, P4 $15 - 4 = 11$. Espera média: $(8 + 3 + 6 + 11) / 4 = 7$. Aqui o Round Robin até perde para o FCFS na média, porque o quantum divide o trabalho sem encurtar a fila. A vantagem dele está noutro lado: o P2, o P3 e o P4 começam todos a correr cedo, por isso o **tempo de resposta** (até à primeira fatia) é muito melhor, o que interessa quando há um utilizador à espera do terminal.

:::tip[Como resolver estes exercícios]
Desenha a linha do tempo com os intervalos de cada processo antes de calcular o que quer que seja. Marca chegadas, fins e, no Round Robin, o que falta a cada um depois de cada fatia. Só depois aplica $F - C$ e subtrai $D$. A maioria dos erros nasce de calcular esperas de cabeça sem a linha do tempo.
:::

## SJF e o dilema

O **SJF** (_shortest job first_) corre primeiro o processo pronto mais curto. Nos mesmos dados (todos chegam em 0), a ordem é P3, P2, P4, P1, com fins 2, 5, 9, 15 e esperas 0, 2, 5, 9. Média: 4, a melhor das três. O problema é duplo: o núcleo não sabe a duração antes de correr, e um fluxo contínuo de processos curtos deixa os longos à espera para sempre (**inanição**). É por isso que os sistemas reais usam prioridades com envelhecimento e fatias, misturando as três ideias em vez de escolher uma.

## Para levar para a próxima página

O escalonador decide quem corre, mas os processos também precisam de falar uns com os outros sem partilhar memória. Isso resolve-se com a [comunicação entre processos](comunicacao-processos/).
