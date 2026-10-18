## Regra de ouro

Validar decide se a entrada é permitida. SQL preparado separa dados da consulta. Escape impede interpretação no contexto de saída. Cada fronteira tem a sua defesa.

| Atacante controla   | Defesa                                    |
| ------------------- | ----------------------------------------- |
| Texto da consulta   | Valores preparados; colunas de lista fixa |
| HTML apresentado    | Escape do contexto; `textContent` no DOM  |
| Pedido entre sítios | Token CSRF ligado à sessão                |
| ID no pedido        | Autorização sobre o registo e a sessão    |
| Caminho pedido      | IDs mapeados para caminhos fixos          |
| Tráfego de rede     | HTTPS (não corrige as linhas acima)       |

## Injeção e XSS

- `"' OR 1=1 -- "` concatenado vira condição sempre verdadeira e comenta o resto. Com `prepare` + `execute`, a mesma string é um nome literal.
- Para texto HTML: `htmlspecialchars($t, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')`. URLs em atributos exigem ainda validar esquemas (`javascript:` continua perigoso). JavaScript e CSS têm contextos próprios.
- XSS persistente (guardado), refletido (devolvido) e de DOM (`innerHTML` com entrada). Sanitizar HTML permitido pede biblioteca com regras, nunca regex a apagar `<script>`.
- `HttpOnly` esconde o cookie de scripts, mas o ataque continua a fazer pedidos autenticados. CSP limita, não corrige o destino.

## CSRF e autorização

- Sessão no cookie pode seguir num pedido nascido noutra página. POST e CORS não provam intenção.
- Token imprevisível por sessão, enviado no formulário e exigido na ação. Na verificação: método POST, esperado existente e não vazio, recebido string, `hash_equals`. `hash_equals('', '')` aceitaria vazio contra vazio: nunca normalizes ausências para `''`.
- `SameSite` e `Origin` reforçam. XSS na origem lê o token: CSRF não dispensa XSS. Alterações nunca em GET.
- Autorização em cada ação: `... WHERE id = :r AND utilizador_id = :u`, com o utilizador da sessão. Confirma que a linha existia. Botão escondido não protege endpoint.

## Segredos e ficheiros

- `password_hash` guarda (salt incluído, público, automático); `password_verify` confirma. Nunca SHA-1/256 simples. Salt igual não se repete: a mesma palavra-passe dá resumos distintos. Fraca continua fraca: limita tentativas.
- `password_needs_rehash` atualiza parâmetros após login. Sessão: regenera o ID ao autenticar; cookies `Secure`, `HttpOnly`, `SameSite`.
- `readfile($_GET['f'])` com `../../x` sai do conjunto. Mapa de IDs para caminhos fixos, fora da raiz pública, mais autorização. Cópia pública anula o endpoint.
- Upload: tamanho, formato real e nome do servidor, fora de pastas executáveis. Extensão declarada não prova conteúdo.
- HTTPS: cifra e autentica o servidor por certificado. Sítio malicioso também pode tê-lo.

[Explicação completa](/cadeiras/ltw/seguranca-web/#https-e-revisão-de-uma-ação).
