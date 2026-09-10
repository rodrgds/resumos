# Vozes locais do Brain rot

Comparação feita em 10 de setembro de 2026, num Mac com Apple M4, usando Google Chrome. Os números medem geração, não a velocidade da leitura. São medições de referência; outros dispositivos podem ter resultados diferentes.

## Comparação inicial

Esta tabela descreve a integração que gerava cada frase por inteiro, antes da reprodução por partes.

| Modelo         | Geração de uma frase, mediana     | Estimativa para 20 palavras | Execução       |
| -------------- | --------------------------------- | --------------------------- | -------------- |
| Tugão          | 0,94 s                            | 1,05 s                      | Piper, CPU     |
| Dii            | 0,97 s                            | 1,11 s                      | Piper, CPU     |
| Miro           | 1,01 s                            | 1,13 s                      | Piper, CPU     |
| Sopro V2 Turbo | 2,62 s com gráfica; 5,72 s em CPU | Cerca de 3 a 6 s            | WebGPU ou WASM |

As diferenças entre as três vozes Piper são pequenas. Não justificam tratar uma como muito mais rápida que outra. O Tugão continua selecionado por defeito. O Sopro é uma alternativa mais exigente, com um modelo que procura melhorar a pronúncia e a naturalidade. Estes testes não constituem uma classificação auditiva de qualidade.

Para o Piper, gerámos as mesmas três frases em cada Worker, sem outras gerações em paralelo. Excluímos o primeiro pedido, que carrega e prepara o modelo. A mediana acima usa as três gerações seguintes. A estimativa por 20 palavras divide o tempo total pelo número total de palavras.

- Hoje vamos estudar os apontamentos de programação e perceber como a função recebe três números e devolve a sua soma.
- Um autómato de pilha guarda informação que permite reconhecer linguagens mais complexas do que um autómato finito.
- Se a condição for verdadeira, o programa executa a instrução seguinte. Caso contrário, termina a função.

O teste comparativo inicial do Sopro usou as duas primeiras frases e uma referência gerada pelo Tugão. O tempo indicado é o segundo pedido, com 6,67 segundos de áudio. O primeiro pedido ainda carregava os grafos necessários. A integração inicial usava a gravação pública original do Tugão, disponibilizada pela [Nabu Casa sob CC0](https://github.com/NabuCasa/voice-datasets). Foi também validada através da interface real do leitor, incluindo geração de áudio e ausência de pedidos que enviem o texto.

O seletor mostra apenas Pesado junto das opções Sopro. Não apresenta tempos de um Mac como se fossem uma previsão para o dispositivo do leitor.

## Alternativas investigadas

O [Sopro V2 Turbo](https://research.haloneuro.ai/posts/sopro-v2) tem 120 milhões de parâmetros e suporte explícito para português europeu. O [adaptador oficial para navegador](https://github.com/samuel-vitorino/sopro/tree/main/web) oferece WebGPU e WASM. Integramos esse adaptador num Worker separado, com modelo e runtime fixos. O descarregamento inicial é maior e o uso de memória também, por isso não substitui automaticamente o Piper. O código e os modelos usam Apache 2.0.

O [Kokoro europeu de logus2k](https://huggingface.co/logus2k/kokoro_tts_eu_pt) é outra opção interessante: adapta o Kokoro-82M com o fonetizador TugaPhone. A distribuição consultada fornece pesos PyTorch de 327 MB e um pacote Python. Os números de CPU publicados pelo autor não são diretamente comparáveis ao nosso navegador. Não foi integrado nem testado neste site.

As versões mais recentes de [Dii com TugaPhone](https://huggingface.co/OpenVoiceOS/phoonnx_pt-PT_dii_tugaphone) também mudam o fonetizador. Não se deve trocar apenas o ficheiro ONNX no adaptador Piper atual: o pré-processamento tem de corresponder ao modelo.

## Volume

O áudio original das três vozes tinha níveis muito diferentes. Na mesma frase, o RMS global medido foi aproximadamente −15,1 dBFS no Tugão, −21,3 no Dii e −35,0 no Miro.

`src/lib/brainrot-audio.ts` mede a energia em janelas de 40 ms, exclui pausas relativamente silenciosas e ajusta o ganho para um RMS de fala de −20 dBFS. Limita os picos a cerca de −1 dBFS e o ganho a 20 dB. Não comprime a entoação nem altera os modelos. Numa nova geração da mesma frase, o áudio reproduzido ficou entre −21,5 e −20,3 dBFS nas três vozes, sem saturação.

O teste de reprodução usa vozes com uma diferença de entrada de 20 dB e verifica que o áudio final fica dentro de 1 dB. Os testes com as vozes reais estão disponíveis com `RESUMOS_REAL_TTS=1 npm test -- tests/brainrot.spec.ts`; guardam amostras WAV e verificam que o texto não sai do navegador.

## Amostras de voz

O Tugão continua disponível no Piper. A sua opção duplicada no Sopro foi retirada do seletor.

O Sopro usa o mesmo modelo para todas as referências. Cada amostra muda o timbre, sem treino adicional. Mudar de voz termina o Worker e invalida o áudio preparado; os ficheiros do modelo mantêm a mesma revisão e cache.

Os cortes abaixo foram descarregados e verificados com transcrição local em 10 de setembro de 2026. A avaliação não incluiu escuta humana. Não prova ausência de música, naturalidade nem semelhança com a pessoa. A ordem do seletor segue a preferência do utilizador, começando por Eduardo Rêgo, Fernando Mendes e José Mourinho.

| Voz                          | Fonte e intervalo                                                                                   | Escolha                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Eduardo Rêgo                 | [TEDxULisboa](https://www.youtube.com/watch?v=75hFXxE16aM&t=58), 00:58,10 a 01:16,30                | Incluída. Passagem contínua da palestra, depois da introdução.                                            |
| Fernando Mendes              | [Mensagem RTP 2021](https://www.youtube.com/watch?v=0VOJqDZ8cPY&t=8), 00:08,30 a 00:19,60           | Incluída. Mensagem direta e curta.                                                                        |
| José Mourinho                | [Canal 11](https://www.youtube.com/watch?v=K9dJzj9lGOs&t=17), 00:17,30 a 00:30,50                   | Incluída. Resposta depois da pergunta inicial.                                                            |
| Ricardo Araújo Pereira       | [Lisboa Connection](https://www.youtube.com/watch?v=vbw6plJKmZA&t=146), 02:26,55 a 02:42,50         | Incluída. A primeira resposta, depois da apresentação e da pergunta.                                      |
| Herman José                  | [Mensagem RTP](https://www.youtube.com/watch?v=QftO1ynDoRI), 00:00 a 00:13,96                       | Incluída. A mensagem tem cerca de 14 segundos.                                                            |
| Toy                          | [Rádio Metropolitana Porto](https://www.youtube.com/watch?v=0xYG-zLD8Ww&t=421), 07:01,35 a 07:14,35 | Incluída. Fala sobre Setúbal, depois da música e da apresentação.                                         |
| Nuno Markl                   | [TEDxAveiro](https://www.youtube.com/watch?v=_5JjyTuUWiY&t=85), 01:25 a 01:39,50                    | Incluída. Narrativa depois das imitações do início. Substitui a amostra curta anterior.                   |
| Fernando Mendes, alternativa | [Alta Definição](https://www.youtube.com/watch?v=D5FBg5gXwvk&t=115), 01:55 a 02:12                  | Testada. Mantida como alternativa à mensagem RTP. A introdução tinha montagem e troca de interlocutor.    |
| Herman José, alternativa     | [Expresso](https://www.youtube.com/watch?v=MMx7tplZqCQ&t=129), 02:09,35 a 02:28,90                  | Testada. Mantida como alternativa de entrevista.                                                          |
| Nuno Markl, amostra anterior | [Alta Definição](https://www.youtube.com/watch?v=Nw-LJDkb3TU), 00:00 a 00:05,04                     | Testada. Preferimos a passagem mais longa e contínua do TEDx. As legendas da entrevista assinalam música. |

Cada referência gerou esta frase pelo Worker Sopro real, com `language: 'pt'` e `seed: 42`: "Hoje vamos estudar os apontamentos de programação e perceber como a função recebe três números e devolve a sua soma."

O Whisper small local recuperou as 20 palavras nas dez referências, sem substituições, omissões ou inserções após normalizar maiúsculas, acentos e pontuação. É uma verificação de inteligibilidade numa frase, não uma classificação auditiva de qualidade. Não encontramos fundamento nesse teste para anunciar uma das vozes como melhor. A duração do áudio gerado variou entre 6,21 e 7,64 segundos; o volume passou pela mesma normalização do leitor.

As sete amostras incluídas usam MP3 a 96 kb/s, mono a 24 kHz, filtro passa-alto a 70 Hz e saída de 50 ms. Totalizam cerca de 1,2 MB. Só a referência escolhida é descarregada. Os cortes foram feitos com recodificação para respeitar o intervalo: a cópia direta de pacotes do YouTube podia incluir áudio anterior ao início pedido.

As fontes fornecidas pelo utilizador não indicam uma licença aberta. Os direitos das gravações são distintos de Apache 2.0 do Sopro e CC0 do Tugão. O seletor identifica estas vozes como sintéticas; não representam gravações das pessoas a ler os apontamentos nem uma colaboração com o site. Ver [créditos](../public/brainrot/CREDITOS.txt).

A gravação pessoal usa MediaRecorder e um texto de leitura de 20 segundos. `brainrot-recorder.ts` controla o microfone e liberta os tracks mesmo quando uma permissão só chega depois de cancelar. `brainrot-personal-voice.ts` descodifica e limita a amostra a 20 segundos, mistura os canais para mono e guarda um WAV a 24 kHz em IndexedDB. Não existe upload. Só Usar esta voz persiste a amostra; cancelar ou fechar descarta a gravação em curso. O seletor disponibiliza a voz guardada noutras páginas do mesmo site, com uma ação para a apagar.

## Carregamento e reprodução no telemóvel

O leitor usa Sopro V2 Turbo. Frases completas é o modo predefinido e usa `synthesize`. Antes do arranque, prepara o trecho atual e o seguinte; durante a leitura, mantém até dois trechos futuros. Streaming continua disponível como opção, prepara o seu caminho uma vez por Worker e começa com uma reserva de cerca de 1,2 segundos. O modelo conserva as escolhas automáticas do adaptador oficial, incluindo WASM quantizado e o modo de pouca memória no telemóvel. Mantivemos os dez segundos de referência definidos pelo modelo e os limites próprios de geração móvel.

No modo completo, o ganho é medido na frase inteira. No streaming, é medido no primeiro bloco de fala, com pelo menos 1,2 segundos quando a frase o permite, e mantido durante a frase. Os blocos seguintes conservam esse ganho com o mesmo limite de pico. A reprodução agenda blocos consecutivos no Web Audio. Se o streaming ficar sem dados, espera até terminar a geração da frase e suspende o avanço do relógio e das legendas. Assim evita retomar repetidamente por pequenos blocos. A duração continua estimada até terminar a geração.

A percentagem anterior correspondia a cada ficheiro que o adaptador carregava. Um teste real com o perfil móvel registou oito recuos antes do primeiro áudio. Agora mostramos os bytes acumulados por URL, sem somar novamente um ficheiro recarregado, e separamos a descarga, preparação da referência, inicialização e geração. Pausar e retomar usa a preparação existente; mudar a voz ou fechar continua a libertar o modelo.

A reprodução em streaming reduz a espera pela frase completa. Não consegue tornar um dispositivo mais rápido do que o modelo: se a geração continuar abaixo da velocidade da leitura, haverá espera. O Piper mantém-se como alternativa leve. Não ativámos isolamento global para obter mais threads WASM, porque isso afetaria conteúdos externos das páginas. O adaptador usa as capacidades disponíveis no navegador.

Os testes com um user agent móvel no Mac exercitam o perfil WASM do modelo, mas não reproduzem a CPU, a memória nem as limitações térmicas de um telemóvel real. Não foram usados para prometer um tempo de resposta no telemóvel.

### Ensaio inicial do caminho de geração

Ensaio em Chrome num Mac M4, com o perfil WASM quantizado, uma thread e `memory: 'low'`. A frase tem as mesmas 20 palavras usadas acima, referência Markl de dez segundos, português e `seed: 42`. A tabela usa a segunda geração, depois dos downloads e da preparação, com apenas um Worker ativo.

| Caminho                  | Primeiro áudio emitido pelo modelo | Geração completa | Áudio produzido |
| ------------------------ | ---------------------------------- | ---------------- | --------------- |
| Frase completa, anterior | 13,01 s                            | 13,01 s          | 7,17 s          |
| Streaming                | 1,25 s                             | 6,15 s           | 7,17 s          |

Este ensaio isolado de WASM motivou a experiência inicial com streaming. Não mede a continuidade da leitura nem o desempenho de WebGPU. A utilização posterior revelou pausas em computadores onde a geração por frases completas era mais rápida. Por isso, os números desta tabela não justificam escolher streaming por defeito. O primeiro bloco do modelo também não equivale ao primeiro som no leitor.

Na verificação completa da interface, os perfis Android e iPhone executaram os respetivos runtimes no Chrome do Mac, com dez blocos de áudio e zero recuos no contador. Carregaram 336 392 786 bytes de assets, cerca de 321 MiB, incluindo dados eventualmente servidos pela cache HTTP. A primeira utilização continuou a levar dezenas de segundos. Isto valida os caminhos de código e os ficheiros de cada runtime, não o desempenho nem a estabilidade em hardware iPhone ou Android real.

### Modelo normal e Turbo

Na consulta de 10 de setembro de 2026, o catálogo oficial contém `sopro-v2-turbo`, a sua exportação `sopro-v2-turbo-onnx` e o [Sopro antigo, treinado para inglês](https://huggingface.co/samuel-vitorino/sopro). Não contém uma versão V2 normal para português. O manifesto ONNX fixado usa dois passos e o runtime rejeita outro valor de `steps`. Frases completas e Streaming escolhem APIs de geração diferentes do mesmo modelo Turbo; não são dois modelos nem um seletor de passos.

### Continuidade no leitor em desktop

Comparámos cinco trechos com a referência Markl e `seed: 42`, no Chrome 153 de um Mac M4, com o vídeo de fundo ativo. O título era “Vamos estudar limites e continuidade.” e os dois parágrafos explicavam continuidade, limites laterais e a comparação com o valor da função. Excluímos a primeira geração, que ainda descarregava e preparava os grafos. O ensaio seguinte usou as mesmas frases e a geração completa, durante verificações leves da interface noutros separadores; não é um benchmark isolado do processador.

| Caminho no leitor                | Mediana das quatro gerações seguintes | Intervalos entre áudio agendado                       |
| -------------------------------- | ------------------------------------- | ----------------------------------------------------- |
| Streaming anterior               | 6,38 s                                | Três intervalos superiores a 150 ms, máximo de 2,12 s |
| Frases completas com antecipação | 2,46 s                                | Máximo de 33 ms, sem interrupções dentro das frases   |

Medimos a emissão dos blocos pelo Worker e os instantes de início/duração dos nós Web Audio. Estes intervalos excluem as pausas que o modelo já inclui dentro do áudio. Não comparam downloads nem prometem o mesmo resultado noutros computadores. A regressão de reprodução verifica também que, após uma falta de áudio seguida de pausa e retoma, blocos incompletos não voltam a iniciar a fala.
