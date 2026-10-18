## Esquema, instância e SGBD

- O **esquema** define atributos, chaves e restrições. A **instância** é o conteúdo num dado momento.
- Vender dois teclados muda a instância. Acrescentar a coluna `categoria` muda o esquema.
- Uma tabela vazia conserva esquema e restrições.
- Uma **base de dados** é a coleção de dados. O **SGBD** é o software que guarda, consulta, valida restrições, coordena concorrência e recupera de falhas.
- O SGBD aplica apenas regras declaradas. O nome `qtd` não impede valores negativos.

## Níveis de desenho

| Nível      | Decisão                           | Exemplo                              |
| ---------- | --------------------------------- | ------------------------------------ |
| Conceptual | Objetos e regras do domínio       | Uma encomenda pertence a um cliente. |
| Lógico     | Relações, atributos e chaves      | `Encomenda(id, data, idCliente)`     |
| Físico     | Armazenamento e métodos de acesso | Índice sobre `idCliente`             |

- A **independência física** permite trocar um índice sem reescrever a consulta.
- A **independência lógica** usa vistas para proteger aplicações de certas mudanças no esquema. Não cobre todas as mudanças.

## Relações

- Uma relação tem atributos e tuplos. O **domínio** fixa os valores admissíveis de cada atributo.
- Uma **chave** identifica cada tuplo sem repetições.
- A **aridade** conta atributos. A **cardinalidade** conta tuplos. `Cliente(id, nome, email)` tem aridade 3 mesmo vazio.
- Na teoria relacional não há duplicados nem ordem. Em SQL, só `DISTINCT` elimina duplicados e só `ORDER BY` fixa a ordem.

## Pergunta completa

- Para "clientes que compraram rato", percorre Cliente, Encomenda, Item e Produto.
- Uma linha por cliente na resposta, mesmo com várias compras. Define esse grão antes de escrever `SELECT`.

[Explicação dos níveis e da independência dos dados](/cadeiras/bd/fundamentos/#três-níveis-de-desenho).
