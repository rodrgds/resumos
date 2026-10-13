crianca(ana).
crianca(bruno).
crianca(rui).
progenitor(tomas,ana).
progenitor(ines,ana).
progenitor(tomas,bruno).
progenitor(jose,rui).
progenitor(maria,rui).

sem_irmaos(P) :-
    crianca(P),
    \+ (progenitor(M,P), progenitor(M,O), O \= P).

utilizador(ana).
utilizador(bruno).
utilizador(carla).
segue(ana,bruno).
video(10,ana).
video(11,bruno).
video(12,carla).

pode_ver(U,V) :- video(V,D), (D=U ; segue(U,D)).
todos_visiveis(U,Vs) :- utilizador(U), todos(U,Vs).
todos(_,[]).
todos(U,[V|Vs]) :- pode_ver(U,V), todos(U,Vs).

% Contraexemplo: videos desconhecidos desaparecem da procura de violacoes.
incompleto(U,Vs) :-
    \+ (member(V,Vs), video(V,D), \+ (D=U ; segue(U,D))).

main :-
    findall(P,sem_irmaos(P),Ps), write(Ps), nl,
    (todos_visiveis(ana,[10,11]) -> write(permitidos) ; write(recusados)), nl,
    (todos_visiveis(ana,[99]) -> write(permitidos) ; write(recusados)), nl,
    (incompleto(ana,[99]) -> write(aceite_erradamente) ; write(recusado)), nl.
