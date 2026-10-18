---
title: Folha de consulta
description: Verificações de problema, planeamento, validação, relatório e demonstração com ligações às explicações.
section: recursos
studyKind: revision
order: 0
editorial:
  basedOn: 2026/27
  sources:
    - title: SIGARRA, Projeto Integrador L.EIC030, 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587008
    - title: Site docente de PI, época regular 2025/26
      url: https://sites.google.com/g.uporto.pt/projeto-integrador-leic/época-regular
    - title: Diretrizes docentes do relatório, sem data interna
      url: https://docs.google.com/document/d/1ZTm89HhmPV-eb0QeP9fIpwo1qjFtRSlD1Dw5I4zHeHQ/edit
    - title: PI Projects Fair 2026, edição 2025/26
      url: https://sites.google.com/g.uporto.pt/projeto-integrador-leic/pi-projects-fair-2026
  coverage: Verificações e contas das quatro lições, sem substituir o raciocínio nem os exemplos.
---

As ligações levam às explicações. Para decidir, confirma primeiro o contexto: necessidade observada, contrato entre componentes, ensaio correspondente ou artefacto a corrigir.

## Problema e âmbito

- [Necessidade](/cadeiras/pi/problema-e-utilizadores/#necessidade-e-evidência): descreve a dificuldade de alguém num contexto. "Uma aplicação com IA" é solução, não causa. Acompanha a tarefa, reconstrói casos e consulta registos com autorização.
- [Registo](/cadeiras/pi/problema-e-utilizadores/#necessidade-e-evidência): separa disse, observado e inferido. Duas ocorrências numa semana não fixam taxa anual nem provam a causa.
- [Partes interessadas](/cadeiras/pi/problema-e-utilizadores/#partes-interessadas): proponente apresenta, utilizadores executam, manutenção condiciona. Combina prioridades com quem realiza; número de pedidos não mede importância.
- [Benefício](/cadeiras/pi/problema-e-utilizadores/#benefício-e-contexto): acesso facilitado às ferramentas. Registos e funcionalidades não provam impacto. Verifica quem pode ficar excluído antes de automatizar.
- [Âmbito](/cadeiras/pi/problema-e-utilizadores/#âmbito-do-primeiro-incremento): um fluxo completo testável primeiro; resto explícito como manual ou fora. Decisão verificável indica quem confirmou, porquê e quando se revê.

## Requisitos e conflitos

- [Critério de aceitação](/cadeiras/pi/problema-e-utilizadores/#requisitos-e-critérios-de-aceitação): resultado observável que verifica um caso. "Fácil e rápido" sem tarefa, utilizador e modo de avaliar não é critério.
- [Intervalos](/cadeiras/pi/problema-e-utilizadores/#requisitos-e-critérios-de-aceitação): uma unidade, `[início,fim)` inclui o início e exclui o fim. Perante `[2,5)`: `[4,6)` recusa, `[5,7)` permite, `[5,5)` recusa por período vazio.
- [Concorrência](/cadeiras/pi/problema-e-utilizadores/#requisitos-e-critérios-de-aceitação): duas confirmações simultâneas incompatíveis não podem ambas ficar guardadas. O teste consulta o estado final, não só as mensagens.
- [Convenção de tempo](/cadeiras/pi/problema-e-utilizadores/#requisitos-e-critérios-de-aceitação): dias abstratos sem horas ou fusos. Reservas por horas exigem acordo sobre instantes e devolução.

## Planeamento

- [Incremento](/cadeiras/pi/equipa-e-planeamento/#incremento-e-dependências): capacidade integrada e utilizável que atravessa interface, regra e dados. Backlog ordena resultado, critérios e dependências.
- [Contrato](/cadeiras/pi/equipa-e-planeamento/#incremento-e-dependências): dados, respostas e validações acordados antes de dividir. Formato de datas diferente é a incompatibilidade típica.
- [Capacidade](/cadeiras/pi/equipa-e-planeamento/#capacidade-e-escolha): `4 × 6 = 24` h-pessoa nominais; `10 + 4 + 4 = 18` no fluxo obrigatório; seis de margem. Com mais oito, `26 > 24` e não cabe. Esforço não é duração.
- [Dependência externa](/cadeiras/pi/equipa-e-planeamento/#capacidade-e-escolha): ensaio com voluntário se marca cedo. Folga de horas não cria outra disponibilidade.
- [Integrado](/cadeiras/pi/equipa-e-planeamento/#responsabilidade-e-colaboração): exige critérios, testes e documentação combinados. Commit isolado ou captura não prova integração.
- [Risco e impedimento](/cadeiras/pi/equipa-e-planeamento/#riscos-e-acompanhamento): risco é incerto; impedimento é falta atual. Acesso externo incerto pede experiência limitada com pergunta, prazo, resultado e decisão. Uma chamada isolada não prova integração.
- [Acompanhamento](/cadeiras/pi/equipa-e-planeamento/#registo-do-progresso): ficha 2026/27 prevê semanal; site 2025/26 exige monitorização semanal e reuniões de 25 minutos semanais ou 50 quinzenais. Confirma canal e cadência atuais.
- [Registo útil](/cadeiras/pi/equipa-e-planeamento/#registo-do-progresso): previsto, evidência, impedimento, decisão, próxima ação com responsável e versão. "90%" sem versão nem ensaio não decide nada.

## Verificação e validação

- [Protótipo](/cadeiras/pi/prototipo-e-validacao/#protótipo-e-integração): forma segue a pergunta. Desenho testa compreensão; implementação testa persistência e regras. Inclui casos de falha: conflito mostra motivo, falha de comunicação não anuncia sucesso.
- [Verificação](/cadeiras/pi/prototipo-e-validacao/#verificação-e-validação): confere a solução face às regras. Períodos livres, sobrepostos, adjacentes, inválidos e duas tentativas concorrentes para a mesma ferramenta.
- [Validação](/cadeiras/pi/prototipo-e-validacao/#verificação-e-validação): pergunta se serve a necessidade no contexto. Observa voluntários a executar sem guiar; "gostaste?" não prova autonomia.
- [Sucesso](/cadeiras/pi/prototipo-e-validacao/#métricas-e-conclusão): define antes de medir. Exemplo: reserva válida, sem ajuda, em até dois minutos. Reserva inválida ou com ajuda não conta.
- [Contas](/cadeiras/pi/prototipo-e-validacao/#métricas-e-conclusão): `7/10 = 70%`. De 60% para 70%: 10 pontos percentuais; relativa `(70 − 60)/60 ≈ 16,7%`. Amostra pequena não prova melhoria geral; mesma ordem permite aprendizagem.
- [Limites](/cadeiras/pi/prototipo-e-validacao/#limites-e-iteração): erro observado leva a alteração e nova verificação. "Testes passaram" só abrange executados; "conseguiram" só abrange participantes, tarefas e condições. Dados fictícios para repetir; registos pessoais não se publicam.

## Relatório e demonstração

- [Âmbito da afirmação](/cadeiras/pi/relatorio-e-demonstracao/#afirmação-e-evidência): regra mais testes que a verificam; facilidade mais definição e evidência com utilizadores. Captura não prova persistência, concorrência ou eficácia.
- [Correção propagada](/cadeiras/pi/relatorio-e-demonstracao/#afirmação-e-evidência): de oito para sete em dez, 80% para 70% em tabela, conclusão, gráfico, poster e diapositivos. Revê conclusões apoiadas no número antigo.
- [Estrutura](/cadeiras/pi/relatorio-e-demonstracao/#estrutura-do-relatório): introdução, metodologia e atividades, desenvolvimento com validação, conclusões, referências. Adapta com o tutor; validação é a pergunta que não pode faltar.
- [Decisão técnica](/cadeiras/pi/relatorio-e-demonstracao/#estrutura-do-relatório): alternativas e consequências. Importação manual exige documentar limite e como evitar perda ou duplicação.
- [Forma e conteúdo](/cadeiras/pi/relatorio-e-demonstracao/#completude-síntese-e-rigor): completude cobre o necessário; síntese seleciona; rigor sustenta com dados ou referências. Listagem extensa sai; excerto que explica a decisão fica, com ligação à versão.
- [Páginas](/cadeiras/pi/relatorio-e-demonstracao/#completude-síntese-e-rigor): 10 a 25 A4 com referências e anexos, sem capa nem índice; português ou inglês; modelo LaTeX recomendado. Confere a versão pedida. Anexos contam.
- [Contribuições](/cadeiras/pi/relatorio-e-demonstracao/#contribuições-individuais): descrição qualitativa mais percentagem coerentes. Soma 100% só confere a distribuição. Commits não medem revisão, ensaios ou contacto com utilizadores.
- [Demonstração](/cadeiras/pi/relatorio-e-demonstracao/#preparar-a-demonstração): feira 2026 (2025/26) previa 15 minutos, cerca de cinco de demonstração e o resto de perguntas, com poster ou slide. Confere formato atual e modalidade.
- [Fluxo](/cadeiras/pi/relatorio-e-demonstracao/#preparar-a-demonstração): ferramenta livre, confirmação, tentativa incompatível recusada, nova consulta da reserva. Identifica simulações e versão. Vídeo anterior apoia; não prova a execução presente.
- [Entrega](/cadeiras/pi/relatorio-e-demonstracao/#entrega-e-continuidade): versão, dependências, configuração de exemplo e comandos com resultado esperado, verificados numa pasta nova ou ambiente isolado. Operações manuais documentadas para quem continua.
