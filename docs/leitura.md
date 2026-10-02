# Leitura e ferramentas

[Documentação](README.md)

## Pesquisa

`/` ou Ctrl/⌘ K abre a pesquisa do site. Pagefind indexa apenas conteúdo público no build, sem servidor de pesquisa. Em desenvolvimento, corre `npm run build` para atualizar o índice.

## Notas e destaques

Seleciona texto e escolhe **Destacar** ou **Comentar**. Tab chega às ações; Escape fecha-as. O marcador na margem abre a nota junto ao trecho, ou num painel inferior no telemóvel. O caderno reúne notas da página ou do site, permite voltar ao trecho, desfazer uma remoção e exportar Markdown. As notas antigas continuam em **Notas anteriores**.

Notas e preferências ficam só neste navegador, sem sincronização. Limpar os dados do site apaga-as; o caderno avisa quando não consegue guardar e permite descarregar o texto.

Os destaques Rough Notation são desenhados fora do texto, com realce nativo como alternativa. `text-anchors.ts` localiza os trechos pelo texto e contexto. Se o conteúdo mudar ou houver ambiguidade, a nota permanece no caderno sem marcar outro trecho. Fórmulas são unidades de seleção; imagens não são texto. `annotations.ts` guarda notas individualmente para evitar que separadores sobrescrevam o caderno inteiro.

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

O menu abre ChatGPT, Claude ou Perplexity com os URLs públicos da página e do Markdown e um pedido para os ler. Gemini usa copiar e abrir; se a cópia falhar, aparece texto para copiar manualmente. Os links dos fornecedores podem mudar, pois não são uma API estável. Não se enviam conteúdo da página ou notas privadas, nem se usam chaves de API. Em localhost usa-se o endereço público configurado em `astro.config.mjs`.

## Aparência e navegação

Escolhe tema, fonte e larguras de página e texto na aparência. FEUP e adaptações de [Gruvbox](https://github.com/morhetz/gruvbox), [Catppuccin](https://github.com/catppuccin/catppuccin), [Nord](https://www.nordtheme.com/docs/colors-and-palettes), [Dracula / Alucard](https://github.com/dracula/dracula-theme), [Flexoki](https://stephango.com/flexoki) e [Solarized](https://ethanschoonover.com/solarized/) têm variantes claras e escuras em `src/data/reading-themes.ts`. Os cartões mantêm as cores das cadeiras. Código estático e editável partilham a paleta e as fontes IBM Plex Mono, JetBrains Mono ou monoespaçada do sistema.

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
