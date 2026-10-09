## Dados e instruções

Validar decide se a entrada é permitida. Preparar SQL separa dados da consulta. Escapar a saída impede interpretação indevida naquele contexto. São controlos diferentes.

| Risco                     | Defesa principal                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Injeção SQL               | Valores em consultas preparadas; identificadores escolhidos numa lista fixa                |
| XSS                       | Destino de texto ou escape adequado ao contexto; sanitização própria se HTML for permitido |
| CSRF                      | Token imprevisível ligado à sessão e verificado nas alterações                             |
| Acesso a registos alheios | Autorização no servidor sobre o registo concreto                                           |
| Travessia de caminhos     | Identificadores mapeados para caminhos fixos e autorização de leitura                      |

## SQL e XSS

Concatenar `$nome = "' OR 1=1 -- "` numa consulta pode transformar a condição numa verdade e comentar o resto. `prepare` e `execute` fazem essa string ser um valor literal. Um marcador não substitui uma coluna de `ORDER BY`.

XSS pode ser persistente, refletido ou baseado no DOM. Para texto HTML no servidor, usa `htmlspecialchars` com `ENT_QUOTES | ENT_SUBSTITUTE` e UTF-8. No cliente, prefere `textContent` a `innerHTML`.

- Atributos com URLs também exigem validar esquemas; escape HTML não torna `javascript:` seguro.
- JavaScript e CSS têm outros contextos. Evita construir código com entrada.
- Remover `<script>` com regex não sanitiza HTML. Usa uma biblioteca com regras explícitas se aceitares marcação.
- CSP é defesa adicional. `HttpOnly` impede ler o cookie, mas XSS ainda pode executar pedidos autenticados.

## CSRF e autorização

Credenciais podem seguir automaticamente num pedido iniciado por outra página. **POST e CORS não comprovam intenção** nem impedem todos esses envios.

O servidor envia um token imprevisível associado à sessão e, na ação, exige método correto, token esperado existente e não vazio, token recebido string e comparação com `hash_equals`. Comparar ausências como `hash_equals('', '')` aceita indevidamente.

`SameSite` e verificação de `Origin` podem reforçar. XSS na própria origem pode obter o token. Não coloques alterações em GET.

Uma sessão válida não concede acesso a qualquer reserva. Restringe a operação ao registo e ao utilizador da sessão:

```sql
UPDATE reserva SET quantidade = :q
WHERE id = :reserva AND utilizador_id = :utilizador;
```

Todos os valores são preparados; confirma que existia um registo autorizado. Ocultar botões não protege o endpoint.

## Palavras-passe e sessões

- Usa `password_hash` e `password_verify`, não SHA-1 ou SHA-256 simples. Salt e parâmetros ficam no resumo; o salt pode ser público e é gerado automaticamente.
- A mesma palavra-passe normalmente dá resumos diferentes. O salt dificulta pré-cálculo, mas não salva uma palavra-passe fraca.
- Limita tentativas; `password_needs_rehash` permite atualizar parâmetros após login válido.
- Regenera o identificador ao autenticar ou mudar privilégios. Usa HTTPS e cookies `Secure`, `HttpOnly` e `SameSite` adequado.

## Ficheiros e HTTPS

Não passes um caminho arbitrário a `readfile`. Um mapa de IDs para caminhos fixos limita a seleção, mas continua a precisar de autorização. Guarda ficheiros privados fora da raiz pública: uma cópia pública pode contornar o endpoint protegido.

Uploads exigem limites, verificação do formato real e nomes escolhidos pelo servidor, fora de pastas executáveis. Tipo e extensão declarados pelo cliente não provam o conteúdo.

HTTPS protege confidencialidade e integridade do tráfego e autentica o servidor através de certificados. Não corrige SQL injection, XSS ou falta de autorização; um sítio malicioso também pode usar HTTPS.

[Revisão do percurso de uma ação](/cadeiras/ltw/seguranca-web/#https-e-revisão-de-uma-ação).
