## Invariante do relógio

Representação: `minutos_` com `0 <= minutos_ < 1440`.

| Operação        | Contrato                                         |
| --------------- | ------------------------------------------------ |
| `Relogio(h, m)` | `0 <= h < 24`, `0 <= m < 60`; guarda `60*h + m`  |
| `hora()`        | `minutos_ / 60`                                  |
| `minuto()`      | `minutos_ % 60`                                  |
| `avancar(q)`    | `0 <= q <= 1440`; guarda `(minutos_ + q) % 1440` |

`Relogio(23, 50)` guarda `1430`. Avançar `25` dá `15`, ou seja `0:15`. Cópia anterior conserva `23:50`. Valida antes de alterar.

Encapsular é preservar o significado, não espalhar getters. Uma hora nunca fica inválida à espera de correção externa.

## Construção e destruição

1. Constrói bases.
2. Constrói membros pela ordem de declaração.
3. Corre o corpo do construtor.
4. Na saída, corre o corpo do destrutor e depois destrói membros e bases
   pela ordem inversa da construção.

- Lista de inicialização constrói diretamente. Corpo atribui depois.
- `const` e referências exigem inicialização.
- `explicit` trava conversões implícitas indesejadas.
- Não destruas manualmente um automático. O dono trata do dinâmico.

Como os erros interrompem a operação fica em [Exceções e testes](/cadeiras/p/excecoes-testes/#lançar-e-apanhar).

## Métodos e operadores

- `hora() const` corre em objeto constante. O tipo devolvido também conta para a promessa.
- `this` aponta para o objeto da chamada. `static` pertence à classe e não tem `this`.
- `class` é privada por defeito. `struct` é pública.

```cpp
bool operator==(const Relogio& outro) const {
    return minutos_ == outro.minutos_;
}
```

Conserva o significado habitual do operador. Não cria operadores, não muda precedência, não redefine operação entre fundamentais. Com apontador dono, a cópia gerada só copia o endereço.

[Construção em âmbitos](/cadeiras/p/classes-objetos/#construtores-e-destrutor).
