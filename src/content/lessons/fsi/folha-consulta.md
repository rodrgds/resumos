---
title: Folha de consulta de FSI
description: Cifras, autenticação, chaves, PKI, protocolos e defesa de redes numa folha de consulta.
section: recursos
studyKind: revision
editorial:
  sources:
    - title: Resumos de Fundamentos de Segurança Informática, SofiaViP
      url: https://drive.google.com/file/d/1rrrCTHn8zKaMrw4q8ufLksAjSgwQuXcU/view
  coverage: Síntese das páginas 2 a 16 dos Resumos FSI de SofiaViP, com foco em criptografia e segurança de redes.
  gaps:
    - A fonte não identifica uma edição atual da cadeira; confirma o programa e as versões de protocolos exigidas na tua ocorrência.
    - Esta folha omite provas criptográficas, parâmetros de implementação e ataques web detalhados; os apontamentos cobrem esses ataques apenas de passagem.
---

Esta folha segue os [Resumos de FSI de SofiaViP](https://drive.google.com/file/d/1rrrCTHn8zKaMrw4q8ufLksAjSgwQuXcU/view). Os exemplos de César, substituição, ECB, MD5, SHA-1, SSL e versões antigas de TLS servem para reconhecer propriedades e falhas, não para escolher algoritmos novos.

## O objetivo antes do algoritmo

| Propriedade               | Pergunta que responde                                                 |
| ------------------------- | --------------------------------------------------------------------- |
| Confidencialidade         | Quem pode ler a mensagem?                                             |
| Integridade/autenticidade | Foi alterada? Veio de quem conhece a chave ou possui a chave privada? |
| Disponibilidade           | O serviço continua utilizável perante falhas e ataques?               |

**Cifrar** por si só não autentica o emissor nem deteta necessariamente alterações. Um MAC autentica para quem partilha a chave, mas não fornece confidencialidade nem uma prova pública de autoria. Uma assinatura verifica-se com a chave pública, desde que a associação entre chave e identidade seja fiável. [Ver tríade](/cadeiras/fsi/principios-seguranca/#a-tríade-confidencialidade-integridade-disponibilidade) e [simétrica/assimétrica](/cadeiras/fsi/criptografia/#simétrica-e-assimétrica).

## Cifras simétricas e autenticação

- Cifra de César e substituição simples têm espaço de chaves ou padrões exploráveis; são exemplos didáticos. A **one-time pad** só dá sigilo perfeito se a chave for aleatória, tão longa como a mensagem, secreta e usada **uma única vez**. Reutilizá-la revela $C_1\oplus C_2=M_1\oplus M_2$. [Ver criptografia simétrica](/cadeiras/fsi/criptografia/#simétrica-e-assimétrica).
- Uma cifra de bloco como AES transforma blocos sob uma chave. **ECB** cifra blocos iguais de forma igual e revela padrões. **CBC** encadeia blocos com IV e precisa de padding para entrada não múltipla do bloco; um erro de padding observável pode abrir um _padding oracle_. **CTR** cifra blocos contador para produzir um fluxo; não repitas o mesmo par chave/nonce. Nenhum destes modos de confidencialidade isolado garante integridade. [Ver modos de confidencialidade](https://csrc.nist.gov/pubs/sp/800/38/a/final).
- **GCM** combina cifra e autenticação de dados associados. O nonce deve ser único para cada cifragem sob a mesma chave; valida a etiqueta **antes** de usar o texto descifrado. AAD é autenticado sem ser cifrado. [Ver especificação de GCM](https://csrc.nist.gov/pubs/sp/800/38/d/final).
- Uma função hash criptográfica deve tornar difíceis pré-imagens, segundas pré-imagens e colisões. **Hash sem chave não autentica**: um atacante pode substituir a mensagem e recalcular o hash. MD5 e SHA-1 surgem nos apontamentos como exemplos históricos com colisões conhecidas; SHA-2 e SHA-3 têm objetivos e saídas próprios, não são cifras. [Ver gestão de chaves e PKI](/cadeiras/fsi/criptografia/#gestão-de-chaves-e-pki).
- $t=\operatorname{MAC}_K(m)$ usa uma chave secreta para autenticar $m$. Verifica a etiqueta antes de aceitar dados. Em **Encrypt-then-MAC**, autentica o texto cifrado; em **MAC-then-Encrypt**, o MAC entra antes da cifra e o tratamento de erros pode revelar informação. Uma AEAD pronta evita montar esta composição à mão. [Ver modos autenticados](/cadeiras/fsi/criptografia/#simétrica-e-assimétrica).

## Chaves públicas, certificados e canais

- **Chave de sessão** é temporária; **chave de longo prazo** identifica ou autentica um participante. Cifra assimétrica facilita distribuição de chaves, mas não prova sozinha a quem pertence uma chave pública. Uma assinatura autentica a mensagem assinada, não protege a sua confidencialidade. Para correio seguro, o objetivo pode exigir **assinar e cifrar**, por esta ordem lógica. [Ver gestão de chaves](/cadeiras/fsi/criptografia/#gestão-de-chaves-e-pki).
- Diffie–Hellman permite acordar material de chave num canal observável, mas uma troca sem autenticação admite um intermediário. Acorda a chave e autentica os participantes no **protocolo completo**. Chaves efémeras, quando usadas corretamente, limitam a exposição de sessões antigas após perda posterior de uma chave de longo prazo. [Ver exemplo de troca](/cadeiras/fsi/criptografia/#exemplo-troca-completa-em-números-pequenos).
- Um certificado X.509 associa identidade e chave pública mediante a assinatura de uma CA. Na validação, verifica **cadeia até uma âncora confiável**, nome esperado, período de validade, usos/extensões relevantes e estado de revogação quando aplicável. Ter uma assinatura matematicamente válida não basta se a identidade ou a âncora estiver errada. [Ver PKI](/cadeiras/fsi/criptografia/#gestão-de-chaves-e-pki).
- Em TLS, o _handshake_ negocia parâmetros, autentica o par exigido e estabelece chaves; depois, os registos protegem o tráfego. HTTPS é HTTP sobre TLS, mas não corrige XSS, SQL injection nem um servidor comprometido. [Ver TLS 1.3](https://www.rfc-editor.org/info/rfc8446/) e [segurança web](/cadeiras/fsi/seguranca-web/#o-modelo-mesma-origem-sessões-e-segredos).

## Identidade, acesso e perímetro

- **Autenticação** pergunta quem és; **autorização** decide o que podes fazer. Palavra-passe, cartão e biometria são fatores distintos; possuir um certificado não atribui automaticamente permissões. Dá a cada conta e serviço apenas os direitos necessários, e valida-os em cada operação sensível. [Ver modelos de acesso](/cadeiras/fsi/controlo-acessos/#modelos-matriz-papéis-e-níveis) e [privilégio mínimo](/cadeiras/fsi/sistemas-seguros/#os-quatro-princípios).
- Uma firewall filtra tráfego segundo política. Um filtro sem estado decide por campos do pacote e não vê dados de aplicação; um proxy de aplicação pode inspecionar pedidos nesse nível. Nenhum dos dois resolve ataques que passam por uma regra permitida. Uma VPN/IPsec protege o tráfego entre extremos configurados; modo **transporte** protege a carga do pacote original, modo **túnel** encapsula o pacote. [Ver exposição da rede](/cadeiras/fsi/seguranca-redes/#o-que-a-rede-expõe).
- DoS tenta retirar disponibilidade; um _flood_ esgota recursos de ligação, processamento ou largura de banda. Detetar uma assinatura conhecida é diferente de detetar uma **anomalia** face a uma linha de base. Um IDS de rede observa pontos de passagem; um IDS no anfitrião observa eventos locais. Falsos positivos e ataques novos limitam ambos. [Ver SYN flood](/cadeiras/fsi/seguranca-redes/#o-syn-flood-passo-a-passo) e [modelação de ameaças](/cadeiras/fsi/pensar-como-atacante/#modelação-de-ameaças-em-cinco-passos).
