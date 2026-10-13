data Bin a = Folha a | Ramo (Bin a) a (Bin a)
  deriving (Eq, Show)
data Rosa a = Rosa a [Rosa a]
  deriving (Eq, Show)

paraRosa :: Bin a -> Rosa a
paraRosa (Folha x) = Rosa x []
paraRosa (Ramo e x d) = Rosa x [paraRosa e, paraRosa d]
