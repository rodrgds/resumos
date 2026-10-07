# Leitura e ferramentas

[Documentação](README.md)

## Pesquisa

`/` ou Ctrl/⌘ K abre a pesquisa do site. Pagefind indexa apenas conteúdo público no build, sem servidor de pesquisa. Em desenvolvimento, corre `npm run build` para atualizar o índice.

## Apontamentos pessoais

Nos **Conteúdos** de uma cadeira, o botão **Novo apontamento** cria uma página pessoal acima das lições. O **Caderno** reúne as páginas e as anotações. As cadeiras sem resumos também permitem criar apontamentos.

O apontamento usa a mesma largura, letra e navegação das lições. Edita o título ou escreve diretamente na página. O texto mantém a formatação enquanto escreves; os sinais Markdown aparecem junto do cursor. Enter continua listas; num item vazio, sai da lista. Tab recua um item para dentro do anterior e Shift Tab sobe um nível, incluindo os seus filhos. Ctrl/⌘ Z desfaz alterações. Escape seguido de Tab sai do editor. Usa `$…$` para matemática em linha e `$$` em linhas próprias para uma fórmula destacada. Clica na fórmula ou chega-lhe com as setas para editar o LaTeX na própria página, entre os delimitadores. Ao sair, a fórmula volta a ser desenhada. Os blocos de código usam a linguagem indicada na abertura do bloco, por exemplo `python`, para colorir a sintaxe. HTML e componentes MDX não são executados.

O menu **Ações do apontamento**, ao lado do título, permite inserir imagens e fórmulas, importar, exportar e eliminar. Também podes abrir o menu de uma página nos conteúdos com o botão direito, o botão de ações ou Shift F10. A eliminação pode ser desfeita durante a visita.

Cola ou arrasta imagens para a página, ou usa **Inserir imagem**. Aceita PNG, JPEG, WebP, GIF e AVIF até 10 MB por ficheiro. As imagens ficam neste navegador, sem uploads. Imagens de URLs externos aparecem como texto, sem pedidos de rede. Para remover uma imagem, clica nela e apaga o Markdown correspondente.

Os apontamentos guardam automaticamente neste navegador. Não entram na pesquisa pública, nos resumos exportados nem no Chat. **Exportar apontamento** descarrega Markdown com as imagens incorporadas; **Importar Markdown** cria uma página nova na mesma cadeira. Se a gravação falhar, aparece um aviso para exportar antes de sair. Limpar os dados do site apaga os apontamentos e as imagens.

## Copiar fórmulas

Nas lições, aproxima o rato de uma fórmula ou usa Tab para chegar a **Copiar fórmula**. No telemóvel, o botão fica visível. A cópia inclui o LaTeX original e os delimitadores Markdown; um aviso confirma a cópia. O botão desaparece quando afastas o rato. Se o navegador bloquear a área de transferência, aparece uma caixa para copiar manualmente. As fórmulas continuam a poder fazer parte de seleções e anotações. Nos apontamentos pessoais, clica para revelar o LaTeX e usa a cópia normal do editor; não há um botão sobre a fórmula.

## Anotações e destaques

Seleciona texto e escolhe **Destacar** ou **Comentar**. Tab chega às ações; Escape fecha-as. O marcador na margem abre a nota junto ao trecho, ou num painel inferior no telemóvel. O caderno reúne notas da página ou do site, permite voltar ao trecho, desfazer uma remoção e exportar Markdown. As notas antigas continuam em **Notas anteriores**.

Notas e preferências ficam só neste navegador, sem sincronização. Limpar os dados do site apaga-as; o caderno avisa quando não consegue guardar e permite descarregar o texto.

Os destaques Rough Notation são desenhados fora do texto, com realce nativo como alternativa. `text-anchors.ts` localiza os trechos pelo texto e contexto. Se o conteúdo mudar ou houver ambiguidade, a nota permanece no caderno sem marcar outro trecho. Fórmulas são unidades de seleção; imagens não são texto. `annotations.ts` guarda notas individualmente para evitar que separadores sobrescrevam o caderno inteiro.

Nos blocos de código e editores, a seleção tem um fundo distinto e mantém as cores da sintaxe. Só os espaços e tabulações selecionados mostram pontos. Os pontos são visuais, não alteram o código copiado ou executado.

## Atalhos

| Tecla           | Ação                   |
| --------------- | ---------------------- |
| `/` ou Ctrl/⌘ K | Pesquisar              |
| `n`             | Caderno                |
| `,`             | Aparência              |
| `?`             | Configurar atalhos     |
| `a`             | Abrir Chat, nas lições |

Podes remapear ou desativar os atalhos de uma tecla. Funcionam com botões focados, mas não enquanto escreves nem em diálogos abertos.

Ativa **Navegação Vim** em Aparência ou Atalhos. O cursor é só de leitura:

| Movimento          | Efeito                                                   |
| ------------------ | -------------------------------------------------------- |
| `h`, `j`, `k`, `l` | Carácter à esquerda/direita ou linha visual abaixo/acima |
| `w`, `b`, `e`      | Palavra seguinte, anterior ou fim da palavra             |
| `0`, `^`, `$`      | Início, primeiro carácter não branco ou fim da linha     |
| `gg`, `G`          | Início ou fim do texto                                   |
| `{`, `}`           | Bloco de leitura anterior ou seguinte                    |

Um número repete o movimento, como `3j`. Nos cartões, `h`, `j`, `k`, `l` movem o foco e Enter abre o link. Muda remapeamentos incompatíveis antes de ativar Vim.

Clica no texto para posicionar o cursor ou arrasta para selecionar. `v` seleciona caracteres e `V` linhas visuais completas; os movimentos expandem a seleção. `y` copia o texto selecionado. Tab leva a **Destacar** e **Comentar**; Enter ativa a ação escolhida. Escape sai da seleção. Fora do modo Vim, o rato e estas teclas mantêm o comportamento normal.

Com o cursor num título recolhível, Espaço ou Enter abre e fecha o bloco. Num link, Enter abre o destino. Botões e campos focados mantêm a ação nativa.

Com Vim ativo, `/` pesquisa a página atual; Enter vai ao resultado e `n`/`N` repetem a pesquisa. Escape cancela-a sem desligar Vim; depois, `n` volta a abrir o caderno. Ctrl/⌘ K mantém a pesquisa global. O cursor preserva o texto, as seleções e as anotações; a pesquisa não é guardada nem enviada.

## Perguntar ao Chat

O menu abre ChatGPT, Claude, Perplexity ou Grok com os URLs públicos da página e do Markdown e um pedido para os ler. Gemini usa copiar e abrir; se a cópia falhar, aparece texto para copiar manualmente. Os links dos fornecedores podem mudar, pois não são uma API estável. Não se enviam conteúdo da página ou notas privadas, nem se usam chaves de API. Em localhost usa-se o endereço público configurado em `astro.config.mjs`.

## Aparência e navegação

Escolhe tema, fonte e larguras de página e texto na aparência. FEUP e adaptações de [Gruvbox](https://github.com/morhetz/gruvbox), [Catppuccin](https://github.com/catppuccin/catppuccin), [Nord](https://www.nordtheme.com/docs/colors-and-palettes), [Dracula / Alucard](https://github.com/dracula/dracula-theme), [Flexoki](https://stephango.com/flexoki) e [Solarized](https://ethanschoonover.com/solarized/) têm variantes claras e escuras em `src/data/reading-themes.ts`. Os cartões mantêm as cores das cadeiras. Código estático e editável partilham a paleta e as fontes IBM Plex Mono, JetBrains Mono ou monoespaçada do sistema.

A família tem um cartão; **Variante** apresenta as opções dessa família. Flexoki inclui os oito acentos oficiais. Gruvbox e [Everforest](https://github.com/sainnhe/everforest/blob/master/autoload/everforest.vim) incluem Hard, Medium e Soft. Catppuccin combina Latte com Mocha, Frappé ou Macchiato. [Tokyo Night](https://github.com/folke/tokyonight.nvim/tree/main/extras/lua) combina Day com Night, Storm ou Moon; [Rosé Pine](https://github.com/rose-pine/palette) combina Dawn com Main ou Moon. [One](https://github.com/atom/one-dark-syntax) tem Light/Dark. [Obsidian](https://docs.obsidian.md/Reference/CSS+variables/Foundations/Colors) reproduz os fundos do tema padrão da aplicação de computador, não um tema homónimo de VS Code. Texto secundário e acentos têm adaptações locais de legibilidade. Os ids antigos continuam válidos.

`scripts/sync-code-themes.mjs` guarda em `src/generated/code-themes.json` as cores originais e as adaptações usadas. A sintaxe vem dos temas TextMate de VS Code distribuídos pelo Shiki, do [port oficial Flexoki](https://github.com/kepano/flexoki/tree/main/vscode), de [Tokyo Night de Enkia](https://github.com/enkia/tokyo-night-vscode-theme/tree/master/themes) e do [port Moon](https://github.com/patricknasralla/TokyoNightMoon). Obsidian usa as [variáveis da aplicação](https://docs.obsidian.md/Reference/CSS+variables/Editor/Code), verificadas na versão 1.13.7. A variante Day de leitura usa a sintaxe Light de Enkia. FEUP usa GitHub Light/Dark; as variantes claras de Nord e Dracula adaptam a sintaxe escura. One usa os ports One Light/One Dark Pro.

As categorias comuns de TextMate e Lezer partilham cores para palavras-chave, operadores, strings, números, funções, tipos, propriedades, variáveis, parâmetros, pontuação e comentários. Não reproduzem todas as regras específicas de cada linguagem nem a análise semântica de um language server. Para manter contraste de 4,5:1 no código selecionado, o gerador ajusta a luminosidade OKLCH das cores, preservando a matiz quando o gamut permite. Os fundos e os acentos da leitura não determinam as cores da sintaxe. Regenera com `devenv shell -- node scripts/sync-code-themes.mjs` quando atualizares as fontes.

No computador, a cadeira e as secções acompanham o artigo em barras laterais. Abaixo de 1200px, **Conteúdos** abre a navegação sobre a página. O progresso mostra posição na cadeira, não conclusão. O cabeçalho reaparece ao subir ou focar um controlo; abrir notas não desloca o artigo.

**Continuar a ler** retoma a posição ou sugere o tópico seguinte após o fim. O histórico guarda até 20 páginas e mostra quatro recentes. Não entra em pesquisa, exportações ou Chat. Os pins de semestre acrescentam cartões no topo; a introdução só aparece sem histórico nem pins válidos.

Nos grupos CT, **Escolher CT** personaliza o cartão e o semestre fixado, sem fazer inscrição na FEUP. **Sem opção escolhida** repõe o grupo. Os links publicados e as fichas oficiais continuam disponíveis sem JavaScript.

O build gera `.md` de cada página pública e `/llms.txt`, sem notas ou rascunhos. A página `/projetos/` permanece acessível, mas oculta na navegação e pesquisa.

## Personalização local

Em **CSS personalizado**, guardar e ativar são ações separadas. Podes editar, desativar ou eliminar snippets. **Adicionar sugestões em falta** repõe sugestões desativadas sem substituir edições. Tudo fica em `resumos-css-snippets`, só neste navegador.

Código desloca-se horizontalmente por defeito. A sugestão **Quebrar linhas de código** ajusta blocos estáticos e editores à largura disponível sem alterar o programa. Seleções conservam as cores da sintaxe; pontos de espaços e tabulações não entram no texto copiado.

| Elemento        | Seletor estável                                       |
| --------------- | ----------------------------------------------------- |
| Cabeçalho       | `.site-header`                                        |
| Navegação       | `[data-nav="nucleos"]`, `[data-nav="contribute"]`     |
| Ferramentas     | `[data-action="notes"]`, `[data-action="appearance"]` |
| Histórico       | `[data-reading-history]`                              |
| Pins            | `[data-pinned-semesters]`                             |
| Cartões         | `.course-card`                                        |
| Texto           | `.prose`                                              |
| Código estático | `.astro-code`                                         |
| Exemplos        | `[data-playground]`, `.web-playground`                |
| Ações da página | `.page-actions`, `[data-open-ai]`, `#ai-menu`         |

Usa `--page`, `--surface`, `--text`, `--muted`, `--line`, `--accent` e `--accent-soft` para acompanhar o tema. Se o CSS esconder os controlos, acrescenta `?sem-css=1` ao URL para abrir Aparência com snippets suspensos e corrigir o problema.
