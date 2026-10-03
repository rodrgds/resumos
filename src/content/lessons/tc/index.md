---
title: Teoria da Computação
description: Um percurso para construir linguagens, autómatos e gramáticas, justificar as construções e reconhecer os seus limites.
order: 0
editorial:
  basedOn: 2024/25
  sources:
    - title: Moodle de TC, 2024/25
      url: https://moodle2425.up.pt/course/view.php?id=5426
    - title: Ficha de TC, SIGARRA 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586988
    - title: Ficha de TC, SIGARRA 2025/26
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560095
    - title: Resumos de Teoria da Computação, SofiaViP
      url: https://drive.google.com/file/d/1ZaJpvDv-iZNH-sjGor4iKEaCj9OZ5Wa6/view
  gaps:
    - Os livros da bibliografia não estavam disponíveis em texto integral para esta revisão.
    - A ficha de 2026/27 ainda não apresenta programa nem regras de avaliação.
  review:
    edition: 2026/27
    reviewer: Revisão editorial dos Resumos FEUP
    date: '2026-10-03'
---

TC transforma uma condição sobre dados num problema de pertença: dada uma palavra $w$, queremos saber se $w$ pertence à linguagem das entradas válidas. Estudamos máquinas com diferentes tipos de memória, construímos descrições equivalentes e provamos quando um modelo não chega.

## Percurso de estudo

1. [Palavras, linguagens e expressões](/cadeiras/tc/linguagens-expressoes/): distinguir símbolos, palavras e conjuntos, calcular operações e escrever provas por indução.
2. [Autómatos finitos](/cadeiras/tc/automatos-finitos/): escolher estados com significado, construir um DFA e provar o seu invariante.
3. [NFA e transições vazias](/cadeiras/tc/automatos-nao-deterministas/): seguir percursos alternativos, calcular fechos e determinizar.
4. [Converter expressões e autómatos](/cadeiras/tc/expressoes-automatos/): construção de Thompson e eliminação de estados.
5. [Propriedades e limites das regulares](/cadeiras/tc/limites-regulares/): produto, decisão, equivalência, minimização e lema da repetição.
6. [Gramáticas livres de contexto](/cadeiras/tc/gramaticas-livres/): construir regras, derivar palavras, desenhar árvores e tratar ambiguidade.
7. [Autómatos de pilha](/cadeiras/tc/automatos-pilha/): seguir configurações, distinguir critérios de aceitação e converter entre CFG e PDA.
8. [Propriedades das livres de contexto](/cadeiras/tc/propriedades-livres/): simplificação, CNF, CYK, fecho e lema da repetição.
9. [Máquinas de Turing e decidibilidade](/cadeiras/tc/turing-decidibilidade/): programar a fita, justificar terminação e distinguir reconhecimento de decisão.
10. [Complexidade](/cadeiras/tc/complexidade/): introdução ao custo dos algoritmos, certificados e reduções polinomiais.

Cada lição termina com exercícios próprios de dificuldade crescente, com pistas, resolução e erros frequentes. A [Cheat sheet](/cadeiras/tc/folha-consulta/) reúne condições e procedimentos para consulta depois de estudar.

Para uma construção, escreve primeiro o que cada estado ou variável significa. Depois segue uma palavra aceite, uma rejeitada e a palavra vazia. Por fim, justifica por que todas as entradas recebem a resposta certa. Para uma prova negativa pelo lema da repetição, distingue o que escolhes do que tens de considerar para qualquer decomposição.

Os pré-requisitos são conjuntos, funções, lógica e [indução de MD](/cadeiras/md/inducao-recorrencia/). Quando uma prova falha, confere os quantificadores antes de mudar a construção.

## Materiais e edição

A base é o [Moodle de TC de 2024/25](https://moodle2425.up.pt/course/view.php?id=5426), com materiais de Jácome Cunha e Luís Antunes. A apresentação, a introdução e os slides de DFA, NFA, ε-NFA, expressões regulares, linguagens regulares e CFG identificam 2024/25. O Moodle reutiliza também slides de PDA, propriedades de CFL e Turing que identificam 2023/24, e folhas práticas de propriedades de CFL e Turing que identificam 2022/23. Algumas folhas de 2024/25 conservam cabeçalhos de 2023/24 em páginas interiores.

O [segundo teste resolvido](https://moodle2425.up.pt/mod/resource/view.php?id=194400) identifica 13 de junho de 2024, apesar de estar nesse Moodle. Serve para reconhecer tipos de perguntas, como classificar gramáticas, seguir PDA e interpretar tabelas de Turing. Os exercícios destas páginas têm enunciados e resoluções próprios, não reproduzem esse teste.

A [ficha de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586988), consultada em 3 de outubro de 2026, confirma TC no segundo semestre, com 6 ECTS, mas ainda não apresenta programa nem avaliação. O percurso segue os materiais disponíveis de 2024/25.

A [ficha preenchida de 2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560095) inclui os mesmos modelos e propriedades. A página de complexidade desenvolve a ligação a computabilidade e custo dos algoritmos; o programa listado centra-se em linguagens formais e introdução às máquinas de Turing. Não se deve inferir a profundidade da avaliação de complexidade a partir desta extensão.

## Avaliação

A ocorrência de 2026/27 ainda não publica regras. A ficha de **2025/26**, consultada em 3 de outubro de 2026, indica dois testes escritos de 50% cada, mínimo de 6 valores em cada teste, frequência de pelo menos 75% das TP e exame de recurso com peso de 100%. Estas regras pertencem a essa ocorrência. Confirma as regras da tua edição no SIGARRA e no Moodle antes da prova; os materiais fornecidos não confirmam o regime de 2026/27.

## Fontes e bibliografia

Os recursos principais do Moodle são a [apresentação](https://moodle2425.up.pt/mod/resource/view.php?id=157341), [introdução](https://moodle2425.up.pt/mod/resource/view.php?id=157342), [DFA](https://moodle2425.up.pt/mod/resource/view.php?id=165362), [NFA](https://moodle2425.up.pt/mod/resource/view.php?id=169332), [ε-NFA](https://moodle2425.up.pt/mod/resource/view.php?id=172071), [expressões regulares](https://moodle2425.up.pt/mod/resource/view.php?id=175035), [propriedades das regulares](https://moodle2425.up.pt/mod/resource/view.php?id=177416), [CFG](https://moodle2425.up.pt/mod/resource/view.php?id=182282), [PDA](https://moodle2425.up.pt/mod/resource/view.php?id=186298), [propriedades de CFL](https://moodle2425.up.pt/mod/resource/view.php?id=186301) e [Turing](https://moodle2425.up.pt/mod/resource/view.php?id=192378). O acesso pode exigir autenticação da UP.

A bibliografia indicada pela cadeira é:

- Hopcroft, Motwani e Ullman, _Introduction to Automata Theory, Languages, and Computation_, edição Pearson de 2014, ISBN 978-1-292-03905-3. Os slides referem também a 3.ª edição de 2007.
- Hopcroft, Motwani e Ullman, _Introdução à teoria de autômatos, linguagens e computação_, 2003, ISBN 85-352-1072-5.
- Michael Sipser, _Introduction to the Theory of Computation_, 2.ª edição, 2006, ISBN 0-619-21764-2.
- Thomas Sudkamp, _Languages and Machines_, 1988, ISBN 0-201-15768-3.

Os textos integrais destes livros não estavam disponíveis para esta revisão. As explicações foram reconstruídas a partir dos slides e folhas práticas disponíveis. O arquivo de [xico2001pt/FEUP-TCOM](https://github.com/xico2001pt/FEUP-TCOM) conserva materiais históricos de 2020/21. Os [resumos de SofiaViP](https://drive.google.com/file/d/1ZaJpvDv-iZNH-sjGor4iKEaCj9OZ5Wa6/view) são uma referência de consulta anterior, sem uma edição atual identificada. Nenhuma destas origens antigas confirma regras da edição atual.
