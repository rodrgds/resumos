import type { PrologQuestion } from './questions';
const link = '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética';
const base = `:- use_module(library(clpfd)).
restricao_produto([], _, 1).
restricao_produto([Pos|Ps], Nums, Prod) :- nth1(Pos, Nums, Num), Prod #= Prod1 * Num, restricao_produto(Ps, Nums, Prod1).
fatores(Nums, Prod, NPosicoes, NPares, Posicoes) :- length(Posicoes,NPosicoes), all_distinct(Posicoes), restricao_produto(Posicoes,Nums,Prod), restricao_pares(Posicoes,Nums,NPares), restricao_remover_simetrias(Posicoes), labeling([],Posicoes).`;
const graph =
  'Domínios: A = {-1,0,1,3}, B = {2,4,6}, C = {4,6,8}, D = {4,6,8}. Restrições unárias: B > 1, C >= 3, D <= 8. Arestas: A < B, A < C, B < C e C ≠ D.';
const choice = (
  id: string,
  title: string,
  prompt: string,
  options: string[],
  correct: number,
  reasoning: string,
  context?: string,
): PrologQuestion => ({
  id,
  title,
  prompt,
  ...(context?.startsWith(':-') ? { definitions: context } : { context }),
  answer: {
    kind: 'choice',
    options: options.map((text, i) => ({
      text,
      correct: i === correct,
      explanation:
        i === correct
          ? reasoning
          : 'Esta opção não satisfaz as condições indicadas.',
    })),
  },
  solution: options[correct],
  reasoning,
  explanation: link,
});
const code = (
  id: string,
  title: string,
  prompt: string,
  starter: string,
  solution: string,
  tests: { name: string; code: string; output: string }[],
  reasoning: string,
  context?: string,
): PrologQuestion => ({
  id,
  title,
  prompt,
  ...(context?.startsWith(':-') ? { definitions: context } : { context }),
  answer: { kind: 'code', language: 'prolog', starter, tests },
  solution,
  reasoning,
  explanation: link,
});
export const questions: PrologQuestion[] = [
  choice(
    'mt2-fatores-erro',
    'Erro na restrição de produto',
    'Em que fase está o erro do programa? A seleção de posições é feita antes de as etiquetar.',
    [
      'Definição do domínio das variáveis de decisão',
      'Definição da pesquisa no espaço de estados (`labeling`)',
      'Definição do número de variáveis de decisão',
      'Definição das restrições',
    ],
    3,
    '`nth1/3` enumera posições em vez de impor a relação de domínio finito entre posição e valor.',
    base,
  ),
  code(
    'mt2-fatores-corrigir',
    'Corrigir seleção por posição',
    'Corrige uma linha de `restricao_produto/3` para relacionar uma posição de domínio finito com o elemento da lista. Mantém as restantes linhas.',
    base,
    `:- use_module(library(clpfd)).
restricao_produto([], _, 1).
restricao_produto([Pos|Ps], Nums, Prod) :- element(Pos, Nums, Num), Prod #= Prod1 * Num, restricao_produto(Ps, Nums, Prod1).
fatores(Nums, Prod, NPosicoes, NPares, Posicoes) :- length(Posicoes,NPosicoes), all_distinct(Posicoes), restricao_produto(Posicoes,Nums,Prod), restricao_pares(Posicoes,Nums,NPares), restricao_remover_simetrias(Posicoes), labeling([],Posicoes).
restricao_pares([],_,0).
restricao_pares([P|Ps],Nums,N) :- element(P,Nums,X), B #<==> (X mod 2 #= 0), N #= B+R, restricao_pares(Ps,Nums,R).
restricao_remover_simetrias([]).
restricao_remover_simetrias([_]).
restricao_remover_simetrias([A,B|Xs]) :- A #< B, restricao_remover_simetrias([B|Xs]).`,
    [
      {
        name: 'Produto',
        code: 'main :- restricao_produto([P],[2,3],3), labeling([],[P]), writeln(P).',
        output: '2',
      },
      {
        name: 'Vazio',
        code: 'main :- restricao_produto([],[],P), writeln(P).',
        output: '1',
      },
      {
        name: 'Impossível',
        code: 'main :- (restricao_produto([_],[2,3],5) -> writeln(sim); writeln(nao)).',
        output: 'nao',
      },
    ],
    '`element/3` restringe a posição e o valor sem os etiquetar previamente.',
  ),
  code(
    'mt2-fatores-pares',
    'Contar fatores pares',
    'Implementa `restricao_pares(+Posicoes,+Nums,?NPares)` com restrições, contando os valores pares nas posições selecionadas.',
    ':- use_module(library(clpfd)).\n\n% restricao_pares(Posicoes,Nums,NPares).',
    `:- use_module(library(clpfd)).
restricao_pares([],_,0).
restricao_pares([P|Ps],Nums,N) :- element(P,Nums,X), B #<==> (X mod 2 #= 0), N #= B+R, restricao_pares(Ps,Nums,R).`,
    [
      {
        name: 'Pares',
        code: 'main :- restricao_pares([1,3],[2,3,4],N), writeln(N).',
        output: '2',
      },
      {
        name: 'Vazio',
        code: 'main :- restricao_pares([],[],N), writeln(N).',
        output: '0',
      },
      {
        name: 'Escolha',
        code: 'main :- findall(P,(restricao_pares([P],[2,3],1),labeling([],[P])),L), writeln(L).',
        output: '[1]',
      },
    ],
    'Uma variável booleana reifica a paridade de cada elemento; a soma conta os pares.',
  ),
  code(
    'mt2-fatores-simetria',
    'Eliminar permutações',
    'Implementa `restricao_remover_simetrias(+Posicoes)` impondo ordem crescente às posições para evitar permutações da mesma seleção.',
    ':- use_module(library(clpfd)).\n\n% restricao_remover_simetrias(Posicoes).',
    `:- use_module(library(clpfd)).
restricao_remover_simetrias([]).
restricao_remover_simetrias([_]).
restricao_remover_simetrias([A,B|Xs]) :- A #< B, restricao_remover_simetrias([B|Xs]).`,
    [
      {
        name: 'Ordenado',
        code: 'main :- (restricao_remover_simetrias([1,2,3])->writeln(sim);writeln(nao)).',
        output: 'sim',
      },
      {
        name: 'Permutação',
        code: 'main :- (restricao_remover_simetrias([2,1])->writeln(sim);writeln(nao)).',
        output: 'nao',
      },
      {
        name: 'Vazio',
        code: 'main :- (restricao_remover_simetrias([])->writeln(sim);writeln(nao)).',
        output: 'sim',
      },
    ],
    'A ordem estrita deixa uma representação para cada conjunto de posições.',
  ),
  code(
    'mt2-pratos-quantidades',
    'Quantidades de pratos',
    'Implementa `pratos(+PrecosUnitarios,+Total,+QuantidadeMaxima,-Quantidades)`. As quantidades são não negativas, têm máximo exatamente igual a `QuantidadeMaxima` e os valores positivos são distintos. Para `[10,22,9,8]`, total 132 e máximo 9, as soluções são `[6,0,0,9]` e `[9,0,2,3]`.',
    ':- use_module(library(clpfd)).\n\n% pratos(Precos,Total,Max,Quantidades).',
    `:- use_module(library(clpfd)).
distintos([]).
distintos([X|Xs]) :- maplist(diferente(X),Xs), distintos(Xs).
diferente(X,Y) :- (X #= 0)  #\\/ (Y #= 0)  #\\/ (X  #\\= Y).
pratos(P,T,M,Q) :- same_length(P,Q), Q ins 0..M, distintos(Q), sum_max(Q,M), scalar_product(P,Q,#=,T), labeling([],Q).
sum_max(Q,M) :- maplist(igual(M),Q,Bs), sum(Bs,#>=,1).
igual(M,X,B) :- B #<==> (X #= M).`,
    [
      {
        name: 'Exemplo',
        code: 'main :- findall(Q,pratos([10,22,9,8],132,9,Q),L), writeln(L).',
        output: '[[6,0,0,9],[9,0,2,3]]',
      },
      {
        name: 'Impossível',
        code: 'main :- (pratos([2],3,2,_)->writeln(sim);writeln(nao)).',
        output: 'nao',
      },
      {
        name: 'Zeros',
        code: 'main :- pratos([1,2],0,0,Q), writeln(Q).',
        output: '[0,0]',
      },
    ],
    'A soma ponderada fixa o total; a disjunção permite repetir zero e impede iguais positivos.',
  ),
  code(
    'mt2-autocarros-otimos',
    'Distribuir grupos por autocarros',
    'Implementa `autocarros(+Grupos,+Autocarros,-IDsAutocarros,-NAutocarrosUsados)`. Cada grupo fica inteiro num autocarro identificado pela posição, as capacidades são respeitadas e o número usado é mínimo. Para `[3,5,7,4,3]` e `[11,14,10,20]`, o mínimo é 2.',
    ':- use_module(library(clpfd)).\n\n% autocarros(Grupos,Autocarros,IDs,N).',
    `:- use_module(library(clpfd)).
autocarros([],_,[],0).
autocarros(Grupos, Caps, IDs, N) :- Grupos=[_|_], same_length(Grupos,IDs), length(Caps,K), K>0, IDs ins 1..K, capacidades(Caps,1,Grupos,IDs,Usados), sum(Usados,#=,N), once(labeling([min(N)],IDs)).
capacidades([],_,_,_,[]).
capacidades([Cap|Cs],I,G,IDs,[U|Us]) :- maplist(no_bus(I),IDs,Bs), scalar_product(G,Bs,#=<,Cap), sum(Bs,#=,Count), U #<==> (Count #> 0), J is I+1, capacidades(Cs,J,G,IDs,Us).
no_bus(I,X,B) :- B #<==> (X #= I).`,
    [
      {
        name: 'Mínimo',
        code: 'main :- autocarros([3,5,7,4,3],[11,14,10,20],_,N), writeln(N).',
        output: '2',
      },
      {
        name: 'Sem capacidade',
        code: 'main :- (autocarros([5],[4],_,_)->writeln(sim);writeln(nao)).',
        output: 'nao',
      },
      {
        name: 'Sem grupos',
        code: 'main :- autocarros([],[],IDs,N), write_canonical(result(IDs,N)), nl.',
        output: 'result([],0)',
      },
    ],
    'Cada indicador associa um grupo a um autocarro; a soma ponderada limita a carga e a etiquetagem minimiza o número usado.',
  ),
  choice(
    'mt2-grafo-consistencia',
    'Consistência de um grafo',
    'Classifica o grafo de restrições.',
    [
      '1-consistente, 2-consistente e 3-consistente',
      '1-consistente e 2-consistente, mas não 3-consistente',
      '1-consistente, mas não 2-consistente ou 3-consistente',
      'Nem 1-consistente, nem 2-consistente, nem 3-consistente',
      '1-consistente e 3-consistente, mas não 2-consistente',
    ],
    1,
    'Todos os valores satisfazem as restrições unárias e têm suporte nas arestas. Porém, A=3 e C=4 não se estendem a B, pois teria de estar entre 3 e 4.',
    graph,
  ),
  choice(
    'mt2-grafo-labeling',
    'Primeira etiqueta',
    'Com `labeling([ff, step, down], [A,B,C,D])` em SICStus, qual é a primeira etiqueta parcial?',
    ['{C - 8}', '{A - 3}', '{C - 4}', '{D - 8}', '{B - 6}'],
    4,
    '`ff` escolhe o primeiro domínio de tamanho mínimo, B; `down` tenta primeiro o maior valor, 6.',
    graph,
  ),
  choice(
    'mt2-clpfd-capacidades',
    'Opções de pesquisa',
    'Qual ação não é possível com a biblioteca CLP(FD) de SICStus?',
    [
      'Escolher aleatoriamente a próxima variável a etiquetar.',
      'Definir duas estratégias de pesquisa distintas para cada metade das variáveis de decisão.',
      'Definir um tempo máximo para a fase de pesquisa.',
      'Escolher aleatoriamente o valor da próxima variável a etiquetar.',
      'Definir o número de variáveis de decisão como uma variável de domínio.',
    ],
    4,
    'A estrutura e o número das variáveis têm de estar definidos ao construir o modelo; os seus valores podem ter domínios.',
  ),
  choice(
    'mt2-restricoes-afirmacoes',
    'Propriedades da programação por restrições',
    'Qual afirmação está correta?',
    [
      'Constraint & Generate tem sempre desempenho temporal igual ou superior a Generate & Test.',
      'Todas as restantes afirmações estão erradas.',
      'Múltiplas soluções implicam simetria.',
      '`all_distinct/1` é mais restritiva do que `circuit/1`.',
      'Os sistemas de programação baseados em restrições seguem um paradigma de programação em lógica.',
    ],
    1,
    'Não há garantia universal de desempenho, soluções distintas não têm de ser simétricas, `circuit` impõe mais do que distinção e restrições também existem fora da programação em lógica.',
  ),
];

const constraintFigure = {
  label: 'Grafo de restrições',
  alt: 'A tem domínio {-1,0,1,3}; B, {2,4,6}; C e D, {4,6,8}. A<B, A<C, B<C, C diferente de D; B>1, C>=3 e D<=8.',
  svg: '<svg xmlns="http://www.w3.org/2000/svg" width="620" height="290" viewBox="0 0 620 290"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M110 90H310M110 90V225M110 225L310 90M110 225H310"/><circle cx="110" cy="90" r="25" fill="var(--surface)"/><circle cx="310" cy="90" r="25" fill="var(--surface)"/><circle cx="110" cy="225" r="25" fill="var(--surface)"/><circle cx="310" cy="225" r="25" fill="var(--surface)"/></g><g fill="currentColor" text-anchor="middle" font-size="15" font-family="sans-serif"><text x="110" y="96">A</text><text x="310" y="96">B</text><text x="110" y="231">C</text><text x="310" y="231">D</text><text x="110" y="35">{-1,0,1,3}</text><text x="310" y="35">{2,4,6}</text><text x="110" y="276">{4,6,8}</text><text x="310" y="276">{4,6,8}</text><text x="210" y="80">A #&lt; B</text><text x="55" y="162">A #&lt; C</text><text x="235" y="168">B #&lt; C</text><text x="210" y="217">C #\\= D</text><text x="400" y="95">B #&gt; 1</text><text x="450" y="230">D #=&lt; 8</text><text x="450" y="276">C #&gt;= 3</text></g></svg>',
};
for (const question of questions) {
  if (
    question.id === 'mt2-grafo-consistencia' ||
    question.id === 'mt2-grafo-labeling'
  )
    question.figures = [constraintFigure];
}
