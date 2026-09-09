---
title: Programação Funcional e em Lógica
description: Dois paradigmas em Haskell e Prolog, de funções puras e tipos a unificação e procura.
section: conteudo
order: 0
---

Programação Funcional e em Lógica divide-se em dois mundos. Nas primeiras sete semanas escreves **Haskell**: funções puras, tipos que o compilador verifica, ordem superior e testes por propriedades. Nas seis semanas seguintes escreves **Prolog**: factos, regras, unificação e procura automática. Vens de [FP](/cadeiras/fp/), onde viste [funções de ordem superior](/cadeiras/fp/programacao-funcional/) em Python e [recursão](/cadeiras/fp/recursao/); aqui os dois paradigmas levam essas ideias ao extremo, cada um à sua maneira. A [lógica](/cadeiras/md/) de MD volta a aparecer quando chegares às cláusulas de Horn.

## Como está organizado

A parte funcional começa em [Expressões, avaliação e tipos em Haskell](haskell-expressoes-tipos/), onde defines funções por equações e o GHC verifica os tipos. Depois, [Polimorfismo e classes de tipos](polimorfismo-classes/) explica assinaturas como `[a] -> Int` e restrições como `Eq a`. Em [Lambda, currying e ordem superior](funcoes-ordem-superior/) juntas `map`, `filter` e `foldr` em pipelines. [Tipos algébricos e recursão](tipos-algebricos-recursao/) define os teus próprios tipos com `data` e padrões. [Entrada e saída e parsers com combinadores](entrada-saida-parsers/) lida com o mundo exterior em `IO` e constrói um parser de expressões. Por fim, [Propriedades e testes com QuickCheck](testes-quickcheck/) troca testes de exemplo por propriedades testadas em centenas de casos.

A parte lógica começa em [Lógica, unificação e execução em Prolog](logica-unificacao-prolog/), com cláusulas de Horn, resolução SLD e negação por falha. [Recursão, corte e procura em Prolog](prolog-recursao-procura/) fecha com listas, aritmética, corte, `findall` e um labirinto resolvido por procura em profundidade.

## Dois problemas guia

Se queres sentir a diferença entre paradigmas antes de ler tudo, experimenta estes dois. Em Haskell, somar os quadrados de uma lista é uma equação sobre a estrutura da lista ([página 1](haskell-expressoes-tipos/)). Em Prolog, dizer quem é avô de quem é declarar dois factos e uma regra, e deixar o motor responder ([página 7](logica-unificacao-prolog/)). O resto das páginas generaliza estes dois gestos: transformar dados com funções e descrever relações para o motor procurar.

## Como estudar

Em Haskell, tem o GHCi aberto e confirma cada tipo com `:t` e cada função com um exemplo pequeno. Os erros de tipo parecem paredes de texto, mas a primeira linha diz quase sempre o essencial: que tipo esperava e que tipo recebeu. Em Prolog, desenha a árvore de procura à mão nos primeiros exercícios; quando o programa responder `false` onde esperavas uma resposta, o desenho mostra onde o ramo morreu. Resolve depois os exercícios de cada ficha, primeiro os que seguem o exemplo da página e só depois as variações.

## Avaliação

A avaliação é distribuída, sem exame final em época normal: 30 por cento de projeto e 70 por cento de testes, com a teórica dividida em dois mini-testes e a prática em dois trabalhos. Em recurso, a componente teórica vai a exame e a prática mantém-se, exigindo presença em pelo menos 75 por cento das aulas práticas. Confirma prazos, grupos e regras na ficha da unidade curricular no SIGARRA e na página da disciplina no Moodle, porque variam de ano para ano.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Programação Funcional e em Lógica (L.EIC024) do 3.º ano, 1.º semestre da LEIC, ocorrência de 2025/26: programação funcional em Haskell (expressões, tipos, polimorfismo, ordem superior, tipos algébricos, I/O, parsers com combinadores, QuickCheck) e programação em lógica em Prolog (Horn, unificação, SLD, recursão, aritmética, corte, procura). O software indicado é GHC e SICStus Prolog.

Material oficial da FEUP:

- Ficha da unidade curricular de Programação Funcional e em Lógica, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560109).
