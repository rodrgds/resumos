---
title: Princípios de construção de sistemas seguros
description: Privilégio mínimo, isolamento e defesa em profundidade aplicados ao redesenho de um serviço.
section: conteudo
order: 2
---

Um sistema seguro não nasce de juntar mecanismos ao acaso. Nasce de princípios que limitam o dano quando, e não se, alguma defesa falhar. Esta página apresenta os quatro princípios centrais e aplica-os ao redesenho de um serviço com permissões a mais.

## Os quatro princípios

**Privilégio mínimo** (_least privilege_): cada programa e cada utilizador recebe exatamente as permissões necessárias para a sua tarefa, e nada mais. Um serviço que só lê uma pasta não precisa de escrever em nenhuma, e muito menos de correr como administrador. O princípio limita o alcance de um erro ou de uma intrusão: o atacante herda apenas os privilégios do componente comprometido.

**Isolamento** (_isolation_): separar componentes para que a falha de um não arraste os outros. Utilizadores diferentes, contentores, máquinas virtuais e redes separadas são formas de isolamento. Se o serviço Web for comprometido, a base de dados noutro segmento continua de pé.

**Defesa em profundidade** (_defense in depth_): empilhar camadas independentes para que uma só falha não chegue ao ativo. Firewall, autenticação, permissões de ficheiros e cifragem defendem o mesmo dado em níveis diferentes. O atacante precisa de vencer todas as camadas, e cada camada derrotada continua a deixar registos para deteção.

**Segurança por construção** (_secure by design_): pensar na segurança desde o desenho, com valores por defeito seguros. A regra de ouro é **negar por defeito** (_fail-safe defaults_): tudo o que não foi explicitamente permitido é proibido. Uma funcionalidade nova nasce desligada e restrita, e só ganha permissões com justificação.

Dois princípios auxiliares completam o quadro. **Mediação completa**: cada acesso a um objeto passa pela verificação, sem atalhos nem caches de autorização que saltem a pergunta. **Economia de mecanismo**: mecanismos pequenos e simples, porque o que é simples de perceber é simples de auditar, e o que ninguém percebe ninguém consegue rever.

## Exemplo: redesenhar um serviço com permissões a mais

A loja corre um script de cópias de segurança todas as noites com esta configuração: executa como `root`, lê o disco inteiro, escreve os arquivos numa pasta partilhada com permissões abertas e não regista nada. Funciona, mas cada detalhe viola um princípio, e um único erro no script compromete a máquina toda.

Aplica os princípios passo a passo:

1. **Privilégio mínimo.** Cria um utilizador próprio, `copias`, com permissão de leitura apenas nas pastas a salvaguardar e de escrita apenas na pasta de destino. O script deixa de correr como `root`. Se o script for comprometido, o atacante lê as pastas das cópias, não o disco inteiro nem as chaves do sistema.
2. **Isolamento.** Corre o script num contentor ou máquina dedicada às cópias, separado do servidor Web. Uma intrusão no site deixa de dar acesso aos arquivos, e vice-versa.
3. **Defesa em profundidade.** Fecha a pasta de destino a todos menos ao utilizador `copias`, cifra os arquivos com uma chave guardada noutro local e regista cada execução com data e resultado. Para ler uma cópia, o atacante precisa agora de vencer as permissões, a localização isolada e a cifragem, e o registo denuncia a tentativa.
4. **Negar por defeito.** O restauro de uma cópia exige confirmação explícita e repõe permissões restritas, em vez de devolver ficheiros abertos a toda a gente. Nada ganha acesso por ser novo ou por ser urgente.

| Antes | Depois | Princípio aplicado |
| ----- | ------ | ------------------ |
| Corre como `root` | Utilizador `copias` só com o necessário | privilégio mínimo |
| Na mesma máquina do site | Contentor ou máquina dedicada | isolamento |
| Pasta aberta, sem registo | Permissões fechadas, arquivos cifrados, registo de cada execução | defesa em profundidade |
| Restauro devolve ficheiros abertos | Restauro com confirmação e permissões restritas | negar por defeito |

:::warning[Camadas independentes, não empilhadas no mesmo ponto]
Duas verificações da mesma palavra-passe no mesmo programa não são defesa em profundidade, são a mesma camada duas vezes. Camadas contam quando falham por razões diferentes: a firewall pode estar mal configurada e as permissões de ficheiros continuarem certas, porque são mecanismos distintos geridos em pontos distintos.
:::
