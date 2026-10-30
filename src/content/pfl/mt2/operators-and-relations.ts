import type { PrologQuestion } from './questions';
const link = '/cadeiras/pfl/logica-unificacao-prolog/#factos-regras-e-queries';
function choice(
  id: string,
  title: string,
  prompt: string,
  options: string[],
  correct: number,
  reasoning: string,
  definitions?: string,
): PrologQuestion {
  return {
    id: `mt2-relations-${id}`,
    title,
    prompt,
    definitions,
    answer: {
      kind: 'choice',
      options: options.map((text, i) => ({
        text,
        correct: i === correct,
        explanation:
          i === correct
            ? reasoning
            : 'Esta opção não descreve o comportamento indicado.',
      })),
    },
    solution: options[correct],
    reasoning,
    explanation: link,
  };
}
const family = `male(frank). male(jay). male(javier). male(merle). male(phil). male(mitchell). male(cameron). male(joe). male(manny). male(bo). male(dylan). male(luke). male(rexford). male(calhoun). male(george).
female(grace). female(dede). female(gloria). female(barb). female(claire). female(pameron). female(haley). female(alex). female(lily). female(poppy).
parent(grace,phil). parent(frank,phil). parent(dede,claire). parent(dede,mitchell). parent(jay,claire). parent(jay,mitchell). parent(jay,joe). parent(gloria,joe). parent(gloria,manny). parent(javier,manny). parent(barb,cameron). parent(barb,pameron). parent(merle,cameron). parent(merle,pameron). parent(mitchell,lily). parent(mitchell,rexford). parent(cameron,lily). parent(cameron,rexford). parent(pameron,calhoun). parent(bo,calhoun). parent(phil,haley). parent(phil,alex). parent(phil,luke). parent(claire,haley). parent(claire,alex). parent(claire,luke). parent(haley,george). parent(haley,poppy). parent(dylan,george). parent(dylan,poppy).`;
const score = `score(Guess,Key,CC,CE) :- right_position(Guess,Key,CC), any_position(Guess,Key,CA), CE is CA-CC.`;
const scoreHelpers = `right_position([],[],0).
right_position([X|Xs],[Y|Ys],N) :- right_position(Xs,Ys,M), (X=Y -> N is M+1 ; N=M).
any_position([],_,0).
any_position([X|Xs],Ys,N) :- (select(X,Ys,Zs) -> any_position(Xs,Zs,M), N is M+1 ; any_position(Xs,Ys,N)).`;
type Test = { name: string; code: string; output: string };
function code(
  id: string,
  title: string,
  prompt: string,
  given: string,
  solution: string,
  reasoning: string,
  tests: Test[],
): PrologQuestion {
  return {
    id: `mt2-relations-${id}`,
    title,
    prompt,
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: `${given}\n\n% Define aqui o predicado pedido.`,
      tests,
    },
    solution: `${given}\n\n${solution}`,
    reasoning,
    explanation: link,
  };
}
export const questions: PrologQuestion[] = [
  choice(
    'rule',
    'Implicação de uma regra',
    'O que exprime logicamente a regra `parent(X,Y) :- mother(X,Y).`?',
    [
      'Se `parent(X,Y)` é verdadeiro, `mother(X,Y)` tem de ser verdadeiro.',
      'Define um facto novo que torna `parent` o mesmo predicado que `mother`.',
      'Se `mother(X,Y)` é verdadeiro, `parent(X,Y)` é verdadeiro.',
      '`parent(X,Y)` e `mother(X,Y)` são sempre ambos verdadeiros ou ambos falsos.',
    ],
    2,
    'O corpo implica a cabeça, mas a regra não afirma a implicação inversa.',
  ),
  choice(
    'unify-fact',
    'Unificação com um facto',
    'Dado `likes(alice,pizza).`, como responde Prolog à query `likes(alice,X)`?',
    [
      'Falha imediatamente porque `X` não está instanciado.',
      'Trata `X` como um novo facto e acrescenta-o à base.',
      'Unifica `likes(alice,X)` com factos ou regras e instancia `X`.',
      'Procura uma regra que derive `alice` a partir de `X`.',
    ],
    2,
    'A unificação com o facto liga X a pizza.',
  ),
  choice(
    'cut',
    'Efeito do corte',
    'Qual é o principal efeito de inserir `!` no meio do corpo de uma regra?',
    [
      'Impede a regra de voltar a ser usada.',
      'Converte a regra num facto.',
      'Aborta toda a query e sai.',
      'Impede o retrocesso para além desse ponto na regra atual.',
    ],
    3,
    'O corte descarta os pontos de escolha anteriores da chamada atual.',
  ),
  choice(
    'term',
    'Unificação de termos',
    'Como se unifica `f(X,a)` com `f(g(Y),a)`?',
    [
      'Liga `X` a `g(Y)` e deixa `Y` livre.',
      'Liga `Y` a `X` e substitui `f` por `g`.',
      'Não são unificáveis porque `X` e `Y` são variáveis diferentes.',
      'Liga `X` a `Y` e deixa `f` inalterado.',
    ],
    0,
    'Os funtores exteriores coincidem e o primeiro argumento impõe X = g(Y).',
  ),
  choice(
    'sld',
    'Folha de falha SLD',
    'Numa árvore de execução SLD, o que representa uma folha de falha?',
    [
      'Uma prova com sucesso de todos os objetivos da query.',
      'Um ponto em que é necessário retroceder porque nenhuma cabeça de cláusula unificou com o objetivo atual.',
      'Um erro de sintaxe que interrompe toda a pesquisa.',
      'Um ponto em que Prolog evita o retrocesso e fixa o ramo atual.',
    ],
    1,
    'Sem cláusula aplicável a esse objetivo, esse ramo falha.',
  ),
  choice(
    'collect',
    'findall e setof',
    'Qual é uma diferença entre `findall/3` e `setof/3`?',
    [
      '`findall/3` remove duplicados automaticamente e `setof/3` conserva-os.',
      '`findall/3` devolve só a primeira solução e `setof/3` devolve todas.',
      '`setof/3` ordena, remove duplicados e pode agrupar por variáveis livres; `findall/3` recolhe todas numa lista.',
      '`setof/3` falha sem soluções e `findall/3` lança um erro.',
    ],
    2,
    '`findall` devolve uma lista vazia quando não há soluções; `setof` falha.',
  ),
  choice(
    'io',
    'Leitura de termos',
    'Ao usar `read/1` e `write/1` em programas interativos, que condição importa?',
    [
      '`write/1` falha se o argumento contiver variáveis não instanciadas.',
      '`read/1` espera um termo Prolog seguido de ponto, pelo que as instruções e o formato de entrada devem respeitá-lo.',
      '`write/1` insere automaticamente espaços e mudanças de linha.',
      '`read/1` só lê números, não átomos ou termos compostos.',
    ],
    1,
    'O ponto termina o termo lido; a apresentação deve indicar o formato.',
  ),
  choice(
    'cut-query',
    'Corte após uma escolha',
    'Na cláusula `p(X) :- q(X), !, r(X).`, o que acontece quando `q(X)` tem várias soluções?',
    [
      'Nenhuma solução de `q(X)` é considerada; o corte passa diretamente a `r(X)`.',
      'Só se usa a primeira solução de `q(X)`; o retrocesso não tenta alternativas de `q(X)`.',
      'Todas as soluções de `q(X)` são consideradas e `r(X)` é verificado para cada uma.',
      'A cláusula comporta-se como se não tivesse corte, pois cortes só afetam factos.',
    ],
    1,
    'Depois do primeiro sucesso de q, o corte elimina as suas alternativas.',
  ),
  code(
    'parents',
    'Pares de progenitores',
    'Define `parents(?Parent1, ?Parent2, ?Person)` para os dois progenitores distintos de uma pessoa, independentemente do género. A relação é simétrica: para cameron devolve barb-merle e merle-barb; para phil, grace-frank e frank-grace.',
    family,
    String.raw`parents(A,B,C) :- parent(A,C), parent(B,C), A \= B.`,
    'Procura dois factos para a mesma pessoa e exige progenitores distintos.',
    [
      {
        name: 'Duas ordens',
        code: 'main :- findall(A-B,parents(A,B,cameron),L),write_canonical(L),nl.',
        output: '[-(barb,merle),-(merle,barb)]',
      },
      {
        name: 'Mesmo género',
        code: 'main :- findall(A-B,parents(A,B,lily),L),write_canonical(L),nl.',
        output: '[-(mitchell,cameron),-(cameron,mitchell)]',
      },
    ],
  ),
  code(
    'single-child',
    'Filho único',
    'Define `single_child(?Person)` para quem não tem irmãos, nem meios-irmãos. Deve ter sucesso no máximo uma vez por pessoa. As soluções são phil e calhoun.',
    family,
    String.raw`single_child(P) :- setof(C,A^parent(A,C),Children), member(P,Children), \+ (parent(A,P),parent(A,S),S \= P).`,
    'Gera cada filho uma vez e nega a existência de outra pessoa com um progenitor em comum.',
    [
      {
        name: 'Todos',
        code: 'main :- findall(P,single_child(P),L),sort(L,S),write_canonical(S),nl.',
        output: '[calhoun,phil]',
      },
      {
        name: 'Sem duplicados',
        code: 'main :- findall(P,single_child(P),L),length(L,N),write(N),nl.',
        output: '2',
      },
      {
        name: 'Meio-irmão',
        code: 'main :- (single_child(manny)->write(sim);write(nao)),nl.',
        output: 'nao',
      },
    ],
  ),
  code(
    'ancestors',
    'Lista de antepassados',
    'Define `ancestors(+Person, ?List)` com a lista de todos os antepassados. Por exemplo, `ancestors(cameron,L)` dá `[barb,merle]`.',
    family,
    `ancestor(P,A) :- parent(A,P).\nancestor(P,A) :- parent(B,P), ancestor(B,A).\nancestors(P,L) :- findall(A,ancestor(P,A),L).`,
    'A relação recursiva encontra progenitores e os respetivos antepassados; findall recolhe os percursos.',
    [
      {
        name: 'Diretos',
        code: 'main :- ancestors(cameron,L),write_canonical(L),nl.',
        output: '[barb,merle]',
      },
      {
        name: 'Sem antepassados',
        code: 'main :- ancestors(grace,L),write_canonical(L),nl.',
        output: '[]',
      },
    ],
  ),
  code(
    'score',
    'Pontuar um código',
    'No Mastermind, cada código tem quatro dígitos entre 1 e 9, com repetições permitidas. `score(+Guess,+Key,?CC,?CE)` conta dígitos na posição certa e dígitos certos na posição errada. Define `right_position/3` e `any_position/3` usados por score. Conta ocorrências repetidas no máximo uma vez cada. Exemplos: `[1,2,3,4]` contra `[4,3,2,1]` dá 0 e 4; `[5,6,7,8]` dá 0 e 0; `[4,2,3,5]` dá 1 e 2.',
    score,
    scoreHelpers,
    'Conta posições iguais e remove cada dígito encontrado da chave antes de procurar o seguinte.',
    [
      {
        name: 'Invertido',
        code: 'main :- score([1,2,3,4],[4,3,2,1],A,B),write_canonical(A-B),nl.',
        output: '-(0,4)',
      },
      {
        name: 'Repetições',
        code: 'main :- score([1,1,1,2],[1,2,2,2],A,B),write_canonical(A-B),nl.',
        output: '-(2,0)',
      },
      {
        name: 'Misto',
        code: 'main :- score([4,2,3,5],[4,3,2,1],A,B),write_canonical(A-B),nl.',
        output: '-(1,2)',
      },
    ],
  ),
  code(
    'solve',
    'Encontrar códigos consistentes',
    'Define `solve(+Scores, ?Key)`, gerando por retrocesso todas as chaves de quatro dígitos de 1 a 9, com repetição permitida, consistentes com cada `score(Guess,CC,CE)`. Para `[score([1,2,3,4],2,2)]` as chaves são `[1,2,4,3]`, `[1,3,2,4]`, `[1,4,3,2]`, `[2,1,3,4]`, `[3,2,1,4]` e `[4,2,3,1]`.',
    `${score}\n${scoreHelpers}`,
    `solve(Scores,Key) :- length(Key,4), maplist(digit,Key), consistent(Scores,Key).\ndigit(X) :- between(1,9,X).\nconsistent([],_).\nconsistent([score(G,C,E)|Ss],K) :- score(G,K,C,E), consistent(Ss,K).`,
    'Gera os quatro dígitos e verifica cada resultado com score.',
    [
      {
        name: 'Exemplo',
        code: 'main :- findall(K,solve([score([1,2,3,4],2,2)],K),L),sort(L,S),write_canonical(S),nl.',
        output: '[[1,2,4,3],[1,3,2,4],[1,4,3,2],[2,1,3,4],[3,2,1,4],[4,2,3,1]]',
      },
      {
        name: 'Repetição',
        code: 'main :- findall(K,solve([score([1,1,1,1],4,0)],K),L),write_canonical(L),nl.',
        output: '[[1,1,1,1]]',
      },
      {
        name: 'Incompatível',
        code: 'main :- findall(K,solve([score([1,1,1,1],4,0),score([1,1,1,1],0,0)],K),L),write_canonical(L),nl.',
        output: '[]',
      },
    ],
  ),
];
