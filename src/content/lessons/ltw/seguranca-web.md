---
title: Segurança web
description: Injeção SQL, XSS, CSRF, travessia de caminho, HTTPS e guarda de palavras passe, com correção guiada.
section: conteudo
order: 6
---

Todas as páginas que escreveste até aqui confiam no utilizador: mostram o que ele escreve, executam o que ele envia, abrem o ficheiro que ele pede. A segurança web é inverter essa confiança por omissão. Cada ataque desta página explora um sítio onde o programador misturou dados com instruções; cada defesa volta a separá-los.

## Injeção SQL: nunca colar entrada no SQL

A página de pesquisa do [PHP](php-dinamicas-bd/) já usa a defesa certa, por isso vê primeiro o ataque contra a versão ingénua. Se o código colar o parâmetro no SQL:

```php
$sql = "SELECT nome, preco FROM produtos WHERE nome LIKE '%$termo%'";
```

então pesquisar `' OR '1'='1` transforma a consulta em algo que casa com todas as linhas, e pesquisar com ponto e vírgula pode empilhar comandos destrutivos. A correção é o `prepare` com marcadores, que já usas: o termo viaja como dado e nunca é interpretado como SQL. Regra sem exceções: nenhum `$_GET`, `$_POST` ou cookie entra em texto de SQL. Nem o campo escondido do formulário, nem o nome do ficheiro enviado: tudo o que vem do cliente é entrada.

## XSS: escapar tudo o que se mostra

O XSS (scripts entre sítios) injeta JavaScript na tua página através de dados que mostras sem escapar. Um comentário com o texto `<script>alert(1)</script>` corre código no navegador de quem o ler, e uma carga a sério rouba a sessão em vez de mostrar um alerta. A defesa no servidor é o `htmlspecialchars` que já usas em cada `echo`, e no cliente é preferir `textContent` a `innerHTML` com dados do utilizador, como na [lista de tarefas](javascript-dom-eventos/).

Experimenta a neutralização: com escape, a carga aparece na página como texto literal `<script>...` visível e inofensivo; sem escape, o navegador executa-a. É a mesma cadeia de caracteres nos dois casos, e só a saída decide se é texto ou código. Por isso a regra se aplica na saída, em todas as páginas, mesmo nas "só de leitura".

## CSRF: confirmar quem mandou o pedido

O CSRF (falsificação de pedido entre sítios) aproveita a sessão aberta: uma página maliciosa faz o navegador da vítima submeter um formulário ao teu sítio, e o servidor obedece porque o cookie da sessão vai junto. A defesa é um segredo que o atacante não conhece: um token por sessão que cada formulário inclui e o servidor confirma.

```php
<?php
session_start();
if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(16));
}
?>
<form method="post">
  <input type="hidden" name="csrf" value="<?= $_SESSION['csrf'] ?>">
  <!-- resto do formulário -->
</form>
```

No processamento, compara `$_POST['csrf']` com `$_SESSION['csrf']` e recusa tudo o que não bater certo. A página maliciosa não lê o token, por isso os pedidos forjados falham a comparação. Aplica o token a todas as ações que alteram algo: encomendar, apagar, mudar a palavra passe. Leituras por `GET` não precisam dele, o que é mais uma razão para `GET` nunca alterar nada.

## O resto da lista curta

- **Travessia de caminho**: se o utilizador escolhe um ficheiro, `../../etc/passwd` não pode sair da pasta permitida. Valida o nome contra uma lista ou resolve o caminho e confirma que continua dentro da pasta.
- **Palavras passe**: guarda resumos com `password_hash` e confirma com `password_verify`, como no [login](php-dinamicas-bd/). Nunca guardes nem registes palavras passe em claro.
- **HTTPS**: cifra a conversa entre navegador e servidor. Sem ele, palavras passe e sessões viajam legíveis para quem espreitar a rede. Em produção é obrigatório; em desenvolvimento local, assume que tudo o que corre em HTTP é observável.

:::tip[Como rever o teu projeto]
Percorre esta lista por cada página: alguma entrada chega ao SQL sem `prepare`? Alguma saída chega ao HTML sem escape? Alguma ação por `POST` não confirma o token? Algum ficheiro abre com um nome vindo do utilizador? Quatro perguntas, e cada "sim" é uma correção concreta antes da entrega.
:::
