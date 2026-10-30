import type { PrologQuestion } from './questions';

export const questions: PrologQuestion[] = [
  {
    id: 'mt2-allocation-binary-space',
    title: 'Espaço de atribuições binárias',
    prompt:
      'Existem N presentes para distribuir por K pessoas. Uma pessoa pode receber vários presentes ou nenhum. Se usar N×K variáveis binárias para a matriz de atribuição, qual é o tamanho do espaço de procura antes de impor restrições?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'a. $2^{NK}$',
          correct: true,
          explanation:
            'Cada uma das NK variáveis binárias tem duas possibilidades. A exclusividade de atribuição de cada presente é uma restrição posterior.',
        },
        {
          text: 'b. $N^K$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Cada uma das NK variáveis binárias tem duas possibilidades. A exclusividade de atribuição de cada presente é uma restrição posterior.',
        },
        {
          text: 'c. $NK$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Cada uma das NK variáveis binárias tem duas possibilidades. A exclusividade de atribuição de cada presente é uma restrição posterior.',
        },
        {
          text: 'd. $K^N$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Cada uma das NK variáveis binárias tem duas possibilidades. A exclusividade de atribuição de cada presente é uma restrição posterior.',
        },
      ],
    },
    solution: '',
    reasoning:
      'Contam-se atribuições às variáveis da modelação, não apenas soluções válidas.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-allocation-index-space',
    title: 'Uma variável por presente',
    prompt:
      'Existem N presentes e K pessoas, sem limitar quantos presentes cada pessoa recebe. Usando uma variável por presente, cujo domínio são os índices das pessoas, qual é o tamanho do espaço de procura?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'a. $NK$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Há N variáveis e K escolhas independentes para cada uma. Cada atribuição já escolhe uma pessoa por presente.',
        },
        {
          text: 'b. $2^{NK}$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Há N variáveis e K escolhas independentes para cada uma. Cada atribuição já escolhe uma pessoa por presente.',
        },
        {
          text: 'c. $K^N$',
          correct: true,
          explanation:
            'Há N variáveis e K escolhas independentes para cada uma. Cada atribuição já escolhe uma pessoa por presente.',
        },
        {
          text: 'd. $N^K$',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. Há N variáveis e K escolhas independentes para cada uma. Cada atribuição já escolhe uma pessoa por presente.',
        },
      ],
    },
    solution: '',
    reasoning:
      'Mudar a representação muda o número de variáveis e os seus domínios.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
  },
  {
    id: 'mt2-allocation-parity',
    title: 'Atribuir presentes com paridade oposta',
    prompt:
      'Explique as soluções que pres/3 obtém. A variável de índice I representa o destinatário do presente I.',
    answer: {
      kind: 'self',
      checklist: [
        'Identifica uma pessoa em 1..K para cada presente.',
        'Relaciona a paridade do presente com a paridade da pessoa.',
        'Reconhece que uma pessoa pode receber vários presentes.',
      ],
    },
    solution: '',
    reasoning:
      'O presente de índice ímpar só pode ir para uma pessoa de índice par; o presente de índice par só pode ir para uma pessoa de índice ímpar. Não há all_distinct/1 nem uma restrição sobre quantos presentes cada pessoa recebe.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      ':- use_module(library(clpfd)).\npres(N,K,Vars) :-\n    length(Vars,N), domain(Vars,1,K), indices(1,Vars), labeling([],Vars).\nindices(I,[V|Vs]) :- V mod 2 #\\= I mod 2, J is I+1, indices(J,Vs).\nindices(_,[]).\n% Compatibilidade com a notação domain/3.\ndomain(Vars,Lo,Hi) :- Vars ins Lo..Hi.',
  },
  {
    id: 'mt2-allocation-propagation',
    title: 'Propagação antes de labeling',
    prompt:
      'Considere a restrição de paridade do programa. Com propagação por intervalos, a sua colocação altera os domínios antes da pesquisa?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'a. Não.',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. O propagador pode ajustar os extremos do intervalo sem remover todos os valores interiores incompatíveis. Por exemplo, X in 1..10 e X mod 2 #\\= 1 deixam um intervalo 2..10; nem todos os ímpares interiores são eliminados antes de labeling.',
        },
        {
          text: 'b. O limite inferior ou superior do domínio das variáveis é alterado.',
          correct: true,
          explanation:
            'O propagador pode ajustar os extremos do intervalo sem remover todos os valores interiores incompatíveis. Por exemplo, X in 1..10 e X mod 2 #\\= 1 deixam um intervalo 2..10; nem todos os ímpares interiores são eliminados antes de labeling.',
        },
        {
          text: 'c. Todos os valores redundantes são removidos dos domínios das variáveis.',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. O propagador pode ajustar os extremos do intervalo sem remover todos os valores interiores incompatíveis. Por exemplo, X in 1..10 e X mod 2 #\\= 1 deixam um intervalo 2..10; nem todos os ímpares interiores são eliminados antes de labeling.',
        },
        {
          text: 'd. Sim, mas apenas em algumas das variáveis.',
          correct: false,
          explanation:
            'Esta opção não corresponde ao modelo pedido. O propagador pode ajustar os extremos do intervalo sem remover todos os valores interiores incompatíveis. Por exemplo, X in 1..10 e X mod 2 #\\= 1 deixam um intervalo 2..10; nem todos os ímpares interiores são eliminados antes de labeling.',
        },
      ],
    },
    solution: '',
    reasoning:
      'A propagação reduz os domínios, mas não deve ser confundida com a enumeração das soluções. O efeito concreto depende do domínio e do propagador.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      ':- use_module(library(clpfd)).\npres(N,K,Vars) :-\n    length(Vars,N), domain(Vars,1,K), indices(1,Vars), labeling([],Vars).\nindices(I,[V|Vs]) :- V mod 2 #\\= I mod 2, J is I+1, indices(J,Vs).\nindices(_,[]).\n% Compatibilidade com a notação domain/3.\ndomain(Vars,Lo,Hi) :- Vars ins Lo..Hi.',
  },
  {
    id: 'mt2-allocation-reification',
    title: 'Construir uma linha binária',
    prompt:
      'Implemente constroi_bins(+I,+Vars,-LBin) usando materializações. Para cada variável V de Vars, o bit correspondente deve valer 1 se e só se V=I, mantendo a restrição nos dois sentidos. É a linha da pessoa I numa matriz de presentes. O auxiliar constroi_binarias/4 aplica este predicado a cada pessoa de 1 a K.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter: ':- use_module(library(clpfd)).\n% Define constroi_bins/3.',
      tests: [
        {
          name: 'Valores conhecidos',
          code: 'main :- constroi_bins(2,[2,1,2],B), write_canonical(B), nl.',
          output: '[1,0,1]',
        },
        {
          name: 'Do bit ao destinatário',
          code: 'main :- constroi_bins(2,[X],[1]), write_canonical(X), nl.',
          output: '2',
        },
        {
          name: 'Excluir um destinatário',
          code: 'main :- X in 1..3, constroi_bins(2,[X],[0]), findall(X,labeling([],[X]),Xs), write_canonical(Xs), nl.',
          output: '[1,3]',
        },
        {
          name: 'Sem presentes',
          code: 'main :- constroi_bins(1,[],B), write_canonical(B), nl.',
          output: '[]',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\nconstroi_bins(_,[],[]).\nconstroi_bins(I,[V|Vs],[B|Bs]) :-\n    B #<==> (V #= I), constroi_bins(I,Vs,Bs).',
    reasoning:
      'A equivalência reificada B #<==> (V #= I) permite deduzir o bit a partir do destinatário e restringir o destinatário a partir do bit.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      'constroi_binarias(I,K,Vars,[LBin|LBins]) :-\n    I =< K, !, constroi_bins(I,Vars,LBin),\n    J is I+1, constroi_binarias(J,K,Vars,LBins).\nconstroi_binarias(_,_,_,[]).',
  },
  {
    id: 'mt2-allocation-compartments',
    title: 'Distribuir objetos pelo armário',
    prompt:
      'Implemente prat(+Prateleiras,+Objetos,-Vars) em CLP(FD). Prateleiras é a matriz de capacidades e Objetos contém pares Peso-Volume. Vars indica o compartimento de cada objeto. No exemplo pequeno prat([[30,6],[75,15]],[176-40,396-24,474-35,250-8,149-5,479-5],Vars), as soluções são [3,1,3,4,1,4] e [3,1,3,4,2,4]. Os factos do exemplo maior estão no código inicial; uma resposta parcial é Vars=[12,13,9,14,20,8,20,10,16,18|...].',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- use_module(library(clpfd)).\narmario([[20,30,6,50],[50,75,15,125],[60,90,18,150],[30,45,9,75],[40,60,12,100]]).\nobjetos([114-54,305-30,295-53,376-39,468-84,114-48,337-11,259-80,473-28,386-55,258-39,391-37,365-76,251-18,144-42,399-94,463-48,473-9,132-56,367-81]).\n% Define prat/3.',
      tests: [
        {
          name: 'Todas as distribuições pequenas',
          code: 'main :- findall(V,prat([[30,6],[75,15]],[176-40,396-24,474-35,250-8,149-5,479-5],V),Vs), sort(Vs,S), write_canonical(S), nl.',
          output: '[[3,1,3,4,1,4],[3,1,3,4,2,4]]',
        },
        {
          name: 'Só cabe em baixo',
          code: 'main :- prat([[1],[3]],[2-2],V), write_canonical(V), nl.',
          output: '[2]',
        },
        {
          name: 'Volume excessivo',
          code: 'main :- (prat([[1],[1]],[2-2],_) -> write(true) ; write(false)), nl.',
          output: 'false',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\narmario([[20,30,6,50],[50,75,15,125],[60,90,18,150],[30,45,9,75],[40,60,12,100]]).\nobjetos([114-54,305-30,295-53,376-39,468-84,114-48,337-11,259-80,473-28,386-55,258-39,391-37,365-76,251-18,144-42,399-94,463-48,473-9,132-56,367-81]).\nprat(Rows,Objects,Vars) :-\n    Rows=[First|_], length(First,Cols), maplist(same_length(First),Rows),\n    append(Rows,Caps), length(Caps,K), same_length(Objects,Vars), Vars ins 1..K,\n    object_data(Objects,Weights,Volumes),\n    compartment_loads(Caps,1,Vars,Weights,Volumes,Loads),\n    Last is K-Cols, numlist(1,Last,Upper), maplist(not_heavier(Loads,Cols),Upper),\n    labeling([],Vars).\nobject_data([],[],[]).\nobject_data([W-V|Os],[W|Ws],[V|Vs]) :- object_data(Os,Ws,Vs).\ncompartment_loads([],_,_,_,_,[]).\ncompartment_loads([Cap|Caps],I,Vars,Weights,Volumes,[Load|Loads]) :-\n    maplist(in_slot(I),Vars,Bits), scalar_product(Volumes,Bits,#=<,Cap),\n    scalar_product(Weights,Bits,#=,Load),\n    J is I+1, compartment_loads(Caps,J,Vars,Weights,Volumes,Loads).\nin_slot(I,V,B) :- B #<==> (V #= I).\nnot_heavier(Loads,Cols,I) :-\n    J is I+Cols, nth1(I,Loads,Upper), nth1(J,Loads,Lower), Upper #=< Lower.',
    reasoning:
      'Materializa-se a atribuição de cada objeto a cada compartimento. Produtos escalares somam volumes e pesos; a capacidade limita o volume e uma comparação por coluna limita o peso superior.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    context:
      'Há N objetos maleáveis, com peso em gramas e volume em cm³, para distribuir por compartimentos de um armário matricial. Cada compartimento tem uma capacidade volumétrica. O peso total num compartimento não pode ser superior ao do compartimento imediatamente abaixo na mesma coluna. Numere os compartimentos por linhas, da esquerda para a direita e de cima para baixo.',
  },
  {
    id: 'mt2-allocation-compartment-model',
    title: 'Escolher as variáveis do armário',
    prompt:
      'Descreva a modelação do armário: variáveis de decisão, domínios e significado. Prateleiras contém a matriz de capacidades e cada objeto é um par Peso-Volume.',
    answer: {
      kind: 'self',
      checklist: [
        'Uma variável por objeto com domínio dos índices dos compartimentos.',
        'Materializa cada atribuição para calcular volumes e pesos.',
        'Impõe a capacidade de cada compartimento e a ordem vertical dos pesos.',
      ],
    },
    solution: '',
    reasoning:
      'Use X_i em 1..K para o compartimento do objeto i. Para cada compartimento j, B_ij equivale a X_i=j. A soma Volume_i×B_ij não excede a capacidade j; a soma Peso_i×B_ij é o peso j. Para cada posição que tenha uma posição inferior na mesma coluna, imponha Peso_j ≤ Peso_inferior. A pesquisa etiqueta os X_i.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      'armario([[20,30,6,50],[50,75,15,125],[60,90,18,150],[30,45,9,75],[40,60,12,100]]).\nobjetos([114-54,305-30,295-53,376-39,468-84,114-48,337-11,259-80,473-28,386-55,258-39,391-37,365-76,251-18,144-42,399-94,463-48,473-9,132-56,367-81]).',
    context:
      'Há N objetos maleáveis, com peso em gramas e volume em cm³, para distribuir por compartimentos de um armário matricial. Cada compartimento tem uma capacidade volumétrica. O peso total num compartimento não pode ser superior ao do compartimento imediatamente abaixo na mesma coluna. Numere os compartimentos por linhas, da esquerda para a direita e de cima para baixo.',
  },
  {
    id: 'mt2-allocation-furniture',
    title: 'Planear o transporte de mobília',
    prompt:
      'Construa a programação em CLP(FD), minimizando o instante de conclusão e respeitando o máximo. Para testar sem impor um formato de impressão, implemente furniture(-Schedule,-Total): Schedule contém task(Nome,Inicio,Fim), uma vez por objeto. Os factos objeto/3, homens/1 e tempo_max/1 são fornecidos. O predicado de apresentação furniture/0 é opcional. Uma programação ótima é piano 0–30, cadeira 0–10, cama 30–45 e mesa 45–60, com Total=60; qualquer programação ótima válida é aceite.',
    answer: {
      kind: 'code',
      language: 'prolog',
      starter:
        ':- use_module(library(clpfd)).\n:- dynamic objeto/3, homens/1, tempo_max/1.\nobjeto(piano,3,30).\nobjeto(cadeira,1,10).\nobjeto(cama,3,15).\nobjeto(mesa,2,15).\nhomens(4).\ntempo_max(60).\n% Define furniture/2.',
      tests: [
        {
          name: 'Quatro trabalhadores',
          code: 'valid_schedule(Plan,Total) :-\n    findall(N,objeto(N,_,_),Names), findall(N,member(task(N,_,_),Plan),Got),\n    msort(Names,Sorted), msort(Got,Sorted),\n    forall(member(task(N,S,E),Plan),(objeto(N,_,D),integer(S),integer(E),S>=0,E-S=:=D,E=<Total)),\n    findall(E,member(task(_,_,E),Plan),Ends), max_list(Ends,Total),\n    homens(Limit), tempo_max(Max), Total=<Max, Last is Total-1,\n    forall(between(0,Last,T),(findall(R,(member(task(N,S,E),Plan),S=<T,T<E,objeto(N,R,_)),Rs),sum_list(Rs,Load),Load=<Limit)).\nmain :- furniture(P,T), (valid_schedule(P,T) -> V=true ; V=false), write_canonical(result(T,V)), nl.',
          output: 'result(60,true)',
        },
        {
          name: 'Outros objetos e limites',
          code: 'valid_schedule(Plan,Total) :-\n    findall(N,objeto(N,_,_),Names), findall(N,member(task(N,_,_),Plan),Got),\n    msort(Names,Sorted), msort(Got,Sorted),\n    forall(member(task(N,S,E),Plan),(objeto(N,_,D),integer(S),integer(E),S>=0,E-S=:=D,E=<Total)),\n    findall(E,member(task(_,_,E),Plan),Ends), max_list(Ends,Total),\n    homens(Limit), tempo_max(Max), Total=<Max, Last is Total-1,\n    forall(between(0,Last,T),(findall(R,(member(task(N,S,E),Plan),S=<T,T<E,objeto(N,R,_)),Rs),sum_list(Rs,Load),Load=<Limit)).\nmain :- retractall(objeto(_,_,_)),retractall(homens(_)),retractall(tempo_max(_)),assertz(objeto(a,1,3)),assertz(objeto(b,1,2)),assertz(homens(2)),assertz(tempo_max(10)),furniture(P,T),(valid_schedule(P,T) -> V=true ; V=false),write_canonical(result(T,V)),nl.',
          output: 'result(3,true)',
        },
        {
          name: 'Recursos insuficientes',
          code: 'main :- retractall(homens(_)),assertz(homens(2)),(furniture(_,_) -> write(true) ; write(false)),nl.',
          output: 'false',
        },
      ],
    },
    solution:
      ':- use_module(library(clpfd)).\n:- dynamic objeto/3, homens/1, tempo_max/1.\nobjeto(piano,3,30).\nobjeto(cadeira,1,10).\nobjeto(cama,3,15).\nobjeto(mesa,2,15).\nhomens(4).\ntempo_max(60).\nfurniture(Schedule,Total) :-\n    findall(obj(N,R,D),objeto(N,R,D),Objs), homens(Limit), tempo_max(Max),\n    same_length(Objs,Starts), same_length(Objs,Ends),\n    Starts ins 0..Max, Ends ins 0..Max,\n    build_jobs(Objs,Starts,Ends,Tasks,Schedule),\n    cumulative(Tasks,[limit(Limit)]), max_end(Ends,Total),\n    once(labeling([min(Total),ffc,bisect],Starts)).\nbuild_jobs([],[],[],[],[]).\nbuild_jobs([obj(N,R,D)|Os],[S|Ss],[E|Es],[task(S,D,E,R,N)|Ts],[task(N,S,E)|Ps]) :-\n    E #= S+D, build_jobs(Os,Ss,Es,Ts,Ps).\nmax_end([],0).\nmax_end([E|Es],M) :- max_end(Es,Rest), M #= max(E,Rest).',
    reasoning:
      'Uma variável indica o início de cada tarefa. O fim é início mais duração. cumulative/2 limita trabalhadores simultâneos, o máximo dos fins dá o tempo total e a pesquisa minimiza esse total.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    context:
      'Existem quatro trabalhadores e, no máximo, 60 minutos. Transportar um piano exige três trabalhadores durante 30 minutos; uma cadeira, um durante 10; uma cama, três durante 15; uma mesa, dois durante 15. As tarefas não podem ser interrompidas. Pretende-se concluir tudo no menor tempo possível. O programa tem de funcionar também com outros objetos, números de trabalhadores e limites de tempo.',
  },
  {
    id: 'mt2-allocation-furniture-model',
    title: 'Escolher as variáveis do horário',
    prompt:
      'Descreva a modelação do transporte de mobília, as variáveis de decisão, os seus domínios e significado.',
    answer: {
      kind: 'self',
      checklist: [
        'Define início e fim de cada tarefa e o tempo total.',
        'Relaciona início, duração e fim.',
        'Impõe os recursos simultâneos, o limite de tempo e a minimização.',
      ],
    },
    solution: '',
    reasoning:
      'Use um início S_i em 0..TempoMax por objeto e um fim E_i=S_i+Duração_i, também limitado por TempoMax. Cada tarefa consome o número de trabalhadores indicado no seu facto durante [S_i,E_i). cumulative/2 limita o consumo agregado ao total de homens. Total é o máximo dos E_i e deve ser minimizado na pesquisa.',
    explanation: '/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética',
    definitions:
      ':- dynamic objeto/3, homens/1, tempo_max/1.\nobjeto(piano,3,30).\nobjeto(cadeira,1,10).\nobjeto(cama,3,15).\nobjeto(mesa,2,15).\nhomens(4).\ntempo_max(60).',
    context:
      'Existem quatro trabalhadores e, no máximo, 60 minutos. Transportar um piano exige três trabalhadores durante 30 minutos; uma cadeira, um durante 10; uma cama, três durante 15; uma mesa, dois durante 15. As tarefas não podem ser interrompidas. Pretende-se concluir tudo no menor tempo possível. O programa tem de funcionar também com outros objetos, números de trabalhadores e limites de tempo.',
  },
];
