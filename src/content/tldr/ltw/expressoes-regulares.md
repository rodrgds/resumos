## Ler o padrão

Pesquisar tolera texto à volta; validar exige prender as pontas (`^...$`, ou `\A...\z` em PCRE).

| Peça                          | Casa com                                   |
| ----------------------------- | ------------------------------------------ |
| `[abc]`, `[^0-9]`             | Um caráter dentro, ou fora, do conjunto    |
| `.`                           | Um caráter, em geral sem quebra de linha   |
| `\d`, `\w`, `\s`              | Dígito, palavra, espaço (conforme o motor) |
| `^`, `$`, `\b`                | Posição, não caráter                       |
| `?`, `*`, `+`, `{3}`, `{2,4}` | Quantidades sobre a peça anterior          |
| `a\|b`                        | Uma das alternativas                       |
| `(ab)` / `(?:ab)`             | Grupo com / sem captura                    |

- `ab+` repete `b`; `(ab)+` repete o par. `^LTW|BD$` prende cada alternativa de um lado; `^(?:LTW|BD)$` prende ambas.
- `[A-Za-z]` não cobre acentos; Unicode depende do motor.

## Formato com captura

```js
'LTW-042'.match(/^(?:LTW|BD)-([0-9]{3})$/);
// [0] LTW-042, [1] 042
```

- `LTW-42` falha a repetição; `xLTW-042` falha a âncora. Formato válido não prova existência no catálogo nem data real (`2026-02-31` tem forma certa).
- `\1` no padrão repete o texto capturado (`/(\w+)\s+\1/` casa `rede rede`, não `rede web`). `$1` usa-o na substituição.

## Guloso contra preguiçoso

Em `preço [12] e [35]`: `\[.*\]` casa `[12] e [35]`; `\[.*?\]` e `\[[^\]]*\]` casam `[12]`.

- Guloso consome o máximo e recua; preguiçoso consome o mínimo e expande. Ambos partem da primeira posição viável.
- Classe negada nunca atravessa o delimitador. Nenhum dos três substitui um parser de HTML.

## Contexto e custo

- Lookaround testa sem consumir: `livro(?=s)` / `(?!s)` à frente; `(?<=EUR )` atrás (compatibilidade varia).
- Backtracking tenta alternativas quando o resto falha. `(a+)+$` com entrada quase válida pode explodir: limita o comprimento e evita repetições ambíguas em dados do cliente.
- Capturas com referência já não são "regulares" no sentido de autómatos finitos.

## Por motor

- JS: `test` booleano; `exec`/`match` sem `g` com capturas; com `g` só correspondências; `matchAll` com `g` para capturas de todas. Regex com `g` guarda `lastIndex`: o mesmo `/a/g` dá `true` e depois `false` em `test` repetido.
- PHP: delimitadores PCRE; `preg_match` dá 1, 0 ou `false` (erro). `preg_match_all` extrai todas; `preg_replace` substitui com `$1`.
- HTML: `pattern` sem barras, testa o valor completo; junta `required` para obrigar preenchimento. Servidor valida sempre de novo.

[Explicação completa](/cadeiras/ltw/expressoes-regulares/#javascript-php-e-html).
