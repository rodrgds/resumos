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

| Passo           | Regista                                                                                          | Erro concreto                                            |
| --------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Ativo           | O que tem valor: dados, credenciais, capacidade, reputação                                       | Esquecer cópias e metadados                              |
| Ameaça          | Causa potencial de dano, acidental ou deliberada                                                 | Tratar hipótese sem evidência como capacidade            |
| Vulnerabilidade | A fraqueza que torna o dano possível                                                             | Confundir com o caminho de exploração                    |
| Vetor           | O caminho concreto até à operação perigosa                                                       | Analisar só a interface e não o pedido direto            |
| Propriedade     | Confidencialidade (quem lê), integridade (quem altera e como), disponibilidade (quando responde) | Atribuir quebras sem evidência do efeito                 |
| Defesa          | Controlo no ponto que executa a operação                                                         | Cifrar o disco para corrigir autorização em falta        |
| Risco residual  | O que resta depois do controlo, declarado                                                        | Afirmar impossibilidade em vez de aceitar explicitamente |

- Ativo, ameaça, vetor e controlo: [cadeia completa](/cadeiras/fsi/principios-seguranca/#ativo-ameaça-e-vulnerabilidade).
- Zero-day refere-se ao estado de conhecimento/correção; zero-click à ausência de interação. Não são sinónimos.
- Cadeia de fornecimento: autenticar a origem não prova que o conteúdo era benigno antes de assinar.
- Perda esperada, num modelo de um evento: $E=pL$; com controlo de custo $C$, total $T=C+p_{\text{residual}}L$. Não converter categorias qualitativas em probabilidades sem dados: [contas](/cadeiras/fsi/principios-seguranca/#perda-esperada).
- Controlos: reduzir, evitar a atividade, partilhar consequências ou aceitar explicitamente o residual.
- Política, mecanismo, confiança e ameaça: [hipóteses](/cadeiras/fsi/principios-seguranca/#política-mecanismo-confiança-e-ameaça). Binário vs risco: [modelos](/cadeiras/fsi/principios-seguranca/#modelo-binário-e-gestão-de-risco).

## Desenho seguro

| Princípio                | Teste rápido                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| Privilégio mínimo        | Cada entidade só tem a autoridade necessária, pelo tempo necessário |
| Negar por defeito        | Sem autorização explícita, negar                                    |
| Mediação completa        | Todos os acessos relevantes passam pela decisão, junto da operação  |
| Simplicidade             | Mecanismo pequeno e compreensível para análise                      |
| Desenho aberto           | Depende de segredos, não de esconder o algoritmo                    |
| Separação de privilégios | Operação crítica exige condições independentes                      |
| Mínimo mecanismo comum   | Menos partilha que crie dependências e fugas                        |
| Aceitação psicológica    | O caminho seguro é compreensível e utilizável                       |

- Isolamento limita autoridade e comunicação: [fronteiras](/cadeiras/fsi/sistemas-seguros/#o-representante-confuso). Defesa em profundidade exige controlos com falhas diferentes; TCB é aquilo de que a segurança depende: [monitor e TCB](/cadeiras/fsi/sistemas-seguros/#monitor-de-referência-e-tcb).
- Mesmo endereço virtual em processos distintos não implica a mesma página física; o kernel valida transição e argumentos: [memória](/cadeiras/fsi/sistemas-seguros/#memória-virtual-e-fronteira-do-kernel).
- Container partilha kernel; VM tem kernel convidado. Seccomp limita chamadas, não substitui toda a política de acesso: [isolamento](/cadeiras/fsi/sistemas-seguros/#containers-máquinas-virtuais-e-seccomp).
- Secure Boot verifica componentes autorizados; Measured Boot regista; TPM protege chaves/medições. Atestar exige frescura e política: [arranque](/cadeiras/fsi/sistemas-seguros/#arranque-verificado-medições-e-tpm).

## Criptografia

| Objetivo         | Regra                                                                            |
| ---------------- | -------------------------------------------------------------------------------- |
| Cifrar para B    | Pública de B; B decifra com privada de B                                         |
| Assinar por A    | Privada de A; verificar com pública de A                                         |
| MAC              | Chave partilhada; sem prova pública de qual participante criou                   |
| Hash             | Resumo público; referência tem de ser confiável                                  |
| RSA de brinquedo | $n=pq$, $\varphi=(p-1)(q-1)$, $ed\equiv1\pmod\varphi$, $c=m^e\bmod n$            |
| PKI              | Cadeia, âncora confiável, nome, datas, usos/restrições e estado segundo política |

- César, só A a Z: $y=(x+k)\bmod26$, recuperação com $-k$. Tem 26 deslocamentos; não protege dados reais: [cifras clássicas](/cadeiras/fsi/criptografia/#cifras-clássicas-e-espaço-de-chaves).
- Inverso modular: $ed\equiv1\pmod n$ existe se $e$ e $n$ são coprimos: [aritmética](/cadeiras/fsi/criptografia/#aritmética-modular).
- Aleatoriedade depende do gerador. 256 escolhas uniformes dão oito bits de entropia, mesmo em strings de 128 bits. Bits de segurança descrevem trabalho do ataque, não tamanho da representação: [entropia](/cadeiras/fsi/criptografia/#aleatoriedade-e-bits-de-segurança).
- RSA determinístico permite comparar cifras de hipóteses conhecidas; na assinatura crua, escolher $s$ e calcular $m=s^e\bmod n$ cria um par aceite sem privada: [ataques](/cadeiras/fsi/criptografia/#dois-ataques-ao-rsa-sem-codificação).
- Chaves por par: $N(N-1)/2$. Com KDC, $N$ chaves duradouras entidade-centro no modelo simplificado; sessões à parte: [contagem](/cadeiras/fsi/criptografia/#quantas-chaves-simétricas-precisamos).
- CRL identifica revogações no seu âmbito. Verificar emissor, assinatura, atualidade e âmbito; ausência numa lista antiga não prova validade: [revogação](/cadeiras/fsi/criptografia/#revogação-e-crl).
- Para provar a origem do texto em claro, assina o original e cifra depois; a outra ordem autentica o criptograma e permite verificar sem decifrar, sem a mesma relação com o texto: [ordem](/cadeiras/fsi/criptografia/#ordem-entre-assinar-e-cifrar).

RSA sem codificação é apenas a operação matemática $m^e \bmod n$. Os esquemas reais acrescentam construções: OAEP para cifragem e PSS para assinatura, além de alternativas analisadas. [Explicação](/cadeiras/fsi/criptografia/).

- ECB revela repetições. CBC exige IV imprevisível e blocos completos; decifra com $P_i=D_K(C_i)\oplus C_{i-1}$, com $C_0=IV$. PKCS#7 acrescenta um bloco de preenchimento quando o tamanho já é múltiplo do bloco; na remoção, confirma todos os $k$ bytes. CTR exige não repetir nenhum bloco de contador sob a mesma chave, mesmo entre mensagens, porque a reutilização revela o XOR dos textos em claro: [modos](/cadeiras/fsi/modos-protocolos/#ecb-cbc-e-ctr).
- Se reutilizas a sequência XOR: $C_1\oplus C_2=P_1\oplus P_2$: [reutilização](/cadeiras/fsi/modos-protocolos/#reutilizar-uma-sequência-de-xor).
- CTR sem autenticação: uma máscara aplicada à cifra muda os mesmos bits em claro. Encrypt-then-MAC autentica a cifra antes de decifrar; MAC-then-Encrypt cifra texto e etiqueta: [ordem](/cadeiras/fsi/modos-protocolos/#ordem-entre-cifragem-e-mac).
- AEAD dá confidencialidade e integridade; não dá proteção automática contra repetição: [repetição](/cadeiras/fsi/modos-protocolos/#cifragem-autenticada).
- DH: $A=g^a$, $B=g^b$, segredo $B^a=A^b$ no grupo. Sem autenticação permite intermediário ativo: [acordo](/cadeiras/fsi/modos-protocolos/#diffie-hellman-em-números-pequenos).
- Chaves efémeras podem dar sigilo futuro quando as condições do protocolo se cumprem. [Explicação](/cadeiras/fsi/modos-protocolos/).

## Acessos

- Autenticação identifica; autorização decide sujeito, objeto e operação: [autorizar](/cadeiras/fsi/controlo-acessos/#matriz-de-acessos).
- ACL: permissões junto do objeto, como uma coluna da matriz. Capacidade: referência protegida que o sujeito apresenta; não é o mesmo que uma Linux capability.
- ABAC avalia atributos validados de sujeito, objeto, operação e contexto; papel correto pode não bastar: [atributos](/cadeiras/fsi/controlo-acessos/#abac-atributos-e-contexto).
- Bell-LaPadula básico, confidencialidade: não ler acima, não escrever abaixo. Biba estrito, integridade: não ler abaixo, não escrever acima: [fluxos](/cadeiras/fsi/controlo-acessos/#integridade-com-biba).
- Unix: escolher dono, senão grupo, senão outros. $r=4,w=2,x=1$. Diretório: `x` atravessa, `r` enumera; `w+x` altera entradas, com restrições adicionais como sticky bit. Verificar todas as pastas do caminho: [regras Unix](/cadeiras/fsi/controlo-acessos/#exemplo-resolvido).

## Set-UID e ambiente

- `fork` copia o ambiente; `execve` recebe o ambiente explicitamente e substitui o programa no mesmo processo: [ambiente](/cadeiras/fsi/setuid-ambiente/#ambiente-em-fork-e-execve).
- Set-UID pode mudar o UID efetivo para o dono do executável; depende das condições do sistema. `seteuid` conserva o UID guardado; `setuid` com `CAP_SETUID` muda real, efetivo e guardado: [UIDs](/cadeiras/fsi/setuid-ambiente/#uid-guardado-e-redução-de-privilégios).
- `system` invoca uma shell: `PATH` e metacaracteres podem mudar a operação. Executável fixo, argumentos separados e ambiente controlado retiram esses mecanismos, mas não substituem autorização: [shell](/cadeiras/fsi/setuid-ambiente/#path-e-interpretação-pela-shell).
- Baixar o UID não fecha descritores já abertos. Fechar recursos privilegiados e usar close-on-exec quando não devem ser herdados: [descritores](/cadeiras/fsi/setuid-ambiente/#descritores-depois-de-retirar-privilégios).

## Código e rede

| Erro de memória              | Regra                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| Cópia para buffer            | String de até $N-1$ bytes em buffer de $N$; mede e valida overflow de tamanhos antes de alocar         |
| `printf` com formato externo | Formato literal; `%s` lê string, `%n` escreve contagem em `int *`; formato controlado pode ler posições da pilha nesta máquina e expor canários |
| Leitura fora dos limites     | Índice com sinal: `0 <= indice < len`; valida antes de converter para tipo menor                       |
| Use-after-free / double free | Referência inválida mesmo sem crash; anular um ponteiro não anula aliases                              |
| ROP                          | Reutiliza código existente; NX não o impede sozinho; argumentos dependem da convenção                  |
| Canário                      | Deteta escritas que o atravessam; terminador depende da cópia, aleatório de imprevisibilidade          |
| Taint                        | Source → propagação → sink; dinâmica só cobre execuções observadas                                     |
| TOCTOU                       | Verifica e usa o mesmo objeto; repetir a verificação de um nome mutável não liga ao objeto usado       |

- CFI restringe desvios cobertos, não todos os acessos a memória. SCI medeia chamadas; SFI restringe código ao domínio permitido: [mitigações](/cadeiras/fsi/programacao-defensiva/#reutilização-de-código-e-rop).
- TLS protege transporte entre os seus extremos; não protege de um extremo malicioso. Handshake estabelece material/parâmetros; Record protege dados. No HTTPS habitual, só o servidor é autenticado por certificado, mas a proteção funciona nos dois sentidos. Dados 0-RTT podem ser repetidos: só pedidos com perfil explícito de segurança sob repetição: [canal](/cadeiras/fsi/seguranca-redes/#tls-ssh-e-ipsec).
- Firewall filtra; IDS alerta; IPS pode bloquear. Precisão $=VP/(VP+FP)$, sensibilidade $=VP/(VP+FN)$. Amplificação $=$ bytes de resposta / bytes de pedido. Defesa DoS depende do recurso esgotado: [defesas](/cadeiras/fsi/seguranca-redes/#firewalls-e-deteção).
- Vírus replica-se por hospedeiro; worm propaga-se sozinho; botnet coordena bots. Assinaturas e comportamento têm limites; inatividade numa sandbox não prova inocuidade: [malware](/cadeiras/fsi/seguranca-redes/#malware-propagação-função-e-controlo).

## Web

Origem = esquema + host + porta. SOP restringe leitura, não todos os pedidos. CORS não autoriza utilizadores.

| Problema              | Defesa que atua no mecanismo                                                          |
| --------------------- | ------------------------------------------------------------------------------------- |
| SQL injection         | Parâmetros para valores; lista de opções para estrutura                               |
| XSS                   | Codificação por contexto ou sanitização de HTML permitido; sinks seguros              |
| CSRF                  | Não alterar por GET; defesas da framework, token e/ou validação de origem adequada    |
| IDOR                  | Autorização no servidor sobre cada objeto e operação                                  |
| Sessão roubada/fixada | IDs imprevisíveis, renovação, expiração/invalidação e transporte seguro               |
| Autoridade no cookie  | Referência opaca no cookie neste modelo; autoridade na sessão do servidor, verificada por operação; autoridade no cliente exige verificação explícita |
| Palavra-passe exposta | KDF adequada com sal por entrada; limites de tentativas protegem outro risco          |

Secure restringe transporte; HttpOnly restringe leitura do cookie por JS; SameSite restringe envio conforme o contexto. Nenhum destes atributos torna XSS seguro. [Explicação](/cadeiras/fsi/seguranca-web/).

- XS-Leaks inferem estado por efeitos observáveis, como eventos de imagem, mesmo sem ler o corpo. HTTPS e SOP não retiram automaticamente esse sinal.
- U2F usa autenticador com chave privada e desafio ligado ao serviço. Sal não impede reutilizar uma palavra-passe entre serviços; igualdade FAR/FRR não é uma regra geral de escolha de limiar.
- Autenticação de entidade exige prova ligada à interação atual; MAC antigo sozinho não prova presença. Desafio novo, contexto e invalidação.
- FAR = impostores aceites / tentativas de impostores. FRR = legítimos rejeitados / tentativas legítimas. Declarar protocolo e denominadores.
- CSP restringe recursos e execução; Report-Only só relata. SRI compara bytes com hash confiável; não torna código benigno nem contorna CSP. [Explicação](/cadeiras/fsi/seguranca-web/).
