## População e amostra

- A **população** reúne todas as unidades sobre as quais se quer concluir, com lugar, período e critérios de inclusão definidos. A **amostra** reúne as unidades observadas.
- A unidade é cada caso; a variável é a característica medida; o valor observado é o resultado da medição. Num estudo de arranques, a unidade é um arranque e a variável é o tempo em segundos.
- Um parâmetro descreve a população, como $\mu$; uma estatística descreve a amostra, como $\bar x$.

## Seleção aleatória

| Desenho                                | Condição e consequência                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Aleatória simples sem reposição        | Todos os subconjuntos de tamanho $n$ têm igual probabilidade. Inclusão individual igual não basta.            |
| Com reposição e escolhas independentes | Pode repetir unidades; com a mesma distribuição, produz observações i.i.d.                                    |
| Sem reposição numa população finita    | As escolhas são dependentes. A independência só pode ser uma aproximação quando a fração amostrada é pequena. |
| Estratificada                          | Seleciona aleatoriamente dentro de grupos e usa os pesos populacionais na estimativa global.                  |

Se 80% dos casos são diurnos e 20% noturnos, com médias 2 e 6 s, a média ponderada é $0,8(2)+0,2(6)=2,8$ s. Uma amostra voluntária maior não elimina enviesamento de seleção.

## Observação, experiência e pares

- Um estudo **observacional** regista condições existentes; uma experiência atribui tratamentos. Estudos prospetivos acompanham resultados futuros; retrospetivos consultam acontecimentos passados.
- Seleção aleatória apoia a **generalização**; atribuição aleatória apoia uma comparação **causal**. Uma associação pode resultar de um fator perturbador ligado à condição e ao resultado.
- Controlo, placebo e avaliação duplamente cega reduzem fontes de enviesamento. Não substituem a aleatorização.
- Bloquear agrupa unidades semelhantes e aleatoriza dentro de cada bloco. Estratificar organiza a recolha; bloquear organiza a experiência.
- No emparelhamento, analisa as diferenças dentro de cada par. Vinte tarefas executadas por A e B dão 20 diferenças $D=T_A-T_B$, não 40 tempos independentes. $D>0$ favorece B; a independência necessária é entre tarefas.

[Desenho da comparação de algoritmos](/cadeiras/me/estudo-e-amostragem/#comparação-emparelhada-de-algoritmos).
