---
title: Análise sintática
description: Gramáticas, árvores sintáticas, ambiguidade com precedência e construção de analisadores descendentes.
section: conteudo
order: 3
---

A análise sintática (_parsing_) recebe os símbolos do léxico e verifica se formam frases válidas da linguagem, produzindo a **árvore sintática** que todas as fases seguintes consomem. A gramática que define a sintaxe é uma [gramática livre de contexto](/cadeiras/tc/gramaticas-livres/): se já dominas derivação, árvores e ambiguidade, esta página é a aplicação direta disso a um compilador.

## Da gramática ingénua à gramática com precedência

A gramática ingénua de expressões, $E \to E + E \mid E \times E \mid (E) \mid \text{id} \mid \text{num}$, é ambígua: `a + a * a` tem duas árvores, uma com o `+` no topo e outra com o `×` no topo, que significam cálculos diferentes. Um compilador não pode adivinhar, por isso a gramática estratifica-se por precedência, um nível por operador:

$$E \to E + T \mid T, \quad T \to T \times F \mid F, \quad F \to (E) \mid \text{id} \mid \text{num}.$$

Agora deriva `a + a * a` e só há um caminho: o `+` fica no topo porque a soma vive no nível $E$, enquanto o produto fica preso dentro de $T$ no ramo direito. A árvore resultante calcula $(a + (a \times a))$, a leitura correta. A associatividade à esquerda vem da recursão à esquerda ($E \to E + T$): `a + a + a` agrupa como $((a+a)+a)$.

## Construir o analisador

Duas famílias de analisadores dominam:

- **Descendentes** (_top-down_, LL): constroem a árvore da raiz para as folhas, prevendo a regra a aplicar a partir do próximo símbolo. São os que escreves à mão com mais facilidade: uma função por não terminal. Exigem gramáticas sem recursão à esquerda e com decisão local, o que muitas vezes obriga a transformar a gramática primeiro.
- **Ascendentes** (_bottom-up_, LR): leem os símbolos empilhando e reduzem para não terminais quando reconhecem o lado direito de uma regra. Aceitam uma classe maior de gramáticas e são os gerados por ferramentas clássicas. No projeto, o gerador usado (por exemplo o ANTLR) constrói o analisador a partir da gramática que escreves, e perceber o que ele espera evita metade dos conflitos.

Um conflito típico é o `else` pendente: numa gramática com `if (E) S` e `if (E) S else S`, um `else` pode pertencer a dois `if`s abertos. A convenção resolve sempre para o `if` mais próximo, e a gramática do projeto deve refletir essa decisão em vez de a deixar ao acaso.

## Erros sintáticos úteis

Quando o próximo símbolo não cabe em nenhuma continuação válida, o analisador para e deve dizer onde e o que esperava: "erro sintático na linha 7, coluna 12: esperava `;`". A recuperação simples é o modo de pânico: descartar símbolos até um ponto de sincronização (como `;` ou `}`) e continuar, para reportar vários erros numa passagem. No projeto, boas mensagens valem pontos e poupam horas de depuração, por isso trata o erro como parte da gramática, não como remendo final.

:::warning[O erro mais comum]
Aceitar a gramática ambígua e "resolver depois". Não há depois: a árvore errada propaga-se à semântica e ao código gerado. Sempre que dois operadores partilham o nível, estratifica antes de gerar o analisador.
:::

## Para levar para a próxima página

A árvore está correta na forma, mas ainda não se sabe se faz sentido: `a + b` com `b` por declarar é sintaticamente perfeito e semanticamente errado. A [análise semântica](analise-semantica/) trata disso com a tabela de símbolos.
