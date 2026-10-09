## Converter associações

| Relação              | Tradução                                                                             |
| -------------------- | ------------------------------------------------------------------------------------ |
| 1:N                  | FK no lado N; `NOT NULL` quando cada linha exige a referência.                       |
| 1:1                  | FK com `UNIQUE`, no lado adequado à obrigatoriedade e operações.                     |
| N:N simples          | Tabela de ligação com duas FKs e chave composta quando só há uma ocorrência por par. |
| Entidade associativa | Identidade própria se o domínio admite várias ocorrências do mesmo par.              |

Bilhete tem identidade própria: uma pessoa pode comprar vários para a mesma sessão. Não declares o par utilizador-sessão único.

Cada cartaz pertence a uma sessão; cada sessão pode ter zero ou um cartaz. Assumindo `sessoes(id INTEGER PRIMARY KEY)`:

```sql
CREATE TABLE cartazes (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sessao_id INTEGER NOT NULL UNIQUE REFERENCES sessoes(id)
);
```

A FK não recebe `IDENTITY`: refere um identificador existente. Nenhuma destas restrições obriga uma sessão a ter cartaz. Do mesmo modo, uma FK de sessão para evento não impõe o mínimo de uma sessão por evento.

## Chaves, domínios e NULL em PostgreSQL

- **PK:** unicidade e ausência de NULL. Uma chave candidata é mínima segundo o domínio; um id artificial não substitui a unicidade do email.
- **CHECK:** recusa falso, mas aceita verdadeiro ou desconhecido. `preco NUMERIC(8,2) NOT NULL CHECK (preco >= 0)` exige ambas as regras.
- **DEFAULT:** fornece o valor omitido; não proíbe enviar outro valor ou NULL.
- **UNIQUE:** permite vários NULL por defeito. `NULLS NOT DISTINCT`, quando suportado, muda esse comportamento. Define também a política de maiúsculas do email.
- **FK:** exige uma referência válida quando a coluna não é NULL; pode referir a própria tabela.

## Eliminação e atualização de referências

| Ação          | Consequência                                                                           |
| ------------- | -------------------------------------------------------------------------------------- |
| `NO ACTION`   | Recusa a violação quando verifica a restrição; admite adiamento se ela for deferrable. |
| `RESTRICT`    | Impede a operação sem esse adiamento equivalente.                                      |
| `CASCADE`     | Propaga aos registos que referenciam.                                                  |
| `SET NULL`    | Exige que NULL seja permitido.                                                         |
| `SET DEFAULT` | O default tem de continuar a satisfazer a FK.                                          |

Se bilhetes referencia sessões com `ON DELETE CASCADE`, apagar a sessão pode apagar bilhetes; apagar um bilhete não apaga a sessão. Escolhe ações pelo ciclo de vida e pelo histórico necessário.

## Subtipos e documentação

Supertipo com tabelas de subtipos partilha atributos através de PKs que também são FKs. Tabela única usa discriminador e CHECKs. Tabelas por classe concreta repetem atributos e podem exigir UNION. Nenhuma escolha dispensa verificar totalidade, disjunção e identidade.

Na notação compacta, `NN` significa `NOT NULL`, `UK` unicidade, `CK` verificação e `->` referência. Seleciona o schema do grupo com `SET search_path TO lbawXXg` após o criar; não uses inadvertidamente o `public` partilhado.

Valida casos de uso com escritas válidas, inválidas e concorrentes. Passar alguns exemplos não prova todas as garantias.

[Conversão completa para PostgreSQL](/cadeiras/lbaw/esquema-relacional/#conversão-completa-do-exemplo).
