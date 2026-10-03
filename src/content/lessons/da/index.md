---
title: Desenho de Algoritmos
description: Algoritmos em grafos, técnicas de otimização e provas de correção, com exemplos resolvidos e exercícios.
section: conteudo
order: 0
editorial:
  basedOn: 2025/26
  sources:
    - title: DA, SIGARRA 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560101
    - title: Materiais de DA, Moodle 2025/26
      url: https://moodle2526.up.pt/course/view.php?id=5334
  gaps:
    - A ficha de 2026/27 ainda não permite confirmar o programa nem a avaliação dessa edição.
---

No fim desta cadeira consegues escolher uma estratégia para cada problema, porque sabes provar que ela resolve o problema e contar o seu custo. DA parte das estruturas de dados e da análise de algoritmos de AED para chegar aí, ou seja cada lição mostra a técnica, um exemplo resolvido e exercícios para praticar. Uma implementação que parece funcionar num exemplo ainda precisa de uma prova e de casos que testem as suas condições.

## Percurso

1. Revê [complexidade e estruturas](/cadeiras/da/complexidade-estruturas/) e [percursos em grafos](/cadeiras/da/grafos-percursos/), incluindo ordenação topológica e componentes fortemente conexas.
2. Compara [força bruta](/cadeiras/da/forca-bruta/) com [algoritmos gulosos](/cadeiras/da/algoritmos-gulosos/). A primeira enumera candidatos; os segundos precisam de justificar cada decisão irreversível.
3. Aplica essas ideias a [árvores abrangentes](/cadeiras/da/arvores-abrangentes/), [caminhos mínimos](/cadeiras/da/caminhos-minimos/) e [fluxo máximo](/cadeiras/da/fluxo-maximo/).
4. Aprende a derivar recorrências em [divisão e conquista](/cadeiras/da/divisao-conquista/) e a escolher estados em [programação dinâmica](/cadeiras/da/programacao-dinamica/). Continua com [sequências e cadeias de matrizes](/cadeiras/da/sequencias-dinamica/) e [linguagens formais](/cadeiras/da/linguagens-dinamica/).
5. Explora candidatos com poda em [retrocesso e ramificação](/cadeiras/da/retrocesso-ramificacao/). Estuda [complexidade computacional](/cadeiras/da/complexidade-aproximacao/) para certificados, reduções e casos especiais, e [aproximações com garantia](/cadeiras/da/aproximacao-garantias/) para distinguir garantias de heurísticas.
6. Formula restrições em [programação linear](/cadeiras/da/programacao-linear/) e [programação inteira](/cadeiras/da/programacao-inteira/).

Os exercícios no fim de cada lição são originais. Pedem tabelas, rastreios, provas, contraexemplos e modelos, os tipos de raciocínio presentes nas fichas práticas e nos testes consultados. Experimenta resolvê-los antes de abrir as pistas. A [cheat sheet](/cadeiras/da/folha-consulta/) serve para rever condições e fórmulas depois da leitura.

## Como resolver um problema

Escreve primeiro o que é uma solução válida. Se procuras um ótimo, define o valor que maximizas ou minimizas e como representas uma solução. Só depois escolhe o algoritmo.

Ao analisar a implementação, separa quatro perguntas: qual é o estado mantido, que decisões são possíveis, por que uma decisão ou poda é segura e quantas vezes cada operação acontece. Reconstruir um caminho, um conjunto de objetos ou uma atribuição faz parte da resposta quando o enunciado o pede.

Os programas executáveis usam C++ com entrada pela consola e não precisam de ficheiros nem exceções. Os exemplos de gramáticas usam Python para tornar os conjuntos visíveis. Nos exercícios, Python pode ser verificado automaticamente pelos casos públicos. Código C++, provas e modelos usam autoavaliação: compara o teu raciocínio com a solução e os critérios, pois correr um programa não prova a sua correção nem a sua complexidade. Os números são pequenos para permitir seguir a execução; as análises de complexidade consideram entradas de tamanho variável.

:::details[Edição e avaliação de 2025/26]
A base destas páginas é o Moodle de **2025/26**, com apresentações teóricas, fichas TP de Spring 2026, enunciados dos dois projetos e testes com soluções. A ficha SIGARRA dessa edição atribui 70% aos dois testes e 30% aos dois projetos:

$$NF=0{,}35(T_1+T_2)+0{,}15(P_1+P_2).$$

Cada componente exige pelo menos 8 valores. Os projetos são feitos em grupos de dois ou três e têm demonstração obrigatória. A ficha prevê recurso global para a componente escrita. Estas regras descrevem 2025/26, por isso confirma as regras da tua edição antes de planear a avaliação.

O primeiro projeto de 2025/26 trata a atribuição de revisores a artigos através de fluxo máximo. O segundo fornece intervalos de vivacidade para construir webs e um grafo de interferências, usado na alocação de registos de um compilador. Inclui coloração, transferência de webs para memória e divisão de webs. As lições explicam os modelos e os algoritmos, mas não substituem os formatos de entrada, critérios de entrega ou decisões específicas desses enunciados.
:::

:::details[Fontes e âmbito]

- [Ficha SIGARRA de 2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560101), programa, bibliografia e avaliação.
- [Moodle de DA 2025/26](https://moodle2526.up.pt/course/view.php?id=5334), requer autenticação. Foram consultadas as apresentações das aulas 1 a 10, as fichas TP1 a TP10, os projetos e os testes de 2026. As apresentações identificam Pedro C. Diniz e copyright de 2026. Os exemplos e as resoluções destas páginas foram escritos de novo.
- Thomas H. Cormen e outros, _Introduction to Algorithms_, bibliografia obrigatória indicada na ficha. É a referência para as provas de grafos, programação dinâmica, reduções e otimização.

O arquivo do Moodle inclui vídeos de apoio, mas a revisão destas páginas assenta nos documentos escritos. Não se presume que todos os vídeos foram vistos. A [ocorrência de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586994) ainda não tem informação suficiente para confirmar a equivalência do programa ou da avaliação.
:::

:::details[Vídeos para dúvidas concretas]
Estes vídeos em inglês são complementos do MIT OpenCourseWare. As ligações e os temas foram conferidos nas páginas oficiais; não substituem os materiais da FEUP nem pressupõem que o vídeo inteiro foi visto. Cada vídeo vive na lição do conceito que ajuda a visualizar.

- A escolha local segura na MST, em [A propriedade do corte](/cadeiras/da/arvores-abrangentes/#a-propriedade-do-corte).
- A passagem de recursão repetida a estados guardados, em [Definir antes de preencher](/cadeiras/da/programacao-dinamica/#definir-antes-de-preencher).
- A execução e o certificado de otimalidade no fluxo máximo, em [Corte mínimo como prova do resultado](/cadeiras/da/fluxo-maximo/#corte-m%C3%ADnimo-como-prova-do-resultado).
  :::
