# Leitor Brain rot

[Documentação](README.md)

## Utilização

**Brain rot**, nas lições, abre um leitor com vídeo de fundo, legendas e voz em português de Portugal. Toca no vídeo ou cartão para pausar. Desliza, usa as setas ou faz scroll para mudar o fundo para outra gravação e um ponto aleatório, sem mudar o trecho narrado. A reprodução natural segue os segmentos da mesma gravação até ao fim.

A barra vermelha permite procurar na leitura; o tempo total é aproximado enquanto faltarem frases por gerar. A roda dentada reúne voz, velocidade, legendas, realce, tipo de letra e elementos sociais. As escolhas mantêm-se neste navegador. O botão de som silencia ou repõe o volume; no computador, rato ou foco revela o slider.

Imagens, fórmulas, tabelas e código têm cartões associados ao seu trecho. As fórmulas inline ficam inteiras nas legendas. Vídeos YouTube têm miniatura e link, sem reprodução automática. Partilhar envia só o URL público. O canal e os números sociais são fictícios; apenas Início funciona na barra inferior. Movimento reduzido evita animações e mantém o fundo parado.

## Vozes e privacidade

Piper oferece Tugão, Miro e Dii. Sopro V2 Turbo, marcado **Pesado**, usa WebGPU ou WASM e uma referência pública sintética ou gravação pessoal. [Vozes locais](vozes-locais.md) contém medições, referências e alternativas.

Os modelos são descarregados ao escolher uma voz e ficam no armazenamento do navegador. Só a voz ativa ocupa um Worker; mudar de voz ou fechar termina-o. Texto, áudio e gravações nunca são enviados para serviços de síntese. **Só legendas** dispensa modelos; mudar de separador pausa a leitura.

Sopro usa **Frases completas** por defeito. Piper e Sopro completo preparam a frase atual e a seguinte antes de começar, com até duas frases futuras. O streaming opcional começa com uma reserva menor; se faltar áudio, espera pelo resto da frase com relógio e legendas parados. Pausar mantém a preparação. A interface distingue download, preparação do modelo e geração.

## Áudio e gravação pessoal

O cache IndexedDB guarda até 256 MiB e 1000 trechos, removendo os que não foram usados durante 30 dias. Distingue texto, modelo, referência e modo de geração. Volume, velocidade e aparência não exigem nova síntese. Falhas de armazenamento não impedem a leitura.

**Gravar a minha voz** permite uma amostra até 30 segundos. O microfone só abre após a ação explícita; **Usar esta voz** guarda a amostra depois de a ouvires. Amostras demasiado curtas ou quase silenciosas são rejeitadas. Cancelar, fechar, sair ou mudar de separador desliga o microfone e descarta amostras não guardadas. Apagar a voz remove a referência e o áudio associado; se estava ativa, regressa ao Tugão. A amostra é uma referência para Sopro, não treina outro modelo.

## Assets e extração

`src/data/brainrot-voices.ts` fixa modelos e revisões. Mantém Miro e Dii sem alterações e respeita CC BY-NC-ND 4.0. Referências e vídeos têm termos próprios em [CREDITOS.txt](../public/brainrot/CREDITOS.txt).

`src/data/brainrot-clips.ts` define a sequência das gravações, com segmentos completos desde a parte zero. Prepara o vídeo atual, o segmento sequencial seguinte e um segmento de outra gravação no ponto aleatório escolhido para o próximo scroll. A troca reutiliza o frame descodificado; se a rede ainda não o entregou, mantém o fundo atual até estar pronto. Se um vídeo preparado falhar, escolhe outro e mantém o trecho narrado. Não volta a tentar esse segmento até reabrires o leitor. Só volta ao início no fim da gravação. Fechar liberta os três vídeos; vídeos pessoais ficam em memória até fechar.

Cada frase completa tem um áudio; a divisão visual das legendas não divide a fala. O realce de palavras é aproximado, não alinhamento fonético. A extração lê o conteúdo publicado de `[data-annotatable]`, MathML e código original, nunca notas ou edições do leitor. Mantém cartões de código e tabelas estáticos, com a sintaxe publicada, sem inventar uma explicação de matrizes ou programas.

## Verificação

`tests/brainrot.spec.ts` cobre leitura, pausas, controlos, extração e falhas. Para verificar modelos reais e referências, usa `RESUMOS_REAL_TTS=1 npm test -- tests/brainrot.spec.ts` dentro de Devenv. O primeiro download exige rede; os testes guardam WAVs e verificam que texto não é enviado.

Cada Worker deve carregar WASM da mesma versão do seu ONNX JS. Piper e Sopro têm dependências distintas; consulta os pacotes e o lockfile antes de as atualizar.
