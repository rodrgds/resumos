---
title: Estudos e amostragem
description: População, unidades, seleção aleatória, estudos observacionais e experiências.
section: conteudo
order: 1
practices:
  - me/praticar-estudos
editorial:
  basedOn: 2025/26
  review:
    edition: 2026/27
    reviewer: Codex
    date: '2026-10-03'
---

Antes de calcular uma média, pergunta a quem ela se refere. Um estudo sobre tempos de resposta pode medir pedidos, sessões ou utilizadores. Dez pedidos da mesma sessão podem partilhar condições de rede; não são automaticamente dez observações independentes.

## População, amostra e variável

A **população** reúne as unidades sobre as quais queremos concluir. A **amostra** é o conjunto observado. Uma **variável** é uma característica registada em cada unidade: tempo, sistema operativo, número de falhas.

Um parâmetro descreve a população, por exemplo a média $\mu$. Uma estatística é calculada a partir da amostra, por exemplo $\bar x$. A média dos pedidos medidos é conhecida; a média de todos os pedidos da população pode continuar desconhecida.

Delimita lugar, período e critérios de inclusão. «Os estudantes» é vago; «os estudantes inscritos numa licenciatura neste semestre» define melhor a população. Uma amostra voluntária pode representar sobretudo quem tem tempo ou interesse em responder. Aumentar o seu tamanho não elimina esse enviesamento.

## Selecionar aleatoriamente

Numa **amostra aleatória simples sem reposição**, todos os subconjuntos de $n$ unidades da população têm a mesma probabilidade de ser escolhidos. Numerar as unidades e sortear $n$ números distintos concretiza essa ideia. Ter igual probabilidade de inclusão para cada unidade, por si só, não garante esta propriedade para todos os subconjuntos.

Com reposição, uma unidade pode aparecer várias vezes. Escolhas feitas independentemente, com a mesma distribuição, originam o modelo de observações independentes e identicamente distribuídas, abreviado por **i.i.d.**

Sem reposição numa população finita, as escolhas são dependentes. Se a fração amostrada for pequena, um modelo independente pode ser uma aproximação razoável. Se for grande, a dependência tem de entrar no cálculo; não se aplica automaticamente uma fórmula binomial.

Uma amostragem **estratificada** divide a população em grupos, como anos curriculares, e seleciona aleatoriamente dentro de cada grupo. Para estimar uma média global, os pesos dos estratos devem corresponder à população, não apenas à quantidade de respostas obtidas.

## Observar ou intervir

Num estudo **observacional**, registamos características sem atribuir a condição em análise. Num estudo **experimental**, atribuímos tratamentos ou condições às unidades.

Uma associação observada pode ter um fator perturbador: uma terceira variável relacionada com a condição e com o resultado. Por exemplo, computadores mais recentes podem usar uma nova versão de um programa e executar mais depressa. A diferença observada não isola o efeito da versão.

Um estudo observacional prospetivo acompanha resultados futuros. Um estudo retrospetivo procura informação sobre acontecimentos passados. Ambos podem sofrer seleção, confundimento e erros de medição.

A **seleção aleatória** da amostra apoia a generalização para a população. A **atribuição aleatória** de tratamentos apoia uma comparação causal, porque evita escolher o tratamento segundo características das unidades. São operações diferentes. Mesmo uma experiência aleatória pode não representar outras populações.

Um grupo de controlo permite comparar condições. Quando há efeitos de expectativa, pode usar-se um placebo. Num estudo duplamente cego, participantes e avaliadores relevantes desconhecem a atribuição durante a avaliação. Estas medidas reduzem fontes de enviesamento; não substituem a aleatorização.

## Bloquear e emparelhar

Num desenho por blocos, agrupam-se unidades semelhantes e aleatoriza-se a condição **dentro** de cada bloco. O objetivo é reduzir a variação de fatores conhecidos. Estratificar organiza a recolha; bloquear organiza a atribuição experimental.

O emparelhamento é um caso particularmente útil: medir a mesma unidade antes e depois ou formar pares comparáveis. A análise usa as diferenças dentro dos pares. Dois grupos com o mesmo tamanho não são, só por isso, emparelhados.

## Exemplo: comparar dois algoritmos

Queremos comparar o tempo dos algoritmos A e B em tarefas de uma população definida. Selecionamos aleatoriamente 20 tarefas dessa população e executamos ambos em cada tarefa. Aleatorizamos a ordem de execução para reduzir efeitos de aquecimento da máquina.

A unidade do par é uma tarefa. A variável de análise é $D=T_A-T_B$: um valor positivo favorece B. Existem 20 diferenças, não 40 observações independentes. A variação entre tarefas fica parcialmente removida pela comparação dentro de cada tarefa.

Se A fosse executado nas tarefas pequenas e B nas grandes, o tamanho da tarefa seria um fator perturbador. Se usássemos 20 tarefas diferentes para cada algoritmo, teríamos dois grupos independentes, com outra fórmula para o erro padrão.

No relatório, descreve a população de tarefas, a seleção e as condições de execução. Uma diferença de tempos numa única máquina não justifica uma conclusão sobre todos os equipamentos possíveis.
