---
title: Regras de negócio, triggers e transações
description: Integridade com restrições, transações e um trigger que impede vender acima da lotação.
section: conteudo
order: 5
---

Há regras que nenhuma interface consegue garantir sozinha. Dois compradores a clicar ao mesmo tempo no último lugar passam ambos pela validação da página. As regras de negócio críticas vivem por isso na base de dados, onde todas as escritas passam, vindas de qualquer página ou de qualquer programa.

## Três lugares para cada regra

Cada regra deve viver no sítio certo, e a pergunta para decidir é "o que acontece se esta camada for contornada":

- **Interface**: formato do email, campos obrigatórios, datas no passado. Se for contornada, o utilizador vê uma mensagem feia, mas os dados continuam válidos.
- **Lógica de negócio**: preço calculado, descontos, disponibilidade apresentada. Se for contornada, a aplicação comporta-se mal, mas a base de dados continua consistente.
- **Base de dados**: unicidade, chaves estrangeiras, lotação máxima. Se for contornada, os dados ficam corruptos e nenhuma página os conserta.

A lotação da sessão é o exemplo central: vender o lugar 101 numa sala de 100 corrompe os dados, por isso a regra vive na base de dados. A mensagem bonita de "sessão esgotada" vive na interface, mas é a base de dados que decide.

## Transação de compra passo a passo

Uma compra faz várias escritas que têm de acontecer todas ou nenhuma: criar o bilhete, marcar o pagamento e registar o movimento. A **transação** agrupa-as com atomicidade.

```sql
BEGIN;
INSERT INTO bilhetes (utilizador_id, sessao_id, codigo, estado)
VALUES (7, 12, 'B-1043', 'reservado');
UPDATE bilhetes SET estado = 'pago' WHERE codigo = 'B-1043';
COMMIT;
```

Se a segunda instrução falhar, o `ROLLBACK` anula também a primeira e a base de dados fica como estava. Sem transação, uma falha a meio deixava um bilhete reservado sem pagamento, nem vendido nem livre. Testa sempre o caminho da falha: corre a transação até meio, anula-a e confirma que nada mudou.

## Trigger que impede vender acima da lotação

A restrição `CHECK` não chega aqui, porque compara linhas de duas tabelas: conta os bilhetes de uma sessão e compara com a lotação da sessão. Essa verificação vive num **trigger**, uma função que corre automaticamente antes de cada inserção:

```sql
CREATE OR REPLACE FUNCTION lotacao_ok() RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM bilhetes
        WHERE sessao_id = NEW.sessao_id
          AND estado <> 'cancelado')
       >= (SELECT lotacao FROM sessoes WHERE id = NEW.sessao_id) THEN
        RAISE EXCEPTION 'Sessao % esgotada', NEW.sessao_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bilhete_antes_inserir
BEFORE INSERT ON bilhetes
FOR EACH ROW EXECUTE FUNCTION lotacao_ok();
```

Compra agora o lugar 101 de uma sala de 100: o `INSERT` dispara o trigger, a contagem dá 100 bilhetes ativos contra lotação 100, e a inserção é recusada com a exceção. Funciona para dois compradores em simultâneo, porque a verificação corre dentro da transação de cada um, junto aos dados. A aplicação apanha o erro e mostra "sessão esgotada", mas a decisão foi da base de dados.

:::tip[Trigger não substitui desenho]
O trigger protege a regra, mas não explica os dados. Mantém a lotação como coluna da sessão e o estado em cada bilhete, como no esquema, para conseguires interrogar "quantos lugares livres" sem o trigger. Regras na base de dados e dados bem desenhados andam juntos.
:::
