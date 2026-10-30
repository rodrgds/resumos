import type { PrologQuestion } from './questions';

const facts = `author(1,'John Grisham',1955,'USA').
author(2,'Wilbur Smith',1933,'Zambia').
author(3,'Stephen King',1947,'USA').
author(4,'Michael Crichton',1942,'USA').
book('The Firm',1,1991,432,['Legal thriller']).
book('The Client',1,1993,422,['Legal thriller']).
book('The Runaway Jury',1,1996,414,['Legal thriller']).
book('The Exchange',1,2023,338,['Legal thriller']).
book('Carrie',3,1974,199,['Horror']).
book('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).
book('Under the Dome',3,2009,1074,['Science fiction','Political']).
book('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).
book('Jurassic Park',4,1990,399,['Science fiction']).
book('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).
book('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).`;
const reads = `read_book(bernardete,'The Firm').
read_book(bernardete,'The Client').
read_book(clarice,'The Firm').
read_book(clarice,'Carrie').
read_book(deirdre,'The Firm').
read_book(deirdre,'Next').`;
const age = `author_wrote_book_at_age(A,T,Age) :- author(I,A,B,_), book(T,I,Y,_,_), Age is Y-B.`;
const link = '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética';
type Test = { name: string; code: string; output: string };
function exercise(
  id: string,
  title: string,
  prompt: string,
  given: string,
  solution: string,
  reasoning: string,
  tests: Test[],
): PrologQuestion {
  return {
    id: `mt2-books-${id}`,
    title,
    prompt,
    context: given.includes(facts)
      ? 'Os factos usam author(ID, Nome, AnoNascimento, País) e book(Título, IDAutor, Ano, Páginas, Géneros).'
      : undefined,
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
const noSets = ' Não uses findall/3, setof/3, bagof/3 nem bibliotecas SICStus.';
function choice(
  id: string,
  title: string,
  prompt: string,
  definitions: string,
  options: string[],
  correct: number,
  reasoning: string,
): PrologQuestion {
  return {
    id: `mt2-books-${id}`,
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
            : 'Esta alternativa não descreve o comportamento apresentado.',
      })),
    },
    solution: options[correct],
    reasoning,
    explanation: link,
  };
}
const rotator = `rotate(C,I,R,N) :- nth1(I,C,D,Rest), length(D,L), L>0, K is R mod L, length(A,K), append(A,B,D), append(B,A,E), nth1(I,N,E,Rest).`;
const matcher = `matches([],[]).
matches([[H|_]|Ds],[H|Ks]) :- matches(Ds,Ks).`;
const mover = `move(C,N) :- nth1(I,C,D), length(D,L), Max is L-1, between(1,Max,R), rotate(C,I,R,N).`;
export const questions: PrologQuestion[] = [
  exercise(
    'genre',
    'Géneros de um livro',
    'Define `book_genre(?Title, ?Genre)`, relacionando um título com cada um dos seus géneros.' +
      noSets,
    facts,
    `book_genre(T,G) :- book(T,_,_,_,Gs), member(G,Gs).`,
    'A pesquisa de member percorre os géneros por retrocesso.',
    [
      {
        name: 'Vários géneros',
        code: "main :- findall(G,book_genre('The Shining',G),L),write_canonical(L),nl.",
        output: "['Gothic novel','Horror','Psychological horror']",
      },
      {
        name: 'Títulos por género',
        code: "main :- findall(T,book_genre(T,'Political'),L),write_canonical(L),nl.",
        output: "['Under the Dome']",
      },
    ],
  ),
  exercise(
    'age',
    'Idade ao publicar',
    'Define `author_wrote_book_at_age(?Author, ?Title, ?Age)`. A idade é o ano de publicação menos o ano de nascimento. Por exemplo, The Client foi publicado quando John Grisham tinha 38 anos.' +
      noSets,
    facts,
    age,
    'O identificador liga o autor ao livro; a subtração usa os dois anos.',
    [
      {
        name: 'Idade',
        code: "main :- findall(A,author_wrote_book_at_age('John Grisham','The Client',A),L),write_canonical(L),nl.",
        output: '[38]',
      },
      {
        name: 'Autor sem livros',
        code: "main :- findall(T,author_wrote_book_at_age('Wilbur Smith',T,_),L),write_canonical(L),nl.",
        output: '[]',
      },
    ],
  ),
  exercise(
    'youngest',
    'Autor mais jovem',
    'Define `youngest_author(?Author)`, que relaciona cada autor que publicou o primeiro livro na menor idade. Devolve empates por retrocesso. Neste conjunto, o resultado é Stephen King.' +
      noSets,
    `${facts}\n${age}`,
    String.raw`youngest_author(A) :- author_wrote_book_at_age(A,_,N), \+ (author_wrote_book_at_age(_,_,M), M < N).`,
    'Escolhe uma idade para a qual não existe publicação mais precoce.',
    [
      {
        name: 'Autores',
        code: 'main :- findall(A,youngest_author(A),L),write_canonical(L),nl.',
        output: "['Stephen King']",
      },
      {
        name: 'Outro autor',
        code: "main :- (youngest_author('John Grisham')->write(sim);write(nao)),nl.",
        output: 'nao',
      },
    ],
  ),
  exercise(
    'print-genres',
    'Imprimir géneros',
    'Define `genres(+Title)` sem recursão. Imprime os géneros do livro, um por linha e pela ordem dos factos; deve sempre ter sucesso, mesmo para um título ausente. The Firm imprime Legal thriller; The Shining imprime Gothic novel, Horror e Psychological horror.' +
      noSets,
    facts,
    `genres(T) :- book(T,_,_,_,Gs), member(G,Gs), write(G), nl, fail.\ngenres(_).`,
    'A falha força o próximo género; a segunda cláusula termina com sucesso.',
    [
      {
        name: 'Ordem',
        code: "main :- genres('The Shining').",
        output: 'Gothic novel\nHorror\nPsychological horror',
      },
      {
        name: 'Ausente',
        code: "main :- genres('Missing'),write(ok),nl.",
        output: 'ok',
      },
    ],
  ),
  exercise(
    'filter-args',
    'Selecionar argumentos',
    "Define `filterArgs(+Term, +Indexes, ?NewTerm)`. Os índices são inteiros positivos por ordem crescente, a contar de 1. Conserva o functor e apenas os argumentos indicados. Exemplos: `book('The Firm',1,1991,432,['Legal thriller'])` com `[1,3,5]` dá `book('The Firm',1991,['Legal thriller'])`; `author(1,'John Grisham',1955,'USA')` com `[2,3]` dá `author('John Grisham',1955)`." +
      noSets,
    '',
    `filterArgs(T,Is,R) :- T =.. [F|_], args_at(Is,T,As), R =.. [F|As].\nargs_at([],_,[]).\nargs_at([I|Is],T,[A|As]) :- arg(I,T,A), args_at(Is,T,As).`,
    'Desmonta o termo, recolhe os argumentos por posição e reconstrói-o.',
    [
      {
        name: 'Seleção',
        code: 'main :- filterArgs(book(a,1,1991,432,[x]),[1,3,5],R),write_canonical(R),nl.',
        output: 'book(a,1991,[x])',
      },
      {
        name: 'Sem argumentos',
        code: 'main :- filterArgs(f(a,b),[],R),write_canonical(R),nl.',
        output: 'f',
      },
      {
        name: 'Índice inválido',
        code: 'main :- (filterArgs(f(a),[2],_)->write(sim);write(nao)),nl.',
        output: 'nao',
      },
    ],
  ),
  exercise(
    'diverse',
    'Livros com mais géneros',
    "Define `diverse_books(-Books)` com todos os títulos que têm o maior número de géneros; qualquer ordem é aceite. Neste conjunto, o resultado é `['Prey']`.",
    facts,
    String.raw`diverse_books(Bs) :- findall(T,(book(T,_,_,_,Gs),length(Gs,N),\+ (book(_,_,_,_,Hs),length(Hs,M),M>N)),Bs).`,
    'Recolhe os livros para os quais não há outro com mais géneros.',
    [
      {
        name: 'Máximo',
        code: 'main :- diverse_books(L),sort(L,S),write_canonical(S),nl.',
        output: "['Prey']",
      },
      {
        name: 'Uma solução',
        code: 'main :- findall(L,diverse_books(L),Ls),length(Ls,N),write(N),nl.',
        output: '1',
      },
    ],
  ),
  exercise(
    'countries',
    'Autores por país',
    'Define `country_authors(?Country, ?Authors)`, relacionando cada país de nascimento com a lista de todos os seus autores. Para USA são John Grisham, Stephen King e Michael Crichton; para Zambia, Wilbur Smith.',
    facts,
    `country_authors(C,As) :- bagof(A,I^Y^author(I,A,Y,C),As).`,
    'bagof agrupa por país e as variáveis existenciais não criam grupos separados.',
    [
      {
        name: 'Países',
        code: 'main :- findall(C-As,country_authors(C,As),L),sort(L,S),write_canonical(S),nl.',
        output:
          "[-('USA',['John Grisham','Stephen King','Michael Crichton']),-('Zambia',['Wilbur Smith'])]",
      },
      {
        name: 'Ausente',
        code: "main :- findall(A,country_authors('Portugal',A),L),write_canonical(L),nl.",
        output: '[]',
      },
    ],
  ),
  exercise(
    'popular',
    'Livros populares',
    'Um livro é popular quando pelo menos 75% dos membros do clube o leram. Define `popular(?Title)`. The Client falha e The Firm é popular.',
    `${facts}\n${reads}`,
    `popular(T) :- setof(P,B^read_book(P,B),All), length(All,N), setof(P,read_book(P,T),Readers), length(Readers,K), 4*K >= 3*N.`,
    'Conta pessoas distintas no clube e para cada título, comparando a proporção sem arredondar.',
    [
      {
        name: 'Todos',
        code: 'main :- findall(T,popular(T),L),write_canonical(L),nl.',
        output: "['The Firm']",
      },
      {
        name: 'Não popular',
        code: "main :- (popular('The Client')->write(sim);write(nao)),nl.",
        output: 'nao',
      },
    ],
  ),
  choice(
    'map',
    'Aplicação a listas',
    'A que predicado de listas é equivalente `predX/4`?',
    `predX(_, [], [], []).
predX(R, [A|B], [C|D], [E|F]) :- S =.. [R,A,C,E], S, predX(R,B,D,F).`,
    [
      '`select/4`',
      '`scanlist/4`',
      '`cumlist/4`',
      '`maplist/4`',
      '`map_product/4`',
    ],
    3,
    'A cada passo chama R com os elementos correspondentes das três listas.',
  ),
  choice(
    'red-cut',
    'Corte na comparação',
    '`similarity(+Title1,+Title2,?Similarity)` dá um valor entre 0 e 1, maior para livros mais semelhantes. O predicado abaixo escolhe entre C1 e C2 o mais semelhante a Book. Que afirmação sobre o corte é verdadeira?',
    `most_similar(Book,C1,C2,C1) :- similarity(Book,C1,S1), similarity(Book,C2,S2), S1 >= S2, !.
most_similar(Book,C1,C2,C2) :- similarity(Book,C1,S1), similarity(Book,C2,S2), S2 >= S1.`,
    [
      'É necessário conhecer a implementação de similarity/3 para classificar o corte.',
      'O corte pode ser vermelho ou verde consoante os resultados de similarity/3.',
      'O corte não é vermelho nem verde e pode ser retirado sem efeitos.',
      'O corte é vermelho porque removê-lo altera os resultados de most_similar/4.',
      'O corte é verde porque removê-lo só afeta o desempenho.',
    ],
    3,
    'Num empate, sem corte ambas as cláusulas podem produzir resultados distintos.',
  ),
  choice(
    'retract',
    'Retirar uma cláusula',
    'Considera `predY/2` com várias cláusulas. O que faz uma chamada `predZ(predY,A,B)`?',
    String.raw`predZ(R,A,C) :- T =.. [R,_,_], retract((T :- S)), E =.. [R,A,C], E, asserta((T :- S)).`,
    [
      'Substitui os argumentos da primeira cláusula de predY/2 pelos argumentos de predZ/3.',
      'Altera a ordem das cláusulas de predY/2.',
      'Altera a ordem dos objetivos de cada cláusula de predY/2.',
      'Simula uma chamada a predY/2 sem considerar a primeira cláusula.',
      'Nada, qualquer chamada a predZ/3 falha sempre.',
    ],
    3,
    'Retira temporariamente a primeira cláusula, chama o predicado e volta a inseri-la após sucesso. Se a chamada falhar, a reinserção não é executada.',
  ),
  exercise(
    'operators',
    'Operadores para livros',
    "Declara os operadores e define o código necessário para queries como `Author wrote 'The Firm' at Age`, com `wrote` acima de `at` na árvore sintática. A query devolve John Grisham e 36.",
    `${facts}\n${age}`,
    `:- op(730,xfx,wrote).
:- op(720,xfx,at).
A wrote T at N :- author_wrote_book_at_age(A,T,N).`,
    'A precedência numérica maior coloca wrote na raiz; at agrupa o livro e a idade.',
    [
      {
        name: 'Livro',
        code: "main :- findall(A-N, (A wrote 'The Firm' at N),L),write_canonical(L),nl.",
        output: "[-('John Grisham',36)]",
      },
      {
        name: 'Idade',
        code: "main :- findall(T, ('Stephen King' wrote T at 27),L),write_canonical(L),nl.",
        output: "['Carrie']",
      },
    ],
  ),
  exercise(
    'rotate',
    'Rodar um disco',
    'Um cadeado é uma lista de discos, cada um representado por uma lista de igual comprimento. Por exemplo, cinco discos alfabéticos podem começar respetivamente em a, p, p, l e e; cada lista segue o alfabeto circular até ao elemento anterior ao inicial. Define `rotate(+List,+Position,+Rotations,?NewList)`: roda o disco na posição (a contar de 1) para a esquerda por Rotations posições. Aceita rotações negativas ou superiores ao comprimento; falha para posição inválida. Para `[[3,6,8],[5,0,7],[2,1,4]]`, rodar a posição 2 uma vez dá `[[3,6,8],[0,7,5],[2,1,4]]`, a posição 3 duas vezes dá `[[3,6,8],[5,0,7],[4,2,1]]`, a posição 1 por -1 dá `[[8,3,6],[5,0,7],[2,1,4]]` e por 4 dá `[[6,8,3],[5,0,7],[2,1,4]]`.',
    '',
    rotator,
    'O resto da divisão normaliza a rotação; divide o disco e troca as duas partes.',
    [
      {
        name: 'Negativa',
        code: 'main :- rotate([[3,6,8],[5,0,7],[2,1,4]],1,-1,R),write_canonical(R),nl.',
        output: '[[8,3,6],[5,0,7],[2,1,4]]',
      },
      {
        name: 'Grande',
        code: 'main :- rotate([[3,6,8],[5,0,7]],1,4,R),write_canonical(R),nl.',
        output: '[[6,8,3],[5,0,7]]',
      },
      {
        name: 'Posição inválida',
        code: 'main :- (rotate([[1,2]],2,1,_)->write(sim);write(nao)),nl.',
        output: 'nao',
      },
    ],
  ),
  exercise(
    'matches',
    'Alinhar o código',
    'Define `matches(+List,+Code)`: cada elemento do código deve coincidir com o primeiro elemento do disco correspondente e o número de discos deve ser igual ao comprimento do código. `[[3,6,8],[5,0,7],[2,1,4]]` coincide com `[3,5,2]`, mas não com `[6,0,1]` nem `[3,5,2,1]`.',
    '',
    matcher,
    'Percorre as duas listas em paralelo, exigindo que terminem juntas.',
    [
      {
        name: 'Alinhado',
        code: 'main :- (matches([[3,6,8],[5,0,7],[2,1,4]],[3,5,2])->write(sim);write(nao)),nl.',
        output: 'sim',
      },
      {
        name: 'Comprimento',
        code: 'main :- (matches([[1]],[1,2])->write(sim);write(nao)),nl.',
        output: 'nao',
      },
      {
        name: 'Diferente',
        code: 'main :- (matches([[1,2]],[2])->write(sim);write(nao)),nl.',
        output: 'nao',
      },
    ],
  ),
  exercise(
    'move',
    'Movimentos do cadeado',
    'Define `move(+Initial,-Final)` para gerar por retrocesso todas as rotações não nulas de um único disco. Os discos têm o mesmo comprimento, que pode diferir do número de discos. Para `[[3,6,8],[5,0,7],[2,1,4]]` obtêm-se `[[6,8,3],[5,0,7],[2,1,4]]`, `[[8,3,6],[5,0,7],[2,1,4]]`, `[[3,6,8],[0,7,5],[2,1,4]]`, `[[3,6,8],[7,5,0],[2,1,4]]`, `[[3,6,8],[5,0,7],[1,4,2]]` e `[[3,6,8],[5,0,7],[4,2,1]]`.',
    rotator,
    `move(C,N) :- nth1(I,C,D), length(D,L), Max is L-1, between(1,Max,R), rotate(C,I,R,N).`,
    'Para cada disco, gera rotações de 1 até ao comprimento menos um.',
    [
      {
        name: 'Todos os movimentos',
        code: 'main :- findall(F,move([[1,2,3],[4,5,6]],F),L),write_canonical(L),nl.',
        output:
          '[[[2,3,1],[4,5,6]],[[3,1,2],[4,5,6]],[[1,2,3],[5,6,4]],[[1,2,3],[6,4,5]]]',
      },
      {
        name: 'Disco unitário',
        code: 'main :- findall(F,move([[1]],F),L),write_canonical(L),nl.',
        output: '[]',
      },
    ],
  ),
  exercise(
    'path',
    'Resolver o cadeado',
    'Define `solve(+Code,+Key,-States)`, com o estado inicial, estados intermédios e final, sem repetições. Key contém o primeiro elemento pretendido de cada disco. Privilegia caminhos curtos. Para `[6,0,4]`, um caminho é `[[[3,6,8],[5,0,7],[2,1,4]],[[6,8,3],[5,0,7],[2,1,4]],[[6,8,3],[0,7,5],[2,1,4]],[[6,8,3],[0,7,5],[4,2,1]]]`. Por exemplo, para `[[3,6,8],[5,0,7],[2,1,4]]` e `[6,5,1]`, um caminho passa por `[[6,8,3],[5,0,7],[2,1,4]]` antes de chegar a `[[6,8,3],[5,0,7],[1,4,2]]`.',
    `${rotator}\n${matcher}\n${mover}`,
    String.raw`solve(C,K,States) :- bfs([[C]],K,States).
bfs([[C|Path]|_],K,States) :- matches(C,K), !, reverse([C|Path],States).
bfs([[C|Path]|Queue],K,States) :- findall([N,C|Path],(move(C,N), \+ member(N,[C|Path])),Next), append(Queue,Next,Q), bfs(Q,K,States).`,
    'A pesquisa em largura explora primeiro caminhos mais curtos e impede ciclos em cada caminho.',
    [
      {
        name: 'Já alinhado',
        code: 'main :- solve([[1,2]],[1],S),write_canonical(S),nl.',
        output: '[[[1,2]]]',
      },
      {
        name: 'Um movimento',
        code: 'main :- solve([[1,2]],[2],S),write_canonical(S),nl.',
        output: '[[[1,2]],[[2,1]]]',
      },
      {
        name: 'Impossível',
        code: 'main :- (solve([[1,2]],[3],_)->write(sim);write(nao)),nl.',
        output: 'nao',
      },
    ],
  ),
];
