import type { PrologQuestion } from './questions';

export const questions: PrologQuestion[] = [
  {
    id: 'mt2-constraints-generate-test',
    title: 'Permutações em ziguezague',
    prompt: 'Explique o que faz o programa e comente a sua eficiência.',
    answer: {
      kind: 'self',
      checklist: [
        'Identifica a permutação e a alternância entre máximos e mínimos locais.',
        'Explica o custo de gerar antes de verificar.',
        'Reconhece que o caso base aceita listas com dois elementos, não listas vazias ou singulares.',
      ],
    },
    solution: '',
    reasoning:
      '`gen/2` enumera permutações da lista. `test/1` exige que cada triplo consecutivo tenha o elemento do meio estritamente maior ou estritamente menor do que os vizinhos. Para N elementos distintos podem ser geradas N! permutações, com verificação linear de cada uma. A abordagem gera muitas candidatas que só depois rejeita.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      'p1(L1,L2) :- gen(L1,L2), test(L2).\ngen([],[]).\ngen(L1,[X|L2]) :- select(X,L1,L3), gen(L3,L2).\ntest([_,_]).\ntest([X1,X2,X3|Xs]) :-\n    (X1 < X2, X2 > X3 ; X1 > X2, X2 < X3),\n    test([X2,X3|Xs]).',
  },
  {
    id: 'mt2-constraints-labeling-order',
    title: 'Colocar restrições antes da pesquisa',
    prompt:
      'Porque é que p2/2 não constitui uma modelação correta em programação em lógica com restrições?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'a. As variáveis de domínio estão a ser instanciadas antes da fase de pesquisa.',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. nth1/3 enumera posições concretas antes de `labeling/2`. Além disso, `test/1` usa comparações aritméticas depois da pesquisa, em vez de publicar restrições antecipadamente. Não faltam domínios a índices que já ficaram instanciados.',
        },
        {
          text: 'b. [Não Responder]',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. nth1/3 enumera posições concretas antes de `labeling/2`. Além disso, `test/1` usa comparações aritméticas depois da pesquisa, em vez de publicar restrições antecipadamente. Não faltam domínios a índices que já ficaram instanciados.',
        },
        {
          text: 'c. Nem todas as restrições foram colocadas antes da fase da pesquisa.',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. nth1/3 enumera posições concretas antes de `labeling/2`. Além disso, `test/1` usa comparações aritméticas depois da pesquisa, em vez de publicar restrições antecipadamente. Não faltam domínios a índices que já ficaram instanciados.',
        },
        {
          text: 'd. Não é possível etiquetar `Is`, pois estas variáveis não têm domínio definido, e nem todas as restrições foram colocadas antes da fase da pesquisa.',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. nth1/3 enumera posições concretas antes de `labeling/2`. Além disso, `test/1` usa comparações aritméticas depois da pesquisa, em vez de publicar restrições antecipadamente. Não faltam domínios a índices que já ficaram instanciados.',
        },
        {
          text: 'e. As variáveis de domínio estão a ser instanciadas antes da fase da pesquisa e nem todas as restrições foram colocadas antes da fase da pesquisa.',
          correct: true,
          explanation:
            'nth1/3 enumera posições concretas antes de `labeling/2`. Além disso, `test/1` usa comparações aritméticas depois da pesquisa, em vez de publicar restrições antecipadamente. Não faltam domínios a índices que já ficaram instanciados.',
        },
        {
          text: 'f. Não é possível etiquetar `Is`, pois estas variáveis não têm domínio definido.',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. nth1/3 enumera posições concretas antes de `labeling/2`. Além disso, `test/1` usa comparações aritméticas depois da pesquisa, em vez de publicar restrições antecipadamente. Não faltam domínios a índices que já ficaram instanciados.',
        },
      ],
    },
    solution: '',
    reasoning:
      'É preciso representar a escolha das posições por variáveis de domínio e publicar a alternância antes de `labeling/2`.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      ':- use_module(library(clpfd)).\np2(L1,L2) :-\n    length(L1,N), length(L2,N),\n    pos(L1,L2,Is), all_distinct(Is),\n    labeling([],Is), test(L2).\npos([],_,[]).\npos([X|Xs],L2,[I|Is]) :- nth1(I,L2,X), pos(Xs,L2,Is).\ntest([_,_]).\ntest([X1,X2,X3|Xs]) :-\n    (X1 < X2, X2 > X3 ; X1 > X2, X2 < X3),\n    test([X2,X3|Xs]).',
  },
  {
    id: 'mt2-constraints-zigzag',
    title: 'Modelar o ziguezague com CLP(FD)',
    prompt:
      'Corrija `p2(+L1,-L2)` para gerar as mesmas permutações em ziguezague, usando restrições antes da pesquisa. Considere uma lista de inteiros com pelo menos dois elementos; os valores podem repetir-se.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- use_module(library(clpfd)).\n% Define p2/2 e os auxiliares necessários.',
      tests: [
        {
          name: 'Três valores',
          code: 'main :- findall(L,p2([1,2,3],L),Ls), sort(Ls,S), write_canonical(S), nl.',
          output: '[[1,3,2],[2,1,3],[2,3,1],[3,1,2]]',
        },
        {
          name: 'Dois valores',
          code: 'main :- findall(L,p2([1,2],L),Ls), sort(Ls,S), write_canonical(S), nl.',
          output: '[[1,2],[2,1]]',
        },
        {
          name: 'Valores repetidos',
          code: 'main :- findall(L,p2([1,1,2],L),Ls), sort(Ls,S), write_canonical(S), nl.',
          output: '[[1,2,1]]',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\np2(L1,L2) :-\n    length(L1,N), N >= 2, length(L2,N),\n    length(Is,N), Is ins 1..N, all_distinct(Is),\n    positions(Is,L1,L2), zigzag_fd(L2), labeling([],Is).\npositions([],_,[]).\npositions([I|Is],Source,[X|Xs]) :-\n    element(I,Source,X), positions(Is,Source,Xs).\nzigzag_fd([_,_]).\nzigzag_fd([A,B,C|Rest]) :-\n    ((A #< B) #/\\ (B #> C)) #\\/ ((A #> B) #/\\ (B #< C)),\n    zigzag_fd([B,C|Rest]).',
    reasoning:
      'As posições são distintas, mas os valores não precisam de o ser. `element/3` liga as posições aos valores; as comparações reificadas impõem a alternância antes de etiquetar.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      ':- use_module(library(clpfd)).\np2(L1,L2) :-\n    length(L1,N), length(L2,N),\n    pos(L1,L2,Is), all_distinct(Is),\n    labeling([],Is), test(L2).\npos([],_,[]).\npos([X|Xs],L2,[I|Is]) :- nth1(I,L2,X), pos(Xs,L2,Is).\ntest([_,_]).\ntest([X1,X2,X3|Xs]) :-\n    (X1 < X2, X2 > X3 ; X1 > X2, X2 < X3),\n    test([X2,X3|Xs]).',
  },
  {
    id: 'mt2-constraints-recipes',
    title: 'Escolher quatro receitas',
    prompt:
      'Implemente `receitas(+NOvos,+TempoMax,+OvosPorReceita,+TempoPorReceita,-OvosUsados,-Receitas)` com CLP(FD). Escolha quatro receitas diferentes que respeitem os ovos disponíveis e o tempo total, maximizando os ovos usados. `Receitas` contém índices, a partir de 1. Para ovos `[6,4,12,20,6]` e tempos `[20,50,10,20,15]`, com 30 ovos e 100 minutos, a escolha é `[1,2,3,5]`, usando 28 ovos; com 50 ovos, é `[1,3,4,5]`, usando 44.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: ':- use_module(library(clpfd)).\n% Define receitas/6.',
      tests: [
        {
          name: 'Limite de ovos',
          code: 'main :- receitas(30,100,[6,4,12,20,6],[20,50,10,20,15],U,R), sort(R,S), write_canonical(result(U,S)), nl.',
          output: 'result(28,[1,2,3,5])',
        },
        {
          name: 'Melhor combinação',
          code: 'main :- receitas(50,100,[6,4,12,20,6],[20,50,10,20,15],U,R), sort(R,S), write_canonical(result(U,S)), nl.',
          output: 'result(44,[1,3,4,5])',
        },
        {
          name: 'Receitas insuficientes',
          code: 'main :- (receitas(10,10,[1,2,3],[1,1,1],_,_) -> write(true) ; write(false)), nl.',
          output: 'false',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\nreceitas(NOvos,TempoMax,Ovos,Tempos,Usados,Receitas) :-\n    same_length(Ovos,Tempos), length(Ovos,N), N >= 4,\n    length(Receitas,4), Receitas ins 1..N, chain(Receitas,#<),\n    elements(Receitas,Ovos,Escolhidos), elements(Receitas,Tempos,Duracoes),\n    sum(Escolhidos,#=,Usados), Usados #=< NOvos,\n    sum(Duracoes,#=<,TempoMax), once(labeling([max(Usados)],Receitas)).\nelements([],_,[]).\nelements([I|Is],Xs,[X|Rest]) :- element(I,Xs,X), elements(Is,Xs,Rest).',
    reasoning:
      'Os quatro índices crescentes eliminam permutações da mesma escolha. `element/3` obtém os recursos, `sum/3` impõe os limites e a pesquisa maximiza os ovos usados.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-constraints-cutting',
    title: 'Distribuir cortes por pranchas',
    prompt:
      'Implemente `corta(+Pranchas,+Prateleiras,-PranchasSelecionadas)` com CLP(FD). Cada lista contém comprimentos; cada prateleira deve caber inteira numa única prancha e a soma dos cortes numa prancha não pode exceder o seu comprimento. A lista de saída indica a prancha de cada prateleira. Para `[100,45,70]` e `[12,50,14,8,10,90,24]`, as soluções são `[2,3,3,2,1,1,2]` e `[3,3,2,3,1,1,2]`.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: ':- use_module(library(clpfd)).\n% Define corta/3.',
      tests: [
        {
          name: 'Todas as distribuições',
          code: 'main :- findall(S,corta([100,45,70],[12,50,14,8,10,90,24],S),Ss), sort(Ss,R), write_canonical(R), nl.',
          output: '[[2,3,3,2,1,1,2],[3,3,2,3,1,1,2]]',
        },
        {
          name: 'Separar duas peças',
          code: 'main :- findall(S,corta([5,5],[3,3],S),Ss), sort(Ss,R), write_canonical(R), nl.',
          output: '[[1,2],[2,1]]',
        },
        {
          name: 'Sem peças',
          code: 'main :- corta([5],[],S), write_canonical(S), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\ncorta(Pranchas,Prateleiras,Selecionadas) :-\n    length(Pranchas,N), same_length(Prateleiras,Selecionadas),\n    Selecionadas ins 1..N,\n    board_limits(Pranchas,1,Prateleiras,Selecionadas),\n    labeling([],Selecionadas).\nboard_limits([],_,_,_).\nboard_limits([Cap|Caps],I,Sizes,Vars) :-\n    maplist(on_board(I),Vars,Bits), scalar_product(Sizes,Bits,#=<,Cap),\n    J is I+1, board_limits(Caps,J,Sizes,Vars).\non_board(I,V,B) :- B #<==> (V #= I).',
    reasoning:
      'Uma variável por prateleira escolhe a prancha. Para cada prancha, materializam-se as igualdades entre índices e usa-se um produto escalar para somar os comprimentos atribuídos.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
];
