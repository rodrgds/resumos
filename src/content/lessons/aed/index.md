---
title: Algoritmos e Estruturas de Dados
description: Análise de complexidade, ordenação, listas, árvores, dispersão, heaps e grafos em C++.
section: conteudo
order: 0
---

Algoritmos e Estruturas de Dados é a cadeira onde aprendes a escolher: perante um problema, que estrutura guarda os dados e que algoritmo os transforma, e quanto custa essa escolha quando a entrada cresce. Vens de [Programação](/cadeiras/p/cpp-fundamentos/), onde o C++ e as classes já são familiares, e de [Funções](/cadeiras/fp/algoritmos-complexidade/), onde viste a primeira análise de custos. Aqui essas ideias tornam-se método: tipos abstratos de dados implementados por ti, complexidade provada e programas avaliados automaticamente no Mooshak.

## Como está organizado

Começa por [Complexidade e invariantes](complexidade-invariantes/), que fixa a notação assintótica para tempo e espaço e mostra como provar que um ciclo faz o que promete. Depois, [Pesquisa e ordenação em arrays](pesquisa-ordenacao/) compara a pesquisa sequencial com a binária e segue o quicksort e o mergesort passo a passo no mesmo vetor.

A segunda parte constrói estruturas: [Listas, pilhas e filas](listas-pilhas-filas/) com nós e apontadores, [Árvores binárias](arvores-binarias/) com as três travessias, e [Árvores de pesquisa equilibradas](arvores-pesquisa-equilibradas/) onde as rotações mantêm a altura logarítmica. A terceira parte organiza o acesso por chave e por prioridade: [Tabelas de dispersão](tabelas-dispersao/) com colisões resolvidas à vista, e [Filas de prioridade e heaps](filas-prioridade-heaps/) com o heapsort. Fecha com [Grafos e pesquisa](grafos-pesquisa/), onde a pesquisa em largura e em profundidade decide ciclos, conetividade e ordens topológicas.

## Como estudar

Lê cada página com o compilador aberto e implementa a estrutura antes de veres a solução: lista ligada, árvore de pesquisa, tabela de dispersão e heap cabem todos em programas curtos. Compila sempre com os avisos ligados e o padrão da cadeira:

```sh
g++ -std=c++17 -O2 -Wall programa.cpp -o programa
```

Antes de submeteres no Mooshak, corre o programa com os casos limite: entrada vazia, um só elemento, valores repetidos e a entrada máxima. O avaliador responde com um veredito por teste: aceite, resposta errada, tempo esgotado ou erro de execução. Um tempo esgotado nos testes grandes com os pequenos a passar é o sintoma clássico de complexidade a mais, volta à análise da primeira página. Em AED, perceber o desenho não chega; o hábito que conta pontos é seguir o estado dos dados à mão, com papel, numa entrada pequena, e só depois confirmar com o programa. Resolve a seguir os exercícios de cada ficha e submete no Mooshak, porque o avaliador automático testa entradas que tu não lembraste, incluindo a vazia e a de um só elemento.

## Avaliação

A forma de avaliação varia de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes os pesos dos testes, do trabalho laboratorial e do exame, e as regras de frequência e de melhoria.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Algoritmos e Estruturas de Dados (L.EIC011) do 2.º ano, 1.º semestre da LEIC, ocorrência de 2025/26: complexidade temporal e espacial, correção de algoritmos, pesquisa e ordenação em arrays, listas, pilhas e filas, árvores binárias e equilibradas, tabelas de dispersão, filas de prioridade e heaps, e algoritmos básicos em grafos. As ferramentas de trabalho são o compilador GCC com C++17 e o Mooshak para avaliação automática.

Material oficial da FEUP:

- Ficha da unidade curricular de Algoritmos e Estruturas de Dados, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=560096).
- Página oficial da UC com programa, material e laboratórios de 2025/26: [aulas de AED](https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2526/).
