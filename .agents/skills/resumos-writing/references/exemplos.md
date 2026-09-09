# Exemplos de escrita

Exemplos originais para calibrar a voz. Lê o que corresponde ao conteúdo que estás a escrever. São trechos, não modelos de página nem textos retirados do site de referência.

## Explicação conceptual

Uma **pilha** guarda elementos pela ordem em que chegam. O último a entrar é o primeiro a sair. Esta ordem chama-se LIFO, do inglês _last in, first out_.

Imagina a função "Desfazer" de um editor. Escreves uma palavra, colocas essa palavra a negrito e depois apagas uma frase. Ao desfazer, recuperas primeiro a frase apagada. A ação mais recente sai antes das anteriores.

Numa pilha, chamamos `push` à operação de acrescentar um elemento ao topo e `pop` à operação de retirar o elemento do topo. O editor pode guardar as ações desta forma, embora também precise da informação necessária para as reverter.

## Algoritmo com um percurso concreto

Queremos procurar o número `14` na lista ordenada `[2, 5, 8, 11, 14, 17, 20]`.

A **pesquisa binária** compara o valor procurado com o elemento do meio. Aqui, esse elemento é `11`. Como `14` é maior, podemos excluir `11` e todos os elementos à sua esquerda: nenhum deles pode ser `14`.

Resta `[14, 17, 20]`. O elemento do meio é agora `17`. Como `14` é menor, seguimos para a esquerda e encontramos `14`.

É a ordenação que permite excluir metade dos candidatos em cada passo. Se a lista estivesse desordenada, um valor menor do que `11` poderia estar à direita de `11`, e esta escolha deixaria de ser válida. Paramos quando encontramos o valor ou quando já não há candidatos.

Se a lista tem $n$ elementos, o número de comparações cresce como $\log n$, porque cada comparação reduz para cerca de metade o intervalo ainda por pesquisar.

## Matemática com interpretação

Queremos calcular a probabilidade de obter exatamente duas caras em três lançamentos independentes de uma moeda equilibrada.

Seja $X$ o número de caras. Cada lançamento tem dois resultados possíveis e a probabilidade de cara é sempre $1/2$. Por isso, $X$ segue uma distribuição binomial com três tentativas e probabilidade de sucesso $1/2$.

As duas caras podem aparecer nos lançamentos 1 e 2, 1 e 3, ou 2 e 3. São três possibilidades. Cada uma tem probabilidade $(1/2)^3 = 1/8$, logo:

$$
P(X = 2) = \binom{3}{2}\left(\frac12\right)^2\left(\frac12\right) = \frac38.
$$

O fator $\binom{3}{2}$ conta as posições das duas caras. Os restantes fatores dão a probabilidade de duas caras e uma coroa numa dessas ordens. Assim, a probabilidade pedida é $37{,}5\%$.

Se os lançamentos não fossem independentes, não poderíamos multiplicar estas probabilidades desta forma.

## Código que mostra a diferença

Em Python, dois nomes podem referir-se à mesma lista. A atribuição `copia = notas` mantém essa ligação:

```python
notas = [12, 15]
copia = notas
copia.append(18)
print(notas)
```

O programa escreve `[12, 15, 18]`. `append` alterou a lista que os dois nomes partilham.

Para criar outra lista com estes números, usamos `notas.copy()`:

```python
notas = [12, 15]
copia = notas.copy()
copia.append(18)
print(notas)
print(copia)
```

Agora obtemos `[12, 15]` e `[12, 15, 18]`. Alterar uma destas listas já não acrescenta elementos à outra. Esta cópia é superficial: se os elementos fossem outras listas, essas listas interiores continuariam partilhadas.

## Passo de um guia

### Confirmar a pasta de trabalho

Abre o terminal na pasta onde guardaste o projeto. Executa:

```sh
pwd
ls
```

`pwd` mostra o caminho da pasta atual. `ls` lista os ficheiros e pastas que estão dentro dela. Confirma que aparece o ficheiro que vais usar no próximo passo.

Se o projeto estiver numa subpasta chamada `exercicio`, entra nela com `cd exercicio` e volta a executar `ls`. Substitui `exercicio` pelo nome da tua pasta.

## Encurtar sem apagar a explicação

Rascunho:

> É de extrema importância ter em consideração que a aplicação do presente método pressupõe necessariamente a existência de uma ordenação prévia dos elementos.

Revisão:

> A pesquisa binária exige uma lista ordenada. É essa ordem que nos permite excluir metade dos candidatos em cada passo.

A revisão identifica o método, conserva a condição e explica a sua utilidade. Reduzir tudo a "Ordena primeiro" perderia essa ligação.
