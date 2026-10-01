---
title: Programação Funcional e em Lógica
description: Haskell e Prolog com raciocínios completos, exemplos executáveis e exercícios para as provas individuais.
order: 0
editorial:
  basedOn: 2026/27
  sources:
    - title: Programa e avaliação PFL 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587002
    - title: Apresentação, aulas funcionais 1 a 6 e fichas 1 a 3
      url: https://moodle2627.up.pt/course/view.php?id=4363
    - title: Graham Hutton, materiais oficiais
      url: https://people.cs.nott.ac.uk/pszgmh/pih.html
    - title: Manual SICStus Prolog
      url: https://sicstus.sics.se/sicstus/docs/latest/html/sicstus.html
  coverage: Percurso de teoria e prática para tipos, listas, recursão, ordem superior, árvores, I/O, parsers, propriedades, unificação, procura, controlo, jogos e transformação simbólica. Inclui exercícios próprios e cheat sheet.
  gaps:
    - As fichas funcionais recolhidas são apenas as folhas 1 a 3; faltam as fichas posteriores.
    - Os slides Prolog de 2026/27 ainda não constavam do material recolhido.
    - Não foi recolhido um conjunto completo de provas atuais com critérios de correção.
---

PFL usa Haskell para transformar valores com funções e Prolog para descrever relações e procurar soluções. Nos dois casos, aprender a sintaxe chega apenas ao primeiro exemplo. Uma prova pode pedir que deduzas um tipo, sigas a avaliação, expliques a terminação, encontres um contraexemplo ou escrevas um programa com um contrato preciso.

## O percurso

Em Haskell, começa pelas [expressões e padrões](/cadeiras/pfl/haskell-expressoes-tipos/), depois aprende a [deduzir tipos](/cadeiras/pfl/polimorfismo-classes/). [Listas e recursão](/cadeiras/pfl/listas-recursao/) cobre compreensões, ordenação e os algoritmos das fichas iniciais. [Ordem superior](/cadeiras/pfl/funcoes-ordem-superior/) reúne composição, folds e preguiça. Passa depois às [árvores e tipos algébricos](/cadeiras/pfl/tipos-algebricos-recursao/), às [ações I/O e parsers](/cadeiras/pfl/entrada-saida-parsers/) e às [propriedades com QuickCheck](/cadeiras/pfl/testes-quickcheck/).

Em Prolog, começa por [termos, unificação e SLD](/cadeiras/pfl/logica-unificacao-prolog/). Estuda [listas, aritmética e corte](/cadeiras/pfl/prolog-recursao-procura/) antes de [recolher soluções e compor estruturas](/cadeiras/pfl/solucoes-estruturas-prolog/). A última página aplica essas ferramentas a [procura, jogos e manipulação simbólica](/cadeiras/pfl/procura-jogos-simbolos/).

Cada lição termina com questões que testam decisões diferentes. Resolve-as sem abrir as pistas; depois compara a justificação, e não apenas a resposta. A [cheat sheet](/cadeiras/pfl/folha-consulta/) serve para rever condições e padrões depois de estudar as explicações.

## Como resolver uma questão

Num tipo, atribui letras aos valores desconhecidos e impõe as igualdades pedidas pelas aplicações. Numa recursão, escreve um caso pequeno, o caso base e a medida que diminui. Num fold, expande as aplicações antes de fazer contas. Numa consulta Prolog, renomeia as variáveis de cada cláusula, escolhe o objetivo mais à esquerda e assinala os pontos de retrocesso.

Testa também entradas vazias, resultados já instanciados e casos que violam uma pré-condição. Um programa que funciona num só exemplo pode continuar parcial, perder repetidos ou entrar num ramo infinito.

Os exemplos Haskell e Prolog têm programas completos no editor. O motor Prolog do site é SWI; a ficha da cadeira indica SICStus. As diferenças de bibliotecas e de predicados são identificadas quando afetam o exemplo.

## Avaliação de 2026/27

A ficha atual e a apresentação dividem a cadeira em dois módulos de seis semanas. Em época normal, a média dos dois testes tem peso de 90% e a média dos dois trabalhos individuais tem peso de 10%. Em recurso, a componente teórica pode ser substituída pelo exame, conservando a prática. A frequência exige pelo menos 75% das aulas TP, com as exceções previstas na ficha. [Consulta as regras e os prazos atuais](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587002).

Este percurso concentra-se nas provas individuais. Os projetos têm requisitos próprios no Moodle. As aulas funcionais e as três primeiras fichas foram comparadas com os materiais de 2026/27; o restante percurso segue o programa atual e referências técnicas, com os guiões Prolog e as provas atuais ainda por confirmar.
