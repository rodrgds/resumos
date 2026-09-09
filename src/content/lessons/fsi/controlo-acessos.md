---
title: Controlo de acessos e fluxos
description: Matriz de acessos, papéis e permissões Unix resolvidas, incluindo um caso que nega por defeito.
section: conteudo
order: 4
---

A autenticação responde a "quem és?", provando a identidade. O **controlo de acessos** responde à pergunta seguinte: "já sei quem és, e agora, o que podes fazer?". Esta página organiza essa resposta em modelos e termina a decidir acessos concretos numa tabela de permissões Unix.

## Modelos: matriz, papéis e níveis

O modelo mental base é a **matriz de acessos**: linhas de sujeitos (utilizadores, processos), colunas de objetos (ficheiros, tabelas, impressoras) e em cada célula as operações permitidas (ler, escrever, executar). Tudo o resto é uma forma compacta de representar esta matriz.

Duas representações dominam. As **ACL** (_access control lists_) guardam, junto de cada objeto, quem pode o quê: é a coluna da matriz, e é o que as permissões Unix fazem. As **capacidades** (_capabilities_) guardam, junto de cada sujeito, os bilhetes de acesso que possui: é a linha da matriz, como um descritor de ficheiro aberto que já não volta a perguntar.

Sobre quem decide, há três políticas. No controlo **discricionário** (DAC), o dono do objeto decide quem acede, como nas permissões de ficheiros. No controlo **obrigatório** (MAC), o sistema impõe níveis, como "confidencial" contra "público", e nem o dono pode baixar a classificação. No controlo por **papéis** (RBAC), as permissões vão para papéis como "vendas" ou "contabilidade" e os utilizadores recebem papéis: quando a Ana muda de equipa, troca-se-lhe um papel em vez de dezenas de permissões.

Para fluxos de dados, a regra sensata é simples: a informação só flui para níveis iguais ou superiores de confiança, nunca para baixo sem desinfeção. Um relatório confidencial pode alimentar um resumo público depois de anonimizado; o caminho inverso, dados públicos a contaminar decisões confidenciais sem verificação, é uma fuga ou uma injeção à espera de acontecer.

## Mecanismos no sistema operativo

No Unix, cada ficheiro tem dono, grupo e três trios de permissões: leitura (r), escrita (w) e execução (x), para dono, grupo e outros. Nas pastas, o x significa atravessar: sem x na pasta, nem chegas aos ficheiros de dentro, sejam quais forem as permissões deles. É a mediação completa em ação.

O bit **setuid** é a exceção controlada: um programa com setuid corre com as permissões do dono do ficheiro, não de quem o executa. O comando `passwd` precisa de escrever no ficheiro de senhas, por isso corre momentaneamente como `root`. É privilégio mínimo cirúrgico, um programa em vez do utilizador, mas cada programa setuid é uma aposta: um erro nele é um erro com poderes de `root`.

## Exemplo: tabela de permissões resolvida

O ficheiro `/srv/loja/precos.csv` tem dono `loja` com `rw-`, grupo `vendas` com `r--` e outros sem nada. A pasta `/srv/loja` tem `rwx` para `root`, `r-x` para `vendas` e nada para outros. Decide quatro pedidos:

| Pedido | Decisão | Porquê |
| ------ | ------- | ------ |
| A Ana, do grupo `vendas`, quer ler os preços | Sim | Atravessa a pasta com o x do grupo e lê com o r do grupo |
| O Bruno, do grupo `vendas`, quer corrigir um preço | Não | O grupo só tem r no ficheiro. O que não foi permitido é proibido: nega por defeito |
| O Carlos, de fora das `vendas`, quer ler os preços | Não | A pasta fecha-lhe a passagem antes sequer de olhar para o ficheiro. Cada acesso é verificado, sem atalhos |
| O script de atualização, com setuid do dono `loja`, quer escrever | Sim | Corre com as permissões do dono, que tem w. Só este programa ganha esse poder, não o utilizador que o corre |

Repara no caso do Bruno: é o negar por defeito da página anterior a trabalhar. E repara no Carlos: a proteção da pasta torna irrelevante a permissão do ficheiro, o que mostra por que razão camadas independentes contam. Se um dia o grupo `vendas` precisar de escrever, a resposta certa é um papel novo ou uma permissão explícita e registada, nunca abrir a pasta a toda a gente.
