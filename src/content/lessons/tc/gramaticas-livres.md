---
title: Gramáticas livres de contexto
description: Derivações, árvores sintáticas, ambiguidade e forma normal de Chomsky.
section: conteudo
order: 4
---

Uma **gramática livre de contexto** (CFG, de _context-free grammar_) gera palavras por substituição: cada regra troca um símbolo não terminal por uma sequência, independentemente do que está à volta (daí "livre de contexto"). São o formalismo por trás da sintaxe das linguagens de programação. Esta página mostra derivações, árvores, ambiguidade e a forma normal de Chomsky.

## Definição e derivações

Uma CFG é um quádruplo $G = (V, \Sigma, R, S)$ onde $V$ são as **variáveis** (não terminais), $\Sigma$ os **terminais** (o alfabeto, disjunto de $V$), $R$ as **regras** $A \to \alpha$ (com $A \in V$ e $\alpha$ uma sequência de variáveis e terminais) e $S \in V$ o **símbolo inicial**.

Uma **derivação** aplica regras até só restarem terminais. Escreve-se $\alpha \Rightarrow \beta$ para um passo e $\Rightarrow^*$ para zero ou mais passos. A linguagem gerada $L(G)$ é o conjunto das cadeias de terminais $w$ com $S \Rightarrow^* w$.

Exemplo: $G$ com variável $S$ e regras $S \to 0S1 \mid \varepsilon$ (lê $\mid$ como "ou"). Derivação de $0011$:

$$S \Rightarrow 0S1 \Rightarrow 00S11 \Rightarrow 00\varepsilon11 = 0011.$$

Cada aplicação de $S \to 0S1$ acrescenta um $0$ à esquerda e um $1$ à direita, por isso a gramática gera exatamente $\{0^n 1^n \mid n \ge 0\}$, a linguagem que os autómatos finitos não alcançam. Vês a diferença de poder: a variável $S$ no meio da forma sentencial funciona como memória ilimitada.

## Árvores sintáticas e ambiguidade

Uma **árvore sintática** (_parse tree_) mostra a estrutura da derivação: a raiz é $S$, cada nó interior é uma variável com os filhos dados por uma regra, e as folhas da esquerda para a direita formam a palavra.

Uma gramática é **ambígua** se alguma palavra tem duas árvores sintáticas distintas (ou, equivalentemente, duas derivações mais à esquerda distintas). Exemplo clássico, expressões aritméticas com $E \to E + E \mid E \times E \mid (E) \mid a$, e a palavra $a + a \times a$:

- Árvore 1: a raiz soma $(a + a)$ com $a$, ou seja $(a+a) \times a$. Lê o $\times$ no topo.
- Árvore 2: a raiz multiplica $a$ por $(a \times a)$ no ramo direito, ou seja $a + (a \times a)$. Lê o $+$ no topo.

As duas árvores dão valores diferentes ($2a^2$ contra $a + a^2$ com $a$ numérico), por isso um compilador não pode aceitar esta gramática: a mesma expressão teria dois significados. A cura é estratificar por precedência, com uma variável por nível:

$$E \to E + T \mid T, \quad T \to T \times F \mid F, \quad F \to (E) \mid a.$$

Agora $a + a \times a$ só deriva com o $+$ no topo, porque o $\times$ fica preso dentro de $T$. Em exercícios, "remove a ambiguidade" significa quase sempre isto: introduz níveis para precedência e recursão à esquerda ou à direita para associatividade.

:::warning[Ambiguidade é propriedade da gramática, não da linguagem]
Uma linguagem é **inerentemente ambígua** só quando _todas_ as gramáticas para ela são ambíguas (exemplo raro, fora do programa). Perante uma gramática ambígua, a primeira hipótese é reescrevê-la, como acima.
:::

## Forma normal de Chomsky

Uma CFG está na **forma normal de Chomsky** (CNF) se todas as regras têm uma destas formas: $A \to BC$ (duas variáveis), $A \to a$ (um terminal) ou $S \to \varepsilon$ (só no inicial). Toda a CFG pode ser convertida para CNF (adicionando variáveis para terminais em regras longas e partindo regras com mais de dois símbolos).

Para que serve? Em CNF, cada derivação de uma palavra $w$ de comprimento $n \ge 1$ usa exatamente $2n - 1$ passos: $n - 1$ regras binárias para ramificar em $n$ variáveis e $n$ regras terminais. Este número fixo permite o algoritmo CYK, que testa pertença $w \in L(G)$ por programação dinâmica sobre os comprimentos crescentes. Não precisas de decorar o CYK célula a célula, mas percebe a ideia: a CNF torna o custo da análise sintática previsível, e é por isso que os _parsers_ reais normalizam as gramáticas.

Exemplo de conversão: a regra $S \to 0S1$ viola a CNF (mistura terminais com variável e tem três símbolos). Introduz $A \to 0$, $B \to 1$ e parte em duas regras com variável fresca $C$: $S \to AC$, $C \to SB$, $S \to AB$, $A \to 0$, $B \to 1$, $S \to \varepsilon$.

## Para levar para a próxima página

Gramáticas geram de cima para baixo (do inicial até à palavra). Os [autómatos de pilha](automatos-pilha/) fazem o caminho inverso, reconhecendo de baixo para cima com a ajuda de uma pilha, e têm exatamente o mesmo poder.
