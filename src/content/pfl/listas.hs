inserir :: Ord a => a -> [a] -> [a]
inserir x [] = [x]
inserir x (y:ys)
  | x <= y = x:y:ys
  | otherwise = y:inserir x ys

ordenar :: Ord a => [a] -> [a]
ordenar [] = []
ordenar (x:xs) = inserir x (ordenar xs)

juntar :: Ord a => [a] -> [a] -> [a]
juntar [] ys = ys
juntar xs [] = xs
juntar (x:xs) (y:ys)
  | x <= y = x:juntar xs (y:ys)
  | otherwise = y:juntar (x:xs) ys

mergeSort :: Ord a => [a] -> [a]
mergeSort [] = []
mergeSort [x] = [x]
mergeSort xs = juntar (mergeSort esq) (mergeSort dir)
  where (esq,dir) = splitAt (length xs `div` 2) xs

semRepetidos :: Eq a => [a] -> [a]
semRepetidos [] = []
semRepetidos (x:xs) = x:semRepetidos (filter (/= x) xs)

grupos :: Eq a => [a] -> [[a]]
grupos [] = []
grupos (x:xs) = (x:takeWhile (==x) xs):grupos (dropWhile (==x) xs)

fromBits :: [Integer] -> Integer
fromBits = foldl (\n b -> 2*n+b) 0

main :: IO ()
main = do
  print (ordenar [4,1,3,1])
  print (mergeSort [4,1,3,1])
  print (semRepetidos "abacaba")
  print (grupos "AABBBAA")
  print (fromBits [1,0,1,1])
