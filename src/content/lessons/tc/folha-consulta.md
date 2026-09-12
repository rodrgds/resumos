---
title: Cheat sheet de TC
description: Definições, construções e limites de autómatos, gramáticas e máquinas de Turing para consulta rápida.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos de Teoria da Computação, SofiaViP
      url: https://drive.google.com/file/d/1ZaJpvDv-iZNH-sjGor4iKEaCj9OZ5Wa6/view
  coverage: Síntese das páginas 2 a 13 dos Resumos TC de SofiaViP, incluindo o quadro final de métodos e propriedades.
  gaps:
    - A fonte não identifica uma edição atual da cadeira; confirma o programa e a notação da tua ocorrência.
    - Esta folha omite provas completas, construções desenhadas e a análise detalhada de NP-completude; segue os links para as explicações.
---

Usa-a para escolher uma construção ou verificar as hipóteses de um teorema.

## Palavras, linguagens e expressões

- $\Sigma$ é um alfabeto finito; $\Sigma^k$ contém as palavras de comprimento $k$ e $\Sigma^*$ inclui todos os comprimentos, incluindo $\varepsilon$. Uma linguagem é um subconjunto de $\Sigma^*$. Não confundas a linguagem vazia $\emptyset$ com $\{\varepsilon\}$: $\emptyset^*=\{\varepsilon\}$. [Ver alfabetos e palavras](/cadeiras/tc/linguagens-expressoes/#alfabetos-e-palavras).
- Para linguagens $A,B$, a concatenação é $AB=\{xy\mid x\in A,\ y\in B\}$; $A^*=\bigcup_{k\ge0}A^k$. Nas expressões regulares da teoria, as operações básicas são união, concatenação e estrela. Uma implementação de _regex_ com referências a grupos pode descrever mais do que estas expressões. [Ver expressões regulares](/cadeiras/tc/linguagens-expressoes/#expressões-regulares).

## Autómatos finitos: construir e comparar

| Tarefa                           | Procedimento curto                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simular DFA                      | Seguir a única transição por símbolo; aceitar se o estado final está em $F$.                                                                            |
| Simular NFA ou $\varepsilon$-NFA | Manter o conjunto de estados possíveis; aplicar o fecho-$\varepsilon$ antes e depois de consumir símbolos. Aceita se **algum** percurso termina em $F$. |
| NFA $\to$ DFA                    | Cada estado novo é um subconjunto de $Q$; começar no fecho-$\varepsilon$ de $\{q_0\}$ e marcar os subconjuntos que intersectam $F$.                     |
| Expressão $\to$ autómato         | Construir fragmentos para $\emptyset$, $\varepsilon$ e símbolos; combinar por união, concatenação e estrela (Thompson).                                 |
| Autómato $\to$ expressão         | Eliminar estados ou somar expressões dos caminhos, atualizando os caminhos que passam pelo estado removido.                                             |

Num DFA, $\delta:Q\times\Sigma\to Q$ é total; se faltar uma transição, acrescenta um estado poço. Isto é indispensável antes de obter o **complemento** trocando finais e não finais. [Ver DFA e NFA](/cadeiras/tc/automatos-finitos/#dfa-definição-e-leitura) e [construção de subconjuntos](/cadeiras/tc/automatos-finitos/#de-nfa-para-dfa-construção-de-subconjuntos).

Para **minimizar** um DFA, elimina primeiro os estados inacessíveis. Distingue pares final/não final; depois distingue um par se alguma letra o leva a outro par já distinguido. Os pares restantes podem ser fundidos em classes de equivalência. Para testar $L(A)=L(B)$, procura no produto um estado alcançável onde apenas um dos dois componentes é final. [Ver minimização](/cadeiras/tc/automatos-finitos/#minimização-por-preenchimento-de-tabela) e [equivalência](/cadeiras/tc/automatos-finitos/#teste-de-equivalência).

As regulares são fechadas para união, concatenação, estrela, interseção, complemento, diferença e reverso. Para provar que $L$ **não** é regular, também podes escolher uma regular $R$ e mostrar que $L\cap R$ é uma linguagem não regular conhecida. [Ver fecho e decisão](/cadeiras/tc/limites-regulares/#propriedades-de-fecho).

**Lema da repetição regular.** Se $L$ é regular, existe $p$ tal que cada $s\in L$, $|s|\ge p$, admite $s=xyz$ com $|y|>0$, $|xy|\le p$ e $xy^iz\in L$ para **todo** $i\ge0$. Numa refutação, fixa $p$, escolhe $s$ em função dele, considera **qualquer** decomposição válida e encontra um $i$ que sai de $L$. O lema não prova regularidade. [Ver lema e prova](/cadeiras/tc/limites-regulares/#o-lema-da-repetição).

## Gramáticas e autómatos de pilha

Uma CFG é $G=(V,\Sigma,P,S)$: variáveis, terminais, produções e símbolo inicial. Uma palavra pertence à linguagem se $S\Rightarrow^*w$ e $w$ só contém terminais. Derivações mais à esquerda e mais à direita mudam a ordem de expansão; há **ambiguidade** quando uma palavra tem duas árvores sintáticas distintas. [Ver derivações](/cadeiras/tc/gramaticas-livres/#definição-e-derivações) e [ambiguidade](/cadeiras/tc/gramaticas-livres/#árvores-sintáticas-e-ambiguidade).

Um PDA acrescenta uma pilha ao controlo finito. A configuração deve registar estado, entrada por ler e conteúdo da pilha; cada passo pode ler um símbolo ou $\varepsilon$, consultar o topo e substituí-lo. Aceitação por estado final e por pilha vazia são convenções distintas, mas equivalentes quanto às linguagens reconhecidas. CFG e PDA descrevem precisamente as linguagens livres de contexto. [Ver modelo](/cadeiras/tc/automatos-pilha/#o-modelo) e [equivalência CFG–PDA](/cadeiras/tc/automatos-pilha/#pda-equivale-a-cfg).

| Para uma CFG            | Condição ou método                                                                                                                                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Forma normal de Chomsky | Produções $A\to BC$ ou $A\to a$; admite-se $S\to\varepsilon$ se $\varepsilon\in L$, com inicial novo quando necessário. Eliminar símbolos inúteis, produções-$\varepsilon$ e unitárias antes de decompor corpos longos. |
| CYK                     | Para uma palavra não vazia e gramática em FNC, preencher células de substrings curtas para longas; combinar $B,C$ quando existe $A\to BC$. A palavra pertence se $S$ está na célula total.                              |

[Ver forma normal](/cadeiras/tc/gramaticas-livres/#forma-normal-de-chomsky) e [CYK](/cadeiras/tc/gramaticas-livres/#cyk-numa-tabela-pequena).

**Lema da repetição livre de contexto.** Se $L$ é livre de contexto, existe $p$ tal que cada $z\in L$, $|z|\ge p$, pode ser escrito $z=uvwxy$, com $|vwx|\le p$, $|vx|>0$ e $uv^iwx^iy\in L$ para todo $i\ge0$. Para refutar, tens de cobrir todas as posições possíveis da janela $vwx$ e mostrar uma escolha de $i$ que falha. Tal como no caso regular, satisfazer o lema não prova pertença à classe.

As linguagens livres de contexto são fechadas para união, concatenação, estrela, reverso e interseção com uma **regular**. Não são fechadas em geral para interseção entre si nem para complemento; a substituição e o homomorfismo exigem as definições apropriadas.

## Turing, decisão e custo

Uma máquina de Turing tem controlo finito, fita, cabeça de leitura/escrita e transições que podem mudar o símbolo e mover a cabeça. **Reconhecer** $L$ exige aceitar todas as palavras de $L$; para palavras fora de $L$, a máquina pode rejeitar ou nunca parar. **Decidir** exige parar com resposta em todas as entradas. Se $L$ e $\overline L$ são reconhecíveis, $L$ é decidível: corre os dois reconhecedores em alternância até um aceitar. [Ver modelo](/cadeiras/tc/turing-decidibilidade/#o-modelo-fita-cabeça-estados) e [decidível contra reconhecível](/cadeiras/tc/turing-decidibilidade/#decidível-contra-reconhecível).

$A_{TM}=\{\langle M,w\rangle\mid M\text{ aceita }w\}$ é reconhecível e indecidível. O problema da paragem também é indecidível. Não confundas **indecidível** (sem algoritmo que termine sempre) com **difícil** (algoritmo existe, mas pode exigir muito tempo). [Ver problema da paragem](/cadeiras/tc/turing-decidibilidade/#o-problema-da-paragem-é-indecidível).

Em complexidade, $\mathrm P$ reúne problemas de decisão resolúveis em tempo polinomial; $\mathrm{NP}$ reúne os cujas respostas «sim» têm certificados verificáveis em tempo polinomial. Uma redução polinomial $A\le_p B$ transforma instâncias e preserva a resposta; se $A$ é difícil e reduz para $B$, essa dificuldade passa a $B$. Uma prova de NP-completude exige mostrar $B\in\mathrm{NP}$ **e** reduzir para $B$ um problema já NP-completo. [Ver P e NP](/cadeiras/tc/complexidade/#p-resolver-depressa) e [reduções](/cadeiras/tc/complexidade/#reduções-polinomiais).
