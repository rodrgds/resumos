---
title: Fundamentos da Programação
description: Resolver problemas em Python, compreender o estado de um programa e escrever funções imperativas e livres de efeitos.
editorial:
  basedOn: 2025/26
  sources:
    - title: FP, SIGARRA 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560087
    - title: FP, SIGARRA 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586981
    - title: Python 3, André Restivo
      url: https://arestivo.github.io/slides/?s=python
    - title: Caderno FP SofiaViP
      url: https://drive.google.com/file/d/1-2tiPzWQX8LHHWILl3z-4pShVDhP0C1m/view
  gaps:
    - A ficha pública de 2026/27 não apresenta programa ou avaliação. A base oficial preenchida é 2025/26.
    - O Moodle 2024/25 acessível, curso 4883, não disponibiliza ficheiros de ensino nos módulos consultados.
    - Os slides de Restivo não identificam uma edição de FP. As fichas históricas RE01 a RE13 não confirmam o calendário atual.
---

No fim de FP, resolves problemas em Python e explicas como o programa chega ao resultado, ou seja, segues o estado das variáveis e o contrato de cada função. Por isso, o percurso combina programação imperativa, onde alteras dados passo a passo, com programação livre de efeitos, onde cada função calcula um resultado sem alterar os dados de quem a chama.

## Percurso de estudo

1. [Primeiros programas](/cadeiras/fp/primeiros-programas/) começa pelo algoritmo, tipos, expressões, entrada e saída. Aprende a distinguir uma falha de sintaxe de um resultado errado.
2. [Condições e ciclos](/cadeiras/fp/condicoes-ciclos/) mostra como escolher um ramo, repetir um cálculo e justificar que o ciclo termina.
3. [Funções](/cadeiras/fp/funcoes/) separa subproblemas, retorno, passagem de argumentos e âmbito dos nomes.
4. [Strings](/cadeiras/fp/strings/) trabalha índices, fatias e transformações de texto.
5. [Tuplos e listas](/cadeiras/fp/tuplos-listas/) distingue sequências imutáveis, mutação, alias e cópia.
6. [Dicionários e conjuntos](/cadeiras/fp/dicionarios-conjuntos/) escolhe entre associação por chave e pertença sem duplicados.
7. [Recursão](/cadeiras/fp/recursao/) liga um caso base à redução do problema e segue as chamadas até ao regresso.
8. [Programação funcional](/cadeiras/fp/programacao-funcional/) trata funções como valores e compara soluções com `map`, `filter` e `reduce`.
9. [Compreensões e geradores](/cadeiras/fp/compreensoes-geradores/) transforma coleções com compreensões. A parte de geradores aprofunda a diferença entre construir e consumir uma sequência.
10. [Algoritmos e complexidade](/cadeiras/fp/algoritmos-complexidade/) aplica pesquisa e contagem de operações. É um complemento às estratégias de resolução de problemas, não um tópico autónomo nomeado na ficha de 2025/26.
11. [Ficheiros, exceções e testes](/cadeiras/fp/ficheiros-excecoes/) junta persistência, tratamento de entradas inválidas, módulos e verificação.

Cada lição tem exemplos resolvidos e exercícios próprios, com duas pistas, resolução e erros frequentes. Tenta resolver antes de abrir a ajuda. Nos exercícios de programação, os testes apresentados ajudam a verificar o contrato, mas não substituem a explicação da solução. A [cheat sheet](/cadeiras/fp/folha-consulta/) serve para consulta depois de estudares.

## Como praticar

Antes de escrever código, identifica a entrada, o resultado e os casos limite. Segue uma entrada pequena à mão. Depois implementa uma parte de cada vez e compara o resultado com o que calculaste, incluindo sequências vazias, limites de intervalos e valores repetidos quando fazem sentido.

Nos editores desta cadeira, a linguagem é Python 3. O código corre numa execução descartável. Os ficheiros criados pelo exemplo existem só nessa execução. Para praticar no teu computador, guarda o programa num ficheiro `.py` e corre `python3 nome.py` num terminal. Não escrevas o indicador `>>>` da consola dentro do ficheiro.

## Edição e avaliação

:::details[Ver edição e avaliação]
A ficha pública de [2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586981), consultada a 1 de outubro de 2026, identifica a unidade curricular e a docência, mas não apresenta programa, bibliografia ou regras de avaliação. Estes apontamentos usam o programa preenchido de [2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560087). Consulta a ficha e o Moodle do teu ano para o calendário e as condições em vigor.

Em 2025/26, havia provas individuais em computador, com questões teóricas e exercícios de programação. As datas, ponderações e condições de 2026/27 têm de ser confirmadas nos materiais desse ano.
:::

## Fontes e âmbito

:::details[Ver fontes e âmbito]
A base oficial é o programa de FP de 2025/26: pensamento computacional, dados simples e compostos, condicionais, iteração, funções, passagem de parâmetros, recursão, ficheiros, programação livre de efeitos, funções de ordem superior, compreensões, estratégias de resolução, teste e depuração. Os resultados de aprendizagem também incluem exceções e problemas numéricos.

As fichas de 2018/19 no [repositório público de FPRO](https://github.com/educorreia932/FEUP-FPRO) ajudam a escolher tipos de problemas. O [Moodle de 2024/25](https://moodle2425.up.pt/course/view.php?id=4883) consultado não disponibilizava materiais de ensino. Estas fontes não confirmam os enunciados nem as regras atuais.

Os [slides de Python 3 de André Restivo](https://arestivo.github.io/slides/?s=python) apoiam a sintaxe e os exemplos. O [Caderno FP SofiaViP](https://drive.google.com/file/d/1-2tiPzWQX8LHHWILl3z-4pShVDhP0C1m/view) é um apoio de estudante, sem valor oficial. Nenhum identifica uma edição atual de FP.

Bibliografia da ficha de 2025/26:

- Peter Wentworth, Jeffrey Elkner, Allen B. Downey e Chris Meyers, [How to Think Like a Computer Scientist: Learning with Python 3](https://howtothink.readthedocs.io/en/latest/), 3.ª edição, bibliografia obrigatória. Apoia o desenvolvimento passo a passo, funções, coleções e recursão.
- Allen B. Downey, [Think Python](https://greenteapress.com/wp/think-python-2e/), 2.ª edição, bibliografia complementar. Apoia contratos, depuração e raciocínio sobre mutabilidade.
- Steven F. Lott, [Building Skills in Python](https://www.itmaybeahack.com/homepage/books/python.html), bibliografia complementar. O PDF antigo indicado pelo autor estava indisponível; não foi usado como texto integral.
- David Mertz, [Functional Programming in Python](https://www.oreilly.com/library/view/functional-programming-in/9781492048633/), bibliografia complementar. Não foi consultado um texto integral da edição da ficha.
- [Documentação oficial do Python](https://docs.python.org/3/), para confirmar operações, exceções e comportamento dos iteradores.

Os exemplos, exercícios e resoluções são próprios. Geradores, pesquisa binária e análise de custo são aprofundamentos sinalizados no percurso; não substituem materiais da edição atual que ainda não estão disponíveis.
:::
