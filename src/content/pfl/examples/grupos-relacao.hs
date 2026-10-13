agruparPor :: (a -> a -> Bool) -> [a] -> [[a]]
agruparPor _ [] = []
agruparPor rel (x:xs) = (x:iguais) : agruparPor rel resto
  where
    (iguais, resto) = span (rel x) xs
