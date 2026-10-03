---
title: Cheat sheet de Engenharia de Software
description: Distinções, condições, notação e decisões para rever a matéria.
section: recursos
studyKind: revision
order: 1
---

## Processo e gestão

| Distingue                                                                               | Critério                                                                   |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Atividade e artefacto](/cadeiras/es/processos-software/#atividades-e-artefactos)       | A atividade produz ou altera; o artefacto é o resultado                    |
| [Iteração e incremento](/cadeiras/es/processos-software/#iterativo-e-incremental)       | Iterar revê; incrementar acrescenta capacidade                             |
| [RUP](/cadeiras/es/processos-software/#rup)                                             | Conceção, elaboração, construção e transição; disciplinas atravessam fases |
| [Preditivo e ágil](/cadeiras/es/processos-software/#planeamento-preditivo-e-adaptativo) | Diferem no detalhe e momento do planeamento; ambos podem receber feedback  |
| [Esforço e duração](/cadeiras/es/introducao/#esforço-não-é-duração)                     | Pessoa-dias não se convertem livremente em dias de calendário              |

Pares possíveis numa equipa: $n(n-1)/2$, ou seja não mede reuniões nem custo real.

[Caminho crítico](/cadeiras/es/gestao-projetos/#âmbito-tarefas-e-dependências): maior duração entre caminhos de dependências, sob recursos e hipóteses do plano.

[Velocidade](/cadeiras/es/gestao-projetos/#velocidade-e-previsão): trabalho Done por Sprint. Previsão simples: $\lceil \text{backlog}/v \rceil$. Exige unidade, capacidade e critérios comparáveis; não compares equipas por pontos.

[Burndown](/cadeiras/es/gestao-projetos/#ler-um-burndown): mostra trabalho restante. Desvio da linha ideal é sinal para investigar, não quantidade obrigatória a cortar. Burnup pode mostrar crescimento de âmbito.

## Scrum e XP

| Conceito        | Lembra                                               |
| --------------- | ---------------------------------------------------- |
| Product Backlog | Trabalho ordenado; compromisso Product Goal          |
| Sprint Backlog  | Sprint Goal, itens escolhidos e plano dos Developers |
| Increment       | Utilizável e conforme à Definition of Done           |
| Product Owner   | Valor e gestão do backlog                            |
| Developers      | Plano, qualidade e incremento                        |
| Scrum Master    | Compreensão de Scrum e eficácia da equipa            |
| Review          | Produto e futuro do backlog                          |
| Retrospective   | Processo, qualidade e colaboração                    |

[Scrum](/cadeiras/es/scrum/#artefactos-e-objetivos): Sprint de um mês ou menos; Daily de 15 minutos. Critérios da história e Definition of Done complementam-se. Definition of Ready é uma prática adicional.

[XP](/cadeiras/es/xp/#valores-e-práticas): feedback técnico, TDD, integração, refactoring, pares, entregas pequenas, desenho simples e ritmo sustentável.

[TDD](/cadeiras/es/xp/#tdd): teste falha pelo comportamento pretendido, implementação passa, refactoring preserva resultados. Erro de preparação não prova o caso.

[Refactoring](/cadeiras/es/xp/#refactoring): muda estrutura, preserva comportamento observável. Mudar um limite funcional exige outro requisito e outra expectativa.

## Requisitos e modelos

[Engenharia de requisitos](/cadeiras/es/requisitos-uml/#análise-especificação-e-validação): elicitar, analisar, especificar e validar; gerir mudanças ao longo do processo.

| Tipo          | Pergunta                                                       |
| ------------- | -------------------------------------------------------------- |
| Funcional     | Que função ou comportamento deve existir?                      |
| Não funcional | Que qualidade ou restrição tem de ser respeitada?              |
| De domínio    | Que regra vem do contexto? Pode ser funcional ou não funcional |

[Histórias](/cadeiras/es/requisitos-uml/#histórias-de-utilizador): quem, objetivo e razão. Card, conversation, confirmation. INVEST: independente, negociável, com valor, estimável, pequena e testável.

[Aceitação](/cadeiras/es/requisitos-uml/#critérios-de-aceitação): Dado contexto, Quando ação, Então resultado. Inclui estado final e casos de recusa.

[Casos de uso](/cadeiras/es/modelacao-uml/#casos-de-uso): ator é papel externo; caso produz resultado com valor; fronteira define o sistema.

- Include: seta tracejada do caso que inclui para o incluído.
- Extend: seta tracejada da extensão para o base, com condição e ponto de extensão.
- Generalização: triângulo vazio para o elemento geral.

[Classes](/cadeiras/es/modelacao-uml/#classes-e-modelo-de-domínio): lê multiplicidade na ponta oposta. $1$, exatamente uma; $0..1$, nenhuma ou uma; $0..*$, nenhuma ou várias. Restrições temporais precisam de regras adicionais.

[Composição](/cadeiras/es/modelacao-uml/#relações-entre-classes): losango cheio no todo, propriedade forte e ciclo de vida das partes. Referência não implica composição.

[Sequência](/cadeiras/es/modelacao-uml/#sequência-e-colaboração): tempo desce; mensagens ligam participantes; alt, alternativas; opt, opção; loop, repetição. Guardas dizem quando acontece.

[Atividades e estados](/cadeiras/es/modelacao-uml/#atividades-e-estados): decisão escolhe caminhos; fork e join tratam concorrência. Estado é situação de um objeto, não um ecrã. Transição: `evento [guarda] / efeito`.

## Arquitetura

[Vistas 4+1](/cadeiras/es/arquitetura-desenho/#vistas-e-uml): lógica, implementação, processo e implantação, relacionadas por cenários.

Pacote agrupa elementos. Componente encapsula comportamento e interfaces. Artefacto é uma peça concreta. Nó é recurso de execução.

[Desenho](/cadeiras/es/arquitetura-desenho/#coesão-acoplamento-e-ocultação): responsabilidades coesas, dependências explícitas e decisões variáveis escondidas por contratos. Uma interface tem de permitir preservar as regras.

[Estilos](/cadeiras/es/arquitetura-desenho/#estilos-e-padrões): camadas, cliente-servidor, MVC, pipes and filters e repositório respondem a preocupações diferentes e podem combinar-se.

## Qualidade e evolução

| Distingue                                                                                         | Critério                                                    |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Verificação e validação](/cadeiras/es/verificacao-validacao/#verificação-e-validação)            | Conforme à especificação e adequado à necessidade           |
| Estático e dinâmico                                                                               | Analisar representação e executar                           |
| [Caixa preta e branca](/cadeiras/es/verificacao-validacao/#caixa-preta-e-caixa-branca)            | Derivar da especificação e da estrutura interna             |
| [Unidade, integração, sistema, aceitação](/cadeiras/es/verificacao-validacao/#níveis-e-objetivos) | Unidade, interação, sistema completo e decisão de aceitação |
| [Severidade e prioridade](/cadeiras/es/verificacao-validacao/#defeitos-e-regressão)               | Impacto e urgência                                          |
| [Delivery e deployment](/cadeiras/es/construcao-evolucao/#entrega-e-implantação)                  | Preparar entrega e implantar automaticamente                |

[Caso de teste](/cadeiras/es/verificacao-validacao/#caso-de-teste-e-oráculo): estado inicial, entradas, condições e resultados esperados. Oráculo independente da implementação. Cobertura mede execução, não prova correção.

[Intervalos semiabertos](/cadeiras/es/verificacao-validacao/#um-exemplo-com-intervalos): com início anterior ao fim em ambos os intervalos, há sobreposição se $i_1<f_2$ e $i_2<f_1$. Intervalos adjacentes não se sobrepõem.

[Manutenção](/cadeiras/es/construcao-evolucao/#manutenção): corretiva, defeitos; adaptativa, ambiente; perfetiva, capacidade; preventiva, problemas futuros.

[Retrospetiva](/cadeiras/es/melhoria-processo/#cinco-passos): preparar, reunir dados, interpretar, escolher ações e acompanhar. Uma melhoria precisa de ação, prazo e evidência.

[Projeto](/cadeiras/es/projeto/#relatório-de-desenvolvimento): documenta para a próxima equipa. Um [protótipo vertical](/cadeiras/es/projeto/#um-protótipo-vertical) atravessa partes da solução; uma demonstração identifica versão, cenário e limitações.
