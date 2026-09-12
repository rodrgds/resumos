---
title: Cheat sheet de PFL
description: Padrões de decisão em Prolog e Haskell, do controlo da procura aos tipos e folds.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos PFL SofiaViP
      url: https://drive.google.com/file/d/1JoKqViYH6VsvxQe6cHU-fORK0yYA6E-f/view
  coverage: Síntese das páginas 2 a 11 do resumo, com Prolog, unificação, procura, cortes e recolha de soluções, e Haskell, tipos, listas, recursão, avaliação preguiçosa e folds.
  gaps:
    - A página 1 é capa; a fonte não desenvolve classes de tipos, QuickCheck, parsers ou I/O em Haskell.
    - Os exemplos de Prolog dependem da implementação; a compatibilidade atual entre SICStus e SWI não foi verificada nesta fonte.
    - A correspondência destes apontamentos a uma edição atual da unidade curricular não foi verificada.
---

Escolhe primeiro o paradigma. Em **Prolog**, descreves relações e exploras soluções por unificação e procura. Em **Haskell**, compões funções com tipos e avalias expressões quando o resultado é necessário. O mesmo problema pode pedir estratégias muito diferentes.

## Prolog: relações e procura

| Se queres…            | Usa e verifica…                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Declarar conhecimento | Factos e regras `cabeca :- objetivo1, objetivo2.`; a vírgula é conjunção, o ponto e vírgula é alternativa. Nomes iniciados por minúscula são átomos; por maiúscula ou `_`, variáveis.                                    |
| Consultar             | Uma query procura substituições que tornem os objetivos demonstráveis. Prolog tenta cláusulas pela ordem escrita e objetivos da esquerda para a direita, com retrocesso.                                                 |
| Combinar termos       | `=` **unifica**, podendo ligar variáveis; `==` testa identidade dos termos sem criar ligações. `is` avalia a expressão à direita e unifica o resultado com a esquerda; `=:=` avalia e compara números.                   |
| Percorrer lista       | Base para `[]`; passo para cabeça e cauda. Reduz a lista em cada chamada e coloca o caso base antes do caso recursivo que o pode cobrir.                                                                                 |
| Recolher respostas    | `findall(T, G, L)` junta todas as instâncias de `T` que satisfazem `G`, incluindo repetições; se não houver, dá `[]`. `bagof` agrupa segundo variáveis livres e falha sem respostas; `setof` ordena e retira duplicados. |

O padrão `[H|T]` separa a cabeça da cauda de uma lista não vazia. Uma query que responde `false` ou `no` indica que o programa **não conseguiu provar** a afirmação segundo a sua base de conhecimento e estratégia de procura. Não é automaticamente prova da negação no mundo real. A ordem das cláusulas pode mudar terminação e resultados observados quando há efeitos ou cortes. Consulta [factos, regras e queries](/cadeiras/pfl/logica-unificacao-prolog/#factos-regras-e-queries), [unificação](/cadeiras/pfl/logica-unificacao-prolog/#unificação) e [listas e aritmética](/cadeiras/pfl/prolog-recursao-procura/#listas-e-aritmética).

### Quando controlar a procura

O corte `!` compromete as escolhas feitas desde a entrada na cláusula: impede alternativas anteriores à posição do corte, mas não desfaz objetivos já executados. Um **corte verde** elimina procura redundante sem mudar as respostas lógicas; um **corte vermelho** altera as respostas e exige justificação pelo contrato. Testa a consulta em vários modos de uso, não apenas com todos os argumentos instanciados. `findall`, `bagof` e `setof` não são intercambiáveis. Vê [corte e recolha](/cadeiras/pfl/prolog-recursao-procura/#corte-e-findall) e [resolução e retrocesso](/cadeiras/pfl/logica-unificacao-prolog/#resolução-sld-passo-a-passo).

## Haskell: tipos e definição

| Forma                           | O que confirma                                                                                                                                 |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `f :: a -> b`                   | Tipo da função; a aplicação `f x` associa à esquerda e pode devolver outra função. Uma função de dois argumentos é currificada: `a -> b -> c`. |
| `f [] = ...` e `f (x:xs) = ...` | Padrões distintos para lista vazia e não vazia. Cobrir os construtores evita padrões incompletos.                                              |
| Guardas                         | São testadas por ordem; `otherwise` é `True`. Se nenhuma guarda casar, a definição fica parcial.                                               |
| `type Nome = ...`               | Sinónimo de tipo existente; `data Nome = Construtor ...` cria tipo novo, que pode ser recursivo.                                               |
| Compreensão de lista            | Transforma os elementos que satisfazem um predicado; a ordem dos geradores determina a ordem dos resultados.                                   |

Uma guarda pode escrever-se `f x | cond = resultado`, e uma compreensão `[f x | x <- xs, p x]`. `(x)` é apenas `x` entre parênteses; o tuplo vazio `()` é o valor do tipo unitário. Uma lista tem elementos do mesmo tipo; um tuplo pode combinar tipos diferentes. Uma definição recursiva precisa de caso base e progresso, mas uma estrutura infinita pode ser útil se o consumidor pedir só um prefixo. A avaliação **preguiçosa** permite esse consumo, sem garantir que qualquer programa com lista infinita termina. Vê [expressões e padrões](/cadeiras/pfl/haskell-expressoes-tipos/#funções-por-equações) e [tipos algébricos](/cadeiras/pfl/tipos-algebricos-recursao/#data-e-padrões).

## Transformar e reduzir listas

`map f xs` aplica `f` a cada elemento; `filter p xs` conserva os que satisfazem `p`; `take n xs` pede um prefixo. `foldr f z (x:xs) = f x (foldr f z xs)` associa a redução pela direita; `foldl f z (x:xs) = foldl f (f z x) xs` acumula pela esquerda. Se `f` é associativa e `z` é neutro, as duas dão o mesmo valor numa lista finita, mas a avaliação, memória e comportamento em listas infinitas podem diferir. Para acumulação estrita em listas grandes, considera `foldl'` de `Data.List`; para produção preguiçosa e possível consumo de prefixos, `foldr` pode ser a escolha. Vê [map, filter e foldr](/cadeiras/pfl/funcoes-ordem-superior/#map-filter-e-foldr) e [foldr contra foldl](/cadeiras/pfl/funcoes-ordem-superior/#foldr-contra-foldl).
