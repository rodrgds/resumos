---
title: Processos de software
description: Atividades do processo e modelos RUP, XP e Scrum, com um sprint de exemplo.
section: conteudo
order: 2
---

Um **processo de software** é um conjunto organizado de atividades, papéis e artefactos que leva uma equipa da ideia ao produto e à sua evolução. Sem processo, cada membro trabalha à sua maneira e ninguém sabe o que está pronto. Com processo, todos sabem o que fazer a seguir e como se decide que algo está feito.

## As atividades de todos os processos

Qualquer processo, por mais ágil ou pesado, contém estas atividades, misturadas de formas diferentes:

- **Especificação.** Descobrir e registar o que o software deve fazer (requisitos).
- **Desenho e implementação.** Decidir a estrutura e escrever o código.
- **Validação.** Confirmar que o software faz o que deve e que é o produto certo.
- **Evolução.** Adaptar o software a requisitos e ambientes novos.

A diferença entre modelos não está nas atividades, que são sempre estas, mas na ordem, na frequência e no peso da documentação. Quando comparares modelos, compara por aí.

## RUP: iterativo e guiado pela arquitetura

O RUP (Rational Unified Process) organiza o projeto em quatro fases, cada uma com iterações: **conceção** (perceber o problema e o âmbito), **elaboração** (fixar a arquitetura e atacar os maiores riscos), **construção** (desenvolver o produto) e **transição** (entregar e formar utilizadores). É iterativo, cada fase produz executáveis cada vez mais completos, mas continua a ser um processo com muitos papéis e artefactos formais.

Usa o RUP como referência de processo planificado e iterativo: bom para projetos grandes com requisitos relativamente estáveis e riscos técnicos sérios, pesado para equipas pequenas com requisitos a mudar depressa.

## XP: disciplina técnica em equipa pequena

O XP (Extreme Programming) leva boas práticas ao extremo em equipas pequenas e coesas. As práticas centrais são: **programação em par** (dois programadores, um teclado), **desenvolvimento guiado por testes** (escrever o teste antes do código), **refatoração** contínua (melhorar o desenho sem mudar o comportamento), **integração contínua** (juntar o trabalho de todos várias vezes por dia) e **pequenas entregas** frequentes.

Repara na lógica: cada prática reduz o custo da mudança. Testes escritos primeiro apanham regressões, a integração diária evita divergências grandes e as entregas curtas dão feedback real do cliente. O XP é exigente com disciplina, e é por isso que várias das suas práticas aparecem noutros processos.

## Scrum: gerir o trabalho por sprints

O Scrum organiza o trabalho em **sprints**, iterações de duração fixa (tipicamente duas semanas) que terminam sempre com um incremento utilizável do produto. Os papéis são três: o **dono do produto** (decide o que tem valor e ordena a lista de trabalho), a **equipa de desenvolvimento** (decide quanto consegue fazer) e o **facilitador** (remove obstáculos e protege o processo).

A lista de trabalho (**product backlog**) contém histórias de utilizador ordenadas por valor. No **planeamento do sprint** a equipa escolhe o que cabe no sprint (**sprint backlog**). Há uma **reunião diária** curta para sincronizar (o que fiz, o que vou fazer, o que me bloqueia). No fim, a **revisão** mostra o incremento ao dono do produto e a **retrospetiva** melhora o processo da equipa.

:::warning[Confusões frequentes]
Scrum não é ausência de planeamento: planeia-se em cada sprint e revê-se no fim. E as reuniões diárias não são para reportar ao chefe: são para a equipa se sincronizar. Se numa pergunta trocares os papéis (o dono do produto a decidir quanto cabe no sprint, por exemplo), a resposta está errada.
:::

## Exercício: distribuir um sprint de duas semanas

A equipa vai implementar o início de sessão da app num sprint de duas semanas (dez dias úteis). Distribui as atividades:

1. **Dias 1 a 2, especificação e desenho.** Escrever as histórias (iniciar sessão com email e palavra passe, recuperar palavra passe, bloquear após tentativas falhadas), desenhar os casos de uso e decidir as classes. Critério de saída: o dono do produto aceita as histórias e os critérios de aceitação.
2. **Dias 3 a 7, implementação.** Programar em pares as histórias por ordem de valor, com testes escritos antes do código e integração diária. Critério de saída: código revisto e integrado.
3. **Dias 8 a 9, validação.** Testes de integração e de sistema sobre o incremento, mais revisão com o dono do produto. Critério de saída: incremento utilizável demonstrado.
4. **Dia 10, revisão e retrospetiva.** Mostrar o início de sessão a funcionar, recolher feedback (por exemplo, pedir início com conta externa) e registar uma melhoria de processo para o próximo sprint.

Repara que a evolução já está prevista: o feedback da revisão entra no backlog do sprint seguinte. É isto que distingue um processo iterativo de um plano em cascata: no fim de cada sprint há produto a funcionar e uma decisão informada sobre o que fazer a seguir.

Na próxima página, [Gestão de projetos](gestao-projetos/), vais ver como estimar quanto cabe num sprint e como perceber a meio se o plano está a cumprir-se.
