import type { PrologQuestion } from './questions';

export const questions: PrologQuestion[] = [
  {
    id: 'mt2-social-video-username',
    title: 'Nome do autor de um vídeo',
    prompt:
      'Define `video_username(?VideoID, ?Name)`. O vídeo 10 pertence a Alice; Carla tem os vídeos 13 e 14.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Identificador',
          code: 'main :- findall(N, video_username(10,N), L), write_canonical(L), nl.',
          output: "['Alice']",
        },
        {
          name: 'Nome',
          code: "main :- findall(V, video_username(V,'Carla'), L), write_canonical(L), nl.",
          output: '[13,14]',
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\nvideo_username(V, N) :- video(V, U, _, _), user(U, N, _, _).",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-odd-birthyear',
    title: 'Anos de nascimento ímpares',
    prompt:
      'Define `odd_birthyear(?UserID)`, que sucede quando o ano de nascimento é ímpar. Os resultados são 1, 3, 4 e 5.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Gerar',
          code: 'main :- findall(U, odd_birthyear(U), L), write_canonical(L), nl.',
          output: '[1,3,4,5]',
        },
        {
          name: 'Ano par',
          code: 'main :- findall(x, odd_birthyear(2), L), write_canonical(L), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\nodd_birthyear(U) :- user(U, _, _-_-Y, _), 1 =:= Y mod 2.",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-friends',
    title: 'Amizade recíproca',
    prompt:
      'Define `are_friends(?UserID1, ?UserID2)`: cada utilizador segue o outro. A relação é simétrica.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Pares',
          code: 'main :- findall(A-B, are_friends(A,B), L), write_canonical(L), nl.',
          output: '[-(1,2),-(1,3),-(2,1),-(3,1)]',
        },
        {
          name: 'Sem reciprocidade',
          code: 'main :- findall(x, are_friends(2,4), L), write_canonical(L), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\nare_friends(A, B) :- user(A, _, _, As), member(B, As), user(B, _, _, Bs), member(A, Bs).",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-followers',
    title: 'Número de seguidores distintos',
    prompt:
      'Define `num_followers(+UserID, ?NumFollowers)`, contando os outros utilizadores distintos que o seguem. O utilizador 1 tem três seguidores.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Seguidores',
          code: 'main :- num_followers(1,N), write_canonical(N), nl.',
          output: '3',
        },
        {
          name: 'Sem seguidores',
          code: 'main :- num_followers(5,N), write_canonical(N), nl.',
          output: '0',
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\nnum_followers(U, N) :- followers(U, [], L), length(L, N).\nfollowers(U, Seen, L) :- user(V, _, _, F), V \\= U, member(U, F), \\+ member(V, Seen), !, followers(U, [V|Seen], L).\nfollowers(_, L, L).",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-print-genre',
    title: 'Imprimir vídeos por género',
    prompt:
      'Define `print_genre_videos(+Genre)`. Imprime todos os títulos e nomes dos autores como `Title by Name`, um por linha, em qualquer ordem; deve sempre suceder. Não uses recursão.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Um vídeo',
          code: 'main :- print_genre_videos(vlog).',
          output: 'Daily Coding Vlog by Bruno',
        },
        {
          name: 'Género ausente',
          code: 'main :- print_genre_videos(none), write(ok), nl.',
          output: 'ok',
        },
        {
          name: 'Todos os vídeos',
          code: "main :- with_output_to(atom(A), print_genre_videos(education)), atomic_list_concat(Lines, '\\n', A), msort(Lines, Sorted), write_canonical(Sorted), nl.",
          output:
            "['','Advanced Prolog Tricks by Edgar','Logic Puzzles Explained by Alice','Prolog for Beginners by Alice']",
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\nprint_genre_videos(G) :- video(_, U, T, G), user(U, N, _, _), write(T), write(' by '), write(N), nl, fail.\nprint_genre_videos(_).",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-can-see',
    title: 'Visibilidade de vídeos',
    prompt:
      'Define `can_see_all_videos(+UserID, +ListOfVideoIDs)`. Uma pessoa vê os seus vídeos e os de quem segue; todos os identificadores devem existir e ser visíveis. 1 vê `[12,13,10]`, mas não `[15]`.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos. Não uses `findall`, `setof`, `bagof` nem bibliotecas SICStus.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Visíveis',
          code: 'main :- findall(x, can_see_all_videos(1,[12,13,10]), L), write_canonical(L), nl.',
          output: '[x]',
        },
        {
          name: 'Inexistente',
          code: 'main :- findall(x, can_see_all_videos(1,[999]), L), write_canonical(L), nl.',
          output: '[]',
        },
        {
          name: 'Não visível',
          code: 'main :- findall(x, can_see_all_videos(1,[15]), L), write_canonical(L), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\ncan_see_all_videos(U, Vs) :- user(U, _, _, F), visible_all(Vs, U, F).\nvisible_all([], _, _).\nvisible_all([V|Vs], U, F) :- video(V, Owner, _, _), (Owner = U ; member(Owner, F)), visible_all(Vs, U, F).",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-average-following',
    title: 'Média de pessoas seguidas',
    prompt:
      'Define `avg_num_following_by_year(+Year, ?Avg)`, a média em vírgula flutuante do número de pessoas seguidas por quem nasceu no ano. Falha se não houver utilizadores nesse ano. Para 1999 dá 3.0 e para 1997 dá 0.5.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Média',
          code: 'main :- avg_num_following_by_year(1997,A), write_canonical(A), nl.',
          output: '0.5',
        },
        {
          name: 'Ano ausente',
          code: 'main :- findall(A, avg_num_following_by_year(1920,A), L), write_canonical(L), nl.',
          output: '[]',
        },
        {
          name: 'Outro ano',
          code: 'main :- avg_num_following_by_year(1999,A), write_canonical(A), nl.',
          output: '3.0',
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\navg_num_following_by_year(Y, Avg) :- findall(N, (user(_, _, _-_-Y, F), length(F, N)), Ns), length(Ns, Count), Count > 0, sum_list(Ns, Sum), Avg is float(Sum) / Count.",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-birthdays',
    title: 'Aniversários de pessoas seguidas',
    prompt:
      'Define `get_following_birthdays(?UserID, +Month, ?BirthDayUserIDList)`. Devolve os identificadores seguidos com aniversário no mês, ordenados por dia crescente. Para 2 e mês 1 o resultado é `[3,4]`; para 4 e mês 12 é `[]`.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Ordenar',
          code: 'main :- get_following_birthdays(2,1,L), write_canonical(L), nl.',
          output: '[3,4]',
        },
        {
          name: 'Gerar utilizadores',
          code: 'main :- findall(U-L, get_following_birthdays(U,1,L), R), write_canonical(R), nl.',
          output: '[-(1,[3]),-(2,[3,4]),-(3,[]),-(4,[]),-(5,[3,4])]',
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\nget_following_birthdays(U, M, IDs) :- user(U, _, _, F), findall(D-V, (member(V, F), user(V, _, D-M-_, _)), Pairs), keysort(Pairs, Sorted), birthday_ids(Sorted, IDs).\nbirthday_ids([], []).\nbirthday_ids([_-V|Rest], [V|IDs]) :- birthday_ids(Rest, IDs).",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-group-videos',
    title: 'Agrupar vídeos por género',
    prompt:
      'Define `group_videos_by_genre(+UserID, -ListOfPairs)`, com pares `Genre-VideoIDs` sem duplicados. A ordem dos pares e dos identificadores é livre. Para 1, um resultado é `[education-[10,11]]`; para 6 é `[]`.',
    context:
      'Os factos dados representam utilizadores, datas de nascimento, pessoas seguidas e vídeos.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\n% Define o predicado pedido.\n",
      tests: [
        {
          name: 'Grupo',
          code: 'main :- group_videos_by_genre(1,L), msort(L,S), write_canonical(S), nl.',
          output: '[-(education,[10,11])]',
        },
        {
          name: 'Sem vídeos',
          code: 'main :- group_videos_by_genre(6,L), write_canonical(L), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      "% user(UserID, Name, BirthDate, FollowingList).\nuser(1, 'Alice', 12-05-1999, [2,3]).\nuser(2, 'Bruno', 23-11-2000, [1,3,4]).\nuser(3, 'Carla', 01-01-1997, [1]).\nuser(4, 'Diana', 30-01-1997, []).\nuser(5, 'Edgar', 15-03-1999, [1,2,3,4]).\n% video(VideoID, UserID, Title, Genre).\nvideo(10, 1, 'Prolog for Beginners', education).\nvideo(11, 1, 'Logic Puzzles Explained', education).\nvideo(12, 2, 'Daily Coding Vlog', vlog).\nvideo(13, 3, 'Functional vs Logic', tech).\nvideo(14, 3, 'Cooking with Recursion', cooking).\nvideo(15, 4, 'Travel in Portugal', travel).\nvideo(16, 5, 'Advanced Prolog Tricks', education).\n\ngroup_videos_by_genre(U, Pairs) :- findall(G, video(_, U, _, G), Gs), sort(Gs, Genres), genre_pairs(Genres, U, Pairs).\ngenre_pairs([], _, []).\ngenre_pairs([G|Gs], U, [G-IDs|Pairs]) :- findall(V, video(V, U, _, G), Vs), sort(Vs, IDs), genre_pairs(Gs, U, Pairs).",
    reasoning:
      'Relaciona os factos pelos identificadores e verifica as condições pedidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-date-cuts',
    title: 'Cortes na comparação de datas',
    prompt: 'Quais dos cortes são verdes?',
    definitions:
      'predX(_-_-Y1, _-_-Y2) :- Y1 < Y2, !.\npredX(_-M1-Y, _-M2-Y) :- M1 =< M2, !.\npredX(D1-M-Y, D2-M-Y) :- D1 < D2.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Só o corte da primeira regra.',
          correct: true,
          explanation:
            'O primeiro corte elimina alternativas incompatíveis com anos diferentes. O segundo impede a terceira regra quando os meses são iguais, alterando as soluções.',
        },
        {
          text: 'Só o corte da segunda regra.',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: 'Nenhum dos cortes.',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: 'Ambos os cortes.',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
      ],
    },
    solution: '',
    reasoning:
      'O primeiro corte elimina alternativas incompatíveis com anos diferentes. O segundo impede a terceira regra quando os meses são iguais, alterando as soluções.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-unification',
    title: 'Instância comum de listas',
    prompt: 'Qual é uma instância comum de `[_,X|T]` e `[b,Y,X|_]`?',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`[b,a,a,b]`',
          correct: true,
          explanation:
            'A segunda posição da primeira lista e a terceira da segunda são ambas `X`, logo têm de ser iguais.',
        },
        {
          text: 'Não existe instância comum.',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`[b,a,b,a]`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`[b,a,b,c]`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
      ],
    },
    solution: '',
    reasoning:
      'A segunda posição da primeira lista e a terceira da segunda são ambas `X`, logo têm de ser iguais.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-tail-recursion',
    title: 'Recursão terminal e eficiência',
    prompt:
      'Considera: (1) a recursão terminal permite maior eficiência em memória e tempo; (2) só cortes verdes podem reduzir objetivos executados; (3) `append([1,2,3], [], L)` é mais eficiente do que `append([], [1,2,3], L)`. Que afirmações são verdadeiras?',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Só (2) e (3).',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: 'Nenhuma das outras opções.',
          correct: true,
          explanation:
            'Cortes vermelhos também podem reduzir a procura e a segunda chamada de `append/3` termina imediatamente. Nenhuma das combinações propostas é correta.',
        },
        {
          text: 'Só (1) e (2).',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: 'Só (1) e (3).',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
      ],
    },
    solution: '',
    reasoning:
      'Cortes vermelhos também podem reduzir a procura e a segunda chamada de `append/3` termina imediatamente. Nenhuma das combinações propostas é correta.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-select',
    title: 'Seleção numa lista',
    prompt:
      'Qual das implementações define `select(?Element, ?List, ?Residue)`?',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`select(X,Y,Z) :- append([X],Y,Z).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`select(X,Y,Z) :- append([X|A],B,Y), append(A,B,Z).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`select(X,Y,Z) :- append(_,[X|Y],Z).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`select(X,Y,Z) :- append(A,[X|B],Y), append(A,B,Z).`',
          correct: true,
          explanation:
            'A lista original é a concatenação de um prefixo com `X` e um sufixo; o resíduo junta o mesmo prefixo e sufixo.',
        },
      ],
    },
    solution: '',
    reasoning:
      'A lista original é a concatenação de um prefixo com `X` e um sufixo; o resíduo junta o mesmo prefixo e sufixo.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-follows-operator',
    title: 'Operador follows',
    prompt:
      'Para escrever `bruno follows alice` e `edgar follows bruno who follows alice who follows carla`, qual é a definição mais adequada de `follows`?',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`:- op(600, xfx, follows).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`:- op(600, xf, follows).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`:- op(600, xfy, follows).`',
          correct: true,
          explanation: '`xfy` é infixo e permite associar a cadeia à direita.',
        },
        {
          text: '`:- op(600, fx, follows).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
      ],
    },
    solution: '',
    reasoning: '`xfy` é infixo e permite associar a cadeia à direita.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-who-operator',
    title: 'Operador who',
    prompt:
      'Para a cadeia `edgar follows bruno who follows alice who follows carla`, qual é a definição mais adequada de `who`?',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`:- op(560, fy, who).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`:- op(590, fx, who).`',
          correct: true,
          explanation:
            '`who` é prefixo; com prioridade 590 pode surgir como operando de `follows` com prioridade 600.',
        },
        {
          text: '`:- op(580, xf, who).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: '`:- op(570, yf, who).`',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
      ],
    },
    solution: '',
    reasoning:
      '`who` é prefixo; com prioridade 590 pode surgir como operando de `follows` com prioridade 600.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
  {
    id: 'mt2-social-univ',
    title: 'Utilidade de univ',
    prompt: 'Para qual destas tarefas `=../2` não é útil?',
    definitions: '',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Verificar o nome do functor de um termo.',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: 'Concatenar duas listas em tempo O(1).',
          correct: true,
          explanation:
            '`=../2` relaciona um termo com a lista do functor e argumentos; não fornece concatenação em tempo constante.',
        },
        {
          text: 'Verificar a aridade de um termo.',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
        {
          text: 'Construir termos para executar em tempo de execução.',
          correct: false,
          explanation: 'Esta opção não satisfaz a condição indicada.',
        },
      ],
    },
    solution: '',
    reasoning:
      '`=../2` relaciona um termo com a lista do functor e argumentos; não fornece concatenação em tempo constante.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall',
  },
];
