## O que o cliente vê

Um TAD promete valores e operações. A representação escolhe campos e custos.

- Consulta de `i` pede `0<=i<size`. Retirada da frente pede lista não vazia ou ausência explícita.
- Invariante típico de lista simples: sem ciclos, termina em nulo, tem exatamente `tamanho` nós. `primeiro` é nulo só no vazio.
- Construtor cria o invariante. Cada método repõe-no. Destrutor liberta o que é possuído.

## Vetor ou nós

| Precisas de                                        | Prefere                                                                                                     |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Índice em $O(1)$ e poucas inserções à frente       | Vetor                                                                                                       |
| Frente em $O(1)$ e inserção após posição conhecida | Lista                                                                                                       |
| Consultar o fim                                    | Vetor, ou lista com cauda                                                                                   |
| Inserir no fim                                     | Vetor em $O(1)$ amortizado, ou lista com cauda em $O(1)$                                                    |
| Remover o fim                                      | Vetor em $O(1)$; na lista, duplamente ligada com cauda em $O(1)$, simples com cauda em $O(n)$ pelo anterior |

A pesquisa binária corre sobre qualquer sequência ordenada, mas o custo logarítmico habitual exige acesso direto em $O(1)$. Numa lista ligada com iteradores de avanço, chegar ao meio já custa deslocações lineares, por isso o vetor ordenado é a escolha natural.

«Inserir em $O(1)$» só conta depois de teres a ligação. Localizar a posição pode dominar.

## Quem liberta e o que invalida

- Não copies só o apontador inicial: dois donos libertam os mesmos nós.
- `vector` pode realocar ao inserir e nesse caso invalida tudo. Sem realocar, inserir invalida os iteradores da posição em diante.
- `list` conserva iteradores ao inserir; apagar invalida só os do elemento.
- `n` inserções em `set` custam $O(n\log n)$. Hash com constantes esperadas dá linear esperado, não garantido.

Testa vazio, um elemento, repetidos e extremidades. Confere o invariante, não só a impressão final.

[Exemplos e contratos](/cadeiras/aed/tipos-abstratos/).
