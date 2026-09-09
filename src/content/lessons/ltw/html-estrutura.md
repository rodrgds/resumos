---
title: HTML e estrutura semântica
description: Documentos HTML5, semântica, formulários acessíveis, tabelas e validação com diagnóstico de erros.
section: conteudo
order: 1
---

O HTML descreve a estrutura da página: o que é um título, o que é um parágrafo, onde começa um formulário. O navegador usa essa estrutura para mostrar a página, e os leitores de ecrã e os motores de pesquisa usam-na para a entender. Escrever bom HTML é escolher a etiqueta certa para cada pedaço de conteúdo, não empilhar `div` genéricos.

## O esqueleto mínimo

Toda a página HTML5 começa com a mesma base. Guarda isto em `produto.html`:

```html
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <title>Queijo da Serra : Mercearia</title>
    <link rel="stylesheet" href="estilo.css" />
  </head>
  <body>
    <header>
      <h1>Mercearia Central</h1>
      <nav><a href="index.html">Início</a></nav>
    </header>
    <main>
      <article>
        <h2>Queijo da Serra</h2>
        <p>Curado 60 dias. Preço: 8,50 €.</p>
      </article>
    </main>
  </body>
</html>
```

O `<!DOCTYPE html>` diz ao navegador que isto é HTML5. O atributo `lang="pt"` indica a língua da página. O `head` guarda metadados que não aparecem no corpo, como o título do separador e a folha de estilo. No `body`, cada etiqueta declara o papel do conteúdo: `header` é o cabeçalho, `nav` é a navegação, `main` é o conteúdo principal e `article` é uma peça autónoma, neste caso o produto.

Usa sempre a etiqueta com o significado certo: `h1` a `h6` para títulos por ordem sem saltos, `p` para parágrafos, `ul` ou `ol` para listas, `table` para dados tabulares. Um leitor de ecrã anuncia "navegação" ao entrar num `nav` e permite saltar de título em título; com `div` em todo o lado, essa ajuda desaparece.

## Formulários acessíveis

O formulário de encomenda mostra a regra de ouro da acessibilidade: cada campo tem uma `label` ligada ao campo pelo atributo `for`, que repete o `id` do campo.

```html
<form action="encomenda.php" method="post">
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome" required />
  <label for="qtd">Quantidade:</label>
  <input type="number" id="qtd" name="qtd" min="1" value="1" />
  <button type="submit">Encomendar</button>
</form>
```

Clicar no texto "Nome:" põe o cursor no campo, porque a `label` está ligada a ele. O atributo `name` é o nome que viaja para o servidor com o valor preenchido; sem `name`, o campo não é enviado. O `required` e o `min="1"` pedem ao navegador para validar antes de enviar, sem JavaScript. Escolhe o `type` certo para cada dado: `email`, `number`, `date` e `tel` dão teclados adequados no telemóvel e validação gratuita.

:::tip[Não peças ao utilizador o que podes validar]
Se a quantidade mínima é 1, escreve `min="1"` em vez de confiares que ninguém escreve zero. Cada restrição declarada no HTML é um erro que nunca chega ao servidor.
:::

## Tabelas para dados, não para layout

A lista de preços da mercearia é uma tabela, com cabeçalho em `th` e legenda em `caption`:

```html
<table>
  <caption>
    Preços por quilo
  </caption>
  <tr>
    <th>Produto</th>
    <th>Preço</th>
  </tr>
  <tr>
    <td>Queijo da Serra</td>
    <td>8,50 €</td>
  </tr>
  <tr>
    <td>Presunto</td>
    <td>12,00 €</td>
  </tr>
</table>
```

Reserva as tabelas para dados que fazem sentido em linhas e colunas. Para dispor a página em colunas usa CSS, que é o tema da [próxima página](css-estilo-layout/).

## Validar e diagnosticar

O validador do W3C lê a tua página e aponta os erros de estrutura. Cola lá o exemplo seguinte, que tem um erro clássico de aninhamento:

```html
<p>Em promoção:
  <div>Queijo da Serra</div>
</p>
```

O validador queixa-se de que o `div` não pode viver dentro de um `p`. Isto acontece porque o parágrafo só aceita conteúdo de texto e etiquetas em linha; o navegador fecha o `p` mais cedo do que esperas e a página parte-se em dois blocos. A correção é trocar o `p` exterior por um `div`, ou o `div` interior por um `span`. Quando o layout sair estranho sem razão aparente, valida primeiro: nove em cada dez mistérios destes são etiquetas mal aninhadas ou por fechar.

:::warning[O erro mais comum]
Esquecer o `name` nos campos do formulário e depois queixar-se de que o servidor "não recebe nada". O navegador só envia campos com `name`. Confere sempre os nomes antes de culpares o PHP.
:::
