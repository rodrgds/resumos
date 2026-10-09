## Atividades do processo

Um **processo de software** organiza atividades, responsabilidades, resultados e acompanhamento do desenvolvimento e manutenção. Um modelo simplifica essa organização.

| Atividade               | Resultado típico                        |
| ----------------------- | --------------------------------------- |
| Especificação           | Requisitos e critérios de aceitação     |
| Desenho e implementação | Modelos, decisões e código              |
| Validação               | Testes e feedback sobre as necessidades |
| Evolução                | Alterações verificadas e novas versões  |

Um **artefacto** é um resultado; uma **atividade** produz ou altera resultados; um **papel** define responsabilidades. Estas atividades podem repetir-se e sobrepor-se.

## Modelos e escolha

| Modelo                    | Organização e condição relevante                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cascata                   | Fases distintas, idealmente concluídas em sequência. Ajuda com requisitos estáveis; mudanças tardias obrigam a rever trabalho aprovado.          |
| Modelo V                  | Prepara testes em correspondência com as decisões: requisitos com sistema/aceitação, arquitetura com integração, unidades com testes de unidade. |
| Iterativo                 | Revê a mesma solução para a melhorar. Três versões do mesmo protótipo são iterações.                                                             |
| Incremental               | Acrescenta capacidade utilizável: consultar salas, depois reservar, depois cancelar. Um incremento pode exigir várias iterações.                 |
| Espiral                   | Cada ciclo define objetivos e alternativas, avalia riscos, desenvolve/valida e planeia o seguinte.                                               |
| Integração e configuração | Seleciona e adapta componentes existentes; verifica compatibilidade, licenças, atualizações e falhas das dependências.                           |

**Planeamento preditivo** antecipa atividades e acompanha desvios. **Planeamento adaptativo** detalha o trabalho incrementalmente com feedback. Ambos têm objetivos, planos e documentação. A escolha depende da estabilidade dos requisitos, risco, acesso a utilizadores e conformidade.

Uma migração com data fixa pode ter marcos planeados, enquanto uma API incerta exige uma experiência inicial com pergunta, prazo e critério de decisão.

## RUP

O **RUP** é iterativo e incremental, orientado por casos de uso e centrado na arquitetura.

| Fase                     | Objetivo dominante                                  |
| ------------------------ | --------------------------------------------------- |
| Conceção, Inception      | Delimitar visão, âmbito, viabilidade e riscos       |
| Elaboração, Elaboration  | Estabilizar arquitetura e reduzir riscos principais |
| Construção, Construction | Desenvolver e testar incrementos                    |
| Transição, Transition    | Colocar em uso, apoiar e recolher feedback          |

Cada fase pode conter várias iterações. As disciplinas atravessam as fases: implementar e testar um protótipo de concorrência na elaboração serve para avaliar a arquitetura.

## Valores ágeis

O Manifesto Ágil valoriza indivíduos e interações, software em funcionamento, colaboração com o cliente e resposta à mudança acima, respetivamente, de processos/ferramentas, documentação extensa, negociação de contratos e seguimento de um plano. Os itens da direita também têm valor.

[Comparação entre iteração e incremento](/cadeiras/es/processos-software/#iterativo-e-incremental).
