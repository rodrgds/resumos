---
title: Redes locais
description: Ethernet comutada com aprendizagem da tabela, VLANs e Wireless LAN 802.11.
section: conteudo
order: 6
---

A rede local é o primeiro salto de quase todos os pacotes: a Ethernet com fios e o Wi-Fi que tens em casa e na faculdade. Esta página mostra como os comutadores encaminham tramas sem configuração e como o sem fios organiza o acesso.

## O comutador aprende sozinho

Um **comutador** (switch) liga várias máquinas e reenvia cada trama só pela porta certa, ao contrário do concentrador antigo que repetia tudo para toda a gente. A magia está na **tabela de comutação**, que associa endereços MAC a portas e é construída por aprendizagem: quando chega uma trama, o comutador regista "a origem veio desta porta" e reenvia pela porta do destino, se a conhecer; se não conhecer, inunda por todas as portas menos a de entrada.

Segue quatro máquinas, A, B, C e D, nas portas 1, 2, 3 e 4, com a tabela vazia:

1. A envia para B. O destino é desconhecido, por isso a trama inunda as portas 2, 3 e 4, e a tabela aprende A na porta 1.
2. B responde para A. O destino é conhecido (porta 1), por isso a trama sai só pela porta 1, e a tabela aprende B na porta 2.
3. C envia para D. Destino desconhecido: inunda, e aprende C na porta 3.
4. D responde para C. Destino conhecido: sai só pela porta 3, e aprende D na porta 4.

No fim, a tabela tem as quatro entradas e quase todo o tráfego vai direto à porta certa, sem incomodar as outras máquinas. As entradas expiram com o tempo, por isso máquinas que mudam de porta são reaprendidas sem intervenção.

## VLANs: separar sem cabos novos

Uma **VLAN** parte um comutador em redes lógicas independentes: as máquinas da VLAN 10 trocam tramas entre si, as da VLAN 20 entre si, e nunca se misturam, embora partilhem o mesmo ferro. A separação é feita marcando as tramas (a etiqueta 802.1Q) nas ligações entre comutadores. É a forma barata de isolar laboratórios, gabinetes e convidados sem puxar um cabo por grupo.

## Wireless LAN 802.11

No Wi-Fi não há portas: há um **ponto de acesso** e estações que partilham o ar com o CSMA/CA da página anterior. Para entrar, a estação associa-se ao ponto de acesso (com autenticação na rede da faculdade, por exemplo); para sair do silêncio das colisões, pode trocar primeiro um pedido e uma autorização curtos (RTS/CTS) que calam os vizinhos durante a transmissão.

O sem fios herda os problemas do meio partilhado: débito real muito abaixo do anunciado na caixa, porque metade do tempo vai em esperas, cabeçalhos e confirmações; e estações escondidas umas das outras que colidem no ponto de acesso sem se ouvirem. Por isso a regra prática é pôr pontos de acesso suficientes e aceitar que o Wi-Fi é um recurso partilhado, não uma ligação dedicada.

:::tip[Comutador contra router]
O comutador decide pela tabela MAC e não toca no IP: entrega dentro da mesma rede. O router decide pelo endereço IP e liga redes diferentes. Na dúvida, pergunta se o destino está na mesma rede: se sim, é trabalho de comutador; se não, é trabalho de router, e a camada de rede da próxima página trata disso.
:::
