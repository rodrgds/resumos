## Propagação e limpeza

`throw` abandona a operação e procura um `catch` compatível, atravessando chamadas se necessário. Depois do tratador, a execução continua após o `try`/`catch`, nunca na linha seguinte ao `throw`.

```cpp
try {
    calcular();  // Recurso RAII; dividir(12.0, 0.0) lança.
} catch (const std::exception& erro) {
    std::cout << erro.what() << '\n';
}
// Continua aqui, depois de libertar os recursos de calcular.
```

- Apanha por referência constante para evitar cópia e slicing. Coloca tratadores específicos antes dos gerais; `throw;` dentro do tratador relança.
- No **desenrolamento da pilha**, objetos automáticos já construídos morrem na ordem inversa. Um apontador cru local não liberta automaticamente a memória reservada com `new`.
- Se a construção não termina, o destrutor do objeto completo não corre, mas os membros e bases construídos são limpos. Se um construtor delegante já completou o destino e lança depois, o objeto completo é destruído.
- Destrutores devem libertar sem propagar exceções. Uma segunda exceção a sair durante o desenrolamento termina o programa. Violar `noexcept` também termina.

Usa donos RAII como membros para proteger recursos, incluindo durante a construção. Uma falha previsível de entrada pode ser tratada por estado de erro; exceções servem quando a operação falha e o tratamento pertence a outro nível.

## Garantias perante falhas

| Garantia | O que conserva                                                         |
| -------- | ---------------------------------------------------------------------- |
| Básica   | Invariantes e ausência de fugas, sem preservar necessariamente o valor |
| Forte    | A operação falhada não tem efeitos observáveis                         |

Preparar uma cópia antes de trocar o recurso dá garantia forte se a troca não lança. Destruir o estado anterior, ficar vazio e só depois reservar pode dar apenas a básica. Evitar fugas não basta se o tamanho e o apontador deixarem de satisfazer o invariante.

## Testes pelo contrato

Escolhe resultados à mão e casos que distinguem erros plausíveis. Para contar em `[minimo, maximo]`, incluindo extremos e devolvendo zero com limites invertidos:

| Caso                                         | Esperado |
| -------------------------------------------- | -------- |
| Vazio, limites `0` e `20`                    | `0`      |
| `{-1, 0, 1, 19, 20, 21}`, limites `0` e `20` | `4`      |
| `{7, 7, 8}`, limites `7` e `7`               | `2`      |
| `{1, 2, 3}`, limites `5` e `4`               | `0`      |

A condição errada `minimo < x && x < maximo` dá `1` para `{1, 2, 3}` com limites `1` e `3`, em vez de `3`. Só valores interiores não revelariam o erro.

`assert` interrompe quando a condição falha, mas pode desaparecer com `NDEBUG`. Não coloques nele validação de dados externos nem operações necessárias ao programa. Testes finitos não provam correção geral.

Para cópia, altera a cópia e confere o original; para propriedade, verifica libertação única. Documenta domínio, alterações e erros, sem comentários que apenas repitam instruções.

## Sanitizers

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic -g -O1 -fsanitize=address,undefined -fno-omit-frame-pointer programa.cpp -o programa
```

AddressSanitizer deteta muitos acessos inválidos e usos após libertação; UndefinedBehaviorSanitizer deteta certas operações indefinidas. Só analisam caminhos executados, e o suporte depende da plataforma. Não estão ativos no executor do navegador.

Lê a primeira falha, a linha e a cadeia de chamadas; reduz a entrada. Uma saída correta pode coexistir com comportamento indefinido.

[Exemplo de propagação com RAII](/cadeiras/p/excecoes-testes/#lançar-e-apanhar).
