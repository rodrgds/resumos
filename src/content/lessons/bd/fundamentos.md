---
title: Fundamentos de bases de dados
description: Dados, esquema, instância, SGBD, níveis de desenho e independência dos dados.
section: conteudo
order: 1
---

No início do percurso de bases de dados, esta página responde a o que guarda um sistema de gestão e como separamos a estrutura dos dados do seu conteúdo.

Guardar uma encomenda num ficheiro é possível. O problema aparece quando dois programas a alteram ao mesmo tempo, quando uma falha interrompe uma escrita ou quando precisamos de ligar a encomenda a um cliente. Um **sistema de gestão de bases de dados**, ou SGBD, é o programa que guarda esses dados e controla as operações sobre eles. SQLite, PostgreSQL e MongoDB são exemplos de SGBDs.

## Dados, esquema e instância

Os dados são os factos concretos, por exemplo "o produto 10 chama-se Teclado". O **esquema** define a estrutura e as regras desses factos: `Produto(id, nome, precoCentimos, stock)`, a chave `id`, que identifica cada produto sem repetições, e a condição `stock >= 0`. A **instância** é o conteúdo num certo momento.

Se vendermos dois teclados, a instância muda. Se acrescentarmos uma coluna `categoria`, o esquema muda. Uma tabela vazia continua a ter um esquema e restrições. O número de linhas não faz parte do esquema.

Uma base de dados é a coleção organizada de dados; o SGBD é o software que a guarda e interroga. Um ficheiro SQLite pode ser uma base de dados, mas o ficheiro não é o motor SQLite.

## Que problemas resolve o SGBD

O SGBD mantém dados persistentes, oferece uma linguagem de consulta e verifica as restrições declaradas. Controla acessos concorrentes e recupera após falhas segundo as garantias do motor e da configuração. Pode criar índices e escolher uma forma de executar uma consulta.

A aplicação continua responsável por definir corretamente as regras. Se não declararmos que a quantidade é positiva, o SGBD não deduz essa intenção a partir do nome `qtd`, porque o nome não é uma restrição. Se debitarmos dinheiro sem o creditar noutra conta, uma transação isolada pode executar essa operação errada sem interferência, por isso integridade técnica e correção do domínio exigem um desenho explícito.

## Três níveis de desenho

O modelo **conceptual** descreve o problema. Uma encomenda pertence a um cliente e contém produtos. Pode ser um diagrama UML, sem tipos específicos de SQLite.

O modelo **lógico** escolhe relações, atributos e chaves. A associação entre encomendas e produtos torna-se `Item(idEncomenda, idProduto, qtd, precoUnitario)`. Aqui verificamos dependências e normalização.

O desenho **físico** decide como o SGBD guarda e acede aos dados: índices, organização e opções de armazenamento. Criar um índice em `Encomenda(idCliente)` não muda o facto de uma encomenda pertencer a um cliente.

Esta separação permite **independência dos dados**. A independência física deixa mudar um método de acesso sem reescrever a consulta lógica. A independência lógica procura proteger as aplicações de certas mudanças no esquema, por exemplo através de uma vista que mantém as colunas antigas. Não significa que qualquer alteração de esquema seja invisível.

## O modelo relacional

Uma **relação** tem um conjunto de atributos e um conjunto de tuplos. Num esquema `Cliente(id, nome, email)`, cada tuplo associa um valor a cada atributo. O **domínio** de um atributo define os valores admissíveis, por exemplo inteiros positivos ou texto. A **aridade** é o número de atributos; a **cardinalidade** é o número de tuplos da instância. Cliente tem aridade 3, mesmo vazia. Inserir um cliente aumenta a cardinalidade, sem mudar a aridade.

Na teoria relacional, não há tuplos duplicados e a ordem dos tuplos não faz parte da relação. Duas apresentações com linhas em ordens diferentes representam o mesmo conjunto. Em SQL, os resultados admitem duplicados por omissão e só `ORDER BY` garante uma ordem. Esta diferença vai importar nas projeções, junções e contagens.

O nome "relacional" vem destas relações matemáticas, não da simples existência de ligações entre tabelas. Uma base de dados de grafos também tem ligações, mas usa outro modelo.

## Uma pergunta e duas decisões

Queremos os clientes que compraram um rato. O resultado deve ter uma linha por cliente, mesmo que tenha comprado o produto em várias encomendas, por isso precisamos de percorrer `Cliente → Encomenda → Item → Produto` e de eliminar repetições de clientes na resposta.

O preço atual do rato não é necessário para esta pergunta. A forma física de guardar as tabelas também não deve mudar o seu significado. Primeiro definimos a pergunta e as relações relevantes; a consulta e o plano físico vêm depois.
