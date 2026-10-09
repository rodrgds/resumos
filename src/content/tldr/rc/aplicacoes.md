## DNS

DNS é hierárquico e distribuído. Habitualmente, o cliente pede resposta recursiva ao resolver; este segue referências iterativas de raiz, TLD e autoritativo. Cache válida até ao TTL pode evitar consultas.

| Registo  | Conteúdo                          |
| -------- | --------------------------------- |
| A / AAAA | IPv4 / IPv6                       |
| CNAME    | Nome canónico de alias            |
| MX       | Servidor de correio e preferência |
| NS       | Servidor autoritativo             |
| PTR      | Nome no espaço inverso            |

DNS clássico usa porta 53, UDP para muitas perguntas e TCP quando necessário, incluindo transferências de zona. Não é sempre UDP.

## HTTP e cache

HTTP/1.1 usa linha inicial, cabeçalhos terminados por CRLF, linha vazia e corpo delimitado, por exemplo com `Content-Length`. `Content-Length: 2` para `42` conta só os dois bytes do corpo.

- GET pede representação; POST submete dados; PUT substitui representação; DELETE pede remoção.
- 200 indica sucesso, 301 redirecionamento permanente, 404 recurso não encontrado e 500 erro interno.
- Ligação persistente reutiliza TCP. Com objetos pequenos pedidos em sequência, sem DNS, TLS, transmissão ou processamento, TCP novo custa um RTT e cada pedido/resposta outro. Dois objetos persistentes demoram três RTT.
- Cookies associam pedidos a estado da aplicação. Cache válida pode fornecer o objeto sem rede; validação condicional por `If-None-Match` ou `If-Modified-Since` pode receber 304 e reutilizar o corpo guardado.

HTTPS usa TLS. HTTP/2 tem enquadramento binário e multiplexagem sobre TCP; HTTP/3 usa QUIC. O formato textual descrito é de HTTP/1.x.

Sem caches nem ligação aberta, HTTP/1.1 segue resolução DNS, abertura TCP, pedido HTTP e resposta. Cache DNS elimina consultas à hierarquia; objeto fresco pode eliminar toda a sequência. ARP resolve MAC local, não IP do servidor.

## FTP, sockets e correio

FTP clássico separa controlo TCP 21 de ligações de dados. No ativo, o servidor inicia dados; no passivo, o cliente liga à porta anunciada. FTP não cifra credenciais; SFTP usa SSH e é outro protocolo.

Cliente TCP: socket, connect, send, recv. Servidor: socket, bind, listen, accept. `accept` cria socket de conversa e mantém o de escuta. UDP usa datagramas, por exemplo `sendto` e `recvfrom`.

`recv(4096)` pode devolver menos bytes e não corresponde a uma mensagem. Acumula segundo a delimitação da aplicação; `sendall` tenta enviar todos, sem garantir processamento remoto.

SMTP envia correio e procura MX do domínio destinatário. POP3 e IMAP permitem acesso à caixa; IMAP mantém pastas e estado no servidor. MIME descreve tipos, anexos e codificações. Portas clássicas: SMTP 25, submissão 587, POP3 110, IMAP 143; TLS implícito usa outras.

## Distribuição

Cliente-servidor concentra fornecimento no servidor. P2P permite que peers também forneçam, podendo usar trackers.

Para F bits, N clientes, upload do servidor $u_s$, menor download $d_{min}$ e uploads dos peers $u_i$, em bit/s:

$$D_{CS}\ge\max(NF/u_s,F/d_{min}),$$

$$D_{P2P}\ge\max(F/u_s,F/d_{min},NF/(u_s+\sum_i u_i)).$$

São **limites inferiores** em segundos, não tempos garantidos. Para F=100 Mbit, N=10, servidor 10 Mbit/s, cada peer upload 1 e download 5 Mbit/s: CS dá pelo menos 100 s; P2P, pelo menos 50 s. Disponibilidade de fragmentos, protocolo e topologia acrescentam restrições.

[Percurso com DNS e cache](/cadeiras/rc/aplicacoes/#dns-tcp-e-http-no-mesmo-pedido).
