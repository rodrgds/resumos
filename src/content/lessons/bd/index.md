---
title: "Bases de Dados: guia da cadeira"
description: O que a cadeira exige, o mapa das páginas e como estudar do modelo conceptual ao NoSQL.
section: conteudo
order: 0
---

Uma base de dados é onde uma aplicação guarda os factos de que precisa depois de desligar: clientes, encomendas, notas, horários. Sem um desenho cuidado, os mesmos factos repetem-se em sítios diferentes, contradizem-se e as perguntas difíceis ficam impossíveis de responder. Esta cadeira ensina o percurso completo: desenhar o modelo, traduzi-lo em tabelas, normalizar, criar e interrogar a base de dados em SQL e geri-la com vistas, gatilhos, índices e transações.

No fim deves saber fazer quatro coisas: modelar um problema em UML e passar para o esquema relacional; justificar a forma normal de cada tabela e decompor até Boyce-Codd ou 3.ª forma normal; escrever DDL e consultas SQL em SQLite; e decidir entre relacional, armazém de dados e NoSQL para cada caso.

## O fio condutor

Todas as páginas usam o mesmo cenário, uma pequena loja. Há clientes que fazem encomendas, cada encomenda tem linhas com produtos e quantidades, cada produto tem preço e stock. Quando vires `Cliente`, `Encomenda` ou `Produto` num exemplo, são sempre estas tabelas:

- `Cliente(id, nome, email)`, com 1: Ana, 2: Rui, 3: Mia.
- `Produto(id, nome, preco, stock)`: 10: Teclado a 45, 20 em stock; 11: Rato a 25, 50 em stock; 12: Monitor a 180, 5 em stock.
- `Encomenda(id, data, idCliente)`: 100 de Ana, 101 de Ana, 102 de Rui.
- `Item(idEncomenda, idProduto, qtd)`: (100, 10, 2), (100, 11, 1), (101, 12, 1), (102, 11, 3).

Reutilizar o cenário poupa-te de redecorar dados a cada página e deixa ver como cada técnica nova responde a perguntas sobre os mesmos factos.

## Como está organizado

Começa pelo [Modelo conceptual em UML](/cadeiras/bd/modelo-conceptual-uml/), que desenha as classes da loja e lê as multiplicidades, e segue para [Do UML ao esquema relacional](/cadeiras/bd/mapeamento-relacional/), que converte esse desenho em tabelas com chaves primárias e estrangeiras. Depois, [Normalização e formas normais](/cadeiras/bd/normalizacao/) elimina a redundância com dependências funcionais e decomposição.

A segunda parte é SQL em SQLite: [Criação de tabelas em SQL](/cadeiras/bd/sql-definicao-dados/) escreve o `criar.sql` e o `povoar.sql` da loja, [Álgebra relacional](/cadeiras/bd/algebra-relacional/) formaliza as perguntas com operadores, e [Consultas SQL](/cadeiras/bd/sql-consultas/) responde-as com `SELECT`, junções, agregação e subconsultas.

A terceira parte gere a base de dados: [Vistas, gatilhos e controlo de acessos](/cadeiras/bd/vistas-gatilhos-acessos/) cria vistas e um gatilho que protege o stock; [Índices e transações](/cadeiras/bd/indices-transacoes/) acelera consultas e garante atomicidade; [Armazéns de dados e NoSQL](/cadeiras/bd/armazens-dados-nosql/) compara o modelo relacional com o multidimensional e o NoSQL.

## Como estudar

Instala o SQLite e executa cada bloco de código tu próprio: cria as tabelas, povoa-as, corre as consultas e confirma os resultados dados nas páginas. Em Bases de Dados, ler uma consulta sem a correr é como ler uma receita sem cozinhar: parece claro até falhar um detalhe. Quando uma consulta der erro, lê a mensagem do SQLite, que costuma apontar a cláusula culpada, e volta à página correspondente.

## Avaliação

A avaliação é distribuída com exame final. A fórmula da ficha de 2025/26 é arredondar 0,2 do projeto mais 0,3 do teste de SQL mais 0,5 do exame, com mínimo de 35 por cento no teste de SQL e no exame. A frequência exige poucas faltas às teórico-práticas, grupo de projeto e as duas entregas. Confirma sempre os pesos e as regras na ficha do ano em curso e no Moodle, porque mudam de ano para ano.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Bases de Dados (L.EIC012) do 2.º ano, 1.º semestre da LEIC, ocorrência de 2025/26: diagrama de classes UML, esquema relacional e normalização, DDL e restrições de integridade, álgebra relacional, DML em SQL, controlo de acessos, gatilhos, vistas, índices, transações e introdução a armazéns de dados e NoSQL. O software da cadeira é o SQLite e a bibliografia obrigatória é Ullman, A First Course in Database Systems.

Material oficial da FEUP:

- Ficha da unidade curricular de Bases de Dados, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560097).
