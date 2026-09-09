---
title: Tolerância a falhas
description: Eleição de líder, two-phase commit e primary-backup, com uma eleição em anel resolvida passo a passo.
section: conteudo
order: 7
---

Num sistema distribuído, máquinas falham enquanto as outras continuam. A tolerância a falhas é o conjunto de protocolos que mantém o serviço correto apesar disso. Esta página cobre os três que a ficha exige, com garantias de cada um.

## Eleição de líder

Muitos sistemas precisam de exatamente um coordenador. Quando o líder falha, os sobreviventes elegem outro. No algoritmo de **anel** (Chang-Roberts), os processos formam um anel lógico e cada um conhece só o seu sucessor. Quem deteta a falha envia uma mensagem de eleição com o seu identificador. Cada processo reencaminha o maior identificador que já viu e descarta os menores. Quando um processo recebe o seu próprio identificador de volta, sabe que é o maior do anel e anuncia-se coordenador.

## Exemplo completo

Quatro processos com identificadores 2, 5, 7 e 9 em anel, pela ordem 2, 5, 7, 9. O líder 9 falha e o processo 5 deteta primeiro.

1. O 5 envia `eleição(5)` ao seu sucessor, o 7.
2. O 7 compara, 5 é menor que 7, por isso substitui e envia `eleição(7)` ao 2.
3. O 2 compara, 7 é maior que 2, reencaminha `eleição(7)` ao 5.
4. O 5 compara, 7 é maior que 5, reencaminha `eleição(7)` ao 7.
5. O 7 recebe o seu próprio identificador. É o maior, declara-se líder e envia `coordenador(7)` a dar a volta ao anel.

Total de mensagens de eleição: 4, uma por processo, mais 3 de anúncio. Se o 2 tivesse detetado a falha primeiro, teria enviado `eleição(2)`, que o 5 substituiria por 5 e o 7 por 7, com o mesmo vencedor. O invariante é esse, o maior identificador sobrevivente dá sempre a volta completa e vence.

## Two-phase commit e primary-backup

O **two-phase commit** (2PC) garante que uma transação distribuída ou acontece em todos os participantes ou em nenhum. O coordenador pergunta a todos se podem confirmar (fase 1) e só envia a ordem de confirmação se todos disserem sim (fase 2). A garantia, atomicidade total, paga-se com bloqueio, se o coordenador falha a meio, os participantes ficam presos à espera.

O **primary-backup** (primário apoio) replica um serviço com um primário que executa e um apoio que observa. O primário envia atualizações de estado ao apoio. Se o primário falha, o apoio assume depois de uma eleição. A garantia é continuidade do serviço, não atomicidade fina como o 2PC, e o custo é o atraso de replicar cada atualização antes de responder ao cliente.

:::details[Ver a comparação para responder em teste]
Eleição responde a "quem manda agora". 2PC responde a "todos ou nenhum". Primary-backup responde a "o serviço continua". Se o enunciado fala de transação em várias bases de dados, é 2PC. Se fala de um servidor que cai e outro que assume, é primary-backup precedido de eleição.
:::
