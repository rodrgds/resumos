---
title: Complexidade e aproximação
description: Reduções entre problemas exponenciais, NP-completude na prática e aproximações com garantia.
section: conteudo
order: 8
---

As técnicas anteriores resolvem problemas tratáveis. Esta página é sobre os outros: problemas onde o melhor algoritmo exato conhecido é exponencial e a entrada realista não cabe nele. A estratégia muda de "resolver exatamente" para "reconhecer a dificuldade, reduzir a casos conhecidos e aproximar com garantia".

## Reduzir para reconhecer

Uma **redução** transforma o teu problema noutro já conhecido, preservando a resposta. Se o SAT se reduz ao teu problema, o teu problema é pelo menos tão difícil como o SAT. Na prática, a redução serve para classificar: perante um problema novo de horários ou rotas, reduzi-lo a um problema NP-completo conhecido diz-te para parares de procurar o algoritmo polinomial perfeito.

Exemplo pequeno: reduz satisfazibilidade a **cobertura de vértices**. Para cada variável cria uma aresta entre o literal e a sua negação (escolher um extremo é escolher o valor lógico); para cada cláusula cria um triângulo (obriga a escolher pelo menos dois vértices por cláusula); liga cada vértice do triângulo ao literal correspondente. Uma cobertura com $n + 2m$ vértices ($n$ variáveis, $m$ cláusulas) existe se e só se a fórmula é satisfazível: os $n$ vértices das arestas dão a atribuição e os $2m$ dos triângulos confirmam cada cláusula. Se recordares [lógica proposicional](/cadeiras/md/logica-proposicional/), o SAT é "existe um modelo?"; se quiseres a teoria completa de P, NP e reduções polinomiais, está em [complexidade](/cadeiras/tc/complexidade/).

## Aproximar com garantia

Quando o exato não cabe, um algoritmo de **aproximação** devolve uma solução válida com um fator de garantia: nunca pior que $k$ vezes o ótimo. O guloso ingénuo para cobertura de vértices, que toma as duas pontas de cada aresta de um emparelhamento maximal, é uma 2-aproximação: cada aresta do emparelhamento obriga o ótimo a usar pelo menos um vértice, e o algoritmo usa dois.

Exemplo onde o fator 2 acontece mesmo: o caminho com 4 vértices $v_1, v_2, v_3, v_4$ e 3 arestas. O ótimo é $\{v_2, v_3\}$, tamanho 2. O algoritmo encontra o emparelhamento maximal $\{(v_1, v_2), (v_3, v_4)\}$ e devolve os 4 vértices: exatamente o dobro. A garantia de fator 2 é justa, e saber isto evita duas armadilhas: esperar sempre o ótimo de uma heurística, ou desprezar uma heurística que garante metade do ótimo quando o exato demoraria séculos.

:::tip[O método perante um problema exponencial]
Primeiro, tenta reduzir a um NP-completo conhecido para confirmar a dificuldade. Depois escolhe a saída honesta: instâncias pequenas vão para [retrocesso com poda](/cadeiras/da/retrocesso-ramificacao/), restrições lineares para [programação linear inteira](/cadeiras/da/programacao-linear/), e o resto para aproximação com garantia ou heurísticas avaliadas empiricamente. "Exponencial" não quer dizer "impossível", quer dizer "exacto só até certo tamanho".
:::
