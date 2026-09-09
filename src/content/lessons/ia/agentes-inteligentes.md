---
title: Agentes inteligentes
description: A definição de agente, as propriedades dos ambientes e as arquiteturas reativa, baseada em objetivos e baseada em utilidade.
section: conteudo
order: 1
---

Um **agente inteligente** é um programa que percebe o ambiente através de sensores e age sobre ele através de atuadores. Um aspirador robot percebe se há sujidade e onde está, e age movendo-se e aspirando. Um recomendador de vídeos percebe o teu histórico e age sugerindo o próximo vídeo. A definição é deliberadamente larga: quase todos os programas desta cadeira são agentes, e o que muda entre eles é como decidem a próxima ação.

## Perceções, ações e a função do agente

Num instante, o agente recebe uma **perceção** (o que os sensores dizem agora) e escolhe uma **ação**. A **função do agente** mapeia sequências de perceções em ações: dado tudo o que o agente já viu, o que deve fazer agora? O aspirador de duas salas do exemplo desta página tem perceções da forma (sala, sujidade), como (A, sujo), e ações como `Esquerda`, `Direita`, `Aspirar` e `Nada`.

Repara que a função usa a sequência inteira, não só a perceção atual. Um agente que só olha para o agora não sabe onde já esteve. A diferença entre arquiteturas, na próxima secção, está em quanta história guardam e como a usam.

## Propriedades dos ambientes

Antes de escolher a arquitetura, caracteriza o ambiente, porque é ele que dita a dificuldade:

- **Observável ou parcialmente observável**: o aspirador vê a sala atual, mas não a outra. Perceção incompleta exige memória.
- **Determinístico ou estocástico**: aspirar sujidade limpa sempre (determinístico); atirar um dado ou prever o trânsito tem incerteza.
- **Estático ou dinâmico**: o pó não se mexe sozinho enquanto o robot pensa; um jogo de condução muda em tempo real.
- **Discreto ou contínuo**: duas salas e quatro ações são discretos; ângulos de direção e velocidades são contínuos.
- **Episódico ou sequencial**: classificar emails decide cada um isoladamente; conduzir encadeia decisões, e cada ação condiciona as seguintes.

Aspirar duas salas é discreto, estático na prática, sequencial e parcialmente observável. É o ambiente mínimo onde a memória já paga.

## Três arquiteturas

O agente **reativo** (ou reflexo simples) decide só com a perceção atual, por regras condição-ação. Para o aspirador:

| Perceção      | Ação      |
| ------------- | --------- |
| (A, sujo)     | `Aspirar` |
| (A, limpo)    | `Direita` |
| (B, sujo)     | `Aspirar` |
| (B, limpo)    | `Esquerda` |

Isto limpa as duas salas se começarem sujas, e é baratíssimo. Mas repara na fraqueza: depois de limpar A e ir para B, se B já estava limpo, o agente volta para A, encontra-a limpa, volta para B, e vagueia para sempre sem saber que o trabalho acabou. Sem memória, não há noção de progresso.

O agente **baseado em objetivos** guarda estado (o que já viu e fez) e um objetivo (as duas salas limpas). Planeia sequências de ações que atingem o objetivo e para quando chega lá. Resolve o vaguear do reativo, mas paga pesquisa: encontrar a sequência é o tema das páginas de [pesquisa não informada](pesquisa-nao-informada/) e [pesquisa heurística](pesquisa-heuristica/).

O agente **baseado em utilidade** vai além do objetivo binário e mede qualidade: limpar em 4 ações é melhor que em 40, e gastar pouca bateria é melhor que gastar muita. A **função de utilidade** dá um número a cada estado, e o agente maximiza-o. Isto permite compromissos, como aceitar uma sala 95 por cento limpa para poupar metade da bateria. É a arquitetura dos jogos, da otimização e da decisão sob incerteza no resto da cadeira.

:::tip[Como escolher em teste]
Descreve o ambiente com as cinco propriedades e depois justifica a arquitetura pela mais restritiva. Parcialmente observável pede memória, por isso exclui o reativo puro. Objetivo claro com custo de ações pede pesquisa. Compromissos entre qualidade e custo pedem utilidade.
:::

## Exemplo: a tabela decide, o objetivo termina

Segue o reativo da tabela a partir de (A, sujo, B sujo). Em A sujo aspira; perceção (A, limpo), vai para B; B sujo, aspira; (B, limpo), volta a A; (A, limpo), vai a B. Quatro ações úteis e depois vagueio eterno entre salas limpas, porque nenhuma regra reconhece "trabalho feito".

O baseado em objetivos com estado inicial (A, ambas sujas) e objetivo "A limpa e B limpa" gera a sequência `Aspirar, Direita, Aspirar` e termina. Três ações e paragem. A diferença de custo entre as arquiteturas, neste caso mínima, é exatamente o que a pesquisa e a utilidade quantificam nas próximas páginas.
