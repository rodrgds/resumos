---
title: Laboratório de Bases de Dados e Aplicações Web
description: Preparação do teste individual, dos requisitos e da modelação aos dados, à aplicação web e às suas garantias.
order: 0
editorial:
  basedOn: 2026/27
  sources:
    - title: Moodle LBAW 2026/27, apresentação e materiais das primeiras três semanas
      url: https://moodle2627.up.pt/course/view.php?id=4222
    - title: Plano do semestre LBAW 2026/27
      url: https://docs.google.com/spreadsheets/d/e/2PACX-1vTm1WlNzZqrCttNHAnZe7Kzq_EJUiGZatZVK5QVfoo-GZlnngu6Xq6COshlPym2Jl3iHQkvU1gUpmbZ/pubhtml?gid=979371688&single=true
    - title: Ficha LBAW 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587001
  coverage: Tópicos do plano atual, com teoria para o teste individual, questões próprias e comparação delimitada com provas históricas.
  gaps:
    - Em 1 de outubro, estavam disponíveis quatro conjuntos de slides, até especificação da base de dados. Os slides posteriores e as provas de 2026/27 ainda não estavam publicados.
    - O plano confirma os tópicos futuros, mas o detalhe e as convenções de cada aula devem ser comparados quando os materiais forem publicados.
---

LBAW junta requisitos, dados e aplicação web. Para o teste individual, precisas de explicar as decisões, executar consultas e reconhecer as garantias que cada mecanismo dá. O exemplo das páginas é uma Loja de Bilhetes, com compradores, eventos, sessões e bilhetes. As questões são próprias, não reproduções de provas oficiais.

## Percurso de estudo

1. [Requisitos](/cadeiras/lbaw/requisitos/) distingue atores, histórias, regras e critérios de aceitação. [Modelo conceptual](/cadeiras/lbaw/modelo-conceptual/) e [esquema relacional](/cadeiras/lbaw/esquema-relacional/) convertem essas regras em estrutura e restrições.
2. [Normalização](/cadeiras/lbaw/normalizacao/) encontra chaves e justifica decomposições. [Consultas SQL](/cadeiras/lbaw/consultas-relacionais/) trata junções, NULL, agregação e quantificação.
3. [Índices e pesquisa](/cadeiras/lbaw/sql-indices/) relaciona consultas, planos e relevância. [Triggers e transações](/cadeiras/lbaw/triggers-transacoes/) explica atomicidade e concorrência, incluindo o caso do último lugar.
4. [HTTP](/cadeiras/lbaw/http-estado/), [arquitetura com Laravel](/cadeiras/lbaw/aplicacao-laravel/) e [segurança](/cadeiras/lbaw/seguranca-web/) distinguem protocolo, responsabilidades e permissões.
5. [Arquitetura de informação e acessibilidade](/cadeiras/lbaw/interfaces-acessiveis/), [cliente e desempenho](/cadeiras/lbaw/cliente-desempenho/) e [NoSQL](/cadeiras/lbaw/nosql/) completam os tópicos do plano atual.

Cada capítulo termina com questões e resoluções justificadas. A [cheat sheet](/cadeiras/lbaw/folha-consulta/) conserva definições, condições e armadilhas para consulta depois de estudar.

## Preparar o teste

Resolve uma questão de modelação, uma de normalização e uma consulta sem abrir as pistas. Depois analisa um cenário concorrente e identifica as defesas de um pedido web. Justifica sempre a condição: não chega dizer «tem trigger», «usa ORM» ou «está autenticado».

Para SQL, cria dados com zero, uma e várias correspondências, e com NULL quando é permitido. Para uma regra concorrente, escreve uma sequência possível de duas transações. Para uma falha web, identifica quem controla a entrada, onde ela é interpretada e que permissão devia ser verificada.

Os blocos SQL no navegador usam SQLite. Os exemplos específicos de PostgreSQL, como PL/pgSQL, índices GIN e níveis de isolamento, estão identificados e exigem PostgreSQL. Os fragmentos Laravel pressupõem a aplicação e as dependências do projeto; os blocos PHP executáveis isolam uma operação da linguagem.

## Avaliação atual

A apresentação e a FAQ de 2026/27 indicam 80% de projeto e 20% de teste individual, com mínimo de 8/20 no teste, sem arredondamento para atingir esse mínimo. Cada componente do projeto exige 10/20. A classificação final não pode exceder a nota do teste acrescida de cinco valores. Por exemplo, projeto 18 e teste 10 dão 16,4 pela média ponderada, mas o limite baixa esse resultado para 15.

O foco destas páginas é o teste. Regras de frequência, entregas, apresentação e avaliação individual do projeto continuam nos [materiais atuais do Moodle](https://moodle2627.up.pt/course/view.php?id=4222). A ficha pública atual identifica a ocorrência, mas ainda não apresentava o programa detalhado quando foi consultada. O âmbito temático foi confirmado no plano do semestre e nos slides já publicados.
