# Fontes locais de estudo

Inventário atualizado em 2 de outubro de 2026. [A versão pública](fontes-locais.json) contém totais e origens. Caminhos individuais, SHA-256 e aliases ficam em `/_data/references/inventory.json`, ignorado pelo Git.

## Conteúdo

| Coleção                                          | Quantidade |
| ------------------------------------------------ | ---------: |
| Ficheiros locais                                 |      7 190 |
| PDFs locais com cabeçalho válido                 |      1 228 |
| Contentores ZIP/tar, incluindo Office, ODF e JAR |        198 |
| Membros de contentores com SHA-256               |     31 963 |
| PDFs dentro de contentores                       |      2 086 |
| Objetos distintos por SHA-256                    |     25 945 |
| Localizações de conteúdo repetido                |     13 208 |

O arquivo reúne os materiais FEUP anteriores, as recolhas dos três Moodles, 95 ficheiros de livros e suplementos e 74 arquivos do GitHub. Inclui snapshots e metadados de origem; as contagens de ficheiros docentes, estados de acesso e limites de cada ano estão em [fontes-moodle.md](fontes-moodle.md). PDFs dentro de arquivos são membros adicionais, não PDFs soltos.

## Organização e deduplicação

- `/_data/<cadeira>/`: materiais anteriores e pastas `moodle-2024-25`, `moodle-2025-26` ou `moodle-2026-27`.
- `/_data/books/`: livros, capítulos e suplementos dos autores.
- `/_data/github/`: arquivos fixados ao commit completo.
- `/_data/references/inventory.json`: tamanhos, hashes, membros e objetos canónicos com aliases.
- `/_data/references/`: resultados das aquisições e evidência editorial privada.

Um alias associa locais com os mesmos bytes e SHA-256. A deduplicação conserva os originais e evita tratar cópias como fontes independentes. Os membros dos arquivos foram lidos sem executar código; arquivos aninhados ficam intactos. As ferramentas de recolha, credenciais, caches e ficheiros de trabalho editorial não entram nestes totais.

Os manifests antigos de `leic-archive-records` conservam caminhos históricos. O inventário atual usa `/_data/<cadeira>/`.

## Materiais por cadeira

| Cadeira         | Ficheiros | PDFs soltos | Contentores | PDFs nos contentores |
| --------------- | --------: | ----------: | ----------: | -------------------: |
| ALGA            |        54 |          52 |           0 |                    0 |
| AM I            |        76 |          75 |           0 |                    0 |
| FP              |       169 |          12 |           2 |                    0 |
| FSC             |        64 |          30 |           0 |                    0 |
| MD              |       182 |         105 |           1 |                    0 |
| PUP             |       217 |          21 |           2 |                    0 |
| AM II           |       102 |         100 |           0 |                    0 |
| AC              |       103 |          32 |           2 |                   20 |
| F I             |        27 |          19 |           0 |                    0 |
| P               |       483 |           1 |           0 |                    0 |
| TC              |       151 |         112 |           0 |                    0 |
| AED             |       471 |          37 |           2 |                    0 |
| BD              |       613 |          50 |           2 |                    0 |
| F II            |       234 |          56 |           0 |                    0 |
| LDTS            |       847 |           1 |           2 |                    0 |
| SO              |       384 |          35 |           1 |                   29 |
| DA              |       600 |          50 |          13 |                   45 |
| ES              |       266 |          25 |           2 |                   23 |
| LC              |       252 |          23 |           1 |                    0 |
| LTW             |       891 |           3 |          27 |                    0 |
| ME              |       320 |         141 |           4 |                   47 |
| FSI             |        12 |           5 |           1 |                    0 |
| IPC             |        13 |           8 |           1 |                    6 |
| LBAW            |        70 |           5 |           1 |                    6 |
| PFL             |        65 |          43 |           3 |                   14 |
| RC              |        35 |          14 |           3 |                    3 |
| CT, Python      |       199 |          68 |          45 |                    2 |
| CT, Comunicação |         6 |           0 |           0 |                    0 |
| COMP            |         2 |           0 |           1 |                    0 |
| CG              |         3 |           1 |           1 |                    0 |
| CPD             |        24 |          11 |           0 |                    0 |
| IA              |         2 |           0 |           1 |                    4 |
| PI              |         1 |           0 |           1 |                    2 |
| CT II           |         1 |           1 |           0 |                    0 |

Livros e arquivos gerais do GitHub ficam em grupos próprios. A contagem conjunta usa hashes para não somar cópias como objetos distintos.

O arquivo público de AED acrescentou 36 PDFs dos docentes, com 1 323 páginas, entre 2024/25 e 2026/27. A edição atual tem quatro apresentações publicadas. As restantes apresentações, fichas práticas, código e perguntas de exemplo mantêm o ano de origem. As provas protegidas continuam inacessíveis. O livro de exercícios resolvidos de Villate de 2020 também foi guardado, com 86 páginas e licença CC BY-SA 4.0.

## Limites da coleção

As 75 obras fornecidas estão identificadas na [bibliografia](fontes-bibliografia.json). Das 124 entradas adotadas, 111 ainda não têm um livro ou suplemento correspondente identificado localmente. Algumas obras repetem-se entre cadeiras. Há cinco entradas adotadas com PDF completo local, uma com capítulos OSTEP, quatro com suplementos, duas com downloads indisponíveis e uma cujo livro exige um pedido aos autores. As alternativas abertas são contadas à parte.

A ligação oficial de Building Skills in Python devolve 404. University Physics, Volume 1, foi guardado pelo botão atual do OpenStax: 959 páginas e licença CC BY-NC-SA 4.0 no PDF de 2026. As obras sem ficheiro local mantêm o seu estado explícito. As lacunas de acesso aos Moodles também continuam identificadas.

Integridade do ficheiro não prova que uma solução está certa ou que corresponde ao exame atual. Os originais permanecem privados; o site publica explicações e exercícios próprios. Downloads e registos locais não são enviados para o GitHub.
