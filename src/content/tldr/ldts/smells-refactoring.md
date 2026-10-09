## Refatoração e contrato

**Refactoring** altera a estrutura interna preservando comportamento observável: resultados, efeitos, erros e ordem relevante. Corrigir um defeito muda um comportamento; é uma operação distinta. Testes detetam diferenças, mas não provam equivalência geral.

1. Identifica o contrato e corre os testes existentes.
2. Acrescenta casos relevantes em falta antes de transformar.
3. Faz uma transformação pequena, compila e testa.
4. Confere efeitos, exceções e estado partilhado que os testes não cobrem; depois continua.

## Diagnosticar o smell

Um smell é um sinal para investigar. O número de linhas ou de chamadas não decide sozinho a responsabilidade.

| Dificuldade observada                                                    | Transformação a considerar                                   |
| ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Um método mistura intenções e níveis de detalhe.                         | Extract Method, com nomes que explicam cada intenção.        |
| Uma classe muda por razões independentes, Divergent Change.              | Extract Class, separando essas razões.                       |
| Uma regra exige edições em muitos locais, Shotgun Surgery ou duplicação. | Reunir a regra num responsável comum.                        |
| Uma operação protege sobretudo regras de outro objeto, Feature Envy.     | Move Method, se esse objeto deve conhecer a regra.           |
| Valores viajam juntos ou primitivos têm regras próprias.                 | Parameter Object ou tipo do domínio que valida essas regras. |
| Uma subclasse recusa promessas da base, Refused Bequest.                 | Rever a hierarquia e considerar composição.                  |

Um serializador consultar muitos atributos não obriga a movê-lo para a entidade: formato e domínio são responsabilidades diferentes. Cadeias como `arena.getHeroi().getPosicao().getX()` expõem a estrutura interna. Um intermediário só merece desaparecer se não esconder uma fronteira útil. Remove código morto e abstrações especulativas sem eliminar contratos necessários.

## Preservar a tarifa

Para quantidades de **0 a 1000**, as primeiras cinco unidades custam 200 cêntimos cada e as restantes 150:

```java
static int calcular(int n) {
    if (n < 0 || n > 1000)
        throw new IllegalArgumentException("quantidade invalida");
    return Math.min(n, 5) * 200 + Math.max(0, n - 5) * 150;
}
```

Confere `0 → 0`, `5 → 1000`, `6 → 1150` e `1000 → 150250`, em cêntimos; `-1` e `1001` continuam a lançar a mesma exceção e mensagem. Cobrar 150 por **todas** as seis unidades daria 900, mudando a regra.

Separa os passos: extrai o cálculo com o corpo original, move-o para `Tarifa`, depois simplifica. [Transformação completa](/cadeiras/ldts/smells-refactoring/#exemplo-extrair-a-regra-do-preço).

## Pré-condições das transformações

- Extract Variable preserva o número e momento das avaliações quando há efeitos ou estado variável.
- Guard Clauses conserva a ordem que decide qual erro acontece primeiro.
- Move Method pode começar com delegação no local antigo, preservando clientes.
- Encapsulate Collection distingue cópia de vista não modificável; a vista ainda acompanha alterações da origem.
- Replace Conditional with Polymorphism exige alternativas com contrato comum útil. Não serve para eliminar todas as condições.
