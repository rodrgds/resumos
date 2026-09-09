---
title: Aprendizagem e redes neuronais
description: Árvores de decisão com entropia, matrizes de confusão e um perceptrão treinado em duas épocas.
section: conteudo
order: 8
---

Nas páginas anteriores, o conhecimento vinha escrito por ti: regras, probabilidades, heurísticas. Na **aprendizagem computacional**, o programa extrai o conhecimento dos dados. Há três regimes: **supervisionada** (dados com resposta certa, para classificar ou prever), **não supervisionada** (dados sem resposta, para agrupar) e **por reforço** (aprende por tentativa com recompensas). Esta página fica na supervisionada, com um dataset de 12 animais resolvido de três maneiras.

## O dataset

Doze animais com dois atributos binários, penas e voa, e a classe ave ou mamífero. Aves: pardal (penas, voa), águia (penas, voa), pato (penas, voa), pinguim (penas, não voa), avestruz (penas, não voa), galinha (penas, não voa). Mamíferos: morcego (sem penas, voa), golfinho, cão, gato, cavalo e baleia (todos sem penas e sem voo).

## Árvore de decisão com entropia

Uma **árvore de decisão** pergunta atributos por ordem e classifica na folha. A pergunta de cada nó é a que mais reduz a incerteza, medida pela **entropia** $H = -\sum p_i \log_2 p_i$. Na raiz há 6 aves e 6 mamíferos: $H = -(0{,}5 \log_2 0{,}5 + 0{,}5 \log_2 0{,}5) = 1$ bit, incerteza máxima.

Testa o atributo penas. O ramo "tem penas" tem 6 aves e 0 mamíferos ($H = 0$); o ramo "sem penas" tem 0 aves e 6 mamíferos ($H = 0$). A entropia ponderada depois da pergunta é 0, por isso o **ganho de informação** é $1 - 0 = 1$ bit, o máximo possível. Compara com o atributo voa: o ramo "voa" tem 3 aves e 1 mamífero ($H \approx 0{,}81$), o ramo "não voa" tem 3 aves e 5 mamíferos ($H \approx 0{,}95$), e a média ponderada dá $(4/12) \times 0{,}81 + (8/12) \times 0{,}95 \approx 0{,}91$, ou seja, ganho de só $0{,}09$. A árvore pergunta penas primeiro e classifica tudo na perfeição com profundidade 1.

A lição não é que penas seja sempre a resposta, é o método: calcula a entropia antes e depois de cada atributo candidato e escolhe o maior ganho. Árvores demasiado fundas decoram o treino e falham no novo (**sobreajuste**); limita-se a profundidade ou exige-se um mínimo de exemplos por folha.

## Matriz de confusão

Para avaliar um classificador, conta acertos e erros por classe na **matriz de confusão**. Testa a regra ingénua "voa, logo é ave" em 6 animais (pardal, águia e pinguim aves; morcego, cão e golfinho mamíferos):

| Real \ Previsto | Ave               | Mamífero          |
| --------------- | ----------------- | ----------------- |
| Ave             | 2 (pardal, águia) | 1 (pinguim)       |
| Mamífero        | 1 (morcego)       | 2 (cão, golfinho) |

Exatidão: 4 em 6. O pinguim é um **falso negativo** (ave prevista mamífero) e o morcego um **falso positivo** (mamífero previsto ave). Repara como a exatidão sozinha engana: se 95 por cento dos animais fossem mamíferos, prever sempre mamífero dava 95 por cento de exatidão sem aprender nada. É por isso que se olha para a matriz e não só para o número global.

## Um perceptrão em duas épocas

O **perceptrão** é o neurónio original: soma pesos vezes entradas mais viés, e devolve uma classe conforme o sinal. Treina-se corrigindo erros: quando erra um exemplo, soma (ou subtrai) as entradas aos pesos. Segue o treino com taxa 1, pesos a zeros e viés a zero, nos pontos $x_1 = (1, 0)$ da classe +1, $x_2 = (0, 1)$ da classe -1 e $x_3 = (2, 1)$ da classe +1:

- Época 1, $x_1$: saída $0 \ge 0$, prevê +1, correto. Sem alteração.
- Época 1, $x_2$: saída $0$, prevê +1, mas é -1. Atualiza: pesos $(0, 0) - (0, 1) = (0, -1)$, viés $-1$.
- Época 1, $x_3$: saída $(0)(2) + (-1)(1) - 1 = -2$, prevê -1, mas é +1. Atualiza: pesos $(0, -1) + (2, 1) = (2, 0)$, viés $0$.
- Época 2, $x_1$: saída $2 \ge 0$, prevê +1, correto.
- Época 2, $x_2$: saída $0$, prevê +1, mas é -1. Atualiza: pesos $(2, 0) - (0, 1) = (2, -1)$, viés $-1$.
- Época 2, $x_3$: saída $(2)(2) + (-1)(1) - 1 = 2 \ge 0$, prevê +1, correto.

Pesos finais $(2, -1)$ com viés $-1$: confirma os três pontos, $x_1$ dá 2, $x_2$ dá $-2$, $x_3$ dá 2, todos do lado certo. Uma rede neuronal empilha muitos destes neurónios em camadas e treina-os com gradiente em vez de correções discretas, mas a ideia é a mesma: ajustar parâmetros até os exemplos ficarem do lado certo da fronteira. A **generalização**, acertar em dados novos e não só no treino, avalia-se com a matriz da secção anterior em dados que o modelo nunca viu.

```python
# O treino acima, excerto
w = [0, 0]
b = 0
dados = [([1, 0], 1), ([0, 1], -1), ([2, 1], 1)]
for epoca in range(2):
    for x, y in dados:
        saida = w[0] * x[0] + w[1] * x[1] + b
        previsto = 1 if saida >= 0 else -1
        if previsto != y:
            w = [w[0] + y * x[0], w[1] + y * x[1]]
            b = b + y
print(w, b)
```

Isto escreve `[2, -1] -1`, os pesos e o viés calculados à mão. Se o teu código der outro resultado, revê a convenção do sinal na saída exatamente zero, que é onde quase toda a gente diverge. Os exemplos de Python seguem o estilo de [Fundamentos da Programação](/cadeiras/fp/).
