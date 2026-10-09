## Caso de uso e responsabilidades

Para terminar uma partida, a apresentação recebe o pedido; o serviço procura a entidade, coordena a operação e a persistência; a entidade protege a regra; o adaptador trata o armazenamento.

```text
Apresentação --> TerminarPartida --> Partida
                               --> Partidas <-- PartidasSQL
                                            <-- PartidasMemoria
```

O domínio não importa SQL nem componentes gráficos. Separar camadas não torna a operação atómica: uma falha entre alterar o objeto e guardar exige uma política de confirmação e repetição.

| Resultado da procura | Comportamento                                                                     |
| -------------------- | --------------------------------------------------------------------------------- |
| Partida em curso     | A entidade termina; o serviço pede escrita e só anuncia sucesso se esta terminar. |
| Ausência confirmada  | Erro de ausência, sem operação na entidade.                                       |
| Falha de acesso      | Erro de armazenamento, não ausência.                                              |
| Partida já terminada | A regra rejeita repetir o encerramento, sem nova escrita.                         |

## Onde ficam as regras

- **Transaction Script** organiza uma operação num procedimento com regras e escrita. Serve operações simples e independentes; regras repetidas em vários procedimentos tornam mudanças dispersas.
- **Domain Model** reúne estado e comportamento em entidades. `Partida.terminar()` protege os seus invariantes, em vez de clientes alterarem campos por setters.
- **Service Layer** oferece casos de uso, como `terminarPartida(id)`, coordena colaboradores e pode definir a fronteira transacional. Não deve absorver invariantes que pertencem à entidade.

Usar classes não distingue Transaction Script de Domain Model. A decisão é onde ficam as regras e quem as protege.

## Persistência e identidade

| Padrão        | Separação e consequência                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Active Record | O objeto representa um registo e conhece operações de persistência. Simplifica operações centradas em dados, mas acopla o objeto ao armazenamento. |
| Data Mapper   | Traduz objetos e dados num componente separado; o domínio não conhece tabelas nem SQL.                                                             |
| Repository    | Oferece consultas e escrita em termos do domínio, com acesso semelhante a uma coleção. Pode usar mappers internamente.                             |
| Unit of Work  | Acompanha objetos novos, alterados e removidos e coordena a escrita do conjunto. Não substitui transações ou controlo de concorrência.             |
| Identity Map  | Mantém uma instância por identidade num âmbito definido, por exemplo uma operação. Evita duas cópias divergentes da partida 7 nesse âmbito.        |

```java
interface Partidas {
    java.util.Optional<Partida> procurarPorId(long id);
    void guardar(Partida partida);
}
```

`Optional.empty()` significa ausência confirmada. Não o devolvas para esconder uma falha de ligação. O contrato não recebe SQL: acrescenta consultas com significado, como procurar partidas em curso.

A Identity Map não torna a escrita atómica nem impede outra operação de alterar a linha. Identidade da entidade pelo identificador também não é a igualdade de um valor, como coordenadas de uma posição.

## Dados nas fronteiras e testes

Um **DTO** transporta campos necessários à apresentação sem expor a entidade para alteração. **Lazy Load** adia carregamento, mas um getter pode passar a fazer I/O; carregar uma relação por cada linha de uma lista pode causar N+1 consultas.

Testa os invariantes da entidade e a coordenação do serviço separadamente. Um fake pode guardar o estado em memória. Verificar `guardar` num mock prova a interação, não durabilidade; um teste de integração deve escrever e verificar numa nova leitura.

[Percurso completo do encerramento](/cadeiras/ldts/arquitetura-empresarial/#camadas-e-dependências).
