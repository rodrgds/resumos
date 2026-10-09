maximo(X,Y,X) :- X >= Y, !.
maximo(X,Y,Y) :- X < Y.
