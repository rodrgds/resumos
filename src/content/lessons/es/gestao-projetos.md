---
title: Gestão de projetos de software
description: Planeamento, estimação com pontos, velocidade, burndown e gestão clássica contra ágil.
section: conteudo
order: 3
---

Gerir um projeto é responder a três perguntas em permanência: o que falta fazer, quanto tempo vai demorar e se vamos chegar a tempo. A gestão clássica responde com um plano detalhado feito no início. A gestão ágil responde com estimativas revistas a cada sprint e um acompanhamento visual do progresso. Ambas precisam de números honestos.

## Planear e monitorizar

Planear é partir o âmbito em tarefas com dono e prazo, identificar dependências (o que bloqueia o quê) e marcar marcos verificáveis, como "início de sessão demonstrado ao dono do produto". Monitorizar é comparar o feito com o planeado em cada ponto e decidir cedo: cortar âmbito, pedir ajuda ou renegociar o prazo. A decisão tardia é a mais cara, porque já gastaste o tempo e ficaste sem margem.

O instrumento ágil de monitorização é o **burndown**: um gráfico com o trabalho restante (eixo vertical) ao longo dos dias do sprint (eixo horizontal). Uma linha ideal desce do total até zero. Se a linha real está acima da ideal, a equipa está atrasada; se está plana durante dias, algo bloqueou; se cai de repente no fim, as tarefas foram atualizadas tarde e o acompanhamento falhou durante o sprint.

## Estimar com pontos e velocidade

Estimar em horas é mentir com precisão: ninguém sabe se uma tarefa demora seis ou dez horas. As equipas ágeis estimam em **pontos de história**, uma medida relativa de esforço e incerteza. Uma história simples de referência vale 1 ou 2 pontos; outra que parece o triplo do trabalho vale o triplo dos pontos. O que interessa é a proporção, não o valor absoluto. A técnica habitual para convergir é o **planning poker**: cada membro mostra a sua estimativa em simultâneo e discutem-se as divergências, o que evita que a opinião do primeiro a falar arraste as outras.

A **velocidade** de uma equipa é a média de pontos concluídos por sprint. Com três sprints de 18, 22 e 20 pontos, a velocidade é:

$$v = \frac{18 + 22 + 20}{3} = 20 \text{ pontos por sprint}$$

Isto diz quantos pontos cabem no próximo sprint (cerca de 20) e quando termina um backlog: 100 pontos a 20 por sprint são cinco sprints. A velocidade mede-se, não decreta-se: impor "a partir de agora fazemos 30" não acelera nada, só estraga a previsão.

## Gestão clássica contra gestão ágil

|            | Gestão clássica                        | Gestão ágil                             |
| ---------- | -------------------------------------- | --------------------------------------- |
| Plano      | Detalhado no início, mudar custa       | Revisto a cada sprint, mudar é rotina   |
| Requisitos | Fixos por contrato                     | Ordenados por valor, evoluem            |
| Controlo   | Cumprir o plano inicial                | Entregar valor a cada iteração          |
| Cliente    | Vê o produto no fim                    | Vê incrementos e decide o rumo          |
| Adequada a | Requisitos estáveis, contratos rígidos | Requisitos incertos, feedback frequente |

Nenhuma vence sempre. Um contrato com âmbito fechado e preço fixo pede gestão clássica. Um produto novo, em que ninguém sabe ao certo o que os utilizadores querem, pede gestão ágil. Numa pergunta de comparação, ancora a escolha na estabilidade dos requisitos.

:::tip[Como cai isto em teste]
O exercício clássico dá-te histórias com pontos, a velocidade da equipa e um burndown, e pergunta se o sprint chega ao fim e o que cortar. O método é sempre o mesmo: soma os pontos planeados, compara com a velocidade, lê a posição da linha real e propõe cortar as histórias de menor valor primeiro.
:::

## Exercício: ler um burndown e cortar âmbito

Um sprint de dez dias planeou 40 pontos. A velocidade histórica da equipa é 36 pontos por sprint. Ao fim do dia 5, o burndown mostra 26 pontos restantes quando a linha ideal marcaria 20.

1. **Diagnóstico.** Faltam 26 pontos em 5 dias, ou seja, um ritmo de 5,2 pontos por dia, quando o ritmo necessário era 4 por dia. A equipa está atrasada cerca de 6 pontos, e a velocidade histórica (36, abaixo dos 40 planeados) já avisava que o sprint estava sobrecarregado.
2. **Decisão.** É preciso cortar cerca de 6 pontos de âmbito. Olha para o backlog do sprint ordenado por valor: supõe que contém "bloquear conta após 5 tentativas falhadas" (5 pontos) e "mostrar força da palavra passe" (3 pontos). Corta a funcionalidade de menor valor imediato e renegocia com o dono do produto: o bloqueio por tentativas protege contra ataques e fica; o medidor de força, útil mas acessório, passa para o próximo sprint.
3. **Lição.** O erro aconteceu no planeamento, ao aceitar 40 pontos com velocidade de 36. O burndown só revelou a meio o que os números já diziam no início. Registar isto na retrospetiva ("não planear acima da velocidade") vale mais do que o serão extra para tentar recuperar o sprint.

Na próxima página, [Requisitos](requisitos-uml/), vais ver como escrever as histórias e os requisitos que alimentam este planeamento.
