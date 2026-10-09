## Esquema, instância e SGBD

- O **esquema** define atributos, tipos e restrições. A **instância** é o conteúdo num dado momento. Vender um produto muda a instância; acrescentar uma coluna muda o esquema.
- Uma **base de dados** é a coleção organizada de dados. O **SGBD** é o software que a guarda, consulta, verifica restrições e coordena concorrência e recuperação.
- O SGBD aplica as regras declaradas. Não deduz que `qtd` deve ser positiva nem corrige uma transferência mal programada.

## Níveis de desenho

| Nível      | Decisão                           | Exemplo                              |
| ---------- | --------------------------------- | ------------------------------------ |
| Conceptual | Objetos e regras do domínio       | Uma encomenda pertence a um cliente. |
| Lógico     | Relações, atributos e chaves      | `Encomenda(id, data, idCliente)`     |
| Físico     | Armazenamento e métodos de acesso | Índice sobre `idCliente`             |

A **independência física** permite alterar métodos de acesso sem mudar a consulta lógica. A **independência lógica** protege aplicações de certas mudanças no esquema, por exemplo através de vistas. Não torna qualquer alteração invisível.

## Relações

- Uma relação tem atributos e tuplos. O **domínio** de um atributo define os valores admissíveis; uma **chave** identifica um tuplo sem repetições.
- A **aridade** conta atributos; a **cardinalidade** conta tuplos. `Cliente(id, nome, email)` tem aridade 3, mesmo vazio. Inserir um cliente só aumenta a cardinalidade.
- Na teoria relacional, não há duplicados nem ordem de tuplos. SQL admite duplicados por omissão e só `ORDER BY` garante ordem.

Para responder a "que clientes compraram rato?", percorre Cliente, Encomenda, Item e Produto. A resposta deve identificar cada cliente uma vez, mesmo com várias compras. Define primeiro o significado de uma linha do resultado.

[Explicação dos níveis e da independência dos dados](/cadeiras/bd/fundamentos/#três-níveis-de-desenho).
