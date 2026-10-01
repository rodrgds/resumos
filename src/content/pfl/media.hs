mediaAprovados :: [Double] -> Maybe Double
mediaAprovados notas = case filter (>= 9.5) notas of
  [] -> Nothing
  xs -> Just (sum xs / fromIntegral (length xs))

main :: IO ()
main = do
  print (mediaAprovados [8,12,6,15,10])
  print (mediaAprovados [2,7])
  print (foldr (-) 0 [1,2,3::Int])
  print (foldl (-) 0 [1,2,3::Int])
  print (take 5 (map (^2) [1..] :: [Integer]))
