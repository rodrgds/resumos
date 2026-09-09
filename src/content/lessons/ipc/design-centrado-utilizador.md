---
title: Design centrado no utilizador
description: Necessidades, requisitos, personas, cenários e ideação antes do primeiro ecrã.
section: conteudo
order: 4
---

O **design centrado no utilizador** (UCD, do inglês _user-centered design_) é um processo iterativo: estudar quem usa, definir o que o sistema deve fazer por essas pessoas, gerar ideias, prototipar, avaliar com utilizadores e repetir. A ordem importa. Equipas que saltam para os ecrãs desenham soluções à procura de problemas; equipas que estudam primeiro descartam más ideias no papel, onde são baratas.

## Necessidades antes de requisitos

Uma **necessidade** é um objetivo da pessoa no mundo real: "organizar sessões de estudo em grupo sem dez mensagens para combinar hora e sala". Um **requisito** traduz isso para o sistema, e deve ser testável: "o sistema propõe três salas livres comuns aos horários do grupo". Repara na diferença: a necessidade fala de pessoas, o requisito fala do sistema e inclui um critério de verificação.

Levantas necessidades com observação e conversa: observar pessoas a fazer a tarefa hoje, entrevistar sobre dificuldades, notar atalhos e improvisos. Cada improviso (uma folha de cálculo paralela, um grupo de mensagens só para combinar salas) é uma necessidade não servida.

## Personas e cenários

Uma **persona** é um utilizador fictício mas concreto, construído a partir da pesquisa: nome, contexto, objetivos, frustrações, nível técnico. "Mariana, 20 anos, segundo ano, organiza o grupo de estudo da turma, perde-se em grupos de mensagens" decide melhor do que "o utilizador jovem". A persona errada é a inventada sem pesquisa; a certa resume padrões que observaste em várias pessoas.

Um **cenário de uso** conta uma história curta: a Mariana abre a app na segunda de manhã, propõe duas horas, o sistema mostra as salas livres comuns, ela confirma e o grupo recebe o plano. Sem ecrãs, sem botões. O cenário fixa o essencial (atores, contexto, objetivo) e deixa o desenho livre para depois.

## Ideação: quantidade antes de qualidade

Com requisitos e cenários na mesa, gera muitas ideias depressa: esboços de dez minutos, variações do mesmo fluxo, soluções absurdas incluídas. Só depois converge, combinando e cortando. A armadilha clássica é apaixonar pela primeira ideia; a cura é exigir cinco alternativas antes de escolher.

## Exemplo: app de estudo em grupo

Persona: Mariana, 20 anos, LEIC, organiza o grupo de seis colegas. Quer combinar sessões semanais, perde meia hora por semana em mensagens cruzadas, usa o telemóvel entre aulas.

Cenário: na segunda às 9h, a Mariana propõe a sessão de quarta. A app cruza os horários que cada membro partilhou, sugere dois blocos com sala livre perto das aulas deles, ela escolhe um, e todos recebem confirmação com sala e hora.

Três requisitos testáveis:

1. Perante os horários de seis membros, o sistema apresenta pelo menos dois blocos comuns de 90 minutos com sala livre, em menos de 5 segundos.
2. Cada membro confirma ou recusa com um toque, sem criar conta nova.
3. Qualquer alteração de sala ou hora notifica o grupo em menos de 1 minuto.

Repara que cada requisito tem condição, ação e medida. "Ser fácil de usar" não é requisito; "confirmar com um toque" é.

:::details[De requisito a teste]
Cada requisito testável vira uma tarefa de avaliação: "combina uma sessão para quarta com os teus cinco colegas". Na página de [avaliação de usabilidade](avaliacao-usabilidade/) vais medir se três participantes concluem essa tarefa sem ajuda. Se os requisitos foram bem escritos, o plano de testes já está meio feito.
:::

## Para levar para a próxima página

Necessidades, personas, cenários e requisitos dizem o que construir. Falta mostrar: transformar ideias em algo que se possa ver, tocar e testar. Isso é a [prototipagem](prototipagem/).
