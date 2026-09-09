---
title: Algoritmos gulosos
description: Escolha local com prova de otimalidade, o contraexemplo que a destrói e a mochila fracionária.
section: conteudo
order: 3
---

Um algoritmo guloso decide passo a passo, escolhendo sempre a opção que parece melhor agora, sem nunca voltar atrás. Quando a escolha local é segura, o algoritmo é simples, rápido e ótimo. Quando não é, ele falha em silêncio e devolve uma resposta errada com ar confiante. A matéria desta página é saber distinguir os dois casos e prová-lo.

## A estrutura do argumento

Um guloso correto precisa de duas peças. A **escolha gulosa**: existe sempre uma solução ótima que começa com a nossa escolha local. E a **subestrutura ótima**: depois de fixar essa escolha, o resto do problema é uma instância menor do mesmo problema. Se provares as duas por indução, o algoritmo está correto. Se alguma falhar, há um contraexemplo à espera, e encontrá-lo faz parte do trabalho.

## Exemplo que funciona: trocos canónicos

Com moedas de 1, 2, 5, 10, 20 e 50 cêntimos, para dar 87 cêntimos o guloso escolhe sempre a maior moeda que cabe: 50, depois 20 (restam 17), depois 10 (restam 7), depois 5 (restam 2), depois 2. Total: **5 moedas**. Aqui a escolha é segura porque cada moeda é múltiplo útil das anteriores: nunca compensa trocar uma moeda grande por pequenas. A prova formal usa troca de argumentos, mas a intuição é esta regularidade do sistema.

## Exemplo que parte: o contraexemplo

Tira a moeda de 1 e considera o sistema com moedas de 3 e 4 para pagar 6. O guloso escolhe 4 (a maior que cabe) e ficam a faltar 2, que nenhuma moeda completa: ele declara falência. Mas **3 + 3 = 6** resolve com duas moedas. A escolha local destruiu a única solução. Sempre que desconfiares de um guloso, procura o caso pequeno onde a primeira decisão fecha a porta ao ótimo: é esse contraexemplo que deves apresentar no teste em vez de uma justificação vaga.

## Exemplo com critério: mochila fracionária

Na mochila fracionária podes levar frações de objetos, e aí o guloso pela **razão valor por peso** é ótimo. Capacidade 5, objetos A (peso 4, valor 6, razão 1,5), B (peso 3, valor 5, razão 1,67) e C (peso 2, valor 4, razão 2,0). Por ordem de razão: leva C inteiro (peso 2, sobram 3), leva B inteiro (peso 3, sobram 0). Valor total: **9**, com a mochila exatamente cheia. Confirma que nada bate isto: qualquer fração de A no lugar de B ou C troca razão 1,67 ou 2,0 por 1,5 e baixa o total. Repara no contraste com a [mochila 0-1 da força bruta](/cadeiras/da/forca-bruta/): sem frações, a razão engana e o ótimo AD não é o que o guloso escolheria primeiro. A fração é a condição que torna o guloso seguro aqui.

:::warning[O erro clássico]
Apresentar um guloso sem discutir a escolha. "Escolho o mais barato em cada passo" não é uma prova. Mostra a escolha, mostra por que existe um ótimo que a contém (ou o contraexemplo que prova que não há) e só depois analisa o custo.
:::
