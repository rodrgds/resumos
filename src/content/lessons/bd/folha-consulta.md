---
title: Cheat sheet de BD
description: Decisões rápidas de modelação, mapeamento relacional, normalização, SQLite e álgebra relacional.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos BD SofiaViP
      url: https://drive.google.com/file/d/1N1GyVPZ-kOPDKtR12QB-65QQKTtxwLgX/view
  coverage: Síntese das páginas 2 a 11 do resumo, com UML, mapeamento, chaves, dependências funcionais, formas normais, SQLite, vistas, gatilhos e álgebra relacional.
  gaps:
    - A capa da página 1 não contém matéria.
    - Consultas SQL completas, índices, transações, armazéns de dados e NoSQL das páginas atuais não são desenvolvidos nesta fonte.
    - A correspondência destes apontamentos a uma edição atual da unidade curricular não foi verificada.
---

Parte da regra do domínio que precisa de ficar verdadeira. Representa-a no modelo conceptual, escolhe onde vive a chave no esquema relacional e só depois escreve operações. Modelação em **UML**; exemplos em **SQLite**.

## Modelo conceptual para relações

| Situação                             | Decisão de mapeamento                                                                                                                                                                  |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Classe                               | Uma relação com atributos e chave primária; a chave identifica cada objeto.                                                                                                            |
| Associação $1:N$                     | Chave estrangeira no lado $N$, a apontar para a chave do lado $1$; `NOT NULL` se a participação desse lado for obrigatória.                                                            |
| Associação $N:M$                     | Relação própria com as duas chaves estrangeiras, geralmente formando uma chave composta; acrescenta os atributos da associação.                                                        |
| Associação $1:1$                     | Coloca uma chave estrangeira num dos lados e impõe `UNIQUE`; escolhe o lado segundo a participação e a possibilidade de nulos.                                                         |
| Associação de aridade maior que dois | Relação própria com as chaves dos participantes; não a substituas automaticamente por várias associações binárias, pois podes perder a combinação original.                            |
| Subclasse                            | Decide se guardas uma relação por classe, por ramo ou uma relação comum com discriminador. Verifica se as subclasses são disjuntas/sobrepostas e completas/parciais antes de escolher. |

Em UML, a multiplicidade junto de uma extremidade limita quantos objetos **dessa** classe se associam a um objeto da outra. Uma classe de associação guarda atributos da **ligação**, não de um participante isolado. Na composição, a parte tem um único composto de cada vez e o ciclo de vida depende dele; a agregação admite uma ligação mais fraca. Não traduzes qualquer desenho com um único padrão sem verificar estas condições. Vê [associações e multiplicidades](/cadeiras/bd/modelo-conceptual-uml/#associações-e-multiplicidades) e [mapeamento relacional](/cadeiras/bd/mapeamento-relacional/#muitos-para-muitos-e-um-para-um).

## Chaves e dependências

Uma **chave candidata** identifica unicamente uma linha e é mínima; escolhe uma como **primária**. Uma **superchave** pode ter atributos a mais. A chave estrangeira referencia uma chave candidata da relação alvo e precisa de uma política para atualização e remoção. `NULL` significa ausência de valor conhecido ou aplicável, não um valor comum.

Numa dependência funcional $X\to Y$, duas linhas que concordam em $X$ têm de concordar em $Y$ em **todas as instâncias válidas**, não só na amostra atual. Para calcular $X^+$, começa por $X$ e acrescenta repetidamente o lado direito de cada dependência cujo lado esquerdo já esteja contido no fecho. $X$ é superchave se $X^+$ contém todos os atributos. Splitting, combining e transitividade ajudam a inferir dependências, mas as regras de negócio determinam quais são verdadeiras. Vê [dependências funcionais](/cadeiras/bd/normalizacao/#dependências-funcionais).

## Normalizar sem perder dados

| Forma | Pergunta de revisão                                                                                             |
| ----- | --------------------------------------------------------------------------------------------------------------- |
| 1FN   | Cada célula guarda um valor atómico para o modelo escolhido?                                                    |
| 2FN   | Em 1FN, algum atributo não primo depende apenas de **parte** de uma chave candidata composta? Se sim, separa-o. |
| 3FN   | Em 2FN, para cada dependência não trivial $X\to A$, $X$ é superchave **ou** $A$ é atributo primo?               |
| BCNF  | Para toda a dependência não trivial $X\to Y$, $X$ é superchave? É mais exigente do que 3FN.                     |

A decomposição procura evitar anomalias de inserção, atualização e remoção. Confirma **junção sem perda**: recompor as relações não deve criar linhas espúrias. Confirma também se preserva as dependências; uma decomposição em BCNF pode não as preservar, enquanto a síntese em 3FN consegue preservar as dependências usadas. Vê [formas normais](/cadeiras/bd/normalizacao/#as-formas-por-ordem) e [decomposição até BCNF](/cadeiras/bd/normalizacao/#decompor-até-bcnf).

## SQLite e operações

Ao criar uma tabela, declara `PRIMARY KEY`, `UNIQUE`, `NOT NULL`, `CHECK` e `REFERENCES` onde a regra pertence. Em SQLite, ativa `PRAGMA foreign_keys = ON` **por ligação** para aplicar as referências. Define explicitamente a ação `ON DELETE`/`ON UPDATE` que corresponde ao domínio, por exemplo `RESTRICT`, `CASCADE` ou `SET NULL`, e assegura que a coluna admite nulos quando necessário. `INSERT`, `UPDATE` e `DELETE` alteram dados; sem `WHERE`, `UPDATE` e `DELETE` abrangem todas as linhas. O `rowid` de SQLite é um detalhe da implementação, não substitui uma chave estável do domínio. Vê [restrições em CREATE TABLE](/cadeiras/bd/sql-definicao-dados/#create-table-e-restrições).

Uma **vista** dá nome a uma consulta e normalmente não guarda as linhas. A atualização de vistas tem condições próprias; não assumas que uma vista com junções ou agregações é editável. Um **gatilho** reage a `INSERT`, `UPDATE` ou `DELETE`; em SQLite, `NEW` e `OLD` referem, quando aplicável, a linha nova e anterior. Usa restrições declarativas antes de um gatilho quando expressam a mesma regra. Vê [vistas](/cadeiras/bd/vistas-gatilhos-acessos/#vistas-perguntas-com-nome) e [gatilhos](/cadeiras/bd/vistas-gatilhos-acessos/#gatilhos-regras-que-se-cumprem-sozinhas).

Na **álgebra relacional**, $\sigma$ filtra linhas, $\pi$ escolhe atributos, $\times$ combina cada par de linhas e $\bowtie_\theta$ combina pares que satisfazem $\theta$. A junção natural iguala automaticamente atributos de nome comum, por isso confirma os nomes antes de a usar. União, diferença e interseção exigem esquemas compatíveis e seguem semântica de conjuntos; SQL usa multiconjuntos por omissão, pelo que duplicados requerem atenção. A divisão responde a perguntas do tipo «para **todos** os valores de outra relação». Consulta [operadores essenciais](/cadeiras/bd/algebra-relacional/#os-operadores-essenciais).
