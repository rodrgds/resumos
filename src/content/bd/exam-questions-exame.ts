import type { ExamQuestion } from '../../lib/exam-question';

const link = {
  algebra: '/cadeiras/bd/algebra-relacional/#equivalências-e-execução',
  having: '/cadeiras/bd/sql-consultas/#group-by-e-having',
  fecho: '/cadeiras/bd/normalizacao/#fecho-de-um-conjunto-de-atributos',
  classificacao: '/cadeiras/bd/normalizacao/#classificar-uma-relação',
  vistas: '/cadeiras/bd/vistas-gatilhos-acessos/#vistas-perguntas-com-nome',
  gatilhos:
    '/cadeiras/bd/vistas-gatilhos-acessos/#gatilhos-evento-condição-e-ação',
  nosql: '/cadeiras/bd/armazens-dados-nosql/#replicação-partição-e-cap',
};

export const exameAlgebra: ExamQuestion[] = [
  {
    id: 'bd-exame-2016-q1',
    title: 'Consulta SQL equivalente em álgebra relacional',
    source: 'Exame 2016',
    topic: 'algebra',
    prompt: `Qual das seguintes expressões em álgebra relacional é equivalente à consulta SQL?

\`\`\`sql
SELECT c1, MAX(c2)
FROM T1 NATURAL JOIN T2
WHERE c3 = 5
GROUP BY c1;
\`\`\``,
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\sigma_{c3=5}(\\pi_{c1,\\mathrm{MAX}(c2)}(T1 \\bowtie T2))$',
          correct: false,
          explanation:
            'A seleção é aplicada depois da projeção e da agregação, quando deve incidir sobre a junção antes de projetar.',
        },
        {
          text: '$\\mathrm{MAX}_{c2}(\\pi_{c1}(\\sigma_{c3=5}(T1) \\bowtie T2))$',
          correct: false,
          explanation:
            'O operador de agregação não pode ser aplicado a uma mera projeção de $c1$.',
        },
        {
          text: '$\\pi_{c1,\\mathrm{MAX}(c2)}(\\sigma_{c3=5}(T1) \\bowtie T2)$',
          correct: false,
          explanation:
            'Selecionar $c3=5$ só em $T1$ ignora a condição sobre a junção das duas tabelas.',
        },
        {
          text: '$\\pi_{c1,\\mathrm{MAX}(c2)}(\\sigma_{c3=5}(T1 \\bowtie T2))$',
          correct: true,
          explanation:
            'O WHERE dá a seleção $\\sigma_{c3=5}$ sobre a junção, e o GROUP BY com MAX(c2) corresponde à agregação na projeção.',
        },
      ],
    },
    solution:
      'Opção d: $\\pi_{c1,\\mathrm{MAX}(c2)}(\\sigma_{c3=5}(T1 \\bowtie T2))$, com agregação de $\\mathrm{MAX}(c2)$ por grupo $c1$.',
    reasoning:
      'Na tradução de SQL para álgebra relacional, o FROM corresponde à junção, o WHERE à seleção e o GROUP BY em conjunto com as funções de agregação do SELECT corresponde à agregação na projecção. Assim, primeiro se faz $T1 \\bowtie T2$, depois $\\sigma_{c3=5}$ e por fim projeta-se $c1$ com $\\mathrm{MAX}(c2)$ agrupado por $c1$.',
    explanation: link.algebra,
  },
  {
    id: 'bd-exame-2016r-q1',
    title: 'Junção com condição em álgebra relacional',
    source: 'Exame de recurso 2016',
    topic: 'algebra',
    prompt: `Qual das seguintes expressões em álgebra relacional é equivalente à consulta SQL?

\`\`\`sql
SELECT a
FROM T1 JOIN T2
WHERE T1.a > T2.b AND c = -1;
\`\`\``,
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$\\sigma_{c=-1 \\wedge T1.a>T2.b}(\\pi_{a}(T1 \\bowtie T2))$',
          correct: false,
          explanation:
            'A condição de junção $T1.a > T2.b$ não pode ficar numa seleção depois de uma junção natural, que não a impõe.',
        },
        {
          text: '$\\pi_{a}((\\sigma_{c=-1}(T1)) \\bowtie_{T1.a>T2.b} T2)$',
          correct: false,
          explanation:
            'A condição $c=-1$ pode dizer respeito a qualquer das tabelas, não só a $T1$.',
        },
        {
          text: '$\\sigma_{c=-1}(\\pi_{a}(T1 \\bowtie_{T1.a>T2.b} T2))$',
          correct: false,
          explanation:
            'A seleção não pode ser aplicada depois da projecção, que já eliminou os atributos necessários à condição.',
        },
        {
          text: '$\\pi_{a}(\\sigma_{c=-1}(T1 \\bowtie_{T1.a>T2.b} T2))$',
          correct: true,
          explanation:
            'Faz-se a junção com a condição $T1.a>T2.b$, aplica-se a seleção $c=-1$ e projeta-se $a$.',
        },
      ],
    },
    solution:
      'Opção d: $\\pi_{a}(\\sigma_{c=-1}(T1 \\bowtie_{T1.a>T2.b} T2))$.',
    reasoning:
      'A junção com a condição $T1.a > T2.b$ traduz-se por $\\bowtie_{T1.a>T2.b}$, o filtro $c=-1$ por $\\sigma_{c=-1}$ e o SELECT a por $\\pi_a$. A ordem correta é junção, seleção e projecção.',
    explanation: link.algebra,
  },
];

export const exameConsultas: ExamQuestion[] = [
  {
    id: 'bd-exame-2023-q1',
    title: 'Partidos cuja sigla começa por letra diferente da designação',
    source: 'Teste 1 SQL, 2023/24',
    topic: 'consultas',
    context:
      `Considere a base de dados das eleições legislativas de 1999, com as tabelas ` +
      '`PARTIES(ACRONYM, DESIGNATION)`, `DISTRICTS(CODE, NAME, REGION)`, ' +
      '`MUNICIPALITIES(CODE, NAME, DISTRICT)`, `PARISHES(CODE, NAME, MUNICIPALITY)`, ' +
      '`VOTINGS(PARISH, PARTY, VOTES)`, `LISTS(DISTRICT, PARTY, SEATS)` e ' +
      '`PARTICIPATIONS(DISTRICT, REGISTERED_VOTERS, VOTERS, ABSTENTIONS, NULL_VOTES, BLANK_VOTES)`.',
    prompt:
      'Selecione o acronym e a designation da tabela PARTIES onde a primeira letra do acronym é diferente da primeira letra da designation (em SQLite existe a função `substr(string, start, length)`). Ordene por acronym.',
    answer: {
      kind: 'self',
      checklist: [
        'A consulta usa `substr` para comparar a primeira letra do acronym com a primeira letra da designation.',
        'A comparação usa o operador de diferença (`<>`).',
        'Os resultados são ordenados por acronym.',
      ],
    },
    solution: `\`\`\`sql
SELECT ACRONYM, DESIGNATION
FROM PARTIES
WHERE SUBSTR(ACRONYM, 1, 1) <> SUBSTR(DESIGNATION, 1, 1)
ORDER BY ACRONYM ASC;
\`\`\``,
    reasoning:
      '`SUBSTR(ACRONYM, 1, 1)` extrai a primeira letra da sigla e `SUBSTR(DESIGNATION, 1, 1)` a primeira letra da designação. O filtro `<>` guarda apenas os partidos em que diferem, e `ORDER BY ACRONYM` ordena o resultado.',
  },
  {
    id: 'bd-exame-2023-q2',
    title: 'Distritos do continente com freguesia de mesmo nome',
    source: 'Teste 1 SQL, 2023/24',
    topic: 'consultas',
    context:
      `Considere a base de dados das eleições legislativas de 1999, com as tabelas ` +
      '`PARTIES(ACRONYM, DESIGNATION)`, `DISTRICTS(CODE, NAME, REGION)`, ' +
      '`MUNICIPALITIES(CODE, NAME, DISTRICT)`, `PARISHES(CODE, NAME, MUNICIPALITY)`, ' +
      '`VOTINGS(PARISH, PARTY, VOTES)`, `LISTS(DISTRICT, PARTY, SEATS)` e ' +
      "`PARTICIPATIONS(DISTRICT, REGISTERED_VOTERS, VOTERS, ABSTENTIONS, NULL_VOTES, BLANK_VOTES)`. A região é 'C' no continente, 'A' nos Açores e 'M' na Madeira.",
    prompt:
      "Selecione os nomes dos distritos da região 'C' para os quais existe uma freguesia com o mesmo nome. Ordene pelo nome.",
    answer: {
      kind: 'self',
      checklist: [
        "A consulta restringe os distritos à região `'C'`.",
        'Usa uma subconsulta (ou junção) para verificar a existência de uma freguesia com o mesmo nome no distrito.',
        'Os resultados são ordenados pelo nome.',
      ],
    },
    solution: `\`\`\`sql
SELECT D.NAME
FROM DISTRICTS D
WHERE D.REGION = 'C'
  AND D.NAME IN (
    SELECT P.NAME
    FROM MUNICIPALITIES M
    JOIN PARISHES P ON P.MUNICIPALITY = M.CODE
    WHERE M.DISTRICT = D.CODE
  )
ORDER BY D.NAME ASC;
\`\`\``,
    reasoning:
      'Para cada distrito do continente, a subconsulta percorre os seus municípios e as respetivas freguesias e devolve os nomes de freguesias; o `IN` verifica se o nome do distrito consta dessa lista.',
  },
  {
    id: 'bd-exame-2015-q1',
    title: 'Utilizadores sem fotografias',
    source: 'Exame 2015',
    topic: 'consultas',
    context:
      `Considere a base de dados de uma rede social de fotografias, com as tabelas ` +
      '`User(id, name)`, `Photo(id, caption, creationDate, uploadDate, user)`, ' +
      '`AppearsIn(user, photo)`, `Likes(user, photo)` e `Friend(user1, user2)`.',
    prompt:
      'Selecione os nomes dos utilizadores que não têm nenhuma fotografia na rede social.',
    answer: {
      kind: 'self',
      checklist: [
        'A consulta usa uma subconsulta sobre a tabela Photo para detetar utilizadores sem fotos.',
        'Usa `NOT IN` (ou equivalente) para filtrar esses utilizadores.',
        'O resultado são os nomes distintos dos utilizadores.',
      ],
    },
    solution: `\`\`\`sql
SELECT DISTINCT name
FROM User
WHERE id NOT IN (
    SELECT user
    FROM Photo
);
\`\`\``,
    reasoning:
      'A subconsulta `SELECT user FROM Photo` devolve os identificadores de todos os utilizadores com pelo menos uma fotografia. O `NOT IN` exclui esses utilizadores, sobrando os que nunca publicaram fotos.',
  },
  {
    id: 'bd-exame-2016-q2',
    title: 'Estudantes com mais de três amigos',
    source: 'Exame 2016',
    topic: 'consultas',
    context:
      `Considere a base de dados ` +
      '`Estudante(ID, nome, anoCurricular, curso)`, `Curso(id, nome)` e `Amizade(ID1, ID2)`, ' +
      'onde cada linha de Amizade regista uma amizade entre dois estudantes.',
    prompt: 'Selecione os nomes dos estudantes que têm mais de 3 amigos.',
    answer: {
      kind: 'self',
      checklist: [
        'A consulta junta Estudante com Amizade pela chave do estudante.',
        'Usa `GROUP BY` sobre o estudante e `HAVING COUNT(*) > 3`.',
        'O resultado são apenas os nomes dos estudantes.',
      ],
    },
    solution: `\`\`\`sql
SELECT nome
FROM Estudante, Amizade
WHERE Estudante.ID = Amizade.ID1
GROUP BY Estudante.ID
HAVING COUNT(*) > 3;
\`\`\``,
    reasoning:
      'Cada linha de Amizade com `ID1 = Estudante.ID` é um amigo do estudante. A junção com essa condição seguida de `GROUP BY Estudante.ID` conta os amigos de cada estudante, e o `HAVING COUNT(*) > 3` filtra os que têm mais de três.',
    explanation: link.having,
  },
];

export const exameNormalizacao: ExamQuestion[] = [
  {
    id: 'bd-exame-2016-q3',
    title: 'Dependência funcional que não se pode obter',
    source: 'Exame 2016',
    topic: 'normalizacao',
    prompt: `Considere o esquema relacional $R(A, B, C, D, E, F, G, H)$ com as dependências funcionais $ABC \\to DGH$, $F \\to B$, $B \\to E$ e $G \\to H$. Qual das seguintes dependências funcionais não pode ser obtida a partir destas?`,
    answer: {
      kind: 'choice',
      options: [
        {
          text: '$ACD \\to D$',
          correct: false,
          explanation:
            'É uma dependência trivial, pois $D$ já pertence ao lado esquerdo.',
        },
        {
          text: '$AF \\to D$',
          correct: true,
          explanation:
            'O fecho de $AF$ é $AF^+ = \\{A, B, E, F\\}$, que não contém $D$, logo a dependência não se segue.',
        },
        {
          text: '$AF \\to E$',
          correct: false,
          explanation:
            'De $AF$ chega-se a $B$ por $F \\to B$ e a $E$ por $B \\to E$.',
        },
        {
          text: '$AFC \\to D$',
          correct: false,
          explanation:
            'De $AFC$ chega-se a $B$ e $E$; como já se tem $A$, $B$ e $C$, a regra $ABC \\to DGH$ dá $D$.',
        },
      ],
    },
    solution: 'A dependência $AF \\to D$ não pode ser obtida.',
    reasoning:
      'Calcula-se o fecho de cada lado esquerdo. $AF^+ = \\{A, F\\} \\cup \\{B\\} \\cup \\{E\\} = \\{A, B, E, F\\}$, que não inclui $D$. Todas as outras opções são triviais ou deriváveis pelas regras de Armstrong.',
    explanation: link.fecho,
  },
  {
    id: 'bd-exame-2016-q4',
    title: 'Classificação de R quanto à BCNF',
    source: 'Exame 2016',
    topic: 'normalizacao',
    prompt: `Considere o esquema relacional $R(A, B, C, D, E, F, G, H)$ com as dependências funcionais $ABC \\to DGH$, $F \\to B$, $B \\to E$ e $G \\to H$. Verifique se a relação $R$ se encontra na forma normal de Boyce-Codd. Justifique.`,
    answer: {
      kind: 'self',
      checklist: [
        'A resposta calcula uma chave candidata de $R$ (por exemplo, $ABCF$).',
        'A resposta verifica que o lado esquerdo de cada dependência não trivial não é superchave.',
        'A conclusão é que $R$ não está na BCNF.',
      ],
    },
    solution:
      '$R$ não está na BCNF. A chave candidata é $ABCF$, pois $ABCF^+ = \\{A, B, C, D, E, F, G, H\\}$. Todas as dependências não triviais têm lado esquerdo ($ABC$, $F$, $B$, $G$) que não é superchave, pelo que a condição da BCNF é violada.',
    reasoning:
      'Para estar na BCNF, o lado esquerdo de todas as dependências não triviais deve ser uma superchave. Aqui, por exemplo, $F \\to B$ tem lado esquerdo $F$, que não determina todos os atributos, logo a relação não está na BCNF.',
    explanation: link.classificacao,
  },
  {
    id: 'bd-exame-2015-q2',
    title: 'Forma normal de uma relação com atributos atómicos',
    source: 'Exame 2015',
    topic: 'normalizacao',
    prompt: `Diga em que forma normal se encontra o esquema relacional $R(A, B, C, D, E)$, sabendo que contém as dependências funcionais $\\{A \\to C;\\; AB \\to DE\\}$ e que os 5 atributos são atómicos.`,
    answer: {
      kind: 'choice',
      options: [
        {
          text: '3ª FN',
          correct: false,
          explanation:
            'A dependência $A \\to C$ viola a 3ª FN: $A$ não é superchave e $C$ não é atributo primo.',
        },
        {
          text: '1ª FN',
          correct: true,
          explanation:
            'Os atributos são atómicos, logo está na 1ª FN; mas $A \\to C$ é uma dependência parcial da chave $AB$, pelo que não está na 2ª FN.',
        },
        {
          text: 'BCNF',
          correct: false,
          explanation: '$A \\to C$ viola a BCNF, pois $A$ não é superchave.',
        },
        {
          text: '2ª FN',
          correct: false,
          explanation:
            'A chave candidata é $AB$ e $A \\to C$ é uma dependência parcial, logo não está na 2ª FN.',
        },
      ],
    },
    solution: 'A relação está na 1ª FN.',
    reasoning:
      'A chave candidata é $AB$, pois $AB^+ = \\{A, B, C, D, E\\}$. Como todos os atributos são atómicos, a relação está na 1ª FN. A dependência $A \\to C$ mostra que um subconjunto próprio da chave determina um atributo não primo ($C$), pelo que há dependência parcial e a relação não está na 2ª FN (nem em formas superiores).',
    explanation: link.classificacao,
  },
];

export const exameVistasGatilhos: ExamQuestion[] = [
  {
    id: 'bd-exame-2016-q5',
    title: 'O que se pode fazer com uma vista',
    source: 'Exame 2016',
    topic: 'vistas-gatilhos',
    prompt:
      'Em SQL, uma vista pode ser usada como uma tabela excepto no que respeita a inserções: como se comportam as inserções numa vista?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Uma vista pode ser usada como qualquer tabela, sem restrições.',
          correct: false,
          explanation:
            'As inserções numa vista que junta várias tabelas nem sempre são possíveis.',
        },
        {
          text: 'Uma vista pode ser usada como qualquer tabela, exceto que só permite a inserção de registos se não juntar várias tabelas.',
          correct: true,
          explanation:
            'Numa vista simples (sem junção de várias tabelas) a inserção é possível; em vistas com junções a atualização é ambígua.',
        },
        {
          text: 'Uma vista pode ser usada como qualquer tabela, exceto para operações de DELETE.',
          correct: false,
          explanation:
            'As limitações incidem sobre as atualizações em geral, não especificamente sobre o DELETE.',
        },
        {
          text: 'Uma vista só pode ser usada como tabela se for materializada.',
          correct: false,
          explanation:
            'Uma vista virtual também pode ser consultada como tabela.',
        },
      ],
    },
    solution:
      'Uma vista pode ser usada como qualquer tabela, exceto que só permite a inserção de registos se não juntar várias tabelas.',
    reasoning:
      'Uma vista é uma tabela virtual definida por uma consulta. Pode ser consultada como qualquer tabela, mas inserir registos numa vista que junta várias tabelas é ambíguo (não se sabe em que tabela colocar cada tuplo), ao passo que numa vista simples a inserção é possível.',
    explanation: link.vistas,
  },
  {
    id: 'bd-exame-2016-q6',
    title: 'Gatilho de amizade automática no mesmo curso',
    source: 'Exame 2016',
    topic: 'vistas-gatilhos',
    context:
      `Considere a base de dados ` +
      '`Estudante(ID, nome, anoCurricular, curso)`, `Curso(id, nome)` e `Amizade(ID1, ID2)`.',
    prompt:
      `Crie um gatilho ` +
      '`AmizadeMesmoCurso`' +
      ` que, sempre que um novo estudante é inserido na tabela Estudante, cria um registo de amizade entre esse estudante e cada um dos estudantes do mesmo curso (em ambos os sentidos, sem pares repetidos nem auto-amizades).`,
    answer: {
      kind: 'self',
      checklist: [
        'O gatilho é `AFTER INSERT ON Estudante` e percorre as linhas com `FOR EACH ROW`.',
        'A ação insere na tabela Amizade os pares do novo estudante com os colegas do mesmo curso, excluindo o próprio.',
        'A consulta de seleção restringe `curso` igual e `ID` diferente do novo estudante.',
      ],
    },
    solution: `\`\`\`sql
CREATE TRIGGER AmizadeMesmoCurso
AFTER INSERT ON Estudante
FOR EACH ROW
BEGIN
    INSERT INTO Amizade(ID1, ID2)
    SELECT e1.ID, e2.ID
    FROM Estudante AS e1, Estudante AS e2
    WHERE (e1.ID = NEW.ID OR e2.ID = NEW.ID)
      AND e1.curso = e2.curso
      AND e1.ID != e2.ID;
END;
\`\`\``,
    reasoning:
      'O gatilho dispara depois de cada inserção em Estudante. Para cada par de estudantes em que um deles é o novo registo (`NEW.ID`), do mesmo curso e distintos entre si, insere-se a linha correspondente em Amizade, criando a amizade nos dois sentidos.',
    explanation: link.gatilhos,
  },
  {
    id: 'bd-exame-2020r-q1',
    title: 'Gatilho para tornar uma vista atualizável por inserções',
    source: 'Exame de recurso 2020',
    topic: 'vistas-gatilhos',
    prompt:
      'Em SQLite, pretende-se que a vista `V` aceite inserções. Que gatilho permite tornar essa vista atualizável através de inserções numa tabela subjacente `R`?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: '`AFTER INSERT ON R`',
          correct: false,
          explanation:
            'Um gatilho AFTER na tabela subjacente não intercepta a operação sobre a vista.',
        },
        {
          text: '`INSTEAD OF INSERT ON V`',
          correct: true,
          explanation:
            'Em SQLite, os gatilhos `INSTEAD OF` executam a ação definida em vez da operação sobre a vista, permitindo atualizações de vistas.',
        },
        {
          text: '`INSTEAD OF INSERT ON R`',
          correct: false,
          explanation:
            'O gatilho deve incidir sobre a vista `V`, não sobre a tabela `R`.',
        },
        {
          text: '`BEFORE INSERT ON R`',
          correct: false,
          explanation:
            'Um gatilho BEFORE na tabela subjacente não substitui a operação sobre a vista.',
        },
      ],
    },
    solution: '`INSTEAD OF INSERT ON V`.',
    reasoning:
      'Em SQLite, uma vista não é atualizável diretamente. Para aceitar inserções numa vista, define-se um gatilho `INSTEAD OF INSERT ON V` cuja ação reescreve a operação na tabela ou tabelas subjacentes.',
    explanation: link.vistas,
  },
];

export const exameConceitos: ExamQuestion[] = [
  {
    id: 'bd-exame-2016-q7',
    title: 'Definir uma segunda chave candidata em LDD-SQL',
    source: 'Exame 2016',
    topic: 'conceitos',
    prompt:
      'Tendo a chave primária de uma tabela já definida, como se define uma segunda chave candidata em LDD-SQL?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Com a cláusula `FOREIGN KEY`',
          correct: false,
          explanation:
            '`FOREIGN KEY` define uma chave estrangeira, não uma chave candidata.',
        },
        {
          text: 'Com a cláusula `UNIQUE`',
          correct: true,
          explanation:
            'Uma chave candidata adicional define-se com `UNIQUE`, que garante unicidade dos valores, tal como a chave primária.',
        },
        {
          text: 'Com uma das cláusulas `PRIMARY KEY` ou `UNIQUE`',
          correct: false,
          explanation:
            'A chave primária já está definida; a segunda tem de usar `UNIQUE`.',
        },
        {
          text: 'Com a cláusula `PRIMARY KEY`',
          correct: false,
          explanation: 'Só pode existir uma chave primária por tabela.',
        },
      ],
    },
    solution: 'Com a cláusula `UNIQUE`.',
    reasoning:
      'Uma tabela só pode ter uma chave primária, mas pode ter várias chaves candidatas. Em SQL, cada chave candidata adicional define-se com a restrição `UNIQUE`, que impõe unicidade aos valores dessa coluna ou conjunto de colunas.',
  },
  {
    id: 'bd-exame-2016-q8',
    title:
      'Forma tradicional de escalabilidade de servidores de bases de dados',
    source: 'Exame 2016',
    topic: 'conceitos',
    prompt:
      'Qual é a forma tradicional de implementar a escalabilidade dos servidores de bases de dados?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'É a horizontal, que consiste na partição de dados, o que implica a compra de hardware mais poderoso.',
          correct: false,
          explanation:
            'A partição de dados é horizontal, mas não exige hardware mais poderoso.',
        },
        {
          text: 'É a vertical, que consiste na implementação de vários níveis de servidores para armazenar todos os dados.',
          correct: false,
          explanation:
            'Vários níveis não é a definição de escalabilidade vertical.',
        },
        {
          text: 'É a horizontal, que consiste na partição dos dados, o que permite suportar a base de dados em hardware menos poderoso.',
          correct: true,
          explanation:
            'A escalabilidade horizontal (scale-out) distribui os dados por vários servidores comuns, evitando hardware caro e poderoso.',
        },
        {
          text: 'É a vertical, que consiste na compra de hardware mais poderoso para armazenar todos os dados.',
          correct: false,
          explanation:
            'Comprar hardware mais potente é escalabilidade vertical, mas não é a forma tradicional de escalar bases de dados distribuídas.',
        },
      ],
    },
    solution:
      'É a horizontal: partição dos dados por vários servidores, suportados em hardware menos poderoso.',
    reasoning:
      'A escalabilidade horizontal (scale-out) reparte os dados por várias máquinas commodity através de partição (sharding), enquanto a vertical (scale-up) consiste em tornar uma única máquina mais potente. Para bases de dados, a forma tradicional é a horizontal.',
    explanation: link.nosql,
  },
  {
    id: 'bd-exame-2016r-q2',
    title: 'Escalonamento recuperável',
    source: 'Exame de recurso 2016',
    topic: 'conceitos',
    prompt:
      'O que garante um escalonamento recuperável sobre um conjunto de transações?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Que não gera bloqueios.',
          correct: false,
          explanation: 'A recuperabilidade não elimina bloqueios.',
        },
        {
          text: 'Que a base de dados fica consistente.',
          correct: false,
          explanation:
            'A consistência é garantida pelas propriedades ACID em geral, não especificamente pela recuperabilidade.',
        },
        {
          text: 'Que só comete uma transação $T_i$ se as transações $T_j$ cujas alterações foram usadas por $T_i$ já tiverem sido cometidas.',
          correct: true,
          explanation:
            'Num escalonamento recuperável, uma transação só pode fazer commit depois de todas as transações das quais leu dados terem feito commit, evitando commits em cascata impossíveis de desfazer.',
        },
        {
          text: 'Que resulta numa base de dados igual à que seria obtida se as transações fossem executadas em série.',
          correct: false,
          explanation:
            'Essa é a definição de serializabilidade, não de recuperabilidade.',
        },
      ],
    },
    solution:
      'Só comete $T_i$ se as transações $T_j$ cujas alterações foram usadas por $T_i$ já tiverem sido cometidas.',
    reasoning:
      'Um escalonamento é recuperável se nenhuma transação faz commit antes de todas as transações das quais leu dados terem feito commit. Assim, se uma transação falhasse, não haveria risco de ter de desfazer commits já feitos (commit em cascata).',
  },
  {
    id: 'bd-exame-2016r-q3',
    title: 'Estrutura de uma base de dados NoSQL do tipo chave-valor',
    source: 'Exame de recurso 2016',
    topic: 'conceitos',
    prompt:
      'Uma base de dados NoSQL do tipo "key value store" consiste em quê?',
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'Numa estrutura organizada por colunas.',
          correct: false,
          explanation:
            'Isso descreve uma base de dados de famílias de colunas (column-family), não chave-valor.',
        },
        {
          text: 'Em 2 tabelas, uma com as propriedades dos nós e outra com as suas relações.',
          correct: false,
          explanation: 'Isso descreve uma base de dados de grafos.',
        },
        {
          text: 'Numa base sem qualquer esquema explícito.',
          correct: false,
          explanation:
            'A ausência de esquema é típica de documentos, não de chave-valor.',
        },
        {
          text: 'Simplesmente numa tabela com 2 colunas, a chave e o valor respetivo.',
          correct: true,
          explanation:
            'Um key-value store guarda pares (chave, valor): a chave identifica o registo e o valor é o conteúdo associado.',
        },
      ],
    },
    solution: 'Numa tabela com 2 colunas: a chave e o valor respetivo.',
    reasoning:
      'Numa base de dados chave-valor, cada registo é um par (chave, valor). A chave identifica univocamente o valor, que pode ser qualquer objeto, sem esquema interno imposto pela base de dados.',
  },
];
