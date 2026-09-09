---
title: 'Segurança Web: sessões e autenticação'
description: Modelo de segurança Web, sessões, palavras-passe, XSS refletido e injeção SQL com correções.
section: conteudo
order: 7
---

A Web junta os piores ingredientes para a segurança: código de origens diferentes a correr no mesmo navegador, dados do utilizador misturados com instruções e sessões mantidas com truques. Esta página apresenta o modelo que contém essa mistura e dois ataques mínimos com as respetivas correções.

## O modelo: mesma origem, sessões e segredos

O navegador corre código de qualquer site, por isso precisa de uma regra de separação: a **política da mesma origem** (_same-origin policy_) impede que o código de um site leia os dados de outro. Sem ela, um separador malicioso lia o teu correio aberto noutro separador. É uma regra do navegador, não do servidor: protege o utilizador, e contorná-la do lado do servidor não a desliga.

O HTTP não tem memória, por isso as aplicações inventaram as **sessões**: o servidor cria um identificador aleatório, entrega-o num _cookie_ e reconhece o cliente quando ele o devolve. Quem roubar esse identificador herda a sessão (**sequestro de sessão**), daí as proteções: gerar de novo o identificador ao iniciar sessão, marcá-lo como `HttpOnly` para o JavaScript não o ler, `Secure` para só viajar em HTTPS e `SameSite` para não seguir em pedidos vindos de outros sites.

Na **autenticação**, a regra de ouro é nunca guardar palavras-passe, nem cifradas: guarda o resultado de uma função lenta com **sal** único por utilizador (_salt_), como o bcrypt ou o Argon2. O sal derrota tabelas pré-computadas e a lentidão derrota a tentativa maciça. Verificar é repetir o cálculo e comparar; vazar a base de dados continua a ser mau, mas não entrega as palavras-passe de bandeja.

## Exemplo 1: XSS refletido e a sua correção

A página de boas-vindas da loja ecoa o nome vindo do endereço sem filtrar:

```php
// VULNERÁVEL: ecoa o parâmetro tal como chegou
echo "<p>Olá, " . $_GET["nome"] . "!</p>";
```

O ataque chega num endereço partilhado com a vítima:

```text
/saudar.php?nome=<script>alert(document.cookie)</script>
```

O servidor devolve o código injetado dentro da página legítima e o navegador executa-o com os privilégios do site: lê _cookies_, age em nome do utilizador, desfigura a página. É **refletido** porque o código viaja no pedido e reflete-se na resposta, sem ficar guardado.

A correção é tratar dados como texto, nunca como código, no ponto de saída:

```php
// CORRIGIDO: texto é texto, mesmo que pareça código
echo "<p>Olá, " . htmlspecialchars($_GET["nome"], ENT_QUOTES, "UTF-8") . "!</p>";
```

Os carateres `<` e `>` passam a entidades inofensivas e o navegador mostra a tentativa em vez de a executar. Aplica a regra a todas as saídas, porque basta uma página esquecida.

## Exemplo 2: injeção SQL mínima e a sua correção

A pesquisa de clientes monta a consulta por concatenação:

```php
// VULNERÁVEL: interpola a entrada na consulta
$sql = "SELECT * FROM clientes WHERE nome = '" . $_POST["nome"] . "'";
```

A entrada `' OR '1'='1` transforma a consulta em `... WHERE nome = '' OR '1'='1'`, condição sempre verdadeira: devolve todos os clientes. É a mesma confusão entre dados e instruções, agora na base de dados.

A correção separa a estrutura dos dados com **consultas parametrizadas**:

```php
// CORRIGIDO: a estrutura é fixa, o valor viaja à parte
$stmt = $db->prepare("SELECT * FROM clientes WHERE nome = ?");
$stmt->execute([$_POST["nome"]]);
```

O parâmetro nunca é interpretado como SQL, seja qual for o seu conteúdo. Junta a isto o privilégio mínimo na conta da base de dados, só leitura onde baste, e uma injeção que sobreviva encontra muito menos para levar.

:::tip[O padrão comum]
XSS e injeção SQL são o mesmo erro em dois palcos: concatenar entrada não validada numa linguagem que o recetor interpreta. A cura também é a mesma em espírito: valida à entrada com a [lista de permissão](programacao-defensiva/) e codifica ou parametriza à saída. Quando vires concatenação de SQL, HTML ou comandos do sistema com dados do utilizador, desconfia por reflexo.
:::
