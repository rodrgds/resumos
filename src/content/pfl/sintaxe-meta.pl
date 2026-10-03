:- op(600, xfy, liga).

tarefa(leitura, 2).
tarefa(treino, 1).
tarefa(revisao, 2).

mostrar_rotulo(Nome, Texto) :- atom_concat('tarefa:', Nome, Texto).

imprimir_tarefas(F) :-
    tarefa(Nome, _),
    call(F, Nome, Texto),
    write_portatil(Texto),
    fail.
imprimir_tarefas(_).

write_portatil(X) :- write(X), nl.

main :-
    write_canonical(a liga b liga c), nl,
    Termo =.. [tarefa, treino, 1],
    write_canonical(Termo), nl,
    findall(P-N, tarefa(N,P), Pares),
    keysort(Pares, Ordenados),
    write_portatil(Ordenados),
    imprimir_tarefas(mostrar_rotulo).
