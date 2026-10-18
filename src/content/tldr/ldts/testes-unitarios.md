## Escolher casos do contrato

Teste unitário verifica comportamento de uma unidade pequena; integração atravessa uma fronteira real; sistema percorre a aplicação. Arena de largura 5 aceita **0 a 4**:

| Caso                      | Esperado                                  |
| ------------------------- | ----------------------------------------- |
| `contem(0)`, `contem(4)`  | `true`, fronteiras interiores.            |
| `contem(-1)`, `contem(5)` | `false`, fronteiras exteriores.           |
| Largura 0 ou negativa     | `IllegalArgumentException` no construtor. |

Esperado vem do contrato, não do código. **Black-box** parte o domínio em partições e fronteiras; **white-box** procura percursos na implementação. Largura zero é black-box quando a regra a proíbe. Estrutura: preparação, ação, asserção.

## JUnit e independência

```java
@Test
void rejeitaFronteiraSuperior() {
    assertFalse(new Limite(5).contem(5));
}
```

- `@ParameterizedTest` com `@ValueSource` repete por argumento. `assertEquals` é igualdade lógica, `assertSame` identidade; em cálculos aproximados de vírgula flutuante, usa tolerância explícita adequada ao contrato e ao erro numérico. `assertThrows` aceita subclasses da exceção.
- Uma instância por método, em geral. `@BeforeEach`/`@AfterEach` por execução; `@BeforeAll`/`@AfterAll` estáticos no ciclo predefinido.
- Sem dependência de ordem, estado entre testes ou pausas arbitrárias. Tempo, aleatoriedade e I/O injetam-se para ficarem controlados.

JUnit e Mockito correm no projeto Gradle local, não no editor do site. [Ficheiros completos](/cadeiras/ldts/testes-unitarios/#o-primeiro-teste-com-junit).

## Substitutos e interações

| Substituto | Papel                                                              |
| ---------- | ------------------------------------------------------------------ |
| Stub       | Respostas fixas, como a tecla `"direita"`.                         |
| Fake       | Implementação simples funcional, como memória em vez de ficheiros. |
| Mock       | Verifica interações exigidas, como `mostrar(3)` na vista.          |
| Spy        | Envolve o real; `doReturn(...).when(spy)` configura sem executar.  |

`when(entrada.ler()).thenReturn("direita")` prepara; `verify(vista).mostrar(3)` exige essa chamada, sem proibir outras. Se o resultado do teste já prova o comportamento, verificar o stub é normalmente redundante; verifica a interação quando faz parte do contrato, como o destino de um efeito, a sua quantidade ou a sua ordem, que as asserções não observam. Verifica efeitos externos, não cada chamada interna de um algoritmo.

## Cobertura e mutação

Cobertura conta execução, não força de asserção. Para `x >= 0 && x < 5`: `-1` nem avalia a segunda condição, `2` aceita, `5` rejeita na segunda. Linha, branches e condições perguntam coisas diferentes.

Mutação troca `<` por `<=`: só `x = 5` distingue as versões; 2 e 6 não. Morto é detetado, sobrevivente passou. Sobrevivente pode ser **equivalente**, sem diferença observável no domínio válido: analisa antes de acrescentar testes. PIT evita, por exemplo, mutar chamadas de logging.

TDD: falha primeiro pelo requisito, implementação mínima, depois refatoração. Falha de importação não prova proteção. PBT com jqwik verifica propriedades em entradas geradas (`@ForAll`) com shrinking; conserva contraexemplos como regressões.

[Cobertura e PIT no projeto](/cadeiras/ldts/testes-unitarios/#cobertura-e-mutation-testing).
