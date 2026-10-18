## Refatoração e diagnóstico

**Refactoring** muda a estrutura preservando resultados, efeitos, erros e ordem relevante. Corrigir defeito é outra operação. Testes detetam diferenças, não provam equivalência.

1. Fixa o contrato e corre os testes.
2. Acrescenta casos em falta antes de mexer.
3. Transforma em passos pequenos, compilando e testando cada um.
4. Confere efeitos e exceções que os testes não cobrem.

Smell é sinal, não veredicto. Cinco famílias: inchado, abusos de OO, entraves à mudança, dispensável, acoplamento.

| Dificuldade                                  | Transformação                            |
| -------------------------------------------- | ---------------------------------------- |
| Método com intenções misturadas              | Extract Method com nomes de intenção.    |
| Classe muda por razões independentes         | Extract Class.                           |
| Regra dispersa por vários sítios             | Reunir num responsável comum.            |
| Operação vive dos dados de outro objeto      | Move Method, se a regra pertence lá.     |
| Valores viajam juntos; primitivos com regras | Parameter Object ou tipo do domínio.     |
| Subclasse recusa promessas da base           | Rever hierarquia, considerar composição. |

Serializador que lê muitos atributos não se move por contagem de chamadas: formato e domínio são responsabilidades distintas. `a.getB().getC().getX()` expõe estrutura interna. Intermediário que esconde fronteira fica; código morto e abstração especulativa saem.

## A tarifa preservada

0 a 1000 unidades; primeiras cinco a 200 cêntimos, restantes a 150:

```java
static int calcular(int n) {
    if (n < 0 || n > 1000)
        throw new IllegalArgumentException("quantidade invalida");
    return Math.min(n, 5) * 200 + Math.max(0, n - 5) * 150;
}
```

Confere `0 → 0`, `5 → 1000`, `6 → 1150`, `1000 → 150250`; `-1` e `1001` lançam a mesma exceção e mensagem. Cobrar 150 em todas as seis daria 900: outra regra. Passos: extrai tal como está, move para `Tarifa`, só depois simplifica. [Transformação completa](/cadeiras/ldts/smells-refactoring/#exemplo-extrair-a-regra-do-preço).

## Condições de cada transformação

- Extract Variable conserva número e momento de avaliações com efeitos.
- Guard Clauses conservam a ordem que escolhe o primeiro erro.
- Move Method começa delegando no local antigo.
- Encapsulate Collection: vista acompanha a origem, cópia separa a coleção.
- Replace Conditional with Polymorphism exige contrato comum útil; não elimina todas as condições.
