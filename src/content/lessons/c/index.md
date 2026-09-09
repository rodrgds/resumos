---
title: Compiladores
description: As fases de um compilador, da análise lexical à otimização, com o projeto de uma linguagem imperativa simples.
section: conteudo
order: 0
---

Um compilador traduz um programa escrito numa linguagem de alto nível para código que uma máquina executa, e fá-lo em fases encadeadas: cada fase resolve um problema bem delimitado e passa o resultado à seguinte. Nesta cadeira constróis um compilador a sério, em grupo, para uma linguagem imperativa simples, e aprendes a teoria que sustenta cada fase. Vens de [Teoria da Computação](/cadeiras/tc/), onde viste linguagens e autómatos como objetos matemáticos; aqui vais usá-los como ferramentas de construção.

## Como está organizado

Começa por [Fases de um compilador](/cadeiras/c/fases-compilador/), que segue uma linha de código do texto fonte até ao código objeto e nomeia quem trata de cada passo. Depois vêm as três análises: [Análise lexical](/cadeiras/c/analise-lexica/) reconhece os símbolos com expressões regulares e autómatos, a [Análise sintática](/cadeiras/c/analise-sintatica/) organiza-os numa árvore com uma gramática, e a [Análise semântica](/cadeiras/c/analise-semantica/) verifica tipos e âmbitos com a tabela de símbolos.

A segunda metade desce até à máquina. [Ambientes de execução](/cadeiras/c/ambientes-execucao/) explica a pilha, os registos de ativação e a passagem de parâmetros; [Código intermédio e blocos básicos](/cadeiras/c/codigo-intermedio/) traduz o programa para uma representação simples de analisar; [Geração de código e registos](/cadeiras/c/geracao-codigo/) emite instruções reais e gere os registos; e [Análise e otimização de código](/cadeiras/c/otimizacao-codigo/) transforma o programa sem lhe mudar o significado.

## Como estudar

Lê cada página com papel ao lado e refaz os exemplos à mão: a árvore sintática, a tabela de símbolos, o desenho da pilha. Em Compiladores, perceber com os olhos não chega, porque cada fase produz um artefacto concreto e o erro típico de teste é um artefacto mal construído (uma árvore trocada, um bloco básico mal partido). Depois de refazeres o exemplo da página, inventa uma variação pequena: outra expressão, outro `if`, mais um nível de âmbito. Se conseguires produzir o artefacto certo para a variação, percebeste a fase.

## Avaliação

A avaliação tem provas escritas e projeto em grupo, com pesos e regras que mudam de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes a fórmula da nota, as entregas do projeto e as regras de frequência antes de planeares o semestre.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Compiladores (L.EIC026) do 3.º ano, 2.º semestre da LEIC, ocorrência de 2025/26: fases da compilação, análise lexical, sintática e semântica, ambientes de execução, código intermédio, escalonamento e alocação de registos, análise de fluxo e otimização. O projeto da ocorrência constrói, em grupo, um compilador para uma linguagem imperativa simples sobre uma infraestrutura existente.

Material oficial da FEUP:

- Ficha da unidade curricular de Compiladores, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560111).
