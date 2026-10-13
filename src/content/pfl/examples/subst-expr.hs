data ExprVar = Const Integer | Var String
             | Add ExprVar ExprVar | Mult ExprVar ExprVar
  deriving (Eq, Show)

subst :: [(String,Integer)] -> ExprVar -> ExprVar
subst _ (Const n) = Const n
subst env (Var x) = case lookup x env of
  Nothing -> Var x
  Just n -> Const n
subst env (Add a b) = Add (subst env a) (subst env b)
subst env (Mult a b) = Mult (subst env a) (subst env b)
