---
title: Algoritmos e Estruturas de Dados
description: Correção, análise de custos, estruturas de dados e algoritmos em C++17.
section: conteudo
order: 0
editorial:
  basedOn: 2026/27
  sources:
    - title: Ficha LEIC de AED, 2026/27
      url: https://sigarra.up.pt/feup/pt/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=586989
    - title: Aulas públicas de AED, 2026/27
      url: https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2627/
    - title: Aulas públicas de AED, 2025/26
      url: https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2526/
---

No fim desta cadeira vais justificar se um algoritmo calcula o resultado pedido, vais escolher a estrutura que oferece as operações necessárias e vais contar tempo e memória em função da entrada. Ou seja, vais decidir com provas e custos, porque o enunciado e os limites mandam na solução. Os exemplos usam C++17, por isso precisas de funções, classes, referências, apontadores e memória dinâmica de [Programação](/cadeiras/p/).

Se a sintaxe dos vetores ou das referências ainda te prende, começa pelos [fundamentos de C++ para AED](/cadeiras/aed/fundamentos-cpp/). Depois segue o percurso pela ordem, porque cada capítulo usa os contratos e as contagens dos anteriores.

## Percurso

1. [Correção e complexidade](/cadeiras/aed/complexidade-invariantes/): contratos, invariantes, somas, recorrências e custos amortizados.
2. [Pesquisa](/cadeiras/aed/pesquisa-ordenacao/) e [ordenação](/cadeiras/aed/ordenacao/): intervalos, repetidos, pesquisa da resposta, estabilidade e limites do modelo de comparação.
3. [Tipos abstratos](/cadeiras/aed/tipos-abstratos/) e [estruturas lineares](/cadeiras/aed/listas-pilhas-filas/): escolher a representação, manter ligações e analisar sequências de operações.
4. [Envolvente convexa](/cadeiras/aed/envolvente-convexa/): orientação geométrica, Graham e a escolha entre pilha e lista circular.
5. [Árvores binárias](/cadeiras/aed/arvores-binarias/), [árvores de pesquisa](/cadeiras/aed/arvores-pesquisa/) e [equilíbrio](/cadeiras/aed/arvores-pesquisa-equilibradas/): percursos, remoções, AVL e vermelho-pretas.
6. [Dispersão](/cadeiras/aed/tabelas-dispersao/) e [heaps](/cadeiras/aed/filas-prioridade-heaps/): acesso por chave ou prioridade, colisões e construção linear.
7. [DFS e BFS](/cadeiras/aed/grafos-pesquisa/) e [aplicações em grafos](/cadeiras/aed/grafos-aplicacoes/): caminhos mínimos sem pesos, ciclos, ordem topológica, componentes fortes, pontes e articulações.

Cada capítulo termina com exercícios que pedem uma decisão, um traço ou uma justificação. Tenta resolver antes de abrir as pistas. A [Cheat sheet](/cadeiras/aed/folha-consulta/) reúne condições e custos para revisão; as provas e os exemplos ficam nos capítulos.

## Trabalho prático

Começa por uma entrada pequena e escreve o estado depois de cada operação. Declara os casos vazios, a política de duplicados e as convenções de índices e altura. Depois programa, compila com avisos e compara com uma referência simples. Testa também uma entrada crescente, uma inversa, muitos iguais e os limites numéricos.

Nos grafos, testa vértices isolados, componentes desconexas e ciclos. Nas estruturas com nós, testa alterações da cabeça, da raiz e do último elemento. Antes de submeter no Mooshak, confirma o formato de entrada e saída e retira mensagens de depuração. Os programas destas páginas ensinam os algoritmos; não são soluções completas dos trabalhos da cadeira.

:::details[Avaliação de 2026/27]
As aulas de introdução e a [página de avaliação](https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2627/evaluation.html) definem:

- `NP`: soma das notas de dois testes práticos de programação, cada um com 10 valores, total de 0 a 20.
- `E`: nota do exame escrito da época normal ou de recurso, de 0 a 20.
- Classificação final $C=\max(0{,}65E+0{,}35NP,\;0{,}75E+0{,}25NP)$; aprovação com $C\ge9{,}5$.

Por exemplo, `E=12` e `NP=16` dão `13,4` pela primeira ponderação e `13` pela segunda; é usada `13,4`. Os testes práticos de 2026/27 não podem ser repetidos. Para primeira inscrição nesse ano, a melhoria incide na componente de exame.

Para obter frequência, não podes exceder 25% de faltas às aulas teórico-práticas. Quem cumpriu a assiduidade no ano anterior tem dispensa, embora a frequência das aulas seja aconselhada. Quem não aprovou em 2025/26 e realizou a componente prática pode pedir para conservar essa nota, informando os regentes no início do ano. As condições de melhoria de notas práticas de estudantes já aprovados exigem contacto com os regentes. Consulta a ficha e os anúncios da tua edição para datas e situações individuais.
:::

:::details[Fontes e âmbito]
O programa de referência é a [ficha preenchida de AED da LEIC, ocorrência 586989, 2026/27](https://sigarra.up.pt/feup/pt/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=586989). As ferramentas indicadas são GCC com C++17, VSCode e Mooshak.

A base docente é a [página pública de Ana Paula Tomás e Pedro Ribeiro, 2026/27](https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2627/). Em 2 de outubro de 2026 estavam disponíveis quatro apresentações, da introdução à pesquisa, e as duas primeiras aulas práticas. Para os tópicos posteriores, o percurso foi cruzado com as quinze apresentações e as fichas práticas públicas de [2025/26](https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2526/), mantendo o âmbito confirmado no programa atual. O [exame-modelo público de 2024/25](https://www.dcc.fc.up.pt/~pribeiro/aulas/aed2425/exam_sample_questions.pdf) ajudou a identificar tipos de raciocínio; os exercícios destas páginas são originais.

O Moodle de 2025/26 e alguns exames ou soluções protegidos não estiveram acessíveis e não são apresentados como materiais revistos. Os [Resumos AED de SofiaViP](https://drive.google.com/file/d/1oFfndRpq_F8MQeffoU4_rRBn-04pZiCY/view) são um suplemento histórico de estudante, sem uma edição atual identificada.

A bibliografia obrigatória indicada na ficha é:

- Mark Allen Weiss, _Data Structures and Algorithm Analysis in C++_, ISBN 0-201-36122-1.
- Robert Sedgewick, _Algorithms in C++_, ISBN 0-201-35088-2.
- Thomas H. Cormen e coautores, _Introduction to Algorithms_, 3.ª ou 4.ª edição; a ficha indica ISBN 978-0-262-53305-8.

Para contratos da biblioteca, foram consultadas as secções do projeto público do padrão C++ sobre [ordenação](https://eel.is/c++draft/alg.sorting), [pesquisa binária](https://eel.is/c++draft/alg.binary.search), [invalidação em vetores](https://eel.is/c++draft/vector.modifiers) e [containers não ordenados](https://eel.is/c++draft/unord.req). Esse projeto acompanha a evolução da linguagem; os programas publicados usam apenas C++17.
:::
