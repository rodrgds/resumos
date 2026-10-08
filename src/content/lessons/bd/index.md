---
title: Bases de Dados
description: Percurso de estudo, materiais, bibliografia e avaliação de Bases de Dados.
section: conteudo
order: 0
editorial:
  basedOn: 2025/26
  coverage: Modelação UML, modelo relacional, dependências e decomposição, SQLite, álgebra, consultas e recursão, segurança, vistas, gatilhos, índices, transações, NoSQL e OLAP.
  gaps:
    - Os materiais docentes disponíveis são do Moodle de 2025/26; não foi comparado o Moodle de 2026/27.
---

Uma aplicação de uma loja precisa de guardar clientes, produtos e encomendas. Se repetir o nome de cada cliente em todas as compras, uma mudança de nome pode deixar dados contraditórios. Se guardar uma lista de produtos numa só célula, perguntar quantos ratos vendeu torna-se difícil. O percurso acompanha esta loja: representa os factos em UML, traduz-os para relações, verifica dependências e formula consultas em SQL.

## Percurso de estudo

As páginas seguem uma sequência de decisões. Os exercícios pedem modelação, cálculo, diagnóstico ou consultas completas, com soluções justificadas.

1. [Fundamentos](/cadeiras/bd/fundamentos/) distingue dados, esquema, instância e SGBD.
2. [Modelo conceptual em UML](/cadeiras/bd/modelo-conceptual-uml/) representa classes, associações, multiplicidades e especializações. [Mapeamento relacional](/cadeiras/bd/mapeamento-relacional/) traduz o desenho e identifica as regras que uma simples chave estrangeira não garante.
3. [Álgebra relacional](/cadeiras/bd/algebra-relacional/) compõe operações sobre conjuntos, com tabelas intermédias explícitas. [Normalização](/cadeiras/bd/normalizacao/) calcula fechos e chaves, e verifica as formas normais. [Decomposição](/cadeiras/bd/decomposicao/) demonstra junção sem perda e preservação de dependências, incluindo o chase e a síntese em 3FN.
4. [Definição de dados](/cadeiras/bd/sql-definicao-dados/) cria e altera tabelas em SQLite.
5. [Consultas SQL](/cadeiras/bd/sql-consultas/) trabalha seleção, junções, `NULL` e agregação. [Subconsultas e divisão](/cadeiras/bd/sql-subconsultas/) trata existência, máximos, conjuntos e perguntas com "todos". [CTEs e recursão](/cadeiras/bd/sql-recursao/) dá nome a resultados intermédios e percorre hierarquias.
6. [Vistas, gatilhos e acessos](/cadeiras/bd/vistas-gatilhos-acessos/) separa SQL de SQLite e de PostgreSQL. [Índices e transações](/cadeiras/bd/indices-transacoes/) aborda custo e atomicidade; [Concorrência](/cadeiras/bd/concorrencia/) analisa escalonamentos e níveis de isolamento.
7. [Armazéns de dados e NoSQL](/cadeiras/bd/armazens-dados-nosql/) trabalha o grão de factos, OLAP, distribuição e consultas a documentos.

A [cheat sheet](/cadeiras/bd/folha-consulta/) reúne critérios, fórmulas e erros para rever depois de compreender os exemplos. Não substitui as resoluções.

## O exemplo da loja

Nos exemplos SQL, `Cliente`, `Produto`, `Encomenda` e `Item` representam uma loja pequena. Ana tem as encomendas 100 e 101, Rui tem a 102 e Mia ainda não comprou. A 100 contém dois teclados e um rato; a 101, um monitor; a 102, três ratos.

Os preços guardam-se em cêntimos inteiros. O teclado custa 4500, o rato 2500 e o monitor 18000. `Produto.precoCentimos` é o preço atual; `Item.precoUnitario` é o preço acordado na compra. São factos diferentes. Mudar o preço atual não deve reescrever uma venda antiga. Os emails de Rui e Mia são desconhecidos, representados por `NULL`.

Cada bloco executável cria os seus próprios dados. Podes alterar a consulta e voltar a executar sem depender de outro bloco. Os exemplos de PostgreSQL e de MongoDB são identificados junto do código e não correm no motor SQLite destas páginas.

## Como trabalhar um problema

Antes de escrever SQL, define o que representa uma linha da resposta. "Uma linha por cliente" é diferente de "uma linha por encomenda". Em seguida escolhe as tabelas e as ligações necessárias. Só depois filtra, agrupa e projeta.

Confere a resposta com poucos dados que conheças. Acrescenta um cliente sem compras, duas pessoas com o mesmo nome, um `NULL`, um empate ou uma tabela vazia. Estes casos distinguem uma consulta correta de outra que apenas acertou na primeira amostra. Nos problemas de normalização, usa as dependências do domínio, não coincidências nos dados apresentados.

:::details[Avaliação de 2026/27]

A [ficha oficial de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586990), consultada em 3 de outubro de 2026, indica:

- Projeto: 20%; teste de SQL: 35%; exame: 45%. A nota final é arredondada.
- Mínimo de 8 valores em 20 no exame.
- Frequência: não exceder 25% de faltas às teórico-práticas, integrar um grupo e participar nas duas entregas do projeto.
- As entregas valem 40% e 60% da nota do projeto. O projeto e o teste de SQL não têm avaliação de recurso nem melhoria.

Estes pesos diferem dos materiais de 2025/26, que indicavam 20%, 30% e 50%, com mínimos de 7 no teste e no exame. Para a tua inscrição, confirma a ficha e os avisos do Moodle do respetivo ano. Os exercícios destas páginas foram escritos para treino a partir dos materiais docentes, incluindo adaptações de exemplos das apresentações; não são provas oficiais nem uma previsão do exame.

:::

:::details[Materiais e bibliografia]

A base de ensino é o [Moodle de BD de 2025/26](https://moodle2526.up.pt/course/view.php?id=3996): plano de aulas, apresentações teóricas, fichas práticas e respetivas soluções. O plano inclui explicitamente CTEs e recursão, segurança e autorização, além dos tópicos do programa. Alguns ficheiros reutilizados têm anos anteriores no nome ou no conteúdo, em particular a teoria de desenho relacional de 2023/2024 e as fichas DDL de 2023, 2024 e 2025. A sua presença no Moodle de 2025/26 não altera esses anos de origem.

A [ficha de 2025/26](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560097) permite enquadrar esses materiais. A [ficha de 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586990) confirma o programa atual e a avaliação, mas não foi feita uma comparação com os materiais do Moodle de 2026/27.

A bibliografia da ficha atual é:

- Obrigatória: Jeffrey D. Ullman e Jennifer Widom, _A First Course in Database Systems_, ISBN 978-0-13-600-637-4. A ficha identifica a obra pelo nome de Ullman; as apresentações usam a 3.ª edição, em especial os capítulos 2 a 4 e 6 a 8.
- Complementar: Raghu Ramakrishnan e Johannes Gehrke, _Database Management Systems_, ISBN 0-07-116898-2, capítulos 18 a 20.

Como apoio, foram consultadas as [apresentações abertas de André Restivo](https://github.com/arestivo/slides), o material SQL adicional do Moodle e a documentação dos motores: [SQLite](https://www.sqlite.org/docs.html), [isolamento em PostgreSQL](https://www.postgresql.org/docs/current/transaction-iso.html), [autorização em PostgreSQL](https://www.postgresql.org/docs/current/ddl-priv.html) e [consultas MongoDB](https://www.mongodb.com/docs/manual/crud/). Estas fontes completam a explicação e esclarecem diferenças entre sistemas; não substituem os materiais docentes.

:::
