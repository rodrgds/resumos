---
title: Expressões regulares
description: Classes, quantificadores, grupos e âncoras, com validação em PHP, JavaScript e HTML.
section: conteudo
order: 7
---

Uma expressão regular descreve um formato de texto: que caracteres, em que ordem, quantas vezes. Serve para validar entradas como emails e datas, para limpar texto e para extrair pedaços. Aparece nas três frentes da cadeira: no atributo `pattern` do HTML, no `preg_match` do PHP e no `test` do JavaScript.

## As peças básicas

Uma expressão lê-se da esquerda para a direita, com cada peça a casar com um pedaço do texto:

- **Literais** casam consigo mesmos: `queijo` casa com "queijo".
- **Classes** listam alternativas: `[abc]` casa com uma das três letras, `[0-9]` com um dígito, `\d` também com um dígito, `\w` com letra, dígito ou `_`.
- **Quantificadores** repetem: `*` zero ou mais, `+` uma ou mais, `?` zero ou uma, `{2,4}` de duas a quatro vezes.
- **Âncoras** prendem às pontas: `^` ao início e `$` ao fim. Sem elas, a expressão casa com qualquer substring.
- **Grupos** com parênteses agrupam e capturam: `(ab)+` casa com "abab", e o conteúdo capturado pode ser reutilizado.

Lê `/^9\d{8}$/` em voz alta: começa (`^`), um `9`, oito dígitos (`\d{8}`), termina (`$`). É um telemóvel português com nove dígitos a começar por 9, como `912345678`. Cada peça traduz-se numa frase, e a frase completa é a especificação do formato.

## Validar nos três lados

O formulário de registo da mercearia pede email, data de nascimento e telemóvel. No HTML, o atributo `pattern` valida antes de enviar:

```html
<input type="text" name="tel" pattern="9[0-9]{8}"
       title="Nove dígitos a começar por 9">
```

No PHP, confirma no servidor com `preg_match`, que devolve 1 se casar:

```php
$ok = preg_match('/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/', $email);
```

No JavaScript, valida ao escrever com `test`, que devolve verdadeiro ou falso:

```js
const dataOk = /^\d{4}-\d{2}-\d{2}$/.test('2026-03-14');
```

Repara na divisão de trabalho: o HTML e o JavaScript ajudam o utilizador honesto no momento, e o PHP decide, porque só o servidor é de confiança. As três expressões dizem o mesmo de três formas; quando mudares uma regra, muda as três.

## O contraexemplo que parte a expressão ingénua

Para validar email, a primeira ideia é exigir "algo, arroba, algo, ponto, algo":

```js
const ingenua = /.+@.+\..+/;
ingenua.test('ana@example.com'); // true, parece funcionar
```

Funciona no caso bom e falha nos maus: aceita `a@b.c` (domínio de uma letra), aceita `ana @example.com`? Não, o espaço não casa com `.`? O ponto casa com qualquer caráter exceto quebra de linha, por isso casa com o espaço e aceita um email com espaços. E sem `^` e `$`, aceita `lixo ana@example.com lixo`, porque a expressão casa com a substring do meio. Cada atalho destes é um formato inválido que entra.

A versão da secção anterior corrige os três defeitos: classes restritas em vez de pontos, e âncoras nas pontas. Generaliza a lição: testa sempre cada expressão com um caso bom, um caso mau óbvio e um caso manhoso com espaços ou texto à volta. Se a expressão aceitar o manhoso, faltam âncoras ou as classes estão largas demais.

:::warning[Expressões regulares não fazem tudo]
Validar o formato do email não prova que o email existe: só uma mensagem de confirmação prova isso. E não uses expressões regulares para ler HTML ou XML: essas linguagens aninham-se, e as expressões regulares não contam aberturas e fechos. Para XML tens o [XPath](xml-xpath/).
:::
