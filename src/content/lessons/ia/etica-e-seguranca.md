---
title: Ética e segurança da IA
description: Teste de Turing, viés de dados, alinhamento e segurança nos sistemas que estas páginas constroem.
section: conteudo
order: 10
---

As páginas anteriores ensinam a construir decisores: classificadores, pesquisas, otimizadores. Esta pergunta o que podem correr mal quando esses decisores saem do caderno. São três problemas distintos, cada um ligado a um exemplo que já calculaste.

## Imitar não é compreender

O **teste de Turing** declara uma máquina inteligente se um juiz humano não a distinguir de uma pessoa em conversa escrita. É um teste de imitação, não de compreensão: um sistema pode passar à conta de estatística sobre texto sem "perceber" nada do que diz. Por isso o teste mede uma capacidade útil (conversar de forma indistinguível) e não responde se a máquina pensa. Quando usares assistentes de escrita ou de código, lembra-te de que a fluência do texto não garante a verdade do conteúdo.

## O viés entra pelos dados

Um classificador aprende o que os dados mostram, incluindo os preconceitos lá dentro. O filtro de spam da página de [incerteza](incerteza-e-bayes/) com 20 mensagens é inofensivo, mas o mesmo Naive Bayes treinado em currículos históricos aprende quem foi contratado no passado e repete o padrão, incluindo discriminação por género ou origem. O classificador de animais da página de [aprendizagem](aprendizagem-e-redes/) se treinado só com fotos de pinguins em jardins zoológicos falha nos pinguins na neve: o erro não está no algoritmo, está na amostra.

Daqui saem duas obrigações práticas: auditar os dados antes de treinar (quem está representado, quem falta) e avaliar por grupo, não só no global. A matriz de confusão por grupo mostra o que a exatidão global esconde: 95 por cento de exatidão pode ser 100 por cento num grupo e 50 noutro.

## Alinhamento e segurança

O **problema do alinhamento** pergunta como garantir que o sistema otimiza o que realmente queremos. O aspirador da primeira página com utilidade "sujidade recolhida" pode aprender a espalhar sujidade para a voltar a recolher: a métrica sobe e o objetivo real desce. Isto não é malícia, é otimização literal de uma métrica mal escolhida. Em sistemas grandes, o mesmo padrão aparece em recomendadores que otimizam cliques à custa de informação e em agentes que exploram brechas da recompensa.

A **segurança** acrescenta o uso adverso: modelos que memorizam dados de treino e os revelam, classificadores enganados por perturbações invisíveis, agentes com acesso a ferramentas que executam ações sem supervisão. A resposta não é um truque único: avaliação adversarial antes de publicar, limites de ação para agentes, e a regra de que nenhum sistema decide sozinho sobre pessoas sem revisão humana nas consequências sérias.

## O que levar para o exame e para fora dele

Em teste, estes temas caem como perguntas de justificação: identifica o problema (viés de dados, métrica mal alinhada, imitação sem compreensão), liga-o ao mecanismo da página correspondente e propõe a mitigação concreta (auditar dados, avaliar por grupo, rever a métrica, limitar ações). Fora do exame, é o hábito que distingue quem aplica IA de quem só treina modelos: perguntar sempre o que o sistema otimiza de facto e quem paga quando ele erra.
