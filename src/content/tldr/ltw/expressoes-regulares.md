## Peças e precedência

Uma regex procura correspondências. Validar um campo completo exige também fixar as pontas conforme as regras do motor.

| Peça              | Significado habitual                                        |
| ----------------- | ----------------------------------------------------------- |
| `[abc]`, `[^0-9]` | Um caráter do conjunto, ou fora dele                        |
| `.`               | Um caráter, normalmente sem quebras de linha                |
| `\d`, `\w`, `\s`  | Dígito, palavra e espaço, conforme o motor                  |
| `^`, `$`, `\b`    | Início, fim e fronteira de palavra, sem consumir caracteres |
| `?`, `*`, `+`     | Zero ou um, zero ou mais, um ou mais                        |
| `{3}`, `{2,4}`    | Exatamente três, ou entre dois e quatro                     |
| `a\|b`            | Alternativa entre `a` e `b`                                 |
| `(ab)`, `(?:ab)`  | Grupo com captura ou sem captura                            |

Quantificadores aplicam-se à peça anterior: `ab+` repete `b`; `(ab)+` repete o par. Alternância tem baixa precedência: `^LTW|BD$` não prende ambas as alternativas às pontas; `^(?:LTW|BD)$` fá-lo.

## Formato e capturas

Para uma string sem quebras de linha:

```js
const resultado = 'LTW-042'.match(/^(?:LTW|BD)-([0-9]{3})$/);
console.log(resultado[0]); // LTW-042
console.log(resultado[1]); // 042
```

`LTW-42` e `xLTW-042` falham. O grupo sem captura organiza os prefixos; o primeiro capturante conserva os dígitos como texto. Uma forma de data pode aceitar `2026-02-31`: formato não garante validade no calendário nem existência no catálogo.

`\1` no padrão exige o mesmo texto da primeira captura. `/\b(\w+)\s+\1\b/` encontra `rede rede`, mas não `rede web`. `$1` no texto de substituição JavaScript ou PHP refere a primeira captura.

## Guloso, preguiçoso e contexto

Sobre `preço [12] e [35]`:

| Padrão         | Primeira correspondência |
| -------------- | ------------------------ |
| `/\[.*\]/`     | `[12] e [35]`            |
| `/\[.*?\]/`    | `[12]`                   |
| `/\[[^\]]*\]/` | `[12]`                   |

O guloso tenta consumir mais; o preguiçoso tenta menos, expandindo se necessário. Ambos começam na primeira posição onde conseguem casar. Uma classe negada impede consumir o delimitador. Regex não substitui um parser de HTML.

Lookaround testa contexto sem o consumir: `livro(?=s)` exige `s` a seguir; `livro(?!s)` exclui-o; `(?<=EUR )[0-9]+` exige o prefixo. Compatibilidade de lookbehind varia entre motores.

Backtracking tenta alternativas quando o restante padrão falha. Repetições ambíguas como `(a+)+$` podem ter custo explosivo numa entrada quase válida; evita-as e limita o comprimento recebido.

## Motores e flags

- `i` ignora maiúsculas; `m` altera âncoras para linhas; `s` faz `.` incluir quebras de linha; `g` pede resultados globais em JavaScript.
- `test` dá booleano; `exec` e `match` sem `g` dão capturas. `match` com `g` dá correspondências completas; `matchAll` com `g` permite capturas de todas.
- Uma regex JavaScript com `g` conserva `lastIndex`: o mesmo `/a/g` testado duas vezes sobre `'a'` dá `true`, depois `false`. Evita esse estado numa validação repetida.
- PHP usa delimitadores PCRE. `preg_match` devolve 1, 0 ou `false` para correspondência, ausência ou erro. `\A` e `\z` exigem pontas estritas, sem o caso especial de uma quebra de linha final de `$`.
- HTML `pattern` não usa `/.../` e testa o valor completo nos tipos suportados. Acrescenta `required` para exigir preenchimento e valida novamente no servidor.

Classes e Unicode dependem do motor. Referências a capturas ultrapassam a expressividade das regex clássicas de autómatos finitos.

[Exemplos e particularidades dos motores](/cadeiras/ltw/expressoes-regulares/#javascript-php-e-html).
