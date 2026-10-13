insert x [] = [x]
insert x (y:ys)
  | x <= y = x:y:ys
  | otherwise = y : insert x ys

sort [] = []
sort (x:xs) = insert x (sort xs)
