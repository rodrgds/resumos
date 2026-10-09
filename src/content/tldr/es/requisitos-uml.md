## Objetivos e tipos de requisitos

- **Objetivo:** resultado desejado, como reduzir o tempo para encontrar uma sala. **Requisito:** função ou propriedade acordada da solução.
- **Funcional:** comportamento, como permitir cancelar uma reserva futura do próprio estudante.
- **Não funcional:** qualidade ou restrição do produto ou desenvolvimento, como desempenho, segurança ou ambiente suportado.
- **De domínio:** regra proveniente do contexto. Pode ser funcional ou não funcional; as categorias não são exclusivas.

## Elicitação, análise e validação

1. **Elicita:** descobre necessidades com entrevistas, observação, questionários, brainstorming e protótipos. Distingue uma solução pedida, como um mapa 3D, da necessidade que a justifica.
2. **Analisa:** resolve omissões e conflitos, avalia viabilidade e prioridade.
3. **Especifica:** regista o acordo em requisitos, histórias, modelos, glossário e critérios.
4. **Valida:** confirma com stakeholders que o acordo representa as necessidades. Pode acontecer antes de existir software.

Em **MoSCoW**, Must é indispensável ao âmbito; Should é importante mas adiável; Could depende da capacidade; Won't fica fora do âmbito acordado, sem excluir trabalho futuro.

Um requisito deve ser claro, consistente, necessário, viável e suficientemente completo. Para desempenho, define operação, dados, ambiente, carga, medida e limite. Exemplo: com 200 utilizadores simultâneos, pelo menos 95% das consultas respondem corretamente em até dois segundos. Em 1000 consultas, pelo menos 950 cumprem; falhas contam como incumprimento. Uma média inferior a dois segundos não garante este critério.

## Histórias e aceitação

Uma **user story** liga quem, o que e porquê: «Como estudante, quero reservar uma sala para garantir lugar para o grupo». Os três C são **card**, registo breve; **conversation**, detalhes discutidos; **confirmation**, critérios de confirmação.

**INVEST:** Independent, Negotiable, Valuable, Estimable, Small e Testable. Serve para discutir dependências, valor, dimensão e verificação. Uma **épica** precisa de ser dividida; «implementar a tabela» é uma tarefa técnica, não o resultado do utilizador.

| Given, When, Then | Exemplo                                            |
| ----------------- | -------------------------------------------------- |
| Dado              | Uma reserva do próprio estudante que começa às 14h |
| Quando            | Cancela às 13h59                                   |
| Então             | A reserva fica cancelada e o intervalo livre       |

Se a regra exige cancelar **antes** do início, às 14h o sistema recusa e conserva o estado. Inclui também recusa para outro titular. **BDD** usa estes exemplos para criar entendimento comum; Gherkin sozinho não garante colaboração nem bons critérios.

## Protótipos e rastreabilidade

- Um protótipo **descartável** serve para aprender e é abandonado; um **evolutivo** cresce até ao produto e exige estrutura adequada. Observa tarefas concretas, não apenas opiniões sobre o desenho.
- **Rastreabilidade:** liga necessidade, requisito, desenho e teste, permitindo localizar o impacto de uma mudança.
- **Gestão de requisitos:** acompanha estado e alterações. Requirements creep é aumentar âmbito sem avaliar valor, custo e consequências.

[Construção de requisitos verificáveis](/cadeiras/es/requisitos-uml/#tornar-a-afirmação-verificável).
