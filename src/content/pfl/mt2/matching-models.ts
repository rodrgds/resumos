import type { PrologQuestion } from './questions';

export const questions: PrologQuestion[] = [
  {
    id: 'mt2-matching-generate-sums',
    title: 'Gerar listas com somas adjacentes',
    prompt:
      'Explique o programa para N positivo. `between(+Inf,+Sup,-X)` enumera os inteiros do intervalo fechado.',
    answer: {
      kind: 'self',
      checklist: [
        'Identifica os comprimentos N e N−1 e o domínio 1..M.',
        'Explica que as duas listas não partilham nem repetem valores.',
        'Relaciona cada valor de L2 com uma soma adjacente de L1.',
      ],
    },
    solution: '',
    reasoning:
      '`fill/3` escolhe sem reposição os elementos das duas listas a partir do mesmo conjunto `1..M`. `L2` contém, pela ordem, as somas de pares consecutivos de `L1`. Essas somas também têm de estar em `1..M` e ser distintas de todos os outros valores escolhidos.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      'prog1(N,M,L1,L2) :-\n    length(L1,N), N1 is N-1, length(L2,N1),\n    findall(E,between(1,M,E),LE), fill(L1,LE,LE1), fill(L2,LE1,_), check(L1,L2).\nfill([],LE,LE).\nfill([X|Xs],LE,Rest) :- select(X,LE,LE1), fill(Xs,LE1,Rest).\ncheck([_],[]).\ncheck([A,B|Rest],[X|Xs]) :- A+B =:= X, check([B|Rest],Xs).',
  },
  {
    id: 'mt2-matching-search-space',
    title: 'Contar atribuições de domínio',
    prompt:
      'No problema das duas listas, `L1` tem N variáveis e `L2` tem N−1, cada uma no domínio `1..M`. Qual é a dimensão do produto cartesiano dos domínios antes de aplicar as restrições?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'a. $2MN$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Há 2N−1 variáveis e M escolhas por variável. Esta contagem antecede as restrições de valores distintos e de somas; não é a contagem das permutações que `fill/3` consegue gerar.',
        },
        {
          text: 'b. $M^{L1}+M^{L2}$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Há 2N−1 variáveis e M escolhas por variável. Esta contagem antecede as restrições de valores distintos e de somas; não é a contagem das permutações que `fill/3` consegue gerar.',
        },
        {
          text: 'c. $NM$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Há 2N−1 variáveis e M escolhas por variável. Esta contagem antecede as restrições de valores distintos e de somas; não é a contagem das permutações que `fill/3` consegue gerar.',
        },
        {
          text: 'd. $(2N-1)^M$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Há 2N−1 variáveis e M escolhas por variável. Esta contagem antecede as restrições de valores distintos e de somas; não é a contagem das permutações que `fill/3` consegue gerar.',
        },
        {
          text: 'e. [Não Responder]',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Há 2N−1 variáveis e M escolhas por variável. Esta contagem antecede as restrições de valores distintos e de somas; não é a contagem das permutações que `fill/3` consegue gerar.',
        },
        {
          text: 'f. $M^{2N-1}$',
          correct: true,
          explanation:
            'Há 2N−1 variáveis e M escolhas por variável. Esta contagem antecede as restrições de valores distintos e de somas; não é a contagem das permutações que `fill/3` consegue gerar.',
        },
      ],
    },
    solution: '',
    reasoning:
      'Multiplica M uma vez por variável, em vez de somar os espaços de cada lista.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      'prog1(N,M,L1,L2) :-\n    length(L1,N), N1 is N-1, length(L2,N1),\n    findall(E,between(1,M,E),LE), fill(L1,LE,LE1), fill(L2,LE1,_), check(L1,L2).\nfill([],LE,LE).\nfill([X|Xs],LE,Rest) :- select(X,LE,LE1), fill(Xs,LE1,Rest).\ncheck([_],[]).\ncheck([A,B|Rest],[X|Xs]) :- A+B =:= X, check([B|Rest],Xs).',
  },
  {
    id: 'mt2-matching-correct-model',
    title: 'Corrigir restrições e eliminar reflexões',
    prompt:
      'Implemente `prog2(+N,+M,-L1,-L2)` em CLP(FD), equivalente ao programa apresentado. Corrija a comparação aritmética sobre variáveis, impeça valores repetidos nas duas listas e elimine a simetria de inverter ambas. Para `N > 1`, conserve o representante com o primeiro valor de `L1` menor que o último; para `N = 1`, conserve todos os valores.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: ':- use_module(library(clpfd)).\n% Define prog2/4.',
      tests: [
        {
          name: 'Duas variáveis e uma soma',
          code: 'main :- findall(result(A,B),prog2(2,5,A,B),Rs), sort(Rs,S), write_canonical(S), nl.',
          output:
            '[result([1,2],[3]),result([1,3],[4]),result([1,4],[5]),result([2,3],[5])]',
        },
        {
          name: 'Um elemento',
          code: 'main :- findall(result(A,B),prog2(1,3,A,B),Rs), sort(Rs,S), write_canonical(S), nl.',
          output: '[result([1],[]),result([2],[]),result([3],[])]',
        },
        {
          name: 'Domínio insuficiente',
          code: 'main :- (prog2(2,2,_,_) -> write(true) ; write(false)), nl.',
          output: 'false',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\nprog2(N,M,L1,L2) :-\n    N >= 1, length(L1,N), N1 is N-1, length(L2,N1),\n    L1 ins 1..M, L2 ins 1..M, append(L1,L2,All), all_distinct(All),\n    sums(L1,L2),\n    (N > 1 -> L1=[First|_], last(L1,Last), First #< Last ; true),\n    labeling([],L1).\nsums([_],[]).\nsums([A,B|Rest],[S|Ss]) :- A+B #= S, sums([B|Rest],Ss).',
    reasoning:
      'Usa `#=` para as somas antes da pesquisa e `all_distinct/1` sobre a concatenação das listas. Etiquetar `L1` determina `L2` através das somas. A comparação entre os extremos conserva uma orientação de cada reflexão.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      'prog1(N,M,L1,L2) :-\n    length(L1,N), N1 is N-1, length(L2,N1),\n    findall(E,between(1,M,E),LE), fill(L1,LE,LE1), fill(L2,LE1,_), check(L1,L2).\nfill([],LE,LE).\nfill([X|Xs],LE,Rest) :- select(X,LE,LE1), fill(Xs,LE1,Rest).\ncheck([_],[]).\ncheck([A,B|Rest],[X|Xs]) :- A+B =:= X, check([B|Rest],Xs).',
  },
  {
    id: 'mt2-matching-gym',
    title: 'Emparelhar todas as pessoas',
    prompt:
      'Implemente `gym_pairs(+MenHeights,+WomenHeights,+Delta,-Pairs)` em CLP(FD). As listas têm o mesmo tamanho. Cada pessoa aparece num par, o homem não pode ser mais baixo e a diferença tem de ser estritamente inferior a `Delta`. Use índices a partir de 1 e evite permutações da mesma lista de pares. Exemplos: `[95,78,67,84]` com `[65,83,75,80]` e `Delta=10` não tem solução; com `[65,83,75,86]` obtém `[1-4,2-3,3-1,4-2]`; com `[65,77,75,86]` há também `[1-4,2-2,3-1,4-3]`.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: ':- use_module(library(clpfd)).\n% Define gym_pairs/4.',
      tests: [
        {
          name: 'Impossível',
          code: 'main :- (gym_pairs([95,78,67,84],[65,83,75,80],10,_) -> write(true) ; write(false)), nl.',
          output: 'false',
        },
        {
          name: 'Solução única',
          code: 'main :- findall(S,(gym_pairs([95,78,67,84],[65,83,75,86],10,P),sort(P,S)),Ss), msort(Ss,R), write_canonical(R), nl.',
          output: '[[-(1,4),-(2,3),-(3,1),-(4,2)]]',
        },
        {
          name: 'Duas combinações',
          code: 'main :- findall(S,(gym_pairs([95,78,67,84],[65,77,75,86],10,P),sort(P,S)),Ss), msort(Ss,R), write_canonical(R), nl.',
          output:
            '[[-(1,4),-(2,2),-(3,1),-(4,3)],[-(1,4),-(2,3),-(3,1),-(4,2)]]',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\ngym_pairs(Men,Women,Delta,Pairs) :-\n    same_length(Men,Women), length(Women,N), same_length(Men,Vars),\n    Vars ins 1..N, all_distinct(Vars),\n    gym_heights(Men,Women,Delta,Vars), labeling([],Vars), indexed_pairs(Vars,1,Pairs).\ngym_heights([],_,_,[]).\ngym_heights([H|Hs],Women,D,[I|Is]) :-\n    element(I,Women,W), H #>= W, H-W #< D, gym_heights(Hs,Women,D,Is).\nindexed_pairs([],_,[]).\nindexed_pairs([W|Ws],M,[M-W|Ps]) :- M1 is M+1, indexed_pairs(Ws,M1,Ps).',
    reasoning:
      'Fixa a ordem dos homens e escolhe uma permutação dos índices das mulheres. `element/3` obtém a altura e as restrições rejeitam pares incompatíveis antes da pesquisa.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-matching-optimal',
    title: 'Maximizar pares possíveis',
    prompt:
      'Implemente `optimal_skating_pairs(+MenHeights,+WomenHeights,+Delta,-Pairs)` em CLP(FD). As listas podem ter tamanhos diferentes e algumas pessoas podem ficar sem par. Maximize o número de pares, sem repetir pessoas: o homem não pode ser mais baixo e a diferença deve ser inferior a `Delta`. Para `[95,78,67,84]`, `[65,83,75,80]` e 10, uma solução ótima é `[2-3,3-1,4-2]`. Para `[95,78,67,84,65,90,77]` e a mesma lista de mulheres, há quatro pares, por exemplo `[4-4,5-1,6-2,7-3]`. Trocando as listas, há quatro, por exemplo `[1-5,2-2,3-3,4-7]`. Se a primeira mulher tiver altura 55, o ótimo passa a três: `[4-4,6-2,7-3]`; no caso trocado `[2-2,3-3,4-7]`. Qualquer emparelhamento ótimo válido é aceite.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- use_module(library(clpfd)).\n% Define optimal_skating_pairs/4.',
      tests: [
        {
          name: 'Três pares',
          code: 'valid_pairs(Men,Women,D,Ps) :-\n    findall(I,member(I-_,Ps),Is), sort(Is,SI), same_length(Is,SI),\n    findall(J,member(_-J,Ps),Js), sort(Js,SJ), same_length(Js,SJ),\n    forall(member(I-J,Ps),(nth1(I,Men,H),nth1(J,Women,W),H>=W,H-W<D)).\nmain :- optimal_skating_pairs([95,78,67,84],[65,83,75,80],10,P), (length(P,3),valid_pairs([95,78,67,84],[65,83,75,80],10,P) -> write_canonical(valid(3)) ; write_canonical(invalid(P))), nl.',
          output: 'valid(3)',
        },
        {
          name: 'Listas de tamanhos diferentes',
          code: 'valid_pairs(Men,Women,D,Ps) :-\n    findall(I,member(I-_,Ps),Is), sort(Is,SI), same_length(Is,SI),\n    findall(J,member(_-J,Ps),Js), sort(Js,SJ), same_length(Js,SJ),\n    forall(member(I-J,Ps),(nth1(I,Men,H),nth1(J,Women,W),H>=W,H-W<D)).\nmain :- optimal_skating_pairs([95,78,67,84,65,90,77],[65,83,75,80],10,P), (length(P,4),valid_pairs([95,78,67,84,65,90,77],[65,83,75,80],10,P) -> write_canonical(valid(4)) ; write_canonical(invalid(P))), nl.',
          output: 'valid(4)',
        },
        {
          name: 'Sem candidatos',
          code: 'main :- optimal_skating_pairs([60],[80],10,P), write_canonical(P), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\noptimal_skating_pairs(Men,Women,Delta,Pairs) :-\n    length(Women,N), same_length(Men,Vars), Vars ins 0..N,\n    skating_heights(Men,[0|Women],Delta,Vars), distinct_nonzero(Vars),\n    maplist(matched,Vars,Bs), sum(Bs,#=,Count),\n    once(labeling([max(Count)],Vars)), selected_pairs(Vars,1,Pairs).\nskating_heights([],_,_,[]).\nskating_heights([H|Hs],Women,D,[V|Vs]) :-\n    I #= V+1, element(I,Women,W),\n    (V #> 0) #==> ((H #>= W) #/\\ (H-W #< D)),\n    skating_heights(Hs,Women,D,Vs).\ndistinct_nonzero([]).\ndistinct_nonzero([V|Vs]) :- maplist(compatible(V),Vs), distinct_nonzero(Vs).\ncompatible(X,Y) :- (X #= 0) #\\/ (Y #= 0) #\\/ (X #\\= Y).\nmatched(V,B) :- B #<==> (V #> 0).\nselected_pairs([],_,[]).\nselected_pairs([0|Vs],I,Ps) :- !, J is I+1, selected_pairs(Vs,J,Ps).\nselected_pairs([W|Vs],I,[I-W|Ps]) :- J is I+1, selected_pairs(Vs,J,Ps).',
    reasoning:
      'O índice zero representa um homem sem par. Só os índices não nulos têm de ser distintos. Materializa-se a presença de cada par e maximiza-se a soma dessas presenças antes de apresentar uma solução ótima.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
];
