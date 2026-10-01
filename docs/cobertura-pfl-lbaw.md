# Cobertura de estudo de PFL e LBAW

Verificação em 1 de outubro de 2026. Esta matriz regista o âmbito e a evidência editorial. Não promete uma classificação nem demonstra que reproduz todas as perguntas de uma prova futura. Os enunciados de treino são próprios e as resoluções estão ligadas às explicações. Os documentos privados ficam em `/_data/` e não são publicados.

## Fontes atuais

PFL: [ficha 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587002) e [Moodle4363](https://moodle2627.up.pt/course/view.php?id=4363). Foram lidos aula0, aulas1–6 e folhas1–3. A avaliação atual tem 90% de teoria e 10% de trabalhos, com dois módulos de seis semanas. Os guiões atuais de Prolog e as provas atuais ainda não estavam publicados. Para aprofundar essa parte, usaram-se o programa atual, materiais históricos identificados como tal e o manual primário de SWI-Prolog. O motor do site é SWI; a ficha indica SICStus, cuja compatibilidade não foi executada.

LBAW: [ficha 2026/27](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587001), [Moodle4222](https://moodle2627.up.pt/course/view.php?id=4222) e [plano atual do semestre](https://docs.google.com/spreadsheets/d/e/2PACX-1vTm1WlNzZqrCttNHAnZe7Kzq_EJUiGZatZVK5QVfoo-GZlnngu6Xq6COshlPym2Jl3iHQkvU1gUpmbZ/pubhtml?gid=979371688&single=true). Foram lidos os quatro conjuntos de slides, introduction (34 páginas), requirements (29), information architecture (95) e database specification (51), além das páginas das primeiras três semanas e da FAQ atual. A ficha pública não tinha o programa detalhado. O plano confirma o âmbito futuro, incluindo cliente, desempenho, recuperação de informação e NoSQL. A avaliação indicada pela apresentação e FAQ é 80% de projeto e 20% de teste, mínimo 8/20 no teste e limite final de teste+5.

## PFL

Onze capítulos, onze conjuntos de treino, 34 questões e uma cheat sheet fora da sequência de leitura.

| Tópico                                      | Página                     | Treino                   | Evidência e limite                                                                    |
| ------------------------------------------- | -------------------------- | ------------------------ | ------------------------------------------------------------------------------------- |
| Expressões, aplicação, tipos e domínio      | haskell-expressoes-tipos   | praticar-expressoes, 3   | Aulas atuais e programa; distinguir erro de tipo e parcialidade.                      |
| Polimorfismo, classes e currying            | polimorfismo-classes       | praticar-tipos, 3        | Aulas atuais; hierarquia Num verificada no GHC moderno.                               |
| Listas, compreensões e algoritmos           | listas-recursao            | praticar-listas, 4       | Aulas4–6 e folhas2–3; inserção, merge sort, divisores, grupos e bits.                 |
| Ordem superior, folds e avaliação           | funcoes-ordem-superior     | praticar-funcoes, 3      | Programa atual; média total e lista infinita com condições de avaliação.              |
| Tipos algébricos, árvores e invariantes     | tipos-algebricos-recursao  | praticar-arvores, 3      | Programa atual; custo depende da altura, não de equilíbrio automático.                |
| IO, parsers, precedência e falha            | entrada-saida-parsers      | praticar-parsers, 3      | Programa atual e Hutton; contrato determinístico, progresso e entrada restante.       |
| Propriedades, geradores e shrinking         | testes-quickcheck          | praticar-propriedades, 3 | Programa atual e Hutton; contraexemplo reduzido não é mínimo garantido.               |
| Horn, unificação, SLD e negação             | logica-unificacao-prolog   | praticar-unificacao, 3   | Programa atual e manual SWI; distinguir termos finitos de rational trees.             |
| Modos, recursão, aritmética e corte         | prolog-recursao-procura    | praticar-prolog, 3       | Programa atual e manual SWI; resultados instanciados e efeito do corte.               |
| Recolha de soluções, listas-diferença e DCG | solucoes-estruturas-prolog | praticar-solucoes, 3     | Complemento técnico; confirmar peso nos guiões atuais quando publicados.              |
| DFS, BFS, minimax e símbolos                | procura-jogos-simbolos     | praticar-procura, 3      | Procura e jogos previstos no programa; exemplos próprios, sem prova atual disponível. |

## LBAW

Treze capítulos, treze conjuntos de treino, 43 questões e uma cheat sheet. O percurso trata o teste individual; não substitui os artefactos, as revisões ou a apresentação do projeto.

| Tópico                                   | Página                | Treino                   | Evidência e limite                                                                                       |
| ---------------------------------------- | --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Requisitos e processo                    | requisitos            | praticar-requisitos, 3   | Slides atuais01b e páginas atuais; atores, histórias, critérios e requisitos suplementares.              |
| UML e restrições                         | modelo-conceptual     | praticar-modelo, 3       | Slides atuais03; multiplicidades, identidade e especialização.                                           |
| Esquema e integridade                    | esquema-relacional    | praticar-esquema, 3      | Slides atuais03 e PostgreSQL; CHECK com NULL, FK e limites da conversão.                                 |
| Dependências e BCNF                      | normalizacao          | praticar-normalizacao, 4 | Slides atuais03; fechos, chaves, 3FN, BCNF, perda e preservação.                                         |
| SQL e álgebra                            | consultas-relacionais | praticar-consultas, 4    | Revisão relacional; NULL, junções, grupos, quantificação, conjuntos e janelas.                           |
| Índices e recuperação de informação      | sql-indices           | praticar-indices, 3      | Plano atual e PostgreSQL; composto, parcial, expressão, planos, GIN, precisão e recall.                  |
| Triggers, transações e concorrência      | triggers-transacoes   | praticar-transacoes, 4   | Plano atual e PostgreSQL; corrida reproduzida, bloqueio, snapshots, deadlock e rollback.                 |
| HTTP e estado                            | http-estado           | praticar-http, 3         | Plano atual, RFC9110 e MDN; sem slides específicos atuais ainda.                                         |
| Servidor e Laravel                       | aplicacao-laravel     | praticar-arquitetura, 3  | Stack confirmada na FAQ atual; documentação Laravel primária, fragmentos não são uma aplicação completa. |
| Segurança web                            | seguranca-web         | praticar-seguranca, 4    | Revisão necessária à aplicação; OWASP e Laravel, peso exato por confirmar nos materiais atuais.          |
| Informação, usabilidade e acessibilidade | interfaces-acessiveis | praticar-informacao, 3   | Slides atuais02, plano e W3C; quatro sistemas, entregáveis e avaliação.                                  |
| Cliente e desempenho                     | cliente-desempenho    | praticar-desempenho, 3   | Plano atual e MDN; fetch, estados, respostas fora de ordem e medidas.                                    |
| NoSQL                                    | nosql                 | praticar-nosql, 3        | Plano atual; modelos e CAP fundamentados por fontes primárias. Produto e detalhe da aula por confirmar.  |

## Verificação técnica

Os 18 programas executáveis das lições foram extraídos dos mesmos atributos ou ficheiros raw que alimentam CodePlayground e executados. Onze são de PFL e sete de LBAW. Os resultados foram comparados com os resultados explicados. Os dois editores de exercício que começam em `undefined` são tarefas para completar, não exemplos finais que se apresentam como corretos.

Ambientes nativos: GHC9.10.3, SWI-Prolog9.2.9, PHP8.4.25, SQLite da biblioteca Python e Node.js. Os exemplos específicos da base de dados foram verificados em PostgreSQL17.11. Estes não são todos os mesmos binários das Workers do site. A verificação no navegador complementa a execução nativa. Não foi confirmada nesta passagem a execução Haskell no navegador: a tentativa local não tinha o servidor separado4324 disponível quando o iframe o pediu. Os programas Haskell passaram no ambiente nativo. A revisão final agregada deve iniciar esse servidor conforme docs/execucao.md.

Uma prova com duas ligações PostgreSQL reproduziu o trigger antigo de COUNT: ambas as compras confirmaram, deixando dois bilhetes para lotação1. Com UPDATE condicionado, confirmou-se que a segunda compra esperava num bloqueio de linha e depois afetava zero linhas. O estado final foi zero lugares livres e um bilhete. Também foram executados o trigger de histórico com ROLLBACK e a pesquisa com coluna tsvector gerada e índice GIN.

O parser completo mostrado em fragmentos foi montado e executado: `2+3*4` deu14, `(2+3)*4` deu20 e `2+x` conservou a entrada restante `+x`. Os resultados de ordenação, grupos, bits, folds, recolha Prolog, DFS/BFS, minimax, derivação simbólica, SQL e PHP foram executados. As cinco propriedades e o gerador apresentados foram executados com QuickCheck2.15.0.1: quatro propriedades passaram e a propriedade deliberadamente falsa de que ordenar é a identidade produziu um contraexemplo. O resultado aleatório não é apresentado como uma saída fixa.

As seis figuras DOT novas representam hierarquia de classes, divisão do merge sort, minimax, dependências, uma corrida concorrente e o percurso HTTP. As figuras Typst existentes foram preservadas quando explicam a mesma relação. Não há compilers enviados ao leitor.

## Lacunas a fechar com nova evidência

- Comparar os próximos slides e fichas de PFL, incluindo notação e bibliotecas SICStus.
- Comparar os próximos slides de LBAW com os capítulos antecipados pelo plano, sobretudo NoSQL, desempenho, recuperação de informação e segurança.
- Obter e resolver provas oficiais disponíveis, com ano e modalidade identificados. Ainda não foi feita uma comparação exaustiva com todas as provas históricas locais.
- Acrescentar questões quando uma prova ou ficha exigir uma técnica que esta matriz ainda não identifica. As contagens de perguntas não são uma demonstração de cobertura completa.

A revisão no navegador abriu oito páginas com treino, expandiu perguntas e pistas, confirmou respostas certa e errada de uma pergunta numérica e uma resposta de escolha, seguiu o link até à secção explicativa, executou o bloco SQL com o resultado esperado e confirmou a interação num ecrã de390px sem overflow da página. Foram inspecionadas imagens de desktop e móvel. Os77 links das perguntas para secções foram verificados no HTML gerado; links relativos antigos entre lições foram corrigidos para caminhos públicos absolutos.
