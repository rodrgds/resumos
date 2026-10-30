import type { ExamQuestion } from '../../lib/exam-question';

export const exameFundamentos: ExamQuestion[] = [
  {
    id: 'p-exame-2020-q1',
    title: 'Verdadeiro ou falso sobre fundamentos de C++',
    source: 'Exame, 2019/20',
    topic: 'fundamentos',
    prompt:
      'Indique se cada uma das afirmações seguintes sobre C++ é verdadeira (V) ou falsa (F).\n\n1. Num programa em C++ é possível fazer a definição `bool private = true;`.\n2. Para testar se uma variável `x` do tipo `int` está no intervalo [-10..10] pode usar-se a instrução `if (-10 <= x <= 10)`.\n3. O ciclo `for (int i = 0; i < n; i++) std::cout << (char)(\'A\' + i);` escreve no ecrã as primeiras `n` letras do alfabeto.\n4. Para guardar a palavra "Hello" numa string de C é necessário um array de `char` com pelo menos 6 elementos.\n5. Se `name` é uma variável do tipo `std::string`, ao executar `cin >> name;` com o utilizador a escrever "Ana-2003 Porto", o valor atribuído a `name` é "Ana-2003".\n6. A função `void f(const string &s, int &a)` pode ser invocada com `f("PROG", 210)`.',
    answer: {
      kind: 'self',
      checklist: [
        'A 1 é classificada como falsa: `private` é uma palavra reservada.',
        'A 2 é classificada como falsa: a condição não testa o intervalo.',
        'A 3 é classificada como verdadeira.',
        'A 4 é classificada como verdadeira: são 5 carateres mais o terminador.',
        'A 5 é classificada como verdadeira: a leitura para no primeiro espaço.',
        'A 6 é classificada como falsa: o segundo argumento não pode ser um literal para um parâmetro por referência não constante.',
      ],
    },
    solution: '1: F, 2: F, 3: V, 4: V, 5: V, 6: F.',
    reasoning:
      '`private` é palavra reservada, pelo que a definição da 1 não compila. Em C++, `-10 <= x <= 10` avalia primeiro `-10 <= x` (verdadeiro ou falso, convertido para 0 ou 1) e compara esse resultado com 10, pelo que a 2 é sempre verdadeira para qualquer `x` — não testa o intervalo. O ciclo da 3 imprime `A`, `B`, ... até à n-ésima letra. Uma string de C termina em `\'\\0\'`, pelo que "Hello" precisa de 6 carateres. O operador `>>` lê apenas até ao primeiro espaço, pelo que a 5 fica com "Ana-2003". Por fim, `int &a` não pode ligar-se à constante 210, pelo que a 6 é falsa.',
  },
  {
    id: 'p-exame-2018-q1',
    title: 'Normalizar uma linha de texto para maiúsculas e espaços',
    source: 'Exame, 2017/18',
    topic: 'fundamentos',
    prompt:
      'Escreva uma função `string transformLine(string s)` que recebe uma string\n\nconstituída por letras, espaços e outros carateres e retorna uma string constituída apenas por letras maiúsculas e espaços, substituindo os carateres que não são letras nem espaços pelo caráter espaço. A string recebida como parâmetro não deve ser modificada. Exemplo: para `"A very, very short sentence!"` a função retorna `"A VERY VERY SHORT SENTENCE"`. Deve usar a função auxiliar `void toUpperStr(string* s)`, que converte para maiúsculas, in loco, todas as letras da string apontada.',
    answer: {
      kind: 'self',
      checklist: [
        'A função percorre todos os carateres da string original sem a modificar.',
        'Os carateres que não são letras nem espaços são substituídos por espaço.',
        'A conversão para maiúsculas é feita com `toUpperStr` sobre a string resultante antes de a retornar.',
      ],
    },
    solution:
      "```cpp\nstring transformLine(string s)\n{\n  string result = \"\";\n  for (size_t i = 0; i < s.length(); i++)\n  {\n    char c = s.at(i);\n    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == ' ')\n      result += c;\n    else\n      result += ' ';\n  }\n  toUpperStr(&result);\n  return result;\n}\n```",
    reasoning:
      'Cada caráter é testado individualmente: letras e espaços copiam-se, todo o resto passa a espaço. Depois invoca-se `toUpperStr` sobre a string acumulada, que converte as minúsculas para maiúsculas in loco, e retorna-se essa string. A string original nunca é alterada porque se constrói uma nova.',
  },
];

export const exameFuncoesArrays: ExamQuestion[] = [
  {
    id: 'p-exame-2018-q3',
    title: 'Média de classificações num array C',
    source: 'Exame, 2017/18',
    topic: 'funcoes-arrays',
    prompt:
      'Escreva o código da função\n\n```cpp\nfloat average(const int grades[], int numStudents);\n```\n\nque calcula e retorna a média das `numStudents` classificações de uma prova, guardadas no array `grades`. Considere que `numStudents` é sempre maior ou igual a 1.',
    answer: {
      kind: 'self',
      checklist: [
        'A função percorre as `numStudents` posições do array acumulando a soma.',
        'A média é devolvida como `float`, dividindo a soma pelo número de estudantes.',
      ],
    },
    solution:
      '```cpp\nfloat average(const int grades[], int numStudents)\n{\n  float sum = 0;\n  for (int i = 0; i < numStudents; i++)\n    sum += grades[i];\n  return sum / numStudents;\n}\n```',
    reasoning:
      'Um array recebido como parâmetro decai para um apontador, pelo que o ciclo percorre as `numStudents` posições acumulando em `sum`. A divisão `sum / numStudents` é feita em vírgula flutuante porque `sum` é `float`, devolvendo a média como `float`.',
  },
  {
    id: 'p-exame-2024-q3',
    title: 'Hora mais cedo e mais tarde num array de structs',
    source: 'Exame de Recurso, 2023/24',
    topic: 'funcoes-arrays',
    prompt:
      'Considere o tipo `time_of_day`, definido num ficheiro de cabeçalho, que representa horas com precisão de minutos:\n\n```cpp\nstruct time_of_day {\n  unsigned char h; // horas [0,23]\n  unsigned char m; // minutos [0,59]\n};\n```\n\nEscreva uma função\n\n```cpp\nvoid minmax(const time_of_day times[], int n, time_of_day& min, time_of_day& max);\n```\n\nque recebe um array `times` com `n > 0` horas válidas e atribui a `min` e `max` a hora mais cedo e a hora mais tarde existentes no array. Não pode usar contentores (vector, list, set, ...) nem funções de biblioteca.',
    answer: {
      kind: 'self',
      checklist: [
        'A função inicializa `min` e `max` com o primeiro elemento e percorre o resto do array.',
        'A comparação entre horas tem em conta horas e minutos (por exemplo, convertendo para minutos desde a meia-noite).',
        'Não usa contentores nem funções de biblioteca.',
      ],
    },
    solution:
      '```cpp\nvoid minmax(const time_of_day times[], int n, time_of_day& min, time_of_day& max)\n{\n  min = max = times[0];\n  for (int i = 1; i < n; i++)\n  {\n    int t = times[i].h * 60 + times[i].m;\n    int tmin = min.h * 60 + min.m;\n    int tmax = max.h * 60 + max.m;\n    if (t < tmin) min = times[i];\n    if (t > tmax) max = times[i];\n  }\n}\n```',
    reasoning:
      'Comparar apenas as horas não chega (por exemplo, 10:50 é maior que 11:05? não, mas 11:05 > 10:50 em horas seria falso se só se olhasse para `h`). Convertendo cada hora para minutos desde a meia-noite, `h * 60 + m`, a comparação fica correta. O primeiro elemento serve de candidato inicial a mínimo e máximo.',
  },
  {
    id: 'p-exame-2024-q4',
    title: 'Heterograma numa string de C',
    source: 'Exame de Recurso, 2023/24',
    topic: 'funcoes-arrays',
    prompt:
      'Uma sequência de carateres é um heterograma se cada letra ocorre no máximo uma vez. Por exemplo, "sun" é um heterograma e "moon" não é (a letra \'o\' ocorre mais do que uma vez).\n\nEscreva uma função\n\n```cpp\nbool heterogram(const char s[], char r[]);\n```\n\ntais que:\n- `s` é uma string de C com letras maiúsculas ou minúsculas e o caráter espaço; os espaços devem ser ignorados e uma letra minúscula deve ser considerada equivalente à maiúscula correspondente;\n- a função retorna `true` se e só se `s` é um heterograma;\n- no retorno, `r` é uma string de C em minúsculas com todas as letras repetidas em `s`, por ordem alfabética (`r` fica vazia se `s` for um heterograma).\n\nSugestão: use um array interno de 26 posições para contar as letras. Não pode usar classes nem funções de biblioteca (vector, string, sort, ...).',
    answer: {
      kind: 'self',
      checklist: [
        'A função usa um array de 26 inteiros para contar as ocorrências de cada letra, ignorando espaços e unificando maiúsculas/minúsculas.',
        'Retorna `false` mal detete a segunda ocorrência de uma letra.',
        "`r` recebe as letras repetidas em minúsculas e por ordem alfabética, terminada em `'\\0'`.",
      ],
    },
    solution:
      "```cpp\nbool heterogram(const char s[], char r[])\n{\n  int count[26] = {0};\n  int nrep = 0;\n  for (int i = 0; s[i] != '\\0'; i++)\n  {\n    char c = s[i];\n    if (c == ' ') continue;\n    if (c >= 'A' && c <= 'Z') c = c - 'A' + 'a';\n    int idx = c - 'a';\n    count[idx]++;\n    if (count[idx] == 2) r[nrep++] = c;\n  }\n  r[nrep] = '\\0';\n  // ordenar r (insertion sort, por ser curta)\n  for (int i = 1; i < nrep; i++)\n  {\n    char x = r[i];\n    int j = i - 1;\n    while (j >= 0 && r[j] > x) { r[j + 1] = r[j]; j--; }\n    r[j + 1] = x;\n  }\n  return nrep == 0;\n}\n```",
    reasoning:
      'Cada letra (depois de passar a minúscula) é mapeada para um índice entre 0 e 25. A segunda vez que uma letra aparece, essa letra é acrescentada a `r`. Como as letras são registadas pela ordem em que aparecem, `r` precisa de ser ordenada no fim; como há no máximo 26 letras, um insertion sort simples chega. O heterograma é detetado quando nenhuma letra se repete.',
  },
];

export const exameFicheiros: ExamQuestion[] = [
  {
    id: 'p-exame-2018-q2',
    title: 'De um ficheiro de texto a uma lista de palavras ordenada',
    source: 'Exame, 2017/18',
    topic: 'ficheiros',
    prompt:
      'Considere já implementada a função `void decomposeLine(string line, vector<string>* words)`, que decompõe uma linha de texto nas suas palavras e as acrescenta ao vetor `words`.\n\nEscreva um programa que lê todas as linhas do ficheiro `text.txt`, gera a lista com todas as palavras nelas existentes e grava essa lista no ficheiro `words.txt`, por ordem alfabética, uma palavra por linha. Considere que ambos os ficheiros abrem sempre com sucesso e que as palavras repetidas devem ser mantidas na lista.',
    answer: {
      kind: 'self',
      checklist: [
        'O programa lê o ficheiro linha a linha com `getline` e decompõe cada linha com `decomposeLine`.',
        'Todas as palavras são acumuladas num único vetor.',
        'O vetor é ordenado com `sort` antes de escrever o ficheiro de saída, uma palavra por linha.',
      ],
    },
    solution:
      '```cpp\nint main()\n{\n  ifstream in("text.txt");\n  ofstream out("words.txt");\n  vector<string> total;\n  string line;\n  while (getline(in, line))\n  {\n    vector<string> words;\n    decomposeLine(line, &words);\n    total.insert(total.end(), words.begin(), words.end());\n  }\n  in.close();\n  sort(total.begin(), total.end());\n  for (const string& w : total)\n    out << w << endl;\n  out.close();\n  return 0;\n}\n```',
    reasoning:
      'Cada linha lida é decomposta em palavras, que se juntam ao vetor acumulador `total` com `insert`. Depois ordena-se o vetor com o algoritmo `sort` da STL e escreve-se cada palavra numa linha do ficheiro de saída. Como não se usa um `set`, as repetidas mantêm-se.',
  },
  {
    id: 'p-exame-2020-q3',
    title: 'Importar um tabuleiro de Campo Minado de um ficheiro',
    source: 'Exame, 2019/20',
    topic: 'ficheiros',
    prompt:
      "No jogo Campo Minado, as minas estão espalhadas por um tabuleiro retangular. O ficheiro do jogo indica, na primeira linha, o tamanho do tabuleiro (linhas x colunas) e, nas linhas seguintes, a posição de cada mina (`linha , coluna`). Exemplo para um tabuleiro 10x10:\n\n```text\n10 x 10\n1 , 0\n1 , 1\n2 , 4\n```\n\nImplemente o construtor da classe:\n\n```cpp\nclass Game {\npublic:\n  Game(const string &filename);\n  // ... outros métodos\nprivate:\n  vector<vector<char>> mines;\n};\n```\n\nO construtor deve importar o conteúdo do ficheiro para o vetor `mines`, com o tamanho indicado no ficheiro, colocando o caráter `'M'` nas células com mina e o caráter espaço nas restantes. Se o ficheiro não existir, o programa deve terminar com código de saída igual a 1. Considere que o ficheiro não contém valores errados.",
    answer: {
      kind: 'self',
      checklist: [
        'O construtor abre o ficheiro e termina com `exit(1)` se a abertura falhar.',
        'Lê as dimensões e redimensiona o vetor bidimensional preenchido com espaços.',
        "Lê cada par `linha , coluna` e coloca `'M'` na célula correspondente.",
      ],
    },
    solution:
      "```cpp\nGame::Game(const string &filename)\n{\n  ifstream f(filename);\n  if (!f.is_open())\n    exit(1);\n  char sep;\n  int numLines, numCols, lin, col;\n  f >> numLines >> sep >> numCols;\n  mines.resize(numLines, vector<char>(numCols, ' '));\n  while (f >> lin >> sep >> col)\n    mines.at(lin).at(col) = 'M';\n}\n```",
    reasoning:
      "A primeira linha tem o formato `10 x 10`, pelo que se lêem dois inteiros separados por um caráter (`sep`). O vetor é redimensionado para as dimensões lidas, todo preenchido com espaços, e cada par seguinte marca uma mina com `'M'`. O ciclo `while` termina naturalmente no fim do ficheiro. Se o ficheiro não abrir, `exit(1)` termina o programa com o código pedido.",
  },
  {
    id: 'p-exame-2024-q2',
    title: 'Organizar notas por cadeira e por nome de estudante',
    source: 'Exame de Recurso, 2023/24',
    topic: 'ficheiros',
    prompt:
      'Escreva uma função\n\n```cpp\nvoid organize_grades(const string& input_fname, const string& output_fname);\n```\n\nque lê as linhas de um ficheiro de entrada, cada uma com um identificador de cadeira, o nome de um estudante e uma nota inteira (por exemplo, `L.EIC009 Maria 19`), e escreve noutro ficheiro uma secção por cadeira: a secção começa pela linha com o identificador da cadeira, seguida de uma linha por estudante dessa cadeira com o nome e a nota. As secções de saída devem estar ordenadas por identificador de cadeira e, dentro de cada secção, os estudantes por ordem alfabética de nome. Exemplo:\n\nEntrada:\n\n```text\nL.EIC009 Maria 19\nL.EIC009 Manuel 10\nL.EIC008 Alberto 10\nL.EIC008 Maria 12\nL.EIC009 Alberto 20\n```\n\nSaída:\n\n```text\nL.EIC008\nAlberto 10\nMaria 12\nL.EIC009\nAlberto 20\nManuel 10\nMaria 19\n```\n\nPode assumir que, em cada cadeira, existe no máximo uma nota por estudante.',
    answer: {
      kind: 'self',
      checklist: [
        'Usa uma estrutura ordenada por chave, como `map<string, map<string, int>>`, que garante cadeiras e nomes ordenados.',
        'Lê o ficheiro de entrada linha a linha, separando cadeira, nome e nota.',
        'Escreve as secções por ordem da chave do map exterior e, dentro de cada uma, por ordem do nome.',
      ],
    },
    solution:
      "```cpp\nvoid organize_grades(const string& input_fname, const string& output_fname)\n{\n  ifstream in(input_fname);\n  ofstream out(output_fname);\n  map<string, map<string, int>> grades;\n  string course, name;\n  int grade;\n  while (in >> course >> name >> grade)\n    grades[course][name] = grade;\n  for (const auto& c : grades)\n  {\n    out << c.first << endl;\n    for (const auto& s : c.second)\n      out << s.first << ' ' << s.second << endl;\n  }\n}\n```",
    reasoning:
      'Um `map<string, map<string, int>>` associa cada cadeira a um map de nome para nota. Como os `map` mantêm as chaves ordenadas, ao percorrer a estrutura externa e a interna na ordem natural escrevem-se as secções por cadeira ordenadas e, dentro de cada uma, os estudantes por nome, sem ser preciso chamar `sort`.',
  },
];

export const exameStl: ExamQuestion[] = [
  {
    id: 'p-exame-2020-q2',
    title: 'Gerar um vetor de números aleatórios',
    source: 'Exame, 2019/20',
    topic: 'stl',
    prompt:
      'Escreva uma função `genRandom` que gera e retorna um `vector<unsigned int>` com `n` números inteiros aleatórios no intervalo [0..m], em que `n` e `m` são parâmetros da função. Defina o tipo de retorno e os parâmetros como achar apropriado.',
    answer: {
      kind: 'self',
      checklist: [
        'A função cria um vetor vazio e acrescenta `n` elementos com `push_back`.',
        'Cada elemento é gerado com `rand() % (m + 1)`, ficando no intervalo [0..m].',
        'O vetor é devolvido por valor.',
      ],
    },
    solution:
      '```cpp\nvector<unsigned int> genRandom(unsigned int n, unsigned int m)\n{\n  vector<unsigned int> v;\n  for (unsigned int i = 0; i < n; i++)\n    v.push_back(rand() % (m + 1));\n  return v;\n}\n```',
    reasoning:
      '`rand() % (m + 1)` produz valores uniformes entre 0 e `m`, inclusive. O ciclo corre `n` vezes, acrescentando cada valor ao vetor, que é devolvido por valor (a STL trata da cópia).',
  },
  {
    id: 'p-exame-2020-q4',
    title: 'Remover de um vetor os elementos comuns a outro',
    source: 'Exame, 2019/20',
    topic: 'stl',
    prompt:
      'Escreva uma função `vectorReduce` que recebe dois vetores, `v1` e `v2`, e modifica `v2`, removendo-lhe todos os elementos que também pertencem a `v1`, e retorna a contagem dos elementos removidos. A função não escreve nada no ecrã. Exemplo: se `v1 = {1, 2, 3}` e `v2 = {2, 4, 2, 5, 3}`, após a invocação `v2 = {4, 5}` e o valor retornado é 3.',
    answer: {
      kind: 'self',
      checklist: [
        'A função percorre os elementos de `v1` e, para cada um, procura-o em `v2`.',
        'Cada elemento encontrado é removido de `v2` com `erase` e contado.',
        'O número de elementos removidos é devolvido.',
      ],
    },
    solution:
      '```cpp\nunsigned int vectorReduce(const vector<unsigned int> &v1, vector<unsigned int> &v2)\n{\n  unsigned int count = 0;\n  for (size_t i = 0; i < v2.size(); )\n  {\n    bool found = false;\n    for (size_t k = 0; k < v1.size(); k++)\n      if (v2[i] == v1[k]) { found = true; break; }\n    if (found)\n    {\n      v2.erase(v2.begin() + i);\n      count++;\n    }\n    else\n      i++;\n  }\n  return count;\n}\n```',
    reasoning:
      'Percorre-se `v2` elemento a elemento e, para cada um, verifica-se se pertence a `v1`. Se pertencer, remove-se com `erase` e incrementa-se o contador; como a remoção desloca os elementos seguintes para a esquerda, o índice só avança quando o elemento atual não é removido. No exemplo, 2, 2 e 3 são removidos, sobrando `{4, 5}` e com 3 remoções registadas. Alternativamente, pode usar-se o idiom erase-remove com `remove_if` e `find`.',
  },
  {
    id: 'p-exame-2018-q4',
    title: 'Procurar um valor num vector<string> com find',
    source: 'Exame, 2017/18',
    topic: 'stl',
    prompt:
      'A STL de C++ disponibiliza a função `find` com o seguinte protótipo:\n\n```cpp\ntemplate <class InputIterator, class T>\nInputIterator find(InputIterator first, InputIterator last, const T& val);\n```\n\nDiga se é possível usar esta função para procurar o valor "31" numa variável `v` do tipo `vector<string>`. Em caso afirmativo, escreva o pedaço de código que procura o valor e escreve uma mensagem a indicar se foi encontrado ou não. Justifique a resposta.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta é afirmativa: `find` funciona com os iteradores `begin()`/`end()` do vetor.',
        'O código compara o iterador retornado com `v.end()` para saber se encontrou.',
        'A justificação refere que `find` retorna um iterador para o elemento ou para o fim do intervalo.',
      ],
    },
    solution:
      '```cpp\nauto it = find(v.begin(), v.end(), "31");\nif (it != v.end())\n  cout << "Element found";\nelse\n  cout << "Element not found";\n```',
    reasoning:
      'Sim, é possível: basta passar `v.begin()` e `v.end()` como iteradores de entrada e "31" como valor a procurar (a comparação usa `operator==` de `string`). A função retorna um iterador para a primeira ocorrência ou para `v.end()` se não existir, pelo que a comparação com `v.end()` decide se o valor foi encontrado.',
  },
  {
    id: 'p-exame-2018-q5',
    title: 'Porque falha a declaração de um set<Position>',
    source: 'Exame, 2017/18',
    topic: 'stl',
    prompt:
      'Um programador queria usar num programa uma estrutura de dados do tipo `set<Position>`, em que `Position` é a struct\n\n```cpp\nstruct Position { int lin, col; };\n```\n\nmas obtuvo um erro de compilação ao declarar variáveis deste tipo. Indique a causa mais provável deste problema e aponte uma solução. Não escreva código.',
    answer: {
      kind: 'self',
      checklist: [
        'A justificação indica que `std::set` precisa de comparar elementos com `operator<` e a struct `Position` não o define.',
        'A solução proposta é sobrecarregar o `operator<` para `Position` ou passar um comparador/comparação ao `set`.',
      ],
    },
    solution:
      'Um `std::set` é um contentor associativo ordenado que, por omissão, usa `std::less<Position>`, o que exige o operador `<` para `Position`. Como a struct não o sobrecarrega, a instanciação do `set` falha na compilação. A solução é definir `bool operator<(const Position&, const Position&)` (por exemplo, comparando primeiro `lin` e depois `col`) ou declarar o set com um tipo comparador próprio, como `set<Position, ComparaPosition>`.',
    reasoning:
      'Os contentores ordenados da STL (set, map, ...) precisam de uma relação de ordem estrita entre os elementos. Sem `operator<` para `Position`, o modelo interno do `set` não compila. Basta acrescentar a sobrecarga do operador ou fornecer um functor comparador como segundo parâmetro do template.',
  },
];

export const exameClasses: ExamQuestion[] = [
  {
    id: 'p-exame-2020-q5',
    title: 'Registar uma nota só se o estudante estiver matriculado',
    source: 'Exame, 2019/20',
    topic: 'classes',
    prompt:
      'Considere a classe parcial `Student`:\n\n```cpp\nclass Student {\npublic:\n  Student(int id = 0, const string &name = "");\n  void enrollCourse(Course *course);\n  bool setGrade(int courseId, int grade);\n  // ... outros métodos\nprivate:\n  int id;\n  string name;\n  vector<Course *> courses;  // UCs em que está matriculado\n  map<int, int> grades;       // notas obtidas (chave = courseId)\n};\n```\n\nEscreva o código do método `setGrade`, que regista a nota `grade` na cadeira `courseId` e retorna `true`, ou retorna `false` se: (1) o estudante não estiver matriculado nessa cadeira (verificando através de `courses`), ou (2) já existir uma entrada em `grades` com a chave `courseId`.',
    answer: {
      kind: 'self',
      checklist: [
        'O método verifica primeiro se existe algum curso em `courses` com o identificador pedido.',
        'Depois verifica se `grades` já contém a chave `courseId` (por exemplo, com `find`).',
        'Só regista a nota e retorna `true` se nenhuma das verificações falhar.',
      ],
    },
    solution:
      '```cpp\nbool Student::setGrade(int courseId, int grade)\n{\n  bool isEnrolled = false;\n  for (auto c : courses)\n    if (c->getId() == courseId)\n    {\n      isEnrolled = true;\n      break;\n    }\n  if (!isEnrolled) return false;\n  if (grades.find(courseId) != grades.end()) return false;\n  grades[courseId] = grade;\n  return true;\n}\n```',
    reasoning:
      'Percorre-se o vetor de apontadores `courses` para confirmar a matrícula; se nenhum curso tiver o `courseId`, retorna-se `false`. Depois, `grades.find(courseId) != grades.end()` deteta uma nota já existente. Só se ambas as verificações passarem se insere a nota no `map` (com `grades[courseId] = grade` ou `insert`) e se retorna `true`.',
  },
  {
    id: 'p-exame-2020-q6',
    title: 'Média arredondada das notas de um estudante',
    source: 'Exame, 2019/20',
    topic: 'classes',
    prompt:
      'Considerando ainda a classe `Student` da pergunta anterior, escreva o código de um método `int getAverageGrade() const` que retorna a classificação média do estudante em todas as cadeiras registadas em `grades`, arredondada para o inteiro mais próximo.',
    answer: {
      kind: 'self',
      checklist: [
        'O método percorre o `map` `grades` acumulando a soma das notas (os valores, `second`).',
        'A média é arredondada para o inteiro mais próximo antes de ser devolvida.',
      ],
    },
    solution:
      '```cpp\nint Student::getAverageGrade() const\n{\n  float sum = 0;\n  for (auto x : grades)\n    sum += x.second;\n  return (int)(sum / grades.size() + 0.5);\n}\n```',
    reasoning:
      'Num `map<int, int>`, cada elemento é um par (chave, valor); a nota é o `second`. Somam-se todos os valores e divide-se pelo número de elementos. Somar 0.5 antes do truncamento para `int` arredonda para o inteiro mais próximo (para valores positivos).',
  },
  {
    id: 'p-exame-2018-q6',
    title: 'Colocar um navio num tabuleiro',
    source: 'Exame, 2017/18',
    topic: 'classes',
    prompt:
      "No jogo da Batalha Naval, um tabuleiro é representado pela classe parcial:\n\n```cpp\nclass Board {\npublic:\n  Board(size_t numLines = 10, size_t numColumns = 10);\n  bool putShip(const Ship &s);\nprivate:\n  bool canPutShip(Position pos, char dir, size_t size);\n  size_t numLines, numColumns;\n  vector<vector<int>> board; // cada elemento = id do navio ou -1 (\"mar\")\n  vector<Ship> ships;\n};\n```\n\nA classe `Ship` tem os métodos `Position pos() const`, `char dir() const` ('H' ou 'V'), `size_t size() const` e `unsigned int id() const`. O método `canPutShip` já está implementado e verifica se o navio cabe no tabuleiro, na posição e direção dadas, sem sair dos limites nem ocupar células ocupadas.\n\nEscreva o código do método `putShip`, que tenta colocar o navio `s` no tabuleiro (modificando `board` e `ships`) e retorna `true` ou `false`, consoante tenha sido possível ou não.",
    answer: {
      kind: 'self',
      checklist: [
        'O método chama `canPutShip` com a posição, direção e tamanho do navio e retorna `false` se não for possível.',
        'Se for possível, preenche as células do navio em `board` com o identificador do navio, na horizontal ou na vertical consoante `dir()`.',
        'O navio é acrescentado a `ships` e o método retorna `true`.',
      ],
    },
    solution:
      "```cpp\nbool Board::putShip(const Ship &s)\n{\n  if (!canPutShip(s.pos(), s.dir(), s.size()))\n    return false;\n  if (s.dir() == 'H')\n    for (size_t i = 0; i < s.size(); i++)\n      board.at(s.pos().lin).at(s.pos().col + i) = s.id();\n  else\n    for (size_t i = 0; i < s.size(); i++)\n      board.at(s.pos().lin + i).at(s.pos().col) = s.id();\n  ships.push_back(s);\n  return true;\n}\n```",
    reasoning:
      'Primeiro delega-se a validação em `canPutShip`. Se passar, preenchem-se as `size` células a partir do canto superior esquerdo (`pos()`), na horizontal (`col + i`) ou na vertical (`lin + i`), com o identificador do navio, e regista-se o navio em `ships`. A devolução é `true` apenas se o navio ficou colocado.',
  },
];

export const exameHeranca: ExamQuestion[] = [
  {
    id: 'p-exame-2018-q7',
    title: 'Saída de um programa com funções virtuais e cópia por valor',
    source: 'Exame, 2017/18',
    topic: 'heranca',
    prompt:
      "Considere as classes e o programa seguintes:\n\n```cpp\nclass Base {\npublic:\n  Base(int a) { _a = a; }\n  virtual void show() const { cout << _a; }\nprotected:\n  int _a;\n};\n\nclass Derived : public Base {\npublic:\n  Derived(int a, int b) : Base(a) { _b = b; }\n  void show() const { cout << _a << ' ' << _b; }\nprivate:\n  int _b;\n};\n\nint main()\n{\n  Derived d(2, 3);\n  d.show();\n  cout << endl;\n  Base b = d;\n  b.show();\n  cout << endl;\n  Base *pb = &d;\n  pb->show();\n  cout << endl;\n}\n```\n\n(a) Qual a saída do programa? (b) Qual seria a saída se o qualificador `virtual` fosse retirado de `show()` na classe `Base`? (c) O que acontece se `protected` em `Base` for substituído por `private`? Justifique.",
    answer: {
      kind: 'self',
      checklist: [
        'A saída com `virtual` é 23, 2, 23 (um valor por linha).',
        'Sem `virtual`, a terceira chamada mostra apenas 2.',
        'Com `private`, o programa não compila, porque `Derived` deixaria de aceder a `_a`.',
      ],
    },
    solution:
      '(a) Com `virtual`: `23`, `2`, `23`. (b) Sem `virtual` na base: `23`, `2`, `2`. (c) Com `private` em vez de `protected`, erro de compilação.',
    reasoning:
      '`d.show()` chama o método de `Derived` (23). A atribuição `Base b = d;` copia apenas a parte base do objeto (slicing), pelo que `b.show()` chama `Base::show` e imprime 2. A chamada `pb->show()` é dinâmica por causa de `virtual`, apesar de o apontador ser de `Base`, e imprime 23. Sem `virtual`, essa chamada resolve estaticamente para `Base::show`, imprimindo 2. Se `_a` fosse `private`, a classe `Derived` não poderia aceder-lhe no seu próprio `show()`, pelo que o código nem compilava.',
  },
  {
    id: 'p-exame-2024-q5',
    title: 'Hierarquia Vehicle, Car e Bike com displayInfo',
    source: 'Exame de Recurso, 2023/24',
    topic: 'heranca',
    prompt:
      'Considere a classe base `Vehicle`, num ficheiro de cabeçalho:\n\n```cpp\nclass Vehicle {\nprotected:\n  std::string make;   // marca\n  std::string model;\n  int year;\npublic:\n  Vehicle(std::string make, std::string model, int year)\n      : make(make), model(model), year(year) {}\n  virtual void displayInfo() const {\n    std::cout << make << " " << model << " " << year << " ";\n  }\n};\n```\n\nEscreva a implementação das classes `Car` e `Bike`, que herdam de `Vehicle` e acrescentam, respetivamente, o atributo e método `int numberOfDoors() const` e o atributo e método `bool isElectric() const`. Ambas devem sobrepor o método `displayInfo()` para mostrar também a sua informação específica, para além da informação base.',
    answer: {
      kind: 'self',
      checklist: [
        '`Car` e `Bike` herdam publicamente de `Vehicle` e chamam o construtor da base.',
        'Cada uma guarda o seu atributo extra (`numberOfDoors_` / `isElectric_`) e expõe o método de acesso pedido.',
        'Ambas sobrepõem `displayInfo()` chamando `Vehicle::displayInfo()` e acrescentando a informação específica.',
      ],
    },
    solution:
      '```cpp\nclass Car : public Vehicle {\npublic:\n  Car(std::string make, std::string model, int year, int numberOfDoors)\n      : Vehicle(make, model, year), numberOfDoors_(numberOfDoors) {}\n  int numberOfDoors() const { return numberOfDoors_; }\n  void displayInfo() const override {\n    Vehicle::displayInfo();\n    std::cout << numberOfDoors_ << " doors";\n  }\nprivate:\n  int numberOfDoors_;\n};\n\nclass Bike : public Vehicle {\npublic:\n  Bike(std::string make, std::string model, int year, bool isElectric)\n      : Vehicle(make, model, year), isElectric_(isElectric) {}\n  bool isElectric() const { return isElectric_; }\n  void displayInfo() const override {\n    Vehicle::displayInfo();\n    std::cout << (isElectric_ ? "electric" : "muscular");\n  }\nprivate:\n  bool isElectric_;\n};\n```',
    reasoning:
      'Cada subclasse chama o construtor da base com `Vehicle(make, model, year)` na lista de inicialização e guarda o atributo próprio. O método `displayInfo()` sobreposto chama primeiro `Vehicle::displayInfo()` para reutilizar a saída base e depois acrescenta a informação específica, com `override` para o compilador confirmar a sobreposição do método virtual.',
  },
];
