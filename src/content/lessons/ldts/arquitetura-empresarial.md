---
title: Arquitetura empresarial
description: Separar operações da aplicação, regras do domínio e persistência, reconhecendo padrões e os seus custos.
order: 10
practices:
  - ldts/praticar-arquitetura
---

Depois de seguir uma ação completa com MVC no projeto, esta página responde onde ficam as regras, as operações e os dados guardados quando a aplicação cresce.

Um pedido termina a partida e guarda o resultado: calcular a pontuação, decidir se a partida pode terminar e escrever uma linha numa base de dados são decisões diferentes. A arquitetura, que é a decisão sobre onde ficam essas responsabilidades e que contratos as ligam, separa quem coordena a operação de quem guarda o resultado.

MVC organiza sobretudo a relação com a apresentação. Uma aplicação que também guarda dados precisa de separar o domínio, que são as regras e entidades do jogo, da persistência, que é a forma de guardar e ler esses dados.

## Camadas e dependências

Podemos distinguir apresentação, operações da aplicação, domínio e persistência. Uma camada é um grupo de responsabilidades, não necessariamente uma pasta ou um processo diferente.

A apresentação recebe o pedido. Uma operação da aplicação coordena o caso de uso. O domínio valida a mudança. Um adaptador persiste o resultado. Os detalhes de SQL ou ficheiros não precisam de entrar nas entidades do domínio.

Por exemplo, `TerminarPartida` recebe o identificador, obtém a partida, chama `partida.terminar()` e guarda o resultado. A partida decide se pode terminar e qual é a pontuação. A operação decide como combinar esse trabalho com a persistência.

Uma falha depois da alteração em memória e antes de guardar exige uma política. Não basta dividir o código em camadas para tornar a operação atómica. Temos de definir o que fica confirmado e o que pode ser repetido.

## Transaction Script e Domain Model

**Transaction Script** organiza uma operação como um procedimento que recebe dados, aplica regras e escreve o resultado. Para operações simples e independentes, pode ser claro e direto. Se as mesmas regras surgem em muitos procedimentos, a duplicação torna mudanças mais difíceis.

**Domain Model** coloca estado e comportamento em objetos que representam conceitos do domínio. Uma `Partida` oferece `terminar` e protege o seu estado, em vez de qualquer cliente alterar um campo público. É útil quando as regras e relações precisam de evoluir em conjunto.

A diferença não é usar classes ou funções: um Transaction Script também pode ser um método de uma classe. Pergunta onde ficam as regras e quem protege os invariantes.

Para uma pontuação lida e mostrada sem regras adicionais, um procedimento pequeno pode chegar. Para uma partida com estados, penalizações e condições de encerramento, um modelo com operações próprias pode tornar o contrato mais claro.

## Service Layer

Uma **Service Layer** define as operações da aplicação, como `terminarPartida(id)`. Coordena o trabalho e pode definir a fronteira transacional. É um ponto de entrada para diferentes interfaces, como uma janela e uma API.

Não precisa de absorver toda a lógica do domínio. Se um serviço calcula manualmente tudo através de getters e setters, as entidades podem ter perdido a responsabilidade pelos seus invariantes.

O serviço pode delegar a validação em `Partida`, usar um repositório e devolver um resultado adequado à apresentação. Assim, trocar Swing por outra interface não exige reescrever o caso de uso.

## Active Record e Data Mapper

**Active Record** combina um objeto que representa uma linha com operações de persistência e, por vezes, regras desse registo. Um método `resultado.guardar()` faz o objeto conhecer a forma de guardar. Pode simplificar operações centradas em dados, mas liga o objeto à persistência.

**Data Mapper** coloca a tradução entre objetos e armazenamento num componente separado. O domínio não precisa de conhecer tabelas nem SQL. O mapper lê valores, constrói objetos válidos e escreve a representação correspondente.

Escolhe pela complexidade e pela independência de que o domínio precisa. Criar uma classe chamada `Mapper` que só passa chamadas à entidade não separa a persistência se a entidade continua a emitir SQL.

## Repository

Um **Repository** oferece acesso a objetos do domínio com uma interface semelhante a uma coleção. Pode ter `procurarPorId` e `guardar`. Esconde a tradução entre consultas e objetos, normalmente usando mappers por baixo.

Este excerto mostra um contrato que não expõe SQL:

```java
interface Partidas {
    java.util.Optional<Partida> procurarPorId(long id);
    void guardar(Partida partida);
}
```

O tipo `Partida` pertence ao domínio. Uma implementação em memória serve para testes e uma implementação SQL trata o armazenamento. `Optional.empty()` representa ausência; uma falha de ligação não deve fingir que a partida não existe.

Não acrescentes um método genérico que recebe strings SQL ao contrato para contornar a fronteira. Se uma nova operação precisa de encontrar partidas em curso, acrescenta uma consulta com esse significado e decide a sua semântica.

## Unit of Work e Identity Map

Uma **Unit of Work** acompanha objetos novos, alterados e removidos durante uma operação e coordena a escrita dessas mudanças. Ajuda a aplicar um conjunto coerente de alterações. Não substitui as garantias transacionais nem resolve sozinha acessos concorrentes.

Uma **Identity Map** conserva uma instância por identidade dentro de um âmbito. Se carregares duas vezes a partida 7 na mesma operação, evita obter dois objetos independentes que possam divergir. O âmbito deve ser definido, por exemplo uma operação, não um mapa global que cresce sem limite.

Identidade de uma entidade, como o identificador da partida, difere da igualdade de um valor, como duas posições com as mesmas coordenadas. Esta distinção orienta a forma de atualizar e persistir objetos.

## DTO e Lazy Load

Um **Data Transfer Object**, DTO, transporta os dados necessários numa fronteira. Pode reunir identificador e pontuação sem permitir que a interface altere diretamente a entidade. O DTO não tem de conter todas as operações do domínio.

**Lazy Load** adia o carregamento até os dados serem necessários. Pode evitar trabalho, mas torna um acesso aparentemente simples numa operação de I/O. Se cada linha de uma lista dispara outra consulta, surge o problema de N+1 consultas. A ausência de uma consulta no construtor não significa ausência de custo.

## Seguir um caso de uso

Para terminar a partida 7, a apresentação pede a operação ao serviço. O serviço obtém a entidade através de `Partidas`, trata a ausência, pede à entidade que termine e persiste a mudança. Devolve um resultado à apresentação.

Testa separadamente a regra de encerramento e a coordenação. Num teste do serviço, uma implementação em memória pode confirmar qual partida foi alterada. Um teste de integração da persistência verifica que o registo realmente sobrevive a uma nova leitura. Uma verificação de chamadas a um mock não prova essa durabilidade.

Cada padrão responde a uma dificuldade diferente. Explica primeiro a regra e a fronteira que precisas, e só depois escolhe o nome do padrão que descreve a solução.
