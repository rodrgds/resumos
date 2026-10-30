import type { PrologQuestion } from './questions';

export const questions: PrologQuestion[] = [
  {
    id: 'mt2-database-autor',
    title: 'Autores de livros',
    prompt:
      'Implementa `book_author(?Title, ?Author)`, relacionando cada título com o nome do autor.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "author(1,'John Grisham',1955,'USA').\nauthor(2,'Wilbur Smith',1933,'Zambia').\nauthor(3,'Stephen King',1947,'USA').\nauthor(4,'Michael Crichton',1942,'USA').\nbook('The Firm',1,1991,432,['Legal thriller']).\nbook('The Client',1,1993,422,['Legal thriller']).\nbook('The Runaway Jury',1,1996,414,['Legal thriller']).\nbook('The Exchange',1,2023,338,['Legal thriller']).\nbook('Carrie',3,1974,199,['Horror']).\nbook('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).\nbook('Under the Dome',3,2009,1074,['Science fiction','Political']).\nbook('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).\nbook('Jurassic Park',4,1990,399,['Science fiction']).\nbook('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).\nbook('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).\n\n% book_author(Title, Author).",
      tests: [
        {
          name: 'Título',
          code: "main :- findall(X, (book_author('Carrie',X)), Xs), write_canonical(Xs), nl.",
          output: "['Stephen King']",
        },
        {
          name: 'Sem livros',
          code: "main :- findall(X, (book_author(X,'Wilbur Smith')), Xs), write_canonical(Xs), nl.",
          output: '[]',
        },
        {
          name: 'Autor',
          code: "main :- findall(X, (book_author(X,'John Grisham')), Xs), write_canonical(Xs), nl.",
          output: "['The Firm','The Client','The Runaway Jury','The Exchange']",
        },
      ],
    },
    solution:
      "author(1,'John Grisham',1955,'USA').\nauthor(2,'Wilbur Smith',1933,'Zambia').\nauthor(3,'Stephen King',1947,'USA').\nauthor(4,'Michael Crichton',1942,'USA').\nbook('The Firm',1,1991,432,['Legal thriller']).\nbook('The Client',1,1993,422,['Legal thriller']).\nbook('The Runaway Jury',1,1996,414,['Legal thriller']).\nbook('The Exchange',1,2023,338,['Legal thriller']).\nbook('Carrie',3,1974,199,['Horror']).\nbook('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).\nbook('Under the Dome',3,2009,1074,['Science fiction','Political']).\nbook('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).\nbook('Jurassic Park',4,1990,399,['Science fiction']).\nbook('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).\nbook('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).\n\nbook_author(Title, Author) :- book(Title, ID, _, _, _), author(ID, Author, _, _).",
    reasoning: 'O identificador comum liga o livro ao facto do autor.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-generos-multiplos',
    title: 'Livros com vários géneros',
    prompt:
      'Implementa `multi_genre_book(?Title)`, que relaciona títulos com pelo menos dois géneros.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "author(1,'John Grisham',1955,'USA').\nauthor(2,'Wilbur Smith',1933,'Zambia').\nauthor(3,'Stephen King',1947,'USA').\nauthor(4,'Michael Crichton',1942,'USA').\nbook('The Firm',1,1991,432,['Legal thriller']).\nbook('The Client',1,1993,422,['Legal thriller']).\nbook('The Runaway Jury',1,1996,414,['Legal thriller']).\nbook('The Exchange',1,2023,338,['Legal thriller']).\nbook('Carrie',3,1974,199,['Horror']).\nbook('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).\nbook('Under the Dome',3,2009,1074,['Science fiction','Political']).\nbook('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).\nbook('Jurassic Park',4,1990,399,['Science fiction']).\nbook('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).\nbook('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).\n\n% multi_genre_book(Title).",
      tests: [
        {
          name: 'Resultados',
          code: 'main :- findall(X, (multi_genre_book(X)), Xs), write_canonical(Xs), nl.',
          output:
            "['The Shining','Under the Dome','Doctor Sleep','Prey','Next']",
        },
        {
          name: 'Um género',
          code: "main :- findall(X, (multi_genre_book('Carrie'), X = sim), Xs), write_canonical(Xs), nl.",
          output: '[]',
        },
      ],
    },
    solution:
      "author(1,'John Grisham',1955,'USA').\nauthor(2,'Wilbur Smith',1933,'Zambia').\nauthor(3,'Stephen King',1947,'USA').\nauthor(4,'Michael Crichton',1942,'USA').\nbook('The Firm',1,1991,432,['Legal thriller']).\nbook('The Client',1,1993,422,['Legal thriller']).\nbook('The Runaway Jury',1,1996,414,['Legal thriller']).\nbook('The Exchange',1,2023,338,['Legal thriller']).\nbook('Carrie',3,1974,199,['Horror']).\nbook('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).\nbook('Under the Dome',3,2009,1074,['Science fiction','Political']).\nbook('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).\nbook('Jurassic Park',4,1990,399,['Science fiction']).\nbook('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).\nbook('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).\n\nmulti_genre_book(Title) :- book(Title, _, _, _, [_,_|_]).",
    reasoning: 'Uma lista com pelo menos dois elementos unifica com `[_,_|_]`.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-generos-comuns',
    title: 'Géneros comuns',
    prompt:
      'Implementa `shared_genres(?Title1, ?Title2, -CommonGenres)`. Devolve os géneros comuns aos dois livros, em qualquer ordem.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "author(1,'John Grisham',1955,'USA').\nauthor(2,'Wilbur Smith',1933,'Zambia').\nauthor(3,'Stephen King',1947,'USA').\nauthor(4,'Michael Crichton',1942,'USA').\nbook('The Firm',1,1991,432,['Legal thriller']).\nbook('The Client',1,1993,422,['Legal thriller']).\nbook('The Runaway Jury',1,1996,414,['Legal thriller']).\nbook('The Exchange',1,2023,338,['Legal thriller']).\nbook('Carrie',3,1974,199,['Horror']).\nbook('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).\nbook('Under the Dome',3,2009,1074,['Science fiction','Political']).\nbook('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).\nbook('Jurassic Park',4,1990,399,['Science fiction']).\nbook('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).\nbook('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).\n\n% shared_genres(Title1, Title2, CommonGenres).",
      tests: [
        {
          name: 'Interseção',
          code: "main :- findall(S, (shared_genres('Prey','Next',L), sort(L,S)), Xs), write_canonical(Xs), nl.",
          output: "[['Science fiction','Techno-thriller']]",
        },
        {
          name: 'Sem interseção',
          code: "main :- findall(X, (shared_genres('Carrie','The Firm',X)), Xs), write_canonical(Xs), nl.",
          output: '[[]]',
        },
        {
          name: 'Título inexistente',
          code: "main :- findall(X, (shared_genres('Carrie',inexistente,X)), Xs), write_canonical(Xs), nl.",
          output: '[]',
        },
      ],
    },
    solution:
      "author(1,'John Grisham',1955,'USA').\nauthor(2,'Wilbur Smith',1933,'Zambia').\nauthor(3,'Stephen King',1947,'USA').\nauthor(4,'Michael Crichton',1942,'USA').\nbook('The Firm',1,1991,432,['Legal thriller']).\nbook('The Client',1,1993,422,['Legal thriller']).\nbook('The Runaway Jury',1,1996,414,['Legal thriller']).\nbook('The Exchange',1,2023,338,['Legal thriller']).\nbook('Carrie',3,1974,199,['Horror']).\nbook('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).\nbook('Under the Dome',3,2009,1074,['Science fiction','Political']).\nbook('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).\nbook('Jurassic Park',4,1990,399,['Science fiction']).\nbook('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).\nbook('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).\n\nshared_genres(T1,T2,Common) :-\n    book(T1,_,_,_,G1), book(T2,_,_,_,G2),\n    findall(G, (member(G,G1), memberchk(G,G2)), Common).",
    reasoning:
      'Percorre os géneros do primeiro livro e conserva os que também pertencem ao segundo.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-similaridade',
    title: 'Coeficiente de Jaccard',
    prompt:
      'Implementa `similarity(?Title1, ?Title2, ?Similarity)`: divide o número de géneros comuns pelo número de géneros distintos na união.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        "author(1,'John Grisham',1955,'USA').\nauthor(2,'Wilbur Smith',1933,'Zambia').\nauthor(3,'Stephen King',1947,'USA').\nauthor(4,'Michael Crichton',1942,'USA').\nbook('The Firm',1,1991,432,['Legal thriller']).\nbook('The Client',1,1993,422,['Legal thriller']).\nbook('The Runaway Jury',1,1996,414,['Legal thriller']).\nbook('The Exchange',1,2023,338,['Legal thriller']).\nbook('Carrie',3,1974,199,['Horror']).\nbook('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).\nbook('Under the Dome',3,2009,1074,['Science fiction','Political']).\nbook('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).\nbook('Jurassic Park',4,1990,399,['Science fiction']).\nbook('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).\nbook('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).\n\n% similarity(Title1, Title2, Similarity).",
      tests: [
        {
          name: 'Iguais',
          code: "main :- findall(X, (similarity('The Firm','The Client',X)), Xs), write_canonical(Xs), nl.",
          output: '[1.0]',
        },
        {
          name: 'Parcial',
          code: "main :- findall(X, (similarity('Prey','Next',X)), Xs), write_canonical(Xs), nl.",
          output: '[0.4]',
        },
        {
          name: 'Disjuntos',
          code: "main :- findall(X, (similarity('Carrie','The Firm',X)), Xs), write_canonical(Xs), nl.",
          output: '[0.0]',
        },
      ],
    },
    solution:
      "author(1,'John Grisham',1955,'USA').\nauthor(2,'Wilbur Smith',1933,'Zambia').\nauthor(3,'Stephen King',1947,'USA').\nauthor(4,'Michael Crichton',1942,'USA').\nbook('The Firm',1,1991,432,['Legal thriller']).\nbook('The Client',1,1993,422,['Legal thriller']).\nbook('The Runaway Jury',1,1996,414,['Legal thriller']).\nbook('The Exchange',1,2023,338,['Legal thriller']).\nbook('Carrie',3,1974,199,['Horror']).\nbook('The Shining',3,1977,447,['Gothic novel','Horror','Psychological horror']).\nbook('Under the Dome',3,2009,1074,['Science fiction','Political']).\nbook('Doctor Sleep',3,2013,531,['Horror','Gothic','Dark fantasy']).\nbook('Jurassic Park',4,1990,399,['Science fiction']).\nbook('Prey',4,2002,502,['Science fiction','Techno-thriller','Horror','Nanopunk']).\nbook('Next',4,2006,528,['Science fiction','Techno-thriller','Satire']).\n\nsimilarity(T1,T2,S) :-\n    book(T1,_,_,_,G1), book(T2,_,_,_,G2),\n    sort(G1,A), sort(G2,B), append(A,B,All), sort(All,Union),\n    findall(G, (member(G,A), memberchk(G,B)), Common),\n    length(Common,I), length(Union,U), U > 0, S is 1.0*I/U.",
    reasoning:
      'Ordenar e eliminar duplicados dá a união de conjuntos; o quociente usa os tamanhos da interseção e da união.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-ingredientes-contagem',
    title: 'Contar ingredientes',
    prompt: 'Implementa `count_ingredients(?Dish, ?NumIngredients)`.',
    context:
      'Cada prato indica o preço em cêntimos e os ingredientes em gramas. Cada ingrediente surge uma vez por prato. Não uses `findall`, `setof`, `bagof` nem bibliotecas para esta questão.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\n% count_ingredients(Dish, NumIngredients).',
      tests: [
        {
          name: 'Todos',
          code: 'main :- findall(X, (count_ingredients(X,3)), Xs), write_canonical(Xs), nl.',
          output: '[ratatouille]',
        },
        {
          name: 'Pizza',
          code: 'main :- findall(X, (count_ingredients(pizza,X)), Xs), write_canonical(Xs), nl.',
          output: '[2]',
        },
        {
          name: 'Inexistente',
          code: 'main :- findall(X, (count_ingredients(nao_existe,X)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\ncount_ingredients(Dish, N) :- dish(Dish, _, Ingredients), length(Ingredients, N).',
    reasoning:
      'O comprimento da lista dá a contagem, pois não há ingredientes repetidos.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-custo-ingrediente',
    title: 'Custo de um ingrediente',
    prompt:
      'Implementa `ingredient_amount_cost(?Ingredient, +Grams, ?TotalCost)` em cêntimos.',
    context:
      'Cada prato indica o preço em cêntimos e os ingredientes em gramas. Cada ingrediente surge uma vez por prato. Não uses `findall`, `setof`, `bagof` nem bibliotecas para esta questão.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\n% ingredient_amount_cost(Ingredient, Grams, TotalCost).',
      tests: [
        {
          name: 'Tomate',
          code: 'main :- findall(X, (ingredient_amount_cost(tomato,350,X)), Xs), write_canonical(Xs), nl.',
          output: '[700]',
        },
        {
          name: 'Zero',
          code: 'main :- findall(X, (ingredient_amount_cost(cheese,0,X)), Xs), write_canonical(Xs), nl.',
          output: '[0]',
        },
        {
          name: 'Inexistente',
          code: 'main :- findall(X, (ingredient_amount_cost(outro,1,X)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\ningredient_amount_cost(I, G, Cost) :- ingredient(I, Unit), Cost is Unit * G.',
    reasoning: 'Multiplica o custo por grama pela quantidade.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-lucro',
    title: 'Lucro de um prato',
    prompt:
      'Implementa `dish_profit(?Dish, ?Profit)`, subtraindo ao preço a soma dos custos dos ingredientes.',
    context:
      'Cada prato indica o preço em cêntimos e os ingredientes em gramas. Cada ingrediente surge uma vez por prato. Não uses `findall`, `setof`, `bagof` nem bibliotecas para esta questão.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\n% dish_profit(Dish, Profit).',
      tests: [
        {
          name: 'Pizza',
          code: 'main :- findall(X, (dish_profit(pizza,X)), Xs), write_canonical(Xs), nl.',
          output: '[300]',
        },
        {
          name: 'Todos',
          code: 'main :- findall(X, (dish_profit(X,710)), Xs), write_canonical(Xs), nl.',
          output: '[ratatouille]',
        },
        {
          name: 'Desconhecido',
          code: 'main :- findall(X, (dish_profit(outro,X)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\ningredients_cost([], 0).\ningredients_cost([I-G|Rest], Cost) :- ingredient(I, Unit), ingredients_cost(Rest, Tail), Cost is G*Unit+Tail.\ndish_profit(Dish, Profit) :- dish(Dish, Price, Ingredients), ingredients_cost(Ingredients, Cost), Profit is Price-Cost.',
    reasoning:
      'Calcula recursivamente o custo de cada ingrediente e subtrai a soma ao preço.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-atualizar-custo',
    title: 'Atualizar custo unitário',
    prompt:
      'Implementa `update_unit_cost(+Ingredient, +NewUnitCost)`. Atualiza o custo ou cria o ingrediente se não existir; deve ter sucesso.',
    context:
      'Cada prato indica o preço em cêntimos e os ingredientes em gramas. Cada ingrediente surge uma vez por prato. Não uses `findall`, `setof`, `bagof` nem bibliotecas para esta questão.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\n% update_unit_cost(Ingredient, NewUnitCost).',
      tests: [
        {
          name: 'Existente',
          code: 'main :- update_unit_cost(cheese,8), findall(X,ingredient(cheese,X),Xs), write_canonical(Xs), nl.',
          output: '[8]',
        },
        {
          name: 'Novo',
          code: 'main :- update_unit_cost(flour,3), findall(X,ingredient(flour,X),Xs), write_canonical(Xs), nl.',
          output: '[3]',
        },
      ],
    },
    solution:
      'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\nupdate_unit_cost(I, C) :- retractall(ingredient(I,_)), assertz(ingredient(I,C)).',
    reasoning: 'Remove os factos anteriores e insere o custo pedido.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-prato-caro',
    title: 'Pratos mais caros',
    prompt:
      'Implementa `most_expensive_dish(?Dish, ?Price)`, devolvendo por retrocesso todos os pratos empatados no preço máximo.',
    context:
      'Cada prato indica o preço em cêntimos e os ingredientes em gramas. Cada ingrediente surge uma vez por prato. Não uses `findall`, `setof`, `bagof` nem bibliotecas para esta questão.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\n% most_expensive_dish(Dish, Price).',
      tests: [
        {
          name: 'Empate',
          code: 'main :- findall(X, (most_expensive_dish(X,2200)), Xs), write_canonical(Xs), nl.',
          output: '[pizza,ratatouille]',
        },
        {
          name: 'Não máximo',
          code: 'main :- findall(X, (most_expensive_dish(garlic_bread,X)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\nmost_expensive_dish(Dish,Price) :- dish(Dish,Price,_), \\+ (dish(_,Other,_), Other > Price).',
    reasoning: 'Um prato é máximo se não existir outro de preço superior.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-consumir',
    title: 'Consumir ingredientes',
    prompt:
      'Implementa `consume_ingredient(+IngredientStocks, +Ingredient, +Grams, ?NewIngredientStocks)`. Reduz a quantidade indicada, preservando a ordem; falha se o ingrediente não existir ou não houver stock suficiente. Não uses recursão.',
    context:
      'Cada prato indica o preço em cêntimos e os ingredientes em gramas. Cada ingrediente surge uma vez por prato. Não uses `findall`, `setof`, `bagof` nem bibliotecas para esta questão.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\n% consume_ingredient(Stocks, Ingredient, Grams, NewStocks).',
      tests: [
        {
          name: 'Suficiente',
          code: 'main :- findall(X, (consume_ingredient([garlic-600,tomato-800,cheese-750],tomato,150,X)), Xs), write_canonical(Xs), nl.',
          output: '[[-(garlic,600),-(tomato,650),-(cheese,750)]]',
        },
        {
          name: 'Insuficiente',
          code: 'main :- findall(X, (consume_ingredient([tomato-800],tomato,1000,X)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
        {
          name: 'Ausente',
          code: 'main :- findall(X, (consume_ingredient([],tomato,1,X)), Xs), write_canonical(Xs), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\nconsume_ingredient(Stocks,I,G,New) :-\n    append(Before,[I-Amount|After],Stocks), Amount >= G,\n    Remaining is Amount-G, append(Before,[I-Remaining|After],New).',
    reasoning:
      'Divide a lista em prefixo, par escolhido e sufixo; recompõe-a após verificar a quantidade.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-listar-pratos',
    title: 'Listar ingredientes dos pratos',
    prompt:
      'Implementa `list_dishes(?DishIngredients)`, uma lista de pares prato-lista de nomes de ingredientes, na ordem dos factos.',
    context: 'Cada facto `dish/3` contém um preço e pares ingrediente-gramas.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\n% list_dishes(DishIngredients).',
      tests: [
        {
          name: 'Todos',
          code: 'main :- findall(X, (list_dishes(X)), Xs), write_canonical(Xs), nl.',
          output:
            '[[-(pizza,[cheese,tomato]),-(ratatouille,[tomato,eggplant,garlic]),-(garlic_bread,[cheese,garlic])]]',
        },
        {
          name: 'Primeiro prato',
          code: 'main :- list_dishes([X|_]), write_canonical(X), nl.',
          output: '-(pizza,[cheese,tomato])',
        },
      ],
    },
    solution:
      'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\ningredient_names([],[]).\ningredient_names([I-_|Rest],[I|Names]) :- ingredient_names(Rest,Names).\nlist_dishes(List) :- findall(D-Names,(dish(D,_,Ingredients),ingredient_names(Ingredients,Names)),List).',
    reasoning:
      'Transforma cada lista de pares em nomes e recolhe os resultados na ordem dos factos.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-database-lucro-ordenado',
    title: 'Ordenar pratos por lucro',
    prompt:
      'Implementa `most_lucrative_dishes(?Dishes)` por ordem decrescente de lucro; em empates aceita-se qualquer ordem.',
    context: 'Cada facto `dish/3` contém um preço e pares ingrediente-gramas.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\n% most_lucrative_dishes(Dishes).',
      tests: [
        {
          name: 'Ordem',
          code: 'main :- findall(X, (most_lucrative_dishes(X)), Xs), write_canonical(Xs), nl.',
          output: '[[ratatouille,pizza,garlic_bread]]',
        },
        {
          name: 'Último prato',
          code: 'main :- most_lucrative_dishes(L), last(L,X), write_canonical(X), nl.',
          output: 'garlic_bread',
        },
      ],
    },
    solution:
      'dish(pizza,2200,[cheese-300,tomato-350]).\ndish(ratatouille,2200,[tomato-70,eggplant-150,garlic-50]).\ndish(garlic_bread,1600,[cheese-50,garlic-200]).\n:- dynamic ingredient/2.\ningredient(cheese,4).\ningredient(tomato,2).\ningredient(eggplant,7).\ningredient(garlic,6).\n\ningredients_cost([],0).\ningredients_cost([I-G|Rest],Cost) :- ingredient(I,U), ingredients_cost(Rest,T), Cost is G*U+T.\nmost_lucrative_dishes(Dishes) :- findall(Key-D,(dish(D,P,Is),ingredients_cost(Is,C),Key is C-P),Pairs), keysort(Pairs,Sorted), pairs_values(Sorted,Dishes).',
    reasoning:
      'Ordena pelo simétrico do lucro, conservando todos os pratos mesmo quando há empate.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
];
