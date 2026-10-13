CREATE TABLE sessoes (
 id integer PRIMARY KEY,
 lotacao integer NOT NULL CHECK(lotacao>0),
 livres integer NOT NULL CHECK(livres BETWEEN 0 AND lotacao)
);
CREATE TABLE bilhetes (
 id integer PRIMARY KEY,
 sessao_id integer NOT NULL REFERENCES sessoes(id),
 utilizador_id integer NOT NULL,
 estado text NOT NULL CHECK(estado IN ('reservado','pago','cancelado'))
);
INSERT INTO sessoes VALUES(12,2,0);
INSERT INTO bilhetes VALUES(1043,12,7,'reservado'),(1044,12,8,'pago');
