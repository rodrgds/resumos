# Cobertura de Redes de Computadores

Revisão de 1 de outubro de 2026, com o programa SIGARRA de 2026/27 e o plano teórico Moodle atualizado a 29 de setembro. A matriz relaciona temas, explicações e exercícios próprios. Não confirma o formato do exame atual nem garante uma classificação.

## Fontes

- [Ficha atual e avaliação](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=587003).
- [Plano das doze aulas teóricas](https://moodle2627.up.pt/mod/page/view.php?id=33673).
- [Moodle atual](https://moodle2627.up.pt/course/view.php?id=4941), slides de introdução, físico e ligação de dados, guardados em `_data/rc/moodle-2026-27/`. A extração contém 38, 40 e 61 páginas, respetivamente.
- Tanenbaum e Wetherall, _Computer Networks_, 5.ª edição, 2011. O PDF indicado pelo utilizador está no arquivo local de livros, com edição e hash verificados no catálogo de referências.
- RFCs de PPP, IP, CIDR, IPv6, TCP, congestionamento, RIP, OSPF, BGP, DNS, HTTP, FTP e SMTP, ligados junto das páginas relevantes.
- Aulas e problemas públicos de Kurose e Ross, identificados pelas páginas dos próprios autores. Os vídeos são complementos para mecanismos concretos, não fontes de regras da avaliação FEUP.

Os documentos autenticados continuam locais e ignorados. O site publica explicações, contas, diagramas e exercícios próprios, sem transcrever provas ou publicar os slides.

## Matriz do plano

| Plano atual                             | Explicação                                  | Aplicação e treino                                                                                   |
| --------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Introdução, modelos e comutação         | Redes e a Internet                          | Encapsulamento, serviço IP, pipeline de pacotes e débito útil                                        |
| Resposta do canal, códigos e amostragem | Transmissão de dados                        | Convolução/frequência, NRZ, Manchester, 4B/5B, símbolos e sincronização                              |
| Modulação, capacidade, potência e meios | Transmissão de dados                        | Nyquist/Shannon, conversão dB/dBm/dBW, Friis, BER/FER e retransmissões independentes                 |
| Framing e deteção                       | Ligação de dados                            | Stuffing, paridade, distância de código e divisão CRC executável                                     |
| Stop-and-Wait, janelas, GBN e SR        | Ligação de dados                            | Traços, duplicados, RR/REJ/SREJ dos slides, limites de numeração e utilização com/sem erros          |
| ARQ por salto e extremo a extremo       | Ligação de dados                            | Custos de recuperação e comparação de capacidade sob modelo explícito                                |
| Atraso, multiplexagem, Poisson e Little | Desempenho e filas; Filas finitas e Jackson | Unidades, somas por salto, estabilidade e fronteiras das médias                                      |
| M/M/1, M/M/1/B e M/G/1                  | As duas lições de filas                     | Espera versus serviço, bloqueio, taxa admitida, segundo momento e simulação interativa de médias     |
| Redes de linhas e Jackson               | Filas finitas e Jackson                     | Equações de tráfego com retornos, médias por visita e tempo externo                                  |
| ALOHA e CSMA/CD/CA                      | Acesso ao meio                              | Curvas executáveis, hipóteses Poisson, janela vulnerável, backoff, full-duplex e estações escondidas |
| Ethernet, bridges e VLAN                | Redes locais                                | Aprendizagem por origem, inundação, domínios, ciclos e spanning tree                                 |
| IP, subnetting e fragmentação           | Camada de rede                              | VLSM, alinhamento, longest prefix match, offsets e exceções /31 e /32                                |
| ARP, ICMP, DHCP, NAT e IPv6             | Camada de rede                              | Próximo salto, resolução local, controlo, tradução e diferenças IPv6                                 |
| Transporte e congestionamento           | Transporte, TCP e congestionamento          | Bytes/ACK, lacunas, timeout, fluxo/congestionamento, fases clássicas e limite por janela             |
| Routing                                 | Algoritmos de encaminhamento                | Dijkstra executável, distance vector por rondas, falhas, RIP/OSPF/BGP e custo versus débito          |
| HTTP, FTP, correio, DNS e P2P           | Aplicações                                  | Percurso de uma página, mensagens, caches, portas, leitura TCP e limites de distribuição             |

Cada uma das onze lições tem um conjunto associado de exercícios. São 56 questões próprias com pistas, solução e erros frequentes. A cheat sheet reúne fórmulas e condições, com links para as derivações e exemplos.

## Comparação com provas antigas

Foram examinadas as oito páginas de cada exemplo disponibilizado no Moodle: [exemplo 1, identificado como 2020](https://moodle2627.up.pt/mod/resource/view.php?id=33824) e [exemplo 2, de 7 de fevereiro de 2022](https://moodle2627.up.pt/mod/resource/view.php?id=33826). Estas datas e perguntas não definem a avaliação de 2026/27.

| Evidência histórica                                                         | Competência adicional treinada                                                                                           |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Exemplo 1, páginas 3–4, problema 1; exemplo 2, páginas 3–4, perguntas 11–13 | Cadeia BER → FER → limite de janela → utilização → débito útil; FEC e número de tentativas                               |
| Exemplo 1, páginas 5–6, problema 2; exemplo 2, página 4, perguntas 14–16    | Capacidade inferida pelo tempo ocioso, cauda geométrica, comparação M/M/1–M/D/1 e limite de espera com serviço constante |
| Exemplo 1, páginas 7–8, problema 3; exemplo 2, páginas 4–5, perguntas 17–20 | Topologia, VLSM, endereços de interfaces, tabelas de encaminhamento e agregação                                          |

A comparação originou exemplos e exercícios novos, com dados próprios. Os cálculos foram refeitos independentemente: na resolução manuscrita do exemplo de 2020, a utilização SR sob erros é aproximadamente 5,2294%, não os 5,1% indicados. Uma resolução antiga não foi tratada como gabarito infalível.

## Limites e confirmações pendentes

Os slides das aulas posteriores à ligação de dados ainda não estavam publicados no momento da comparação. Os temas dessas aulas seguem o plano atual e fontes técnicas, mas a notação e os detalhes pedidos pelo docente podem exigir ajustes quando esses slides forem publicados.

Os exemplos de provas disponibilizados no Moodle incluem enunciados antigos e páginas digitalizadas. São úteis para identificar tipos de problemas, mas não confirmam duração, penalizações, número de perguntas ou consulta permitida em 2026/27. O índice publica a fórmula de avaliação atual confirmada no SIGARRA, incluindo o ajuste da componente distribuída, sem inferir regras do exame a partir desses exemplos.

Os projetos não são realizados por estes apontamentos. Os guiões oficiais continuam a definir implementação, demonstração e relatório.

## Verificação

As contas de transmissão, Shannon, BER/FER, CRC, ARQ, Little, M/M/1, M/G/1, bloqueio, Jackson, CIDR, fragmentação, caminhos mínimos, TCP e P2P foram refeitas. Um segundo agente conferiu as fórmulas e identificou duas correções na cheat sheet: significado de resto CRC zero e estabilidade de M/G/1.

Os dez programas Python foram extraídos dos literais efetivamente usados em MDX. Os nove programas sem bibliotecas externas passaram execução nativa, incluindo CRLF em HTTP. O programa científico ALOHA concluiu no motor Pyodide e produziu a figura Matplotlib no navegador, com largura original de 633 px. A comparação entre Go-Back-N e Selective Repeat confirmou oito versus seis transmissões para a perda da terceira trama e seis em ambos para a última. O modelo declara que a janela inicial já foi toda transmitida antes da recuperação.

Uma revisão independente das 37 respostas numéricas com correção automática confirmou todos os valores dentro das tolerâncias, incluindo a cadeia BER/FEC, a capacidade inferida pelo tempo ocioso, as caudas, o limite FIFO e as redes VLSM. As restantes questões incluem escolha e justificação própria.

A revisão corrigiu ainda o intervalo vulnerável no desenho ALOHA e explicitou FIFO, serviços independentes, segundo momento finito e ausência de preempção nas fórmulas de filas. A verificação final das rotas, links, acessibilidade e apresentação será registada depois de integrar os suplementos de todas as cadeiras.
