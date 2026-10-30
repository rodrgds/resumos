import type { ExamQuestion } from '../../lib/exam-question';

export const condicoesCiclos: ExamQuestion[] = [
  {
    id: 'fp-exame-2020-q1',
    title: 'Par ou ímpar decide a operação',
    source: 'PE1, 2020/21',
    topic: 'condicoes-ciclos',
    prompt:
      'Escreve um programa em Python que lê três inteiros `n1`, `n2` e `n3` dados pelo utilizador. Se `n1` for ímpar, o programa escreve o produto de `n2` e `n3`. Se `n1` for par, escreve a subtração entre `n2` e `n3`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter:
        'n1 = int(input("n1? "))\nn2 = int(input("n2? "))\nn3 = int(input("n3? "))\n',
      tests: [
        { name: 'Ímpar dá produto', code: '', input: '3\n4\n5', output: '20' },
        { name: 'Par dá subtração', code: '', input: '2\n4\n5', output: '-1' },
      ],
    },
    solution:
      'n1 = int(input("n1? "))\nn2 = int(input("n2? "))\nn3 = int(input("n3? "))\n\nif n1 % 2 != 0:\n    print(n2 * n3)\nelse:\n    print(n2 - n3)',
    reasoning:
      'O resto da divisão por 2 distingue par de ímpar: `n1 % 2 != 0` é verdadeiro só quando `n1` é ímpar. Cada ramo escreve a expressão pedida.',
    explanation: '/cadeiras/fp/condicoes-ciclos/#escolher-um-ramo',
  },
  {
    id: 'fp-exame-2020-q2',
    title: 'Persistência multiplicativa',
    source: 'PE1, 2020/21',
    topic: 'condicoes-ciclos',
    prompt:
      'A persistência multiplicativa de um inteiro positivo é o número de vezes que os seus dígitos podem ser multiplicados até o número ficar com um só dígito. Por exemplo, a persistência de 39 é 3, porque 39 → 3·9 = 27 → 2·7 = 14 → 1·4 = 4. Escreve um programa em Python que, dado um número `num` lido do utilizador, escreve a sua persistência multiplicativa.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'num = int(input("num? "))\ncount = 0\nprint(count)',
      tests: [
        { name: 'Exemplo do enunciado', code: '', input: '39', output: '3' },
        { name: 'Um dígito', code: '', input: '4', output: '0' },
        { name: 'Quatro passos', code: '', input: '77', output: '4' },
      ],
    },
    solution:
      'num = int(input("num? "))\n\ncount = 0\nwhile num > 9:\n    aux = 1\n    while num != 0:\n        aux = (num % 10) * aux\n        num = num // 10\n    num = aux\n    count += 1\n\nprint(count)',
    reasoning:
      'O ciclo exterior conta um passo por multiplicação. O ciclo interior calcula o produto dos dígitos: `num % 10` dá o último dígito e `num // 10` o remove. O ciclo termina quando resta um só dígito (`num <= 9`).',
    explanation: '/cadeiras/fp/condicoes-ciclos/#ciclos-while-e-terminação',
  },
  {
    id: 'fp-exame-2019-q1',
    title: 'Inverter um inteiro sem usar strings',
    source: 'PE1, 2019/20',
    topic: 'condicoes-ciclos',
    prompt:
      'Escreve um programa em Python que, dado um inteiro `num` lido do utilizador, calcula o seu reverse (o número com os dígitos por ordem inversa) e o escreve. Não podes converter o número numa string nem manipular strings. Por exemplo, para `num = 766` a saída é `667` e para `num = 45654` a saída é `45654`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'num = int(input("num? "))\nrev = 0\nprint(rev)',
      tests: [
        { name: 'Três dígitos', code: '', input: '766', output: '667' },
        { name: 'Palíndromo', code: '', input: '45654', output: '45654' },
        { name: 'Zero', code: '', input: '0', output: '0' },
      ],
    },
    solution:
      'num = int(input("num? "))\n\ntmp = num\nrev = 0\nwhile tmp > 0:\n    d = tmp % 10\n    rev = rev * 10 + d\n    tmp = tmp // 10\n\nprint(rev)',
    reasoning:
      'A cada passo, `tmp % 10` extrai o último dígito e `rev = rev * 10 + d` acrescenta esse dígito à direita do número que está a construir. Para `num = 0` o ciclo não corre e a saída é 0.',
    explanation:
      '/cadeiras/fp/condicoes-ciclos/#construir-um-número-a-partir-dos-dígitos',
  },
  {
    id: 'fp-exame-2019-q2',
    title: 'Converter quaternário para decimal',
    source: 'PE1, 2019/20',
    topic: 'condicoes-ciclos',
    prompt:
      'Um número quaternário (base 4) usa apenas os dígitos 0, 1, 2 e 3. Escreve um programa em Python que converte um número quaternário `quat` (base 4), lido do utilizador, no número decimal (base 10) correspondente. Por exemplo, para `quat = 123` a saída é `27` e para `quat = 112233` a saída é `1455`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'quat = int(input("Quaternary number = "))\ndec = 0\nprint(dec)',
      tests: [
        { name: 'Exemplo 123', code: '', input: '123', output: '27' },
        { name: 'Exemplo 11', code: '', input: '11', output: '5' },
        { name: 'Seis dígitos', code: '', input: '112233', output: '1455' },
      ],
    },
    solution:
      'quat = int(input("Quaternary number = "))\n\ndec = 0\npower = 0\n\nwhile quat:\n    last = quat % 10\n    dec += last * 4 ** power\n    quat //= 10\n    power += 1\n\nprint(dec)',
    reasoning:
      'Cada dígito `last` vale `last * 4^power`, com a posição `power` a começar em 0. `quat % 10` dá o dígito menos significativo e `quat //= 10` avança para o seguinte.',
    explanation:
      '/cadeiras/fp/condicoes-ciclos/#construir-um-número-a-partir-dos-dígitos',
  },
];

export const funcoes: ExamQuestion[] = [
  {
    id: 'fp-exame-2020-q3',
    title: 'Verificar número de Armstrong',
    source: 'PE2, 2020/21',
    topic: 'funcoes',
    prompt:
      'Escreve uma função em Python `is_armstrong(n)` que verifica se um número `n` de três dígitos é um número de Armstrong. Num número de Armstrong de três dígitos, a soma dos cubos de cada dígito é igual ao próprio número. A função devolve `True` ou `False`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def is_armstrong(n):\n    return False',
      tests: [
        {
          name: '153 é Armstrong',
          code: 'print(is_armstrong(153))',
          output: 'True',
        },
        {
          name: '370 é Armstrong',
          code: 'print(is_armstrong(370))',
          output: 'True',
        },
        {
          name: '123 não é Armstrong',
          code: 'print(is_armstrong(123))',
          output: 'False',
        },
      ],
    },
    solution:
      'def is_armstrong(n):\n    soma = 0\n    aux = n\n    while aux > 0:\n        digit = aux % 10\n        soma += digit ** 3\n        aux //= 10\n    return soma == n',
    reasoning:
      'Percorrem-se os dígitos de `n` com `aux % 10` e `aux //= 10`, acumulando o cubo de cada um em `soma`. No fim, compara-se a soma com o número original. Para 153: 1 + 125 + 27 = 153.',
    explanation: '/cadeiras/fp/funcoes/#contrato-e-decomposição',
  },
  {
    id: 'fp-exame-2020-q4',
    title: 'Média móvel com vizinhança ímpar',
    source: 'PE2, 2020/21',
    topic: 'funcoes',
    prompt:
      'Escreve uma função em Python `moving_average(alist, n)` que, dada uma lista `alist` de inteiros e um inteiro ímpar `n` (a amplitude da vizinhança), devolve uma lista com as médias da vizinhança de cada número, arredondadas a duas casas decimais. Cada vizinhança tem exatamente `n` elementos. Se `alist` tiver comprimento menor que 3 ou se `n < 3`, o resultado é a lista vazia. Por exemplo, `moving_average([1, 2, 3, 4, 5], 3)` devolve `[2.0, 3.0, 4.0]`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def moving_average(alist, n):\n    return []',
      tests: [
        {
          name: 'Exemplo do enunciado',
          code: 'print(moving_average([1, 2, 3, 4, 5], 3))',
          output: '[2.0, 3.0, 4.0]',
        },
        {
          name: 'Lista demasiado curta',
          code: 'print(moving_average([1, 2], 3))',
          output: '[]',
        },
        {
          name: 'Vizinhança total',
          code: 'print(moving_average([1, 2, 3, 4, 5], 5))',
          output: '[3.0]',
        },
      ],
    },
    solution:
      'def moving_average(alist, n):\n    if len(alist) < 3 or n < 3:\n        return []\n    avgs = []\n    for i in range(n // 2, len(alist) - n // 2):\n        left = alist[i - n // 2:i]\n        right = alist[i + 1:i + n // 2 + 1]\n        neighbors = left + right\n        avgs.append(round(sum(neighbors) / len(neighbors), 2))\n    return avgs',
    reasoning:
      'Só os índices com `n // 2` elementos de cada lado têm uma vizinhança completa, por isso o ciclo começa em `n // 2` e termina antes de `len(alist) - n // 2`. A média usa os `n - 1` vizinhos (o elemento central não entra), como no exemplo: (1+3)/2 = 2.0.',
    explanation: '/cadeiras/fp/funcoes/#listas-o-mínimo-necessário',
  },
  {
    id: 'fp-exame-2019-q3',
    title: 'Dígitos por ordem decrescente',
    source: 'PE2, 2019/20',
    topic: 'funcoes',
    prompt:
      'Escreve uma função em Python `order_digits(n)` que, dado um inteiro `n` maior ou igual a zero, devolve um tuplo com os dígitos do número por ordem decrescente. Por exemplo, se `n = 9013322` o resultado é o tuplo `(9, 3, 3, 2, 2, 1, 0)`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def order_digits(n):\n    return ()',
      tests: [
        {
          name: 'Exemplo do enunciado',
          code: 'print(order_digits(9013322))',
          output: '(9, 3, 3, 2, 2, 1, 0)',
        },
        {
          name: 'Zero',
          code: 'print(order_digits(0))',
          output: '(0,)',
        },
        {
          name: 'Dígito repetido',
          code: 'print(order_digits(500))',
          output: '(5, 0, 0)',
        },
      ],
    },
    solution:
      'def order_digits(n):\n    if n == 0:\n        return (0,)\n    result = ()\n    for i in range(9, -1, -1):\n        aux = n\n        while aux > 0:\n            if aux % 10 == i:\n                result += (i,)\n            aux //= 10\n    return result',
    reasoning:
      'Para cada dígito possível de 9 até 0, percorre-se o número e acrescenta-se esse dígito ao tuplo uma vez por cada ocorrência. O caso `n == 0` é tratado à parte porque o ciclo while nunca correria.',
    explanation: '/cadeiras/fp/funcoes/#listas-o-mínimo-necessário',
  },
];

export const strings: ExamQuestion[] = [
  {
    id: 'fp-exame-2020-q5',
    title: 'Trocar maiúsculas e minúsculas',
    source: 'PE3, 2020/21',
    topic: 'strings',
    prompt:
      'Escreve uma função em Python `swap_case(astr)` que, dada uma string `astr`, devolve outra string com todas as letras minúsculas convertidas em maiúsculas e vice-versa. Por exemplo, `swap_case("aBcD")` devolve `"AbCd"`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def swap_case(astr):\n    return astr',
      tests: [
        {
          name: 'Exemplo do enunciado',
          code: "print(swap_case('aBcD'))",
          output: 'AbCd',
        },
        {
          name: 'Símbolos não mudam',
          code: "print(swap_case('Hello!'))",
          output: 'hELLO!',
        },
      ],
    },
    solution:
      'def swap_case(astr):\n    result = ""\n    for letter in astr:\n        if letter.isupper():\n            result += letter.lower()\n        else:\n            result += letter.upper()\n    return result',
    reasoning:
      'Percorre-se a string letra a letra e constrói-se o resultado por concatenação, trocando a capitalização de cada letra. Caracteres que não são letras (como `!`) não são maiúscula nem minúscula e passam para o outro ramo, que os mantém inalterados.',
    explanation: '/cadeiras/fp/strings/#texto-é-imutável',
  },
  {
    id: 'fp-exame-2019-q4',
    title: 'Contar padrões de subcadeias',
    source: 'PE2, 2019/20',
    topic: 'strings',
    prompt:
      'Escreve uma função em Python `subpatterns(astring)` que recebe uma string `astring` e calcula quantas das suas subcadeias seguem um certo padrão. Uma subcadeia é um padrão quando o número de vezes que cresce é igual ao número de vezes que encolhe: num passo, a subcadeia cresce se o caráter for maior que o anterior e encolhe se for menor. Por exemplo, `subpatterns("aghljcb")` devolve a string `"The string \'aghljcb\' contains 3 substring patterns."`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def subpatterns(astring):\n    return ""',
      tests: [
        {
          name: 'Exemplo do enunciado',
          code: 'print(subpatterns("aghljcb"))',
          output: "The string 'aghljcb' contains 3 substring patterns.",
        },
        {
          name: 'Sem padrões',
          code: 'print(subpatterns("ab"))',
          output: "The string 'ab' contains 0 substring patterns.",
        },
      ],
    },
    solution:
      'def is_pattern(astring):\n    net = 0\n    for i in range(len(astring) - 1):\n        if astring[i + 1] > astring[i]:\n            net += 1\n        if astring[i + 1] < astring[i]:\n            net -= 1\n    return net == 0\n\ndef subpatterns(astring):\n    counter = 0\n    for step in range(2, len(astring) + 1):\n        for char_index in range(0, len(astring) - step + 1):\n            sub_str = astring[char_index:char_index + step]\n            if is_pattern(sub_str):\n                counter += 1\n    return "The string \'{0}\' contains {1} substring patterns.".format(\n        astring, counter)',
    reasoning:
      'Uma subcadeia é padrão quando o saldo entre crescimentos (+1) e encolhecimentos (-1) é zero. Experimentam-se todas as subcadeias de comprimento pelo menos 2 e conta-se quantas têm saldo zero.',
    explanation: '/cadeiras/fp/strings/#procurar-e-contar',
  },
];

export const dicionariosConjuntos: ExamQuestion[] = [
  {
    id: 'fp-exame-2020-q6',
    title: 'Valores únicos de uma lista de dicionários',
    source: 'PE3, 2020/21',
    topic: 'dicionarios-conjuntos',
    prompt:
      'Escreve uma função em Python `unique_values(alist)` que, dada uma lista de dicionários `alist`, devolve um conjunto com os valores de todos os dicionários. Por exemplo, `unique_values([{"a": 1, "b": 2}, {"b": 2, "c": 3}])` devolve `{1, 2, 3}`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def unique_values(alist):\n    return set()',
      tests: [
        {
          name: 'Exemplo do enunciado',
          code: "print(unique_values([{'a': 1, 'b': 2}, {'b': 2, 'c': 3}]))",
          output: '{1, 2, 3}',
        },
        {
          name: 'Lista vazia',
          code: 'print(unique_values([]))',
          output: 'set()',
        },
      ],
    },
    solution:
      'def unique_values(alist):\n    uniqs = set()\n    for d in alist:\n        for v in d.values():\n            uniqs.add(v)\n    return uniqs',
    reasoning:
      'Percorrem-se os valores de cada dicionário com `d.values()` e juntam-se todos a um conjunto, que elimina duplicados automaticamente.',
    explanation: '/cadeiras/fp/dicionarios-conjuntos/#conjuntos-e-pertença',
  },
  {
    id: 'fp-exame-2020-q7',
    title: 'Somar dicionários',
    source: 'PE4, 2020/21',
    topic: 'dicionarios-conjuntos',
    prompt:
      'Escreve uma função em Python `sum_dicts(lst)` que recebe uma lista `lst` de dicionários, cada um com um conjunto de chaves e valores inteiros, e devolve um único dicionário com todas as chaves presentes. Os valores associados à mesma chave são somados. Por exemplo, `sum_dicts([{"a": 5, "b": 3}, {"a": 1, "c": 0}])` devolve `{"a": 6, "b": 3, "c": 0}`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def sum_dicts(lst):\n    return {}',
      tests: [
        {
          name: 'Exemplo do enunciado',
          code: "print(sum_dicts([{'a': 5, 'b': 3}, {'a': 1, 'c': 0}]))",
          output: "{'a': 6, 'b': 3, 'c': 0}",
        },
        {
          name: 'Chave só num dicionário',
          code: "print(sum_dicts([{'x': 2}, {'y': 4}]))",
          output: "{'x': 2, 'y': 4}",
        },
      ],
    },
    solution:
      'def sum_dicts(lst):\n    result = {}\n    for d in lst:\n        for k, v in d.items():\n            result[k] = result.get(k, 0) + v\n    return result',
    reasoning:
      'Para cada par chave-valor, `result.get(k, 0)` devolve o valor acumulado ou 0 se a chave ainda não existe, e o valor novo é somado. Assim todas as chaves ficam no dicionário final.',
    explanation:
      '/cadeiras/fp/dicionarios-conjuntos/#dicionários-chaves-e-valores',
  },
  {
    id: 'fp-exame-2019-q5',
    title: 'Processar comandos sobre conjuntos',
    source: 'PE3, 2019/20',
    topic: 'dicionarios-conjuntos',
    prompt:
      'Escreve uma função em Python `process(commands)` que recebe uma lista `commands` a processar sobre conjuntos, pela ordem dada. Por exemplo, `[{1, 3, 4}, "|", {2, 5}]` deve ser convertido em `{1, 2, 3, 4, 5}`. As operações binárias disponíveis são `"|"` (união), `"&"` (interseção), `"-"` (diferença) e `"x"` (produto cartesiano, que devolve pares).',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def process(commands):\n    return commands[0]',
      tests: [
        {
          name: 'União',
          code: "print(process([{1, 3, 4}, '|', {2, 5}]))",
          output: '{1, 2, 3, 4, 5}',
        },
        {
          name: 'Diferença',
          code: "print(process([{1, 3, 4}, '-', {3}]))",
          output: '{1, 4}',
        },
        {
          name: 'Interseção',
          code: "print(process([{1, 2}, '&', {2, 3}]))",
          output: '{2}',
        },
      ],
    },
    solution:
      "def process(commands):\n    s = commands[0]\n    for op, t in zip(commands[1::2], commands[2::2]):\n        if op == '|':\n            s = s | t\n        if op == '&':\n            s = s & t\n        if op == '-':\n            s = s - t\n        if op == 'x':\n            r = set()\n            for i in s:\n                for j in t:\n                    r.add((i, j))\n            s = r\n    return s",
    reasoning:
      'A lista alterna conjunto, operador, conjunto. `commands[1::2]` são os operadores e `commands[2::2]` os operandos seguintes; o `zip` emparelha-os e cada operador é aplicado ao acumulador `s`. O produto cartesiano constrói explicitamente o conjunto de pares.',
    explanation: '/cadeiras/fp/dicionarios-conjuntos/#conjuntos-e-pertença',
  },
];

export const recursao: ExamQuestion[] = [
  {
    id: 'fp-exame-2020-q8',
    title: 'Contar elementos numa lista aninhada',
    source: 'PE3, 2020/21',
    topic: 'recursao',
    prompt:
      'Escreve uma função em Python `rec_count(alist)` que calcula a frequência de cada elemento da lista aninhada `alist` (uma lista que pode conter listas, que por sua vez podem conter outras listas, e assim sucessivamente) e a devolve na forma de um dicionário. Por exemplo, `rec_count([1, [2, [1, 2]], 3])` devolve `{1: 2, 2: 2, 3: 1}`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def rec_count(alist):\n    return {}',
      tests: [
        {
          name: 'Exemplo do enunciado',
          code: 'print(rec_count([1, [2, [1, 2]], 3]))',
          output: '{1: 2, 2: 2, 3: 1}',
        },
        {
          name: 'Lista vazia',
          code: 'print(rec_count([]))',
          output: '{}',
        },
        {
          name: 'Repetidos em níveis diferentes',
          code: 'print(rec_count([5, [5]]))',
          output: '{5: 2}',
        },
      ],
    },
    solution:
      'def rec_count(alist):\n    result = {}\n    for el in alist:\n        if type(el) != list:\n            d = {el: 1}\n        else:\n            d = rec_count(el)\n        for k, v in d.items():\n            result[k] = result.get(k, 0) + v\n    return result',
    reasoning:
      'Se o elemento não é uma lista, conta-se como uma ocorrência (`{el: 1}`); se for, conta-se recursivamente a sublista. Depois de cada chamada recursiva, os pares do dicionário devolvido são somados ao acumulador `result`.',
    explanation: '/cadeiras/fp/recursao/#estruturas-aninhadas',
  },
  {
    id: 'fp-exame-2019-q6',
    title: 'Contar dígitos recursivamente',
    source: 'PE3, 2019/20',
    topic: 'recursao',
    prompt:
      'Escreve uma função em Python `count_digits(n)` que calcula a frequência de cada dígito do número `n`, com `n > 0`, e a devolve na forma de um dicionário. Não podes usar ciclos nem variáveis globais. Por exemplo, `count_digits(12321)` devolve `{1: 2, 2: 2, 3: 1}`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def count_digits(n):\n    return {}',
      tests: [
        {
          name: 'Exemplo do enunciado',
          code: 'print(count_digits(12321))',
          output: '{1: 2, 2: 2, 3: 1}',
        },
        {
          name: 'Um dígito',
          code: 'print(count_digits(5))',
          output: '{5: 1}',
        },
      ],
    },
    solution:
      'def count_digits(n):\n    if n == 0:\n        return {}\n    d = count_digits(n // 10)\n    d[n % 10] = d.get(n % 10, 0) + 1\n    return d',
    reasoning:
      'O caso base é `n == 0`, que devolve o dicionário vazio. A chamada recursiva trata do número sem o último dígito e, no regresso, esse dígito é contado no dicionário devolvido. Assim cada dígito é processado uma vez, sem ciclos.',
    explanation: '/cadeiras/fp/recursao/#recursão-sobre-dígitos',
  },
  {
    id: 'fp-exame-2020-q9',
    title: 'Calculadora de frações',
    source: 'PE3, 2020/21',
    topic: 'recursao',
    prompt:
      'Escreve uma função em Python `calculator(expr)` que calcula o valor de uma expressão `expr`. A expressão pode ser uma fração representada por um tuplo `(numerador, denominador)` ou um tuplo da forma `(expr, operador, expr)`. Os únicos operadores válidos são a multiplicação `"*"` e a divisão `"/"`, e todos os valores são não negativos. Simplifica o resultado à menor fração inteira. Por exemplo, `calculator(((1, 3), "*", (2, 5)))` calcula 1/3 · 2/5 e devolve `(2, 15)`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def calculator(expr):\n    return expr',
      tests: [
        {
          name: 'Multiplicação do enunciado',
          code: "print(calculator(((1, 3), '*', (2, 5))))",
          output: '(2, 15)',
        },
        {
          name: 'Divisão simplificada',
          code: "print(calculator(((1, 2), '/', (1, 4))))",
          output: '(2, 1)',
        },
        {
          name: 'Expressão aninhada',
          code: "print(calculator((((1, 2), '*', (1, 3)), '/', (1, 6))))",
          output: '(1, 1)',
        },
      ],
    },
    solution:
      "def mdc(x, y):\n    while y:\n        x, y = y, x % y\n    return x\n\ndef calculator(expr):\n    if len(expr) == 2:\n        num, den = expr\n    else:\n        e1, op, e2 = expr\n        e1 = calculator(e1)\n        e2 = calculator(e2)\n        if op == '*':\n            num, den = e1[0] * e2[0], e1[1] * e2[1]\n        else:\n            num, den = e1[0] * e2[1], e1[1] * e2[0]\n    d = mdc(num, den)\n    return (num // d, den // d)",
    reasoning:
      'O caso base é um tuplo de dois elementos (a fracción). Num tuplo de três, calculam-se recursivamente as duas subexpressões e aplicam-se as regras: multiplicam-se numeradores com numeradores e denominadores com denominadores; na divisão, cruza-se. No fim, divide-se pelo máximo divisor comum para simplificar.',
    explanation: '/cadeiras/fp/recursao/#expressões-como-árvores',
  },
];

export const geradores: ExamQuestion[] = [
  {
    id: 'fp-exame-2020-q10',
    title: 'Gerador de Fibonacci',
    source: 'PE4, 2020/21',
    topic: 'geradores',
    prompt:
      'Escreve uma função geradora em Python `fib(start, end)` que gera a sequência de Fibonacci de inteiros começando no `start`-ésimo número (`start >= 1`) e acabando no `end`-ésimo número (`end >= start`). Os dois primeiros números da sequência são 1 e cada número consecutivo é a soma dos dois anteriores. Por exemplo, se `start = 1` e `end = 7`, a sequência gerada é `[1, 1, 2, 3, 5, 8, 13]`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def fib(start, end):\n    return',
      tests: [
        {
          name: 'Sequência completa',
          code: 'print(list(fib(1, 7)))',
          output: '[1, 1, 2, 3, 5, 8, 13]',
        },
        {
          name: 'A meio da sequência',
          code: 'print(list(fib(4, 6)))',
          output: '[3, 5, 8]',
        },
      ],
    },
    solution:
      'def fib(start, end):\n    i = 1\n    a, b = 1, 1\n    while i <= end:\n        if i >= start:\n            yield a\n        a, b = b, a + b\n        i += 1',
    reasoning:
      'A sequência tem de ser calculada desde o início, independentemente de `start`, por isso o contador `i` começa em 1. Só se faz `yield` quando `i >= start`, e `a, b = b, a + b` avança dois termos de cada vez.',
    explanation: '/cadeiras/fp/compreensoes-geradores/#geradores-e-yield',
  },
  {
    id: 'fp-exame-2019-q7',
    title: 'Gerador a partir de uma lista de intervalos',
    source: 'PE4, 2019/20',
    topic: 'geradores',
    prompt:
      'Uma lista de intervalos é uma lista de tuplos que representam intervalos. Cada tuplo representa um intervalo da forma `(min, max)`. Os tuplos aparecem por ordem crescente na lista e os intervalos são disjuntos. Por exemplo, a lista `[(1, 1), (3, 5), (10, 15)]` representa a sequência completa 1, 3, 4, 5, 10, 11, 12, 13, 14, 15. Escreve uma função geradora `generator(intlist)` que vai devolvendo com `yield` o termo seguinte da sequência completa representada em `intlist`.',
    answer: {
      kind: 'code',
      language: 'python',
      starter: 'def generator(intlist):\n    return',
      tests: [
        {
          name: 'Dois intervalos',
          code: 'print(list(generator([(1, 1), (3, 5)])))',
          output: '[1, 3, 4, 5]',
        },
        {
          name: 'Intervalo com vários termos',
          code: 'print(list(generator([(10, 12)])))',
          output: '[10, 11, 12]',
        },
      ],
    },
    solution:
      'def generator(intlist):\n    while intlist != []:\n        yield intlist[0][0]\n        if intlist[0][0] == intlist[0][1]:\n            intlist = intlist[1:]\n        else:\n            intlist = [(intlist[0][0] + 1, intlist[0][1])] + intlist[1:]',
    reasoning:
      'Em cada passo, o primeiro valor do primeiro intervalo é devolvido com `yield`. Se `min == max`, o intervalo está esgotado e passa-se ao seguinte; senão, incrementa-se o `min` do primeiro intervalo, avançando para o próximo termo.',
    explanation:
      '/cadeiras/fp/compreensoes-geradores/#gerar-valores-de-vários-intervalos',
  },
];
