---
title: Redes de Computadores
description: Camadas, protocolos e desempenho, da transmissão física às aplicações, com laboratório de redes.
section: conteudo
order: 0
---

Redes de Computadores é a cadeira onde a Internet deixa de ser magia. Vais perceber o que acontece quando carregas em enviar: como os bits viajam no cabo, como as tramas sobrevivem aos erros, como os routers escolhem caminhos, como o TCP mantém a ordem e como uma aplicação cliente fala com um servidor. A matéria organiza-se em camadas, e cada lição destas páginas corresponde a uma ou duas dessas camadas.

## Como está organizado

Começa por [Redes e a Internet](redes-e-internet/), que apresenta a comutação de pacotes, a arquitetura da Internet e a pilha TCP/IP. Depois desce ao físico em [Transmissão de dados](transmissao-de-dados/): meios, sinais, modulação e capacidade do canal. A [Ligação de dados](ligacao-de-dados/) trata das tramas, da deteção de erros com CRC e da retransmissão com ARQ.

A segunda parte sobe de nível: [Desempenho e filas de espera](desempenho-e-filas/) decompõe o atraso em parcelas e calcula-o num trajeto, [Acesso ao meio](acesso-ao-meio/) explica como as estações partilham o canal com ALOHA e CSMA, e [Redes locais](redes-locais/) mostra a Ethernet comutada e o Wi-Fi 802.11. Fecha com [Camada de rede e encaminhamento](camada-de-rede/), sobre IP, sub-redes e rotas, e [Transporte e aplicações](transporte-e-aplicacoes/), sobre UDP, TCP e sockets.

## Como estudar

Lê cada página com papel ao lado e refaz o exemplo antes de ver a resolução. Em Redes, quase tudo se aprende a calcular: atrasos, CRC, máscaras de sub-rede e números de sequência do TCP. Se o resultado não bater, o erro está quase sempre numa parcela esquecida ou numa máscara mal aplicada, e encontrá-lo é metade do estudo. Depois resolve os exercícios das fichas e compara cada protocolo com o vizinho: CSMA/CD contra CSMA/CA, TCP contra UDP, comutador contra router.

## Avaliação

A avaliação é distribuída com exame final: o exame vale 60 por cento e o trabalho laboratorial 40 por cento. A frequência exige realizar, apresentar e entregar o relatório dos dois trabalhos laboratoriais, e há mínimos de 8,0 na avaliação distribuída e no exame. Como as regras e as fórmulas mudam de ano para ano, confirma sempre a ficha da unidade curricular no SIGARRA e a página da disciplina no Moodle.

## Fontes e âmbito

Estas páginas seguem o âmbito da unidade curricular de Redes de Computadores (L.EIC025) do 3.º ano, 1.º semestre da LEIC, ocorrência de 2026/27: transmissão de dados, ligação de dados, desempenho, acesso ao meio, LANs, Internet, encaminhamento, congestionamento e aplicações, com projetos de um protocolo de ligação de dados e de uma aplicação cliente. A bibliografia de referência é Computer Networks de Tanenbaum e Wetherall.

Material oficial da FEUP:

- Ficha da unidade curricular de Redes de Computadores, ocorrência de 2026/27, com objetivos, programa, bibliografia e avaliação (consultada em setembro de 2026): [SIGARRA](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587003).
