---
title: 'Cheat sheet de FSI'
description: 'Regras, condições e procedimentos para rever a teoria de FSI.'
section: recursos
order: 0
studyKind: revision
editorial:
  basedOn: 2026/27
  sources:
    - title: Ficha oficial de FSI, 2026/27
      url: https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=586999
  coverage: 'Regras, condições e procedimentos para rever a teoria de FSI.'
  gaps:
    - Não foi possível comparar esta página com provas e critérios de correção de 2026/27.
---

## Analisar um ataque

Ativo → ameaça → vulnerabilidade → vetor → propriedade afetada → defesa → risco residual. Distingue capacidade do atacante de uma hipótese sem evidência. [Explicação](/cadeiras/fsi/principios-seguranca/).

- Confidencialidade: quem lê. Integridade: quem altera e segundo que regras. Disponibilidade: quando o serviço responde.
- Perda esperada, num modelo de um evento: $E=pL$. Não converter categorias qualitativas em probabilidades sem dados.
- Controlo: reduzir, evitar, partilhar consequências ou aceitar explicitamente o risco residual.

## Desenho seguro

Privilégio mínimo, negar por defeito, mediação completa, simplicidade, desenho aberto, separação de privilégios, mínimo mecanismo comum e aceitação psicológica. Isolamento limita autoridade e comunicação. Defesa em profundidade exige falhas diferentes. TCB é aquilo de que a segurança depende. [Explicação](/cadeiras/fsi/sistemas-seguros/).

- Espaços virtuais distintos: mesmo endereço numérico não implica mesma página física. Kernel valida a transição e os argumentos.
- Container partilha kernel; VM tem kernel convidado. Seccomp limita chamadas, não substitui toda a política de acesso.
- Secure Boot verifica componentes autorizados; Measured Boot regista; TPM protege chaves/medições. Atestar exige frescura e política. [Explicação](/cadeiras/fsi/sistemas-seguros/).

## Criptografia

| Objetivo         | Regra                                                                            |
| ---------------- | -------------------------------------------------------------------------------- |
| Cifrar para B    | Pública de B; B decifra com privada de B                                         |
| Assinar por A    | Privada de A; verificar com pública de A                                         |
| MAC              | Chave partilhada; sem prova pública de qual participante criou                   |
| Hash             | Resumo público; referência tem de ser confiável                                  |
| RSA de brinquedo | $n=pq$, $\varphi=(p-1)(q-1)$, $ed\equiv1\pmod\varphi$, $c=m^e\bmod n$            |
| PKI              | Cadeia, âncora confiável, nome, datas, usos/restrições e estado segundo política |

- Chaves por par: $N(N-1)/2$. Com KDC, $N$ chaves duradouras entidade-centro no modelo simplificado; sessões à parte.
- CRL identifica revogações no seu âmbito. Verificar emissor, assinatura, atualidade e âmbito; ausência numa lista antiga não prova validade.

RSA sem OAEP/PSS não é um esquema real seguro. [Explicação](/cadeiras/fsi/criptografia/).

- ECB revela repetições. CBC exige IV adequado e preenchimento. CTR exige não repetir contadores sob a mesma chave.
- Se reutilizas a sequência XOR: $C_1\oplus C_2=P_1\oplus P_2$.
- AEAD dá confidencialidade e integridade; não dá proteção automática contra repetição.
- DH: $A=g^a$, $B=g^b$, segredo $B^a=A^b$ no grupo. Sem autenticação permite intermediário ativo.
- Chaves efémeras podem dar sigilo futuro quando as condições do protocolo se cumprem. [Explicação](/cadeiras/fsi/modos-protocolos/).

## Acessos

- Autenticação identifica; autorização decide sujeito, objeto e operação.
- ACL: permissões junto do objeto. Capacidade: referência protegida que confere autoridade.
- Bell-LaPadula básico, confidencialidade: não ler acima, não escrever abaixo.
- Biba estrito, integridade: não ler abaixo, não escrever acima.
- Unix: escolher dono, senão grupo, senão outros. $r=4,w=2,x=1$.
- Diretório: `x` atravessa, `r` enumera; `w+x` altera entradas, com restrições adicionais como sticky bit. Verificar todas as pastas do caminho. [Explicação](/cadeiras/fsi/controlo-acessos/).

## Código e rede

- Buffer de $N$ bytes: string de até $N-1$ bytes com terminador. Medir antes de copiar; verificar overflow de tamanhos.
- `printf`: formato externo controla interpretação; `%s` lê string, `%n` escreve a contagem em `int *`. Usa formato literal e tipos corretos.
- ROP reutiliza código; NX não o impede sozinho. Pilha e argumentos dependem da convenção.
- Canário terminador depende da cópia; aleatório depende de imprevisibilidade. Taint: source → propagação → sink; dinâmica só cobre execuções observadas.
- TOCTOU: verificar e usar o mesmo objeto, não resolver novamente um nome mutável.
- Canário deteta algumas corrupções; NX restringe execução; ASLR dificulta prever endereços. Não corrigem a falha de memória. [Explicação](/cadeiras/fsi/programacao-defensiva/).
- TLS protege transporte entre os seus extremos; não protege de um extremo malicioso.
- Firewall filtra; IDS alerta; IPS pode bloquear. Precisão $=VP/(VP+FP)$, sensibilidade $=VP/(VP+FN)$.
- Amplificação $=$ bytes de resposta / bytes de pedido. Defesa DoS depende do recurso esgotado. [Explicação](/cadeiras/fsi/seguranca-redes/).

- Worm: propagação autónoma. Botnet: coordenação de bots. Assinaturas e comportamento têm limites; inatividade numa sandbox não prova inocuidade.

## Web

Origem = esquema + host + porta. SOP restringe leitura, não todos os pedidos. CORS não autoriza utilizadores.

| Problema              | Defesa que atua no mecanismo                                                       |
| --------------------- | ---------------------------------------------------------------------------------- |
| SQL injection         | Parâmetros para valores; lista de opções para estrutura                            |
| XSS                   | Codificação por contexto ou sanitização de HTML permitido; sinks seguros           |
| CSRF                  | Não alterar por GET; defesas da framework, token e/ou validação de origem adequada |
| IDOR                  | Autorização no servidor sobre cada objeto e operação                               |
| Sessão roubada/fixada | IDs imprevisíveis, renovação, expiração/invalidação e transporte seguro            |
| Palavra-passe exposta | KDF adequada com sal por entrada; limites de tentativas protegem outro risco       |

Secure restringe transporte; HttpOnly restringe leitura do cookie por JS; SameSite restringe envio conforme o contexto. Nenhum destes atributos torna XSS seguro. [Explicação](/cadeiras/fsi/seguranca-web/).

- Autenticação de entidade exige prova ligada à interação atual; MAC antigo sozinho não prova presença. Desafio novo, contexto e invalidação.
- FAR = impostores aceites / tentativas de impostores. FRR = legítimos rejeitados / tentativas legítimas. Declarar protocolo e denominadores.
- CSP restringe recursos e execução; Report-Only só relata. SRI compara bytes com hash confiável; não torna código benigno nem contorna CSP. [Explicação](/cadeiras/fsi/seguranca-web/).
