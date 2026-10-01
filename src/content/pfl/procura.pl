:- use_module(library(lists)).
ligado(a,b). ligado(a,c). ligado(b,d). ligado(d,e). ligado(c,e).
ligado(d,a).

caminho(X,X,_,[X]).
caminho(X,Z,V,[X|R]) :- ligado(X,Y), \+ member(Y,V), caminho(Y,Z,[Y|V],R).

bfs([[Z|R]|_],Z,C) :- reverse([Z|R],C).
bfs([[X|R]|Fila],Z,C) :-
    X \= Z,
    findall([Y,X|R],(ligado(X,Y), \+ member(Y,[X|R])),Novos),
    append(Fila,Novos,Seguinte),
    bfs(Seguinte,Z,C).

main :-
    once(caminho(a,e,[a],D)), writeln(D),
    bfs([[a]],e,B), writeln(B).
