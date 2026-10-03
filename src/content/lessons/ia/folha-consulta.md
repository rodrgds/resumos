---
draft: true
title: Cheat sheet de Inteligência Artificial
description: Definições, fórmulas e condições dos métodos de IA.
section: recursos
studyKind: revision
order: 1
---

## Agentes

[Explicação](/cadeiras/ia/agentes-inteligentes/)

- PEAS: desempenho, ambiente, atuadores, sensores.
- Racional: maximiza desempenho esperado com a informação disponível.
- Ambiente: observabilidade, determinismo, dinâmica, domínio discreto/contínuo, episódios/sequência, agentes e conhecimento dos efeitos.
- Reflexo simples usa a perceção atual; reflexo com modelo guarda estado. Objetivos orientam planos; utilidade compara resultados; aprendizagem pode melhorar qualquer arquitetura.

## Pesquisa

[Não informada](/cadeiras/ia/pesquisa-nao-informada/) · [Heurística](/cadeiras/ia/pesquisa-heuristica/)

| Método                   | Escolhe na fronteira       | Custo mínimo                                       |
| ------------------------ | -------------------------- | -------------------------------------------------- |
| BFS                      | Mais antigo, por níveis    | Com custos iguais e positivos                      |
| DFS                      | Mais profundo              | Sem garantia geral                                 |
| Custo uniforme           | Menor $g$                  | Com custos não negativos num grafo finito          |
| Aprofundamento iterativo | DFS com limites crescentes | Com custos iguais e positivos                      |
| Gulosa                   | Menor $h$                  | Sem garantia geral                                 |
| A*                       | Menor $f=g+h$              | Heurística admissível e gestão correta de caminhos |

$g$ é custo percorrido; $h$ estima o restante; $h^*$ é custo mínimo restante.

- Admissível: $0\le h(n)\le h^*(n)$, com $h(\text{objetivo})=0$.
- Consistente: $h(n)\le c(n,n')+h(n')$ em todas as arestas. Com $h(\text{objetivo})=0$, implica admissibilidade.
- A* com consistência não precisa de reabrir estados expandidos. Só admissibilidade pode exigir reabertura quando $g$ melhora.
- UCS e A* testam o objetivo ao retirar da fronteira. Gerar não é expandir.
- $h=0$ dá UCS; $\max(h_1,h_2)$ preserva admissibilidade. A soma pode sobrestimar.
- Com ramificação finita, BFS e aprofundamento iterativo são completos. DFS com visitados é completa em grafos finitos. Em espaços infinitos, UCS/A* precisam de condições adicionais, como custos de ação pelo menos $\varepsilon>0$.

Numa árvore, $b$ é ramificação, $d$ profundidade do objetivo mais superficial e $m$ profundidade máxima: BFS $O(b^d)$ em tempo/memória; DFS $O(b^m)$ em tempo e $O(bm)$ em memória; aprofundamento iterativo $O(b^d)$ em tempo e $O(bd)$ em memória, para $b>1$. Visitados acrescentam memória no grafo.

## Jogos e otimização

[Jogos](/cadeiras/ia/jogos-e-minimax/) · [Otimização](/cadeiras/ia/otimizacao-e-evolucao/)

- Minimax: MAX toma máximo, MIN toma mínimo. Garantia completa em jogos determinísticos, finitos, de dois jogadores, soma zero e informação perfeita. Folhas de corte avaliadas por heurística retiram a garantia do jogo completo.
- Alfa-beta: MAX atualiza $\alpha$, MIN atualiza $\beta$; corta se $\alpha\ge\beta$. Dá a mesma decisão com menos trabalho, por isso a ordem dos filhos afeta os cortes.
- MCTS: seleção, expansão, simulação, retropropagação. UCT: $w_i/n_i+c\sqrt{\ln N/n_i}$. Filhos sem visitas são experimentados antes da divisão; estatísticas respeitam o jogador que escolhe.
- Subida da colina estrita só aceita melhoria; para também num patamar. Ótimo local depende da vizinhança.
- Arrefecimento, minimização: aceita deterioração $\Delta>0$ com probabilidade $e^{-\Delta/T}$, $T>0$.
- Evolução: seleção, cruzamento, mutação. Filhos podem ser piores; mutação pode criar diversidade.
- Rainhas em colunas $i,j$: conflito se $Q_i=Q_j$ ou $|Q_i-Q_j|=|i-j|$. Conta pares só uma vez.
- Modelo complementar CSP: variáveis, domínios, restrições. Retrocesso rejeita conflitos; verificação antecipada reduz domínios; MRV escolhe a variável com menos valores restantes.

## Lógica e probabilidades

[Lógica](/cadeiras/ia/logica-e-conhecimento/) · [Bayes](/cadeiras/ia/incerteza-e-bayes/)

- $\forall x$: todos; $\exists x$: pelo menos um. A ordem dos quantificadores importa.
- $P$ e $P\to Q$ permitem $Q$. $Q$ sozinho não permite $P$.
- Encadeamento para a frente parte de factos até um ponto fixo; para trás parte do objetivo e pesquisa regras/substituições.
- Ausência de prova não é negação na lógica clássica. Resolução por refutação acrescenta o objetivo negado e deriva a cláusula vazia.

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)},\quad P(B)>0,
\qquad
P(C_i\mid E)=\frac{P(E\mid C_i)P(C_i)}{\sum_j P(E\mid C_j)P(C_j)}.
$$

As classes $C_j$ formam uma partição; a evidência deve ter probabilidade positiva.

- Naive Bayes: $P(E_1,\ldots,E_k\mid C)=\prod_iP(E_i\mid C)$, hipótese de independência **condicional**.
- Rede Bayesiana: DAG e distribuições condicionais; $P(X_1,\ldots,X_n)=\prod_iP(X_i\mid pais(X_i))$.
- Inferência: multiplicar fatores, somar variáveis ocultas, normalizar.
- Observação $P(Y\mid X)$ e intervenção $P(Y\mid do(X))$ são distintas. Setas probabilísticas, por si só, não provam causalidade.

## Aprendizagem

[Supervisionada e redes](/cadeiras/ia/aprendizagem-e-redes/) · [Agrupamento](/cadeiras/ia/aprendizagem-nao-supervisionada/)

- Supervisionada usa etiquetas; não supervisionada procura estrutura; reforço aprende com recompensas.
- Árvore: $H=-\sum_i p_i\log_2p_i$, com $0\log 0=0$; ganho = entropia do pai menos média ponderada das entropias dos filhos.
- Treino ajusta parâmetros; validação escolhe hiperparâmetros; teste mede o resultado final. Transformações aprendidas ajustam-se só no treino.
- Exatidão $(VP+VN)/N$; precisão $VP/(VP+FP)$; sensibilidade $VP/(VP+FN)$; $F_1=2VP/(2VP+FP+FN)$. Denominadores zero exigem uma convenção.
- Perceptrão: $z=w\cdot x+b$, previsão pelo sinal. Em erro, $w\leftarrow w+\eta t x$, $b\leftarrow b+\eta t$, para alvo $t\in\{-1,+1\}$. Fixa a convenção em $z=0$.
- Sigmoide: $\sigma(z)=1/(1+e^{-z})$, derivada $\sigma(z)(1-\sigma(z))$.
- Descida: $\theta\leftarrow\theta-\eta\nabla E$. Calcula os gradientes com os parâmetros anteriores; não atualizes pesos a meio da retropropagação.
- RNN: $h_t=\tanh(W_xx_t+W_hh_{t-1}+b)$, com parâmetros partilhados e memória da sequência.
- Q-learning: $Q(s,a)\leftarrow Q(s,a)+\alpha[r+\gamma\max_{a'}Q(s',a')-Q(s,a)]$. Transição terminal tem valor futuro zero; aprender exige explorar.
- k-means: atribuir ao centroide mais próximo, recalcular médias, repetir até ao critério de paragem. Minimiza localmente $\sum_i\|x_i-\mu_{c_i}\|^2$; escala, inicialização, empates e grupos vazios precisam de tratamento.

## Ética e segurança

[Explicação](/cadeiras/ia/etica-e-seguranca/)

Imitação não prova consciência nem correção. Avalia dados e erros por grupo; aproxima a recompensa do objetivo real; limita ações e acessos; verifica se a revisão humana permite corrigir decisões. Uma mitigação precisa de avaliação observável.
