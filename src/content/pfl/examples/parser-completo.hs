completa :: Parser a -> String -> Maybe a
completa p texto = case parse (token p) texto of
  [(valor, "")] -> Just valor
  _ -> Nothing
