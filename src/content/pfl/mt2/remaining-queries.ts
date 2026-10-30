import type { PrologQuestion } from './questions';

const link = '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética';
const dishes = `dish(pizza,2200,[cheese-300,tomato-350]).
dish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).
dish(garlic_bread,1600,[cheese-50,garlic-200]).`;
const edges = `edge(g1,br,o). edge(g1,br,ni). edge(g1,o,ni). edge(g1,o,c). edge(g1,o,h). edge(g1,h,c). edge(g1,h,n). edge(g1,n,he). edge(g1,c,he).
edge(g2,br,h). edge(g2,br,ni). edge(g2,h,ni). edge(g2,h,o). edge(g2,h,c). edge(g2,o,c). edge(g2,o,n). edge(g2,n,he). edge(g2,c,he). edge(g2,cl,he).`;
const code = (
  id: string,
  title: string,
  prompt: string,
  starter: string,
  solution: string,
  tests: { name: string; code: string; output: string }[],
  reasoning: string,
): PrologQuestion => ({
  id,
  title,
  prompt,
  answer: { kind: 'code', language: 'prolog', starter, tests },
  solution,
  reasoning,
  explanation: link,
});
const choice = (
  id: string,
  title: string,
  prompt: string,
  options: string[],
  correct: number,
  reasoning: string,
): PrologQuestion => ({
  id,
  title,
  prompt,
  answer: {
    kind: 'choice',
    options: options.map((text, i) => ({
      text,
      correct: i === correct,
      explanation:
        i === correct
          ? reasoning
          : 'Esta opção não corresponde ao comportamento descrito.',
    })),
  },
  solution: options[correct],
  reasoning,
  explanation: link,
});
export const questions: PrologQuestion[] = [
  choice(
    'mt2-colecoes-equivalencia',
    'Recolher soluções',
    'Para `predX/3`, considera A: `findall(X,predX(1,X,_),L)`, B: `setof(X,predX(1,X,_),L)`, C: `setof(X,Y^predX(1,X,Y),L)`, D: `bagof(X,predX(1,X,_),L)` e E: `bagof(X,Y^predX(1,X,Y),L)`. Qual par recolhe a mesma lista quando existe pelo menos uma solução?',
    ['Só A e E', 'Só C e E', 'Só B e D', 'A, B e D', 'Só A e C'],
    0,
    'A e E preservam ordem e repetidos sem agrupar pela terceira variável. Sem soluções, `findall` devolve `[]`, enquanto `bagof` falha, pelo que não são equivalentes nesse caso.',
  ),
  code(
    'mt2-contar-pratos-ingrediente',
    'Contar pratos com ingrediente',
    'Implementa `count_dishes_with_ingredient(+Ingredient, ?N)`. Conta os pratos que usam o ingrediente, sem `findall`, `bagof`, `setof` nem bibliotecas. Cada ingrediente ocorre no máximo uma vez por prato.',
    dishes + '\n\n% count_dishes_with_ingredient(Ingredient, N).',
    dishes +
      `
:- dynamic ingredient_counter/1.
count_dishes_with_ingredient(I,N) :-
    retractall(ingredient_counter(_)), assertz(ingredient_counter(0)),
    (dish(_,_,Items), has_ingredient(I,Items),
     retract(ingredient_counter(A)), B is A+1, assertz(ingredient_counter(B)), fail
    ; retract(ingredient_counter(Result)), N=Result).
has_ingredient(I,[I-_|_]) :- !.
has_ingredient(I,[_|Rest]) :- has_ingredient(I,Rest).`,
    [
      {
        name: 'Tomate',
        code: 'main :- count_dishes_with_ingredient(tomato,N), writeln(N).',
        output: '2',
      },
      {
        name: 'Ausente',
        code: 'main :- count_dishes_with_ingredient(rice,N), writeln(N).',
        output: '0',
      },
      {
        name: 'Valor dado',
        code: 'main :- (count_dishes_with_ingredient(garlic,2) -> writeln(sim); writeln(nao)).',
        output: 'sim',
      },
    ],
    'Percorre as cláusulas da base e acumula uma unidade por prato com o ingrediente.',
  ),
  {
    id: 'mt2-predx-efeito',
    title: 'Consumir para um prato',
    definitions: `${dishes}\n\npredX(S,D,NewS) :- dish(D,_,L), predY(L,S,NewS).\npredY([],L,L).\npredY([I-Gr|Is],S,NewS) :- !, consume_ingredient(S,I,Gr,S1), predY(Is,S1,NewS).`,
    prompt:
      'Explica os argumentos e o efeito de `predX/3`, incluindo o caso de stock insuficiente. `consume_ingredient/4` retira a quantidade pedida e falha se não houver stock suficiente.',
    answer: {
      kind: 'self',
      checklist: [
        'Identifiquei a lista de stocks, o prato e a lista resultante.',
        'Expliquei a falha quando algum ingrediente é insuficiente.',
      ],
    },
    solution:
      'Recebe os pares ingrediente-quantidade e o nome de um prato, devolvendo o stock após consumir os ingredientes. Falha se algum for insuficiente.',
    reasoning:
      '`predY/3` percorre os ingredientes do prato e passa o stock atualizado à chamada seguinte.',
    explanation: link,
  },
  choice(
    'mt2-predy-corte',
    'Corte na recursão',
    'Considera `predY([],L,L).` e `predY([I-Gr|Is],S,N) :- !, consume_ingredient(S,I,Gr,S1), predY(Is,S1,N).` O corte é verde?',
    ['Verdadeiro', 'Falso'],
    0,
    'As cabeças distinguem lista vazia de lista não vazia. Com uma lista própria de entrada, o corte não elimina soluções; apenas evita alternativas incompatíveis.',
  ),
  {
    id: 'mt2-predz-aridade',
    title: 'Aridade de um termo',
    prompt:
      'Explica numa frase o efeito de `predZ :- read(X), X =.. [_|B], length(B,N), write(N), nl.`.',
    answer: {
      kind: 'self',
      checklist: [
        'Indiquei a leitura de um termo e a impressão da sua aridade.',
      ],
    },
    solution:
      'Lê um termo e escreve a sua aridade, seguida de mudança de linha.',
    reasoning:
      '`=..` produz uma lista com o functor seguido dos argumentos; o comprimento da cauda é a aridade.',
    explanation: link,
  },
  choice(
    'mt2-arvore-raiz',
    'Ramos da pesquisa',
    'Na consulta `member(X,[a,b,c,d,e]), !, member(Y,[1,2,3,4])`, quantos filhos sobrevivem na raiz da árvore de pesquisa após aplicar o corte?',
    ['3', '1', '5', '2', '0'],
    1,
    'Após o corte só sobrevive o ramo em que `X=a`. Antes de podar, o número de ramos depende da representação da árvore e da definição de `member/2`.',
  ),
  choice(
    'mt2-unificacoes-consulta',
    'Unificações e corte',
    'Na consulta `member(X,[a,b,c,d,e]), !, member(Y,[1,2,3,4])`, quantas unificações de `X` e `Y` com elementos das listas ocorrem ao pedir todas as soluções?',
    ['1', '9', '4', '20', '5'],
    4,
    'O corte fixa `X=a`; depois `Y` unifica com os quatro elementos, num total de cinco unificações de valores.',
  ),
  code(
    'mt2-arestas-comuns',
    'Arestas comuns',
    'Implementa `common_edges(+G1,+G2,?L)` para grafos não dirigidos. Cada facto `edge(G,A,B)` representa uma aresta; aceita-se qualquer ordem e orientação. Para `g1` e `g2` há seis arestas comuns.',
    edges + '\n\n% common_edges(G1,G2,L).',
    edges +
      `
undirected(G,A,B) :- edge(G,A,B); edge(G,B,A).
common_edges(G,H,L) :- findall(A-B,(edge(G,X,Y),undirected(H,X,Y),sort([X,Y],[A,B])),Pairs), sort(Pairs,L).`,
    [
      {
        name: 'Interseção',
        code: 'main :- common_edges(g1,g2,L), length(L,N), writeln(N).',
        output: '6',
      },
      {
        name: 'Mesmo grafo',
        code: 'main :- common_edges(g1,g1,L), length(L,N), writeln(N).',
        output: '9',
      },
      {
        name: 'Sem arestas',
        code: 'main :- common_edges(g1,inexistente,L), writeln(L).',
        output: '[]',
      },
    ],
    'Normaliza cada par de extremos antes de eliminar duplicados. A consulta inversa reconhece arestas guardadas na orientação oposta.',
  ),
  code(
    'mt2-subgrafos-comuns',
    'Componentes comuns',
    'Implementa `common_subgraphs(+G1,+G2,?Subgraphs)`: devolve as componentes conexas formadas pelas arestas comuns dos grafos não dirigidos. Qualquer ordem é aceite. No exemplo são `[[br,ni],[c,h,he,n,o]]`.',
    edges + '\n\n% common_subgraphs(G1,G2,Subgraphs).',
    edges +
      `
common_edge(G,H,A,B) :- edge(G,X,Y), (edge(H,X,Y);edge(H,Y,X)), (A=X,B=Y;A=Y,B=X).
reach(G,H,X,Seen,Out) :- findall(Y,(member(Z,Seen),common_edge(G,H,Z,Y),\\+ memberchk(Y,Seen)),Ys), append(Seen,Ys,All), sort(All,Next), (Next=Seen -> Out=Seen ; reach(G,H,X,Next,Out)).
components(_,_,[],[]).
components(G,H,[X|Xs],[C|Cs]) :- reach(G,H,X,[X],C), subtract(Xs,C,Rest), components(G,H,Rest,Cs).
common_subgraphs(G,H,Cs) :- findall(X,common_edge(G,H,X,_),Vs), sort(Vs,Sorted), components(G,H,Sorted,Cs).`,
    [
      {
        name: 'Componentes',
        code: 'main :- common_subgraphs(g1,g2,C), writeln(C).',
        output: '[[br,ni],[c,h,he,n,o]]',
      },
      {
        name: 'Sem arestas comuns',
        code: 'main :- common_subgraphs(g1,nenhum,C), writeln(C).',
        output: '[]',
      },
      {
        name: 'Mesmo grafo',
        code: 'main :- common_subgraphs(g1,g1,C), writeln(C).',
        output: '[[br,c,h,he,n,ni,o]]',
      },
    ],
    'Forma o grafo das arestas comuns e percorre cada componente uma só vez.',
  ),
];
