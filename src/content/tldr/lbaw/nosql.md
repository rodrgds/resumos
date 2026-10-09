## Modelo pela operação

NoSQL reúne sistemas com contratos distintos; não garante ausência de esquema, maior velocidade ou a mesma semântica de transações.

| Modelo              | Adequação típica                                         |
| ------------------- | -------------------------------------------------------- |
| Chave-valor         | Procurar valor pela chave, como identificador de sessão. |
| Documentos          | Ler uma compra com campos e bilhetes aninhados.          |
| Famílias de colunas | Acessos por chaves e intervalos definidos pelo modelo.   |
| Grafos              | Percorrer relações com propriedades.                     |

Uma associação N:N não basta para justificar grafos. JSON pode existir numa base relacional; documentos podem ter validação de esquema. Formato e garantias são dimensões distintas.

## Embeber ou referenciar

**Embeber** aproxima dados lidos juntos e pode permitir atomicidade num documento. **Referenciar** permite identidade independente e evita algumas repetições, mas pode exigir mais consultas ou junções.

Para C12 com dois bilhetes, limite de dez, leitura normalmente integral e alterações raras, embeber é razoável. Não generalizes para todas as compras ilimitadas de uma pessoa.

```json
{
  "id": "C12",
  "comprador": "U7",
  "bilhetes": [
    { "codigo": "B1", "sessao": "S12", "preco_compra": 10 },
    { "codigo": "B2", "sessao": "S12", "preco_compra": 10 }
  ]
}
```

O preço contratado soma 20 e fica igual se S12 aumentar o preço atual. É snapshot histórico. Duplicar o email **atual** do comprador exigiria sincronização quando mudasse. Se cada bilhete muda independentemente e com frequência, reavalia a unidade de armazenamento.

## Atomicidade, índices e evolução

- Escrita atómica num documento **não implica** atomicidade entre compra e capacidade noutro documento.
- Alguns sistemas suportam transações multidocumento, com condições e custos específicos. Verifica sistema, versão e configuração.
- Consultas seletivas continuam a precisar de índices.
- Esquema flexível exige tipos, campos obrigatórios, versões e leitura de documentos antigos.
- Reservas continuam a exigir unicidade, coordenação concorrente e tratamento de repetição.

## CAP durante uma partição

No modelo CAP, consistência forte é normalmente apresentada como linearizabilidade; não é a C de ACID. Disponibilidade exige resposta de cada nó não falhado a cada pedido. Partição impede comunicação entre grupos de nós.

Duas réplicas separadas começam com um lugar livre. Aceitar uma reserva independente em cada lado pode prometer dois bilhetes para um lugar. Preservar consistência forte pode exigir esperar por coordenação ou recusar alguma operação, deixando de garantir disponibilidade no modelo.

**Durante a partição não se garantem simultaneamente ambas.** "Escolher sempre duas de três" perde a condição da falha. Consistência eventual promete convergência sob condições como fim das atualizações e recuperação da comunicação; não garante leitura imediata da escrita nem desfaz dois sucessos incompatíveis.

Justifica a tecnologia pelas consultas, invariantes, unidade de atualização, crescimento e garantias, em vez de afirmar apenas que escala melhor.

[Exemplo de documentos e referências](/cadeiras/lbaw/nosql/#documento-embebido-ou-referência).
