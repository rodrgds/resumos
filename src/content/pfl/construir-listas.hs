intercalar :: a -> [a] -> [a]
intercalar _ [] = []
intercalar _ [x] = [x]
intercalar s (x:xs) = x:s:intercalar s xs

posicoes :: a -> [a] -> [[a]]
posicoes x [] = [[x]]
posicoes x (y:ys) = (x:y:ys) : map (y:) (posicoes x ys)

permutar :: [a] -> [[a]]
permutar [] = [[]]
permutar (x:xs) = concatMap (posicoes x) (permutar xs)

toBitsFicha :: Int -> [Int]
toBitsFicha n
  | n < 0 = error "Esperado um inteiro nao negativo"
  | n == 0 = [0]
  | otherwise = reverse (restos n)
  where
    restos 0 = []
    restos k = k `mod` 2 : restos (k `div` 2)

toBits :: Integer -> Maybe [Integer]
toBits n
  | n < 0 = Nothing
  | n == 0 = Just [0]
  | otherwise = Just (reverse (restos n))
  where
    restos 0 = []
    restos k = k `mod` 2 : restos (k `div` 2)

main :: IO ()
main = do
  print (intercalar '-' "rt")
  print (intercalar '-' "")
  print (intercalar '-' "r")
  print (posicoes 'x' "ab")
  print (permutar "ab")
  print (permutar "aa")
  print (length (permutar "abc"))
  print (map toBits [-1,0,10])
  print (map toBitsFicha [0,12])
