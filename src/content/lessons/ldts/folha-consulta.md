---
title: Cheat sheet de LDTS
description: Contratos, condições e decisões para rever Git, Java, testes, UML e desenho de aplicações.
section: recursos
studyKind: revision
order: 0
---

Cada linha resume uma decisão já explicada nas lições: o que verificar antes de escolher um comando, uma coleção ou um padrão, com ligações para a explicação completa.

## Git e Gradle

| Decisão                          | Lembra                                                                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Escolher o próximo commit        | `add` prepara o conteúdo daquele instante. Editar depois não atualiza o índice. Confere `diff --cached`.                                                           |
| Integrar branches                | Fast-forward move a referência; histórias divergentes exigem combinar mudanças. Merge entra no branch atual.                                                       |
| Obter ou publicar                | `fetch` obtém sem integrar; `pull` obtém e integra; `push` publica.                                                                                                |
| Desfazer no histórico partilhado | `revert` acrescenta um commit inverso. `reset --hard` pode destruir mudanças locais.                                                                               |
| Reproduzir o build               | Usa o wrapper, `options.release = 8` para o alvo e as versões declaradas. `testImplementation` não é uma dependência do programa. Cria `Main.java` antes de `run`. |

[Áreas do Git](/cadeiras/ldts/controlo-versoes/#as-três-áreas-do-git) · [Integração](/cadeiras/ldts/controlo-versoes/#branches-e-merges) · [Gradle](/cadeiras/ldts/controlo-versoes/#dependências-com-gradle)

## Java e estado

- Java passa argumentos por valor, incluindo referências. Alterar o objeto pode afetar o chamador; reatribuir o parâmetro não muda a variável do chamador.
- `final` impede reatribuição, não garante imutabilidade do objeto.
- Para objetos, `==` compara identidade; `equals` representa igualdade lógica. Objetos iguais têm o mesmo hash; hashes iguais não provam igualdade.
- Não alteres campos de igualdade/hash enquanto o objeto está num `HashSet` ou é chave de `HashMap`.
- `List` mantém sequência e duplicados; `Set` unicidade; `Map` um valor por chave. `HashSet` e `HashMap` não prometem ordem de iteração.
- Uma vista não modificável acompanha alterações da coleção original. Uma cópia defensiva separa as coleções, mas pode partilhar elementos mutáveis.
- Genéricos são invariantes. Declara `T` em `Caixa<T>` ou `<E>` antes do retorno de um método genérico. `? extends T` permite ler como `T`; `? super T` permite inserir `T`. `extends` não torna a coleção imutável.
- `start()` inicia a thread; `run()` direto é uma chamada normal; `join()` espera o fim. `sleep()` não é sincronização.
- `synchronized` coordena acessos pelo mesmo monitor. `volatile` não torna `++` atómico. Usa `while` para testar a condição de `wait()`.
- Bytes usam streams; texto usa readers/writers e uma codificação. `try-with-resources` fecha recursos. Swing atualiza a interface na EDT.

[Referências](/cadeiras/ldts/java-orientado-objetos/#valores-e-referências) · [Hash](/cadeiras/ldts/java-orientado-objetos/#igualdade-e-hash) · [Genéricos](/cadeiras/ldts/java-orientado-objetos/#genéricos-e-wildcards) · [Sincronização](/cadeiras/ldts/java-concorrencia-io-swing/#proteger-estado-com-o-mesmo-lock)

## Desenho e testes

| Ideia               | Condição decisiva                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| SRP                 | Separa razões independentes para mudar.                                                                  |
| OCP                 | Protege o cliente estável; a montagem ainda pode mudar.                                                  |
| LSP                 | O subtipo não exige mais nem promete menos.                                                              |
| ISP                 | O cliente não depende de operações irrelevantes.                                                         |
| DIP                 | Regras e detalhes dependem de contratos adequados. Injeção por si só não prova DIP.                      |
| Teste útil          | Esperado derivado do contrato, casos normais, fronteiras e erros.                                        |
| Stub / mock         | Stub fornece respostas; mock verifica interações exigidas.                                               |
| Cobertura / mutação | Executar código não prova asserções; um mutante morto revela uma mudança detetada. Analisa equivalentes. |
| Refatoração         | Preserva resultados, efeitos e erros observáveis. Faz passos pequenos e verifica cada um.                |

[SOLID](/cadeiras/ldts/principios-solid/#os-cinco-princípios) · [JUnit](/cadeiras/ldts/testes-unitarios/#o-primeiro-teste-com-junit) · [Mutação](/cadeiras/ldts/testes-unitarios/#cobertura-e-mutation-testing) · [Refatoração](/cadeiras/ldts/smells-refactoring/#como-refatorar-em-segurança)

## Escolher padrões

| Problema                                          | Padrão                                               |
| ------------------------------------------------- | ---------------------------------------------------- |
| Trocar um algoritmo                               | Strategy                                             |
| Reagir conforme o estado e transitar              | State                                                |
| Guardar ou enfileirar um pedido                   | Command, undo exige estado e política próprios.      |
| Notificar interessados                            | Observer, com ciclo de vida de subscrição.           |
| Tratar folhas e grupos uniformemente              | Composite                                            |
| Subclasses escolhem um produto                    | Factory Method                                       |
| Escolher uma família de produtos                  | Abstract Factory                                     |
| Traduzir uma interface                            | Adapter                                              |
| Acrescentar comportamento conservando a interface | Decorator, a ordem pode importar.                    |
| Restringir instâncias e dar acesso global         | Singleton, com custos de isolamento e estado global. |

[Padrões explicados](/cadeiras/ldts/padroes-desenho/)

## UML e arquitetura

Classes mostram estrutura; sequência mostra ordem de mensagens com `alt` para alternativas; comunicação mostra ligações e ordem numerada com `1.1` para chamadas aninhadas; estados mostram eventos, guardas e transições. Operações `getX()` iguais no código e nos diagramas. A multiplicidade num extremo conta objetos desse extremo para um objeto do outro. O losango de composição fica no todo. Uma referência Java não prova posse forte.

MVC separa regras no modelo, apresentação na vista e interpretação/coordenação no controlador. Mostra o estado aceite pelo modelo, incluindo operações recusadas. Service Layer coordena casos de uso; Domain Model protege regras; Data Mapper separa persistência; Repository oferece consultas em termos do domínio. `Optional.empty()` significa ausência após consulta válida, não falha de acesso. Identity Map conserva uma instância por identidade no âmbito decidido, sem garantir atomicidade. Testar uma chamada a `guardar` não prova que os dados ficaram persistidos.

[UML](/cadeiras/ldts/diagramas-uml/) · [MVC](/cadeiras/ldts/mvc-projeto/) · [Arquitetura empresarial](/cadeiras/ldts/arquitetura-empresarial/)
