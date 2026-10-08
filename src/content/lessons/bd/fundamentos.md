---
title: Fundamentos de bases de dados
description: Dados, esquema, instância, SGBD, níveis de desenho e independência dos dados.
section: conteudo
order: 1
---

Ana fez duas encomendas. Se o nome dela estiver copiado nas duas, corrigir só uma deixa os dados contraditórios. Separar Cliente de Encomenda permite alterar o nome num único lugar. Essa separação é uma decisão de desenho; o sistema não a faz por nós.

Um **sistema de gestão de bases de dados**, ou SGBD, guarda dados e controla operações sobre eles. Além de os conservar, verifica restrições, coordena acessos concorrentes e oferece mecanismos de recuperação após falhas. SQLite, PostgreSQL e MongoDB são exemplos de SGBDs.

## Dados, esquema e instância

Os dados são os factos concretos, por exemplo "o produto 10 chama-se Teclado". O **esquema** define a estrutura e as regras desses factos. A **instância** é o conteúdo num certo momento.

Duas instâncias do mesmo esquema `Produto(id, nome, precoCentimos, stock)`:

| id  | nome    | precoCentimos | stock |
| --- | ------- | ------------- | ----- |
| 10  | Teclado | 4500          | 20    |
| 11  | Rato    | 2500          | 50    |

| id  | nome    | precoCentimos | stock |
| --- | ------- | ------------- | ----- |
| 10  | Teclado | 4500          | 18    |
| 11  | Rato    | 2500          | 50    |
| 12  | Monitor | 18000         | 5     |

O esquema é o mesmo nas duas tabelas: os mesmos atributos, a mesma chave e as mesmas condições. A instância mudou: o stock do teclado desceu e apareceu o monitor. Vender dois teclados muda a instância. Começar a registar a categoria muda o esquema.

A **chave** `id` identifica cada produto sem repetições. A condição `stock >= 0` rejeita valores negativos. Uma tabela vazia continua a ter esquema e restrições. O número de linhas não faz parte do esquema.

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
