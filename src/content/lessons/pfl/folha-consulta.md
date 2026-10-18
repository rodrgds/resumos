---
title: Cheat sheet de PFL
description: Decisões de tipos, listas, folds, parsers e execução em Prolog, com as condições que mudam a resposta.
section: recursos
studyKind: revision
editorial:
  basedOn: 2026/27
  review:
    edition: 2026/27
    reviewer: Rodrigo
    date: '2026-10-17'
  sources:
    - title: Programa de PFL 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587002
    - title: Aulas funcionais 1 a 6 e fichas 1 a 3, Moodle 2026/27
      url: https://moodle2627.up.pt/course/view.php?id=4363
    - title: Resumos PFL SofiaViP, referência anterior
      url: https://drive.google.com/file/d/1JoKqViYH6VsvxQe6cHU-fORK0yYA6E-f/view
  coverage: Consulta compacta do percurso, revista contra as lições de 2026-10-17, com condições e erros frequentes.
  gaps:
    - Fichas Prolog e provas completas de 2026/27 ainda não recolhidas; os contratos seguem os materiais históricos e a documentação dos motores.
---

Cada linha regista a condição que muda a resposta e aponta a explicação completa.

## Tipos: ler a assinatura

| Forma                | Decisão                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `f x y`              | É `(f x) y`; a aplicação tem prioridade sobre operadores e associa à esquerda.                   |
| `a -> b -> c`        | É `a -> (b -> c)`; permite aplicação parcial. Os parênteses marcam funções como argumentos.      |
| `[a]`, `(a,b)`       | Lista homogénea; par com tipos possivelmente diferentes.                                         |
| `Eq`, `Ord`          | Igualdade; comparação ordenada, que exige `Eq`.                                                  |
| `Num`, `Fractional`  | `+,-,*`; `/`. `Num` atual não implica `Eq`: podes precisar de `(Num a, Eq a)`.                   |
| `Integral`           | `div,mod` (para baixo), `quot,rem` (para zero). Não mistures quociente de um com resto do outro. |
| `fromIntegral n`     | Converte um valor integral; a conversão nunca é automática.                                      |
| `if c then a else b` | `c :: Bool`; os dois ramos têm o mesmo tipo.                                                     |
| Padrões e guardas    | Tentados pela ordem escrita; cobre todas as formas e declara o domínio. `_` é curinga.           |
| Erro frequente       | `length xs + 0.5` falha: `length` dá `Int`, `/` exige fracionário.                               |

[Deduzir tipos](/cadeiras/pfl/polimorfismo-classes/) e [expressões](/cadeiras/pfl/haskell-expressoes-tipos/).

## Listas: escolher a operação

```haskell
map f (x:xs)    = f x : map f xs
filter p (x:xs) = if p x then x : filter p xs else filter p xs
foldr f z (x:xs) = f x (foldr f z xs)
foldl f z (x:xs) = foldl f (f z x) xs
```

| Pedido              | Padrão e condição                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------- |
| Transformar cada    | `map`; conserva o comprimento.                                                              |
| Ficar só com alguns | `filter`; pode precisar da lista inteira.                                                   |
| Prefixo até falhar  | `takeWhile`, `dropWhile`; param no primeiro que falha.                                      |
| Todos / algum       | `all p [] = True`; `any p [] = False`.                                                      |
| Juntar listas       | `foldr (:) ys xs`; `xs ++ ys` percorre `xs`.                                                |
| Achatar             | `foldr (++) []`.                                                                            |
| Inverter            | `foldl (flip (:)) []`, linear; lista finita.                                                |
| Bits para inteiro   | `foldl (\n b -> 2*n+b) 0`; bits em ordem, cada um `0` ou `1`.                               |
| Inteiro para bits   | Divide positivos por dois, recolhe restos e inverte; define zero (`[0]`) e trata negativos. |
| Permutações         | Permuta a cauda e insere a cabeça em todas as posições; caso base `[[]]`, `n!` ocorrências. |

`foldr (-) 0 [1,2,3] = 2`; `foldl (-) 0 [1,2,3] = -6`. Direita e esquerda descrevem os parênteses, não o ponto de partida. Para listas possivelmente infinitas, `foldr` com operação que ignore a cauda; para reduções finitas estritas, `foldl'`; evita `foldl` sem apóstrofo em listas grandes.

[Listas e recursão](/cadeiras/pfl/listas-recursao/) e [ordem superior](/cadeiras/pfl/funcoes-ordem-superior/).

## Árvores, I/O, parsers e propriedades

| Tema               | Decisão a recordar                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| `data`             | Um caso por construtor; recursão pelos componentes menores.                                           |
| BST                | Invariância em cada nó; a procura custa a altura, não sempre `log n`.                                 |
| Ausência           | `Maybe a`: `Nothing` ou `Just x`; o recetor trata ambos.                                              |
| `IO a`             | Ação que produz `a`; `x <- acao`, `let x = calculoPuro`. `return` não termina o bloco.                |
| Parser completo    | Confere o resto, não só o valor: só `[(v,"")]` valida a entrada inteira.                              |
| `many p`           | Cada sucesso tem de consumir entrada; senão não progride.                                             |
| Gramática          | Prioridade e associatividade são escolhas separadas; evita recursão à esquerda no parser descendente. |
| Propriedade        | Pré-condições, conservação e resultado; 100 casos não provam o universal.                             |
| Shrinking          | Contraexemplo reduzido, sem garantia de mínimo global.                                                |
| Intervalo infinito | Numa lista ordenada, `dropWhile (<inicio)` e `takeWhile (<=fim)` antes de `length`.                   |

[Árvores](/cadeiras/pfl/tipos-algebricos-recursao/), [parsers](/cadeiras/pfl/entrada-saida-parsers/) e [propriedades](/cadeiras/pfl/testes-quickcheck/).

## Prolog: o que cada operação faz

| Operação           | Contrato                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `X = Termo`        | Unifica e pode ligar variáveis; propaga a todas as ocorrências.                                                     |
| `X == Y`           | Testa identidade sem criar ligações.                                                                                |
| `X is E`           | Avalia `E`; as variáveis de `E` têm de estar instanciadas.                                                          |
| `A =:= B`          | Avalia e compara números; não unifica expressões.                                                                   |
| `A \= B`           | Testa que não unificam agora; com ambas livres, falha em vez de adiar.                                              |
| `\+ G`             | Sucede se `G` falhar finitamente; não enumera o complemento. Gera candidatos antes de negar.                        |
| `!`                | Elimina escolhas desde a entrada até ao corte e cláusulas alternativas desse predicado; a direita continua.         |
| Corte verde        | Retirar o corte não muda as respostas no contrato indicado; confirma com saídas já instanciadas.                    |
| `findall(T,G,L)`   | Conserva repetições; sem respostas dá `[]`.                                                                         |
| `bagof`, `setof`   | Agrupam por variáveis livres; `^` retira um agrupamento; falham sem respostas. `setof` ordena e elimina repetições. |
| `keysort/2`        | Ordena pares pela chave; conserva repetidos e a ordem dos empates.                                                  |
| `=../2`, `call/1`  | Constrói e desmonta um termo; executa um objetivo. São operações distintas.                                         |
| `op(P,T,Nome)`     | `P` menor liga mais forte; `x` exige prioridade menor, `y` permite igual. `xfy` à direita, `yfx` à esquerda.        |
| Impressão e `fail` | Retrocesso não apaga efeitos de I/O; enumeração finita e cláusula final para sucesso.                               |

Na árvore SLD: renomeia as variáveis da cláusula, unifica a cabeça, propaga a substituição e resolve o objetivo mais à esquerda. Marca alternativas para retrocesso. Para termos finitos, rejeita `X=f(X)` pelo occurs check; o `=` de algumas implementações aceita ciclos.

DFS não garante o caminho mais curto. BFS garante menor número de arestas com custos iguais e expansão finita. Minimax escolhe máximo ou mínimo conforme o jogador; não tira o máximo das folhas. [Unificação](/cadeiras/pfl/logica-unificacao-prolog/), [controlo](/cadeiras/pfl/prolog-recursao-procura/), [soluções](/cadeiras/pfl/solucoes-estruturas-prolog/) e [procura](/cadeiras/pfl/procura-jogos-simbolos/).

SICStus e SWI: `write/1` e `nl/0` são portáteis. `writeln/1` e extensões de biblioteca precisam de conferência no motor da aula.

## Aplicar a estrutura e as condições

- **Agrupar por relação:** fixa o primeiro elemento e usa `span (rel primeiro)` na cauda. Não confundir com comparar vizinhos quando a relação não é transitiva.
- **Contar intervalo infinito:** numa lista ordenada, delimita com `dropWhile (<inicio)` e `takeWhile (<=fim)` antes de `length`. É preciso alcançar um valor acima do limite em passos finitos; filtrar sem fronteira não produz o fim.
- **Substituir variáveis:** caso por construtor, consulta o ambiente com `lookup`, conserva variáveis ausentes e os operadores. Não avaliar nem preencher com zero por omissão.
- **Mudar de tipo recursivo:** transforma cada componente e conserva a ordem dos filhos. `Folha x` vira `Rosa x []`; `Ramo e x d` vira `Rosa x [conversao e, conversao d]`.
- **Negar irmãos:** candidato único antes da negação; progenitor e outro filho dentro do objetivo negado. Caso contrário, negas apenas irmãos por um progenitor escolhido.
- **Todos os ids:** valida existência e permissão de cada cabeça. Uma busca de violações restrita a objetos existentes pode ignorar ids desconhecidos.

[Agrupar](/cadeiras/pfl/listas-recursao/#agrupar-comparando-com-o-início-do-grupo), [intervalos](/cadeiras/pfl/funcoes-ordem-superior/#contar-um-intervalo-numa-lista-infinita-ordenada), [transformações](/cadeiras/pfl/tipos-algebricos-recursao/#substituir-variáveis-conservando-a-expressão) e [quantificação em Prolog](/cadeiras/pfl/prolog-recursao-procura/#exigir-existência-em-cada-elemento-da-lista).
