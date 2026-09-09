---
title: Tipos algébricos e recursão
description: Definir tipos com data, encaixe de padrões e recursão sobre listas e árvores.
section: conteudo
order: 4
---

Os tipos predefinidos chegam para exercícios pequenos. Para modelar os teus próprios dados, defines **tipos algébricos** com `data`: enumeras os construtores e o que cada um guarda. Depois as funções escolhem a equação pelo **padrão** do construtor, e a recursão segue a forma dos dados.

## data e padrões

Uma árvore binária ou está vazia ou é um nó com um valor e duas subárvores. A definição é quase essa frase:

```haskell
data Arvore a = Vazia | No a (Arvore a) (Arvore a)
```

`Vazia` é um construtor sem argumentos e `No` guarda um valor e duas árvores. Funções sobre a árvore têm uma equação por construtor:

```haskell
emOrdem :: Arvore a -> [a]
emOrdem Vazia = []
emOrdem (No x esq dir) = emOrdem esq ++ [x] ++ emOrdem dir
```

O padrão `(No x esq dir)` desmonta o nó e dá nome às peças. A travessia em ordem lista a esquerda, depois o valor, depois a direita. O caso base `Vazia` devolve a lista vazia, e é ele que termina a recursão, como o `[]` nas listas da [primeira página](haskell-expressoes-tipos/).

## Exemplo completo: pesquisa binária

Inserir mantém a invariância: valores menores à esquerda, maiores ou iguais à direita. Procurar desce só para o lado certo:

```haskell
inserir :: Ord a => a -> Arvore a -> Arvore a
inserir x Vazia = No x Vazia Vazia
inserir x (No y esq dir)
  | x < y     = No y (inserir x esq) dir
  | otherwise = No y esq (inserir x dir)

procura :: Ord a => a -> Arvore a -> Bool
procura _ Vazia = False
procura x (No y esq dir)
  | x == y    = True
  | x < y     = procura x esq
  | otherwise = procura x dir
```

Constrói a árvore inserindo `3, 1, 4, 1, 5` por ordem em `Vazia`. O `3` abre a raiz. O `1` vai para a esquerda. O `4` vai para a direita. O segundo `1` é igual, por isso cai no `otherwise` e vai para a direita do primeiro `1`. O `5` vai para a direita do `4`. A travessia em ordem devolve `[1,1,3,4,5]`: a invariância garante que a travessia sai ordenada, incluindo o duplicado.

Agora `procura 4`: compara com `3`, desce à direita, compara com `4`, encontra, `True`. E `procura 2`: compara com `3`, desce à esquerda, compara com `1`, cai no `otherwise`, desce à direita do `1`, encontra `Vazia`, `False`. Cada comparação elimina metade da árvore, e é essa a promessa da estrutura.

:::tip[Desenha antes de codificar]
Perante um tipo novo, escreve primeiro um valor concreto à mão, como o `No 3 ...` acima, e só depois as equações. Se consegues desenhar o valor, os padrões saem sozinhos; se os padrões te confundem, é o valor que ainda não está claro.
:::
