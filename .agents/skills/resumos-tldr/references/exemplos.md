# Exemplos de TLDR

Estes trechos calibram densidade e rigor. A estrutura muda com a matéria; não são um formulário a preencher em todas as páginas.

## Pesquisa binária

Uma lição acompanha a procura de 14 em `[2, 5, 8, 11, 14, 17, 20]`, justifica cada metade excluída e calcula a complexidade. O resumo pode ficar assim:

### Pesquisa binária

- **Condição:** sequência ordenada. O elemento do meio permite excluir uma das metades.
- Se o alvo for menor, continua à esquerda; se for maior, à direita. Se for igual, termina.
- Termina sem encontrar quando o intervalo fica vazio.
- **Pior caso:** $O(\log n)$ comparações para $n$ elementos, com acesso direto ao elemento central.

Para procurar `14`: compara com `11`, depois com `17`, e encontra `14` no intervalo restante.

**Decisão editorial:** conserva a condição que justifica o algoritmo, a paragem e o modelo do custo. O pequeno percurso ajuda a recordar o processo sem repetir três parágrafos.

## Pipeline

### Período e desempenho

Modelo ideal: $k$ fases, sem paragens nem custo adicional dos registos entre fases.

| Grandeza                  | Relação                     |
| ------------------------- | --------------------------- |
| Período $T$               | Maior atraso entre as fases |
| Latência de uma instrução | $kT$                        |
| Tempo de $n$ instruções   | $(k+n-1)T$                  |
| Débito depois de encher   | Uma instrução por ciclo     |

Com cinco fases e $T=250\ \text{ps}$, vinte instruções demoram $24\times250=6000\ \text{ps}$.

A sobreposição melhora o débito. Não reduz necessariamente a latência de uma instrução.

**Decisão editorial:** uma tabela resolve a consulta. Um cronograma curto pode substituir a frase sobre sobreposição; vários resultados soltos, sem distinguir latência de débito, seriam menos claros.

## Fecho e aceitação num NFA

### NFA e ε-NFA

- O estado da simulação é um **conjunto de estados possíveis**.
- Num ε-NFA, começa em $E(\{q_0\})$: todos os estados alcançáveis do inicial sem consumir símbolos.
- Para cada símbolo $a$, parte do conjunto atual $S$ e calcula:

$$
S' = E\left(\bigcup_{q\in S}\delta(q,a)\right).
$$

- Aceita **depois de consumir toda a palavra** se $S\cap F\ne\varnothing$, sendo $F$ o conjunto de finais.
- O conjunto vazio significa que nenhum ramo continua. Trocar finais e não finais não complementa um NFA; primeiro determiniza e completa o DFA.

**Decisão editorial:** mantém a união de destinos, os fechos antes/depois da leitura e o quantificador existencial. "Segue um ramo e vê se chega ao fim" perderia a definição. Uma figura com dois ramos pode valer mais do que outro parágrafo; o editor completo só entra se a consulta beneficiar da experimentação.

## Código e alteração de estado

### Cópia superficial de uma lista

```python
a = [[1], [2]]
b = a.copy()
b.append([3])  # só altera a lista exterior b
b[0].append(9) # altera uma lista interior partilhada
print(a)      # [[1, 9], [2]]
```

- `b = a` faz os dois nomes referirem-se à mesma lista.
- `a.copy()` cria outra lista exterior; os elementos continuam partilhados.
- Uma cópia profunda é necessária se também quiseres separar objetos interiores mutáveis.

**Decisão editorial:** o exemplo mostra a distinção que se esquece com facilidade. A versão executável é útil se o leitor puder trocar a atribuição e observar o efeito. Não precisa de uma introdução a variáveis ou a listas.

## Compressão que perde o conteúdo

| Rascunho                                    | Problema                                      | Revisão útil                                                                          |
| ------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| "Dijkstra: caminho mínimo, guloso, rápido." | Não diz quando o método é correto.            | "Dijkstra fixa o vértice com menor distância provisória. Exige pesos não negativos."  |
| "$P(A\cap B)=P(A)P(B)$"                     | Falta a hipótese.                             | "Se $A$ e $B$ forem independentes, $P(A\cap B)=P(A)P(B)$."                            |
| "Normalização elimina redundância."         | Promete mais do que uma forma normal garante. | Nomear a forma normal e conservar a condição exata sobre dependências e chaves.       |
| Uma lista com os nomes de sete regras       | Dá um índice, sem conteúdo consultável.       | Escrever a condição e a transformação de cada regra que seja essencial à lição.       |
| Todos os parágrafos originais com bullets   | Mantém a carga de leitura.                    | Selecionar a regra, as hipóteses e um exemplo pequeno; ligar a demonstração completa. |
