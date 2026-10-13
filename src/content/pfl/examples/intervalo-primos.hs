primo :: Integer -> Bool
primo n = n > 1 && testar 2
  where
    testar d
      | d*d > n = True
      | n `mod` d == 0 = False
      | otherwise = testar (d+1)

primos :: [Integer]
primos = filter primo [2..]

intervalo :: Ord a => a -> a -> [a] -> [a]
intervalo inicio fim = takeWhile (<= fim) . dropWhile (< inicio)

main :: IO ()
main = do
  print (intervalo 10 30 primos)
  print (length (intervalo 10 30 primos))
  print (intervalo 13 23 primos)
