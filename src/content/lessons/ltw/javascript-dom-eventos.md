---
title: JavaScript no cliente e DOM
description: Sintaxe de JavaScript, funções, DOM, eventos, propagação e validação de formulários.
section: conteudo
order: 4
---

O PHP monta a página no servidor antes de a enviar. O JavaScript corre no navegador depois de a página chegar e mexe nela sem pedir nada ao servidor. Vens de [funções em Python](/cadeiras/fp/funcoes/) e de [tipos estáticos em C++](/cadeiras/p/cpp-fundamentos/): o JavaScript tem funções parecidas com as de Python mas tipagem dinâmica ainda mais solta do que a do PHP, com conversões que surpreendem.

## Sintaxe sem surpresas, quase

Declara variáveis com `const` por omissão e `let` quando o valor muda. O `var` antigo tem regras de alcance estranhas e não o deves usar em código novo:

```js
const preco = 8.5;
let qtd = 2;
console.log('Total: ' + preco * qtd);
```

Isto escreve `Total: 17` na consola do navegador, que abres nas ferramentas de desenvolvimento. As funções são valores como outros quaisquer, por isso passam-se como argumentos, o que vais usar em todos os eventos:

```js
function soma(a, b) {
  return a + b;
}
const dobro = (x) => x * 2;
```

Quanto às conversões, decora os dois casos clássicos: `'8' + 1` dá `'81'` porque o `+` com texto concatena, mas `'8' - 1` dá `7` porque o `-` só sabe subtrair e converte. Quando um cálculo sair torto, converte explicitamente com `Number()` antes de culpares a lógica.

## Mexer na página pelo DOM

O DOM é a página vista como uma árvore de objetos: cada etiqueta é um nó que podes ler, criar e alterar. A lista de tarefas da mercearia, com adicionar e remover, cabe nestas linhas em `tarefas.js`:

```js
const lista = document.querySelector('#tarefas');
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = document.querySelector('#texto').value.trim();
  if (!texto) return;
  const li = document.createElement('li');
  li.textContent = texto;
  const btn = document.createElement('button');
  btn.textContent = 'Remover';
  btn.addEventListener('click', () => li.remove());
  li.append(btn);
  lista.append(li);
});
```

O `querySelector` escolhe elementos com a mesma sintaxe do CSS. O `addEventListener` regista uma função que corre quando o evento acontece: aqui, submeter o formulário cria um `li` novo com um botão que se remove a si próprio. O `preventDefault` impede o comportamento normal do formulário, que seria recarregar a página e deitar fora a lista. Repara que o texto entra por `textContent`, nunca por `innerHTML` com dados do utilizador: a razão está na página de [segurança](seguranca-web/).

## A propagação dos eventos

Um clique num botão dentro de um cartão dentro da página atravessa os três: primeiro desce do documento até ao botão (captura) e depois sobe de volta (propagação). Por omissão, os teus tratadores correm na subida. Experimenta este exercício com um botão dentro de uma `div`:

```js
document
  .querySelector('#caixa')
  .addEventListener('click', () => console.log('caixa'));
document.querySelector('#botao').addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('botão');
});
```

Clicar no botão escreve só "botão", porque o `stopPropagation` trava a subida e a caixa nunca fica a saber. Sem essa linha, escrevia "botão" e depois "caixa", e um tratador na caixa que fecha um menu ou apaga uma seleção disparava sem seres tu a querer. Quando um clique fizer duas coisas em vez de uma, procura o tratador esquecido algures na subida.

## Validar o formulário antes de enviar

O HTML já valida o básico com `required` e `type`, mas regras como "a data de entrega é depois de hoje" pedem JavaScript. Valida no evento de submissão e bloqueia o envio quando falhar:

```js
document.querySelector('#encomenda').addEventListener('submit', (e) => {
  const qtd = Number(document.querySelector('#qtd').value);
  if (!(qtd >= 1)) {
    e.preventDefault();
    document.querySelector('#erro').textContent = 'A quantidade mínima é 1.';
  }
});
```

A mensagem aparece num elemento reservado para erros, junto ao campo, em vez de numa caixa de alerta que interrompe tudo. E lembra-te do limite desta validação: ela ajuda o utilizador honesto, mas o servidor volta a validar tudo, porque um pedido pode ser forjado sem passar pelo teu formulário. A validação do cliente é cortesia; a do servidor é segurança.

:::tip[Depura na consola, não no escuro]
Quando nada acontecer ao clicar, abre a consola: o JavaScript para no primeiro erro e diz a linha. Um `console.log` antes e depois da linha suspeita mostra se o tratador correu e com que valores. Nove em cada dez bloqueios são um seletor mal escrito que devolveu `null`.
:::
