posicoes :: a -> [a] -> [[a]]
posicoes x [] = [[x]]
posicoes x (y:ys) = (x:y:ys) : map (y:) (posicoes x ys)

permutar :: [a] -> [[a]]
permutar [] = [[]]
permutar (x:xs) = concatMap (posicoes x) (permutar xs)
