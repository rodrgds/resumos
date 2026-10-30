import type { PrologQuestion } from './questions';

export const questions: PrologQuestion[] = [
  {
    id: 'mt2-films-twins',
    title: 'Personagens gémeas',
    prompt:
      'Define `plays_twins(?Actor, ?Movie)`, verdadeiro quando o ator interpreta pelo menos duas personagens diferentes no mesmo filme ou série.',
    context:
      'Os factos `by(Character, Movie, Actor)` associam personagens, filmes ou séries e atores. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\n% Define o predicado pedido.\n',
      tests: [
        {
          name: 'Encontrar',
          code: 'main :- findall(A-M, plays_twins(A,M), L), write_canonical(L), nl.',
          output: '[-(lisaKudrow,friends),-(lisaKudrow,friends)]',
        },
        {
          name: 'Ausente',
          code: 'main :- findall(x, plays_twins(benAffleck,daredevil), L), write_canonical(L), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\nplays_twins(A, M) :- by(C1, M, A), by(C2, M, A), C1 \\= C2.',
    reasoning:
      'Relaciona os factos pelos campos pedidos, preservando as condições e os resultados distintos.',
    explanation: '/cadeiras/pfl/solucoes-estruturas-prolog/#escolher-a-recolha',
  },
  {
    id: 'mt2-films-actor-movies',
    title: 'Filmes distintos por ator',
    prompt:
      'Define `actor_movies(+Actor, -Movies)`, a lista de filmes e séries distintos em que o ator participa. A ordem não é relevante.',
    context:
      'Os factos `by(Character, Movie, Actor)` associam personagens, filmes ou séries e atores. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\n% Define o predicado pedido.\n',
      tests: [
        {
          name: 'Sem duplicados',
          code: 'main :- actor_movies(lisaKudrow,L), msort(L,S), write_canonical(S), nl.',
          output: '[friends]',
        },
        {
          name: 'Ator ausente',
          code: 'main :- actor_movies(nobody,L), write_canonical(L), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\nactor_movies(A, L) :- actor_movies_acc(A, [], L).\nactor_movies_acc(A, Seen, L) :- by(_, M, A), \\+ member(M, Seen), !, actor_movies_acc(A, [M|Seen], L).\nactor_movies_acc(_, L, L).',
    reasoning:
      'Relaciona os factos pelos campos pedidos, preservando as condições e os resultados distintos.',
    explanation: '/cadeiras/pfl/solucoes-estruturas-prolog/#escolher-a-recolha',
  },
  {
    id: 'mt2-films-change-self',
    title: 'Personagens interpretadas por si mesmas',
    prompt:
      'Define `changeSelf/0`, substituindo cada facto cuja personagem é igual ao ator por um facto com personagem `self`, mantendo filme e ator. Deve sempre suceder. Por exemplo, `by(stephenColbert,dailyShow,stephenColbert)` passa a `by(self,dailyShow,stephenColbert)`.',
    context:
      'Os factos `by(Character, Movie, Actor)` associam personagens, filmes ou séries e atores. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\n% Define o predicado pedido.\n',
      tests: [
        {
          name: 'Substituir',
          code: 'main :- changeSelf, findall(C, by(C,dailyShow,stephenColbert), L), write_canonical(L), nl.',
          output: '[self]',
        },
        {
          name: 'Repetir',
          code: 'main :- changeSelf, changeSelf, findall(C, by(C,theColbertReport,stephenColbert), L), write_canonical(L), nl.',
          output: '[self]',
        },
      ],
    },
    solution:
      ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\nchangeSelf :- retract(by(A, M, A)), assertz(by(self, M, A)), fail.\nchangeSelf.',
    reasoning:
      'Relaciona os factos pelos campos pedidos, preservando as condições e os resultados distintos.',
    explanation: '/cadeiras/pfl/solucoes-estruturas-prolog/#escolher-a-recolha',
  },
  {
    id: 'mt2-films-played-by',
    title: 'Atores e filmes de uma personagem',
    prompt:
      'Define `playedBy(+Character, -List)`, uma lista de pares `Actor-Movies` com os atores que interpretaram a personagem e os seus filmes ou séries. A ordem é livre. Para `jackRyan`, inclui `benAffleck-[theSumOfAllFears]`, `alecBaldwin-[theHuntForRedOctober]` e `harrisonFord-[patriotGames,clearAndPresentDanger]`.',
    context:
      'Os factos `by(Character, Movie, Actor)` associam personagens, filmes ou séries e atores.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\n% Define o predicado pedido.\n',
      tests: [
        {
          name: 'Um ator',
          code: 'main :- playedBy(president,L), write_canonical(L), nl.',
          output: '[-(harrisonFord,[airForceOne])]',
        },
        {
          name: 'Ausente',
          code: 'main :- playedBy(nobody,L), write_canonical(L), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\nplayedBy(C, L) :- findall(A, by(C, _, A), As), sort(As, Actors), findall(A-Ms, (member(A, Actors), findall(M, by(C, M, A), Ms)), L).',
    reasoning:
      'Relaciona os factos pelos campos pedidos, preservando as condições e os resultados distintos.',
    explanation: '/cadeiras/pfl/solucoes-estruturas-prolog/#escolher-a-recolha',
  },
  {
    id: 'mt2-films-most-popular',
    title: 'Atores com mais filmes',
    prompt:
      'Define `most_popular(+Exclude, -List, -NMovies)`. Devolve todos os atores não excluídos com o maior número de filmes ou séries distintos, e esse número. A ordem em caso de empate é livre. Com `[]` são `harrisonFord` e `jenniferGarner`, com 3; excluindo o primeiro fica só a segunda, e excluindo ambos há seis atores com 2.',
    context:
      'Os factos `by(Character, Movie, Actor)` associam personagens, filmes ou séries e atores.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\n% Define o predicado pedido.\n',
      tests: [
        {
          name: 'Empate',
          code: 'main :- most_popular([],L,N), msort(L,S), write_canonical(S-N), nl.',
          output: '-([harrisonFord,jenniferGarner],3)',
        },
        {
          name: 'Exclusão',
          code: 'main :- most_popular([harrisonFord],L,N), write_canonical(L-N), nl.',
          output: '-([jenniferGarner],3)',
        },
      ],
    },
    solution:
      ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\nmost_popular(Exclude, List, N) :- setof(A, C^M^(by(C,M,A), \\+ member(A,Exclude)), Actors), findall(Count-A, (member(A,Actors), setof(M,C^by(C,M,A),Movies), length(Movies,Count)), Pairs), keysort(Pairs,Sorted), last(Sorted,N-_), findall(A,member(N-A,Sorted),List).',
    reasoning:
      'Relaciona os factos pelos campos pedidos, preservando as condições e os resultados distintos.',
    explanation: '/cadeiras/pfl/solucoes-estruturas-prolog/#escolher-a-recolha',
  },
  {
    id: 'mt2-films-connection',
    title: 'Ligação entre atores',
    prompt:
      'Define `connection_link(+Actor1, +Actor2, -ConnectionList)` com uma ligação possível como lista alternada de atores e filmes em que trabalharam juntos. Falha quando não existe ligação. Exemplos: `[jenniferAniston,friends,courteneyCox]` e `[jenniferGarner,daredevil,benAffleck,theSumOfAllFears,bridgetMoynahan]`.',
    context:
      'Os factos `by(Character, Movie, Actor)` associam personagens, filmes ou séries e atores.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\n% Define o predicado pedido.\n',
      tests: [
        {
          name: 'Direta',
          code: 'main :- once(connection_link(jenniferAniston,courteneyCox,L)), write_canonical(L), nl.',
          output: '[jenniferAniston,friends,courteneyCox]',
        },
        {
          name: 'Sem ligação',
          code: 'main :- findall(L, connection_link(jenniferAniston,benAffleck,L), R), write_canonical(R), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\nconnection_link(A, B, L) :- connection_path(A, B, [A], L).\nconnection_path(A, B, Seen, [A,M,B]) :- by(_, M, A), by(_, M, B), A \\= B, \\+ member(B, Seen).\nconnection_path(A, B, Seen, [A,M|Rest]) :- by(_, M, A), by(_, M, Next), A \\= Next, Next \\= B, \\+ member(Next, Seen), connection_path(Next, B, [Next|Seen], Rest).',
    reasoning:
      'Relaciona os factos pelos campos pedidos, preservando as condições e os resultados distintos.',
    explanation: '/cadeiras/pfl/solucoes-estruturas-prolog/#escolher-a-recolha',
  },
  {
    id: 'mt2-films-pretty-print',
    title: 'Imprimir uma ligação',
    prompt:
      'Define `pretty_print(+ConnectionList)`, que imprime a lista alternada de atores e filmes. Por exemplo, `[lauraWard,elektra,jenniferGarner,daredevil,benAffleck,theSumOfAllFears,bridgetMoynahan]` imprime `lauraWard worked in elektra with jenniferGarner,`, depois ` who worked in daredevil with benAffleck,`, e por fim ` who worked in theSumOfAllFears with bridgetMoynahan.`, cada trecho numa linha.',
    context:
      'Os factos `by(Character, Movie, Actor)` associam personagens, filmes ou séries e atores.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\n% Define o predicado pedido.\n',
      tests: [
        {
          name: 'Ligação direta',
          code: 'main :- pretty_print([a,film,b]).',
          output: 'a worked in film with b.',
        },
        {
          name: 'Duas ligações',
          code: 'main :- pretty_print([a,film,b,other,c]).',
          output: 'a worked in film with b,\n who worked in other with c.',
        },
      ],
    },
    solution:
      ":- dynamic by/3.\n% by(Character, Movie, Actor).\nby(jackRyan, theSumOfAllFears, benAffleck).\nby(cathyMuller, theSumOfAllFears, bridgetMoynahan).\nby(jackRyan, theHuntForRedOctober, alecBaldwin).\nby(jackRyan, patriotGames, harrisonFord).\nby(cathyMuller, patriotGames, anneArcher).\nby(jackRyan, clearAndPresentDanger, harrisonFord).\nby(cathyMuller, clearAndPresentDanger, anneArcher).\nby(president, airForceOne, harrisonFord).\nby(frasierCrane, cheers, kelseyGrammer).\nby(frasierCrane, frasier, kelseyGrammer).\nby(rachelGreen, friends, jenniferAniston).\nby(monicaGeller, friends, courteneyCox).\nby(phoebeBuffay, friends, lisaKudrow).\nby(ursulaBuffay, friends, lisaKudrow).\nby(joeyTribbiani, friends, mattLeBlanc).\nby(joeyTribbiani, joey, mattLeBlanc).\nby(alexGarrett, joey, andreaAnders).\nby(stephenColbert, dailyShow, stephenColbert).\nby(stephenColbert, theColbertReport, stephenColbert).\nby(addisonMontgomery, privatePractice, kateWalsh).\nby(addisonMontgomery, greysAnatomy, kateWalsh).\nby(mattMurdock, daredevil, benAffleck).\nby(elektraNatchios, daredevil, jenniferGarner).\nby(elektraNatchios, elektra, jenniferGarner).\nby(elektraNatchios, elektra, lauraWard).\nby(sydneyBristow, alias, jenniferGarner).\n\npretty_print([A,M,B|T]) :- write(A), write(' worked in '), write(M), write(' with '), write(B), pretty_rest(T).\npretty_rest([]) :- write('.'), nl.\npretty_rest([M,B|T]) :- write(','), nl, write(' who worked in '), write(M), write(' with '), write(B), pretty_rest(T).",
    reasoning:
      'Relaciona os factos pelos campos pedidos, preservando as condições e os resultados distintos.',
    explanation: '/cadeiras/pfl/solucoes-estruturas-prolog/#escolher-a-recolha',
  },
];
