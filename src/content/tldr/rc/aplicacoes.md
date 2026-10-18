## DNS

- Hierárquico e distribuído. Cliente pede recursão ao resolver; este segue raiz, TLD, autoritativo. Recursão aceite normalmente só nos locais.
- A/AAAA endereços, CNAME alias, MX correio, NS autoritativos, PTR inverso.
- Porta 53; UDP para perguntas, TCP quando preciso. Cache até ao TTL dispensa consultas.

## HTTP

- HTTP/1.1: linha inicial, cabeçalhos CRLF, linha vazia, corpo delimitado. `Content-Length: 2` para `42` conta o corpo.
- GET pede, POST submete, PUT substitui, DELETE remove. 200, 301, 404, 500.
- Persistente reutiliza TCP: sem DNS/TLS, TCP novo custa ~1 RTT e cada pedido/resposta outro. Dois objetos: 3 RTT com persistência, 4 sem.
- Cookies guardam estado; cache válida serve sem rede; condicional com `If-None-Match`/`If-Modified-Since` pode dar 304.
- HTTPS usa TLS. HTTP/2 binário multiplexado sobre TCP; HTTP/3 sobre QUIC.

## FTP, sockets, correio

- FTP: controlo TCP 21, dados em ligações separadas. Ativo serve do servidor; passivo liga o cliente. Sem cifra; SFTP é outro protocolo sobre SSH.
- Servidor TCP: socket, bind, listen, accept. `accept` cria socket por conversa.
- SMTP transporta entre servidores; MX diz onde entregar. POP3/IMAP dão acesso à caixa.
- `DATA` termina em linha só com `.`; linhas de conteúdo com ponto inicial levam outro. 250 confirma aceitação para entrega, não leitura.

## Distribuição

- Cliente-servidor: $D_{CS}\ge\max(NF/u_s,F/d_{min})$.
- P2P: $D_{P2P}\ge\max(F/u_s,F/d_{min},NF/(u_s+\sum u_i))$. São limites inferiores.
- F=100 Mbit, N=10, $u_s=10$, peers 1 up/5 down: CS 100 s, P2P 50 s.
