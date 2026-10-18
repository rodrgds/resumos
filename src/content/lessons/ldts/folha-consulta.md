---
title: Cheat sheet de LDTS
description: Contratos, condições e decisões para rever Git, Java, testes, UML e desenho de aplicações.
section: recursos
studyKind: revision
order: 0
---

Cada linha resume uma decisão explicada nas lições. Escolhe pela condição, confirma na ligação.

## Git e Gradle

| Decisão               | Condição e comando                                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| O que entra no commit | `add` congela o instante; sem novo `add`, o commit ignora a edição posterior. Confere `diff --cached`.                                                                 |
| Integrar branches     | Antepassado permite fast-forward; divergência combina e pode criar merge com dois pais. Integra no branch atual.                                                       |
| Obter ou publicar     | `fetch` sem integrar; `pull --ff-only` só sem divergência; `push` publica.                                                                                             |
| Desfazer partilhado   | `revert` cria inversão. `reset --hard` destrói edição local.                                                                                                           |
| Build reproduzível    | Wrapper no Git, `./gradlew`, `options.release = 8`.                                                                                                                    |
| JUnit e execução      | `useJUnitPlatform()` seleciona a plataforma; Jupiter precisa das dependências e do motor no projeto. `run` executa a classe principal configurada (`Main` no exemplo). |

[Áreas](/cadeiras/ldts/controlo-versoes/#as-três-áreas-do-git) · [Branches](/cadeiras/ldts/controlo-versoes/#branches-e-merges) · [Remoto](/cadeiras/ldts/controlo-versoes/#repositório-local-e-remoto) · [Gradle](/cadeiras/ldts/controlo-versoes/#dependências-com-gradle)

## Java: valores e tipos

| Decisão                | Condição                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Passagem de argumentos | Por valor, incluindo referências. Mutar partilha-se; reatribuir o parâmetro não.                                                                     |
| Aritmética inteira     | Converte para `long` **antes** de somar. `byte++` converte de volta, 127 passa a -128.                                                               |
| `final`                | Fixa a variável, não o objeto.                                                                                                                       |
| Igualdade              | `==` em referências é identidade; em primitivos compara valores. `equals(Object)` é igualdade lógica, com `@Override`. Iguais partilham `hashCode`.  |
| `TreeSet`              | Comparação zero é duplicado. Ordena por x e depois y, com `Integer.compare`. Não mudes campos de ordem ou hash no conjunto.                          |
| Coleções               | `List` mantém sequência com posições e duplicados; `Set` unicidade; `Map` um valor por chave; implementações `Hash*` não garantem ordem de iteração. |
| Exposição              | Vista acompanha a origem; cópia separa a coleção, não elementos mutáveis.                                                                            |
| Genéricos              | Invariantes. Origem `? extends T`, destino `? super T`. `extends` não é imutabilidade.                                                               |

[Referências](/cadeiras/ldts/java-orientado-objetos/#valores-e-referências) · [Igualdade](/cadeiras/ldts/java-orientado-objetos/#igualdade-e-hash) · [Genéricos](/cadeiras/ldts/java-orientado-objetos/#genéricos-e-wildcards)

## Concorrência, I/O e Swing

| Decisão                 | Condição                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Arrancar e esperar      | `start()` inicia; `run()` direto é chamada normal; `join()` espera. `sleep()` não sincroniza.         |
| Proteger estado         | Mesmo monitor em todos os acessos. `volatile` publica, sem tornar `++` atómico.                       |
| Esperar condição        | `while`, não `if`: reacquire pode encontrar estado mudado; há despertares sem notificação.            |
| Ler texto               | `InputStreamReader` com codificação explícita dentro de `BufferedReader`; `try-with-resources` fecha. |
| Interface sem bloqueios | Listener na EDT cria worker e termina; `doInBackground` sem Swing; `done` atualiza na EDT.            |

[Monitores](/cadeiras/ldts/java-concorrencia-io-swing/#proteger-estado-com-o-mesmo-lock) · [Espera](/cadeiras/ldts/java-concorrencia-io-swing/#esperar-por-uma-condição) · [I/O](/cadeiras/ldts/java-concorrencia-io-swing/#bytes-texto-e-buffers) · [Swing](/cadeiras/ldts/java-concorrencia-io-swing/#swing-e-eventos)

## SOLID e testes

| Ideia               | Condição decisiva                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| SRP                 | Separa razões independentes para mudar.                                                                           |
| OCP                 | Protege o cliente estável; a montagem regista alternativas.                                                       |
| LSP                 | Sem pré-condições mais fortes nem pós-condições mais fracas.                                                      |
| ISP                 | Cliente só depende das operações que usa.                                                                         |
| DIP                 | Regra e detalhes dependem do contrato. Injeção sem contrato não é DIP.                                            |
| Teste útil          | Esperado do contrato: normais, fronteiras, erros.                                                                 |
| Stub / resposta     | Stub responde com valores; se o resultado já prova o comportamento, verificar a chamada é normalmente redundante. |
| Mock / interação    | Mock verifica a interação quando o contrato pede o efeito, a quantidade ou a ordem que as asserções não observam. |
| Cobertura / mutação | Executar não prova asserção. Morto é detetado; sobrevivente pode ser equivalente.                                 |
| Refatoração         | Preserva observável em passos pequenos, cada um testado.                                                          |

[SOLID](/cadeiras/ldts/principios-solid/#os-cinco-princípios) · [JUnit](/cadeiras/ldts/testes-unitarios/#o-primeiro-teste-com-junit) · [Mockito](/cadeiras/ldts/testes-unitarios/#mocks-e-stubs-com-mockito) · [Mutação](/cadeiras/ldts/testes-unitarios/#cobertura-e-mutation-testing) · [Refatorar](/cadeiras/ldts/smells-refactoring/#como-refatorar-em-segurança)

## Padrões: problema e custo

| Problema               | Padrão e custo                                                |
| ---------------------- | ------------------------------------------------------------- |
| Trocar algoritmo       | Strategy; a escolha concreta vive na configuração.            |
| Reagir por estado      | State; transições têm dono. Enumeração pode chegar.           |
| Guardar pedido         | Command; undo pede estado anterior e política.                |
| Notificar interessados | Observer; subscrição tem ciclo de vida e política de remoção. |
| Árvore uniforme        | Composite; partilha conta repetido. Não é posse UML.          |
| Criação por subclasses | Factory Method; sem redefiníveis no construtor.               |
| Família de produtos    | Abstract Factory; produto novo muda contrato e fábricas.      |
| Traduzir interface     | Adapter; fixa unidades, erros e perdas.                       |
| Somar comportamento    | Decorator; ordem pode mudar o total. Delegar não é notificar. |
| Instância global       | Singleton; protege a criação, não campos mutáveis nem testes. |

[Padrões](/cadeiras/ldts/padroes-desenho/) · [Strategy e State](/cadeiras/ldts/padroes-desenho/#state-reagir-conforme-o-estado) · [Delegação](/cadeiras/ldts/padroes-desenho/#delegação-e-preço-atual)

## UML e arquitetura

| Pergunta                 | Diagrama e leitura                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Como se relacionam?      | Classes. Losango cheio no todo é composição; campo não prova posse. Multiplicidade conta o próprio extremo.           |
| Em que ordem?            | Sequência, tempo para baixo é ordem. `alt` separa por guardas; comum aos ramos fica depois.                           |
| Por que ligações?        | Comunicação, ordem por numeração; interna durante `2` é `2.1`.                                                        |
| Quando reage como?       | Estados, `evento [guarda] / efeito`. Regiões ortogonais evitam repetir combinações.                                   |
| Onde vive a regra?       | MVC: modelo valida, vista apresenta o aceite, controlador coordena.                                                   |
| Onde vive o caso de uso? | Service Layer coordena; Domain Model protege invariantes; Repository fala o domínio; `empty()` é ausência, não falha. |

[Classes](/cadeiras/ldts/diagramas-uml/#diagrama-de-classes) · [Sequência](/cadeiras/ldts/diagramas-uml/#condições-e-repetição) · [Estados](/cadeiras/ldts/diagramas-uml/#diagrama-de-estados) · [MVC](/cadeiras/ldts/mvc-projeto/) · [Camadas](/cadeiras/ldts/arquitetura-empresarial/#camadas-e-dependências) · [Persistência](/cadeiras/ldts/arquitetura-empresarial/#repository)
