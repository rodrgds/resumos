import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  contar: '/cadeiras/aed/complexidade-invariantes/#contar-operações',
  limites: '/cadeiras/aed/complexidade-invariantes/#limites-assintóticos',
  recorrencias: '/cadeiras/aed/complexidade-invariantes/#recorrências-e-espaço',
  piorCaso:
    '/cadeiras/aed/complexidade-invariantes/#pior-caso-média-e-amortização',
  contrato: '/cadeiras/aed/complexidade-invariantes/#contrato-e-invariante',
  pesquisaBinaria:
    '/cadeiras/aed/pesquisa-ordenacao/#pesquisa-binária-com-limites',
  ordenacaoElementar: '/cadeiras/aed/ordenacao/#ordenações-elementares',
  quicksort: '/cadeiras/aed/ordenacao/#quicksort-e-partição',
  listaSimples: '/cadeiras/aed/listas-pilhas-filas/#lista-simplesmente-ligada',
  pilhaFila: '/cadeiras/aed/listas-pilhas-filas/#deque-pilha-e-fila',
  aplicacoesPilha: '/cadeiras/aed/listas-pilhas-filas/#aplicações-de-pilhas',
  arvoreOrdem: '/cadeiras/aed/arvores-pesquisa/#ordem-de-inserção-e-altura',
};

export const mt1ClassesPolimorfismo: ExamQuestion[] = [
  {
    id: 'aed-mt1-2016-q1',
    title: 'Despacho dinâmico apenas em membros-função virtuais',
    source: 'Teste 1 (CI1), 2016/17',
    topic: 'cpp',
    definitions: `class Function {
public:
   virtual float evaluate(float x)=0;
   string info();
};
class Double: public Function {
public:
   float evaluate(float x);
   string info();
};
Function *f = new Double();
float value = f->evaluate(4.0);
string info = f->info();`,
    definitionsLanguage: 'cpp',
    prompt:
      'Considere o código acima (as classes Function e Double estão parcialmente definidas). Indique o que acontece na execução das duas últimas instruções.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O código está incorreto, devido à atribuição inválida (=0) na declaração de Function::evaluate',
          correct: false,
          explanation:
            'A sintaxe =0 declara um membro-função virtual puro, que é válida e torna a classe abstrata.',
        },
        {
          text: 'value = 0 e info é o resultado da invocação de Function::info()',
          correct: false,
          explanation:
            'value não fica 0; como evaluate é virtual, é invocada Double::evaluate().',
        },
        {
          text: 'value é o resultado de Double::evaluate() e info é o resultado de Double::info()',
          correct: false,
          explanation:
            'info não é declarada virtual em Function, logo não há despacho dinâmico para Double::info().',
        },
        {
          text: 'value é o resultado de Double::evaluate() e info é o resultado de Function::info()',
          correct: true,
          explanation:
            'evaluate é virtual, logo a chamada através de Function* invoca Double::evaluate(); info não é virtual, logo usa a implementação da classe estática do apontador.',
        },
        {
          text: 'Nenhuma das possibilidades anteriores',
          correct: false,
          explanation: 'A quarta opção descreve corretamente o comportamento.',
        },
      ],
    },
    solution:
      'value é o resultado de `Double::evaluate()` e info é o resultado de `Function::info()`.',
    reasoning:
      'A tabela de funções virtuais só inclui membros-função declarados virtual. Assim, `f->evaluate(4.0)` faz despacho dinâmico para `Double::evaluate()`, mas `f->info()` resolve estaticamente para `Function::info()`.',
  },
  {
    id: 'aed-mt1-2016-q2',
    title: 'Objetos de uma classe abstrata',
    source: 'Teste 1 (CI1), 2016/17',
    topic: 'cpp',
    prompt: 'Shape é uma classe abstrata. É correto afirmar que:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Todos os membros-função da classe Shape devem ser abstratos',
          correct: false,
          explanation:
            'Basta um membro-função virtual puro para a classe ser abstrata; os restantes podem ter implementação.',
        },
        {
          text: 'Só é possível criar objetos da classe Shape se estes forem constantes',
          correct: false,
          explanation:
            'A constante não altera o facto de a classe ser abstrata.',
        },
        {
          text: 'Shape pode ser uma classe base, mas não uma classe derivada',
          correct: false,
          explanation:
            'Uma classe abstrata pode ser base e também derivar de outra classe.',
        },
        {
          text: 'Não é possível criar objetos da classe Shape',
          correct: true,
          explanation:
            'Uma classe abstrata tem pelo menos um membro-função virtual puro e não pode ser instanciada; serve apenas como base de classes concretas.',
        },
        {
          text: 'Nenhuma das possibilidades anteriores',
          correct: false,
          explanation: 'A quarta opção está correta.',
        },
      ],
    },
    solution: 'Não é possível criar objetos da classe Shape.',
    reasoning:
      'A instanciação de uma classe abstrata é impedida pelo compilador devido à presença de membros-função virtuais puros. A sua utilidade está em definir uma interface comum para as classes derivadas.',
  },
  {
    id: 'aed-mt1-2017-q1',
    title: 'Invocação polimórfica através de apontador da classe base',
    source: 'Teste 1 (CI1), 2017/18',
    topic: 'cpp',
    definitions: `class Pessoa {
public:
   virtual void info() { /* ... */ }
};
class Estudante: public Pessoa {
public:
   void info() { /* ... */ }
};
class Mestrando: public Estudante {
public:
   void info() { /* ... */ }
};
int main() {
   Pessoa *p = new Mestrando();
   p->info();
}`,
    definitionsLanguage: 'cpp',
    prompt:
      'Considere o código acima (incompleto). A instrução `p->info()` resulta em:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Invocação de Pessoa::info()',
          correct: false,
          explanation:
            'O tipo estático do apontador não decide; o despacho é dinâmico.',
        },
        {
          text: 'Invocação de Estudante::info()',
          correct: false,
          explanation: 'O objeto criado é Mestrando, que redefine info().',
        },
        {
          text: 'Invocação de Mestrando::info()',
          correct: true,
          explanation:
            'info() é virtual e o objeto apontado é um Mestrando, logo a versão mais derivada é invocada.',
        },
        {
          text: 'O programa está errado, pois o método virtual void info() não pode ter implementação',
          correct: false,
          explanation:
            'Um método virtual pode ter implementação na classe base.',
        },
        {
          text: 'Nenhuma das possibilidades anteriores',
          correct: false,
          explanation: 'A terceira opção está correta.',
        },
      ],
    },
    solution: 'É invocada `Mestrando::info()`.',
    reasoning:
      'Como info() é declarada virtual em Pessoa e redefinida em Estudante e Mestrando, a chamada através de Pessoa* usa a tabela virtual do objeto concreto (Mestrando).',
  },
  {
    id: 'aed-mt1-2018-q1',
    title: 'Atribuições entre classes genéricas base e derivada',
    source: 'Teste 1 (CI1), 2018/19',
    topic: 'cpp',
    definitions: `template <class T> class Auto { };
template <class T> class AutoOne: public Auto<T> { };

I.    Auto<string> a = AutoOne<string>();
II.   AutoOne<string> b = Auto<string>();
III.  Auto<string> c = AutoOne<int>();`,
    definitionsLanguage: 'cpp',
    prompt:
      'Considere as classes genéricas acima. Que atribuições estão corretas?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'I, II e III',
          correct: false,
          explanation: 'II e III são inválidas.',
        },
        {
          text: 'II apenas',
          correct: false,
          explanation:
            'II é inválida: não se pode converter base em derivada implicitamente.',
        },
        {
          text: 'I apenas',
          correct: true,
          explanation:
            'A conversão derivada-para-base é válida (I); base-para-derived (II) e entre instanciações com tipos diferentes (III) não compilam.',
        },
        {
          text: 'I e II apenas',
          correct: false,
          explanation: 'II não compila.',
        },
        {
          text: 'Nenhuma das possibilidades anteriores',
          correct: false,
          explanation: 'A opção I é válida.',
        },
      ],
    },
    solution: 'Apenas a atribuição I está correta.',
    reasoning:
      'Existe conversão implícita de AutoOne<T> para Auto<T> (derivada para base), mas não o contrário, nem entre AutoOne<int> e Auto<string>, pois são instanciações de templates com tipos distintos.',
  },
  {
    id: 'aed-mt1-2017-q2',
    title: 'Classe abstrata: definição e utilidade',
    source: 'Teste 1 (CI1), 2017/18',
    topic: 'cpp',
    prompt:
      'Defina o conceito de classe abstrata. Qual a utilidade de uma classe abstrata?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que uma classe abstrata contém pelo menos um membro-função virtual puro (declarado com =0).',
        'A resposta afirma que não é possível criar objetos dessa classe.',
        'A resposta indica a utilidade: definir uma interface comum que as classes derivadas concretizam, permitindo polimorfismo.',
      ],
    },
    solution:
      'Uma classe abstrata é uma classe com pelo menos um membro-função virtual puro, que não pode ser instanciada. Serve de base/interface para hierarquias de classes, permitindo despacho polimórfico através de apontadores ou referências da classe base.',
    reasoning:
      'O virtual puro (=0) obriga as classes derivadas a fornecerem a sua implementação, garantindo o contrato da interface definida na classe base.',
  },
];

export const mt1Complexidade: ExamQuestion[] = [
  {
    id: 'aed-mt1-2016-q3',
    title: 'Complexidade de ciclo aninhado com passo geométrico',
    source: 'Teste 1 (CI1), 2016/17',
    topic: 'complexidade',
    definitions: `void function1(vector<int> &v1) {
   for (int i=0; i<v1.size(); i++)
      for (int j=1; j<v1.size(); j*=2)
         cout << i << " - " << j << endl;
}`,
    definitionsLanguage: 'cpp',
    prompt: 'Indique a complexidade temporal da função acima.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O(log n)',
          correct: false,
          explanation: 'O ciclo exterior alone já executa n iterações.',
        },
        {
          text: 'O(n)',
          correct: false,
          explanation: 'Falta contar o ciclo interior, que também itera.',
        },
        {
          text: 'O(n log n)',
          correct: true,
          explanation:
            'O ciclo exterior dá n iterações e o interior, com j*=2, dá O(log n); o total é O(n log n).',
        },
        {
          text: 'O(n²)',
          correct: false,
          explanation:
            'O ciclo interior não é linear, pois j cresce geometricamente.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'A terceira opção está correta.',
        },
      ],
    },
    solution: 'O(n log n).',
    reasoning:
      'Para cada um dos n valores de i, o ciclo interior executa cerca de log₂(n) iterações (j = 1, 2, 4, ...). O número total de impressões é, portanto, Θ(n log n).',
    explanation: link.contar,
  },
  {
    id: 'aed-mt1-2016-q4',
    title: 'Tempo de um algoritmo O(n²) ao duplicar a entrada',
    source: 'Teste 1 (CI1), 2016/17',
    topic: 'complexidade',
    prompt:
      'A complexidade temporal de um algoritmo é $O(n^2)$. Este algoritmo apresentou um tempo de execução de 10 segundos para um conjunto de dados de entrada de tamanho $n$. Se o tamanho dos dados de entrada for duplicado, quanto tempo demorará (aproximadamente) a execução deste algoritmo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '10 segundos',
          correct: false,
          explanation: 'O tempo não fica igual.',
        },
        {
          text: '20 segundos',
          correct: false,
          explanation:
            'Duplicar n não duplica o tempo num algoritmo quadrático.',
        },
        {
          text: '40 segundos',
          correct: true,
          explanation:
            'Se n passa para 2n, o custo passa de c·n² para c·(2n)² = 4·c·n², ou seja, 4 vezes mais: 40 segundos.',
        },
        {
          text: '100 segundos',
          correct: false,
          explanation: 'Seria 10× o tempo original, não 4×.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'A terceira opção está correta.',
        },
      ],
    },
    solution: '40 segundos (aproximadamente).',
    reasoning:
      'Num algoritmo Θ(n²), duplicar o tamanho da entrada quadruplica o número de operações básicas: 10 s × 4 = 40 s.',
    explanation: link.limites,
  },
  {
    id: 'aed-mt1-2017-q3',
    title: 'Complexidade com ciclo exterior de tamanho fixo',
    source: 'Teste 1 (CI1), 2017/18',
    topic: 'complexidade',
    definitions: `int funcaoQQ(vector<int> &v) {
   int ct=0;
   for (int i=0; i<10; i++) {
      for (int j=v.size()-1; j>i; j/=2)
         if (v[i]<v[j]) ct++;
   }
   return ct;
}`,
    definitionsLanguage: 'cpp',
    prompt: 'Indique a complexidade temporal da função acima.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O(log n)',
          correct: true,
          explanation:
            'O ciclo exterior tem 10 iterações (constante) e o interior O(log n), logo o total é O(log n).',
        },
        {
          text: 'O(n)',
          correct: false,
          explanation: 'O ciclo exterior não depende de n.',
        },
        {
          text: 'O(n log n)',
          correct: false,
          explanation:
            'Seria se o ciclo exterior iterasse n vezes; aqui itera 10.',
        },
        {
          text: 'O(n²)',
          correct: false,
          explanation: 'Nenhum ciclo é quadrático.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'A primeira opção está correta.',
        },
      ],
    },
    solution: 'O(log n).',
    reasoning:
      'O ciclo exterior repete-se um número fixo de vezes (10), pelo que é uma constante. Em cada iteração, o ciclo interior divide j por 2, executando O(log n) passos. O total é 10·O(log n) = O(log n).',
    explanation: link.contar,
  },
  {
    id: 'aed-mt1-2018-q2',
    title: 'Complexidade de ciclo aninhado com divisão por 2',
    source: 'Teste 1 (CI1), 2018/19',
    topic: 'complexidade',
    definitions: `int funcaoQQ2(vector<int> &vec) {
   int ct=0;
   for (int i=0; i<vec.size(); i++) {
      cout << vec[i];
      for (int j=vec.size(); j>i; j/=2)
         if (vec[i]<vec[j]) ct++;
   }
   return ct;
}`,
    definitionsLanguage: 'cpp',
    prompt:
      'Indique a complexidade temporal do fragmento de código acima (no enunciado original faltava o `int` na declaração de `i`, aqui normalizado).',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O(N)',
          correct: false,
          explanation: 'O ciclo interior também contribui.',
        },
        {
          text: 'O(log N)',
          correct: false,
          explanation: 'O ciclo exterior já é O(N).',
        },
        {
          text: 'O(N log N)',
          correct: true,
          explanation:
            'O ciclo exterior itera N vezes e o interior O(log N) vezes; o total é O(N log N).',
        },
        {
          text: 'O(N²)',
          correct: false,
          explanation: 'O ciclo interior não é linear.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'A terceira opção está correta.',
        },
      ],
    },
    solution: 'O(N log N).',
    reasoning:
      'Para cada i, o ciclo interior começa em N e divide j por 2 até j ≤ i, num total de O(log N) iterações. Ao fim de N iterações do ciclo exterior, o custo total é O(N log N).',
    explanation: link.contar,
  },
  {
    id: 'aed-mt1-2022-q1',
    title: 'Comparação assintótica de função exponencial com polinomial',
    source: 'Teste 1 (CI1 teórica), 2022/23',
    topic: 'complexidade',
    prompt:
      'Considere as funções $f(n)=2^{n/2}$ e $g(n)=n^2$. Qual das afirmações é verdadeira?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$f(n)\in\Theta(g(n))$',
          correct: false,
          explanation:
            'Para ser Θ, f teria de ser simultaneamente O e Ω de g; não é O de g.',
        },
        {
          text: '$f(n)$ não é $\Theta$, $O$ ou $\Omega$ de $g(n)$',
          correct: false,
          explanation: 'f é Ω de g.',
        },
        {
          text: '$f(n)\in O(g(n))$',
          correct: false,
          explanation:
            'A exponencial cresce mais depressa que o polinomial, logo f não é limitada superiormente por g.',
        },
        {
          text: '$f(n)\in\Omega(g(n))$',
          correct: true,
          explanation:
            '2^(n/2) cresce mais depressa que n², logo existe c tal que f(n) ≥ c·g(n) para n suficientemente grande.',
        },
      ],
    },
    solution: '$f(n)\in\Omega(g(n))$, mas não $O(g(n))$ nem $\Theta(g(n))$.',
    reasoning:
      'Toda função exponencial com base > 1 domina qualquer polinomial. Assim, $\lim_{n\to\infty} 2^{n/2}/n^2 = +\infty$, o que mostra que f é Ω de g mas não O de g.',
    explanation: link.limites,
  },
  {
    id: 'aed-mt1-2022-q2',
    title: 'Complexidade da soma recursiva por divisão em duas metades',
    source: 'Teste 1 (CI1 teórica), 2022/23',
    topic: 'complexidade',
    definitions: `int sum(int a, int b) {
   if (a==b) return a;
   int middle = (b-a)/2 + a;
   return sum(a, middle) + sum(middle+1, b);
}`,
    definitionsLanguage: 'cpp',
    prompt:
      'A função recursiva acima calcula a soma dos inteiros entre a e b. Qual é a sua complexidade temporal?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\Theta(2^n)$',
          correct: false,
          explanation: 'A árvore de recorrência não tem 2^n folhas.',
        },
        {
          text: '$\Theta(n \\log n)$',
          correct: false,
          explanation:
            'Cada nível trabalha O(1) por nó e há n folhas, não n log n de trabalho total.',
        },
        {
          text: '$\Theta(\\log n)$',
          correct: false,
          explanation: 'Há n chamadas no último nível.',
        },
        {
          text: '$\Theta(n)$',
          correct: true,
          explanation:
            'A recorrência T(n)=2T(n/2)+O(1) resolve-se para Θ(n): a árvore tem n folhas e o trabalho por nível decresce geometricamente.',
        },
      ],
    },
    solution: '$\Theta(n)$.',
    reasoning:
      'Cada chamada divide o intervalo em duas metades e faz trabalho constante, pelo que T(n) = 2T(n/2) + O(1). Pelo teorema mestre (caso 2), ou somando os níveis da árvore de recorrência (n folhas e custo total proporcional a n), obtém-se Θ(n).',
    explanation: link.recorrencias,
  },
];

export const mt1PesquisaOrdenacao: ExamQuestion[] = [
  {
    id: 'aed-mt1-2017-q4',
    title: 'Custo de inserir num vetor ordenado',
    source: 'Teste 1 (CI1), 2017/18',
    topic: 'pesquisa-ordenacao',
    prompt:
      'A inserção de um elemento num vetor ordenado (mantendo a ordenação) é realizada pelo seguinte algoritmo: uso de pesquisa binária para localizar a posição onde deve ser inserido o novo elemento; inserir o novo elemento nessa posição. Qual a complexidade temporal deste algoritmo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O(log N)',
          correct: false,
          explanation:
            'A pesquisa binária é O(log N), mas a inserção exige deslocar elementos.',
        },
        {
          text: 'O(N log N)',
          correct: false,
          explanation: 'O deslocamento é linear, não logarítmico.',
        },
        {
          text: 'O(N²)',
          correct: false,
          explanation: 'Não há dois ciclos aninhados.',
        },
        {
          text: 'O(N)',
          correct: true,
          explanation:
            'A pesquisa binária custa O(log N), mas inserir na posição correta desloca até N elementos, com custo O(N) dominante.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'A quarta opção está correta.',
        },
      ],
    },
    solution: 'O(N).',
    reasoning:
      'Localizar a posição com pesquisa binária custa O(log N), mas a posição de inserção obriga a deslocar todos os elementos à direita, uma operação O(N). O custo total é dominado por O(N).',
    explanation: link.pesquisaBinaria,
  },
  {
    id: 'aed-mt1-2018-q3',
    title: 'Trocas inúteis da ordenação por seleção num vetor decrescente',
    source: 'Teste 1 (CI1), 2018/19',
    topic: 'pesquisa-ordenacao',
    prompt:
      'O algoritmo de ordenação por seleção é usado na ordenação, por ordem crescente, de um vetor de 100 elementos. Considerando que o vetor está inicialmente ordenado por ordem decrescente {100, 99, 98, ..., 1}, quantas trocas inúteis são realizadas, aproximadamente? (uma troca inútil ocorre quando um elemento é trocado com ele próprio, logo o vetor não se altera).',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '100',
          correct: false,
          explanation: 'Nem todas as iterações fazem troca inútil.',
        },
        {
          text: '50',
          correct: true,
          explanation:
            'Na primeira metade o elemento mínimo ainda não está no sítio; a partir de i ≈ 50 o mínimo do sufixo já está na posição i e a troca é consigo próprio.',
        },
        {
          text: '0',
          correct: false,
          explanation: 'Há várias trocas consigo próprio na segunda metade.',
        },
        {
          text: '6',
          correct: false,
          explanation: 'O valor não depende de logaritmos.',
        },
        {
          text: 'Nenhuma das anteriores',
          correct: false,
          explanation: 'A segunda opção está correta.',
        },
      ],
    },
    solution: 'Aproximadamente 50 trocas inúteis.',
    reasoning:
      'Numa ordenação por seleção, a cada passo i procura-se o mínimo do sufixo v[i..99] e troca-se com v[i]. Num vetor decrescente, a segunda metade do vetor já fica ordenada por ordem crescente à medida que os menores vão sendo colocados à frente; a partir de cerca de i = 50, o mínimo já está na posição i e a troca é inútil. Total: ≈ n/2 = 50.',
    explanation: link.ordenacaoElementar,
  },
  {
    id: 'aed-mt1-2022-q3',
    title: 'Invariante útil do bubblesort decrescente',
    source: 'Teste 1 (CI1 teórica), 2022/23',
    topic: 'pesquisa-ordenacao',
    definitions: `void bubblesort(vector<int> &v) {
   for (unsigned i=0; i<v.size()-1; i++)
      for (unsigned j=0; j<v.size()-i-1; j++)
         if (v[j] < v[j+1])
            swap(v[j], v[j+1]);
}`,
    definitionsLanguage: 'cpp',
    prompt:
      'Está a ordenar-se um vetor de inteiros por ordem decrescente com o bubblesort acima. Qual das seguintes condições é um invariante útil no início de cada iteração do ciclo com a variável i, para provar a correção do algoritmo?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Os mais pequenos i números de todo o vetor estão nas primeiras i posições e estão ordenados',
          correct: false,
          explanation:
            'Isso seria o invariante da ordenação crescente, não da decrescente.',
        },
        {
          text: 'Os maiores i números de todo o vetor estão nas primeiras i posições e estão ordenados',
          correct: false,
          explanation:
            'Os maiores elementos vão para o fim do vetor nesta implementação decrescente.',
        },
        {
          text: 'Os mais pequenos i números de todo o vetor estão nas últimas i posições e estão ordenados',
          correct: false,
          explanation:
            'Numa ordenação decrescente, os menores é que ficam no fim, mas o invariante do ciclo exterior refere-se aos maiores i números.',
        },
        {
          text: 'Os maiores i números de todo o vetor estão nas últimas i posições e estão ordenados',
          correct: true,
          explanation:
            'A cada passagem do ciclo interior, o maior elemento da parte não processada sobe para a última posição livre; no início da iteração i do ciclo exterior, as últimas i posições contêm os maiores i elementos, ordenados.',
        },
      ],
    },
    solution:
      'Os maiores i números de todo o vetor estão nas últimas i posições e estão ordenados.',
    reasoning:
      'Como a ordenação é decrescente e a comparação troca quando v[j] < v[j+1], o maior elemento remanescente acaba na última posição ainda não fixada a cada passagem. Assim, no início da iteração i, as posições v[n-i..n-1] contêm os i maiores valores, por ordem decrescente, e nunca mais saem de lá.',
    explanation: link.contrato,
  },
  {
    id: 'aed-mt1-2017-q5',
    title: 'Pior caso do Quicksort',
    source: 'Teste 1 (CI1), 2017/18',
    topic: 'pesquisa-ordenacao',
    prompt:
      'O algoritmo de ordenação Quicksort possui complexidade temporal $O(n\\log n)$ no caso médio, mas pode, no pior caso, apresentar complexidade temporal $O(n^2)$. Explique porquê.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que o pior caso ocorre quando a partição é sempre maximamente desbalanceada (o pivô é o menor ou o maior elemento do intervalo).',
        'A resposta apresenta a recorrência T(n) = T(n-1) + Θ(n) (ou equivalente) e conclui Θ(n²).',
        'A resposta dá um exemplo de entrada que provoca esse caso, como um vetor já ordenado com o pivô escolhido no primeiro elemento.',
      ],
    },
    solution:
      'O pior caso acontece quando, em cada partição, um dos lados fica vazio: o pivô é o menor ou o maior elemento. A recorrência fica T(n) = T(n-1) + Θ(n), que resolve para Θ(n²). Exemplo: vetor já ordenado com o pivô escolhido no primeiro elemento.',
    reasoning:
      'Cada partição custa Θ(n) para colocar o pivô no sítio, mas se um lado tem tamanho 0 e o outro n-1, a árvore de recursão degenera numa lista com n níveis, dando um total de n + (n-1) + ... + 1 = Θ(n²).',
    explanation: link.quicksort,
  },
];

export const mt1EstruturasLineares: ExamQuestion[] = [
  {
    id: 'aed-mt1-2022-q4',
    title: 'Estrutura adequada ao botão "voltar" de um browser',
    source: 'Teste 1 (CI1 teórica), 2022/23',
    topic: 'lineares',
    prompt:
      'Qualquer browser possui a funcionalidade de retorno à página visitada anteriormente. Na implementação desta (e apenas desta) funcionalidade, qual a estrutura de dados que considera mais adequada (eficiente em tempo e espaço)?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Fila',
          correct: false,
          explanation: 'A fila dá o primeiro a entrar, não o último.',
        },
        {
          text: 'Lista duplamente ligada',
          correct: false,
          explanation:
            'Gasta mais memória do que o necessário para esta função.',
        },
        {
          text: 'Lista simplesmente ligada',
          correct: false,
          explanation:
            'Também funciona, mas a pilha é a estrutura natural e mais simples.',
        },
        {
          text: 'Pilha',
          correct: true,
          explanation:
            'A página "anterior" é sempre a última visitada: comportamento LIFO, com push/pop em O(1).',
        },
      ],
    },
    solution: 'Pilha (stack).',
    reasoning:
      'A cada nova página faz-se push; o botão "voltar" faz pop, devolvendo a página visitada mais recentemente. É a disciplina LIFO, implementada de forma eficiente e económica com uma pilha.',
    explanation: link.aplicacoesPilha,
  },
  {
    id: 'aed-mt1-2022-q5',
    title:
      'Operações em O(1) numa lista simplesmente ligada com cabeça e cauda',
    source: 'Teste 1 (CI1 teórica), 2022/23',
    topic: 'lineares',
    prompt:
      'Considere a estrutura lista implementada por uma lista simplesmente ligada com referências para o início e o fim (primeiro e último nó). Quais das seguintes operações podem ser realizadas em tempo O(1)?\n\n- I. inserir um elemento no início da lista\n- II. inserir um elemento no fim da lista\n- III. remover o primeiro elemento (início) da lista\n- IV. remover o último elemento (fim) da lista',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'I, II e IV, apenas',
          correct: false,
          explanation: 'IV não é O(1) numa lista simplesmente ligada.',
        },
        {
          text: 'I e II, apenas',
          correct: false,
          explanation: 'Falta a III, que também é O(1).',
        },
        {
          text: 'I, II e III, apenas',
          correct: true,
          explanation:
            'Com apontador para a cauda, inserir no fim é O(1); remover o último exigiria percorrer a lista para atualizar a cauda, logo é O(n).',
        },
        {
          text: 'I e III, apenas',
          correct: false,
          explanation: 'II também é O(1) graças à referência para o fim.',
        },
      ],
    },
    solution: 'I, II e III apenas.',
    reasoning:
      'Inserir no início (I), inserir no fim graças à cauda (II) e remover o primeiro (III) são operações locais, em O(1). Remover o último (IV) exige o nó anterior ao último, que numa lista simplesmente ligada obriga a percorrer a lista inteira: O(n).',
    explanation: link.listaSimples,
  },
];

export const mt1ArvoresPesquisa: ExamQuestion[] = [
  {
    id: 'aed-mt1-2022-q6',
    title:
      'Árvore binária de pesquisa resultante de uma sequência de inserções',
    source: 'Teste 1 (CI1 teórica), 2022/23',
    topic: 'arvores',
    prompt:
      'Se introduzir a sequência 10, 15, 7, 9, 17, 12 numa árvore binária de pesquisa, a árvore resultante:',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Não é completa, e é equilibrada',
          correct: true,
          explanation:
            'O nó 7 só tem filho direito (9), logo a árvore não é completa; mas as alturas das subárvores de cada nó diferem no máximo de 1, logo é equilibrada.',
        },
        {
          text: 'É completa, e não é equilibrada',
          correct: false,
          explanation: 'Não é completa nem está desiquilibrada.',
        },
        {
          text: 'Não é completa e não é equilibrada',
          correct: false,
          explanation: 'A árvore é equilibrada.',
        },
        {
          text: 'É completa e equilibrada',
          correct: false,
          explanation: 'Não é completa.',
        },
      ],
    },
    solution: 'Não é completa, e é equilibrada.',
    reasoning:
      'Inserindo por ordem: 10 é a raiz; 15 fica à direita; 7 à esquerda; 9 à direita de 7; 17 à direita de 15; 12 à esquerda de 15. A subárvore de 7 tem apenas o filho direito 9, pelo que o nível 2 não está preenchido da esquerda para a direita e a árvore não é completa. Em qualquer nó, as alturas das duas subárvores diferem no máximo de 1 (raiz: 1 e 2), logo a árvore é equilibrada.',
    explanation: link.arvoreOrdem,
  },
];
