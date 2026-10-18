## O que acontece ao lançar?

`throw` abandona a operação e procura `catch` compatível. Depois do tratador, continua após o `try`, nunca na linha seguinte ao `throw`.

```cpp
try {
    calcular();  // dividir(12.0, 0.0) lança
} catch (const std::exception& erro) {
    std::cout << erro.what() << '\n';
}
```

- Apanha por referência constante. Por valor copia e corta derivadas.
- Específicos antes dos gerais. `throw;` relança a atual.
- Desenrolamento destrói automáticos já construídos, por ordem inversa. Apontador cru não liberta `new`.
- Se a construção não termina, o destrutor completo não corre. Membros e bases feitos são limpos.
- Os destrutores devem libertar recursos sem deixar sair exceções.
- Se uma exceção escapa de um destrutor chamado durante o desenrolamento, o programa termina com `std::terminate`. Violar `noexcept` também termina.

Exceção serve quando a operação falha e o tratamento pertence a outro nível. Entrada previsível pode usar estado de erro.

## Que garantia dou?

| Garantia | Promessa                                      |
| -------- | --------------------------------------------- |
| Básica   | Invariantes e sem fugas, sem prometer o valor |
| Forte    | Sem efeitos observáveis na falha              |

Preparar cópia antes de trocar dá forte se a troca não lança.

## Que casos testo?

Para contar valores no intervalo `[minimo, maximo]`:

| Caso                     | Intervalo | Esperado |
| ------------------------ | --------- | -------- |
| Vazio                    | `0, 20`   | `0`      |
| `{-1, 0, 1, 19, 20, 21}` | `0, 20`   | `4`      |
| `{7, 7, 8}`              | `7, 7`    | `2`      |
| Limites invertidos       | `5, 4`    | `0`      |

- Condição errada `min < x && x < max` dá `1` em `{1, 2, 3}` com `1, 3`. Usa fronteiras para a apanhar.
- `assert` pode desaparecer com `NDEBUG`. Não valida dados externos nem faz
  trabalho necessário.
- Para cópia, altera a cópia e confere o original.

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic -g -O1 -fsanitize=address,undefined -fno-omit-frame-pointer programa.cpp -o programa
```

Sanitizers só veem caminhos executados. Não correm no navegador. Lê a primeira falha e reduz a entrada.

[Propagação com RAII](/cadeiras/p/excecoes-testes/#lançar-e-apanhar).
