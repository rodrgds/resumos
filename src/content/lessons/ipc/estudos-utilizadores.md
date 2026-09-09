---
title: Estudos com utilizadores
description: Recrutamento, questionários e entrevistas, e o cálculo do SUS com exemplo.
section: conteudo
order: 7
---

Os testes de usabilidade mostram o que acontece; os **estudos com utilizadores** explicam porquê e quanto. Servem para levantar necessidades no início (entrevistas, observação), medir satisfação no fim (questionários) e comparar alternativas (estudos controlados simples). O método tem três partes: recrutar bem, perguntar bem e analisar com honestidade.

## Recrutar e conduzir

Recruta quem corresponde às personas, com variedade relevante (novatos e experientes, por exemplo). Cinco a oito participantes chegam para entrevistas; questionários pedem dezenas para os números estabilizarem. Pede sempre consentimento informado: explica o objetivo, que os dados são anónimos e que podem desistir a qualquer momento. Sem isto, nada do resto é utilizável.

Em entrevistas, pergunta aberto e concreto: "conta-me a última vez que combinaste uma sessão de estudo" rende mais do que "achas a app útil". Ouve mais do que falas; o silêncio depois de uma resposta curta costuma trazer o detalhe que interessa. Em questionários, cada pergunta mede uma coisa, sem duplas ("a app é rápida e bonita" não se responde) e sem conduzir ("não achas a app ótima").

## O SUS: medir satisfação em dez perguntas

O **SUS** (_System Usability Scale_) é o questionário padrão para uma pontuação única de usabilidade. Tem dez afirmações em escala de 1 (discordo totalmente) a 5 (concordo totalmente), alternando tom positivo (ímpares) e negativo (pares):

1. Gostaria de usar isto com frequência.
2. Achei o sistema desnecessariamente complexo.
3. Achei o sistema fácil de usar.
4. Precisaria de ajuda técnica para usar isto.
5. As funções estão bem integradas.
6. Há demasiada inconsistência.
7. A maioria aprende depressa.
8. Achei o sistema incómodo de usar.
9. Senti-me confiante a usar.
10. Precisei de aprender muito antes de usar.

O cálculo: ímpares valem resposta menos 1, pares valem 5 menos a resposta, soma-se tudo e multiplica-se por 2,5. O resultado vai de 0 a 100. A referência prática é 68: acima disso, acima da média.

## Exemplo: calcular um SUS

Uma resposta à app de estudo em grupo: $[4, 2, 5, 1, 4, 2, 5, 1, 3, 2]$.

Ímpares (menos 1): $(4-1) + (5-1) + (4-1) + (5-1) + (3-1) = 3 + 4 + 3 + 4 + 2 = 16$. Pares (5 menos a resposta): $(5-2) + (5-1) + (5-2) + (5-1) + (5-2) = 3 + 4 + 3 + 4 + 3 = 17$. Soma $16 + 17 = 33$; vezes 2,5 dá **82,5**.

Interpretação: 82,5 está bem acima de 68, por isso este participante avalia a app como claramente acima da média. Repara que a alternância positivo/negativo apanha respostas automáticas: quem responde 5 a tudo soma pouco nos pares. Se dez respostas derem média 76 com mínimo 60, concluis que a app está bem recebida mas há pelo menos um utilizador com dificuldades a investigar nas entrevistas.

:::tip[Como relatar números pequenos]
Com poucos participantes, apresenta cada valor e a média, nunca só a média. "Média 76 (60 a 90, n igual a 10)" diz muito mais do que "76". E junta sempre uma citação ou observação que explique os extremos.
:::

## Para levar para a próxima página

Estudos dão-te necessidades, pontuações e citações. Mas há utilizadores que os testes médios esquecem: quem não vê bem, não usa rato ou não ouve. Desenhar para eles é a [acessibilidade](acessibilidade-multimodal/).
