---
title: CSS, caixa e layout
description: Seletores, cascata e especificidade, modelo de caixa, flexbox, grelha e desenho responsivo.
section: conteudo
order: 2
---

O CSS veste o [esqueleto HTML](html-estrutura/): escolhe que elementos pintar, como se mede cada caixa e como as caixas se dispõem na página. São três mecanismos separados: os seletores dizem onde aplicar, a cascata decide quem ganha em caso de conflito e os modos de layout posicionam as caixas.

## Seletores e a conta da especificidade

Quando duas regras pintam o mesmo elemento de cores diferentes, ganha a mais específica. A especificidade conta-se em três colunas: identificadores (`#id`), classes e pseudo-classes (`.classe`, `:hover`), e elementos (`p`, `li`). Compara estas duas regras para o preço na lista de produtos:

```css
#produtos .preco {
  color: red;
}
ul#produtos li span.preco {
  color: green;
}
```

A primeira conta 1 identificador, 1 classe e 0 elementos: escreve-se (1, 1, 0). A segunda conta 1 identificador (`#produtos`), 1 classe (`.preco`) e 3 elementos (`ul`, `li`, `span`): (1, 1, 3). Compara coluna a coluna da esquerda para a direita; a segunda regra empata nas duas primeiras e ganha na terceira, por isso o preço sai verde. Um estilo em linha no atributo `style` ganha a todas, e o `!important` ganha a tudo menos a outro `!important`: evita os dois, porque transformam a cascata num leilão sem regras.

:::tip[Como desempatar em teste]
Escreve os trios lado a lado e compara da esquerda para a direita, como números de três dígitos. (1, 0, 5) ganha a (0, 12, 0): um identificador vale mais do que qualquer número de classes.
:::

## O modelo de caixa

Cada elemento é uma caixa com quatro camadas, de dentro para fora: conteúdo, enchimento (`padding`), borda (`border`) e margem (`margin`). A largura que declaras cobre por omissão só o conteúdo, e o enchimento e a borda somam-se por fora, o que parte contas de layout. A primeira linha de quase todas as folhas de estilo resolve isto:

```css
* {
  box-sizing: border-box;
}
```

Com `border-box`, a largura declarada inclui conteúdo, enchimento e borda, e o cartão de produto com `width: 200px` mede mesmo 200 píxeis. As margens verticais de blocos vizinhos colapsam: ficam com a maior das duas, não com a soma. Quando um espaço vertical teimar em não obedecer à soma, suspeita de colapso de margens antes de somares enchimentos.

## Dispor cartões com flexbox e grelha

A montra da mercearia é uma fila de cartões que se ajusta ao ecrã. A grelha trata das colunas, e o flexbox do interior de cada cartão:

```css
.montra {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.cartao {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 1rem;
}
.cartao button {
  margin-top: auto;
}
```

A grelha cria tantas colunas de 200 píxeis quantas couberem e parte para a linha seguinte sozinha. Dentro de cada cartão, a coluna flexível empurra o botão para o fundo com `margin-top: auto`, por isso todos os botões ficam alinhados mesmo quando os nomes dos produtos têm tamanhos diferentes. Regra prática: grelha para a página e para conjuntos de cartões, flexbox para alinhar coisas dentro de uma caixa.

## Desenho responsivo com media queries

No telemóvel, a montra de várias colunas passa a uma só, e o menu horizontal passa a vertical:

```css
@media (max-width: 600px) {
  .montra {
    grid-template-columns: 1fr;
  }
  nav a {
    display: block;
  }
}
```

Testa com as ferramentas de desenvolvimento do navegador, que simulam larguras de telemóvel sem saíres do computador. Desenha primeiro para o ecrã pequeno e acrescenta colunas com `min-width` à medida que o ecrã cresce: é mais fácil alargar do que espremer.

:::details[Ver o raciocínio do mobile first]
Começa com uma coluna e sem floreados: tudo o que é essencial aparece. Depois, para ecrãs com pelo menos 600 píxeis, liga a grelha de cartões; para ecrãs grandes, alarga o conteúdo com uma largura máxima centrada. Cada media query acrescenta, nenhuma remenda. Se um elemento só faz sentido no computador, pergunta se faz sentido de todo.
:::
