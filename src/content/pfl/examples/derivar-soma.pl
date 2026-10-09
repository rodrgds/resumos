derivar(soma(A,B), X, soma(DA,DB)) :-
    derivar(A,X,DA), derivar(B,X,DB).
