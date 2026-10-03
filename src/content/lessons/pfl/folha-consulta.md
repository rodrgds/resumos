---
title: Cheat sheet de PFL
description: Tipos, listas, folds, parsers e decisões de execução em Prolog, com as condições que mudam a resposta.
section: recursos
studyKind: revision
editorial:
  basedOn: 2026/27
  review:
    edition: 2026/27
    reviewer: Rodrigo
    date: '2026-10-03'
  sources:
    - title: Programa PFL 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587002
    - title: PFL, material funcional de 2026/27
      url: https://moodle2627.up.pt/course/view.php?id=4363
    - title: Resumos PFL SofiaViP, referência anterior
      url: https://drive.google.com/file/d/1JoKqViYH6VsvxQe6cHU-fORK0yYA6E-f/view
  coverage: Consulta compacta dos conceitos e condições do percurso, com exemplos próprios.
  gaps:
    - Fichas Prolog e provas completas de 2026/27 ainda não recolhidas.
---

Esta folha resume o percurso de PFL: indica que condição ou decisão rever em cada tema, com ligações para as explicações.

Cada linha indica a forma a reconhecer, a condição que muda a resposta e a ligação para a explicação completa.

## Tipos e expressões

| Forma                           | Lembra                                                                                               |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `f x y`                         | É `(f x) y`; a aplicação tem prioridade sobre operadores.                                            |
| `a -> b -> c`                   | É `a -> (b -> c)`; permite aplicação parcial.                                                        |
| `[a]`, `(a,b)`                  | Lista homogénea; par com tipos possivelmente diferentes.                                             |
| `Eq`, `Ord`                     | Igualdade; comparação ordenada, que exige `Eq`.                                                      |
| `Num`, `Fractional`, `Integral` | `+,-,*`; `/`; `div,mod,quot,rem`. `Num` atual não implica `Eq`.                                      |
| `fromIntegral n`                | Converte um valor integral; não é uma conversão automática.                                          |
| `if c then a else b`            | `c :: Bool`; os dois resultados têm o mesmo tipo.                                                    |
| Padrões e guardas               | Tentados pela ordem escrita; cobre todas as formas e declara o domínio. `_` é curinga, não variável. |

[Dedução de tipos](/cadeiras/pfl/polimorfismo-classes/) e [expressões](/cadeiras/pfl/haskell-expressoes-tipos/).

## Listas e folds

```haskell
map f (x:xs)    = f x : map f xs
filter p (x:xs) = if p x then x:filter p xs else filter p xs
foldr f z (x:xs) = f x (foldr f z xs)
foldl f z (x:xs) = foldl f (f z x) xs
```

| Pedido             | Padrão e condição                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Juntar listas      | `foldr (:) ys xs`; `xs ++ ys` percorre `xs`.                                                |
| Achatar            | `foldr (++) []`.                                                                            |
| Inverter           | `foldl (flip (:)) []`; lista finita.                                                        |
| Bits para inteiro  | `foldl (\n b -> 2*n+b) 0`; bits em ordem e cada bit 0 ou 1.                                 |
| Prefixo            | `takeWhile p`, `dropWhile p`; param no primeiro que falha.                                  |
| Seleção            | `filter p`; pode precisar da lista inteira.                                                 |
| Todos / algum      | `all p [] = True`; `any p [] = False`.                                                      |
| Redução            | `foldr` pode terminar em lista infinita se `f` ignorar a cauda; `foldl` exige o fim.        |
| Acumulação estrita | `foldl'`; força o acumulador até à forma normal fraca.                                      |
| Inteiro para bits  | Divide positivos por dois, recolhe restos e inverte; define zero e negativos.               |
| Permutações        | Permuta a cauda e insere a cabeça em todas as posições; caso base `[[]]`, `n!` ocorrências. |

`foldr (-) 0 [1,2,3] = 2`; `foldl (-) 0 [1,2,3] = -6`. Associar não é avaliar tudo primeiro. [Listas](/cadeiras/pfl/listas-recursao/) e [ordem superior](/cadeiras/pfl/funcoes-ordem-superior/).

## Árvores, I/O, parsers e propriedades

| Tema            | Decisão                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `data`          | Um caso por construtor; recursão pelos componentes menores.                                           |
| BST             | Invariância dos valores; procura custa ordem da altura, não sempre `log n`.                           |
| Ausência        | `Maybe a`; `Nothing` ou `Just a`.                                                                     |
| `IO a`          | Ação que produz `a`; `x <- acao`, mas `let x = calculoPuro`.                                          |
| `return`        | Cria uma ação; não termina o bloco `do`.                                                              |
| Parser completo | Confere o resto, não só o valor.                                                                      |
| `many p`        | `p` precisa de consumir entrada em cada sucesso.                                                      |
| Gramática       | Prioridade e associatividade são escolhas separadas; evita recursão à esquerda no parser descendente. |
| Propriedade     | Pré-condições, conservação e resultado; testes não são uma prova universal.                           |
| Shrinking       | Contraexemplo reduzido, sem garantia de mínimo global.                                                |

[Árvores](/cadeiras/pfl/tipos-algebricos-recursao/), [parsers](/cadeiras/pfl/entrada-saida-parsers/) e [propriedades](/cadeiras/pfl/testes-quickcheck/).

## Prolog

| Operação           | Contrato                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `X = Termo`        | Unifica e pode ligar variáveis.                                                                                        |
| `X == Y`           | Testa identidade sem criar ligações.                                                                                   |
| `X is E`           | Avalia `E`; variáveis de `E` têm de estar instanciadas.                                                                |
| `A =:= B`          | Avalia e compara números; não unifica expressões.                                                                      |
| `A \= B`           | Testa que não unificam agora; não adia uma restrição.                                                                  |
| `\+ G`             | Sucede se `G` falhar finitamente; não enumera o complemento.                                                           |
| `!`                | Elimina escolhas desde a entrada até ao corte e cláusulas alternativas desse predicado; escolhas à direita permanecem. |
| Corte verde        | Retirar o corte não muda as respostas no contrato indicado.                                                            |
| `findall(T,G,L)`   | Conserva repetições; sem respostas dá `[]`.                                                                            |
| `bagof`, `setof`   | Agrupam por variáveis livres; `^` retira um agrupamento; falham sem respostas. `setof` ordena e elimina repetições.    |
| `keysort/2`        | Ordena pares pela chave; conserva repetições e a ordem dos empates.                                                    |
| `=../2`, `call/1`  | Constrói/desmonta um termo; executa um objetivo. São operações distintas.                                              |
| `op(P,T,Nome)`     | P menor liga mais forte; x exige prioridade menor, y permite igual. xfy à direita, yfx à esquerda.                     |
| Impressão e `fail` | Retrocesso não apaga efeitos de I/O; enumeração finita e cláusula final para sucesso.                                  |

Na árvore SLD: renomeia variáveis da cláusula, unifica a cabeça, propaga a substituição e resolve o objetivo mais à esquerda. Marca alternativas para retrocesso. Para termos finitos, rejeita `X=f(X)` pelo occurs check; algumas implementações de `=` aceitam ciclos.

DFS não garante o caminho mais curto. BFS garante menor número de arestas com custos iguais e expansão finita. Minimax escolhe máximo ou mínimo conforme o jogador; não tira o máximo de todas as folhas. [Unificação](/cadeiras/pfl/logica-unificacao-prolog/), [controlo](/cadeiras/pfl/prolog-recursao-procura/), [soluções](/cadeiras/pfl/solucoes-estruturas-prolog/) e [procura](/cadeiras/pfl/procura-jogos-simbolos/).

SICStus/SWI: `write/1` e `nl/0` são portáteis. `writeln/1`, `max_list/2` e `min_list/2` são notas SWI. Em SICStus, carrega `library(lists)` e usa comparação numérica explícita.
