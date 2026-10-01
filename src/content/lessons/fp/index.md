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

Em FP, resolves problemas em Python e explicas como os programas chegam ao resultado. O programa oficial combina programação imperativa, em que seguimos alterações de estado, com programação livre de efeitos, em que uma função calcula um resultado sem alterar os dados de quem a chama.

## Percurso de estudo

1. [Primeiros programas](primeiros-programas/) começa pelo algoritmo, tipos, expressões, entrada e saída. Aprende a distinguir uma falha de sintaxe de um resultado errado.
2. [Condições e ciclos](condicoes-ciclos/) mostra como escolher um ramo, repetir um cálculo e justificar que o ciclo termina.
3. [Funções](funcoes/) separa subproblemas, retorno, passagem de argumentos e âmbito dos nomes.
4. [Strings](strings/) trabalha índices, fatias e transformações de texto.
5. [Tuplos e listas](tuplos-listas/) distingue sequências imutáveis, mutação, alias e cópia.
6. [Dicionários e conjuntos](dicionarios-conjuntos/) escolhe entre associação por chave e pertença sem duplicados.
7. [Recursão](recursao/) liga um caso base à redução do problema e segue as chamadas até ao regresso.
8. [Programação funcional](programacao-funcional/) trata funções como valores e compara soluções com `map`, `filter` e `reduce`.
9. [Compreensões e geradores](compreensoes-geradores/) transforma coleções com compreensões. A parte de geradores aprofunda a diferença entre construir e consumir uma sequência.
10. [Algoritmos e complexidade](algoritmos-complexidade/) aplica pesquisa e contagem de operações. É um complemento às estratégias de resolução de problemas, não um tópico autónomo nomeado na ficha de 2025/26.
11. [Ficheiros, exceções e testes](ficheiros-excecoes/) junta persistência, tratamento de entradas inválidas, módulos e verificação.

Cada lição tem exemplos resolvidos e exercícios próprios, com duas pistas, resolução e erros frequentes. Tenta resolver antes de abrir a ajuda. Nos exercícios de programação, os testes apresentados ajudam a verificar o contrato, mas não substituem a explicação da solução. A [cheat sheet](folha-consulta/) serve para consulta depois de estudares.

## Como praticar

Antes de escrever código, identifica a entrada, o resultado e os casos limite. Segue uma entrada pequena à mão. Depois implementa uma parte de cada vez e compara o resultado com o que calculaste, incluindo sequências vazias, limites de intervalos e valores repetidos quando fazem sentido.

Nos editores desta cadeira, a linguagem é Python 3. O código corre numa execução descartável. Os ficheiros criados pelo exemplo existem só nessa execução. Para praticar no teu computador, guarda o programa num ficheiro `.py` e corre `python3 nome.py` num terminal. Não escrevas o indicador `>>>` da consola dentro do ficheiro.

## Edição e avaliação

A ficha pública de [2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586981), consultada a 1 de outubro de 2026, identifica a unidade curricular e a docência, mas não apresenta programa, bibliografia ou regras de avaliação. Estes apontamentos usam o programa preenchido de [2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560087). Consulta a ficha e o Moodle do teu ano para o calendário e as condições em vigor.

Em 2025/26, a avaliação indicava provas individuais em computador, com questões teóricas e exercícios de programação. A época normal ponderava MT1 e MT2 a 40% cada e MT3 a 20%; o recurso usava ER a 100%. Estas regras descrevem essa edição, não confirmam a avaliação de 2026/27.

## Fontes e âmbito

A base oficial é o programa de FP de 2025/26: pensamento computacional, dados simples e compostos, condicionais, iteração, funções, passagem de parâmetros, recursão, ficheiros, programação livre de efeitos, funções de ordem superior, compreensões, estratégias de resolução, teste e depuração. Os resultados de aprendizagem também incluem exceções e problemas numéricos.

O [Moodle de 2024/25, curso 4883](https://moodle2425.up.pt/course/view.php?id=4883), estava acessível, mas os módulos consultados não continham ficheiros de ensino. Essa coleção não permite confirmar os slides usados pelo aluno. As fichas históricas RE01 a RE13, preservadas no [repositório público de FPRO](https://github.com/educorreia932/FEUP-FPRO), ajudam a escolher tipos de problemas. Não foram tratadas como enunciados nem regras atuais.

Os [slides de Python 3 de André Restivo](https://arestivo.github.io/slides/?s=python), mantidos no [repositório do autor](https://github.com/arestivo/slides), apoiam a sintaxe, coleções, controlo, funções, módulos e ficheiros. Não identificam uma edição de FP. O apêndice de PostgreSQL fica fora destes apontamentos. O [Caderno FP SofiaViP](https://drive.google.com/file/d/1-2tiPzWQX8LHHWILl3z-4pShVDhP0C1m/view) foi usado como apoio de estudante, sem valor oficial.

Bibliografia da ficha de 2025/26:

- Peter Wentworth, Jeffrey Elkner, Allen B. Downey e Chris Meyers, [How to Think Like a Computer Scientist: Learning with Python 3](https://howtothink.readthedocs.io/en/latest/), 3.ª edição, bibliografia obrigatória. Apoia o desenvolvimento passo a passo, funções, coleções e recursão.
- Allen B. Downey, [Think Python](https://greenteapress.com/wp/think-python-2e/), 2.ª edição, bibliografia complementar. Apoia contratos, depuração e raciocínio sobre mutabilidade.
- Steven F. Lott, [Building Skills in Python](https://www.itmaybeahack.com/homepage/books/python.html), bibliografia complementar. O PDF antigo indicado pelo autor estava indisponível; não foi usado como texto integral.
- David Mertz, [Functional Programming in Python](https://www.oreilly.com/library/view/functional-programming-in/9781492048633/), bibliografia complementar. Não foi consultado um texto integral da edição da ficha.
- [Documentação oficial do Python](https://docs.python.org/3/), para confirmar operações, exceções e comportamento dos iteradores.

Os exemplos, exercícios e resoluções são próprios. Geradores, pesquisa binária e análise de custo são aprofundamentos sinalizados no percurso; não substituem materiais da edição atual que ainda não estão disponíveis.
