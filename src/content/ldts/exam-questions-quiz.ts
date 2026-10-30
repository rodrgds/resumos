import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  classes: '/cadeiras/ldts/java-orientado-objetos/#classes-e-objetos',
  igualdade: '/cadeiras/ldts/java-orientado-objetos/#igualdade-e-hash',
  assinaturaEquals:
    '/cadeiras/ldts/java-orientado-objetos/#a-assinatura-de-equals',
  treeset:
    '/cadeiras/ldts/java-orientado-objetos/#ordem-e-unicidade-num-treeset',
  heranca:
    '/cadeiras/ldts/java-orientado-objetos/#herança-interfaces-e-composição',
  excecoes: '/cadeiras/ldts/java-orientado-objetos/#exceções-e-contratos',
  command: '/cadeiras/ldts/padroes-desenho/#command-guardar-um-pedido',
  decorator: '/cadeiras/ldts/padroes-desenho/#delegação-e-preço-atual',
  strategy: '/cadeiras/ldts/padroes-desenho/#strategy-trocar-o-algoritmo',
};

export const quizEncapsulamento: ExamQuestion[] = [
  {
    id: 'ldts-quiz-2018-q1',
    title: 'Hierarquia Person, Attendee e Speaker',
    source: 'Quiz Event, 2018',
    topic: 'encapsulamento',
    prompt:
      'Numa hierarquia de classes, `Person` é abstrata e guarda nome e idade. `Attendee` acrescenta `hasPaid()` (inicialmente `false`) e `Speaker` acrescenta `getFee()` (inicialmente `0`). Um `new Attendee("John")` tem idade `0`. Os `toString` devem devolver exatamente `"Speaker Jane has a fee value of 0."` e a mensagem de um participante que ainda não pagou, no formato `"Attendee <nome> hasn\'t paid its registration."`, para `new Speaker("Jane", 38)` e `new Attendee("Mary", 27)`. Nenhum campo pode ser público. Escreva as três classes.',
    answer: {
      kind: 'self',
      checklist: [
        'A classe `Person` é declarada `abstract` e os campos não são públicos.',
        'O construtor de um só argumento dá idade `0`.',
        '`hasPaid()` devolve `false` e `getFee()` devolve `0` por omissão.',
        'Os dois `toString` seguem exatamente as cadeias do enunciado.',
      ],
    },
    solution:
      '`Person` abstrata com `name` e `age` privados; `Attendee` com `paid = false`; `Speaker` com `fee = 0`; `toString` de `Attendee` como `"Attendee " + name + (paid ? " has" : " hasn\'t") + " paid its registration."` e de `Speaker` como `"Speaker " + name + " has a fee value of " + fee + "."`.',
    reasoning:
      'O estado inicial é decidido nos construtores e nos valores dos campos, não em métodos: um participante ainda não pagou e um orador ainda não tem taxa definida. O `toString` é polimórfico, pelo que cada subclasse formata a sua própria mensagem.',
    explanation: link.classes,
  },
  {
    id: 'ldts-quiz-2020-q1',
    title: 'Sorvete Icecream: bolas e sabores distintos',
    source: 'Quiz Flavor, 2020',
    topic: 'encapsulamento',
    prompt:
      'A classe `Icecream` guarda uma lista de bolas de sabor (`Flavor`). Depois de `addScoop(chocolate)`, `addScoop(vanilla)` e `addScoop(chocolate)`, `getScoopCount()` devolve `3`, `getFlavorCount()` devolve `2`, `contains("chocolate")` e `contains("vanilla")` são `true` e `contains("strawberry")` é `false`. A classe `Flavor` guarda apenas o nome. Nenhum campo pode ser público. Escreva as duas classes.',
    answer: {
      kind: 'self',
      checklist: [
        '`getScoopCount()` conta todas as bolas, incluindo repetidas.',
        '`getFlavorCount()` conta sabores distintos.',
        '`contains(String)` testa o nome do sabor, não a referência.',
        'Os campos de `Icecream` e `Flavor` não são públicos.',
      ],
    },
    solution:
      '`Icecream` com `List<Flavor> scoops` privada; `getFlavorCount()` percorre a lista e conta nomes ainda não vistos; `contains(String)` compara `flavor.getName()` com o texto pedido.',
    reasoning:
      'Há duas agregações diferentes sobre a mesma lista: o número de bolas é o tamanho da lista, mas o número de sabores exige comparar nomes, porque o mesmo sabor pode aparecer em várias bolas.',
    explanation: link.classes,
  },
];

export const quizIgualdade: ExamQuestion[] = [
  {
    id: 'ldts-quiz-2018-q2',
    title: 'Igualdade de Event por título, data e descrição',
    source: 'Quiz Event, 2018',
    topic: 'igualdade',
    prompt:
      'A classe `Event` tem título, data e descrição, e um construtor de cópia `new Event(e)`. Cópias de `new Event("WebSummit", "Next year again", "world-wide tech event")` são `equals` ao original, mas depois de `e1.setTitle("TalkABit")`, `e2.setDate(...)` ou `e3.setDescription(...)` deixam de ser. Implemente `equals` e `hashCode` de `Event`.',
    answer: {
      kind: 'self',
      checklist: [
        '`equals` compara título, data e descrição, e rejeita `null` e outras classes.',
        'O construtor de cópia cria um objeto diferente (`assertNotSame`) mas igual.',
        '`hashCode` usa os mesmos três campos que `equals`.',
      ],
    },
    solution:
      '`equals`: `true` se for o mesmo objeto; `false` se o argumento for `null` ou de outra classe; caso contrário compara `title`, `date` e `description` com `Objects.equals`. `hashCode`: `Objects.hash(title, date, description)`.',
    reasoning:
      'Dois eventos são o mesmo evento quando os três atributos coincidem. O construtor de cópia copia os valores, não a referência, pelo que os objetos são distintos mas iguais. Para `HashSet` funcionar, `hashCode` tem de depender exatamente dos mesmos campos usados em `equals`.',
    explanation: link.assinaturaEquals,
  },
  {
    id: 'ldts-quiz-2019-q1',
    title: 'Conjunto de Concert com hashCode consistente',
    source: 'Quiz Act, 2019',
    topic: 'igualdade',
    prompt:
      'Um `Concert` fica definido por cidade, país e data. Num `HashSet<Concert>` colocam-se cinco concertos: Paris/France/2019-10-10, Paris/USA/2019-10-10, New York/USA/2019-10-10, New York/USA/2019-05-20 e outra vez New York/USA/2019-05-20. O conjunto fica com 4 elementos. Justifique por que é 4 e não 5, escrevendo `equals` e `hashCode`.',
    answer: {
      kind: 'self',
      checklist: [
        '`equals` compara cidade, país e data; concertos com país ou data diferentes não são iguais.',
        'Os dois concertos de New York/USA/2019-05-20 são iguais.',
        '`hashCode` usa os mesmos três campos, pelo que o `HashSet` deteta a duplicação.',
        'A resposta indica que o conjunto final tem 4 elementos.',
      ],
    },
    solution:
      'O conjunto fica com 4 elementos: só os dois últimos concertos coincidem em todos os campos. `equals` e `hashCode` sobre `(city, country, date)` garantem que o `HashSet` guarda um só deles.',
    reasoning:
      'Um `HashSet` só rejeita um elemento se `hashCode` coincidir e `equals` confirmar. Se `hashCode` ignorasse algum campo usado em `equals`, o conjunto podia guardar duplicados; se usasse campos a mais, podia rejeitar elementos iguais.',
    explanation: link.igualdade,
  },
  {
    id: 'ldts-quiz-2018-q3',
    title: 'Audiência de um Event sem nomes repetidos',
    source: 'Quiz Event, 2018',
    topic: 'igualdade',
    prompt:
      '`Event.addPerson(p)` só adiciona a pessoa se ainda não existir alguém com o mesmo nome no evento. Adicionam-se, por esta ordem, `Attendee("John", 21)`, `Attendee("Mary", 31)`, `Speaker("Jane", 51)`, `Attendee("Carl", 41)`, `Attendee("John", 33)`, `Attendee("Mary", 15)`, `Attendee("Bill", 15)` e `Speaker("Bill", 60)`. Indique `getAudienceCount()` depois de cada adição e justifique a regra de comparação usada.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta dá a sequência de contagens 3, 4, 4, 4, 5, 5.',
        'A justificação compara apenas o nome, ignorando idade e tipo.',
        '`Speaker("Bill", 60)` não aumenta a contagem porque já existe um "Bill".',
      ],
    },
    solution:
      'Contagens: 3, 4, 4, 4, 5, 5. A audiencia só cresce quando o nome é novo: "John" e "Mary" repetidos são ignorados, "Bill" entra uma vez, e o orador "Bill" também é ignorado.',
    reasoning:
      'A regra de não duplicação usa o nome como identidade da pessoa, não a referência do objeto nem a idade. Assim, `Attendee("John", 33)` e `Attendee("Mary", 15)` são ignorados porque esses nomes já existem, `Attendee("Bill", 15)` entra porque "Bill" ainda não estava na audiência, e o `Speaker("Bill", 60)` posterior já não conta pelo mesmo motivo.',
    explanation: link.igualdade,
  },
  {
    id: 'ldts-quiz-2018-q4',
    title: 'TreeSet<Person> sem duplicados por nome',
    source: 'Quiz Event, 2018',
    topic: 'igualdade',
    prompt:
      'Num `TreeSet<Person>` adiciona-se primeiro `new Speaker("John")` e depois `new Attendee("John")`. O conjunto fica com 1 elemento. Que contrato de comparação (entre `Comparable` e `equals`) torna isto possível, e por que `TreeSet` não usa `equals`/`hashCode`?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta explica que `Person` implementa `Comparable` com `compareTo` a comparar o nome.',
        'A justificação indica que `TreeSet` usa `compareTo == 0` para detetar duplicados.',
        'A conclusão é que Speaker("John") e Attendee("John") contam como a mesma pessoa.',
      ],
    },
    solution:
      'O conjunto fica com 1 elemento porque `compareTo` compara apenas o nome: `compareTo` devolve 0 para dois nomes iguais, e o `TreeSet` trata `compareTo == 0` como duplicado.',
    reasoning:
      'Um `TreeSet` está ordenado e não usa `hashCode`: a pertinência testa-se por `compareTo`. Assim, duas pessoas de tipos diferentes com o mesmo nome são o mesmo elemento do conjunto.',
    explanation: link.treeset,
  },
  {
    id: 'ldts-quiz-2021-q1',
    title: 'addIngredient rejeita ingredientes repetidos',
    source: 'Quiz Pizza, 2021',
    topic: 'igualdade',
    prompt:
      'Numa `MediumPizza`, `addIngredient` só adiciona o ingrediente se ainda não existir outro com o mesmo nome, e devolve `true` nesse caso e `false` caso contrário. Adicionam-se `Tomato`, `Cheese`, `Cheese` (outro objeto) e novamente `Tomato`: as contagens de ingredientes ficam 1, 2, 2, 2. Explique a comparação usada e por que duas instância distintas de `Ingredient("Cheese")` são o mesmo ingrediente.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica as contagens 1, 2, 2, 2 e os valores de retorno true, true, false, false.',
        'A comparação usa o nome do ingrediente, não a referência do objeto.',
        'A justificação refere que a pertinência se testa antes de adicionar.',
      ],
    },
    solution:
      'Contagens: depois de Tomato fica 1, depois de Cheese fica 2, e as repetições devolvem `false` sem alterar a lista. A comparação é `i.getName().equals(ingredient.getName())`, pelo que dois objetos `Ingredient` com o mesmo nome são equivalentes.',
    reasoning:
      'A lista só cresce quando o nome ainda não existe. Como a identidade de um ingrediente é o seu nome, criar outro objeto com o mesmo nome não conta como ingrediente novo.',
    explanation: link.igualdade,
  },
];

export const quizHeranca: ExamQuestion[] = [
  {
    id: 'ldts-quiz-2018-q5',
    title: 'Party estende Event e agrega audiências',
    source: 'Quiz Event, 2018',
    topic: 'heranca',
    prompt:
      '`Party` é uma subclasse de `Event`. Uma `Party p` começa com `Attendee("John")` e `Artist("Beck")`, dando `getAudienceCount() == 2`. Depois `p.addEvent(e1)` com duas pessoas e `p.addEvent(e2)` com três pessoas fazem a contagem passar para 4 e depois 7. Como deve `addEvent` combinar as audiências, e por que a contagem de `p` e de `(Event) p` coincidem?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta dá as contagens 2, 4 e 7.',
        '`addEvent` copia todas as pessoas do evento para a lista da festa.',
        'A justificação nota que `Party` herda o método, logo as duas referências contam o mesmo estado.',
      ],
    },
    solution:
      'Contagens: 2, 4, 7. `addEvent(e)` executa `people.addAll(e.getPeople())`, juntando a audiência do evento à da festa. Como `p` e `(Event) p` são o mesmo objeto, `getAudienceCount()` devolve o mesmo valor nas duas referências.',
    reasoning:
      'A festa agrega os participantes dos eventos que a compõem. A herança dá a `Party` todo o comportamento de `Event`; o `addEvent` apenas funde as duas listas de pessoas.',
    explanation: link.heranca,
  },
  {
    id: 'ldts-quiz-2019-q2',
    title: 'Act abstrata com Band e Artist',
    source: 'Quiz Act, 2019',
    topic: 'heranca',
    prompt:
      '`Act` é uma classe abstrata com nome e país. `new Band("Radiohead", "UK")` e `new Artist("Bob Dylan", "USA")` devolvem `getName()` e `getCountry()` respetivos. Nenhum campo pode ser público e `Act` tem de ser abstrata. Escreva a hierarquia.',
    answer: {
      kind: 'self',
      checklist: [
        'A classe `Act` é `abstract` e guarda `name` e `country` em campos não públicos.',
        '`Band` e `Artist` são concretos e delegam nos construtores da superclasse.',
        '`getName()` e `getCountry()` devolvem os valores do construtor.',
      ],
    },
    solution:
      '`Act` abstrata com campos privados `name` e `country`, construtor e dois getters; `Band extends Act` e `Artist extends Act` com construtores que chamam `super(name, country)`.',
    reasoning:
      'Nome e país são comuns a todos os artistas de um concerto, pelo que pertencem à superclasse; cada subclasse concreto só fija o tipo. Os campos privados na superclasse impedem acesso direto pelas subclasses e de fora.',
    explanation: link.heranca,
  },
  {
    id: 'ldts-quiz-2019-q3',
    title: 'Concert.participates para artistas e bandas',
    source: 'Quiz Act, 2019',
    topic: 'heranca',
    prompt:
      'Um concerto tem uma lista de `Act`. `participates(artist)` deve devolver `true` para `Artist("Bob Dylan", "USA")` adicionado diretamente e para `Artist("Thom Yorke", "UK")` pertencente a uma `Band` adicionada, e `false` para `Artist("Bob Dylan", "UK")` ou `Artist("Tom Yorke", "UK")`. Que técnica de polimorfismo resolve isto sem testar o tipo concreto de cada `Act`?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta lista os casos verdadeiros e falsos do enunciado.',
        'A justificação usa `instanceof Band` mais `equals` do artista, ou um método polimórfico equivalente.',
        'A comparação do artista exige nome e país coincidentes.',
      ],
    },
    solution:
      'Percorre-se a lista de `Act`: se o elemento for uma `Band` e `band.getArtists().contains(artist)` for `true`, ou se `act.equals(artist)`, então `participates` devolve `true`. `Artist("Bob Dylan", "UK")` falha porque o país não coincide.',
    reasoning:
      'Um artista participa num concerto se está na lista diretamente ou nos artistas de uma banda da lista. A pertinência à banda usa o `equals` do artista, que compara nome e país, pelo que mudar só o país não engana o método.',
    explanation: link.heranca,
  },
  {
    id: 'ldts-quiz-2018-q6',
    title: 'Username como nome concatenado com a idade',
    source: 'Quiz Event, 2018',
    topic: 'heranca',
    prompt:
      'Todo `User` tem `getUsername()` igual ao nome seguido da idade, sem separador: `new Attendee("John", 43)` produz `"John43"`, `new Speaker("Bill Gates", 12)` produz `"Bill Gates12"` e `new Artist("Beck", 20)` produz `"Beck20"`. Percorrendo uma `ArrayList<User>` com essas três pessoas, a concatenação dos usernames com vírgula inicial dá `",John43,Bill Gates12,Beck20"`. Onde deve viver o `getUsername()` para todas as subclasses o herdarem corretamente?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta coloca `getUsername()` na superclasse, como `name + age`.',
        'A resposta indica a cadeia final `",John43,Bill Gates12,Beck20"`.',
        'A justificação nota que cada subclasse usa os seus próprios nome e idade.',
      ],
    },
    solution:
      '`getUsername()` fica em `Person` (a superclasse comum) e devolve `getName() + getAge()`. Assim `Attendee`, `Speaker` e `Artist` herdam o mesmo método, cada um com os seus dados.',
    reasoning:
      'O username depende só de nome e idade, que são comuns a todas as pessoas. Definir o método uma vez na superclasse evita repetir código em cada subclasse e garante o mesmo formato para todos.',
    explanation: link.heranca,
  },
];

export const quizExcecoes: ExamQuestion[] = [
  {
    id: 'ldts-quiz-2019-q4',
    title: 'Ticket inválido e validação pelo concerto',
    source: 'Quiz Act, 2019',
    topic: 'excecoes',
    prompt:
      'Um `Ticket` tem número e concerto. `new Ticket(-1, concert)` deve lançar a exceção `InvalidTicket`. `concert.isValid(ticket)` devolve `true` para o concerto do bilhete e `false` para um concerto na mesma cidade no dia seguinte. Escreva o construtor de `Ticket` com a validação e o método `isValid`.',
    answer: {
      kind: 'self',
      checklist: [
        'O construtor de `Ticket` lança `InvalidTicket` quando o número é negativo.',
        '`isValid` compara o concerto do bilhete com o recetor usando `equals`.',
        'Um bilhete do concerto de 2019-10-11 não é válido no concerto de 2019-10-10.',
      ],
    },
    solution:
      'No construtor: `if (number < 0) throw new InvalidTicket();`. Em `Concert`: `isValid(ticket)` devolve `ticket.getConcert().equals(this)`.',
    reasoning:
      'O número negativo viola o contrato do bilhete, pelo que a exceção é lançada na construção, antes de o objeto existir. A validade testa-se por igualdade de concertos (cidade, país e data), e não por identidade da referência.',
    explanation: link.excecoes,
  },
];

export const quizPadroes: ExamQuestion[] = [
  {
    id: 'ldts-quiz-2020-q2',
    title: 'Command abstrato e AddScoopCommand',
    source: 'Quiz Flavor, 2020',
    topic: 'padroes',
    prompt:
      'A classe `Command` é abstrata com `execute(Icecream)` e `undo(Icecream)`. `AddScoopCommand` guarda um `Flavor` e, ao executar, adiciona uma bola desse sabor ao sorvete; ao desfazer, remove a última bola. `new AddScoopCommand(chocolate).execute(icecream)` faz `icecream.contains("chocolate")` devolver `true`. Descreva a estrutura das duas classes.',
    answer: {
      kind: 'self',
      checklist: [
        '`Command` é declarada `abstract` com os dois métodos abstratos.',
        '`AddScoopCommand` guarda o sabor num campo não público.',
        '`execute` adiciona o sabor e `undo` remove a última bola.',
      ],
    },
    solution:
      '`Command` abstrata com `execute(Icecream)` e `undo(Icecream)`; `AddScoopCommand extends Command` guarda `flavor` e implementa `execute` como `icecream.addScoop(flavor)` e `undo` como remover a última bola.',
    reasoning:
      'Encapsular o pedido num objeto permite guardá-lo, executá-lo e desfazê-lo mais tarde, sem que quem chama conheça os detalhes. É a base do padrão Command.',
    explanation: link.command,
  },
  {
    id: 'ldts-quiz-2020-q3',
    title: 'IcecreamMachine com anulação do último comando',
    source: 'Quiz Flavor, 2020',
    topic: 'padroes',
    prompt:
      'A `IcecreamMachine` guarda o sorvete e uma pilha de comandos. `executeCommand` executa e empilha; `undoLastCommand` desfaz o comando do topo e tira-o da pilha; os métodos devolvem a própria máquina para encadear chamadas. Executam-se chocolate, strawberry e chocolate (3 bolas, 2 sabores); `undoLastCommand()` seguido de vanilla deixa 3 bolas e 3 sabores; depois dois `undoLastCommand()` e um novo chocolate deixam 2 bolas e 1 sabor. Confirme estes valores e explique o papel da pilha.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta confirma 3 bolas e 2 sabores após os três comandos.',
        'A resposta confirma 3 bolas e 3 sabores após a anulação e o vanilla.',
        'A resposta confirma 2 bolas e 1 sabor no final.',
        'A justificação associa a pilha à ordem inversa das anulações.',
      ],
    },
    solution:
      'Valores confirmados: (3 bolas, 2 sabores), depois (3 bolas, 3 sabores), no final (2 bolas, 1 sabor, só chocolate). A pilha guarda os comandos por ordem de execução e `undoLastCommand` desfaz o mais recente primeiro (LIFO).',
    reasoning:
      'A pilha desfaz os comandos por ordem inversa: o primeiro `undoLastCommand` retira o terceiro comando (chocolate repetido), quedando 2 bolas e 2 sabores; o vanilla leva a 3 bolas e 3 sabores. As duas anulações seguintes retiram o vanilla e o strawberry, e o novo chocolate deixa 2 bolas e apenas o sabor chocolate.',
    explanation: link.command,
  },
  {
    id: 'ldts-quiz-2021-q2',
    title: 'MargueritaCertifier: estratégia de certificação',
    source: 'Quiz Pizza, 2021',
    topic: 'padroes',
    prompt:
      '`PizzaCertifier` é abstrata com `isCertified(Pizza)`. Uma pizza marguerita leva exatamente `Tomato`, `Mozzarella` e `Basil`, por qualquer ordem, e mais nenhum ingrediente. `MargueritaCertifier.isCertified` devolve `true` para as duas pizzas com esses três ingredientes, `false` se falta o Basil, e deixa de ser `true` depois de adicionar `Ham`. Implemente a verificação.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta lista os casos do enunciado com os respetivos valores de `isCertified`.',
        'A verificação exige exatamente três ingredientes: Tomato, Mozzarella e Basil.',
        'A ordem dos ingredientes não altera o resultado.',
        'Qualquer ingrediente extra faz a certificação falhar.',
      ],
    },
    solution:
      '`isCertified` devolve `true` quando a pizza tem 3 ingredientes e contém Tomato, Mozzarella e Basil; `false` caso contrário (falta algum ou sobra algum, como o Ham).',
    reasoning:
      'O certificar é uma estratégia trocável: a mesma interface `PizzaCertifier` pode ter outras implementações para outros tipos de pizza. A regra da marguerita é de quantidade e de conteúdo, não de ordem.',
    explanation: link.strategy,
  },
  {
    id: 'ldts-quiz-2021-q3',
    title: 'GenericRecipe copia a lista de ingredientes',
    source: 'Quiz Pizza, 2021',
    topic: 'padroes',
    prompt:
      '`Recipe` é abstrata com `makeMediumPizza()`. `new GenericRecipe(ingredients)` recebe uma lista com Mozzarella, Ham e Pineapple. A primeira pizza não é certificada como marguerita. Depois alteram-se a lista original (removem-se Ham e Pineapple, adicionam-se Tomato e Basil) e a segunda pizza passa a ser certificada. Explique que contrato isto revela sobre a forma como a receita guarda a lista.',
    answer: {
      kind: 'self',
      checklist: [
        'A primeira pizza tem Mozzarella, Ham e Pineapple e não é marguerita.',
        'A segunda pizza tem Mozzarella, Tomato e Basil e é certificada.',
        'A justificação é que a receita guarda a referência da lista original, não uma cópia.',
      ],
    },
    solution:
      'A primeira `makeMediumPizza()` produz pizza com Mozzarella, Ham e Pineapple (`isCertified` falso); a segunda, depois das alterações na lista original, produz Mozzarella, Tomato e Basil (`isCertified` verdadeiro).',
    reasoning:
      'Como a segunda pizza já reflete as alterações feitas depois da construção, a receita não copiou a lista: guardou a referência original. Quem altera a lista depois de criar a receita altera o resultado das pizzas seguintes, sem aviso. Uma cópia defensiva no construtor impediria esse efeito.',
    explanation: link.classes,
  },
  {
    id: 'ldts-quiz-2021-q4',
    title: 'SlicedPizza: decorador que soma 2 ao preço',
    source: 'Quiz Pizza, 2021',
    topic: 'padroes',
    prompt:
      '`SlicedPizza` implementa a mesma interface `Pizza` que a pizza embrulhada e guarda `slices`. Uma `new SlicedPizza(pizza, 8)` tem `getSlices() == 8`, é `instanceof Pizza`, e `getPrice()` devolve o preço da pizza mais 2: com preço 8.0 devolve 10.0, e depois de `pizza.setPrice(6.0)` devolve 8.0. `setPrice` e `addIngredient` delegam na pizza embrulhada. Descreva a estrutura do decorador.',
    answer: {
      kind: 'self',
      checklist: [
        '`SlicedPizza implements Pizza` e guarda a pizza embrulhada e o número de fatias.',
        '`getPrice()` devolve `pizza.getPrice() + 2.0` (10.0 e depois 8.0).',
        '`getSlices()` devolve 8 e os restantes métodos delegam na pizza embrulhada.',
        'A justificação refere que o acréscimo de 2 ao preço é fixo, qualquer que seja o preço da pizza base.',
      ],
    },
    solution:
      'Decorador: `getPrice() = pizza.getPrice() + 2.0`, pelo que 8.0 dá 10.0 e, depois de `setPrice(6.0)` na base, 6.0 + 2.0 = 8.0. `setPrice`, `addIngredient`, `contains` e `getIngredientCount` delegam na pizza guardada; `getSlices()` devolve 8.',
    reasoning:
      'O decorador envolve outro objeto da mesma interface e acrescenta comportamento (o custo extra de 2 e o número de fatias) sem mudar a interface. Como o preço é calculado a partir da pizza embrulhada, mudar o preço da base reflete-se no preço final.',
    explanation: link.decorator,
  },
];
