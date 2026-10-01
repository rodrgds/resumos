---
title: Métodos Estatísticos
description: Explorar dados, modelar o acaso e fazer inferência para médias, proporções e tabelas de contagens.
section: conteudo
order: 0
---

Uma amostra permite descrever o que foi observado e, sob condições explícitas, tirar conclusões sobre uma população. A cadeira liga estas duas tarefas através da probabilidade: primeiro vemos os dados, depois estudamos como variariam se recolhêssemos outra amostra.

## Percurso

Começa por [estudos e amostragem](estudo-e-amostragem/): quem foi observado, como foi escolhido e que conclusões o desenho permite. Seguem-se [estatística descritiva](estatistica-descritiva/) e [dados bivariados](dados-bivariados/), com frequências, histogramas, quartis, dispersão e associação entre variáveis.

[Probabilidades](probabilidades/) introduz acontecimentos, condicionamento, independência e Bayes. [Variáveis aleatórias](variaveis-aleatorias/) transforma resultados em números e [distribuições conjuntas](distribuicoes-conjuntas/) trata duas variáveis em simultâneo. Em [distribuições](distribuicoes/) aprendes a reconhecer modelos, calcular probabilidades e ler tabelas.

[Amostragem e limite central](amostragem-limite-central/) explica a distribuição de uma média ou proporção entre amostras. Usa-a para construir [intervalos de confiança](intervalos-confianca/) e [comparar médias](comparacao-medias/). Depois estuda [testes de hipóteses](testes-hipoteses/), [erros e potência](erros-potencia/) e [testes por aleatorização](aleatorizacao/).

O percurso termina com [inferência para proporções](proporcoes/) e [testes do qui-quadrado](qui-quadrado/). A [cheat sheet](folha-consulta/) reúne as fórmulas e condições para consulta rápida.

## Como trabalhar

Em cada problema, identifica a unidade observada, a variável e o parâmetro pretendido. Escolhe o método antes de substituir números. Escreve as condições, conserva casas decimais nas contas intermédias e fecha com uma frase sobre a população e a pergunta inicial.

Os exemplos executáveis em Python permitem conferir contas e experimentar gráficos. Os materiais das aulas também usam R. O software ajuda a explorar dados, mas não escolhe o modelo nem justifica as condições por ti. Nos exercícios usa a tabela ou o arredondamento solicitado no enunciado.

## Ano e avaliação

Este percurso foi reconstruído a partir do material de **2025/26**. A ficha dessa ocorrência descreve dois testes, sem nota mínima por teste, e recurso com duas partes correspondentes. A soma necessária para aprovação é 9,5 valores antes do arredondamento; classificações a partir de 17,5 têm uma prova extra com regras próprias. Estas são regras históricas daquela ocorrência. Para **2026/27**, confirma a ficha e os avisos da equipa docente antes de planear a avaliação.

Os ficheiros de questões do tipo T1 e T2 são exemplos de perguntas possíveis, não provas completas de anos anteriores. As práticas destas páginas são exercícios novos sobre os mesmos tipos de decisão.

## Fontes e bibliografia

A base principal foi a [página de ME no Moodle 2025/26](https://moodle2526.up.pt/course/view.php?id=4420): 14 aulas teóricas, sete folhas de exercícios com soluções e versões em inglês, notas de estatística descritiva, dois conjuntos de questões-modelo, formulários, tabelas e dois ficheiros de dados. Foram consultados os 45 ficheiros originais. O Moodle requer acesso institucional; esses documentos não são republicados aqui.

O programa e a avaliação foram conferidos na [ficha SIGARRA de 2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560105). A bibliografia obrigatória dessa ficha é _Estatística: Apontamentos de Apoio às Aulas_, de A. Miguel Gomes e José F. Oliveira (2018), e _Estatística_, de Rui Campos Guimarães e José António Sarsfield Cabral, 2.ª edição (2011). A bibliografia complementar inclui _Modern Mathematical Statistics with Applications_, de Jay L. Devore, _Introduction to Statistical Investigations_, de Nathan Tintle e colaboradores (2015), e _Introductory Statistics_, de Thomas H. Wonnacott. Estes manuais não estavam disponíveis em texto integral para esta revisão.

Para os programas, foi consultada a [documentação oficial de SciPy](https://docs.scipy.org/doc/scipy/reference/stats.html). Os capítulos usam quantis amostrais tipo 2, quantis críticos definidos pela cauda direita e os ajustamentos de Agresti–Coull para proporções. Distinguem a fórmula de Welch da fórmula com variância comum e identificam sempre os resultados aproximados.
