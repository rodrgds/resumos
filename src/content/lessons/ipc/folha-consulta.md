---
title: 'Cheat sheet de IPC'
description: 'Distinções, modelos e procedimentos para rever a teoria dos mini-testes.'
section: recursos
order: 0
studyKind: revision
editorial:
  basedOn: 2026/27
  sources:
    - title: Ficha oficial de IPC, 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587000
  coverage: 'Distinções, modelos e procedimentos para rever a teoria dos mini-testes.'
  gaps:
    - Não foi possível comparar esta página com mini-testes e critérios de correção de 2026/27.
---

## Vocabulário

- UI: meios de interação. UX: perceções/respostas antes, durante e depois do uso.
- Usabilidade: eficácia, eficiência e satisfação, para pessoas, objetivos e contexto definidos.
- Modelo mental: compreensão da pessoa. Conceptual: conceitos, ações e relações que o desenho comunica.
- Golfo de execução: descobrir/executar ações. Golfo de avaliação: perceber/interpretar estado.
- Lapso: execução falha com intenção correta. Engano: plano/interpretação errado. [Explicação](/cadeiras/ipc/fundamentos-ihc/).

## Cognição e previsão

Gestalt: proximidade, semelhança, continuidade, região comum e figura-fundo. Reconhecimento dá pistas; recordação exige recuperar sem as pistas. $7\pm2$ não define a dimensão de qualquer menu.

| Modelo     | Fórmula/condição                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| Fitts      | $MT=a+b\log_2(1+D/W)$; apontar, D e W na mesma unidade; W na direção do movimento; parâmetros do contexto  |
| Hick-Hyman | $T=a+b\log_2(n+1)$ na variante equiprovável; não representa todo o tempo de um menu                        |
| KLM        | Somar operadores e custos dados: K, P, H, M, R; percurso conhecido de pessoa experiente, sem modelar erros |

[Explicação e contas](/cadeiras/ipc/percepcao-cognicao/).

## Investigar e desenhar

Investigar pergunta, método e síntese: entrevista para motivos, observação para comportamento, questionário para contar. Perguntas sobre acontecimentos concretos; sem perguntas duplas nem indução. Consentimento, dados mínimos e piloto do protocolo. [Explicação](/cadeiras/ipc/investigacao-utilizadores/).

Journey Map: etapas, ações, motivos, experiência e pontos de contacto, com evidência para relatos e hipóteses explícitas. Investigar → necessidades → requisitos → alternativas → protótipo → avaliação → revisão. PACT: pessoas, atividades, contextos, tecnologias. Persona sintetiza padrões fundamentados; proto-persona declara hipóteses. Cenário as-is descreve o atual; to-be explora proposta. Tarefa de teste dá resultado sem ensinar cliques; wireframe mostra estrutura, wireflow liga estados e transições. Requisito de usabilidade indica público, contexto, medida e limiar. [Explicação](/cadeiras/ipc/design-centrado-utilizador/).

Affordance é possibilidade de ação; significante comunica-a; mapping liga controlo a efeito; feedback responde à ação. Heurísticas: estado, mundo real, controlo/liberdade, consistência, prevenção, reconhecimento, eficiência, minimalismo, recuperação e ajuda. Justifica cada falha com tarefa, comportamento, consequência e alteração. [Explicação](/cadeiras/ipc/principios-usabilidade/).

Horizontal: amplo e pouco profundo. Vertical: restrito e profundo. Fidelidade é outro eixo. Wizard of Oz simula comportamento; não prova o algoritmo real. [Explicação](/cadeiras/ipc/prototipagem/).

## Escolher e analisar uma avaliação

| Pergunta                               | Método               |
| -------------------------------------- | -------------------- |
| Viola princípios?                      | Heurística           |
| Novo utilizador descobre os passos?    | Walkthrough          |
| Pessoas conseguem a tarefa?            | Teste de usabilidade |
| Como funciona no contexto?             | Estudo de campo      |
| Que tempo prevê um percurso conhecido? | Modelo preditivo     |

Protocolo mínimo: tarefa verificável, critério de sucesso, ajuda permitida, limite de tempo e registo. Walkthrough: objetivo do passo, ação disponível, relação ação/objetivo e progresso depois da ação. Formativa melhora desenho; sumativa avalia resultados. Definir sucesso, ajuda e limite de tempo antes do teste. Não contar interrupção como tempo de conclusão. [Explicação](/cadeiras/ipc/avaliacao-usabilidade/).

- Atitudinal: o que dizem/sentem. Comportamental: o que fazem. Qualitativo/quantitativo é outro eixo.
- Entre participantes: pessoas diferentes por condição. Intra: as mesmas; controlar aprendizagem/ordem. Independente é condição; dependente é medida.
- Média e mediana não são iguais; declarar falhas e dispersão. Correlação não prova causalidade.
- Ética: consentimento informado, saída sem penalização, proteção dos dados e riscos proporcionados; pseudonimização não garante anonimato.
- SUS padrão: ímpares $r_i-1$, pares $5-r_i$; somar e multiplicar por 2,5. Índice de 0 a 100, não percentagem de sucesso.
- Valor-p não é probabilidade de a hipótese nula ser verdadeira; ausência de significância não prova igualdade. Emparelhado: analisar diferenças por pessoa; IC da diferença média com $t$ e $s_d$. [Explicação](/cadeiras/ipc/estudos-utilizadores/).

## Acessibilidade e ajuda

WCAG: percetível, operável, compreensível, robusto. Texto AA: 4,5:1 normal e 3:1 grande segundo definição e exceções. Contraste $(L_{\max}+0{,}05)/(L_{\min}+0{,}05)$, sem arredondar para passar. Foco, teclado, nomes, estados e sequência de tarefa precisam de verificação manual. Alvos: 24 px ou espaçamento e exceções.

Multimodal: canais de entrada/saída com alternativas, redundância ou complementaridade. Indicar como resolver conflitos e falhas de reconhecimento. [Explicação](/cadeiras/ipc/acessibilidade-multimodal/).

Tutorial ensina, referência consulta detalhes, guia rápido recorda, ajuda contextual apoia o ponto de uso. Navegação orienta por categorias; pesquisa precisa de vocabulário e resultados úteis. [Explicação](/cadeiras/ipc/ajuda-documentacao/).
