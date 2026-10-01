:- use_module(library(lists)).
derivar(num(_), _, num(0)).
derivar(var(X), X, num(1)).
derivar(var(X), Y, num(0)) :- X \= Y.
derivar(soma(A,B), X, soma(DA,DB)) :- derivar(A,X,DA), derivar(B,X,DB).
derivar(produto(A,B), X, soma(produto(DA,B),produto(A,DB))) :-
    derivar(A,X,DA), derivar(B,X,DB).

valor(folha(N),N).
valor(no(max,Filhos),V) :-
    Filhos = [_|_], findall(N,(member(F,Filhos),valor(F,N)),Ns), max_list(Ns,V).
valor(no(min,Filhos),V) :-
    Filhos = [_|_], findall(N,(member(F,Filhos),valor(F,N)),Ns), min_list(Ns,V).

main :-
    derivar(produto(var(x),var(x)),x,D), writeln(D),
    valor(no(max,[no(min,[folha(-1),folha(4)]),no(min,[folha(2),folha(3)])]),V),
    writeln(V).
