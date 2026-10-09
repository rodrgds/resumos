## Casos derivados do contrato

Um teste unitário verifica comportamento de uma unidade pequena, que pode incluir vários objetos simples. Integração verifica uma fronteira real; sistema percorre a aplicação completa.

Para uma arena de largura 5, o contrato aceita posições de **0 a 4**:

| Caso                                | Resultado esperado              |
| ----------------------------------- | ------------------------------- |
| `contem(0)`, `contem(4)`            | `true`, fronteiras interiores.  |
| `contem(-1)`, `contem(5)`           | `false`, fronteiras exteriores. |
| Construir com largura 0 ou negativa | `IllegalArgumentException`.     |

Os esperados vêm do contrato, mesmo que a implementação esteja errada. Seleção **black-box** usa partições e fronteiras desse contrato; **white-box** procura percursos pela implementação. Testar largura zero pode ser black-box. Estrutura o teste em preparação, ação e asserção, Arrange, Act, Assert.

## JUnit e independência

Este teste pertence à classe de testes de `Limite` definida na lição completa:

```java
@Test
void rejeitaFronteiraSuperior() {
    Limite limite = new Limite(5);
    assertFalse(limite.contem(5));
}
```

- `@ParameterizedTest` repete o comportamento para dados fornecidos, por exemplo por `@ValueSource`.
- `assertEquals` compara igualdade lógica; `assertSame`, identidade. Para cálculos aproximados, escolhe uma tolerância adequada.
- `assertThrows` executa a ação e verifica uma exceção compatível, incluindo subclasses.
- JUnit Jupiter cria normalmente uma instância por método. `@BeforeEach` prepara e `@AfterEach` limpa cada execução. No ciclo predefinido, `@BeforeAll` e `@AfterAll` são estáticos.
- Testes não dependem de ordem, estado deixado por outros ou pausas arbitrárias. Injeta tempo, aleatoriedade e I/O quando precisas de os controlar.

Os exemplos JUnit e Mockito correm no projeto Gradle local, não no editor Java do site. [Ficheiros completos](/cadeiras/ldts/testes-unitarios/#o-primeiro-teste-com-junit).

## Substitutos e interações

| Substituto | Uso                                                                  |
| ---------- | -------------------------------------------------------------------- |
| Stub       | Fornece respostas controladas, como a tecla `"direita"`.             |
| Fake       | Implementação simplificada funcional, como armazenamento em memória. |
| Mock       | Permite verificar interações, como enviar a posição aceite à vista.  |
| Spy        | Envolve um objeto real e executa os métodos por defeito.             |

Em Mockito, `when(entrada.ler()).thenReturn("direita")` controla a entrada; `verify(vista).mostrar(3)` exige uma chamada correspondente. Sozinho, não proíbe outras chamadas. Usa `times` ou `never` quando a quantidade faz parte do contrato.

Verifica interações que têm significado externo, sem fixar todas as chamadas internas de um algoritmo. Num spy, `when(spy.metodo())` pode executar o método na configuração; `doReturn(...).when(spy).metodo()` evita essa execução.

## Cobertura e mutação

Cobertura mede código executado, não a força das asserções. Um teste sem asserção pode executar uma linha e aceitar qualquer resultado.

Para `x >= 0 && x < 5`, `-1` não avalia a segunda condição; `2` torna ambas verdadeiras; `5` torna a segunda falsa. Cobertura de linhas, branches e condições responde a perguntas diferentes.

**Mutation testing** introduz pequenas mudanças. Um mutante é morto quando os testes falham, sobrevivente quando passam. Trocar `< 5` por `<= 5` é distinguido por `x = 5`, não por 2 ou 6. Um sobrevivente pode ser equivalente no domínio válido; analisa-o antes de adicionar testes.

No ciclo TDD, observa primeiro uma falha pelo requisito, implementa e só depois refatora. Uma falha de importação não demonstra proteção. Property-based testing verifica propriedades em entradas geradas; conserva casos que revelem erros como regressões reproduzíveis. Testes finitos não provam correção geral.
