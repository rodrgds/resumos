---
title: Cheat sheet de IPC
description: Passos e critérios para investigação de utilizadores, protótipos, avaliação e análise de resultados.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos IPC SofiaViP
      url: https://drive.google.com/file/d/1RwYcHiNaedxD4kQTBamtawufEq0H1Daa/view
  coverage: A página 1 é a capa; as páginas 2 a 13 cobrem investigação de utilizadores, modelos conceptuais, prototipagem, avaliação heurística e com participantes, ética, análise qualitativa e quantitativa, multimodalidade, ajuda e documentação.
  gaps:
    - O PDF não desenvolve SUS, critérios técnicos de acessibilidade nem psicologia da perceção; a parte estatística é apenas introdutória.
    - A edição do programa e as regras de avaliação a que os apontamentos correspondem não foram confirmadas.
---

Em qualquer proposta, explicita **quem faz que tarefa, em que contexto e como saberás se melhorou**.

## Investigar antes de desenhar

**Interface** é a parte com que se interage; **experiência** inclui o uso e o contexto mais amplo. O ciclo é investigar → estruturar → prototipar → avaliar → rever. Não substituas investigação por suposições da equipa ou dos interessados. Escolhe métodos conforme a pergunta: entrevistas captam relatos e motivos, observação mostra prática real, questionários ampliam a amostra mas dependem de perguntas bem formuladas. Distingue atitudes declaradas de comportamento observado e dados qualitativos de quantitativos. Vê [fundamentos](/cadeiras/ipc/fundamentos-ihc/#porque-é-que-isto-importa) e [necessidades antes de requisitos](/cadeiras/ipc/design-centrado-utilizador/#necessidades-antes-de-requisitos).

Na análise de tarefas, regista **pessoas, atividades, contexto e tecnologia**. Uma persona é uma síntese fundamentada de um grupo relevante, não um estereótipo ou um utilizador inventado sem dados. Agrupa pessoas por objetivos e necessidades pertinentes. Um cenário descreve a tarefa e o contexto; um **modelo conceptual** organiza os conceitos e operações que o sistema oferece antes do detalhe visual. Seleciona tarefas reais, representativas e específicas quanto à intenção, sem dizer a quem testa como executar cada passo. Vê [personas e cenários](/cadeiras/ipc/design-centrado-utilizador/#personas-e-cenários) e [recrutar e conduzir](/cadeiras/ipc/estudos-utilizadores/#recrutar-e-conduzir).

## Prototipar para responder a uma dúvida

Um protótipo é uma representação parcial. Decide se precisas de testar **aparência**, **funcionamento** ou ambos; um esboço de papel permite mudar rapidamente, um protótipo clicável suporta percursos mais concretos. Um protótipo horizontal mostra muitas funções com pouca profundidade; um vertical aprofunda uma tarefa. Em _Wizard of Oz_, uma pessoa simula uma resposta ainda não implementada, desde que o estudo não engane indevidamente os participantes. Regista o que ficou simulado e o que foi realmente executado. Vê [baixa fidelidade](/cadeiras/ipc/prototipagem/#baixa-fidelidade-papel-e-esboços), [alta fidelidade](/cadeiras/ipc/prototipagem/#alta-fidelidade-clicável-e-realista) e [fluxo clicável](/cadeiras/ipc/prototipagem/#o-que-um-bom-protótipo-cobre).

## Avaliar sem confundir método e resultado

**Avaliação formativa** encontra problemas durante o desenho; **sumativa** mede o resultado final face a objetivos. Define primeiro tarefa, participantes, contexto, medidas e critérios. Para usabilidade, observa sucesso da tarefa (**eficácia**), tempo/esforço (**eficiência**) e reação da pessoa (**satisfação**). Na avaliação heurística, peritos inspecionam a interface face a princípios como visibilidade do estado, consistência, prevenção e recuperação de erros, reconhecimento em vez de memorização. Uma inspeção não substitui observação de utilizadores. Vê [heurísticas](/cadeiras/ipc/principios-usabilidade/#as-dez-heurísticas-de-nielsen) e [avaliação heurística](/cadeiras/ipc/avaliacao-usabilidade/#avaliação-heurística).

Num teste com participantes, escolhe tarefas representativas, prepara um piloto, dá instruções neutras, observa sem conduzir, regista incidentes e recolhe comentários no fim. Distingue ambiente controlado de estudo de campo. O piloto verifica o **procedimento**, não serve para esconder falhas da interface. Trata consentimento, privacidade, tempo e conforto como parte do desenho do estudo. Vê [testes com utilizadores](/cadeiras/ipc/avaliacao-usabilidade/#testes-com-utilizadores) e [iterar](/cadeiras/ipc/avaliacao-usabilidade/#iterar-o-ciclo-fecha-se).

## Interpretar dados com cuidado

Em respostas abertas, cria códigos para ocorrências observadas, compara casos e agrupa códigos em temas; conserva exemplos que contradizem a interpretação inicial. Explica como chegaste aos temas. Para números, identifica a escala: categorias nominais pedem frequências; ordens permitem mediana e quartis; valores contínuos podem justificar média e desvio padrão se a distribuição for adequada. Uma diferença descritiva na amostra não demonstra, sozinha, uma diferença na população. Vê [codificação temática](/cadeiras/ipc/estudos-utilizadores/#analisar-respostas-abertas-codificação-temática).

Se fizeres um teste de hipóteses, formula $H_0$ e $H_1$ antes de ver os dados, escolhe a estatística e verifica pressupostos. O nível $\alpha$ limita a probabilidade de rejeitar $H_0$ **quando $H_0$ é verdadeira**; um intervalo de confiança de 95% descreve a cobertura do procedimento em repetições, não a probabilidade de um parâmetro fixo estar neste intervalo. Um teste $t$ compara médias sob condições apropriadas; $\chi^2$ compara contagens observadas e esperadas; correlação de Pearson mede associação linear, **não causalidade**. Estes métodos surgem apenas em resumo no PDF.

## Modalidades, ajuda e documentação

Uma interação pode combinar toque, teclado, voz, som e imagem. A combinação deve manter coerência e controlo e considerar ruído, falhas de reconhecimento, privacidade e capacidades diferentes. Oferece alternativas que preservem a tarefa. A ajuda contextual resolve dúvidas no ponto de uso; um guia inicial orienta, um manual de referência cobre pormenores. Procura e navegação devem permitir encontrar a resposta sem obrigar a ler o manual inteiro. Vê [interação multimodal](/cadeiras/ipc/acessibilidade-multimodal/#interação-multimodal) e [teclado](/cadeiras/ipc/acessibilidade-multimodal/#teclado-tudo-sem-rato).

Estes apontamentos não fixam critérios da edição atual nem substituem a análise de um produto real com utilizadores.
