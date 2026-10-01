:- use_module(library(lists)).
inscrito(ana, pfl).
inscrito(ana, lbaw).
inscrito(bruno, pfl).
inscrito(ana, pfl).

maximo(X,Y,X) :- X >= Y, !.
maximo(X,Y,Y) :- X < Y.

main :-
    findall(C, inscrito(ana,C), Todas), writeln(Todas),
    setof(C, inscrito(ana,C), Unicas), writeln(Unicas),
    findall(A-Cs, bagof(C, inscrito(A,C), Cs), Grupos), writeln(Grupos),
    bagof(C, A^inscrito(A,C), SemGrupos), writeln(SemGrupos),
    ( maximo(7,5,5) -> writeln(erro) ; writeln(recusado) ).
