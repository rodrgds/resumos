## Atores, histórias e casos de uso

Um **ator** é um papel externo que interage com o sistema, humano ou outro sistema. A mesma pessoa pode ter vários papéis; a base de dados interna não é um ator externo.

| Artefacto              | Conteúdo necessário                                             |
| ---------------------- | --------------------------------------------------------------- |
| História de utilizador | Como **papel**, quero **capacidade** para **benefício**.        |
| Caso de uso            | Ator, pré-condições, fluxo até ao resultado e ramos de exceção. |
| Critério de aceitação  | Estado inicial, ação e resultado observável, incluindo falhas.  |

Na compra de um bilhete: escolher sessão, consultar preço e disponibilidade, confirmar, reservar capacidade e registar compra. Se o último lugar esgotar entre escolha e confirmação, o fluxo tem de recusar e permitir escolher outra sessão.

## Requisitos verificáveis

- **Funcional:** o comprador consulta os seus bilhetes pagos.
- **Qualidade:** 95% das pesquisas respondem em menos de 2 s, com volume, carga, ambiente e método de medição definidos.
- **Restrição técnica:** usar o servidor PostgreSQL indicado para a entrega.
- **Regra de negócio:** bilhetes ativos não podem ultrapassar a lotação. A interface, o servidor e a base de dados precisam de preservar a mesma regra.

"O sistema é rápido" não tem um teste reprodutível. Um número sem condições de medição também não chega.

## Aceitação e rastreabilidade

Para cancelar uma reserva, verifica decisões distintas:

1. Reserva minha cancelável: muda para cancelada e liberta exatamente um lugar.
2. Reserva alheia: recusa sem alterar dados.
3. Repetição de cancelamento: conserva o resultado e não liberta outro lugar.

Liga requisito, regra do modelo, operação e teste. Uma alteração tem de chegar a todos esses artefactos. Prioridade de negócio e marca de entrega são diferentes: `prototype` e `product` identificam obrigações das respetivas entregas; `innovation` identifica uma proposta opcional.

O processo estruturado organiza fases e resultados; o ágil usa iterações e feedback; a prototipagem experimenta soluções. As fases pedagógicas de LBAW não tornam os requisitos imutáveis.

[Fluxos e critérios completos](/cadeiras/lbaw/requisitos/#critérios-de-aceitação-e-rastreabilidade).
