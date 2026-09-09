---
title: Teoria da Computação
description: O que é computável, que linguagens os autómatos reconhecem e onde começam os limites.
section: conteudo
order: 0
---

O que é que um computador consegue, em princípio, calcular? E há problemas que nenhum computador consegue resolver, por mais tempo e memória que tenha? A Teoria da Computação responde a estas perguntas com modelos matemáticos precisos: autómatos finitos, autómatos de pilha e máquinas de Turing. É uma cadeira formal e virada para provas, no seguimento natural de [MD](/cadeiras/md/logica-proposicional/), onde treinaste definições, conjuntos e indução.

## Como está organizada

1. [Linguagens e expressões regulares](linguagens-expressoes/): alfabetos, palavras, operações sobre linguagens e a notação compacta das expressões regulares.
2. [Autómatos finitos](automatos-finitos/): determinísticos e não determinísticos, conversão entre eles e minimização.
3. [Limites das linguagens regulares](limites-regulares/): o lema da repetição, propriedades de fecho e decidibilidade.
4. [Gramáticas livres de contexto](gramaticas-livres/): derivações, árvores sintáticas, ambiguidade e forma normal de Chomsky.
5. [Autómatos de pilha](automatos-pilha/): a pilha como memória, um autómato para $\{0^n 1^n\}$ e a equivalência com gramáticas.
6. [Máquinas de Turing e decidibilidade](turing-decidibilidade/): o modelo geral de computação, decidível contra reconhecível e o problema da paragem.
7. [Complexidade](complexidade/): P contra NP, reduções polinomiais e NP-completude.

Lê por esta ordem: cada página usa definições das anteriores. A página sobre [indução](/cadeiras/md/inducao-recorrencia/) de MD é o pré-requisito mais usado, porque quase todas as provas sobre palavras e computações são por indução no comprimento da palavra ou no número de passos.

## Como estudar

Cada conceito novo aqui vem com três partes: a definição precisa, pelo menos uma prova e pelo menos um contraexemplo. Treina as três. É pouco útil "perceber a ideia" do lema da repetição sem conseguir escrever a prova completa de que $\{0^n 1^n\}$ não é regular, com constantes, escolha do adversário, divisão em casos e contradição. E é pouco útil decorar que "NFA equivale a DFA" sem conseguir correr a construção de subconjuntos num exemplo pequeno.

Um bom hábito por página:

- Copia cada definição à mão, com os quantificadores todos. Se a definição de DFA tem 5 componentes, escreve as 5.
- Refaz cada prova sem olhar, verificando que nenhum passo usa algo por provar.
- Para cada teorema "se A então B", pergunta: e se A falhar? O contraexemplo correspondente é quase sempre um exercício de teste.

:::tip[Provas pedem técnica de MD]
Se uma prova emperra, volta às [provas com condicionais](/cadeiras/md/provas-proposicionais/) e aos [conjuntos e relações](/cadeiras/md/conjuntos-relacoes/). A maior parte dos erros em TC não é "não perceber autómatos", é perder um quantificador ou confundir pertença com inclusão a meio da prova.
:::

## Avaliação

O regime de avaliação varia de ano para ano, por isso confirma sempre o que vale neste momento na [ficha da unidade curricular no SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560095) e na página da cadeira no Moodle. Tipicamente há exame final com exercícios de construção (autómatos, gramáticas, expressões regulares) e de prova (lema da repetição, decidibilidade, reduções), por isso estas páginas insistem nos dois formatos.

## Fontes e âmbito

Estas páginas seguem a ficha de L.EIC010 Teoria da Computação, 2025/26, 2S ([ver no SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560095)). O programa coberto é: linguagens e expressões regulares; autómatos finitos determinísticos e não determinísticos e minimização; lema da repetição; linguagens e gramáticas independentes de contexto; autómatos de pilha; introdução às máquinas de Turing; computabilidade e complexidade. A exposição usa notação padrão da área (Sipser), adaptada ao programa da FEUP. Quando uma definição tiver variantes entre fontes, estas páginas dizem qual usam.
