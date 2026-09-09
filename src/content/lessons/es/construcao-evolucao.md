---
title: Construção e evolução de software
description: Git e gestão de versões, integração contínua, práticas XP e tipos de manutenção.
section: conteudo
order: 6
---

A construção é a atividade de transformar desenho em código a funcionar, todos os dias, sem que o trabalho de uns parta o dos outros. A evolução é o que acontece depois da entrega: corrigir, adaptar e melhorar durante anos. As duas partilham as mesmas ferramentas, porque ambas mexem em código partilhado que tem de continuar a funcionar.

## Git e gestão de versões

A **gestão de versões** guarda o histórico do código: quem mudou o quê, quando e porquê. Com Git, cada programador trabalha na sua cópia e propõe mudanças ao ramo principal através de um **pull request**, que é um pedido de revisão com discussão e testes associados. O fluxo habitual numa equipa:

1. Cria um ramo a partir do principal com um nome que diz a intenção (`sessao-bloqueio-conta`).
2. Faz commits pequenos e frequentes, cada um com uma mensagem que explica o porquê.
3. Abre o pull request. A **integração contínua** (já a seguir) corre os testes automaticamente.
4. Um colega revê o código e aprova. Só então o ramo junta-se ao principal.

Repara no que este ritual compra: nenhuma mudança entra sem revisão humana nem sem testes automáticos verdes. É caro em disciplina e barato em defeitos escapados.

## Integração contínua

A **integração contínua** (CI) é um servidor que, a cada mudança proposta, compila o código e corre a bateria de testes, acusando em minutos se algo partiu. Sem CI, cada um integra "no fim" e o fim é uma semana de resolver conflitos. Com CI, integrar várias vezes por dia é rotina porque cada integração é pequena e verificada.

Para isto funcionar, a bateria tem de ser rápida e fiável: testes lentos ou que falham ao acaso ensinam a equipa a ignorar o CI, e um CI ignorado é decoração. Mantém os testes rápidos na CI e deixa os testes longos (sistema, aceitação completa) para corridas noturnas ou para antes da entrega.

## Práticas XP na construção

Várias práticas do XP vivem nesta fase: **propriedade coletiva** (qualquer membro pode melhorar qualquer parte do código, o que evita feudos), **pequenas entregas** (cada mudança vai para o principal assim que está pronta e testada), **refatoração** (melhorar o desenho interno sem mudar o comportamento observável) e **ritmo sustentável** (semanas de 60 horas produzem defeitos que apagam o ganho). Estas práticas não são regras da cadeira nem de nenhuma empresa em particular: são hábitos que reduzem o custo da mudança, e vais reconhecê-los nos projetos onde trabalhares.

## Evolução e tipos de manutenção

Depois de entregue, o software muda por três motivos, e cada pedido de mudança cai num tipo:

- **Corretiva.** Corrigir defeitos: o início de sessão falha com emails que têm um sinal de adição.
- **Adaptativa.** Adaptar a ambiente novo: a app passa a correr numa versão nova do sistema operativo.
- **Perfeita** (ou perfectiva). Melhorar o que já funciona: acrescentar início de sessão com conta externa a pedido dos utilizadores.

Classificar importa porque cada tipo tem risco e prioridade diferentes: a corretiva bloqueia utilizadores e passa à frente, a perfeita discute-se contra funcionalidade nova. A maior parte do custo total de um produto está aqui, na evolução, não na primeira escrita.

:::tip[Defeitos reproduzíveis]
Um bom registo de defeito inclui dados concretos para o reproduzir, como um email e passos exatos. Para treinar leitura de ficheiros e asserções que ajudam a prender esses dados em testes, revê [ficheiros e exceções](/cadeiras/fp/ficheiros-excecoes/).
:::

## Exercício: fluxo de branch e classificação

A equipa vai implementar o bloqueio de conta após 5 tentativas falhadas:

1. **Descreve o fluxo.** A Ana cria o ramo `sessao-bloqueio-conta` a partir do principal. Faz commits pequenos (contador de tentativas, bloqueio, mensagem de erro). Abre o pull request. A CI compila e corre os testes, incluindo os novos testes do bloqueio. O Bruno revê, pede para extrair uma constante para o limite de 5, a Ana corrige, a CI volta a passar e o ramo junta-se ao principal. Conta o que cada passo impediu: a CI impediu código que não compila de entrar; a revisão impediu um número mágico enterrado no código.
2. **Classifica três pedidos.** "O bloqueio não dispara se as tentativas forem espaçadas" é corretiva (comportamento errado). "Suportar o novo sistema de notificações do telemóvel" é adaptativa (ambiente novo). "Lembrar o dispositivo para não pedir código sempre" é perfeita (melhoria pedida). Ordena por prioridade: corretiva primeiro, depois a adaptativa se o ambiente novo for obrigatório, e a perfeita discute-se no próximo planeamento.
3. **Conclui.** Repara que o fluxo de branch com CI é o mesmo na construção e na evolução: só muda o motivo da mudança. É por isso que investir nestas ferramentas no início do projeto paga juros durante anos.

Na próxima e última página técnica, [Verificação e validação](verificacao-validacao/), vais ver os testes que a CI corre e os que ficam para o fim de cada incremento.
