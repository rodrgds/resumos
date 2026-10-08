---
draft: true
title: Ética e segurança da IA
description: Teste de Turing, viés de dados, alinhamento e segurança nos sistemas que estas páginas constroem.
section: conteudo
practices:
  - ia/praticar-etica-e-seguranca
order: 10
---

Um filtro de candidaturas pode repetir padrões discriminatórios dos dados de treino. Um aspirador recompensado pela quantidade de sujidade recolhida pode aumentar a pontuação espalhando sujidade e recolhendo-a de novo, se tiver essa possibilidade. Avaliar um sistema exige examinar os dados, as conclusões e o objetivo que orienta as ações.

## Teste de Turing e limites da inferência

O **teste de Turing** substitui a pergunta "as máquinas pensam?" por um jogo de imitação em conversa escrita. Avalia se um interrogador distingue as respostas de uma máquina das de uma pessoa, nas condições do teste. O resultado não demonstra consciência, compreensão nem correção factual, por isso a relação entre comportamento e compreensão continua a ser uma questão filosófica. Quando usares assistentes de escrita ou de código, lembra-te de que a fluência do texto não garante a verdade do conteúdo.

## Viés e avaliação por grupo

Um classificador aprende o que os dados mostram, incluindo os preconceitos lá dentro. O Naive Bayes usado para [classificar mensagens](/cadeiras/ia/incerteza-e-bayes/) também poderia classificar candidaturas. Se a etiqueta de treino for "foi contratado", o modelo aprende a reproduzir decisões históricas, que podem incluir discriminação por género ou origem. Isso não demonstra que esteja a medir a adequação à função. Um classificador de imagens treinado apenas com pinguins em jardins zoológicos pode usar o fundo como pista e falhar com pinguins na neve. É uma mudança da distribuição dos dados; pode exigir dados mais representativos e alterações no modelo. O exemplo numérico dos animais usava atributos, não imagens.

Daqui saem duas obrigações práticas: auditar os dados antes de treinar (quem está representado, quem falta) e avaliar por grupo, não só no global. A matriz de confusão por grupo mostra o que a exatidão global esconde: 95 por cento de exatidão pode resultar de 100 por cento num grupo com 90 pessoas e 50 por cento noutro com 10. Para avaliar um filtro de candidaturas, compara também falsos positivos e falsos negativos por grupo e o custo dos erros.

## Alinhamento e segurança

O **problema do alinhamento** pergunta como garantir que o sistema otimiza o que realmente queremos. O aspirador da primeira página com utilidade "sujidade recolhida" pode aprender a espalhar sujidade para a voltar a recolher: a métrica sobe e o objetivo real desce. Isto não é malícia, é otimização literal de uma métrica mal escolhida. Em sistemas grandes, o mesmo padrão aparece em recomendadores que otimizam cliques à custa de informação e em agentes que exploram brechas da recompensa.

A **segurança** acrescenta o uso adverso: modelos que memorizam dados de treino e os revelam, classificadores enganados por perturbações invisíveis, agentes com acesso a ferramentas que executam ações sem supervisão. A resposta não é um truque único: avaliação adversarial antes de publicar, limites de ação para agentes, e revisão humana efetiva quando as consequências o exigem. A pessoa que revê precisa de informação, tempo e autoridade para contrariar o sistema. Acrescentar uma aprovação automática de rotina não resolve o risco.

## Justificar uma mitigação

Num recomendador que maximiza cliques, o objetivo pode incentivar títulos enganadores. Rever a recompensa deve aproximá-la da qualidade pretendida; avaliar conteúdo e limitar recomendações de risco verifica efeitos que os cliques não medem. Uma mitigação precisa de uma medida observável, não só de "usar IA com ética".

Antes de aplicar um sistema, identifica quem recebe os benefícios e quem suporta os erros. Verifica dados, métricas por grupo, permissões e mecanismos de revisão. Regista os limites e acompanha mudanças depois da publicação. Mais capacidade não implica menos risco: um agente que planeia bem também pode executar mais passos para cumprir um objetivo mal definido.
