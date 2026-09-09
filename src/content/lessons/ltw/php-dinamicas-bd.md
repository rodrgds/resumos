---
title: PHP e páginas dinâmicas com base de dados
description: Sintaxe de PHP, parâmetros HTTP, sessões, PDO com SQLite e organização com includes.
section: conteudo
order: 3
---

O HTML e o CSS que viste até aqui são estáticos: todos os visitantes recebem a mesma página. O PHP corre no servidor e monta a página na hora, com dados que podem mudar a cada pedido. Vens de [programação procedimental](/cadeiras/fp/) em Python: as funções e os parâmetros são os mesmos de [sempre](/cadeiras/fp/funcoes/), mas a tipagem é dinâmica, as variáveis começam por `$` e cada pedido começa com a memória vazia.

## O primeiro script

Guarda isto em `ola.php` e abre-o através do servidor, nunca como ficheiro local, porque o navegador sozinho não corre PHP:

```php
<?php
$nome = $_GET['nome'] ?? 'visitante';
echo '<p>Olá, ' . htmlspecialchars($nome) . '!</p>';
?>
```

Abrir `ola.php?nome=Ana` mostra "Olá, Ana!". Abrir sem parâmetro mostra "Olá, visitante!", porque o operador `??` usa o valor da direita quando o parâmetro não existe. Repara em dois hábitos que vais repetir em todas as páginas: ler parâmetros de `$_GET` (endereço) ou `$_POST` (formulário) com um valor por omissão, e passar tudo o que vem do utilizador por `htmlspecialchars` antes de o mostrar, para etiquetas injetadas saírem como texto. A razão desta segunda regra está na página de [segurança](seguranca-web/).

O ponto e vírgula, as chavetas e o `if` funcionam como em C. A diferença que mais morde no início é a tipagem dinâmica: `$qtd = "3"` guarda texto, e `"3" + 1` dá `4` porque o PHP converte sozinho. Confia nos tipos como confias num colega distraído: verifica antes de operar.

## Ler produtos do SQLite

A lista de produtos vive numa base de dados SQLite, e o PHP fala com ela através do PDO. Precisas do mínimo de SQL para isto: `SELECT` escolhe colunas, `FROM` escolhe a tabela e `WHERE` filtra linhas. Guarda a pesquisa da mercearia em `pesquisa.php`:

```php
<?php
$db = new PDO('sqlite:loja.sqlite');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$termo = $_GET['q'] ?? '';
$stmt = $db->prepare('SELECT nome, preco FROM produtos WHERE nome LIKE :t');
$stmt->execute([':t' => '%' . $termo . '%']);
echo '<ul>';
foreach ($stmt->fetchAll() as $p) {
    echo '<li>' . htmlspecialchars($p['nome']) . ' : ' . $p['preco'] . ' €</li>';
}
echo '</ul>';
?>
```

Abrir `pesquisa.php?q=queijo` lista só os produtos com "queijo" no nome. O `prepare` com o marcador `:t` separa o código SQL do valor pesquisado: o termo viaja como dado, nunca como instrução. Esta separação é a defesa contra injeção SQL, explicada na página de [segurança](seguranca-web/). Nunca cole um `$_GET` diretamente dentro do texto do SQL.

:::warning[Testa o parâmetro em falta]
Abre `pesquisa.php` sem o `?q=`. Como o termo por omissão é texto vazio, o `LIKE '%%'` casa com tudo e a página lista todos os produtos. Decide sempre o que cada página faz sem parâmetros: listar tudo, mostrar mensagem ou recusar. "Sem parâmetro" não é um caso raro, é o primeiro pedido que um visitante faz.
:::

## Sessões e login

Cada pedido PHP começa de novo, por isso o login precisa de memória entre pedidos: a sessão. O servidor guarda os dados e entrega ao navegador só um identificador num cookie. O login do dono da loja, em `login.php`:

```php
<?php
session_start();
if (($_POST['acao'] ?? '') === 'entrar') {
    $db = new PDO('sqlite:loja.sqlite');
    $stmt = $db->prepare('SELECT id, hash FROM users WHERE nome = :n');
    $stmt->execute([':n' => $_POST['user']]);
    $u = $stmt->fetch();
    if ($u && password_verify($_POST['pass'], $u['hash'])) {
        $_SESSION['uid'] = $u['id'];
        echo '<p>Sessão iniciada.</p>';
    } else {
        echo '<p>Credenciais inválidas.</p>';
    }
}
?>
```

O `session_start()` tem de correr antes de qualquer saída, porque envia o cookie no cabeçalho. A palavra passe nunca se compara em claro: `password_hash` cria o resumo na altura do registo e `password_verify` confirma-o no login. Se a tabela de utilizadores vazar, o atacante fica com resumos, não com palavras passe. Depois do login, cada página protegida confirma `$_SESSION['uid'] ?? null` antes de mostrar conteúdo privado.

## Organizar com includes

Quando o cabeçalho e a ligação à base de dados se repetem em dez páginas, qualquer mudança obriga a dez edições. Parte os pedaços comuns em ficheiros e inclui-os:

```php
<?php
require_once 'config.php';   // cria $db
include 'cabecalho.php';     // abre o HTML comum
?>
```

O `require_once` para a página com erro se o ficheiro faltar, e só o inclui uma vez; usa-o para o essencial, como a configuração. O `include` avisa e continua; serve para pedaços opcionais de apresentação. Um projeto típico tem `config.php` com a ligação, `cabecalho.php` e `rodape.php` com o HTML comum, e uma pasta por funcionalidade. Quando o tratamento de erros crescer para `try` e `catch`, a lógica é a mesma que já conheces do [tratamento de exceções](/cadeiras/fp/ficheiros-excecoes/): tenta, apanha o erro e mostra uma página amigável em vez do rastreio interno.

:::details[O que foi verificado nesta página]
Os trechos seguem a API do PDO e as funções de sessão e de palavras passe do PHP indicadas na ficha (PHP 7.4 com sqlite3). Não foram executados neste ambiente, por isso corre cada um no teu servidor local e confirma as saídas antes de os usares no projeto.
:::
