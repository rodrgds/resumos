import type { PrologQuestion } from './questions';

export const questions: PrologQuestion[] = [
  {
    id: 'mt2-terms-operador-paginas',
    title: 'Operadores para páginas',
    prompt: "Que declarações permitem escrever `'The Firm' has 432 pages`?",
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`op(700, xfx, has)` e `op(600, xf, pages)`',
          correct: true,
          explanation:
            '`has` é infixo e `pages` é pós-fixo, com prioridade inferior.',
        },
        {
          text: '`op(700, xfx, has)` e `op(600, fx, pages)`',
          correct: false,
          explanation: '`fx` é prefixo, mas `pages` aparece depois do número.',
        },
        {
          text: '`op(700, yfy, has)` e `op(600, xf, pages)`',
          correct: false,
          explanation: '`yfy` não é uma especificação válida.',
        },
        {
          text: '`op(700, xfx, has)` e `op(700, xf, pages)`',
          correct: false,
          explanation:
            'O operando direito de `xfx` exige prioridade estritamente inferior a 700.',
        },
        {
          text: '`op(700, yfy, has)` e `op(600, fx, pages)`',
          correct: false,
          explanation: '`yfy` é inválido e `fx` é prefixo.',
        },
      ],
    },
    solution: 'Usa `xfx` para `has` e `xf` para `pages`.',
    reasoning:
      'A sintaxe exige um operador infixo e outro pós-fixo, cujo termo pode ser o operando direito de `has`.',
    explanation:
      '/cadeiras/pfl/procura-jogos-simbolos/#termos-que-representam-expressões',
  },
  {
    id: 'mt2-terms-argumento-termo',
    title: 'Argumento de um termo',
    prompt: 'Para um termo já instanciado `T`, o que verifica a consulta?',
    definitions: 'T =.. L, append([_,_],[X|_],L), var(X).',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'O terceiro argumento está por instanciar.',
          correct: false,
          explanation: 'O primeiro elemento da lista é o funtor.',
        },
        {
          text: 'O segundo argumento é um átomo.',
          correct: false,
          explanation: '`var/1` testa uma variável livre.',
        },
        {
          text: 'O segundo argumento está por instanciar.',
          correct: true,
          explanation:
            'Após o funtor e o primeiro argumento, `X` é o segundo argumento.',
        },
        {
          text: 'O primeiro argumento está por instanciar.',
          correct: false,
          explanation: 'O primeiro argumento é o segundo elemento da lista.',
        },
        {
          text: 'O terceiro argumento é um átomo.',
          correct: false,
          explanation: 'O teste é `var/1`, não `atom/1`.',
        },
      ],
    },
    solution: 'A consulta testa se o segundo argumento é uma variável livre.',
    reasoning:
      'A lista produzida por `=..` começa pelo funtor. `append/3` seleciona o terceiro elemento da lista.',
    explanation:
      '/cadeiras/pfl/procura-jogos-simbolos/#termos-que-representam-expressões',
  },
  {
    id: 'mt2-terms-recursao-final',
    title: 'Recursão de cauda',
    prompt: 'Qual das afirmações sobre recursão de cauda está correta?',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Ocorre também em factos.',
          correct: false,
          explanation: 'Um facto não tem chamada recursiva.',
        },
        {
          text: 'Um argumento adicional permite transformar certos predicados em recursão de cauda.',
          correct: true,
          explanation: 'Um acumulador pode guardar trabalho pendente.',
        },
        {
          text: 'Um corte torna qualquer chamada recursiva uma chamada de cauda.',
          correct: false,
          explanation:
            'A posição da chamada, não o corte, determina se é de cauda.',
        },
        {
          text: 'Um predicado sem chamada recursiva usa recursão de cauda.',
          correct: false,
          explanation: 'É necessária uma chamada recursiva.',
        },
        {
          text: 'Todas as outras afirmações estão erradas.',
          correct: false,
          explanation: 'A opção do acumulador está correta.',
        },
      ],
    },
    solution:
      'Um argumento acumulador pode tornar alguns predicados recursivos de cauda.',
    reasoning:
      'O acumulador permite passar trabalho por fazer para a chamada seguinte, deixando-a como último objetivo.',
    explanation:
      '/cadeiras/pfl/prolog-recursao-procura/#acumuladores-e-terminação',
  },
  {
    id: 'mt2-terms-listas-diferenca',
    title: 'Listas de diferença',
    prompt:
      'Considera A: `[a,b|T]\\T` representa `[a,b]`; B: as listas de diferença dão acesso O(1) a um prefixo não instanciado; C: permitem calcular o comprimento do prefixo em O(1). Que afirmações são corretas?',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'A, B e C',
          correct: false,
          explanation: 'O comprimento não está guardado na representação.',
        },
        {
          text: 'A e C',
          correct: false,
          explanation: 'Contar o prefixo exige percorrê-lo.',
        },
        {
          text: 'Só A',
          correct: true,
          explanation:
            'O segmento entre a lista e a cauda partilhada é `[a,b]`.',
        },
        {
          text: 'Só C',
          correct: false,
          explanation: 'O comprimento não é obtido em tempo constante.',
        },
        {
          text: 'B e C',
          correct: false,
          explanation:
            'Nem a consulta arbitrária do prefixo nem o seu comprimento são constantes.',
        },
      ],
    },
    solution: 'Só A está correta.',
    reasoning:
      'A cauda partilhada delimita o segmento, mas não guarda o seu comprimento.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-terms-operador-some',
    title: 'Operador prefixo',
    prompt:
      'Com `requires` definido como `op(590, xfx, requires)`, escolhe a definição que permite `garlic_bread requires cheese and some garlic` e impede `some some garlic`.',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`op(570, xf, some)`',
          correct: false,
          explanation: 'É pós-fixo.',
        },
        {
          text: '`op(600, fy, some)`',
          correct: false,
          explanation:
            'A prioridade é demasiado elevada e `fy` permite repetição.',
        },
        {
          text: '`op(600, xf, some)`',
          correct: false,
          explanation: 'É pós-fixo e tem prioridade demasiado elevada.',
        },
        {
          text: '`op(570, fx, some)`',
          correct: true,
          explanation:
            'É prefixo, mais forte e não aceita outro `some` à mesma prioridade.',
        },
        {
          text: '`op(570, fy, some)`',
          correct: false,
          explanation: '`fy` permite repetir o operador.',
        },
      ],
    },
    solution: 'Usa `op(570, fx, some)`.',
    reasoning:
      'A forma prefixa deve ter prioridade inferior à ligação e usar `x` para proibir repetição à mesma prioridade.',
    explanation:
      '/cadeiras/pfl/procura-jogos-simbolos/#termos-que-representam-expressões',
  },
  {
    id: 'mt2-terms-operador-and',
    title: 'Operador de ligação',
    prompt:
      'Com `requires` definido como `op(590, xfx, requires)`, escolhe a definição de `and` que permite encadear três ingredientes.',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`op(580, yf, and)`',
          correct: false,
          explanation: 'É pós-fixo, não infixo.',
        },
        {
          text: '`op(580, xfy, and)`',
          correct: true,
          explanation: 'É infixo e associa à direita, permitindo encadeamento.',
        },
        {
          text: '`op(580, yxfx, and)`',
          correct: false,
          explanation: 'Não é uma especificação de operador válida.',
        },
        {
          text: '`op(580, xf, and)`',
          correct: false,
          explanation: 'É pós-fixo.',
        },
        {
          text: '`op(580, xfx, and)`',
          correct: false,
          explanation:
            'Não permite encadear operadores da mesma prioridade sem parênteses.',
        },
      ],
    },
    solution: 'Usa `op(580, xfy, and)`.',
    reasoning:
      'Um operador infixo associativo e de menor prioridade pode aparecer no operando direito de `requires`.',
    explanation:
      '/cadeiras/pfl/procura-jogos-simbolos/#termos-que-representam-expressões',
  },
  {
    id: 'mt2-terms-corte-consulta',
    title: 'Corte numa consulta',
    prompt: 'O corte nesta consulta é verde?',
    definitions: 'member(X,[a,b,c,d,e]), !, member(Y,[1,2,3,4]).',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Verdadeiro',
          correct: false,
          explanation: 'Sem o corte surgem soluções com outros valores de `X`.',
        },
        {
          text: 'Falso',
          correct: true,
          explanation: 'O corte elimina soluções, por exemplo `X = b`.',
        },
      ],
    },
    solution: 'É um corte vermelho.',
    reasoning:
      'O corte fixa a primeira solução de `member/2`; removê-lo altera o conjunto de respostas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-terms-mover-corte',
    title: 'Mover um corte',
    prompt:
      'Mover o corte para o início da consulta diminui o número de unificações feitas ao pedir todas as soluções?',
    definitions: 'member(X,[a,b,c,d,e]), !, member(Y,[1,2,3,4]).',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Verdadeiro',
          correct: false,
          explanation:
            'O corte inicial deixa todas as escolhas de `X` disponíveis.',
        },
        {
          text: 'Falso',
          correct: true,
          explanation:
            'O corte inicial não poda as alternativas criadas depois dele.',
        },
      ],
    },
    solution:
      'Não. O corte inicial não elimina as alternativas de `member(X, ...)`.',
    reasoning:
      'Um corte elimina escolhas anteriores, não as que são criadas depois de o executar.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
];
