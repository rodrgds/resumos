import type { PrologQuestion } from './questions';
export const questions: PrologQuestion[] = [
  {
    id: 'mt2-social-append-sld',
    title: 'Escolher a árvore SLD de append',
    prompt:
      'Qual das quatro árvores SLD corresponde a `append(X,Y,[1,2])` para as cláusulas apresentadas? Considere a seleção de objetivos à esquerda e a ordem das cláusulas.',
    definitions:
      'append([], L, L).\nappend([H|T], L, [H|T2]) :- append(T, L, T2).',
    figures: [
      {
        label: 'a)',
        alt: 'Árvore a: ramo recursivo à direita, com objetivo seguinte append(T,Y,[2]). As folhas dão três substituições.',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="650" height="370" viewBox="0 0 650 370"><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M210 10 L320 35 L210 60 L100 35Z"/><path d="M380 120 L490 145 L380 170 L270 145Z"/><path d="M510 230 L620 255 L510 280 L400 255Z"/><ellipse cx="100" cy="145" rx="29" ry="15"/><ellipse cx="280" cy="255" rx="29" ry="15"/><ellipse cx="510" cy="350" rx="29" ry="15"/><path d="M165 50L100 130"/><path d="M255 50L380 120"/><path d="M335 160L280 240"/><path d="M425 160L510 230"/><path d="M510 280L510 335"/></g><g fill="currentColor" text-anchor="middle" font-size="13" font-family="monospace"><text x="210" y="39">append(X,Y,[1,2])</text><text x="380" y="149">append(T,Y,[2])</text><text x="510" y="259">append(T1,Y,[])</text><text x="100" y="149">true</text><text x="280" y="259">true</text><text x="510" y="354">true</text><text x="73" y="88">X = []</text><text x="73" y="104">Y = [1,2]</text><text x="345" y="88">X = [1|T]</text><text x="258" y="200">T = []</text><text x="258" y="216">Y = [2]</text><text x="522" y="200">T = [2|T1]</text><text x="555" y="310">T1 = []</text><text x="555" y="326">Y = []</text></g></svg>',
      },
      {
        label: 'b)',
        alt: 'Árvore b: ramo recursivo à esquerda, com objetivo seguinte append(T,Y,[2]). As folhas dão três substituições.',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="650" height="370" viewBox="0 0 650 370"><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M440 10 L330 35 L440 60 L550 35Z"/><path d="M270 120 L160 145 L270 170 L380 145Z"/><path d="M140 230 L30 255 L140 280 L250 255Z"/><ellipse cx="550" cy="145" rx="29" ry="15"/><ellipse cx="370" cy="255" rx="29" ry="15"/><ellipse cx="140" cy="350" rx="29" ry="15"/><path d="M485 50L550 130"/><path d="M395 50L270 120"/><path d="M315 160L370 240"/><path d="M225 160L140 230"/><path d="M140 280L140 335"/></g><g fill="currentColor" text-anchor="middle" font-size="13" font-family="monospace"><text x="440" y="39">append(X,Y,[1,2])</text><text x="270" y="149">append(T,Y,[2])</text><text x="140" y="259">append(T1,Y,[])</text><text x="550" y="149">true</text><text x="370" y="259">true</text><text x="140" y="354">true</text><text x="577" y="88">X = []</text><text x="577" y="104">Y = [1,2]</text><text x="305" y="88">X = [1|T]</text><text x="392" y="200">T = []</text><text x="392" y="216">Y = [2]</text><text x="128" y="200">T = [2|T1]</text><text x="95" y="310">T1 = []</text><text x="95" y="326">Y = []</text></g></svg>',
      },
      {
        label: 'c)',
        alt: 'Árvore c: ramo recursivo à direita, com objetivo seguinte append(X,T,[2]). As folhas dão três substituições.',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="650" height="370" viewBox="0 0 650 370"><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M210 10 L320 35 L210 60 L100 35Z"/><path d="M380 120 L490 145 L380 170 L270 145Z"/><path d="M510 230 L620 255 L510 280 L400 255Z"/><ellipse cx="100" cy="145" rx="29" ry="15"/><ellipse cx="280" cy="255" rx="29" ry="15"/><ellipse cx="510" cy="350" rx="29" ry="15"/><path d="M165 50L100 130"/><path d="M255 50L380 120"/><path d="M335 160L280 240"/><path d="M425 160L510 230"/><path d="M510 280L510 335"/></g><g fill="currentColor" text-anchor="middle" font-size="13" font-family="monospace"><text x="210" y="39">append(X,Y,[1,2])</text><text x="380" y="149">append(X,T,[2])</text><text x="510" y="259">append(X,T1,[])</text><text x="100" y="149">true</text><text x="280" y="259">true</text><text x="510" y="354">true</text><text x="73" y="88">X = []</text><text x="73" y="104">Y = [1,2]</text><text x="345" y="88">Y = [1|T]</text><text x="258" y="200">T = []</text><text x="258" y="216">X = [2]</text><text x="522" y="200">T = [2|T1]</text><text x="555" y="310">T1 = []</text><text x="555" y="326">X = []</text></g></svg>',
      },
      {
        label: 'd)',
        alt: 'Árvore d: ramo recursivo à esquerda, com objetivo seguinte append(X,T,[2]). As folhas dão três substituições.',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="650" height="370" viewBox="0 0 650 370"><g fill="none" stroke="currentColor" stroke-width="1.4"><path d="M440 10 L330 35 L440 60 L550 35Z"/><path d="M270 120 L160 145 L270 170 L380 145Z"/><path d="M140 230 L30 255 L140 280 L250 255Z"/><ellipse cx="550" cy="145" rx="29" ry="15"/><ellipse cx="370" cy="255" rx="29" ry="15"/><ellipse cx="140" cy="350" rx="29" ry="15"/><path d="M485 50L550 130"/><path d="M395 50L270 120"/><path d="M315 160L370 240"/><path d="M225 160L140 230"/><path d="M140 280L140 335"/></g><g fill="currentColor" text-anchor="middle" font-size="13" font-family="monospace"><text x="440" y="39">append(X,Y,[1,2])</text><text x="270" y="149">append(X,T,[2])</text><text x="140" y="259">append(X,T1,[])</text><text x="550" y="149">true</text><text x="370" y="259">true</text><text x="140" y="354">true</text><text x="577" y="88">X = []</text><text x="577" y="104">Y = [1,2]</text><text x="305" y="88">Y = [1|T]</text><text x="392" y="200">T = []</text><text x="392" y="216">X = [2]</text><text x="128" y="200">T = [2|T1]</text><text x="95" y="310">T1 = []</text><text x="95" y="326">X = []</text></g></svg>',
      },
    ],
    answer: {
      kind: 'choice',
      options: [
        {
          text: 'a. Árvore a.',
          correct: true,
          explanation:
            'A primeira cláusula produz a resposta imediata à esquerda; a segunda retira a cabeça do primeiro argumento e recorre sobre a cauda.',
        },
        {
          text: 'b. Árvore b.',
          correct: false,
          explanation:
            'Os ramos estão trocados: a cláusula recursiva é visitada antes da cláusula base.',
        },
        {
          text: 'c. Árvore c.',
          correct: false,
          explanation:
            'O objetivo intermédio deve ser append(T,Y,[2]), pois a recursão retira a cabeça do primeiro argumento.',
        },
        {
          text: 'd. Árvore d.',
          correct: false,
          explanation:
            'A árvore troca a ordem dos ramos e recorre sobre o segundo argumento em vez do primeiro.',
        },
      ],
    },
    solution:
      '?- append(X,Y,[1,2]).\nX = [], Y = [1,2] ;\nX = [1], Y = [2] ;\nX = [1,2], Y = [].',
    reasoning:
      'A alternativa a conserva a ordem das cláusulas e as substituições. As três respostas correspondem aos três pontos de corte da lista. No último nó só a cláusula base unifica com a terceira lista vazia.',
    explanation:
      '/cadeiras/pfl/logica-unificacao-prolog/#resolução-sld-passo-a-passo',
  },
];
