import Data.Char (isDigit, isSpace)

newtype Parser a = P (String -> [(a, String)])

parse :: Parser a -> String -> [(a, String)]
parse (P p) = p

item :: Parser Char
item = P (\inp -> case inp of
                   []     -> []
                   (c:cs) -> [(c, cs)])

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

completa :: Parser a -> String -> Maybe a
completa p texto = case parse (token p) texto of
  [(valor, "")] -> Just valor
  _ -> Nothing

main :: IO ()
main = do
  print (parse nat "42x")
  print (parse (many1 digit) "7+8")
  print (parse expr "2+3*4")
  print (parse expr "(2+3)*4")
  print (parse expr "2+")
  print (map (completa expr) [" 2 + 3*4 ", "2+", "2+3x", "(2+3"])
