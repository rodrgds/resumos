---
title: Laboratório de Bases de Dados e Aplicações Web
description: Do levantamento de requisitos à aplicação web com base de dados, seguindo as fases do projeto.
section: conteudo
order: 0
---

Nesta cadeira constróis uma aplicação web completa apoiada numa base de dados relacional: levantas requisitos, desenhas o modelo, crias o esquema, escreves o SQL, garantes as regras de negócio e implementas a aplicação e as interfaces. O trabalho é de projeto, em grupo, e cada página deste resumo segue uma fase desse projeto com o mesmo exemplo do princípio ao fim.

## Como está organizado

O exemplo que nos acompanha é uma **Loja de Bilhetes**: uma aplicação onde utilizadores compram bilhetes para sessões de eventos. Vais construir os requisitos, o esquema e as páginas desta loja ao longo das páginas.

Começa por [Levantamento de requisitos](/cadeiras/lbaw/requisitos/), que transforma um enunciado em atores, casos de uso e histórias de utilizador. Depois, [Modelo conceptual em UML](/cadeiras/lbaw/modelo-conceptual/) desenha as classes e associações, e [Do modelo ao esquema relacional](/cadeiras/lbaw/esquema-relacional/) converte esse desenho em tabelas com chaves primárias e estrangeiras.

A segunda parte vive dentro da base de dados: [SQL e índices em PostgreSQL](/cadeiras/lbaw/sql-indices/) escreve as interrogações e acelera as pesquisas frequentes, e [Regras de negócio, triggers e transações](/cadeiras/lbaw/triggers-transacoes/) garante a integridade com restrições, transações e triggers.

A terceira parte é a aplicação: [Aplicação web com Laravel](/cadeiras/lbaw/aplicacao-laravel/) organiza rotas, controladores, modelos e vistas, e [Interfaces, usabilidade e acessibilidade](/cadeiras/lbaw/interfaces-acessiveis/) desenha páginas que qualquer pessoa consegue usar.

## Como estudar

Lê cada página a construir o exemplo na tua máquina: escreve o requisito, desenha a classe, cria a tabela, corre a interrogação. Em LBAW, perceber o exemplo com os olhos não chega, porque o projeto avalia peças que têm de funcionar juntas. Quando algo falhar, lê a mensagem de erro com calma: o PostgreSQL e o Laravel dizem quase sempre qual é a tabela, a coluna ou a regra que foi violada.

Trabalha com o Git desde o primeiro dia e com a base de dados em Docker, como no projeto. Testa cada fase antes de passar à seguinte: um requisito vago hoje é uma tabela errada amanhã, e uma tabela errada amanhã é uma reescrita da aplicação na véspera da entrega.

## Avaliação

A forma de avaliação varia de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes os pesos do trabalho laboratorial e do teste, os mínimos por componente e as regras de participação individual no grupo.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Laboratório de Bases de Dados e Aplicações Web (L.EIC023) do 3.º ano, 1.º semestre da LEIC, ocorrência de 2025/26: desenvolvimento de uma aplicação web com base de dados, do levantamento de requisitos à implementação e documentação, com modelação UML, SQL, índices, transações, triggers, frameworks web centradas no servidor e desenho de interação. As ferramentas de trabalho são Laravel, Git, PostgreSQL, Docker e PHP.

Material oficial da FEUP:

- Ficha da unidade curricular de Laboratório de Bases de Dados e Aplicações Web, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560108).
