---
title: Avaliação de usabilidade
description: Avaliação heurística e testes com utilizadores, com métricas e iteração.
section: conteudo
order: 6
---

Avaliar é confrontar o desenho com a realidade: especialistas percorrem [heurísticas](principios-usabilidade/) e utilizadores reais tentam tarefas reais. Os dois métodos apanham problemas diferentes, por isso usam-se os dois, por esta ordem: primeiro a heurística (barata, sem recrutar ninguém), depois os testes com pessoas (caros, decisivos).

## Avaliação heurística

Três a cinco avaliadores percorrem a interface de forma independente, anotando cada violação com a heurística infringida e a gravidade (0 sem importância, 1 cosmético, 2 menor, 3 grave, 4 catastrófico). Depois juntam-se as listas e eliminam-se duplicados. A independência importa: avaliadores juntos influenciam-se e veem os mesmos problemas.

O resultado é uma tabela como a da página de princípios: descrição concreta, heurística, gravidade. Só no fim se discute soluções, e só para os problemas graves. Avaliar e redesenhar na mesma sessão mistura papéis e atrasa ambos.

## Testes com utilizadores

Um teste com utilizadores tem guião fixo: boas-vindas e consentimento, tarefas uma de cada vez, sem ajuda nem pistas, e perguntas só no fim. As tarefas vêm dos requisitos ("combina uma sessão para quarta com o teu grupo"). Dás o objetivo, nunca os passos: dizer "carrega em Nova sessão" testa a tua memória, não a interface.

Recruta pessoas parecidas com as personas, não colegas do projeto. Cinco participantes apanham a maioria dos problemas de um ciclo; mais do que isso rende pouco até iterares. Três já chegam para um teste de papel em fase inicial.

Mede três coisas por tarefa:

- **Eficácia:** concluiu sem ajuda, com ajuda ou desistiu.
- **Eficiência:** tempo e número de passos ou erros.
- **Satisfação:** o que diz no fim, em questionário curto ou entrevista.

:::warning[Não ajudes, não expliques]
A frase mais difícil de engolir é o silêncio enquanto o participante se debate. Qualquer pista invalida a medida. Se ele desistir, regista a desistência como dado e passa à próxima tarefa. Ajudar no momento rouba a descoberta que o relatório precisa.
:::

## Exemplo: três participantes no protótipo

Testas o fluxo de combinar sessão com três colegas, um de cada vez:

| Tarefa                   | P1                      | P2                        | P3                        |
| ------------------------ | ----------------------- | ------------------------- | ------------------------- |
| Criar sessão para quarta | concluiu, 2 min, 1 erro | concluiu com ajuda, 4 min | desistiu                  |
| Escolher sala sugerida   | concluiu, 1 min         | concluiu, 1 min, 1 erro   | concluiu, 2 min           |
| Confirmar e notificar    | concluiu, 1 min         | concluiu, 1 min           | concluiu com ajuda, 3 min |

Leitura: criar a sessão falha em 2 de 3 casos (ajuda e desistência), sempre no passo de escolher o dia: P2 tocou fora da zona ativa à espera de um calendário, P3 não percebeu que os blocos propostos já incluíam sala. Correções, por prioridade: (1) mostrar calendário semanal em vez de lista de blocos; (2) juntar sala e hora na mesma linha com mapa; (3) só depois, polir textos de confirmação. Repara que a segunda tarefa correu bem e não precisa de nada: avaliar também diz o que não mexer.

## Iterar: o ciclo fecha-se

Cada ciclo termina numa lista curta de correções priorizadas, que entram no protótipo antes do próximo ciclo. Um projeto com três ciclos de "prototipar, testar, corrigir" chega muito mais longe do que um com um único teste no fim, quando já não há tempo para mudar nada. É por isto que a avaliação vive no meio do processo, não no fim.

## Para levar para a próxima página

Heurísticas e testes dizem se a interface funciona. Para perguntas mais fundas (o que precisam, porque abandonam, quanto vale a experiência), precisas de inquéritos desenhados e analisados com método. São os [estudos com utilizadores](estudos-utilizadores/).
