---
title: Análise e otimização de código
description: Análise de fluxo de dados, propagação de constantes e eliminação de código morto num bloco básico.
section: conteudo
order: 8
---

Otimizar é transformar o programa para correr mais rápido (ou ocupar menos espaço) **sem lhe mudar o significado observável**. Para transformar em segurança, o compilador primeiro analisa: calcula, para cada ponto do programa, factos como "que definições chegam aqui" ou "que variáveis estão vivas". Só depois reescreve, apoiado nesses factos.

## Análise de fluxo de dados

A análise propaga factos pelos blocos do grafo de fluxo até estabilizar (**ponto fixo**): cada bloco combina os factos dos antecessores, aplica o seu efeito e passa o resultado aos sucessores, repetindo até nada mudar. Duas análises clássicas:

- **Variáveis vivas**: uma variável está viva num ponto se o seu valor atual pode ser lido no futuro. Decide o que manter em registos e o que pode ser descartado.
- **Definições que alcançam**: que atribuições podem ter produzido o valor lido em cada uso. Sustenta a propagação de constantes e de cópias.

## Exemplo: propagar e eliminar

Bloco básico de entrada:

```
t1 = 5
t2 = t1 + 3
x = t2
y = 10
```

A análise de definições que alcançam diz que, no uso de `t1`, a única definição possível é `t1 = 5`. A **propagação de constantes** substitui: `t2 = 5 + 3`, que o **dobramento de constantes** avalia em `t2 = 8`. Propaga outra vez: `x = 8`. Agora `t1` e `t2` não têm nenhum uso restante, por isso a **eliminação de código morto** remove as duas primeiras instruções. E `y = 10`? Se `y` não está viva à saída do bloco (nenhum sucessor no grafo a lê), remove-se também. Resultado:

```
x = 8
```

Confirma com o grafo de fluxo: o bloco continua a definir exatamente as variáveis vivas à saída com os mesmos valores, por isso nenhum caminho do programa distingue o antes do depois. É este o teste de cada otimização: os valores observáveis nos pontos de saída mantêm-se.

:::warning[Otimizar cedo demais esconde erros]
Aplica as otimizações sobre código intermédio já validado e confirma cada transformação no grafo de fluxo. No projeto, depura primeiro com as otimizações desligadas: um erro no código gerado com otimizações ligadas pode estar na otimização ou no código original, e sem a versão simples não distingues.
:::
