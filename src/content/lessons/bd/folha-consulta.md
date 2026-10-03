---
title: Cheat sheet de BD
description: Chaves, formas normais, decomposição, álgebra, SQL, isolamento e decisões de desenho.
section: recursos
studyKind: revision
---

Esta folha reúne as regras e decisões já explicadas nas lições, para rever antes de resolver exercícios.

## Modelação e relações

| Construção    | Tradução e cuidado                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| Classe        | Relação com atributos e chave. Um nome repetível não identifica um objeto.                              |
| 1:N           | FK no lado N; `NOT NULL` se tiver de referenciar alguém. Não obriga cada objeto do lado 1 a participar. |
| N:M           | Relação da associação, FKs e chave segundo as multiplicidades. Atributos da ligação ficam aqui.         |
| 1:1           | FK com `UNIQUE`; `NOT NULL` para obrigatoriedade no lado que a guarda.                                  |
| Ternária      | Relação com os participantes. Multiplicidade num lado conta-o para um par fixo dos outros dois.         |
| Generalização | Por classe, por tipo concreto ou tabela única. Confere completude e disjunção separadamente.            |

A multiplicidade junto de uma classe conta objetos **dessa classe** por objeto da outra. Uma classe de associação não distingue várias ligações do mesmo par. Uma FK não impõe mínimos de participação no lado referenciado. [UML](/cadeiras/bd/modelo-conceptual-uml/#associações-e-multiplicidades) · [Mapeamento](/cadeiras/bd/mapeamento-relacional/#associações-um-para-muitos).

## Dependências e formas normais

$X\to Y$ significa que concordar em X obriga a concordar em Y em todas as instâncias válidas. Para $X^+$, começa em X e aplica DFs cujas esquerdas já tens, até estabilizar. Superchave: fecho completo. Candidata: superchave mínima. Primo: pertence a alguma candidata. [Fechos e chaves](/cadeiras/bd/normalizacao/#fecho-de-um-conjunto-de-atributos).

| Forma | Critério                                                        |
| ----- | --------------------------------------------------------------- |
| 1FN   | Valores atómicos no modelo, sem grupos repetidos.               |
| 2FN   | Não primo não depende de parte própria de candidata.            |
| 3FN   | Para cada DF não trivial $X\to A$, X é superchave ou A é primo. |
| BCNF  | Em toda a DF não trivial, X é superchave.                       |

Pode haver 3FN sem BCNF: $AB\to C$, $C\to B$, candidatas AB e AC. C não é superchave, mas B é primo. [Classificação](/cadeiras/bd/normalizacao/#classificar-uma-relação).

## Decomposição

| Objetivo           | Como conferir                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Sem perda, binária | O comum determina um dos lados: $(R_1\cap R_2)\to R_1$ ou $R_2$.                                                 |
| Sem perda, geral   | Chase. Unifica pelas DFs; procura uma linha só com símbolos distinguidos.                                        |
| Preservar DFs      | A união das projeções implica as DFs originais. Confere por fechos.                                              |
| BCNF               | Pela violação $X\to Y$, separa $X\cup Y$ e $R-(Y-X)$; projeta e repete.                                          |
| Síntese 3FN        | Cobertura mínima, relação por DF, retira esquemas contidos e acrescenta candidata se nenhuma relação a contiver. |

BCNF garante decomposição sem perda pelo algoritmo, mas pode perder preservação. Cobertura mínima: separa direitas, reduz esquerdas, retira DFs redundantes. Para testar redundância de uma DF, retira-a antes do fecho. [Decomposição](/cadeiras/bd/decomposicao/#decompor-até-bcnf).

## Álgebra relacional

| Operador          | Efeito                                                                   |
| ----------------- | ------------------------------------------------------------------------ |
| $\sigma_p$        | Filtra tuplos.                                                           |
| $\pi_X$           | Escolhe atributos e elimina duplicados.                                  |
| $\rho$            | Renomeia relação ou atributos.                                           |
| $\times$          | Todos os pares; cardinalidade $m n$.                                     |
| $\bowtie_p$       | Seleção de pares que satisfazem p.                                       |
| $\bowtie$         | Igualdade de todos os nomes comuns; sem comuns, produto.                 |
| $\ltimes_p$       | Conserva tuplos da esquerda com correspondência, sem colunas da direita. |
| $\gamma$          | Agrupa e agrega, extensão da álgebra clássica.                           |
| $\cup,\cap,-$     | Esquemas compatíveis; diferença tem direção.                             |
| $R(X,Y)\div S(Y)$ | X ligados a todos os Y de S.                                             |

Divisão: candidatos $\pi_X(R)$; faltas $(\pi_X(R)\times S)-R$; retira candidatos com faltas. Se S vazia, devolve $\pi_X(R)$. Para outro universo de candidatos, define-o explicitamente. [Álgebra](/cadeiras/bd/algebra-relacional/#divisão-perguntas-com-todos).

## SQLite e SQL

- `PRAGMA foreign_keys = ON` por ligação, antes da transação. FK composta declara-se em conjunto.
- `CHECK` rejeita falso, não desconhecido. Usa `NOT NULL` para obrigatoriedade.
- `UNIQUE` permite vários `NULL`. Em primárias textuais/compostas comuns, declara `NOT NULL` explicitamente.
- `INTEGER` é afinidade em tabelas comuns; `VARCHAR(20)` não limita comprimento. `STRICT` tem outro contrato.
- `5 / 2 = 2`; usa operando real para divisão real.
- `WHERE` filtra linhas; `HAVING` filtra grupos. Não agregues depois de uma junção sem conferir a multiplicação de linhas.
- `COUNT(*)` conta linhas; `COUNT(x)` ignora nulos; `COUNT(DISTINCT x)` ignora nulos e repetições.
- Agregação vazia sem `GROUP BY`: `COUNT = 0`; `SUM/AVG/MIN/MAX = NULL`. Com `GROUP BY`, não há grupos.
- `LEFT JOIN` conserva a esquerda. Filtros da direita no `WHERE` podem remover as linhas sem correspondência.
- `NULL = NULL` é desconhecido; usa `IS NULL`. `WHERE` conserva apenas verdadeiro.
- `NOT IN` com nulos pode não produzir a ausência pretendida. `NOT EXISTS` exprime ausência de correspondências.
- "Todos" equivale a `NOT EXISTS` de uma falta, usando outro `NOT EXISTS` dentro. Requisitos vazios satisfazem a condição universal.
- `DISTINCT` aplica-se à combinação completa. `ORDER BY` define a ordem; `LIMIT 1` não resolve empates por si só.

[DDL](/cadeiras/bd/sql-definicao-dados/#create-table-e-restrições) · [Consultas](/cadeiras/bd/sql-consultas/#group-by-e-having) · [Subconsultas](/cadeiras/bd/sql-subconsultas/#perguntas-com-todos).

## CTEs, vistas, gatilhos e acessos

CTE dura uma instrução. Recursão tem parte inicial, passo e prova de terminação. `UNION` elimina tuplos completos, não apenas o id; acrescentar profundidade pode impedir a eliminação de ciclos. [Recursão](/cadeiras/bd/sql-recursao/#grafos-e-ciclos).

Vista virtual guarda uma pergunta; materializada guarda resultados. SQLite atualiza vistas através de `INSTEAD OF`, não automaticamente. Gatilhos SQLite são por linha: INSERT tem NEW, DELETE tem OLD, UPDATE tem ambos. `UPDATE OF` não prova mudança de valor. Prefere restrições declarativas. [Vistas e gatilhos](/cadeiras/bd/vistas-gatilhos-acessos/#gatilhos-evento-condição-e-ação).

SQLite não tem `GRANT`/`REVOKE`/RLS. PostgreSQL separa privilégios, papéis e políticas por linha. RLS não concede privilégios; proprietário, superutilizador e `BYPASSRLS` têm regras de exceção. Parâmetros separam dados de código. [Acessos](/cadeiras/bd/vistas-gatilhos-acessos/#autenticação-e-autorização).

## Índices e transações

Índice não único acelera acesso, sem impor unicidade. Um composto ordena pela ordem das colunas; igualdade no prefixo e intervalo no seguinte são um padrão útil. Mais índices aumentam custo de escrita. Confere plano e distribuição. [Índices](/cadeiras/bd/indices-transacoes/#escolher-pelas-perguntas).

ACID: atomicidade, consistência, isolamento, durabilidade. `COMMIT` confirma; `ROLLBACK` desfaz a transação; `ROLLBACK TO` regressa ao savepoint. Um erro SQLite pode desfazer só a instrução. Confere linhas afetadas e trata o erro antes de confirmar. [Transações](/cadeiras/bd/indices-transacoes/#um-erro-não-faz-sempre-rollback-de-tudo).

## Concorrência

| Anomalia      | O que acontece                                           |
| ------------- | -------------------------------------------------------- |
| Suja          | Lê alteração ainda não confirmada.                       |
| Não repetível | Relê a linha e observa outra versão confirmada.          |
| Fantasma      | Muda o conjunto que satisfaz um predicado.               |
| Perdida       | Uma escrita sobrepõe outra atualização.                  |
| Write skew    | Escritas em linhas distintas quebram uma regra conjunta. |

Grafo: conflito é mesmo item e pelo menos uma escrita; aresta da operação anterior para a posterior. Acíclico significa serializável por conflitos. Snapshot estável não prova serializabilidade. PostgreSQL RR também evita fantasmas; serializable pode abortar e exige repetição. SQLite tem um escritor e pode rejeitar promoção de snapshot antigo. [Isolamento](/cadeiras/bd/concorrencia/#níveis-do-modelo-sql).

## Analítica e NoSQL

Define o grão antes das medidas. Factos ligam dimensões. Não somes saldos ao longo do tempo nem faças médias de percentagens sem pesos. Estrela tem dimensões diretas; floco normaliza dimensões; constelação partilha dimensões entre factos.

OLAP: roll-up agrega; drill-down detalha; slice fixa; dice restringe subconjuntos; pivot muda eixos. ROLLUP usa prefixos, CUBE todos os subconjuntos; não são comandos SQLite. [Armazéns](/cadeiras/bd/armazens-dados-nosql/#primeiro-escolhe-o-grão).

NoSQL inclui chave-valor, documentos, famílias de colunas e grafos. Esquema flexível não dispensa validação; NoSQL não exclui ACID. CAP trata consistência linearizável e disponibilidade **durante uma partição**, não a consistência de invariantes de ACID. Replicar copia; particionar distribui subconjuntos. [NoSQL](/cadeiras/bd/armazens-dados-nosql/#replicação-partição-e-cap).
