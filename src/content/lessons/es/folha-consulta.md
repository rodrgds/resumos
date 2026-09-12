---
title: Cheat sheet de ES
description: Escolhas e entregáveis de processos, requisitos, gestão, arquitetura, construção e testes.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos ES SofiaViP
      url: https://drive.google.com/file/d/180eozddl6KckJEDmwEN3Rp_-nWlXQ-1b/view
  coverage: Síntese das páginas 2 a 14 do resumo, sobre processos, requisitos e modelos, gestão, arquitetura, construção, Scrum, verificação e testes.
  gaps:
    - A página 1 é capa; os exemplos e listas de padrões Scrum e de apresentação da página 14 não são material de procedimento nesta folha.
    - A fonte não desenvolve um método completo de estimativa, métricas de cobertura, segurança ou operação após entrega.
    - A correspondência destes apontamentos a uma edição atual da unidade curricular não foi verificada.
---

Em ES, a pergunta prática é **que incerteza queres reduzir e que evidência prova que a reduziste?** Liga cada decisão a um artefacto verificável: requisito, modelo, incremento, teste ou registo de defeito.

## Processo e gestão

| Se o problema é…                           | Escolhe e acompanha…                                                                                                                                                                                                 |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mudança de requisitos previsível ou tardia | Um processo por etapas pode planear mais cedo; desenvolvimento incremental entrega partes para obter retorno e ajustar prioridades. O modelo em cascata torna a mudança tardia mais cara.                            |
| Incerteza técnica ou de uso                | Um protótipo testa uma hipótese antes de fixar a solução; não confundas o protótipo com produto pronto para manutenção.                                                                                              |
| Coordenar uma equipa iterativa             | Uma lista priorizada de trabalho, um objetivo de iteração e um incremento verificável. Acompanhamento mede progresso contra entregáveis, não apenas tempo ocupado.                                                   |
| Decidir o que cabe no prazo                | Estima esforço e risco, compara capacidade observada com trabalho restante e ajusta âmbito com quem define prioridades. O triângulo âmbito, tempo e recursos tem qualidade como restrição, não como variável grátis. |

RUP organiza iterações em torno de casos de uso e arquitetura; XP destaca práticas de construção como testes, integração e refatoração; Scrum organiza trabalho e retorno em ciclos curtos. Estas descrições ajudam a comparar responsabilidades, não obrigam a aplicar um modelo puro. Em Scrum, o **Product Owner** ordena o trabalho pelo valor, a equipa decide como o executar e o **Scrum Master** ajuda a remover impedimentos; a revisão inspeciona o incremento, a retrospetiva inspeciona o modo de trabalhar. Vê [processos de software](/cadeiras/es/processos-software/#rup-xp-e-scrum-lado-a-lado) e [planeamento](/cadeiras/es/gestao-projetos/#planear-e-monitorizar).

## Requisitos e modelos

Um requisito **funcional** descreve uma capacidade ou comportamento; um **não funcional** impõe uma qualidade ou restrição observável. Escreve ambos de modo que se possa testar se foram cumpridos. O percurso é elicitar necessidades com as partes interessadas, analisar conflitos e prioridades, especificar e validar o entendimento. Uma história de utilizador regista uma necessidade em pouco texto; critérios de aceitação dão os limites que a tornam verificável. Vê [tipos de requisitos](/cadeiras/es/requisitos-uml/#tipos-de-requisitos) e [elicitação a validação](/cadeiras/es/requisitos-uml/#da-elicitação-à-validação).

| Modelo                    | Pergunta que responde                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Casos de uso              | Quem interage com o sistema e que objetivo obtém? Inclui fronteira, atores e cenário, sem tratar o desenho como especificação completa. |
| Modelo de domínio/classes | Que conceitos, atributos, relações e restrições existem? Separa conceitos do domínio de decisões de implementação.                      |
| Sequência                 | Que objetos ou componentes trocam mensagens e em que ordem num cenário?                                                                 |
| Estados                   | Que estados e transições governam um objeto ao longo do tempo?                                                                          |
| Atividades                | Que passos, decisões e fluxos paralelos compõem um processo?                                                                            |
| Componentes e implantação | Que módulos fornecem ou exigem interfaces e onde correm os artefactos?                                                                  |

Escolhe a vista pelo erro que precisas de evitar. Um diagrama claro e pequeno pode comunicar melhor do que vários sem pergunta definida. Consulta [casos de uso](/cadeiras/es/requisitos-uml/#casos-de-uso-em-uml) e [classes e sequência](/cadeiras/es/arquitetura-desenho/#diagramas-de-classes-e-de-sequência).

## Arquitetura e construção

A arquitetura fixa componentes, relações, interfaces e princípios que tornam certas mudanças fáceis ou difíceis. Compara padrões com o fluxo real: **camadas** se queres separar responsabilidades; **MVC** se apresentação e interação devem evoluir sem misturar o modelo; **pipes and filters** se dados passam por transformações; **repositório** se vários componentes precisam de um ponto comum para dados. Define dependências e interfaces antes de escolher um nome de padrão. Vê [estilos de arquitetura](/cadeiras/es/arquitetura-desenho/#estilos-de-arquitetura).

Na construção, entrega alterações pequenas e integráveis. Um teste escrito antes do comportamento pode esclarecer o contrato; refatorar muda a estrutura interna sem alterar o comportamento observado. Integração contínua junta alterações frequentemente e executa verificações em cada integração. A manutenção **corretiva** repara falhas, a **adaptativa** responde a mudanças do ambiente e a **perfectiva** melhora ou acrescenta capacidades. Vê [práticas XP](/cadeiras/es/construcao-evolucao/#práticas-xp-na-construção) e [tipos de manutenção](/cadeiras/es/construcao-evolucao/#evolução-e-tipos-de-manutenção).

## Verificar, validar e testar

**Verificação:** o produto cumpre a especificação? **Validação:** resolve a necessidade de quem o usa? Revisões, inspeções e análise estática examinam artefactos sem executar o programa; testes observam execução. São complementares. Um teste mostra a presença de um defeito quando falha, não demonstra a ausência de todos os defeitos quando passa.

| Nível      | Evidência procurada                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| Unidade    | Uma pequena parte cumpre o seu contrato.                                                                  |
| Integração | Partes ligadas comunicam corretamente.                                                                    |
| Sistema    | O sistema completo cumpre requisitos observáveis.                                                         |
| Aceitação  | O cliente ou utilizador decide segundo critérios acordados.                                               |
| Regressão  | Uma alteração não voltou a quebrar comportamento já aceite; repete testes adequados de níveis anteriores. |

Para derivar casos, parte dos critérios de aceitação, fronteiras de valores, partições de entradas e estados/transições relevantes. O método **caixa preta** usa comportamento especificado; **caixa branca** usa a estrutura do programa. Regista defeitos com condição inicial, passos, resultado esperado e observado, para que outra pessoa os reproduza. Vê [níveis de teste](/cadeiras/es/verificacao-validacao/#níveis-de-teste) e [inspeções](/cadeiras/es/verificacao-validacao/#inspeções-e-análise-estática).
