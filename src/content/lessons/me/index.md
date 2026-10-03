---
title: Métodos Estatísticos
description: Explorar dados, modelar o acaso e fazer inferência para médias, proporções e tabelas de contagens.
section: conteudo
order: 0
editorial:
  basedOn: 2025/26
  review:
    edition: 2026/27
    reviewer: Codex
    date: '2026-10-03'
  sources:
    - title: Moodle ME 2025/26
      url: https://moodle2526.up.pt/course/view.php?id=4420
    - title: SIGARRA ME 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586998
    - title: SIGARRA ME 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560105
  coverage: Conteúdo e práticas revistos com as aulas e folhas de 2025/26.
  gaps:
    - A ficha SIGARRA de 2026/27 ainda não apresenta programa nem avaliação.
    - Não estão disponíveis materiais Moodle de ME de 2026/27 nesta revisão.
---

No fim desta cadeira vais conseguir descrever uma amostra sem te deixares enganar por gráficos ou médias, escolher o modelo de probabilidade certo para cada mecanismo e tirar conclusões sobre uma população com intervalos e testes, porque aprendes a escrever as condições antes de substituir números. O percurso começa na descrição, passa pela probabilidade e pelas distribuições e fecha na inferência para médias, proporções e contagens.

## Percurso

Começa por [estudos e amostragem](/cadeiras/me/estudo-e-amostragem/): quem foi observado, como foi escolhido e que conclusões o desenho permite. Seguem-se [estatística descritiva](/cadeiras/me/estatistica-descritiva/) e [dados bivariados](/cadeiras/me/dados-bivariados/), com frequências, histogramas, quartis, dispersão e associação entre variáveis.

[Probabilidades](/cadeiras/me/probabilidades/) introduz acontecimentos, condicionamento, independência e Bayes. [Variáveis aleatórias](/cadeiras/me/variaveis-aleatorias/) transforma resultados em números e [distribuições conjuntas](/cadeiras/me/distribuicoes-conjuntas/) trata duas variáveis em simultâneo. Em [distribuições](/cadeiras/me/distribuicoes/) aprendes a reconhecer modelos, calcular probabilidades e ler tabelas.

[Amostragem e limite central](/cadeiras/me/amostragem-limite-central/) explica a distribuição de uma estatística entre amostras, a começar pela média ou proporção. Usa-a para construir [intervalos de confiança](/cadeiras/me/intervalos-confianca/) e [testes de hipóteses](/cadeiras/me/testes-hipoteses/). Depois aprende a [comparar médias](/cadeiras/me/comparacao-medias/), estudar [erros e potência](/cadeiras/me/erros-potencia/) e usar [testes por aleatorização](/cadeiras/me/aleatorizacao/).

O percurso termina com [inferência para proporções](/cadeiras/me/proporcoes/) e [testes do qui-quadrado](/cadeiras/me/qui-quadrado/). A [cheat sheet](/cadeiras/me/folha-consulta/) reúne as fórmulas e condições para consulta rápida.

## Como trabalhar

Em cada problema, identifica a unidade observada, a variável, cada valor observado e o parâmetro pretendido. Escolhe o método antes de substituir números. O percurso assume somatórios, combinatória e integrais simples de cadeiras anteriores. Escreve as condições, conserva casas decimais nas contas intermédias e fecha com uma frase sobre a população e a pergunta inicial.

Os exemplos executáveis em Python permitem conferir contas e experimentar gráficos. Os materiais das aulas também usam R. O software ajuda a explorar dados, mas não escolhe o modelo nem justifica as condições por ti. Nos exercícios usa a tabela ou o arredondamento solicitado no enunciado.

:::details[Ano e avaliação]

O material de referência é de **2025/26**. A [ficha SIGARRA de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586998), consultada a 3 de outubro de 2026, confirma a cadeira, mas ainda não apresenta programa nem avaliação. Confirma as regras nos avisos atuais da equipa docente. As regras de avaliação de 2025/26 não devem ser usadas para planear 2026/27.

As questões-modelo T1 e T2 ilustram tipos de pergunta. Não são provas completas de anos anteriores.

:::

:::details[Fontes e bibliografia]

A base principal foi a [página de ME no Moodle 2025/26](https://moodle2526.up.pt/course/view.php?id=4420): 14 aulas teóricas, sete folhas de exercícios com soluções e versões em inglês, notas de estatística descritiva, dois conjuntos de questões-modelo, formulários, tabelas e dois ficheiros de dados. O Moodle requer acesso institucional; esses documentos não são republicados aqui.

O programa e a avaliação foram conferidos na [ficha SIGARRA de 2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560105). A bibliografia obrigatória dessa ficha é _Estatística: Apontamentos de Apoio às Aulas_, de A. Miguel Gomes e José F. Oliveira (2018), e _Estatística_, de Rui Campos Guimarães e José António Sarsfield Cabral, 2.ª edição (2011). A bibliografia complementar inclui _Modern Mathematical Statistics with Applications_, de Jay L. Devore, _Introduction to Statistical Investigations_, de Nathan Tintle e colaboradores (2015), e _Introductory Statistics_, de Thomas H. Wonnacott. Estes manuais não estavam disponíveis em texto integral para esta revisão.

Para os programas, foi consultada a [documentação oficial de SciPy](https://docs.scipy.org/doc/scipy/reference/stats.html). Os quantis amostrais seguem a convenção tipo 2 das aulas. Os quantis críticos são definidos pela cauda direita. Os ajustamentos para proporções são aproximados; o nome Wilson usado em alguns documentos das aulas não identifica o intervalo de Wilson score, que tem outra fórmula.

:::
