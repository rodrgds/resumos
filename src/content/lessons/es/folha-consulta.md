---
title: Cheat sheet de Engenharia de Software
description: Distinções, condições, notação e decisões para rever a matéria.
section: recursos
studyKind: revision
order: 1
---

## Processo e planeamento

- **[Atividade / artefacto](/cadeiras/es/processos-software/#atividades-e-artefactos):** trabalho realizado / resultado produzido.
- **[Iteração / incremento](/cadeiras/es/processos-software/#iterativo-e-incremental):** rever uma solução / acrescentar capacidade utilizável.
- **[Preditivo / adaptativo](/cadeiras/es/processos-software/#planeamento-preditivo-e-adaptativo):** detalhe antecipado / detalhe crescente com feedback. Ambos têm planos.
- **[Monitorizar / controlar](/cadeiras/es/gestao-projetos/#âmbito-tarefas-e-dependências):** observar o trabalho / agir sobre a observação.
- **Marco:** ponto de verificação de um resultado.
- **[Esforço / duração](/cadeiras/es/introducao/#esforço-não-é-duração):** trabalho em pessoa-dias / tempo de calendário.
- **Comunicação:** $n(n-1)/2$ pares possíveis entre $n$ pessoas. Não conta reuniões nem horas.
- **RUP:** iterativo, incremental, orientado por casos de uso e centrado na arquitetura. As disciplinas atravessam as fases.

| [Fase RUP](/cadeiras/es/processos-software/#rup) | Objetivo dominante                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------ |
| Conceção                                         | Delimitar visão, âmbito, viabilidade e riscos                      |
| Elaboração                                       | Avaliar arquitetura e reduzir riscos; pode incluir código e testes |
| Construção                                       | Desenvolver e testar incrementos                                   |
| Transição                                        | Colocar em uso, apoiar e recolher feedback                         |

**Valores ágeis:** indivíduos/interações sobre processos/ferramentas; software em funcionamento sobre documentação extensa; colaboração sobre negociação de contratos; resposta à mudança sobre seguir um plano. Os itens da direita também têm valor.

## Scrum e padrões

| [Artefacto](/cadeiras/es/scrum/#artefactos-e-objetivos) | Conteúdo                               | Compromisso        |
| ------------------------------------------------------- | -------------------------------------- | ------------------ |
| Product Backlog                                         | Trabalho ordenado e evolutivo          | Product Goal       |
| Sprint Backlog                                          | Objetivo, itens e plano dos Developers | Sprint Goal        |
| Increment                                               | Passo utilizável                       | Definition of Done |

- **Product Owner:** valor e backlog; não impõe sozinho a quantidade de trabalho do Sprint.
- **Developers:** plano, incremento e qualidade; equipa autogerida com as competências necessárias.
- **Scrum Master:** compreensão de Scrum e eficácia; promove a remoção de impedimentos.
- **Pilares:** transparência, inspeção, adaptação. **Valores:** compromisso, foco, abertura, respeito, coragem. A confiança é destacada nos materiais, sem ser um sexto valor do Guide.

| Evento        | Finalidade                                               | Limite num Sprint de um mês |
| ------------- | -------------------------------------------------------- | --------------------------- |
| Planning      | Porquê, o quê, como                                      | 8 h                         |
| Daily         | Adaptar o plano para o Sprint Goal                       | 15 min                      |
| Review        | Inspecionar resultado e adaptar produto com stakeholders | 4 h                         |
| Retrospective | Melhorar processo e colaboração                          | 3 h                         |

- **Sprint:** duração fixa, até um mês. Nos mais curtos, Planning, Review e Retrospective costumam ser menores; Daily mantém 15 min.
- **Done:** critérios específicos da história e qualidade comum satisfeitos. Pode haver entrega antes da Review. Ready e Accepted são convenções complementares.
- **Mudanças:** Developers e Product Owner renegociam âmbito, preservando objetivo e qualidade. Trabalho incompleto volta ao backlog; só o PO pode cancelar por objetivo obsoleto.
- **Refinamento:** esclarecer, dividir e estimar itens; não é evento formal adicional.
- **[Padrões](/cadeiras/es/padroes-scrum/):** Stable Teams conserva conhecimento; Small Items divide por resultado útil; Yesterday's Weather usa trabalho recente; Swarming concentra ajuda; Information Radiator mostra estado; Testable Improvements exige resultado observável.

## Requisitos e modelos

| [Tipo de requisito](/cadeiras/es/requisitos-uml/#tipos-de-requisitos) | Pergunta                                                       |
| --------------------------------------------------------------------- | -------------------------------------------------------------- |
| Funcional                                                             | Que função ou comportamento?                                   |
| Não funcional                                                         | Que qualidade ou restrição?                                    |
| De domínio                                                            | Que regra vem do contexto? Pode ser funcional ou não funcional |

- **Engenharia de requisitos:** elicitar → analisar → especificar → validar; gerir mudanças. Validação pode preceder o software.
- **Verificável:** operação, dados, ambiente, carga, medida e limite. “95% em até 2 s” exige 950 sucessos em 1000 consultas, se falhas contam como incumprimento; a média não basta.
- **[História](/cadeiras/es/requisitos-uml/#histórias-de-utilizador):** quem, objetivo e razão. Três C: card, conversation, confirmation. INVEST: independente, negociável, com valor, estimável, pequena, testável.
- **[Aceitação / BDD](/cadeiras/es/requisitos-uml/#critérios-de-aceitação):** Dado contexto, Quando ação, Então resultado, incluindo estado final e recusas. Testes acordados não dispensam Done nem provam todos os requisitos.
- **[Rastreabilidade](/cadeiras/es/requisitos-uml/#protótipos-e-mudanças):** necessidade → requisito → desenho → teste. Requirements creep aumenta âmbito sem avaliar consequências.

| [UML](/cadeiras/es/modelacao-uml/) | Regra de leitura                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| Ator / caso de uso                 | Papel externo / resultado observável com valor; a fronteira define o sistema               |
| Include                            | Tracejado do caso base para o incluído; incorpora comportamento                            |
| Extend                             | Tracejado da extensão para o base; base com significado sozinho; não indica ordem temporal |
| Generalização                      | Triângulo vazio aponta para o geral; especialização tratável como esse conceito            |
| Multiplicidade                     | Lê na ponta oposta: $1$, $0..1$, $0..*$; não impede sobreposição temporal                  |
| Composição                         | Losango cheio no todo; uma parte tem no máximo um todo composto de cada vez                |
| Sequência                          | Tempo desce; síncrona espera, assíncrona continua; alt, opt, loop                          |
| Atividades                         | Decisão/junção para alternativas; fork/join para concorrência                              |
| Estados                            | `evento [guarda] / efeito`; efeito na transição tomada, ação de saída ao sair do estado    |

Na composição, apagar o todo destrói as partes que ainda lhe pertencem. Uma referência não implica composição: Sala não pertence ao ciclo de vida de Reserva.

## Gestão: caminho, risco, estimativas

- **[Caminho crítico](/cadeiras/es/gestao-projetos/#âmbito-tarefas-e-dependências):** caminho de maior duração na rede, sob as hipóteses de recursos do plano. Recursos partilhados podem impedir sobreposição.
- **[Risco](/cadeiras/es/gestao-projetos/#riscos-e-reservas):** possibilidade incerta; regista causa, consequência, sinais, resposta e responsável. Exposição $pI$, com probabilidade $p$ e impacto $I$, não prevê o atraso efetivo.
- **[Estimativa](/cadeiras/es/gestao-projetos/#estimar):** previsão com âmbito, hipóteses e incerteza. Pontos medem tamanho relativo; tarefas podem usar horas, sem conversão fixa. Planning poker discute diferenças, não calcula apenas a média.

**[Velocidade](/cadeiras/es/gestao-projetos/#velocidade-e-previsão):** trabalho Done por iteração. Para backlog $B$ em pontos e $v>0$ em pontos/Sprint:

$$N=\left\lceil\frac{B}{v}\right\rceil\text{ Sprints}.$$

- Exige capacidade, âmbito, estimativas e critérios comparáveis; não compara produtividade entre equipas.
- 18, 22 e 20 pontos dão média 20; 100 pontos sugerem 5 Sprints, ou 5 a 6 pelos extremos observados. Não é garantia nem intervalo estatístico.

| [Gráfico / limite](/cadeiras/es/gestao-projetos/#ler-um-burndown) | Interpretação                                                              |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Burndown                                                          | Trabalho restante; linha ideal é referência, não lei                       |
| 40 iniciais → 26 restantes                                        | 14 concluídos, se âmbito e estimativas se mantêm                           |
| Entraram mais 10                                                  | $40+10-26=24$ concluídos, sem outras mudanças                              |
| Burnup                                                            | Separa trabalho concluído de âmbito total                                  |
| [WIP](/cadeiras/es/gestao-projetos/#trabalho-em-curso)            | Trabalho começado e incompleto; limite depende de bloqueios e competências |

No modelo de quatro itens de três dias, sem dependências nem custo de alternância, WIP 1 antecipa o primeiro resultado (dia 3 em vez de 9); ambos acabam no dia 12. Não prova um limite ideal universal.

## Arquitetura

- **[4+1](/cadeiras/es/arquitetura-desenho/#vistas-e-uml):** lógica, implementação, processo, implantação; casos de uso relacionam e avaliam as quatro vistas.
- **Elementos:** pacote agrupa; componente oferece interfaces; artefacto é peça concreta; nó é recurso de execução. Módulo não é máquina.
- **[Coesão / acoplamento / ocultação](/cadeiras/es/arquitetura-desenho/#coesão-acoplamento-e-ocultação):** responsabilidades relacionadas / dependências entre módulos / decisões mutáveis atrás de contrato.
- **[Estilos](/cadeiras/es/arquitetura-desenho/#estilos-e-padrões):** camadas, cliente-servidor, MVC, pipes and filters, repositório. Podem coexistir; não substituem contratos.
- **Concorrência:** `criarSeLivre` atómica confirma ou recusa. `consultar` + `guardar` permite duas leituras de livre antes da gravação.
- **Biblioteca / framework:** aplicação chama / é chamada por inversão de controlo. Avalia interfaces, qualidade, licença, suporte e integração.
- **Decisão:** contexto, alternativas, escolha, consequências.

## Qualidade, XP e evolução

| [Distingue](/cadeiras/es/verificacao-validacao/) | Critério                                                                |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| Verificação / validação                          | Conforme à especificação / adequada à necessidade                       |
| Estático / dinâmico                              | Analisar representação / executar sistema ou modelo                     |
| Caixa preta / branca                             | Derivar da especificação / da estrutura interna                         |
| Unidade / integração / sistema / aceitação       | Unidade isolada / interação / sistema completo / critérios de aceitação |
| Severidade / prioridade                          | Impacto da falha / urgência de resolução                                |

- **Caso de teste:** estado inicial, entradas, condições e resultados esperados. **Oráculo:** justifica a expectativa independentemente da implementação. **Script:** concretiza passos.
- **Fronteiras inteiras de 30 a 120:** 29, 30, 31, 119, 120, 121. Recusa 29 e 121; adapta o passo para outra precisão.
- **[Intervalos](/cadeiras/es/verificacao-validacao/#um-exemplo-com-intervalos):** para $i_1<f_1$ e $i_2<f_2$, os semiabertos sobrepõem-se se $i_1<f_2$ e $i_2<f_1$. Adjacentes não se sobrepõem.
- **Cobertura:** mede execução, não correção do oráculo nem ausência de defeitos. Testes sequenciais não exercitam corridas; um substituto com sucesso fixo não prova integração.
- **Defeito:** versão/ambiente, estado inicial, passos, esperado, observado.
- **[TDD](/cadeiras/es/xp/#tdd):** falha pelo comportamento esperado → passa → refactoring com nova verificação. Erro de preparação não demonstra red.
- **[Refactoring](/cadeiras/es/xp/#refactoring):** muda estrutura, preserva comportamento observável. Mudar um limite funcional exige outro requisito.
- **[Planning game](/cadeiras/es/xp/#prioridade-estimativa-e-compromisso):** cliente prioriza por valor, equipa estima; negocia âmbito/data, não baixa números para caber.
- **Par:** driver escreve, navigator acompanha decisões; trocam papéis. **CI:** integração frequente com feedback automatizado.
- **[Delivery / deployment](/cadeiras/es/construcao-evolucao/#entrega-e-implantação):** manter entregável com decisão de implantação / implantar automaticamente após os critérios. Recuperação inclui dados e migrações.
- **[Manutenção](/cadeiras/es/construcao-evolucao/#manutenção):** corretiva, defeito; adaptativa, ambiente; perfetiva, capacidade; preventiva, risco futuro. Classifica pelo motivo, não pelo tamanho da alteração.
- **[Retrospetiva](/cadeiras/es/melhoria-processo/#cinco-passos):** preparar → reunir dados → interpretar → escolher ações → acompanhar. Define responsável, prazo e medida; antes/depois não prova causalidade.
- **[Projeto](/cadeiras/es/projeto/#relatório-de-desenvolvimento):** liga visão, requisitos, modelos, arquitetura, testes, gestão e aprendizagem. Demonstra estado inicial, sucesso, estado final, recusa e limites. Protótipo vertical atravessa partes reais; ecrãs fictícios não provam integração.
