import type { PrologQuestion } from './questions';

export const questions: PrologQuestion[] = [
  {
    id: 'mt2-games-binario',
    title: 'Representação binária',
    prompt:
      'Implementa `dec2bin(+Dec, -BinList, +N)`: representa um inteiro não negativo em exatamente `N` bits, com zeros à esquerda. Falha se não couber.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: '% dec2bin(Dec, BinList, N).',
      tests: [
        {
          name: 'Sete',
          code: 'main :- findall(X, (dec2bin(7,X,8)), Xs), write_canonical(Xs), nl.',
          output: '[[0,0,0,0,0,1,1,1]]',
        },
        {
          name: 'Não cabe',
          code: 'main :- findall(X, (dec2bin(1234,X,8)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
        {
          name: 'Zero bits',
          code: 'main :- findall(X, (dec2bin(0,X,0)), Xs), write_canonical(Xs), nl.',
          output: '[[]]',
        },
        {
          name: 'Negativo',
          code: 'main :- findall(X, (dec2bin(-1,X,8)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      'dec2bin(Dec, Bits, N) :- integer(Dec), integer(N), Dec >= 0, N >= 0, binary_digits(Dec,N,[],Bits).\nbinary_digits(0,0,Bits,Bits).\nbinary_digits(Dec,N,Acc,Bits) :- N > 0, Bit is Dec mod 2, Next is Dec div 2, N1 is N-1, binary_digits(Next,N1,[Bit|Acc],Bits).',
    reasoning:
      'Divide sucessivamente por dois e acumula os restos; ao fim de N posições o quociente tem de ser zero.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-games-inicializar',
    title: 'Preparar geração',
    prompt:
      'Implementa `initialize(+DecNumber, +Bits, +Padding, -List)`: converte o número em `Bits` bits e coloca `Padding` zeros em cada lado.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dec2bin(Dec, Bits, N) :- integer(Dec), integer(N), Dec >= 0, N >= 0, binary_digits(Dec,N,[],Bits).\nbinary_digits(0,0,Bits,Bits).\nbinary_digits(Dec,N,Acc,Bits) :- N > 0, Bit is Dec mod 2, Next is Dec div 2, N1 is N-1, binary_digits(Next,N1,[Bit|Acc],Bits).\n\n% initialize(DecNumber, Bits, Padding, List).',
      tests: [
        {
          name: 'Exemplo',
          code: 'main :- findall(X, (initialize(12,4,2,X)), Xs), write_canonical(Xs), nl.',
          output: '[[0,0,1,1,0,0,0,0]]',
        },
        {
          name: 'Sem margem',
          code: 'main :- findall(X, (initialize(3,2,0,X)), Xs), write_canonical(Xs), nl.',
          output: '[[1,1]]',
        },
        {
          name: 'Não cabe',
          code: 'main :- findall(X, (initialize(4,2,1,X)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      'dec2bin(Dec, Bits, N) :- integer(Dec), integer(N), Dec >= 0, N >= 0, binary_digits(Dec,N,[],Bits).\nbinary_digits(0,0,Bits,Bits).\nbinary_digits(Dec,N,Acc,Bits) :- N > 0, Bit is Dec mod 2, Next is Dec div 2, N1 is N-1, binary_digits(Next,N1,[Bit|Acc],Bits).\n\ninitialize(D,B,P,L) :- dec2bin(D,Middle,B), integer(P), P >= 0, length(Side,P), maplist(=(0),Side), append([Side,Middle,Side],L).',
    reasoning:
      'Cria duas margens iguais e concatena-as com a representação binária.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-games-imprimir',
    title: 'Imprimir uma geração',
    prompt:
      'Implementa `print_generation(+List)`: escreve `.` para 0, `M` para 1 e `|` no início e após cada grupo completo de oito bits. Termina com mudança de linha.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: '% print_generation(List).',
      tests: [
        {
          name: 'Byte',
          code: 'main :- print_generation([0,0,0,0,1,0,1,0]).',
          output: '|....M.M.|',
        },
        {
          name: 'Parcial',
          code: 'main :- print_generation([0,0,0,0,1,0,1,0,0,0,1,1]).',
          output: '|....M.M.|..MM',
        },
        {
          name: 'Vazia',
          code: 'main :- print_generation([]).',
          output: '|',
        },
      ],
    },
    solution:
      "print_generation(Bits) :- write('|'), print_bits(Bits,0), nl.\nprint_bits([], _).\nprint_bits([B|Bs], N) :- (B = 0 -> write('.') ; B = 1, write('M')), N1 is N+1, (N1 mod 8 =:= 0 -> write('|') ; true), print_bits(Bs,N1).",
    reasoning: 'Conta os bits impressos e coloca uma barra após cada oitavo.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-games-regra',
    title: 'Atualizar regra celular',
    prompt:
      'Implementa `update_rule(+Rule)` para um inteiro entre 0 e 255. Substitui os factos `rule(Left-Self-Right, State)` pelas oito combinações. O bit menos significativo corresponde a `0-0-0` e o mais significativo a `1-1-1`. Um valor fora do intervalo falha sem alterar as regras.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: ':- dynamic rule/2.\n\n% update_rule(Rule).',
      tests: [
        {
          name: 'Regra 10',
          code: 'main :- update_rule(10), findall(B,rule(_,B),Bs), write_canonical(Bs), nl.',
          output: '[0,1,0,1,0,0,0,0]',
        },
        {
          name: 'Limite',
          code: 'main :- update_rule(255), findall(B,rule(_,B),Bs), write_canonical(Bs), nl.',
          output: '[1,1,1,1,1,1,1,1]',
        },
        {
          name: 'Inválida',
          code: 'main :- findall(X, (update_rule(256), X=sim), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      ':- dynamic rule/2.\n\nupdate_rule(R) :- integer(R), between(0,255,R), retractall(rule(_,_)), forall(between(0,7,I), (L is I div 4, S is (I div 2) mod 2, Right is I mod 2, Bit is (R >> I) /\\ 1, assertz(rule(L-S-Right,Bit)))).',
    reasoning:
      'O índice binário dos três vizinhos seleciona o bit correspondente do número.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-games-geracao-seguinte',
    title: 'Calcular a geração seguinte',
    prompt:
      'Implementa `next_gen(+Previous, -Next)` aplicando `rule/2` a cada célula. Os vizinhos em falta nas extremidades são zero.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- dynamic rule/2.\nrule(0-0-0,0). rule(0-0-1,1). rule(0-1-0,0). rule(0-1-1,0).\nrule(1-0-0,1). rule(1-0-1,0). rule(1-1-0,1). rule(1-1-1,1).\n\n% next_gen(Previous, Next).',
      tests: [
        {
          name: 'Exemplo',
          code: 'main :- findall(X, (next_gen([0,0,1,0,0,0,1,0],X)), Xs), write_canonical(Xs), nl.',
          output: '[[0,1,0,1,0,1,0,1]]',
        },
        {
          name: 'Vazia',
          code: 'main :- findall(X, (next_gen([],X)), Xs), write_canonical(Xs), nl.',
          output: '[[]]',
        },
        {
          name: 'Uma célula',
          code: 'main :- findall(X, (next_gen([1],X)), Xs), write_canonical(Xs), nl.',
          output: '[[0]]',
        },
      ],
    },
    solution:
      ':- dynamic rule/2.\nrule(0-0-0,0). rule(0-0-1,1). rule(0-1-0,0). rule(0-1-1,0).\nrule(1-0-0,1). rule(1-0-1,0). rule(1-1-0,1). rule(1-1-1,1).\n\nnext_gen(Previous,Next) :- next_cells(0,Previous,Next).\nnext_cells(_,[],[]).\nnext_cells(Left,[Self],[New]) :- rule(Left-Self-0,New).\nnext_cells(Left,[Self,Right|Rest],[New|Tail]) :- rule(Left-Self-Right,New), next_cells(Self,[Right|Rest],Tail).',
    reasoning:
      'Passa a célula anterior como vizinho esquerdo e usa zero ao terminar.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-games-jogar',
    title: 'Simular gerações',
    prompt:
      'Implementa `play(+DecNumber, +Bits, +Padding, +Rule, +N)`. Inicializa o estado e as regras, depois imprime as primeiras `N` gerações; para `N = 1`, imprime apenas a inicial.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "dec2bin(Dec, Bits, N) :- integer(Dec), integer(N), Dec >= 0, N >= 0, binary_digits(Dec,N,[],Bits).\nbinary_digits(0,0,Bits,Bits).\nbinary_digits(Dec,N,Acc,Bits) :- N > 0, Bit is Dec mod 2, Next is Dec div 2, N1 is N-1, binary_digits(Next,N1,[Bit|Acc],Bits).\n:- dynamic rule/2.\nupdate_rule(R) :- integer(R), between(0,255,R), retractall(rule(_,_)), forall(between(0,7,I), (L is I div 4, S is (I div 2) mod 2, Right is I mod 2, Bit is (R >> I) /\\ 1, assertz(rule(L-S-Right,Bit)))).\nnext_gen(Previous,Next) :- next_cells(0,Previous,Next).\nnext_cells(_,[],[]).\nnext_cells(Left,[Self],[New]) :- rule(Left-Self-0,New).\nnext_cells(Left,[Self,Right|Rest],[New|Tail]) :- rule(Left-Self-Right,New), next_cells(Self,[Right|Rest],Tail).\nprint_generation(Bits) :- write('|'), print_bits(Bits,0), nl.\nprint_bits([], _).\nprint_bits([B|Bs], N) :- (B = 0 -> write('.') ; B = 1, write('M')), N1 is N+1, (N1 mod 8 =:= 0 -> write('|') ; true), print_bits(Bs,N1).\ninitialize(D,B,P,L) :- dec2bin(D,M,B), integer(P), P>=0, length(S,P), maplist(=(0),S), append([S,M,S],L).\n\n% play(DecNumber, Bits, Padding, Rule, N).",
      tests: [
        {
          name: 'Uma',
          code: 'main :- play(2,4,0,210,1).',
          output: '|..M.',
        },
        {
          name: 'Duas',
          code: 'main :- play(2,4,0,210,2).',
          output: '|..M.\n|.M.M',
        },
        {
          name: 'Zero',
          code: 'main :- play(2,4,0,210,0).',
          output: '',
        },
      ],
    },
    solution:
      "dec2bin(Dec, Bits, N) :- integer(Dec), integer(N), Dec >= 0, N >= 0, binary_digits(Dec,N,[],Bits).\nbinary_digits(0,0,Bits,Bits).\nbinary_digits(Dec,N,Acc,Bits) :- N > 0, Bit is Dec mod 2, Next is Dec div 2, N1 is N-1, binary_digits(Next,N1,[Bit|Acc],Bits).\n:- dynamic rule/2.\nupdate_rule(R) :- integer(R), between(0,255,R), retractall(rule(_,_)), forall(between(0,7,I), (L is I div 4, S is (I div 2) mod 2, Right is I mod 2, Bit is (R >> I) /\\ 1, assertz(rule(L-S-Right,Bit)))).\nnext_gen(Previous,Next) :- next_cells(0,Previous,Next).\nnext_cells(_,[],[]).\nnext_cells(Left,[Self],[New]) :- rule(Left-Self-0,New).\nnext_cells(Left,[Self,Right|Rest],[New|Tail]) :- rule(Left-Self-Right,New), next_cells(Self,[Right|Rest],Tail).\nprint_generation(Bits) :- write('|'), print_bits(Bits,0), nl.\nprint_bits([], _).\nprint_bits([B|Bs], N) :- (B = 0 -> write('.') ; B = 1, write('M')), N1 is N+1, (N1 mod 8 =:= 0 -> write('|') ; true), print_bits(Bs,N1).\ninitialize(D,B,P,L) :- dec2bin(D,M,B), integer(P), P>=0, length(S,P), maplist(=(0),S), append([S,M,S],L).\n\nplay(D,B,P,R,N) :- integer(N), N>=0, initialize(D,B,P,Initial), update_rule(R), play_generations(N,Initial).\nplay_generations(0,_).\nplay_generations(N,State) :- N>0, print_generation(State), N1 is N-1, (N1=:=0 -> true ; next_gen(State,Next), play_generations(N1,Next)).",
    reasoning:
      'Imprime o estado inicial e aplica as regras entre gerações sucessivas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-games-tamanho-circulo',
    title: 'Tamanho de um círculo',
    prompt:
      'Implementa `circle_size(+Person, ?Size)`, o número de pessoas no ciclo de ofertas que contém a pessoa.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "gives_gift_to(bernardete,'The Exchange',celestina).\ngives_gift_to(celestina,'The Brethren',eleuterio).\ngives_gift_to(eleuterio,'The Summons',felismina).\ngives_gift_to(felismina,'River God',juvenaldo).\ngives_gift_to(juvenaldo,'Seventh Scroll',leonilde).\ngives_gift_to(leonilde,'Sunbird',bernardete).\ngives_gift_to(marciliano,'Those in Peril',nivaldo).\ngives_gift_to(nivaldo,'Vicious Circle',sandrino).\ngives_gift_to(sandrino,'Predator',marciliano).\n\n% circle_size(Person, Size).",
      tests: [
        {
          name: 'Primeiro',
          code: 'main :- findall(X, (circle_size(bernardete,X)), Xs), write_canonical(Xs), nl.',
          output: '[6]',
        },
        {
          name: 'Segundo',
          code: 'main :- findall(X, (circle_size(marciliano,X)), Xs), write_canonical(Xs), nl.',
          output: '[3]',
        },
        {
          name: 'Desconhecida',
          code: 'main :- findall(X, (circle_size(outra,X)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      "gives_gift_to(bernardete,'The Exchange',celestina).\ngives_gift_to(celestina,'The Brethren',eleuterio).\ngives_gift_to(eleuterio,'The Summons',felismina).\ngives_gift_to(felismina,'River God',juvenaldo).\ngives_gift_to(juvenaldo,'Seventh Scroll',leonilde).\ngives_gift_to(leonilde,'Sunbird',bernardete).\ngives_gift_to(marciliano,'Those in Peril',nivaldo).\ngives_gift_to(nivaldo,'Vicious Circle',sandrino).\ngives_gift_to(sandrino,'Predator',marciliano).\n\ncircle(Person,People) :- gives_gift_to(Person,_,Next), circle_follow(Next,Person,[Person],People).\ncircle_follow(Start,Start,Acc,Acc).\ncircle_follow(P,Start,Acc,People) :- P \\= Start, \\+ memberchk(P,Acc), gives_gift_to(P,_,Next), circle_follow(Next,Start,[P|Acc],People).\ncircle_size(Person,Size) :- circle(Person,People), length(People,Size).",
    reasoning:
      'Segue cada destinatário até regressar ao ponto de partida e conta as pessoas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    context:
      'Cada pessoa oferece um livro ao destinatário indicado; cada ciclo fecha ao voltar à pessoa inicial.',
  },
  {
    id: 'mt2-games-maior-circulo',
    title: 'Maior círculo de ofertas',
    prompt:
      'Implementa `largest_circle(?People)`. Devolve cada círculo de tamanho máximo uma vez por retrocesso. A ordem das pessoas e dos círculos não importa.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "gives_gift_to(bernardete,'The Exchange',celestina).\ngives_gift_to(celestina,'The Brethren',eleuterio).\ngives_gift_to(eleuterio,'The Summons',felismina).\ngives_gift_to(felismina,'River God',juvenaldo).\ngives_gift_to(juvenaldo,'Seventh Scroll',leonilde).\ngives_gift_to(leonilde,'Sunbird',bernardete).\ngives_gift_to(marciliano,'Those in Peril',nivaldo).\ngives_gift_to(nivaldo,'Vicious Circle',sandrino).\ngives_gift_to(sandrino,'Predator',marciliano).\n\n% largest_circle(People).",
      tests: [
        {
          name: 'Maior',
          code: 'main :- findall(S,(largest_circle(P),sort(P,S)),Xs), sort(Xs,R), write_canonical(R), nl.',
          output:
            '[[bernardete,celestina,eleuterio,felismina,juvenaldo,leonilde]]',
        },
        {
          name: 'Tamanho',
          code: 'main :- findall(X, (largest_circle(P), length(P,X)), Xs), write_canonical(Xs), nl.',
          output: '[6]',
        },
      ],
    },
    solution:
      "gives_gift_to(bernardete,'The Exchange',celestina).\ngives_gift_to(celestina,'The Brethren',eleuterio).\ngives_gift_to(eleuterio,'The Summons',felismina).\ngives_gift_to(felismina,'River God',juvenaldo).\ngives_gift_to(juvenaldo,'Seventh Scroll',leonilde).\ngives_gift_to(leonilde,'Sunbird',bernardete).\ngives_gift_to(marciliano,'Those in Peril',nivaldo).\ngives_gift_to(nivaldo,'Vicious Circle',sandrino).\ngives_gift_to(sandrino,'Predator',marciliano).\n\ncircle(Person,People) :- gives_gift_to(Person,_,Next), circle_follow(Next,Person,[Person],People).\ncircle_follow(Start,Start,Acc,Acc).\ncircle_follow(P,Start,Acc,People) :- P \\= Start, \\+ memberchk(P,Acc), gives_gift_to(P,_,Next), circle_follow(Next,Start,[P|Acc],People).\nlargest_circle(People) :- setof(Size-Sorted, P^C^Gift^Recipient^(gives_gift_to(P,Gift,Recipient),circle(P,C),sort(C,Sorted),length(Sorted,Size)),Pairs), last(Pairs,Max-_), member(Max-People,Pairs).",
    reasoning:
      'Ordena cada ciclo para eliminar rotações, encontra o tamanho máximo e devolve todos os ciclos desse tamanho.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    context:
      'Cada pessoa oferece um livro ao destinatário indicado; cada ciclo fecha ao voltar à pessoa inicial.',
  },
];
