# Leitura e ferramentas

[Documentação](README.md)

## Pesquisa

A pesquisa global usa Pagefind e funciona sem servidor de pesquisa. O build indexa o conteúdo de `data-pagefind-body`; ferramentas e notas locais ficam excluídas. Em desenvolvimento, a integração serve o último índice construído. Corre `npm run build` para o atualizar.

## Notas e destaques

Seleciona texto numa página de apontamentos e escolhe **Destacar** ou **Comentar**. Tab chega às ações da seleção e Escape fecha-as. Clica num destaque para editar o comentário. O caderno reúne as notas desta página ou de todo o site, permite voltar ao trecho, desfazer uma remoção e descarregar tudo em Markdown. As notas do bloco antigo continuam em “Notas anteriores”.

As preferências, os atalhos e o caderno ficam em `localStorage`. Não sincronizam entre dispositivos ou domínios. O caderno avisa quando não consegue guardar e permite descarregar o texto antes de sair. Limpar os dados do navegador apaga as notas.

Os destaques usam a [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API), sem alterar o HTML do resumo. Em navegadores antigos, as notas continuam acessíveis no caderno. `src/lib/text-anchors.ts` guarda o trecho e o contexto: quando o conteúdo muda ou se torna ambíguo, a nota fica no caderno com um aviso. As fórmulas entram como uma unidade, com o LaTeX original quando existe. Âncoras antigas continuam a usar as posições anteriores. Imagens não entram na seleção de texto. `src/lib/annotations.ts` guarda uma entrada por nota para evitar que separadores diferentes sobrescrevam o caderno inteiro.

## Atalhos

Por predefinição, `/` pesquisa, `n` abre as notas, `,` abre a aparência, `?` abre os atalhos e `a` abre o menu de IA nas páginas que o têm. Ctrl ou ⌘ K também pesquisa. Os atalhos não atuam em campos de texto. Podes mudar ou desativar as teclas e ativar navegação com `h`, `j`, `k`, `l`.

## Perguntar ao Chat

O menu de IA está nas páginas de apontamentos. Segue os [links do Fumadocs](https://github.com/fuma-nama/fumadocs/blob/824a02860da9701584d12462069963d172c3588f/packages/base-ui/src/layouts/shared/page-actions.tsx) para ChatGPT e Claude: envia os URLs públicos do Markdown e da página, com uma instrução para os ler. ChatGPT recebe também `hints=search`, como no Fumadocs. O popover acompanha o botão através de Floating UI e ajusta-se às margens do ecrã. Perplexity recebe a mesma pergunta. Gemini usa copiar e abrir. Estes links são convenções das interfaces dos fornecedores, não uma API estável. Há uma pergunta visível para copiar se necessário. Em localhost usa-se o endereço público configurado em `astro.config.mjs`. O conteúdo da página e as notas privadas nunca são copiados ou enviados. Não há chaves de API.

## Aparência

A barra lateral de personalização mostra os temas e as fontes para seleção direta. Cores, larguras e sugestões de CSS ficam visíveis, sem abrir secções. O cabeçalho e o botão de reposição continuam acessíveis durante o scroll. As preferências mantêm o armazenamento anterior.

## Versões Markdown

`src/lib/markdown-export.mjs` gera os ficheiros públicos `.md`, os SVG de referência e `/llms.txt` após o build. O botão "Perguntar ao Chat" inclui a versão Markdown para facilitar a leitura por assistentes.

## Leitura e anotações

As páginas de leitura têm texto com 640px por defeito e uma largura geral de 1200px. Em ecrãs a partir de 1200px, a navegação da cadeira fica à esquerda e as secções da página à direita. Nos restantes, **Conteúdos** abre por cima da página. A barra da cadeira mostra a posição entre os resumos. No computador, **Nesta página** sublinha a secção atual e risca as anteriores com Rough Notation, na cor de destaque e com animação. Movimento reduzido desativa a animação. Não existe uma barra de secções no telemóvel. A posição não significa que os resumos anteriores foram estudados. **Perguntar ao Chat** e **Brain rot** ficam diretamente visíveis. O cabeçalho recolhe ao descer e reaparece ao subir ou receber foco pelo teclado, em todos os ecrãs. A fonte inicial é Source Serif 4. As escolhas guardadas mantêm-se.

Seleciona texto e escolhe **Destacar** ou **Comentar**. Os destaques usam Rough Notation. O marcador na margem abre a nota junto ao trecho; no telemóvel, abre um painel inferior. O caderno completo abre por cima da página. As notas continuam só neste navegador, com exportação em Markdown.

A página de projetos mantém o endereço `/projetos/`, mas está oculta na navegação, nos links da página inicial e na pesquisa.

## Temas

A aparência inclui FEUP e adaptações das paletas [Gruvbox](https://github.com/morhetz/gruvbox), [Catppuccin](https://github.com/catppuccin/catppuccin), [Nord](https://www.nordtheme.com/docs/colors-and-palettes) e [Dracula / Alucard](https://github.com/dracula/dracula-theme). `src/data/reading-themes.ts` define as variantes claras e escuras. As larguras da página e do texto têm controlos separados.

## Histórico de leitura

A homepage mostra a última leitura e até quatro páginas recentes depois da primeira visita a um conteúdo. “Continuar a ler” retoma a posição; ao chegar ao fim, sugere o tópico seguinte. O histórico guarda até 20 páginas apenas neste navegador. “Limpar histórico” apaga-o. Não entra na pesquisa, nos ficheiros Markdown nem nos pedidos ao Chat.

## Personalização local

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
