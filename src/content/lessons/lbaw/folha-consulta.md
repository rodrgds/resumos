---
title: Cheat sheet de LBAW
description: Definições, condições e padrões para rever o teste individual de bases de dados e aplicações web.
studyKind: revision
editorial:
  basedOn: 2026/27
  sources:
    - title: Moodle e plano LBAW 2026/27
      url: https://moodle2627.up.pt/course/view.php?id=4222
  coverage: Consulta curta dos conceitos desenvolvidos nas lições, com condições e casos limite.
---

## Requisitos e modelos

| Conceito       | Fixar                                                                            |
| -------------- | -------------------------------------------------------------------------------- |
| Ator           | Papel ou sistema externo; não um componente interno.                             |
| História       | Quem, o que pretende e para quê; critérios de sucesso, falha e autorização.      |
| Qualidade      | Medida, limite, carga, dados e ambiente definidos.                               |
| Multiplicidade | Quantos objetos da extremidade para um do lado oposto; ler os dois sentidos.     |
| Especialização | Total/partial e disjoint/overlapping são dimensões independentes.                |
| N:N            | Tabela associativa. O par só é chave se houver no máximo uma ocorrência por par. |

[Requisitos](../requisitos/), [UML](../modelo-conceptual/) e [esquema](../esquema-relacional/).

## Restrições e normalização

| Regra                  | Condição                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| PK                     | Única e não nula. Outras chaves candidatas continuam a ser regras do domínio.              |
| FK                     | A referência existe; não garante que cada pai tenha filhos.                                |
| CHECK                  | PostgreSQL aceita verdadeiro ou desconhecido. NOT NULL é independente.                     |
| UNIQUE                 | PostgreSQL permite vários NULL por defeito.                                                |
| CASCADE                | Propaga do objeto referenciado para as linhas que o referem.                               |
| X⁺                     | Começa em X; aplica dependências até estabilizar.                                          |
| Superchave / candidata | Determina todos os atributos / além disso é mínima por inclusão.                           |
| Atributo primo         | Pertence a alguma chave candidata.                                                         |
| 2FN                    | Sem dependência parcial de não primos numa parte própria de uma chave candidata.           |
| 3FN                    | Para X→A não trivial, X é superchave ou A é primo.                                         |
| BCNF                   | Para X→Y não trivial, X é superchave.                                                      |
| Sem perda, binária     | A interseção determina uma das relações, sob as dependências funcionais.                   |
| Preservação            | Regras projetadas permitem verificar as originais sem junção. É uma propriedade diferente. |

[Normalização](../normalizacao/).

## SQL

- Ordem lógica: FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY, LIMIT.
- WHERE conserva verdadeiro; NULL em comparações dá desconhecido. Usa IS NULL.
- COUNT(*) conta linhas; COUNT(coluna) conta valores não nulos. SUM vazio dá NULL.
- LEFT JOIN conserva o lado esquerdo. Filtro da direita no WHERE pode eliminar as linhas sem correspondência.
- NOT IN pode dar desconhecido com NULL. NOT EXISTS testa ausência de linhas.
- «Todos»: não existe um candidato sem correspondência. Sobre conjunto vazio, pode aceitar por vacuidade.
- UNION elimina repetidos; UNION ALL conserva. Janela OVER mantém linhas; GROUP BY reduz grupos.
- Álgebra relacional clássica usa conjuntos; SQL conserva repetidos por defeito.

[Consultas](../consultas-relacionais/).

## Índices e pesquisa

| Escolha           | Condição                                                                               |
| ----------------- | -------------------------------------------------------------------------------------- |
| B-tree composto   | Igualdades iniciais e intervalo seguinte limitam a região. Ordem das colunas importa.  |
| Parcial           | A consulta tem de permitir demonstrar o predicado do índice.                           |
| Por expressão     | Adequado a consultas com a expressão correspondente.                                   |
| PK / UNIQUE       | Criam índice; FK no lado que referencia não cria índice automaticamente.               |
| EXPLAIN           | Estimativas; cost não são milissegundos.                                               |
| EXPLAIN ANALYZE   | Executa; observa tempos, rows e loops. Pode alterar dados.                             |
| Seq Scan          | Pode ser mais barato mesmo com índice.                                                 |
| Texto             | tsvector @@ tsquery; GIN pode apoiar correspondência; rank ordena.                     |
| Precisão / recall | Relevantes devolvidos / todos devolvidos; relevantes devolvidos / todos os relevantes. |

[Índices](../sql-indices/).

## Transações

- ACID: atomicidade, consistência, isolamento e durabilidade. Consistência exige invariantes e protocolo corretos.
- COUNT num trigger não reserva capacidade. Duas transações podem observar o mesmo lugar livre.
- Read Committed: snapshot por instrução. UPDATE condicionado da mesma linha coordena a reserva; verifica linhas afetadas.
- Repeatable Read: snapshot estável em PostgreSQL, mas não garante ausência de toda a anomalia de serialização.
- Serializable: pode abortar; repetir a transação completa com novo snapshot.
- Deadlock: ciclo de espera; ordenar bloqueios reduz risco.
- SAVEPOINT: ROLLBACK TO anula o que vem depois do ponto.
- BEFORE por linha pode alterar NEW ou ignorar a linha devolvendo NULL. AFTER continua dentro da transação; não significa depois de COMMIT.
- Trigger por instrução corre mesmo com zero linhas afetadas. OLD/NEW dependem da operação.
- Pagamento externo não é anulado pelo ROLLBACK da base de dados.

[Concorrência](../triggers-transacoes/).

## HTTP, arquitetura e segurança

| Mecanismo                | Fixar                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| GET/HEAD                 | Seguros e idempotentes.                                                                                      |
| PUT/DELETE               | Idempotentes; respostas repetidas podem diferir.                                                             |
| POST/PATCH               | Não idempotentes por definição.                                                                              |
| 401 / 403                | Autenticação necessária / operação recusada.                                                                 |
| 303 / 304                | Redirecionar para GET / representação em cache válida.                                                       |
| no-cache / no-store      | Guardar com validação / pedir que não se guarde.                                                             |
| Sessão                   | Identificador opaco no cliente; regenerar após autenticar.                                                   |
| HttpOnly                 | Impede leitura do cookie por JavaScript; não impede todas as ações de XSS.                                   |
| Origem                   | Esquema, host e porta. CORS não é autenticação nem proteção completa CSRF.                                   |
| MVC                      | Controlador coordena; modelo representa dados; vista produz representação; middleware e policies participam. |
| auth / policy / validate | Identidade / permissão sobre operação e objeto / domínio dos dados.                                          |
| fillable                 | Atribuição em massa, não autorização.                                                                        |
| N+1                      | Uma consulta inicial e uma por objeto; considerar eager loading.                                             |
| SQL injection            | Parâmetros para valores; lista autorizada para identificadores.                                              |
| XSS                      | Codificação por contexto ou sanitização de HTML permitido.                                                   |
| CSRF                     | Token verificado no servidor e defesas complementares. POST sozinho não chega.                               |
| Palavra-passe            | Hash próprio com salt e custo; password_verify, sem recuperar o original.                                    |

[HTTP](../http-estado/), [Laravel](../aplicacao-laravel/) e [segurança](../seguranca-web/).

## Informação, cliente e NoSQL

- Arquitetura de informação: organização, rótulos, navegação e pesquisa. Sitemap descreve estrutura; wireframe a página; protótipo as interações.
- Navegação global, local e contextual. Personalização usa um modelo; customização dá controlo explícito.
- Tab percorre focáveis, não todos os títulos. Rótulos, erros e foco têm de ser reconhecíveis.
- fetch pode resolver com erro HTTP; verificar ok/status. Respostas podem chegar fora de ordem.
- Medir percurso completo. Latência e throughput diferem; média e percentis também.
- NoSQL inclui modelos diferentes. Documentos embebidos aproximam leituras; referências evitam certas duplicações.
- Atomicidade de um documento não implica atomicidade de vários. Verificar sistema e versão.
- CAP: durante partição, há conflito entre as garantias definidas de consistência forte e disponibilidade; não é «escolher duas» sem contexto.

[Informação](../interfaces-acessiveis/), [desempenho](../cliente-desempenho/) e [NoSQL](../nosql/).
