import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  traducao: '/cadeiras/md/quantificadores/#domínio-e-tradução',
  ordemQuantificadores:
    '/cadeiras/md/quantificadores/#ordem-dos-quantificadores',
  validade:
    '/cadeiras/md/semantica-primeira-ordem/#validade-satisfazibilidade-e-modelos',
  prenex: '/cadeiras/md/semantica-primeira-ordem/#forma-normal-prenexa',
  eliminarExistencial:
    '/cadeiras/md/provas-primeira-ordem/#eliminar-um-existencial',
  introduzirUniversal:
    '/cadeiras/md/provas-primeira-ordem/#introduzir-um-universal',
  relacoesBinarias: '/cadeiras/md/conjuntos-relacoes/#relações-binárias',
  equivalencias:
    '/cadeiras/md/conjuntos-relacoes/#relações-de-equivalência-e-partições',
  partesCardinalidade:
    '/cadeiras/md/conjuntos-relacoes/#conjunto-das-partes-e-cardinalidade',
  bijetiva:
    '/cadeiras/md/funcoes-cardinalidade/#injetiva-sobrejetiva-e-bijetiva',
};

const contextoPremios = `Numa situação sobre prémios de alunos, usam-se os predicados (além da identidade $=$):
- $Aluno(x, y)$: a pessoa $x$ é aluna do departamento $y$;
- $RecebePremio(x, y)$: a pessoa $x$ recebe como prémio o objeto $y$;
- $Nota(x, y, z)$: a pessoa $x$ teve nota $y$ na cadeira $z$;
- $Proprietario(x, y)$: a pessoa $x$ é dona do objeto $y$.

Factos da situação: quem tem nota 20 a Álgebra (ALG) ou a Análise Matemática (AMAT) recebe uma calculadora XPTO; quem tem 20 às duas recebe um portátil ZUPT. Estão inscritos 70 alunos em ALG e 50 em AMAT. A Isabel e o João são alunos do DEI e não tiveram 20 nem a ALG nem a AMAT, mas já têm cada um a sua calculadora XPTO. O Carlos, aluno do DEQ, teve 20 às duas cadeiras.`;

const contextoEstudantes = `Considere a situação da frequência de unidades curriculares por estudantes:
- $Estudante(x)$: $x$ é estudante; $Curso(x)$: $x$ é um curso; $Uc(x)$: $x$ é uma unidade curricular;
- $Matricula(x, y)$: o estudante $x$ está matriculado no curso $y$;
- $Conclui(x, y)$: o estudante $x$ concluiu a unidade curricular $y$;
- $Frequenta(x, y)$: o estudante $x$ frequenta a unidade curricular $y$.

O José e a Ana estão matriculados no MIEIC e concluíram Matemática Discreta; o Pedro está matriculado no MIEEC e não concluiu ainda nenhuma unidade curricular. O José frequenta Física. A Ana frequenta Física e Programação. O Pedro frequenta Física e Matemática Discreta.`;

export const mt2Quantificadores: ExamQuestion[] = [
  {
    id: 'md-mt2-2019-q1',
    title: 'Tradução de prémio para nota 20 a AMAT',
    source: 'Teste 2, 2019/20',
    topic: 'quantificadores',
    context: contextoPremios,
    prompt:
      'Qual das seguintes frases em linguagem natural traduz fielmente a fórmula $\\forall x\\, [\\,(Aluno(x, dei) \\wedge Nota(x, 20, amat)) \\to \\exists y\\, RecebePremio(x, y)\\,]$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Todos os alunos do DEI que tiveram 20 a AMAT recebem um prémio',
          correct: true,
          explanation:
            'O universal percorre os alunos do DEI com nota 20 a AMAT e a implicação garante a existência de um prémio para cada um deles.',
        },
        {
          text: 'Só os alunos do DEI que tiveram 20 a AMAT recebem um prémio',
          correct: false,
          explanation:
            'A fórmula não exclui que outros alunos recebam prémios; apenas garante o prémio aos do DEI com 20 a AMAT.',
        },
        {
          text: 'Pelo menos um aluno do DEI que teve 20 a AMAT recebeu um prémio',
          correct: false,
          explanation:
            'A fórmula exige o prémio para todos esses alunos, não apenas para um.',
        },
        {
          text: 'Quem teve 20 a AMAT recebe um prémio, seja ou não do DEI',
          correct: false,
          explanation:
            'A fórmula restringe a garantia aos alunos do DEI; não afirma nada sobre os restantes.',
        },
      ],
    },
    solution:
      'A tradução correta é: todos os alunos do DEI que tiveram 20 a AMAT recebem um prémio.',
    reasoning:
      'A estrutura $\\forall x\\,(A(x) \\to \\exists y\\, B(x,y))$ lê-se "para todo o $x$ que satisfaz $A$, existe um $y$ tal que $B$". Aqui $A(x)$ é "$x$ é aluno do DEI com nota 20 a AMAT" e $B(x,y)$ é "$x$ recebe o prémio $y$".',
    explanation: link.traducao,
  },
  {
    id: 'md-mt2-2019-q2',
    title: 'Tradução de prémios apenas no DEI',
    source: 'Teste 2, 2019/20',
    topic: 'quantificadores',
    context: contextoPremios,
    prompt:
      'Qual das seguintes frases em linguagem natural traduz fielmente a fórmula $\\forall x\\,\\forall y\\, [\\, \\neg Aluno(x, y) \\vee \\neg \\exists z\\, RecebePremio(x, z) \\vee y = dei \\,]$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Todos os alunos que recebem pelo menos um prémio são do DEI',
          correct: true,
          explanation:
            'A disjunção equivale a $Aluno(x,y) \\wedge \\exists z\\, RecebePremio(x,z) \\to y = dei$: quem é aluno e recebe prémio tem de ser do DEI.',
        },
        {
          text: 'Nenhum aluno do DEI recebe qualquer prémio',
          correct: false,
          explanation:
            'A fórmula não proíbe prémios no DEI; proíbe prémios fora do DEI.',
        },
        {
          text: 'Todos os alunos que não recebem um prémio são do DEI',
          correct: false,
          explanation:
            'A condição da fórmula é receber pelo menos um prémio, não deixar de receber.',
        },
        {
          text: 'Alguns alunos do DEI recebem um prémio',
          correct: false,
          explanation:
            'A fórmula é universal e não afirma a existência de nenhum prémio.',
        },
      ],
    },
    solution:
      'A tradução correta é: todos os alunos que recebem pelo menos um prémio são do DEI.',
    reasoning:
      'Por equivalência, $\\neg A \\vee \\neg B \\vee C$ é $A \\wedge B \\to C$. Assim, se $x$ é aluno de $y$ e recebe algum prémio, então $y = dei$.',
    explanation: link.traducao,
  },
  {
    id: 'md-mt2-2016-q1',
    title: 'Tradução de quem frequenta Programação não frequentar mais nada',
    source: 'Teste 2, 2016/17',
    topic: 'quantificadores',
    context: contextoEstudantes,
    prompt:
      'Qual das seguintes frases em linguagem natural traduz fielmente a fórmula $\\forall x\\, [\\,(Estudante(x) \\wedge Frequenta(x, prog)) \\to \\neg \\exists y\\, (Uc(y) \\wedge Frequenta(x, y) \\wedge y \\neq prog)\\,]$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Os estudantes que frequentam Programação não frequentam mais nenhuma unidade curricular',
          correct: true,
          explanation:
            'A fórmula proíbe a existência de outra unidade curricular frequentada por quem frequenta Programação.',
        },
        {
          text: 'Se todos os estudantes frequentarem Programação, então não frequentam mais nenhuma unidade curricular',
          correct: false,
          explanation:
            'A condição é por estudante individual, não sobre todos os estudantes em conjunto.',
        },
        {
          text: 'Se algum estudante frequentar Programação, então nenhum estudante frequenta uma unidade curricular além de Programação',
          correct: false,
          explanation:
            'A conclusão da implicação diz respeito ao próprio $x$, não a todos os estudantes.',
        },
        {
          text: 'Todos os estudantes frequentam Programação e mais nenhuma unidade curricular',
          correct: false,
          explanation:
            'A fórmula é uma implicação; não afirma que alguém frequenta Programação.',
        },
      ],
    },
    solution:
      'A tradução correta é: os estudantes que frequentam Programação não frequentam mais nenhuma unidade curricular.',
    reasoning:
      'O existencial negado, $\\neg \\exists y\\, (Uc(y) \\wedge Frequenta(x,y) \\wedge y \\neq prog)$, afirma que não existe outra unidade curricular frequentada por $x$.',
    explanation: link.ordemQuantificadores,
  },
];

export const mt2Semantica: ExamQuestion[] = [
  {
    id: 'md-mt2-2019-q3',
    title: 'Prémio fora do DEI na situação descrita',
    source: 'Teste 2, 2019/20',
    topic: 'semantica',
    context: contextoPremios,
    prompt:
      'Diga se a fórmula $\\exists x\\,\\exists y\\, [\\, RecebePremio(x, y) \\wedge \\neg Aluno(x, dei) \\,]$ é verdadeira ou falsa na situação descrita.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Verdadeira',
          correct: true,
          explanation:
            'O Carlos é aluno do DEQ e teve 20 às duas cadeiras, logo recebe o portátil ZUPT.',
        },
        {
          text: 'Falsa',
          correct: false,
          explanation:
            'Há pelo menos um aluno fora do DEI com prémio: o Carlos, do DEQ.',
        },
      ],
    },
    solution: 'A fórmula é verdadeira na situação descrita.',
    reasoning:
      'Basta um exemplo: $x = carlos$ e $y = zupt$ satisfazem $RecebePremio(x,y)$ e $\\neg Aluno(x, dei)$, pois o Carlos é do DEQ e teve 20 a ALG e a AMAT.',
    explanation: link.validade,
  },
  {
    id: 'md-mt2-2019-q4',
    title: 'Alunos do DEI com calculadora e sem prémio',
    source: 'Teste 2, 2019/20',
    topic: 'semantica',
    context: contextoPremios,
    prompt:
      'Diga se a fórmula $\\forall x\\, [\\,(Aluno(x, dei) \\wedge \\exists y\\, Proprietario(x, y)) \\to \\exists y\\, RecebePremio(x, y)\\,]$ é verdadeira ou falsa na situação descrita.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Falsa',
          correct: true,
          explanation:
            'A Isabel e o João são alunos do DEI, têm calculadora XPTO, mas não recebem prémio algum.',
        },
        {
          text: 'Verdadeira',
          correct: false,
          explanation:
            'A implicação falha para a Isabel e para o João, que violam a conclusão.',
        },
      ],
    },
    solution: 'A fórmula é falsa na situação descrita.',
    reasoning:
      'Para $x = isabel$ (ou $x = joao$), a hipótese $Aluno(x, dei) \\wedge \\exists y\\, Proprietario(x, y)$ é verdadeira, mas $\\exists y\\, RecebePremio(x, y)$ é falsa. Logo o universal é falso.',
    explanation: link.validade,
  },
  {
    id: 'md-mt2-2019-q5',
    title: 'Classificar uma disjunção com quantificadores',
    source: 'Teste 2, 2019/20',
    topic: 'semantica',
    prompt:
      'Classifique a fórmula $(\\exists x\\, Dodec(x) \\to \\forall x\\, Large(x)) \\vee \\forall x\\, (Medium(x) \\to \\exists x\\, Dodec(x))$ quanto a ser tautologia, válida em lógica de primeira ordem (FO), satisfazível ou não satisfazível.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Tautologia',
          correct: false,
          explanation:
            'Abstraindo proposicionalmente, a fórmula é $(P \\to Q) \\vee S$, que não é sempre verdadeira.',
        },
        {
          text: 'Válida FO mas não tautologia',
          correct: true,
          explanation:
            'Se existir algum dodecaedro e nem tudo for grande, então existe algum objeto médio; nesse caso o segundo membro garante $\\exists x\\, Dodec(x)$. Se não houver objetos médios, o segundo membro é vacuamente verdadeiro.',
        },
        {
          text: 'Satisfazível mas não verdade lógica',
          correct: false,
          explanation:
            'A fórmula é verdadeira em todas as estruturas, não apenas em algumas.',
        },
        {
          text: 'Não satisfazível',
          correct: false,
          explanation:
            'Há estruturas que a satisfazem, por exemplo um mundo só com dodecaedros grandes.',
        },
      ],
    },
    solution: 'A fórmula é válida FO, mas não é tautologia.',
    reasoning:
      'Se $\\exists x\\, Dodec(x)$ é falso, o primeiro membro é verdadeiro. Se for verdadeiro e $\\forall x\\, Large(x)$ também, o primeiro membro é verdadeiro. Se $\\exists x\\, Dodec(x)$ for verdadeiro e houver algum objeto não grande, então existe algum objeto médio (esse objeto), e o segundo membro, $\\forall x\\,(Medium(x) \\to \\exists x\\, Dodec(x))$, é verdadeiro porque $\\exists x\\, Dodec(x)$ se verifica. A validade usa o significado dos quantificadores, pelo que não é tautologia.',
    explanation: link.validade,
  },
  {
    id: 'md-mt2-2016-q2',
    title: 'Implicação da forma P implica (Q implica P)',
    source: 'Teste 2, 2016/17',
    topic: 'semantica',
    prompt:
      'Classifique a fórmula $\\exists x\\, Estudante(x) \\to (\\forall y\\, (Curso(y) \\wedge Matricula(ana, y)) \\to \\exists x\\, Estudante(x))$ quanto a ser tautologia, válida FO, satisfazível ou não satisfazível.',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Tautologia',
          correct: true,
          explanation:
            'Abstraindo proposicionalmente, a fórmula tem a forma $P \\to (Q \\to P)$, que é sempre verdadeira.',
        },
        {
          text: 'Válida FO mas não tautologia',
          correct: false,
          explanation:
            'A validade já se vê ao nível proposicional, logo é tautologia.',
        },
        {
          text: 'Satisfazível mas não verdade lógica',
          correct: false,
          explanation: 'É verdadeira em todas as estruturas.',
        },
        {
          text: 'Não satisfazível',
          correct: false,
          explanation: 'É satisfeita, por exemplo, num mundo sem estudantes.',
        },
      ],
    },
    solution: 'A fórmula é uma tautologia.',
    reasoning:
      'Sejam $P = \\exists x\\, Estudante(x)$ e $Q = \\forall y\\,(Curso(y) \\wedge Matricula(ana,y))$. A fórmula é $P \\to (Q \\to P)$, que é verdadeira qualquer que seja o valor de $P$ e $Q$.',
    explanation: link.validade,
  },
];

export const mt2FormasPrenexas: ExamQuestion[] = [
  {
    id: 'md-mt2-2019-q6',
    title: 'Forma prenexa de uma implicação com três blocos',
    source: 'Teste 2, 2019/20',
    topic: 'formas-prenexas',
    prompt:
      'Transforme a fórmula $(\\forall x\\, P(a, x) \\wedge \\forall x\\,\\forall z\\, \\neg S(x, z)) \\to \\neg \\forall x\\, (Q(x, b) \\vee R(x))$ numa forma normal prenexa, apresentando a cadeia de equivalências.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta apresenta uma forma prenexa com quantificadores apenas no início.',
        'Os quantificadores são $\\exists x\\,\\exists y\\,\\exists z$ (por esta ordem).',
        'O corpo é $(P(a, x) \\wedge \\neg S(x, z)) \\to (\\neg Q(y, b) \\wedge \\neg R(y))$.',
      ],
    },
    solution:
      '$\\exists x\\,\\exists y\\,\\exists z\\, ((P(a, x) \\wedge \\neg S(x, z)) \\to (\\neg Q(y, b) \\wedge \\neg R(y)))$.',
    reasoning:
      'A implicação $A \\to \\neg B$ equivale a $\\neg A \\vee \\neg B$. Tem-se $\\neg \\forall x\\, P(a,x) \\equiv \\exists x\\, \\neg P(a,x)$, $\\neg \\forall x\\,\\forall z\\, \\neg S(x,z) \\equiv \\exists x\\,\\exists z\\, S(x,z)$ e $\\neg \\forall x\\,(Q(x,b) \\vee R(x)) \\equiv \\exists x\\,(\\neg Q(x,b) \\wedge \\neg R(x))$. Juntando e renomeando variáveis para evitar capturas, obtém-se $\\exists x\\,(\\neg P(a,x) \\vee \\exists z\\, S(x,z)) \\vee \\exists y\\,(\\neg Q(y,b) \\wedge \\neg R(y))$, que em prenexa dá $\\exists x\\,\\exists y\\,\\exists z\\,((P(a,x) \\wedge \\neg S(x,z)) \\to (\\neg Q(y,b) \\wedge \\neg R(y)))$.',
    explanation: link.prenex,
  },
  {
    id: 'md-mt2-2016-q3',
    title: 'Forma prenexa de uma negação de implicação',
    source: 'Teste 2, 2016/17',
    topic: 'formas-prenexas',
    prompt:
      'Obtenha uma forma normal prenexa da fórmula $\\neg (\\forall x\\,\\exists y\\, P(a, x, y) \\to \\exists x\\, (\\neg \\forall y\\, Q(y, b) \\to R(x)))$, apresentando a cadeia de equivalências.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta usa $\\neg (A \\to B) \\equiv A \\wedge \\neg B$.',
        'A forma prenexa começa por $\\forall x\\,\\exists y\\,\\forall u\\,\\exists v$.',
        'O corpo contém $P(a, x, y) \\wedge \\neg Q(v, b) \\wedge \\neg R(u)$ (a menos de renomeação de variáveis).',
      ],
    },
    solution:
      '$\\forall x\\,\\exists y\\,\\forall u\\,\\exists v\\, (P(a, x, y) \\wedge \\neg Q(v, b) \\wedge \\neg R(u))$.',
    reasoning:
      '$\\neg(A \\to B) \\equiv A \\wedge \\neg B$, com $A = \\forall x\\,\\exists y\\, P(a,x,y)$ e $\\neg B = \\forall x\\,(\\exists y\\, \\neg Q(y,b) \\wedge \\neg R(x))$. Renomeando as variáveis repetidas ($x \\to u$, $y \\to v$ no segundo bloco), obtém-se $\\forall x\\,\\exists y\\, P(a,x,y) \\wedge \\forall u\\,\\exists v\\,(\\neg Q(v,b) \\wedge \\neg R(u))$, cuja prenexa é $\\forall x\\,\\exists y\\,\\forall u\\,\\exists v\\,(P(a,x,y) \\wedge \\neg Q(v,b) \\wedge \\neg R(u))$.',
    explanation: link.prenex,
  },
  {
    id: 'md-mt2-2013-q1',
    title: 'Escolher a forma prenexa correta',
    source: 'Teste 2, 2013/14 (questões de testes anteriores)',
    topic: 'formas-prenexas',
    prompt:
      'Qual das seguintes é uma forma normal prenexa da fórmula $\\forall x\\, (\\forall y\\, (A(x, y) \\wedge \\exists u\\, C(x, u)) \\to \\exists u\\, C(x, u))$?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\forall x\\,\\exists y\\,\\forall u\\,\\exists v\\, ((A(x, y) \\wedge C(x, u)) \\to C(x, v))$',
          correct: true,
          explanation:
            'O antecedente $\\forall y\\,(A(x,y) \\wedge \\exists u\\, C(x,u))$ passa a $\\exists y\\,\\forall u$ e o consequente $\\exists u\\, C(x,u)$ passa a $\\exists v\\, C(x,v)$, com as variáveis todas distintas.',
        },
        {
          text: '$\\forall x\\,\\forall y\\,\\exists u\\,\\exists v\\, ((A(x, y) \\wedge C(x, u)) \\to C(x, v))$',
          correct: false,
          explanation:
            'O $y$ do antecedente fica depois de um universal no prenexo, mas o $\\exists u$ interno tem de sair para fora de $\\forall y$.',
        },
        {
          text: '$\\forall x\\,\\exists y\\,\\forall u\\, ((A(x, y) \\wedge C(x, u)) \\to C(x, u))$',
          correct: false,
          explanation:
            'O $u$ do consequente é um existencial novo e não pode ficar ligado ao $u$ do antecedente.',
        },
        {
          text: '$\\forall x\\,\\exists y\\,\\forall u\\,\\exists u\\, ((A(x, y) \\wedge C(x, u)) \\to C(x, u))$',
          correct: false,
          explanation:
            'A variável $u$ aparece duas vezes como quantificada, o que não é permitido numa prenexa.',
        },
      ],
    },
    solution:
      '$\\forall x\\,\\exists y\\,\\forall u\\,\\exists v\\, ((A(x, y) \\wedge C(x, u)) \\to C(x, v))$.',
    reasoning:
      'A implicação $A \\to B$ equivale a $\\neg A \\vee B$. Como $A$ está precedido de $\\forall y$ e contém $\\exists u$, e $B = \\exists u\\, C(x,u)$ tem de ser renomeado para $\\exists v\\, C(x,v)$, a prenexa correcta é $\\forall x\\,\\exists y\\,\\forall u\\,\\exists v$.',
    explanation: link.prenex,
  },
];

export const mt2Provas: ExamQuestion[] = [
  {
    id: 'md-mt2-2019-q7',
    title: 'Concluir existencial de R a partir de duas premissas',
    source: 'Teste 2, 2019/20',
    topic: 'provas',
    prompt:
      'Será que das premissas $\\forall x\\, (P(x) \\to (\\neg R(x) \\to \\neg Q(x)))$ e $\\exists y\\, (P(y) \\wedge Q(y))$ se pode concluir $\\exists x\\, R(x)$? Se sim, esboce a prova; se não, apresente um contraexemplo.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta diz que o argumento é válido.',
        'A prova usa o contrapositivo da primeira premissa, $Q(x) \\to R(x)$.',
        'A testemunha $c$ de $P(c) \\wedge Q(c)$ dá $R(c)$, logo $\\exists x\\, R(x)$ por introdução do existencial.',
      ],
    },
    solution:
      'Sim, o argumento é válido: de $P(c) \\wedge Q(c)$ e de $P(c) \\to (\\neg R(c) \\to \\neg Q(c))$ segue $Q(c) \\to R(c)$ (contrapositivo), logo $R(c)$ e portanto $\\exists x\\, R(x)$.',
    reasoning:
      'A contrapositiva de $\\neg R(x) \\to \\neg Q(x)$ é $Q(x) \\to R(x)$. Instanciando o universal em $c$ e o existencial numa testemunha $c$ com $P(c) \\wedge Q(c)$, obtém-se $R(c)$ por modus ponens duas vezes.',
    explanation: link.eliminarExistencial,
  },
  {
    id: 'md-mt2-2016-q4',
    title: 'Argumento com contrapositiva em cadeia',
    source: 'Teste 2, 2016/17',
    topic: 'provas',
    prompt:
      'Diga se o argumento com premissas $\\forall x\\, (P(x) \\to Q(x))$, $\\forall x\\, (\\neg R(x) \\to \\neg Q(x))$ e $\\exists z\\, P(z)$ e conclusão $\\exists x\\, R(x)$ é válido. Se for, esboce a prova; se não, apresente um contraexemplo.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta diz que o argumento é válido.',
        'A prova deriva $Q(z)$ de $P(z)$ e depois $R(z)$ da contrapositiva $Q(z) \\to R(z)$.',
        'A conclusão $\\exists x\\, R(x)$ sai por introdução do existencial.',
      ],
    },
    solution:
      'O argumento é válido: de $P(z)$ e $P(z) \\to Q(z)$ sai $Q(z)$; da contrapositiva de $\\neg R(z) \\to \\neg Q(z)$, que é $Q(z) \\to R(z)$, sai $R(z)$; logo $\\exists x\\, R(x)$.',
    reasoning:
      'A segunda premissa equivale a $\\forall x\\,(Q(x) \\to R(x))$. Com a testemunha $z$ de $\\exists z\\, P(z)$, a cadeia $P(z) \\Rightarrow Q(z) \\Rightarrow R(z)$ prova a conclusão.',
    explanation: link.introduzirUniversal,
  },
  {
    id: 'md-mt2-2019-q8',
    title: 'Contagem de formas não é consequência lógica',
    source: 'Teste 2, 2019/20',
    topic: 'provas',
    prompt:
      'Considere a fórmula $\\exists x\\,\\exists y\\, (SameShape(x, y) \\wedge x \\neq y \\wedge \\forall z\\, (SameShape(x, z) \\leftrightarrow (z = x \\vee z = y)))$. Se se estender a linguagem com uma função $card(x)$, que dá o número de objetos da mesma forma de $x$ (incluindo $x$), será que $\\forall x\\, (card(x) = 2)$ é consequência lógica da primeira fórmula? Se sim, justifique; se não, apresente um contraexemplo.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta diz que não é consequência lógica.',
        'O contraexemplo tem dois cubos (por exemplo $a$ e $b$) e um tetraedro ($c$).',
        'Nesse mundo a primeira fórmula é verdadeira, mas $card(c) = 1$, logo $\\forall x\\,(card(x) = 2)$ é falsa.',
      ],
    },
    solution:
      'Não é consequência lógica. Contraexemplo: um mundo com dois cubos $a, b$ e um tetraedro $c$.',
    reasoning:
      'No mundo proposto, $a$ e $b$ têm a mesma forma e são os únicos com essa forma, logo a fórmula dada é verdadeira. Mas o tetraedro $c$ é o único da sua forma, pelo que $card(c) = 1 \\neq 2$, e $\\forall x\\,(card(x) = 2)$ é falso. Como há uma estrutura onde as premissas são verdadeiras e a conclusão é falsa, não há consequência lógica.',
    explanation: link.validade,
  },
];

export const mt2RelacoesFuncoes: ExamQuestion[] = [
  {
    id: 'md-mt2-2006-q1',
    title: 'Propriedades da relação "altura maior ou igual"',
    source: 'Mini-teste 2, 2006/07',
    topic: 'relacoes-funcoes',
    prompt:
      'Considere, no universo das pessoas, a relação $R = \\{(a, b) : altura(a) \\geq altura(b)\\}$. Diga, justificando, se é reflexiva, simétrica, antissimétrica e transitiva, e classifique-a (relação de equivalência, ordem parcial, ordem total ou nenhum destes casos).',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta diz que é reflexiva, transitiva e antissimétrica, mas não simétrica.',
        'A justificação da antissimetria usa o facto de $altura(a) = altura(b)$ quando ambas as desigualdades valem.',
        'A classificação correta é ordem parcial (não total).',
      ],
    },
    solution:
      'É reflexiva ($altura(a) \\geq altura(a)$), transitiva e antissimétrica, mas não simétrica. É uma ordem parcial, não total, porque duas pessoas com alturas diferentes não são comparáveis nos dois sentidos.',
    reasoning:
      'A reflexividade e a transitividade seguem das propriedades de $\\geq$ em $\\mathbb R$. Se $aRb$ e $bRa$, então $altura(a) = altura(b)$, logo vale a antissimetria. Não é simétrica: basta uma pessoa mais alta que outra. Como há pares não comparáveis (alturas distintas), não é ordem total.',
    explanation: link.relacoesBinarias,
  },
  {
    id: 'md-mt2-2006-q2',
    title: 'Classe de equivalência pela altura',
    source: 'Mini-teste 2, 2006/07',
    topic: 'relacoes-funcoes',
    prompt:
      'Considere as pessoas João (180 cm), Maria (160 cm), José (175 cm) e Mariana (160 cm) e a relação $R = \\{(a, b) : altura(a) = altura(b)\\}$. Diga, justificando, se $R$ é relação de equivalência e indique a classe de equivalência da Mariana.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta diz que é relação de equivalência (reflexiva, simétrica e transitiva).',
        'A classe de equivalência da Mariana é $\\{Maria, Mariana\\}$.',
      ],
    },
    solution:
      '$R$ é relação de equivalência e $[Mariana] = \\{Maria, Mariana\\}$.',
    reasoning:
      'A igualdade de alturas é reflexiva, simétrica e transitiva, logo define uma equivalência. A classe da Mariana reúne todas as pessoas com a mesma altura que ela, ou seja, a Maria (160 cm) e a própria Mariana.',
    explanation: link.equivalencias,
  },
  {
    id: 'md-mt2-2006-q3',
    title: 'Relações binárias em {0, 1}',
    source: 'Mini-teste 2, 2006/07',
    topic: 'relacoes-funcoes',
    prompt:
      'No conjunto $\\{0, 1\\}$: (a) quantas relações binárias distintas se podem definir? (b) Dessas, quantas contêm o par $(0, 1)$?',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica 16 relações binárias no total.',
        'A resposta indica 8 relações que contêm o par $(0, 1)$.',
      ],
    },
    solution:
      'Há $2^4 = 16$ relações binárias e $2^3 = 8$ contêm o par $(0, 1)$.',
    reasoning:
      'Uma relação binária em $\\{0,1\\}$ é um subconjunto de $\\{0,1\\} \\times \\{0,1\\}$, que tem 4 pares, logo há $2^4 = 16$ relações. Se $(0,1)$ tem de pertencer, restam 3 pares opcionais, logo há $2^3 = 8$ relações.',
    explanation: link.partesCardinalidade,
  },
  {
    id: 'md-mt2-2006-q4',
    title: 'Quais destas funções de R em R são bijeções',
    source: 'Mini-teste 2, 2006/07',
    topic: 'relacoes-funcoes',
    prompt:
      'Determine quais das seguintes funções de $\\mathbb R$ em $\\mathbb R$ são bijeções: (a) $f(x) = 2x + 1$; (b) $f(x) = x^2 + 1$; (c) $f(x) = x^3$; (d) $f(x) = \\frac{x^2 + 1}{x^2 + 2}$.',
    answer: {
      kind: 'self',
      checklist: [
        'A resposta indica que $2x + 1$ e $x^3$ são bijeções.',
        'A resposta indica que $x^2 + 1$ não é bijeção (não é sobrejetiva nem injetiva).',
        'A resposta indica que $\\frac{x^2+1}{x^2+2}$ não é bijeção (não é injetiva; a imagem é $[1/2, 1[$).',
      ],
    },
    solution:
      'São bijeções $f(x) = 2x + 1$ e $f(x) = x^3$. As outras duas não o são.',
    reasoning:
      '$2x+1$ é injetiva e sobrejetiva (inversa $(y-1)/2$). $x^3$ também o é (inversa $\\sqrt[3]{y}$). $x^2+1$ não é injetiva ($f(1)=f(-1)$) nem sobrejetiva (imagem $[1,+\\infty[$). A rácio $(x^2+1)/(x^2+2)$ não é injetiva (é par) e a sua imagem é $[1/2, 1[$, logo também não é sobrejetiva.',
    explanation: link.bijetiva,
  },
];
