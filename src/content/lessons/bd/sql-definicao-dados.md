---
title: Criação de tabelas em SQL
description: DDL em SQLite, tipos, chaves, restrições e os ficheiros criar e povoar.
section: conteudo
order: 4
---

O SQL divide-se em duas metades: a **DDL** (_data definition language_), que cria a estrutura, e a DML, que mexe nos dados e nas perguntas. Criar a base de dados da loja é escrever a DDL do esquema relacional mais os `INSERT` que a enchem, nos ficheiros `criar.sql` e `povoar.sql` que o projeto da cadeira pede.

## CREATE TABLE e restrições

Cada tabela declara colunas com tipo e **restrições de integridade**, as regras que o SGBD impõe a cada escrita:

```sql
CREATE TABLE Cliente (
  id    INTEGER PRIMARY KEY,
  nome  TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE Produto (
  id    INTEGER PRIMARY KEY,
  nome  TEXT NOT NULL,
  preco REAL NOT NULL CHECK (preco > 0),
  stock INTEGER NOT NULL CHECK (stock >= 0)
);
```

`PRIMARY KEY` identifica e proíbe nulos e repetidos. `NOT NULL` proíbe omissões, `UNIQUE` proíbe repetidos sem identificar, `CHECK` impõe uma condição. Os tipos do SQLite são poucos (`INTEGER`, `TEXT`, `REAL`); a robustez vem das restrições, não dos tipos.

As estrangeiras ligam as tabelas e o SQLite só as fiscaliza se o pedires em cada sessão:

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE Encomenda (
  id        INTEGER PRIMARY KEY,
  data      TEXT NOT NULL,
  idCliente INTEGER NOT NULL REFERENCES Cliente(id)
);

CREATE TABLE Item (
  idEncomenda INTEGER REFERENCES Encomenda(id),
  idProduto   INTEGER REFERENCES Produto(id),
  qtd         INTEGER NOT NULL CHECK (qtd > 0),
  PRIMARY KEY (idEncomenda, idProduto)
);
```

A chave primária composta do par impede linhas duplicadas para o mesmo par, como exige o mapeamento.

## Povoar e falhar com dignidade

O `povoar.sql` enche as tabelas por ordem de dependência, pais antes de filhos:

```sql
INSERT INTO Cliente VALUES (1, 'Ana', 'ana@mail'), (2, 'Rui', 'rui@mail');
INSERT INTO Produto VALUES (10, 'Teclado', 45.0, 20);
INSERT INTO Encomenda VALUES (100, '2026-01-05', 1);
INSERT INTO Item VALUES (100, 10, 2);
```

E as restrições mordem quando tentas violar o modelo. Inserir uma encomenda do cliente 99, que não existe, devolve `FOREIGN KEY constraint failed`; inserir um produto com preço negativo devolve `CHECK constraint failed`. Estes erros não são chatices do SQLite: são o esquema a proteger a loja de dados impossíveis. Quando um `INSERT` falhar no projeto, lê a restrição citada em vez de a remover.

:::warning[O erro mais comum]
Criar as tabelas sem `PRAGMA foreign_keys = ON` e descobrir tarde que as estrangeiras eram decorativas. O SQLite aceita a sintaxe `REFERENCES` sempre, mas só rejeita violações com o pragma ligado. Corre-o no início de cada sessão e de cada script.
:::
