---
title: Do modelo ao esquema relacional
description: Conversão de UML em tabelas, chaves primárias e estrangeiras, e validação do esquema da Loja de Bilhetes.
section: conteudo
order: 3
---

O [modelo conceptual](modelo-conceptual/) desenha o problema. O esquema relacional traduz esse desenho para tabelas que o PostgreSQL consegue guardar. A conversão segue regras fixas: cada regra do UML tem um destino certo nas tabelas, e aplica-las bem evita os erros que depois custam migrações.

## As regras de conversão

Cada classe vira uma tabela, cada atributo vira uma coluna e cada objeto ganha um identificador único, a **chave primária**. As associações viram **chaves estrangeiras**: colunas que referem a chave primária de outra tabela.

- Associação de um para muitos (`1` a `1..*`): a chave estrangeira vai para o lado dos muitos. Cada sessão guarda `evento_id` a referir o evento. O evento não guarda nada sobre as sessões.
- Associação de muitos para muitos resolvida por classe: a classe de associação vira tabela própria com duas chaves estrangeiras. A tabela `bilhetes` guarda `utilizador_id` e `sessao_id`.
- Associação de um para um: a chave estrangeira vai para qualquer dos lados, com restrição de unicidade.

A direção da chave estrangeira é a decisão que mais erros causa. Pergunta sempre "cada objeto deste lado refere quantos do outro". Cada sessão refere um evento, por isso a coluna vive na sessão. Se a pusesses no evento, um evento só conseguiria guardar uma sessão.

## Conversão completa do exemplo

Aplicadas as regras às quatro classes da Loja de Bilhetes:

```sql
CREATE TABLE utilizadores (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    palavra_passe TEXT NOT NULL
);

CREATE TABLE eventos (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT
);

CREATE TABLE sessoes (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER NOT NULL REFERENCES eventos (id),
    data_hora TIMESTAMP NOT NULL,
    preco NUMERIC(8, 2) NOT NULL,
    lotacao INTEGER NOT NULL CHECK (lotacao > 0)
);

CREATE TABLE bilhetes (
    id SERIAL PRIMARY KEY,
    utilizador_id INTEGER NOT NULL REFERENCES utilizadores (id),
    sessao_id INTEGER NOT NULL REFERENCES sessoes (id),
    codigo TEXT NOT NULL UNIQUE,
    estado TEXT NOT NULL CHECK (estado IN ('reservado', 'pago', 'cancelado'))
);
```

Cada restrição do modelo aparece algures: o email único vira `UNIQUE`, a lotação positiva vira `CHECK`, o estado limitado aos três valores vira `CHECK` com a lista. O `SERIAL` cria o identificador automático que serve de chave primária. Repara que `descricao` aceita nulos e `titulo` não: um evento sem descrição ainda se vende, um evento sem título não se apresenta.

## Uma violação de chave estrangeira explicada

Tenta vender um bilhete para uma sessão que não existe:

```sql
INSERT INTO bilhetes (utilizador_id, sessao_id, codigo, estado)
VALUES (1, 999, 'B-0001', 'reservado');
```

O PostgreSQL recusa com erro de violação de chave estrangeira: a sessão 999 não está na tabela `sessoes`, por isso o bilhete ficaria a apontar para o vazio. Esta recusa é a integridade referencial a funcionar. Sem a chave estrangeira, a inserção passava e a aplicação mostrava um bilhete para uma sessão fantasma, com erro só na página de confirmação, longe da causa.

A mesma proteção vale ao apagar: não consegues apagar um evento que ainda tem sessões, porque as sessões ficariam órfãs. Decide por tabela o comportamento, apagar em cascata ou bloquear, em vez de descobrires a meio do projeto.

:::tip[Como validar o esquema]
Percorre cada caso de uso e escreve as inserções que ele exige, como fizemos acima. Se algum passo precisar de uma coluna que não existe, falta um atributo. Se alguma inserção válida for recusada, há uma restrição a mais. O esquema está pronto quando todos os casos de uso passam neste teste de papel.
:::
