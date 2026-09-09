---
title: Prototipagem
description: Protótipos de baixa e alta fidelidade, em papel e em Figma, e quando usar cada um.
section: conteudo
order: 5
---

Um **protótipo** é uma versão incompleta do sistema, construída para responder a uma pergunta concreta: este fluxo faz sentido, este ecrã comunica, este botão é encontrado. Prototipar é barato; programar a solução errada é caro. A fidelidade do protótipo deve acompanhar a pergunta: quanto mais cedo, mais grosseiro.

## Baixa fidelidade: papel e esboços

Protótipos de **baixa fidelidade** são esboços em papel: retângulos por ecrãs, rabiscos por botões, post-its por menus. Servem para testar estrutura e fluxo, não aspeto. Têm duas vantagens decisivas: fazem-se em minutos, por isso geras alternativas em vez de te agarrares à primeira; e ninguém os confunde com produto acabado, por isso os comentários incidem no essencial em vez da cor do botão.

A técnica clássica é o **mágico de Oz** (_Wizard of Oz_): uma pessoa simula o sistema. O "utilizador" toca no botão de papel e tu trocas o ecrã pelo seguinte. Testas fluxos inteiros sem uma linha de código.

## Alta fidelidade: clicável e realista

Protótipos de **alta fidelidade** parecem e comportam-se quase como o produto: ecrãs desenhados em ferramentas como o Figma, com navegação clicável, texto real e dados plausíveis. Servem para testar detalhe (rótulos, hierarquia, microinterações) e para apresentar a decididores. O risco é inverter a ordem: polir cedo demais prende a equipa ao desenho atual e inibe críticas.

Regra prática: baixa fidelidade para divergir (muitas ideias, fluxos alternativos), alta fidelidade para convergir (afinar a solução escolhida). Nunca testes usabilidade geral num protótipo de alta fidelidade sem teres testado o fluxo em papel primeiro.

## O que um bom protótipo cobre

Limita o âmbito à pergunta. Para testar "o utilizador encontra a sala livre", bastam três ecrãs: propor horas, ver sugestões, confirmar. Tudo o resto pode ser estático ou inexistente. Define também o que acontece fora do caminho feliz: se o utilizador tocar onde não há nada, o facilitador diz "essa parte ainda não está pronta" e regista o desvio, porque tocar fora do guião é um dado, não uma falha do teste.

## Exemplo: fluxo de três ecrãs em papel

Para a app de estudo em grupo, desenha em três folhas: (1) lista do grupo com botão "Nova sessão"; (2) dois blocos sugeridos com sala ("Qua 14:00, B207" e "Qui 10:00, B112"); (3) confirmação com resumo e botão "Notificar grupo".

Pede a um colega que combine uma sessão para quarta sem lhe explicares nada. Tu és o computador: quando ele toca em "Nova sessão", pões a folha 2 à frente; quando escolhe um bloco, mostras a 3. Observa e anota: hesitou entre os blocos porquê, procurou um botão de voltar atrás, percebeu que a notificação é automática. Se ele tocar fora das zonas ativas, não corrijas; pergunta no fim o que esperava encontrar ali.

:::tip[O que registar em cada sessão]
Para cada tarefa anota: concluiu sem ajuda, com ajuda ou desistiu; tempo aproximado; número e tipo de erros; citações literais de confusão ("pensei que isto apagava"). Estes são os dados brutos que vais transformar em correções na [avaliação de usabilidade](avaliacao-usabilidade/).
:::

## Para levar para a próxima página

Protótipos respondem a perguntas, do papel ao clicável, e cada sessão gera dados. Falta o método para transformar observações em decisões: planear tarefas, medir e iterar. É a [avaliação de usabilidade](avaliacao-usabilidade/).
