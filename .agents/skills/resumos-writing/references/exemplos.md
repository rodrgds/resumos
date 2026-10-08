# Exemplos de escrita

Trechos originais para calibrar a voz, não moldes obrigatórios. Lê sempre a abertura de normalização e o exemplo de pipeline. Consulta os restantes conforme a matéria. As notas após os trechos explicam a decisão editorial e não pertencem à lição.

## Normalização: exemplo que acompanha a definição

### Normalização e formas normais

| Encomenda | Produto | Nome |
| --------- | ------- | ---- |
| 100       | 7       | Rato |
| 101       | 7       | Rato |

Mudar "Rato" para "Rato sem fios" exige corrigir duas linhas. Se só guardarmos produtos nesta tabela, apagar a última venda também apaga o nome do produto.

A **normalização** usa as dependências entre atributos para identificar repetições e separar factos. Aqui, podemos guardar o nome numa tabela de produtos, sem o repetir em cada venda.

#### Dependências funcionais

Assumimos que cada produto tem um único nome atual. Por isso:

$$
\text{Produto} \to \text{Nome}
$$

Esta é uma **dependência funcional**, abreviada DF. Duas linhas com o mesmo produto têm de ter o mesmo nome. Produto pode repetir-se, como na tabela; a dependência não o torna único.

Em geral, $X \to Y$ significa que duas linhas iguais nos atributos de $X$ têm de ser iguais nos de $Y$. A regra deve valer em todas as instâncias válidas, incluindo dados futuros.

A dependência inversa exige outra regra. Se produtos diferentes puderem chamar-se "Rato", `Nome → Produto` não vale. Nomes distintos numa amostra não provam essa dependência. Uma instância válida com dois produtos de igual nome refuta-a.

#### Dependências triviais

`Produto, Nome → Nome` é uma dependência **trivial**. O lado direito já está incluído no esquerdo: $Y \subseteq X$. Duas linhas iguais no produto e no nome têm necessariamente o mesmo nome.

Em `Produto → Produto, Nome`, só `Produto → Nome` acrescenta uma restrição aos dados.

**Decisão editorial:** a tabela permite apontar para a repetição e volta a servir na definição. Os títulos identificam a matéria. A condição sobre o nome atual impede confundir esta regra com um histórico de nomes. O trecho termina quando conclui a última ideia, sem recapitular o índice.

## Pipeline: dar espaço às contas

**Rascunho denso:**

> Com atrasos de 200, 100, 150, 250 e 100 ps, o ciclo é 250 ps, a latência é 1250 ps, em ciclo único são 800 ps, vinte instruções levam 6000 ps em pipeline e 16000 ps em ciclo único, pelo que a rapidez relativa é 2,67.

**Revisão:**

### Período e latência

Considera cinco fases com atrasos de 200, 100, 150, 250 e 100 ps. Neste modelo ideal, ignoramos o atraso dos registos entre fases e não há conflitos nem paragens.

O período da pipeline tem de acomodar a fase mais lenta:

$$
T = \max(200,100,150,250,100) = 250\ \text{ps}.
$$

Uma instrução atravessa as cinco fases, por isso demora $5 \times 250 = 1250$ ps. Mas várias instruções podem estar em fases diferentes. Depois de a pipeline encher, termina uma por ciclo.

### Tempo de um conjunto de instruções

A primeira instrução termina no ciclo 5. As outras 19 terminam nos 19 ciclos seguintes. Para vinte instruções:

$$
T_{\text{pipeline}} = (5+19)\times250 = 6000\ \text{ps}.
$$

Numa implementação de ciclo único com os mesmos atrasos, cada instrução ocupa $200+100+150+250+100=800$ ps. As vinte instruções demoram $16000$ ps. A rapidez relativa deste conjunto é $16000/6000 \approx 2{,}67$.

A pipeline demora mais a concluir uma instrução isolada, mas conclui este conjunto em menos tempo porque sobrepõe as fases.

**Decisão editorial:** a revisão é maior. Separa grandezas que o rascunho mudava sem aviso e conserva as hipóteses. Um cronograma das primeiras instruções pode substituir parte da descrição da sobreposição; uma lista de seis resultados não a explica.

## Pesquisa binária: justificar a escolha

Queremos procurar `14` na lista ordenada `[2, 5, 8, 11, 14, 17, 20]`.

A **pesquisa binária** compara o valor procurado com o elemento do meio. Aqui, esse elemento é `11`. Como `14` é maior, podemos excluir `11` e todos os elementos à sua esquerda: nenhum deles pode ser `14`.

Resta `[14, 17, 20]`. O elemento do meio é agora `17`. Como `14` é menor, seguimos para a esquerda e encontramos `14`.

É a ordenação que permite excluir metade dos candidatos em cada passo. Numa lista desordenada, `14` poderia estar à esquerda de `11`, e a primeira escolha poderia eliminá-lo. Paramos quando encontramos o valor ou quando já não há candidatos.

Se a lista tem $n$ elementos, cada comparação reduz para cerca de metade o intervalo ainda por pesquisar. Por isso, o número de comparações no pior caso cresce como $\log n$.

**Decisão editorial:** os valores ficam pequenos o suficiente para seguir o percurso. A condição de ordenação explica uma escolha, em vez de aparecer apenas como aviso depois do algoritmo.

## Binomial: interpretar os fatores

Queremos calcular a probabilidade de obter exatamente duas caras em três lançamentos independentes de uma moeda equilibrada.

Seja $X$ o número de caras. Cada lançamento tem dois resultados possíveis e a probabilidade de cara é sempre $1/2$. Assim, $X$ segue uma distribuição binomial com três tentativas e probabilidade de sucesso $1/2$.

As duas caras podem aparecer nos lançamentos 1 e 2, 1 e 3, ou 2 e 3. São três possibilidades. Cada uma tem probabilidade $(1/2)^3=1/8$:

$$
P(X=2)=\binom{3}{2}\left(\frac12\right)^2\left(\frac12\right)=\frac38.
$$

O fator $\binom{3}{2}$ conta as posições das duas caras. Os restantes fatores dão a probabilidade de duas caras e uma coroa numa dessas ordens. A probabilidade pedida é $37{,}5\%$.

Se os lançamentos não fossem independentes, não poderíamos multiplicar estas probabilidades desta forma.

**Decisão editorial:** o texto explica por que se usa a distribuição e o que conta cada fator. Um editor para lançar a moeda seria outro objeto de estudo; não é necessário para esta conta.

## Cópia de listas: mostrar a diferença no estado

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

**Decisão editorial:** a mesma alteração permite comparar partilha e cópia. Uma figura com nomes e setas ajuda a localizar as referências. Um único editor pode explorar ambas as atribuições; dois editores completos acrescentariam controlos para repetir quase o mesmo programa.

## Subespaços: usar um contraexemplo completo

A união dos dois eixos coordenados contém $(1,0)$ e $(0,1)$. No entanto, a soma é $(1,1)$, que não pertence a nenhum dos eixos. A união não é fechada para a adição, logo não é um subespaço de $\mathbb{R}^2$.

Cada eixo, considerado isoladamente, é um subespaço. O que falha é a união: ela permite escolher um vetor em cada eixo sem conter a soma.

**Decisão editorial:** uma figura deve mostrar os eixos, os dois vetores e a soma fora da união. Um seletor de temas, três sliders de coordenadas e um painel com todas as propriedades de subespaço não ajudam a ver este contraexemplo.

## Guias: ação e verificação

### Pasta de trabalho

Abre o terminal na pasta onde guardaste o projeto. Executa:

```sh
pwd
ls
```

`pwd` mostra o caminho da pasta atual. `ls` lista os ficheiros e pastas que estão dentro dela. Confirma que aparece o ficheiro que vais usar no próximo passo.

Se o projeto estiver numa subpasta chamada `exercicio`, entra nela com `cd exercicio` e volta a executar `ls`. Substitui `exercicio` pelo nome da tua pasta.

**Decisão editorial:** a instrução indica onde agir e como reconhecer o estado necessário. Numa lição avançada, uma ligação a este guia pode evitar repetir os comandos básicos.

## Cortes que preservam a explicação

| Rascunho                                                                                                    | Revisão                                                                                                | Razão                                              |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| "Nesta lição vamos compreender a importância das dependências funcionais para o desenho de bases de dados." | Começar pela tabela de encomendas.                                                                     | A anomalia mostra para que precisamos do conceito. |
| "É de extrema importância ter em consideração que o método pressupõe necessariamente uma ordenação prévia." | "A pesquisa binária exige uma lista ordenada. É essa ordem que permite excluir metade dos candidatos." | Mantém a condição e a sua função.                  |
| "Como podemos observar, o resultado obtido demonstra que a lista original foi alterada."                    | "`append` alterou a lista que os dois nomes partilham."                                                | Nomeia a operação e a causa.                       |
| "O objeto central é uma pilha, ou seja, uma estrutura de dados, que é uma forma de organizar dados..."      | "Numa pilha, o último elemento a entrar é o primeiro a sair."                                          | Ensina primeiro a regra que distingue a estrutura. |

Estas substituições dependem do contexto. Não apliques uma troca automática de frases à cadeira inteira.
