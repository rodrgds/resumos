---
title: Desenho de Algoritmos
description: Técnicas de desenho de algoritmos, de força bruta a programação linear, com análise de custo e projetos em C++.
section: conteudo
order: 0
---

Desenho de Algoritmos é a cadeira onde aprendes a atacar um problema novo com método: reconhecer a sua forma, escolher uma técnica de desenho, analisar o custo e implementar a solução em C++. Vens de AED com estruturas de dados na bagagem; aqui a pergunta muda de "que estrutura uso?" para "que estratégia resolve isto dentro do limite de tempo?".

## Como está organizado

Começa por [Complexidade e estruturas](/cadeiras/da/complexidade-estruturas/), que revê a notação assimptótica e a escolha de estruturas que suportam o resto da cadeira. Depois vêm as técnicas, uma por página e por ordem crescente de sofisticação: [Força bruta](/cadeiras/da/forca-bruta/) para enumerar tudo em problemas pequenos, [Algoritmos gulosos](/cadeiras/da/algoritmos-gulosos/) para decidir localmente com prova de otimalidade, [Divisão e conquista](/cadeiras/da/divisao-conquista/) para partir o problema com recorrências de custo, e [Programação dinâmica](/cadeiras/da/programacao-dinamica/) para reaproveitar subproblemas sobrepostos.

A segunda metade abre o leque: [Programação linear](/cadeiras/da/programacao-linear/) modela otimização com restrições, [Retrocesso e ramificação](/cadeiras/da/retrocesso-ramificacao/) explora espaços de procura com poda, e [Complexidade e aproximação](/cadeiras/da/complexidade-aproximacao/) explica o que fazer quando o problema é exponencial e a solução exata não cabe no tempo.

## Roteiro de estudo

Associa cada técnica ao seu problema tipo: enumeração para a mochila pequena, guloso para trocos e intervalos, divisão para ordenação e pesquisa, tabela para mochila e alinhamento, modelo linear para dietas e planeamento, retrocesso para rainhas e coloração, aproximação para cobertura e caixeiro. Quando um enunciado novo aparecer, pergunta primeiro qual destes esqueletos ele veste e só depois escreve código.

Lê cada página com o compilador aberto. Os exemplos em C++ usam o que já sabes de [fundamentos](/cadeiras/p/cpp-fundamentos/) e da [STL](/cadeiras/p/templates-stl/); compila-os, muda os dados de entrada e confirma que o resultado acompanha a análise. Na véspera dos mini-testes, refaz um exemplo de cada técnica sem olhar: se conseguires reconstruir a tabela, a recorrência ou a prova, estás pronto.

## Avaliação

A forma de avaliação varia de ano para ano. Na ocorrência de 2025/26 houve dois mini-testes individuais sem consulta e dois projetos de programação em grupo, com mínimos por componente. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes os pesos, os mínimos e as regras de recurso da edição corrente antes de planeares o semestre.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Desenho de Algoritmos (L.EIC016) do 2.º ano, 2.º semestre da LEIC, ocorrência de 2025/26: complexidade assimptótica, força bruta, algoritmos gulosos, divisão e conquista, programação dinâmica, programação linear e inteira, retrocesso e branch and bound, problemas exponenciais, reduções e aproximação polinomial. A bibliografia obrigatória é o Cormen (Introduction to Algorithms) e o trabalho prático usa C++ com GoogleTest e CLion.

Material oficial da FEUP:

- Ficha da unidade curricular de Desenho de Algoritmos, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560101).
