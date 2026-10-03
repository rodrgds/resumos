:- use_module(library(lists)).
derivar(num(_), _, num(0)).
derivar(var(X), X, num(1)).
derivar(var(X), Y, num(0)) :- X \= Y.
derivar(soma(A,B), X, soma(DA,DB)) :- derivar(A,X,DA), derivar(B,X,DB).
derivar(produto(A,B), X, soma(produto(DA,B),produto(A,DB))) :-
    derivar(A,X,DA), derivar(B,X,DB).

valor(folha(N),N).
max_num([X|Xs], M) :- max_num(Xs, X, M).
max_num([], M, M).
max_num([X|Xs], A, M) :- (X > A -> B = X ; B = A), max_num(Xs, B, M).
valor(no(max,Filhos),V) :-
    Filhos = [_|_], findall(N,(member(F,Filhos),valor(F,N)),Ns), max_num(Ns,V).
min_num([X|Xs], M) :- min_num(Xs, X, M).
min_num([], M, M).
min_num([X|Xs], A, M) :- (X < A -> B = X ; B = A), min_num(Xs, B, M).
valor(no(min,Filhos),V) :-
    Filhos = [_|_], findall(N,(member(F,Filhos),valor(F,N)),Ns), min_num(Ns,V).

main :-
    derivar(produto(var(x),var(x)),x,D), write(D), nl,
    valor(no(max,[no(min,[folha(-1),folha(4)]),no(min,[folha(2),folha(3)])]),V),
    write(V), nl.
