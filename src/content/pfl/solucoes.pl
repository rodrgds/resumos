:- use_module(library(lists)).
inscrito(ana, pfl).
inscrito(ana, lbaw).
inscrito(bruno, pfl).
inscrito(ana, pfl).

maximo(X,Y,X) :- X >= Y, !.
maximo(X,Y,Y) :- X < Y.

write_portatil(X) :- write(X), nl.

main :-
    findall(C, inscrito(ana,C), Todas), write_portatil(Todas),
    setof(C, inscrito(ana,C), Unicas), write_portatil(Unicas),
    findall(A-Cs, bagof(C, inscrito(A,C), Cs), Grupos), write_portatil(Grupos),
    bagof(C, A^inscrito(A,C), SemGrupos), write_portatil(SemGrupos),
    ( maximo(7,5,5) -> write_portatil(erro) ; write_portatil(recusado) ).
