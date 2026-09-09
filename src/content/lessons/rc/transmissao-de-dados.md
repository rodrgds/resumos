---
title: Transmissão de dados
description: Meios físicos, sinais, modulação, multiplexagem e os limites de Nyquist e Shannon.
section: conteudo
order: 2
---

Antes dos pacotes e dos protocolos, há física: alguém tem de representar bits com alguma coisa real, tensões num cabo ou ondas no ar, e essa representação tem limites. Esta página mostra como os bits viajam e até onde se pode ir.

## Meios e sinais

Os meios guiados conduzem o sinal: o **par de cobre entrançado** das redes domésticas, o **cabo coaxial** e a **fibra ótica**, que leva pulsos de luz por quilómetros com pouca atenuação. Os meios não guiados espalham o sinal pelo espaço: rádio, micro-ondas e satélite, onde a partilha do espectro obriga a licenças e a gerir interferências.

Um **sinal analógico** varia de forma contínua (a voz no microfone); um **sinal digital** toma valores discretos (os níveis de tensão que representam 0 e 1). Na prática, os bits viajam quase sempre sobre sinais analógicos bem comportados: o emissor molda uma portadora e o recetor interpreta o que chega.

## Modulação e multiplexagem

**Modular** é inscrever bits numa onda: variando a amplitude (ASK), a frequência (FSK) ou a fase (PSK). Com $M$ símbolos diferentes, cada símbolo carrega $\log_2 M$ bits: 8 fases distintas (8-PSK) transportam 3 bits por símbolo. Mais símbolos por unidade de tempo significa mais débito, mas símbolos parecidos confundem-se mais facilmente com ruído.

Quando uma ligação tem de servir vários fluxos, há duas saídas clássicas. A **multiplexagem por divisão de frequência** (FDM) parte o espectro em fatias, uma por fluxo, como as estações de rádio. A **multiplexagem por divisão de tempo** (TDM) parte o tempo em ranhuras que rodam pelos fluxos, como uma conversa à vez. A Internet usa uma terceira ideia, a multiplexagem estatística: ninguém tem fatia reservada, cada um usa quando precisa, e as filas absorvem os picos.

## Os dois limites: Nyquist e Shannon

Um canal sem ruído com largura de banda $B$ se usares $M$ níveis de sinal:

$$C = 2B\log_2 M$$

Isto é o limite de **Nyquist**: duplicar a largura de banda ou os níveis aumenta o débito, mas só até o ruído entrar em cena. Com ruído, manda o limite de **Shannon**, que depende da relação sinal-ruído $SNR$:

$$C = B\log_2(1 + SNR)$$

Repara que aqui $M$ desapareceu: acima de certo ponto, inventar mais níveis não adianta porque o ruído os baralha. Shannon dá o teto absoluto; Nyquist diz o que conseguirias sem ruído.

Um exemplo com a linha telefónica clássica: $B = 3{,}1$ kHz e $SNR = 30$ dB, ou seja $SNR = 1000$ em linear. Por Shannon, $C = 3100 \times \log_2(1001)$. Como $2^{10} = 1024$, $\log_2(1001)$ vale cerca de 9,97, por isso $C \approx 3100 \times 9{,}97 \approx 30900$ bits por segundo, uns 31 kbps. Os modems de 56 kbps daquela época já roçavam este teto, e é por isso que a solução foi trocar o meio (ADSL, cabo, fibra) em vez de inventar modulação nova para o mesmo fio de cobre.

:::warning[Decibéis e linear não se misturam]
$30$ dB significa uma razão de potências de $10^{30/10} = 1000$. A fórmula de Shannon quer a razão linear ($1000$), não os $30$ dB. Esquecer esta conversão é o erro mais comum nestas contas.
:::
