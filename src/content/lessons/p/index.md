---
title: Programação
description: Programação em C e C++, da sintaxe e da memória aos objetos, herança, STL e boas práticas.
section: conteudo
order: 0
---

Programação é a cadeira onde deixas de ser apenas utilizador de uma linguagem e passas a perceber o que está por baixo: tipos fixos, memória gerida por ti, compilação separada e classes que juntam dados e comportamento. A linguagem é C++ (com uma base de C), e as ferramentas são o GCC, o CMake e o CLion. Vens de [Funções](/cadeiras/fp/funcoes/) e de [Tuplos e listas](/cadeiras/fp/tuplos-listas/) em Python; aqui vais reencontrar as mesmas ideias, mas com regras mais rígidas e erros que o compilador apanha antes de o programa correr.

## Como está organizado

Começa por [Fundamentos de C++](/cadeiras/p/cpp-fundamentos/), que traduz o que já sabes de Python para tipos estáticos, declarações, entrada e saída e referências. Depois, [Apontadores e memória](/cadeiras/p/apontadores-memoria/) mostra endereços, aritmética de apontadores e alocação dinâmica, que é onde os programas em C++ ganham poder e onde nascem as fugas de memória.

A segunda parte é a programação orientada a objetos: [Classes e objetos](/cadeiras/p/classes-objetos/) junta dados e funções numa classe com construtores e encapsulamento, e [Herança e polimorfismo](/cadeiras/p/heranca-polimorfismo/) usa classes base e funções virtuais para tratar objetos diferentes da mesma forma.

A terceira parte aproveita o que a linguagem já oferece: [Templates e STL](/cadeiras/p/templates-stl/) escreve código genérico e usa vetores, iteradores e algoritmos prontos. Por fim, [Exceções e testes](/cadeiras/p/excecoes-testes/) trata os erros com exceções e fixa hábitos de documentação e testes que valem em qualquer linguagem.

## Como estudar

Lê cada página com o compilador aberto e compila todos os exemplos tu próprio. Em Programação, perceber o exemplo com os olhos não chega: muda um tipo, tira um `const`, troca uma referência por uma cópia e vê o que o compilador diz ou o que muda na saída. Quando o erro aparecer, lê a mensagem do compilador com calma, porque ela indica quase sempre a linha e a razão. Resolve depois os exercícios de cada ficha, primeiro os que seguem o exemplo da página e só depois as variações.

## Avaliação

A forma de avaliação varia de ano para ano. Consulta a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle para saberes os prazos dos trabalhos, o peso do projeto e as regras dos testes e do exame.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Programação (L.EIC009) do 1.º ano, 2.º semestre da LEIC, ocorrência de 2025/26: tipos de dados, apontadores e alocação dinâmica, classes, herança, polimorfismo, templates, STL (Standard Template Library), boas práticas, documentação e testes. As ferramentas de trabalho são o compilador GCC, o sistema de compilação CMake e o ambiente CLion.

Material oficial da FEUP:

- Ficha da unidade curricular de Programação, ocorrência de 2025/26, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=560094).
