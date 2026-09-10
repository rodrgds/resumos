# Resumos LEIC · FEUP

Apontamentos de LEIC da FEUP, feitos em Astro. [Abrir o site](https://resumos.rgo.pt).

A página inicial reúne as cadeiras de 2026/27 por ano e semestre. Ainda não há resumos das cadeiras reais. A [cadeira fictícia de exemplo](https://resumos.rgo.pt/exemplo/) mostra os formatos de conteúdo. A página de Núcleos reúne grupos de estudantes, equipas de competição e projetos ligados à FEUP, com descrições e ligações oficiais.

Os links úteis incluem o TTS, a app Uni para Android e os Resumos SofiaViP.

## Correr

```sh
devenv shell
npm ci
npm run build
npm run dev
```

Abre `http://localhost:4321`. Devenv fornece Node 24 e Typst 0.15.1. Fora de Devenv, instala estas dependências no ambiente do projeto.

```sh
npm run check
npm run format:check
npm test
npm run build
npm run preview
```

O build fica em `dist/`. Os testes compilam o site em `.test-dist/` e verificam-no com Chromium. Para usar um navegador existente, define `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Em CI, o workflow instala o Chromium.

## Conteúdo

Lê [CONTRIBUTING.md](CONTRIBUTING.md) para escrever uma página. Markdown e MDX usam o mesmo processador de LaTeX: `$...$` no texto e `$$...$$` em bloco, renderizados com KaTeX.

- `src/content/lessons/exemplo/apontamentos.md`: texto, fórmulas, imagem local, tabela e código.
- `src/content/lessons/exemplo/diagramas.mdx`: Typst, CeTZ-Plot, Fletcher, DOT e vídeo do YouTube.
- `src/content/lessons/exemplo/formatacao.mdx`: avisos, soluções recolhíveis, separadores e filtros de imagem.
- `src/content.config.ts` e `src/lib/course-content.ts`: coleção, secções, ordem, rascunhos e navegação automática.
- `src/content/exemplo/`: os ficheiros `.typ` e `.dot` usados nos exemplos.
- `src/layouts/Lesson.astro`: layout de leitura, ações da página e ligação ao código.
- `src/components/Prose.astro`: estilos de conteúdo e KaTeX.

`Typst.astro` chama o compilador oficial no build, através de `src/lib/typst.ts`. O modo HTML mantém texto selecionável e MathML. SVG exige descrição alternativa e serve para gráficos e desenhos. A exportação HTML do Typst é experimental. Confirma sempre o resultado. Uma falha de compilação interrompe o build.

Os imports internos do Typst partem da raiz do projeto, por exemplo `/src/content/exemplo/nota.typ`. Os pacotes externos têm versões fixas e são descarregados no primeiro build. Só conteúdo revisto do repositório chega aos compiladores. Não são endpoints para conteúdo enviado por visitantes.

`Dot.astro` usa Graphviz através de `@viz-js/viz`, só no build. Não precisa de uma instalação de `dot` nem envia WebAssembly para o navegador. `YouTube.astro` mostra uma miniatura alojada pelo YouTube e só cria o iframe após um clique.

Os testes em `tests/fixtures/` usam `RESUMOS_TEST_CONTENT=1`. Essa variável nunca deve estar definida em produção.

O menu de conteúdos abre sobre a página e segue as secções do frontmatter, como nos [Resumos LEIC](https://github.com/leic-pt/resumos-leic/blob/e8955899be9a7b449962aa1d86100bce4a091407/src/components/Sidebar.js). O primeiro resumo publicado ativa o cartão da cadeira. Markdown e MDX suportam notas de rodapé e containers através de `remark-directive`; `src/lib/remark-containers.mjs` transforma-os em HTML sem JavaScript.

## Pesquisa e ferramentas

A pesquisa global usa Pagefind e funciona sem servidor de pesquisa. O build indexa o conteúdo de `data-pagefind-body`; ferramentas e notas locais ficam excluídas. Em desenvolvimento, a integração serve o último índice construído. Corre `npm run build` para o atualizar.

Seleciona texto numa página de apontamentos e escolhe **Destacar** ou **Comentar**. Tab chega às ações da seleção e Escape fecha-as. Clica num destaque para editar o comentário. O caderno reúne as notas desta página ou de todo o site, permite voltar ao trecho, desfazer uma remoção e descarregar tudo em Markdown. As notas do bloco antigo continuam em “Notas anteriores”.

As preferências, os atalhos e o caderno ficam em `localStorage`. Não sincronizam entre dispositivos ou domínios. O caderno avisa quando não consegue guardar e permite descarregar o texto antes de sair. Limpar os dados do navegador apaga as notas.

Os destaques usam a [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API), sem alterar o HTML do resumo. Em navegadores antigos, as notas continuam acessíveis no caderno. `src/lib/text-anchors.ts` guarda o trecho e o contexto: quando o conteúdo muda ou se torna ambíguo, a nota fica no caderno com um aviso. As fórmulas entram como uma unidade, com o LaTeX original quando existe. Âncoras antigas continuam a usar as posições anteriores. Imagens não entram na seleção de texto. `src/lib/annotations.ts` guarda uma entrada por nota para evitar que separadores diferentes sobrescrevam o caderno inteiro.

Por predefinição, `/` pesquisa, `n` abre as notas, `,` abre a aparência, `?` abre os atalhos e `a` abre o menu de IA nas páginas que o têm. Ctrl ou ⌘ K também pesquisa. Os atalhos não atuam em campos de texto. Podes mudar ou desativar as teclas e ativar navegação com `h`, `j`, `k`, `l`.

O menu de IA está nas páginas de apontamentos. Segue os [links do Fumadocs](https://github.com/fuma-nama/fumadocs/blob/824a02860da9701584d12462069963d172c3588f/packages/base-ui/src/layouts/shared/page-actions.tsx) para ChatGPT e Claude: envia os URLs públicos do Markdown e da página, com uma instrução para os ler. ChatGPT recebe também `hints=search`, como no Fumadocs. O popover acompanha o botão através de Floating UI e ajusta-se às margens do ecrã. Perplexity recebe a mesma pergunta. Gemini usa copiar e abrir. Estes links são convenções das interfaces dos fornecedores, não uma API estável. Há uma pergunta visível para copiar se necessário. Em localhost usa-se o endereço público configurado em `astro.config.mjs`. O conteúdo da página e as notas privadas nunca são copiados ou enviados. Não há chaves de API.

A barra lateral de personalização mostra os temas e as fontes para seleção direta. Cores, larguras e sugestões de CSS ficam visíveis, sem abrir secções. O cabeçalho e o botão de reposição continuam acessíveis durante o scroll. As preferências mantêm o armazenamento anterior.

## Leitor Brain rot

Nas páginas de apontamentos, **Brain rot** abre um feed ao estilo do TikTok com legendas e voz em português de Portugal. Deslizar para cima ou para baixo muda entre Minecraft, Subway Surfers, GTA V e Roblox, num ponto aleatório de um dos excertos. A leitura continua no mesmo trecho. Tocar no vídeo ou nos cartões inicia ou pausa a leitura. O scroll e o swipe sobre os cartões também mudam o vídeo de fundo. No computador, o telefone sobe ao abrir, enquanto o fundo escurece; a saída inverte o movimento. A preferência de movimento reduzido desativa esta animação. A barra vermelha acompanha a leitura em segundos e mostra o tempo ao arrastar. A duração total é aproximada enquanto houver frases por gerar. A roda dentada reúne as definições, os vídeos locais e as setas de leitura. Imagens, fórmulas, tabelas e código aparecem centrados no vídeo, sem legendas sobrepostas. Cada cartão termina com o seu próprio trecho; a leitura seguinte volta às legendas. Fórmulas inline mantêm a notação matemática dentro das legendas e são realçadas como uma unidade. Os vídeos do YouTube aparecem como miniaturas com uma ligação para os abrir.

O canal e os números sociais são fictícios. Só Início funciona na barra inferior; os restantes separadores são decorativos. Partilhar abre um painel para copiar o URL público canónico ou usar a partilha do dispositivo, quando disponível. O botão de som, no canto inferior esquerdo, silencia ou repõe o volume. No computador, passar o rato ou focar o botão mostra um slider vertical; no telemóvel, basta tocar. A roda dentada abre voz, velocidade, realce e respetiva cor, tipo e tamanho de letra, modo de uma palavra e animação do texto. No modo de uma palavra, a animação é automática e a sua opção fica escondida. As legendas antecipam a voz em 100 ms quando há animação ou uma palavra de cada vez; movimento reduzido continua a ser respeitado. Permite também esconder o avatar, gostos, comentários e favoritos. As preferências ficam no armazenamento local e aplicam-se nas outras páginas. Só legendas continua a evitar a descarga de modelos. No computador, as setas fora do vídeo também mudam o fundo; no teclado, usa as setas para cima e para baixo com o feed focado.

Tugão, Miro e Dii são modelos Piper de português de Portugal e correm num Worker no dispositivo. O Sopro V2 Turbo é uma alternativa mais exigente, com WebGPU e fallback WASM num Worker próprio. Gera fala em português europeu a partir de uma amostra de voz. Oferece sete referências identificadas como sintéticas, Eduardo Rêgo, Fernando Mendes, José Mourinho, Ricardo Araújo Pereira, Herman José, Toy e Nuno Markl, e a gravação pessoal do leitor. Cada modelo é descarregado ao ser usado e fica no armazenamento privado do navegador. Só a voz selecionada ocupa memória; mudar de voz termina o Worker anterior e elimina o áudio preparado em memória. Limpar os dados do site volta a exigir o download. O texto e o áudio não são enviados para serviços de voz. Só legendas funciona sem descarregar modelos. Fechar o leitor termina o Worker, interrompe o áudio e liberta os vídeos. Mudar de separador pausa a leitura. O Sopro usa Frases completas por defeito: gera cada frase antes de a ler, prepara também a seguinte antes do arranque e mantém até duas frases à frente. Streaming é uma opção separada que começa com uma reserva menor. Se faltar áudio nesse modo, espera pelo resto da frase, sem retomar repetidamente por pequenos blocos. Ambos usam Sopro V2 Turbo. Pausar conserva a preparação em curso; o relógio e as legendas ficam parados quando falta áudio. A descarga mostra os MB acumulados, separados da preparação do modelo e da geração.

O áudio já gerado fica em IndexedDB, até 256 MiB e 1000 trechos. Os trechos expiram após 30 dias sem uso e são removidos durante as consultas ou gravações do cache. Reutilizar um trecho guardado dispensa nova síntese. O cache distingue texto, modelo, referência e modo de geração; velocidade, volume e aspeto das legendas não exigem nova síntese. Uma gravação pessoal nova invalida a anterior; apagá-la remove também o respetivo áudio guardado. O navegador decide se concede armazenamento persistente. Sem espaço ou acesso a disco, a leitura continua com geração normal. As mensagens indicam a etapa e o trecho aguardado: procurar áudio guardado, carregar ficheiros, preparar a voz, gerar fala e guardar o resultado.

**Gravar a minha voz**, nas definições de som, permite ler até 30 segundos. O texto combina perguntas, afirmações, sons nasais e termos de estudo; a pessoa pode terminar quando chegar ao fim. O microfone só abre ao carregar em Começar gravação. A pessoa ouve a amostra e escolhe Usar esta voz para a guardar em IndexedDB neste navegador. Gravações com menos de cinco segundos ou quase sem som são rejeitadas. Cancelar, fechar o painel, sair da página ou mudar de separador desliga o microfone; amostras não guardadas são descartadas. Apagar a minha voz remove a amostra e regressa ao Tugão se ela estiver selecionada. A gravação e o texto nunca são enviados para um serviço. O Sopro usa a amostra como referência, sem treinar outro modelo.

O catálogo em `src/data/brainrot-voices.ts` fixa os ficheiros e as revisões dos modelos. O seletor assinala as opções Sopro como Pesado. Os tempos de referência ficam apenas na documentação. O volume é equilibrado antes da reprodução, com limites de ganho e de pico. A [comparação das vozes](docs/vozes-locais.md) descreve as medições e alternativas investigadas. O leitor não usa as vozes do sistema nem a síntese de voz do navegador. Miro e Dii pertencem à TigreGotico Lda e usam CC BY-NC-ND 4.0, adequada ao uso não comercial deste site. Preserva os modelos sem alterações e os [créditos](public/brainrot/CREDITOS.txt).

Os 36 excertos em `public/brainrot/` têm 30 segundos. Os novos vídeos usam 720 × 1280 a 30 fps e um limite de 2,5 Mbit/s; os seis excertos do Minecraft original mantêm 432 × 768 a 24 fps. Foram extraídos de seis fontes indicadas pelo Rodrigo; [créditos e condições](public/brainrot/CREDITOS.txt). O leitor carrega o vídeo atual e o seguinte, e recicla três posições de scroll. Nunca descarrega os vídeos completos de uma hora. Para acrescentar fundos, coloca novos excertos curtos nesta pasta e acrescenta-os a `src/data/brainrot-clips.ts`. `kind` identifica o jogo e evita repetir o mesmo jogo em swipes consecutivos. Os vídeos escolhidos em **Usar os meus vídeos** ficam em memória até fechar o leitor.

Cada frase completa tem um áudio. As legendas mostram até seis palavras de cada vez dentro desse áudio; mudar de legenda não corta a fala nem acrescenta pausas. A duração da frase vem do áudio gerado. O realce está ligado por defeito e pode ser desligado nas definições. No Piper, aproxima a posição das palavras ao ritmo do áudio, sem alinhamento fonético. Os cartões de código e tabelas ficam estáticos, sem simular uma leitura por linhas. A leitura das fórmulas usa o MathML publicado; matrizes e código são mostrados, sem tentar inventar uma explicação. Os cartões preservam os tokens de Shiki e usam parsers de CodeMirror para colorir exemplos publicados em texto simples. A extração lê só o conteúdo publicado de `[data-annotatable]` e os exemplos originais, nunca as notas ou o código editado pelo visitante. Os controlos e as cópias visuais ficam fora da pesquisa e da exportação Markdown.

`tests/brainrot.spec.ts` cobre leitura, pausas, scroll, acessibilidade, extração e falhas de voz. `RESUMOS_REAL_TTS=1 npm test -- tests/brainrot.spec.ts` testa os modelos reais e as referências públicas, guarda amostras WAV e verifica que nenhum texto é enviado. Exige rede para o primeiro download. O Piper usa `onnxruntime-web` 1.22.0; o Sopro usa a sua própria dependência 1.29.0. Cada Worker carrega os binários WASM da versão correspondente.

## Organização

- `src/data/courses.ts`: plano de estudos, ECTS, cores e ícones.
- `src/pages/index.astro`: página inicial.
- `src/pages/nucleos.astro`: grupos e ligações oficiais.
- `src/components/Header.astro`, `Footer.astro`, `StudyTools.astro`: elementos comuns.
- `src/scripts/`: pesquisa, notas, atalhos, IA e preferências.
- `src/styles/global.css`: grelha, temas e aparência.
- `src/styles/tools.css`: ferramentas, grupos e leitura.

Os dados curriculares vêm do [plano oficial de 2026/27](https://sigarra.up.pt/feup/pt/cur_geral.cur_planos_estudos_view?pv_ano_lectivo=2026&pv_origem=CUR&pv_plano_id=31224&pv_tipo_cur_sigla=), consultado a 9 de setembro de 2026. CT I, II e III são grupos de opções. Projeto UP substitui o nome antigo Projeto FEUP.

O [MEIC](https://resumos.rgo.pt/meic/) inclui as 57 cadeiras com nome no [plano SIGARRA de 2026/27](https://sigarra.up.pt/feup/pt/cur_geral.cur_planos_estudos_view?pv_ano_lectivo=2026&pv_plano_id=31204), incluindo as optativas e as opções de Competências Transversais.

## Publicar

O projeto Cloudflare Pages `resumos-feup` está ligado a este repositório. Pushes para `main` publicam em `https://resumos.rgo.pt`; outros branches têm previews.

A configuração usa `bash scripts/cloudflare-build.sh`, pasta de saída `dist`, Node 24 e imagem de build v3. O script descarrega Typst 0.15.1, confirma o SHA-256 do arquivo oficial, instala as dependências do lockfile, verifica tipos e compila o site com a pesquisa. Não é preciso um token Cloudflare no GitHub.

O workflow GitHub Actions verifica formatação, tipos, testes de navegador e build. Cloudflare compila de forma independente, por isso os checks de GitHub não bloqueiam automaticamente a publicação.

## Créditos

Oito fontes de leitura alojadas localmente: Manrope, Inter, Atkinson Hyperlegible, Lexend, Source Serif 4, Lora, Literata e IBM Plex Mono. O navegador descarrega a fonte escolhida. Ícones [Heroicons](https://heroicons.com/) nos controlos. As cadeiras usam [Tabler Icons](https://github.com/tabler/tabler-icons) (MIT) e desenhos próprios através de `CourseIcon.astro`. O campo `icon` de cada cadeira escolhe o símbolo. Todos são SVG, sem JavaScript no navegador. [Fontes dos logótipos](public/logos/README.md). A ilustração dos pontos foi criada para este projeto.

Inspirado nos [Resumos LEIC do Técnico](https://resumos.leic.pt/), com código novo. O site é independente da FEUP e da U.Porto. `data/` e `_data/` são referências locais, ignoradas pelo Git, TypeScript e formatação.

## Temas e exemplos executáveis

A aparência inclui FEUP e adaptações das paletas [Gruvbox](https://github.com/morhetz/gruvbox), [Catppuccin](https://github.com/catppuccin/catppuccin), [Nord](https://www.nordtheme.com/docs/colors-and-palettes) e [Dracula / Alucard](https://github.com/dracula/dracula-theme). `src/data/reading-themes.ts` define as variantes claras e escuras. As larguras da página e do texto têm controlos separados.

Os exemplos usam [CodeMirror](https://codemirror.net/) e [Runno WASI](https://github.com/taybenlor/runno). Um Worker por execução recebe apenas código e entrada padrão, sem acesso ao DOM ou ao armazenamento das notas. Parar termina o Worker. Os binários do Runno incluem Python 3.11.3, Clang 8 para C17 e C++17, QuickJS e SQLite. RISC-V de 32 bits usa [RARS para JavaScript](https://github.com/Specy/rars) através de `@specy/risc-v` 3.0.0, num Worker próprio. Java usa CheerpJ 4.3 com Java 8 e Eclipse JDT 3.26. Haskell usa o GHC in Browser 9.14 de haskell-wasm, Prolog usa SWI-Prolog 8.1.2 (pacote WASM) e PHP 8.4 usa os pacotes oficiais do WordPress Playground. Os downloads iniciais podem demorar; existe um limite de dois minutos por execução e 32 mil caracteres de saída.

Os motores com acesso a JavaScript ou armazenamento precisam de uma origem própria para proteger as notas. O projeto Cloudflare Pages `resumos-code` executa `npm ci && npm run build:runners` na raiz e publica apenas `runners/dist/`, em `resumos-code.pages.dev`, a partir do mesmo repositório. Nunca sirvas as páginas de leitura nessa origem. Para desenvolvimento, executa `npm run build:runners` e serve `runners/dist/` em `127.0.0.1:4324`; o site pode continuar em `localhost:4321`. Os avisos e as fontes das licenças estão em [runners/NOTICE.md](runners/NOTICE.md).

`WebPlayground` usa um iframe com origem opaca e uma política que bloqueia a rede. Os exemplos executáveis são opcionais por página. O site continua estático. `ToolEmbed` carrega DartPad por escolha do leitor e abre Ripes numa janela separada. DartPad compila no serviço externo da Google; Ripes simula RISC-V no navegador. [Linguagens e limites por cadeira](docs/linguagens.md).

`src/lib/markdown-export.mjs` gera os ficheiros públicos `.md`, os SVG de referência e `/llms.txt` após o build. O botão "Perguntar ao Chat" inclui a versão Markdown para facilitar a leitura por assistentes.

### Histórico de leitura

A homepage mostra a última leitura e até quatro páginas recentes depois da primeira visita a um conteúdo. “Continuar a ler” retoma a posição; ao chegar ao fim, sugere o tópico seguinte. O histórico guarda até 20 páginas apenas neste navegador. “Limpar histórico” apaga-o. Não entra na pesquisa, nos ficheiros Markdown nem nos pedidos ao Chat.

### Personalização local

Os pins de semestre acrescentam cartões horizontais no topo da homepage e mantêm a grelha original. A introdução aparece enquanto não houver histórico de leitura nem semestres fixados. Limpar o histórico só a repõe se não houver pins.

A aparência também inclui adaptações de [Flexoki](https://stephango.com/flexoki) e [Solarized](https://ethanschoonover.com/solarized/). Os blocos estáticos e executáveis partilham as variáveis `--code-*` e a fonte escolhida para código: IBM Plex Mono, JetBrains Mono ou a fonte monoespaçada do sistema.

Em **CSS personalizado**, podes ativar as sugestões, editar o seu CSS ou adicionar snippets. Guardar e ativar são ações separadas. Cada snippet pode ser desativado ou eliminado. Os snippets ficam em `resumos-css-snippets`, só neste navegador, e não entram na pesquisa, exportação Markdown ou pedidos de IA.

As sugestões incluem ocultar Brain rot, deixar o cabeçalho no topo da página, sublinhar links, quebrar linhas de código estático e alternar o fundo das linhas de tabelas. **Adicionar sugestões em falta** acrescenta as sugestões novas ou eliminadas, desativadas, sem substituir as que editaste.

Seletores de personalização estáveis:

| Elemento              | Seletor                                               |
| --------------------- | ----------------------------------------------------- |
| Cabeçalho             | `.site-header`                                        |
| Links de navegação    | `[data-nav="nucleos"]`, `[data-nav="contribute"]`     |
| Botões de ferramentas | `[data-action="notes"]`, `[data-action="appearance"]` |
| Continuar a ler       | `[data-reading-history]`                              |
| Semestres fixados     | `[data-pinned-semesters]`                             |
| Cartões de cadeiras   | `.course-card`                                        |
| Texto da página       | `.prose`                                              |
| Código estático       | `.astro-code`                                         |
| Exemplos executáveis  | `[data-playground]`, `.web-playground`                |
| Ações da página       | `.page-actions`, `[data-open-ai]`, `#ai-menu`         |

Usa `--page`, `--surface`, `--text`, `--muted`, `--line`, `--accent` e `--accent-soft` para acompanhar o tema. Se um snippet esconder os controlos, acrescenta `?sem-css=1` ao URL. A página abre a aparência com os snippets suspensos, para os poderes corrigir. Também podes abrir a aparência pela tecla vírgula ou pelo rodapé.

## Projetos de estudantes

`/projetos/` reúne 60 repositórios públicos, selecionados a partir de READMEs e metadados consultados em 10 de setembro de 2026. `src/data/student-projects.json` guarda os links, descrições, cadeira ou área, linguagem e datas. O ano letivo só aparece quando existe evidência na fonte; caso contrário, a página identifica a criação do repositório. A pesquisa e os filtros correm no navegador e ficam no URL. Sem JavaScript, todos os links continuam disponíveis. As fontes permanecem nos repositórios dos autores.

## Leitura e anotações

As páginas de leitura têm texto com 640px por defeito e uma largura geral de 1200px. Em ecrãs a partir de 1200px, a navegação da cadeira fica à esquerda e as secções da página à direita. Nos restantes, **Conteúdos** abre por cima da página. A barra da cadeira mostra a posição entre os resumos; **Nesta página** acompanha as secções do resumo atual. A posição não significa que os resumos anteriores foram estudados. **Perguntar ao Chat** e **Brain rot** ficam diretamente visíveis. O cabeçalho recolhe ao descer e reaparece ao subir ou receber foco pelo teclado, em todos os ecrãs. A fonte inicial é Source Serif 4. As escolhas guardadas mantêm-se.

Seleciona texto e escolhe **Destacar** ou **Comentar**. Os destaques usam Rough Notation. O marcador na margem abre a nota junto ao trecho; no telemóvel, abre um painel inferior. O caderno completo abre por cima da página. As notas continuam só neste navegador, com exportação em Markdown.

Para uma explicação curta escrita pelo autor, usa `Bracket.astro` em MDX. A [página de formatação](src/content/lessons/exemplo/formatacao.mdx) contém um exemplo. O conteúdo mantém-se legível sem JavaScript. O desenho não altera os links, as fórmulas ou o texto usado para localizar notas.

A página de projetos mantém o endereço `/projetos/`, mas está oculta na navegação, nos links da página inicial e na pesquisa.
