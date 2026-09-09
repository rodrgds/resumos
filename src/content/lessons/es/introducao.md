---
title: Introdução à engenharia de software
description: Desafios do software em larga escala, âmbito da disciplina e notas breves de história.
section: conteudo
order: 1
---

Um programa que escreves sozinho para resolver um exercício tem um utilizador (tu), requisitos na tua cabeça e um prazo flexível. Um produto com dez programadores, milhares de utilizadores e requisitos que mudam a meio é um problema diferente, não um programa maior. A engenharia de software é a disciplina que estuda como construir esse produto sem que o projeto descambe.

## Os desafios da escala

Quando várias pessoas mexem no mesmo código, aparecem problemas que não existem no trabalho individual:

- **Comunicação.** Ninguém consegue guardar o sistema todo na cabeça. Sem documentação e interfaces claras, cada programador adivinha o que os outros assumiram.
- **Mudança de requisitos.** O cliente percebe melhor o que quer depois de ver uma primeira versão. Mudar um requisito a meio custa pouco se o desenho for modular e muito se o código for uma manta de retalhos.
- **Defeitos caros.** Um erro apanhado na fase de requisitos corrige-se com uma frase. O mesmo erro encontrado depois do lançamento corrige-se com testes, nova versão e utilizadores zangados. O custo do defeito cresce com a fase em que é descoberto.
- **Evolução.** A maior parte do custo de um produto está depois da primeira entrega: corrigir, adaptar e melhorar. Software que não se consegue alterar é software condenado.

Repara que nenhum destes desafios é "escrever código mais depressa". A disciplina trata de organização, comunicação e decisões que aguentam a mudança.

## Âmbito da disciplina

A engenharia de software cobre o ciclo de vida inteiro: perceber o que construir (requisitos), decidir a estrutura (arquitetura), escrever e integrar o código (construção), confirmar que funciona (verificação e validação) e mantê-lo vivo (evolução). Para cada fase há processos, técnicas e artefactos, que são as páginas desta cadeira.

Isto distingue a disciplina de programar: programar é uma atividade dentro da construção. Um bom programador sem processo entrega código que ninguém consegue testar nem manter. Um bom processo sem programadores capazes não entrega nada. A cadeira pede-te as duas coisas, com ênfase na parte que ainda não treinaste: o trabalho em equipa sobre um produto.

## Notas breves de história

A expressão "engenharia de software" nasceu numa conferência da NATO em 1968. Os projetos da época, sobretudo grandes sistemas militares e empresariais, atrasavam-se anos e estouravam orçamentos: a chamada crise do software. A resposta inicial foi importar da engenharia tradicional a ideia de planear tudo antes de construir, que deu origem aos processos pesados e em cascata.

Décadas depois, a experiência mostrou que requisitos mudam sempre e que planos rígidos partem. Em 2001, um grupo de praticantes escreveu o Manifesto Ágil, que valoriza indivíduos e interações, software a funcionar, colaboração com o cliente e resposta à mudança. Os processos modernos que vais estudar, como o Scrum e o XP, nascem daqui. Guarda a intuição: planear continua a ser preciso, mas o plano tem de sobreviver ao contacto com a realidade.

:::tip[Como cai isto em teste]
Perguntas de introdução pedem quase sempre comparações: programa individual contra produto em equipa, ou processo em cascata contra processo ágil. Responde com consequências concretas (comunicação, custo da mudança, altura em que o cliente vê algo a funcionar) em vez de slogans.
:::

## Exercício: o que falha quando o requisito muda

Imagina um programa individual teu, por exemplo um conversor de moedas com a taxa escrita no código, e compara com um produto em equipa, por exemplo a app de uma loja com dez programadores.

1. Enumera o que precisas de mudar no teu programa se a taxa passar a vir da internet: provavelmente uma função e pouco mais.
2. Agora imagina que, a meio do projeto da loja, o cliente decide que os preços passam a incluir portes dinâmicos por região. Lista o que falha: quem sabia da fórmula antiga, que testes assumiam os valores, que ecrãs mostram totais, quem avisa a equipa de pagamentos.
3. Conclui: no programa individual o custo da mudança é reescrever código; no produto é descobrir tudo o que assumiu o requisito antigo. A engenharia de software existe para que essa descoberta seja barata: requisitos escritos, testes que acusam e módulos com fronteiras claras.

Na próxima página, [Processos de software](processos-software/), vais ver as formas organizadas de conduzir esse trabalho em equipa.
