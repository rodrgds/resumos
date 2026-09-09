---
title: Entrada e saída e parsers com combinadores
description: Ações em IO com do e um parser de expressões com precedência feito de combinadores.
section: conteudo
order: 5
---

Uma função pura não pode ler do teclado: o mesmo input teria de dar sempre o mesmo output, e o utilizador não colabora. Haskell separa o cálculo puro do contacto com o mundo no tipo **`IO`**. Um valor `IO ()` é uma **ação**, uma receita que, quando executada, interage e devolve `()`. O `main` do programa é uma ação composta.

## I/O com do

```haskell
main :: IO ()
main = do
  putStrLn "Como te chamas?"
  nome <- getLine
  putStrLn ("Ola, " ++ nome ++ "!")
```

Cada linha do `do` é uma ação executada por ordem. A seta `<-` corre a ação e dá nome ao resultado: `nome` fica com a string lida. Sem seta, como em `putStrLn`, o resultado é ignorado. Repara que `++ nome ++` é cálculo puro dentro da ação: a fronteira entre puro e `IO` passa exatamente na seta. A regra de ouro: empurra a lógica para funções puras e deixa no `do` só a conversa com o exterior.

## Parsers como funções

Um **parser** para valores do tipo `a` é uma função que come carateres da entrada e devolve o valor com o resto:

```haskell
newtype Parser a = P (String -> [(a, String)])

parse :: Parser a -> String -> [(a, String)]
parse (P p) = p

item :: Parser Char
item = P (\inp -> case inp of
                   []     -> []
                   (c:cs) -> [(c, cs)])
```

Resultado vazio significa falha. Sobre esta base definem-se os **combinadores**, parsers feitos de parsers: sequência com o `do` (o `Parser` é um mônada), alternativa com `+++` (tenta o segundo se o primeiro falhar) e repetição com `many`:

```haskell
import Data.Char (isDigit, isSpace)

instance Functor Parser where
  fmap f p = P (\inp -> case parse p inp of
                         []        -> []
                         [(v,out)] -> [(f v, out)])

instance Applicative Parser where
  pure v = P (\inp -> [(v, inp)])
  pf <*> px = P (\inp -> case parse pf inp of
                            []        -> []
                            [(f,out)] -> parse (fmap f px) out)

instance Monad Parser where
  p >>= f = P (\inp -> case parse p inp of
                         []        -> []
                         [(v,out)] -> parse (f v) out)
  return v = P (\inp -> [(v, inp)])

(+++) :: Parser a -> Parser a -> Parser a
p +++ q = P (\inp -> case parse p inp of
                       []        -> parse q inp
                       [(v,out)] -> [(v,out)])

sat :: (Char -> Bool) -> Parser Char
sat pr = do c <- item
            if pr c then return c else P (const [])

digit :: Parser Char
digit = sat isDigit

many :: Parser a -> Parser [a]
many p = many1 p +++ return []

many1 :: Parser a -> Parser [a]
many1 p = do v  <- p
             vs <- many p
             return (v:vs)

nat :: Parser Int
nat = do xs <- many1 digit
         return (read xs)

space :: Parser ()
space = do many (sat isSpace)
           return ()

token :: Parser a -> Parser a
token p = do space
             v <- p
             space
             return v

symbol :: Char -> Parser Char
symbol c = token (sat (== c))
```

(`return` é `pure`; o `do` usa o `>>=` acima.) Cada combinador faz uma coisa pequena: `sat` testa um caráter, `many` repete zero ou mais vezes, `token` ignora espaços à volta. A gramática com precedência compõe-nos:

```haskell
expr :: Parser Int
expr = do t <- term
          (do symbol '+'
              e <- expr
              return (t + e)) +++ return t

term :: Parser Int
term = do f <- factor
          (do symbol '*'
              t <- term
              return (f * t)) +++ return f

factor :: Parser Int
factor = (do symbol '('
             e <- expr
             symbol ')'
             return e) +++ token nat
```

A precedência vive na estrutura: `expr` soma `term`s e `term` multiplica `factor`s, por isso `*` liga mais que `+`. Avalia `parse expr "2+3*4"`: o `term` lê `2` e para no `+`; o `expr` soma `2` com o `expr` de `"3*4"`, que multiplica `3` por `4`; dá `[(14, "")]`. E `parse expr "(2+3)*4"` dá `[(20, "")]`, com os parênteses a forçar a soma primeiro.

:::warning[Escolha comprometida]
O `+++` só tenta a alternativa se a primeira falhar **sem consumir nada**. Se `symbol '('` tem sucesso e o interior falha, o parser falha em vez de recuar para `token nat`. Em gramáticas pequenas isto resolve-se ordenando as alternativas da mais específica para a mais geral; em gramáticas grandes é o argumento para bibliotecas como Parsec.
:::
