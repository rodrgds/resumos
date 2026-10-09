## Encapsulamento e invariantes

Uma classe define representação e operações públicas. Os membros privados são acessíveis aos membros e amigos da classe. **Encapsulamento** exige que as operações preservem o significado dos dados; getters e setters indiscriminados podem violá-lo.

No `Relogio`, `minutos_` conta minutos desde a meia-noite e satisfaz `0 <= minutos_ < 1440`.

| Operação         | Condição e efeito                                       |
| ---------------- | ------------------------------------------------------- |
| `Relogio(h, m)`  | Exige `0 <= h < 24` e `0 <= m < 60`; guarda `60*h + m`  |
| `hora() const`   | Devolve `minutos_ / 60`                                 |
| `minuto() const` | Devolve `minutos_ % 60`                                 |
| `avancar(q)`     | Aceita `0 <= q <= 1440`; guarda `(minutos_ + q) % 1440` |

`Relogio(23, 50)` guarda `1430`. Avançar `25` dá `1455 % 1440 == 15`, isto é, `0:15`. Uma cópia feita antes do avanço conserva `23:50`. Valida antes de alterar: um avanço negativo deve falhar mantendo o estado anterior.

## Construção e destruição

- O construtor tem o nome da classe, sem retorno. A lista de inicialização constrói os membros diretamente; atribuir no corpo ocorre depois dessa construção.
- Membros `const` e referências precisam de inicialização. `explicit` impede certas conversões implícitas para o tipo.
- Constroem-se bases, membros **pela ordem de declaração**, e depois executa-se o corpo do construtor.
- O destrutor `~Classe()` não tem parâmetros. Depois do corpo, os membros e bases são destruídos na ordem inversa da construção.

Se `A` existe fora de um bloco e nele se criam `B` e `C`, sair do bloco destrói `C`, depois `B`; `A` só morre ao sair do seu próprio âmbito. A limpeza dos objetos automáticos construídos também ocorre no desenrolamento até um tratador de exceção, mas não em saídas abruptas como `abort`.

Não chames manualmente o destrutor de um objeto automático. O dono de um objeto dinâmico trata a destruição, por exemplo `unique_ptr`.

## Métodos e membros

- Em `a.avancar(25)`, `this` aponta para `a`. `this->minutos_` acede ao mesmo membro que `minutos_`.
- `int hora() const` pode ser chamado num objeto constante. O acesso por `this` é constante; os tipos devolvidos também têm de respeitar a promessa de consulta.
- Um membro `static` pertence à classe; uma função estática não tem `this`. Um contador incrementado só no construtor sem argumentos não conta cópias implícitas nem objetos vivos.
- `class` tem acesso privado por defeito; `struct`, público. `protected` também permite acesso das derivadas, aumentando quem pode modificar a representação.

## Operadores e cópia

```cpp
bool operator==(const Relogio& outro) const {
    return minutos_ == outro.minutos_;
}
```

A comparação usa a representação normalizada. Operadores devem conservar o significado habitual. Não podes criar operadores novos, mudar precedência ou redefinir uma operação entre dois tipos fundamentais. Uma função livre pode tratar os dois operandos simetricamente; `friend` concede-lhe acesso privado específico.

A cópia gerada copia membros. Com um inteiro, isso produz estados independentes; com um apontador dono, só copia o endereço. Nesse caso, define uma política de propriedade e cópia.

[Construção e destruição em âmbitos](/cadeiras/p/classes-objetos/#construtores-e-destrutor).
