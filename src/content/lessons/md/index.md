---
title: Matemática Discreta
description: Lógica e provas, inteiros, conjuntos, relações, funções, grafos e indução, com exercícios resolvidos.
order: 0
editorial:
  basedOn: 2024/25
  review:
    edition: 2026/27
    reviewer: Codex
    date: '2026-10-03'
  sources:
    - title: MD no Moodle da FEUP, 2024/25
      url: https://moodle2425.up.pt/course/view.php?id=5100
    - title: Ficha de MD no SIGARRA, 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586983
  gaps:
    - Os materiais docentes de 2026/27 não foram consultados; a base das lições continua a ser 2024/25.
---

No fim desta cadeira vais conseguir traduzir frases para lógica, provar afirmações sobre inteiros, conjuntos, relações e grafos, e argumentar por indução. Ou seja, não basta calcular o resultado, porque cada passo precisa de justificação e dos casos que a podem refutar.

Vamos seguir o percurso abaixo pela ordem, pois cada bloco usa a linguagem do anterior. Tenta os exercícios no fim de cada lição antes de abrir as pistas. Numa prova, escreve a hipótese usada em cada passo. A [cheat sheet](/cadeiras/md/folha-consulta/) reúne as condições dos métodos para revisão.

## Percurso de estudo

O primeiro bloco trata da linguagem das provas:

1. [Lógica proposicional](/cadeiras/md/logica-proposicional/): fórmulas, tabelas, consequência, formas normais e completude de conetivas.
2. [Dedução proposicional](/cadeiras/md/provas-proposicionais/): regras de base, caixas de Fitch, casos e contradições.
3. [Quantificadores](/cadeiras/md/quantificadores/): termos, traduções, variáveis livres e substituição sem captura.
4. [Estruturas e formas prenexas](/cadeiras/md/semantica-primeira-ordem/): avaliação, modelos e contraestruturas.
5. [Dedução de primeira ordem](/cadeiras/md/provas-primeira-ordem/): igualdade, testemunhas e variáveis novas.

O segundo aplica as provas a estruturas discretas:

6. [Inteiros e congruências](/cadeiras/md/inteiros-congruencias/): Euclides, Bézout, inversos e equações modulares.
7. [Conjuntos e equivalências](/cadeiras/md/conjuntos-relacoes/): operações, produtos, classes e partições.
8. [Operações de relações](/cadeiras/md/operacoes-relacoes/): matrizes, composição, potências e fechos.
9. [Ordens](/cadeiras/md/ordens-funcoes/): Hasse, comparabilidade, minimais, ínfimos e supremos.
10. [Funções e cardinalidade](/cadeiras/md/funcoes-cardinalidade/): domínio, imagem, bijeções e inversas.
11. [Grafos](/cadeiras/md/grafos/): graus, percursos, componentes, árvores e isomorfismos.
12. [Euler, Hamilton, planaridade e coloração](/cadeiras/md/euler-hamilton-coloracao/): critérios, construções e obstruções.
13. [Indução e recorrências](/cadeiras/md/inducao-recorrencia/): bases, hipótese, chamadas menores e soluções de sequências.
14. [Indução estrutural](/cadeiras/md/inducao-estrutural/): conjuntos recursivos, palavras, listas e provas de programas.

Os exercícios estão no fim da lição que os explica.

:::details[Fontes, anos e âmbito]

A base são os materiais docentes de **MD 2024/25 no Moodle da FEUP**: as onze apresentações teóricas, as onze fichas principais, problemas adicionais, o formulário e provas com resoluções. As aulas de lógica e inteiros são de João Barbosa; as de conjuntos, relações, funções, grafos e indução são de Hugo Pacheco. As apresentações de grafos e indução disponibilizadas nessa edição mantêm **2023/24 na capa**. As restantes apresentações identificam 2024/25. O percurso inclui todos estes blocos.

As explicações são escritas com palavras próprias. Os exercícios misturam problemas próprios e adaptações dos tipos pedidos nas fichas e provas, com contas e argumentos conferidos. Recorrências lineares completam o estudo de sequências e recursão. A notação segue as aulas: $0\in\mathbb N$, $\equiv_n$ para congruência e caixas de Fitch com regras de base. Os materiais Moodle exigem acesso à cadeira e não são republicados aqui.

A [ficha de 2026/27 no SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586983) confirma os blocos do programa e indica como bibliografia obrigatória:

- Ralph P. Grimaldi, _Discrete and Combinatorial Mathematics: An Applied Introduction_.
- Michael Huth e Mark Ryan, _Logic in Computer Science_.
- Edgar G. Goodaire e Michael M. Parmenter, _Discrete Mathematics with Graph Theory_.

Para aprofundar grafos, indução e sequências há também o livro aberto [Discrete Mathematics: An Open Introduction, de Oscar Levin](https://discrete.openmathbooks.org/dmoi3.html), 3.ª edição. É uma referência adicional, não bibliografia adotada pela FEUP.

:::

:::details[Avaliação de 2026/27]

A [ficha de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586983), consultada em 3 de outubro de 2026, define:

$$
F=0{,}2EX+0{,}4PT+0{,}4ST,
$$

onde $EX$ é a classificação dos exercícios avaliados nas práticas e $PT,ST$ são as dos dois testes. Para aprovação, exige $EX>0$, pelo menos 6 valores em cada teste e $F\ge9{,}5$. A frequência exige respeitar o limite legal de faltas; a assiduidade obtida num ano vale também para o seguinte.

O recurso abrange toda a matéria, sem divisão em partes. A sua nota passa a ser a classificação da cadeira. A melhoria também se faz nesse exame. Para trabalhadores-estudantes, a ficha prevê, por opção do estudante, $F=0{,}5PT+0{,}5ST$, com os mesmos mínimos dos testes e da nota final.

Os materiais de 2024/25 usavam dois testes com peso de 50% cada e recurso por partes. Essas regras antigas não se aplicam à edição atual. Os materiais docentes de 2026/27 não foram consultados; confirma no teu Moodle o calendário e as indicações sobre cada avaliação.

:::
